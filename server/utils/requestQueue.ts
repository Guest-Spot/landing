import { createError } from 'h3'
import { useRuntimeConfig } from '#imports'

type ResolveFn = () => void

const activeCounts = new Map<string, number>()
const queues = new Map<string, ResolveFn[]>()

export const withRequestQueue = async <T>(
  action: string,
  handler: () => Promise<T>,
  overrides: {
    maxConcurrent?: number
    maxQueueSize?: number
  } = {}
): Promise<T> => {
  const config = useRuntimeConfig()
  const maxConcurrent =
    overrides.maxConcurrent ||
    Number(config.requestQueueMaxConcurrent) ||
    2
  const maxQueueSize =
    overrides.maxQueueSize ||
    Number(config.requestQueueMaxSize) ||
    50

  const currentActive = activeCounts.get(action) || 0
  const queue = queues.get(action) || []

  if (currentActive >= maxConcurrent) {
    if (queue.length >= maxQueueSize) {
      throw createError({
        statusCode: 503,
        message: 'Server is busy. Please try again shortly.'
      })
    }

    const waitPromise = new Promise<void>(resolve => {
      queue.push(resolve)
    })
    queues.set(action, queue)
    await waitPromise
  }

  activeCounts.set(action, (activeCounts.get(action) || 0) + 1)

  try {
    const result = await handler()
    return result
  } finally {
    const updatedActive = (activeCounts.get(action) || 1) - 1
    if (updatedActive <= 0) {
      activeCounts.delete(action)
    } else {
      activeCounts.set(action, updatedActive)
    }

    const queueForAction = queues.get(action)
    if (queueForAction && queueForAction.length > 0) {
      const next = queueForAction.shift()
      if (next) {
        next()
      }

      if (queueForAction.length === 0) {
        queues.delete(action)
      }
    }
  }
}

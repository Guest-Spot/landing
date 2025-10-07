<template>
  <div class="type-select" data-cy="application-type">
    <p class="type-select__label">
      Application Type <span class="type-select__required">*</span>
    </p>

    <div class="type-select__options" role="radiogroup" aria-label="Application Type">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="type-select__option"
        :class="{ 'type-select__option--active': option.value === modelValue }"
        :aria-pressed="option.value === modelValue"
        :aria-checked="option.value === modelValue"
        role="radio"
        @click="select(option.value)"
        :data-value="option.value"
        :disabled="disabled"
      >
        <span class="type-select__option-label">{{ option.label }}</span>
        <span class="type-select__option-description">{{ option.description }}</span>
      </button>
    </div>

    <p v-if="error" class="type-select__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ApplicantType } from '../models/SalonApplication.js'

interface OptionItem {
  value: ApplicantType
  label: string
  description: string
}

const props = defineProps<{
  modelValue: ApplicantType | ''
  error?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ApplicantType): void
}>()

const options: OptionItem[] = [
  {
    value: 'shop',
    label: 'Shop',
    description: 'Apply as a tattoo studio'
  },
  {
    value: 'artist',
    label: 'Artist',
    description: 'Apply as an individual artist'
  }
]

const select = (value: ApplicantType) => {
  if (props.disabled) {
    return
  }

  emit('update:modelValue', value)
}
</script>

<style scoped>
.type-select {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.type-select__label {
  margin: 0;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.type-select__required {
  color: #ff6b35;
}

.type-select__options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.type-select__option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
  font: inherit;
  outline: none;
}

.type-select__option:hover:not(:disabled),
.type-select__option:focus-visible {
  border-color: rgba(255, 109, 59, 0.6);
  box-shadow: 0 0 0 3px rgba(255, 61, 0, 0.2);
}

.type-select__option--active {
  background: linear-gradient(45deg, rgba(255, 61, 0, 0.18), rgba(255, 107, 53, 0.22));
  border-color: rgba(255, 107, 53, 0.8);
  box-shadow: 0 10px 30px rgba(255, 61, 0, 0.25);
}

.type-select__option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.type-select__option-label {
  font-size: 1.1rem;
  font-weight: 600;
}

.type-select__option-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.type-select__error {
  margin: 0;
  color: #ff6b35;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .type-select__options {
    grid-template-columns: 1fr;
  }
}
</style>

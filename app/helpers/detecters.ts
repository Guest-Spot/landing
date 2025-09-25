// Function to check if user is on Chrome browser
export function isChrome() {
  if (typeof navigator === 'undefined') return true; // SSR check
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('chrome') && !userAgent.includes('edg') && !userAgent.includes('opr');
}

// Function to check if user is on mobile device
export function isMobile() {
  if (typeof navigator === 'undefined') return false; // SSR check
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

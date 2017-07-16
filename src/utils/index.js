export * from './numbers';
export * from './geometry';
export * from './data';

export function isTouchDevice() {
  return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}

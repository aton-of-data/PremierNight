/**
 * Screen State Types
 *
 * Enum for screen states following Factory/ViewModel pattern.
 * Used to control rendering in Factory components.
 */
export enum ScreenState {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  EMPTY = 'empty',
  REJECTED = 'rejected',
}

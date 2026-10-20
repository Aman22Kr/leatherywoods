// ===== QUICK SETTINGS =====
export const BRAND = 'LeatheryWoods'
export const ANIMATION = { speed: 'NORMAL', intensity: 'STRONG' } // speed: SLOW|NORMAL|FAST|OFF
export const STORAGE_PREFIX = 'leatherywoods:v1:'
const S = { SLOW: 1.4, NORMAL: 1, FAST: 0.6, OFF: 0 }
const I = { SUBTLE: 8, MEDIUM: 18, STRONG: 32 }
export const MOTION = { scale: S[ANIMATION.speed] ?? 1, dist: I[ANIMATION.intensity] ?? 18, stagger: 0.07 * (S[ANIMATION.speed] ?? 1) }

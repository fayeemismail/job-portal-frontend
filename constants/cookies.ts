export const COOKIES = {
  LOCATION: 'user_location',
  AUTH: 'user_logged_in',
  IS_ADMIN: 'isAdmin',
  IS_WORKER: 'isWorker',
} as const;

export const LOCATION_COOKIE = COOKIES.LOCATION;
export const AUTH_COOKIE = COOKIES.AUTH;

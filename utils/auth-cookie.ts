import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { COOKIES } from '@/constants/cookies';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const authCookie = {
  get(): boolean {
    const loggedIn = getCookie(COOKIES.AUTH);
    // Default to true if not set (so user is logged in by default)
    return loggedIn !== 'false';
  },

  set(loggedIn: boolean) {
    setCookie(COOKIES.AUTH, String(loggedIn), {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  },

  remove() {
    deleteCookie(COOKIES.AUTH);
  },
};

export const adminCookie = {
  get(): boolean {
    const admin = getCookie(COOKIES.IS_ADMIN);
    return admin === 'true';
  },

  set(isAdmin: boolean) {
    setCookie(COOKIES.IS_ADMIN, String(isAdmin), {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  },

  remove() {
    deleteCookie(COOKIES.IS_ADMIN);
  },
};

export const workerCookie = {
  get(): boolean {
    const worker = getCookie(COOKIES.IS_WORKER);
    return worker === 'true';
  },

  set(isWorker: boolean) {
    setCookie(COOKIES.IS_WORKER, String(isWorker), {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  },

  remove() {
    deleteCookie(COOKIES.IS_WORKER);
  },
};

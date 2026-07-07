import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { AUTH_COOKIE } from '@/constants/cookies';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const authCookie = {
  get(): boolean {
    const loggedIn = getCookie(AUTH_COOKIE);
    // Default to true if not set (so user is logged in by default)
    return loggedIn !== 'false';
  },

  set(loggedIn: boolean) {
    setCookie(AUTH_COOKIE, String(loggedIn), {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  },

  remove() {
    deleteCookie(AUTH_COOKIE);
  },
};

export const adminCookie = {
  get(): boolean {
    const admin = getCookie('isAdmin');
    return admin === 'true';
  },

  set(isAdmin: boolean) {
    setCookie('isAdmin', String(isAdmin), {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  },

  remove() {
    deleteCookie('isAdmin');
  },
};

import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { LOCATION_COOKIE } from '@/constants/cookies';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const locationCookie = {
  get(): string | null {
    const location = getCookie(LOCATION_COOKIE);

    return location ? String(location) : null;
  },

  set(location: string) {
    setCookie(LOCATION_COOKIE, location, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  },

  remove() {
    deleteCookie(LOCATION_COOKIE);
  },
};

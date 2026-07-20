/**
 * Centralized role-to-route mapping for enterprise routing.
 */
export const ROLE_ROUTES = {
  customer: '/',
  worker: '/worker',
  admin: '/admin',
} as const;

export type UserRole = keyof typeof ROLE_ROUTES;

/**
 * Returns the centralized redirect destination route for a given user role.
 * @param role User role from backend ('customer' | 'worker' | 'admin')
 */
export function getRedirectPathForRole(role?: string): string {
  if (role === 'worker') return ROLE_ROUTES.worker;
  if (role === 'admin') return ROLE_ROUTES.admin;
  return ROLE_ROUTES.customer;
}

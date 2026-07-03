import { NavItem } from './types';
import { NAV_UTILITY_CONFIG } from './constants';

/**
 * Helper to dynamically determine the active navigation link label based on the current URL pathname.
 */
export function getActiveItemLabel(pathname: string, navItems: NavItem[]): string {
  const activeItem = navItems.find((item) => {
    if (item.href === '/') {
      return pathname === '/';
    }
    if (item.hasDropdown && item.dropdownItems) {
      return item.dropdownItems.some((subItem) => pathname.startsWith(subItem.href));
    }
    return pathname.startsWith(item.href);
  });
  return activeItem ? activeItem.label : NAV_UTILITY_CONFIG.defaultActiveLabel;
}

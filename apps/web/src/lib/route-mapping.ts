/**
 * Route mapping configuration for SEO-friendly URLs
 * Maps old routes to new SEO-optimized routes
 */

export interface RouteMapping {
  oldRoute: string;
  newRoute: string;
  type: 'subcategory-selection' | 'subcategory';
}

export const routeMappings: RouteMapping[] = [
  // Subcategory selection pages (old: /category/subcategories -> new: /seo-friendly-url)
  {
    oldRoute: '/lidar/subcategories',
    newRoute: '/lidar-sensor-price-in-india',
    type: 'subcategory-selection',
  },
  {
    oldRoute: '/industrial-edge-computers/subcategories',
    newRoute: '/industrial-edge-computing-manufacturer-in-india',
    type: 'subcategory-selection',
  },
  {
    oldRoute: '/vision-systems-cameras/subcategories',
    newRoute: '/vision-systems-cameras-for-automation',
    type: 'subcategory-selection',
  },
  {
    oldRoute: '/actuators/subcategories',
    newRoute: '/actuator-manufacturer-in-india',
    type: 'subcategory-selection',
  },
  {
    oldRoute: '/wiring-harness-and-connectors/wiring-harness-and-connectors',
    newRoute: '/wiring-harness-manufacturer-and-connector-supplier',
    type: 'subcategory',
  },
  // Subcategory pages (old: /category/subcategory -> new: /seo-friendly-url)
  {
    oldRoute: '/lidar/ouster-velodyne',
    newRoute: '/ouster-velodyne-3d-lidar-systems',
    type: 'subcategory',
  },
  {
    oldRoute: '/lidar/hesai',
    newRoute: '/hesai-lidar-technology',
    type: 'subcategory',
  },
  {
    oldRoute: '/lidar/livox-3d-lidar-sensor',
    newRoute: '/livox-3d-lidar-sensor-supplier',
    type: 'subcategory',
  },
  {
    oldRoute: '/lidar/robosense',
    newRoute: '/robosense-smart-lidar',
    type: 'subcategory',
  },
  {
    oldRoute: '/lidar/sick',
    newRoute: '/sick-lidar',
    type: 'subcategory',
  },
];

/**
 * Get the new route for an old route
 */
export function getNewRoute(oldRoute: string): string | null {
  const mapping = routeMappings.find((m) => m.oldRoute === oldRoute);
  return mapping ? mapping.newRoute : null;
}

/**
 * Get the old route for a new route (reverse lookup)
 */
export function getOldRoute(newRoute: string): string | null {
  const mapping = routeMappings.find((m) => m.newRoute === newRoute);
  return mapping ? mapping.oldRoute : null;
}

/**
 * Get category and subcategory IDs from a new route
 */
export function getCategoryInfoFromNewRoute(
  newRoute: string
): { categoryId: string; subcategoryId?: string } | null {
  const oldRoute = getOldRoute(newRoute);
  if (!oldRoute) return null;

  const parts = oldRoute.split('/').filter(Boolean);
  const categoryId = parts[0];
  if (!categoryId) return null;
  if (parts.length === 2 && parts[1] === 'subcategories') {
    return { categoryId };
  }
  if (parts.length === 2) {
    return { categoryId, subcategoryId: parts[1] };
  }
  return null;
}

/**
 * Check if a route is a mapped route
 */
export function isMappedRoute(route: string): boolean {
  return (
    routeMappings.some((m) => m.oldRoute === route) ||
    routeMappings.some((m) => m.newRoute === route)
  );
}

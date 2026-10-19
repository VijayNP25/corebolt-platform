/**
 * Lightweight view of the product catalogue for site navigation.
 * Built from `data/products` (static migrate fallback). Prefer API categories later.
 */
import {
  categories,
  type Category,
  type Subcategory,
  type ProductGroup,
} from '@/data/products';

export interface NavItem {
  id: string;
  name: string;
}

export interface NavProductGroup extends NavItem {
  productGroups?: NavProductGroup[];
  href?: string;
}

export interface NavSubcategory extends NavItem {
  productGroups?: NavProductGroup[];
  href?: string;
}

export interface NavCategory extends NavItem {
  href?: string;
  products?: NavItem[];
  subcategories?: NavSubcategory[];
}

function mapGroup(g: ProductGroup): NavProductGroup {
  return {
    id: g.id,
    name: g.name,
    productGroups: g.productGroups?.map(mapGroup),
  };
}

function mapSub(s: Subcategory): NavSubcategory {
  return {
    id: s.id,
    name: s.name,
    productGroups: s.productGroups?.map(mapGroup),
  };
}

function mapCategory(c: Category): NavCategory {
  return {
    id: c.id,
    name: c.name,
    products: c.products?.map((p) => ({ id: p.id, name: p.name })),
    subcategories: c.subcategories?.map(mapSub),
  };
}

export const navCategories: NavCategory[] = categories.map(mapCategory);

/** Legacy / mistyped category ids -> canonical id */
export const CATEGORY_ALIASES: Record<string, string> = {
  'industrial-edg-computers': 'industrial-edge-computers',
};

export function navCategoryHasDirectProducts(categoryId: string): boolean {
  const id = CATEGORY_ALIASES[categoryId] ?? categoryId;
  const cat = navCategories.find((c) => c.id === id);
  return Boolean(cat?.products?.length && !cat.subcategories?.length);
}

export const LIDAR_RADAR_PAGE = '/3d-lidar-radar-sensors';

const MENU_NESTING: Record<
  string,
  {
    label: string;
    href: string;
    children: { id: string; label: string; listItems: boolean }[];
  }
> = {
  lidar: {
    label: '3D LiDARs',
    href: LIDAR_RADAR_PAGE,
    children: [
      { id: 'lidar', label: 'LiDARs', listItems: true },
      { id: 'radar', label: 'Radars', listItems: false },
    ],
  },
};

export interface MenuLinkBuilders {
  category: (categoryId: string) => string;
  subcategory: (categoryId: string, subcategoryId: string) => string;
}

/** Link for one category entry when it is shown inside another (see MENU_NESTING). */
function nestedCategoryEntry(
  cat: NavCategory,
  label: string,
  listItems: boolean,
  links: MenuLinkBuilders,
): NavSubcategory {
  if (!listItems) {
    return { id: cat.id, name: label, href: links.category(cat.id) };
  }
  const groups: NavProductGroup[] = cat.subcategories?.length
    ? cat.subcategories.map((s) => ({
        id: s.id,
        name: s.name,
        href: links.subcategory(cat.id, s.id),
      }))
    : (cat.products ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        href: `/${cat.id}/${p.id}`,
      }));
  return {
    id: cat.id,
    name: label,
    href: links.category(cat.id),
    productGroups: groups,
  };
}

/**
 * Categories as the Products menu shows them: nested categories (MENU_NESTING)
 * are moved under their parent row.
 */
export function navMenuCategories(links: MenuLinkBuilders): NavCategory[] {
  const nestedIds = new Set(
    Object.entries(MENU_NESTING).flatMap(([parent, n]) =>
      n.children.map((c) => c.id).filter((id) => id !== parent),
    ),
  );
  return navCategories
    .filter((c) => !nestedIds.has(c.id))
    .map((c) => {
      const nesting = MENU_NESTING[c.id];
      if (!nesting) return c;
      const subcategories = nesting.children
        .map((child) => {
          const cat = navCategories.find((x) => x.id === child.id);
          return cat
            ? nestedCategoryEntry(cat, child.label, child.listItems, links)
            : null;
        })
        .filter((x): x is NavSubcategory => x !== null);
      return {
        id: c.id,
        name: nesting.label,
        href: nesting.href,
        subcategories,
      };
    });
}

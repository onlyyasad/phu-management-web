import { NavLink } from "react-router";
import type { TSidebarItem, TUserPaths } from "../types/sidebar.type";

export const sidebarItemsGenerator = (paths: TUserPaths[], role: string) => {
  const sidebarItems = paths.reduce((acc: TSidebarItem[], item, index) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      const children = item.children
        .map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            } as TSidebarItem;
          }
          return undefined;
        })
        .filter(Boolean) as TSidebarItem[];

      if (children.length) {
        acc.push({
          key: item.name ?? `group-${index}`,
          label: item.name ?? "",
          children,
        });
      }
    }
    return acc;
  }, [] as TSidebarItem[]);
  return sidebarItems;
};

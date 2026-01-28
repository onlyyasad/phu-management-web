export type TUserPaths = {
  name: string;
  path?: string;
  element?: React.ReactNode;
  children?: TUserPaths[];
};

export type TRoute = {
  path: string;
  element: React.ReactNode;
  children?: TRoute[];
};

export type TSidebarItem =
  | {
      key: string;
      label: React.ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

type SideMenuItemChild = {
    title: string;
    path: string;
}

export type SideMenuItem = {
    title: string;
    icon: string;
    path?: string;
    children?: SideMenuItemChild[];
}

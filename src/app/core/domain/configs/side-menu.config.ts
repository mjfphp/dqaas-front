import { SideMenuItem } from "../types/side-menu-item.type";

export const SIDE_MENU_ITEMS: SideMenuItem[] = [
    {
        title: 'Tableau de bord',
        icon: 'dashboard',
        path: '/dashboard',
    },
    {
        title: 'Gestion des projets',
        icon: 'folder',
        path: '/projects',
    },
    {
        title: 'Paramètres',
        icon: 'setting',
        children: [
            { title: 'Utilisateurs', path: '/users' },
            { title: 'Tokens', path: '/tokens' }
        ],
    }
];

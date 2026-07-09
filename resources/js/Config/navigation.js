// resources/js/Config/navigation.js
import {
    LayoutDashboard, ShoppingCart, Package, Tag,
    Truck, RefreshCw, Receipt, BarChart3, Users, Shield
} from 'lucide-react';

export const navigationConfig = [
    {
        group: 'Main',
        items: [
            { name: 'Dashboard', route: 'dashboard', pattern: 'dashboard', icon: LayoutDashboard },
            { name: 'POS', route: 'pos.index', pattern: 'pos.*', icon: ShoppingCart },
        ],
    },
    {
        group: 'Inventory',
        items: [
            { name: 'Products', route: 'products.index', pattern: 'products.*', icon: Package },
            { name: 'Categories', route: 'categories.index', pattern: 'categories.*', icon: Tag },
            { name: 'Suppliers', route: 'suppliers.index', pattern: 'suppliers.*', icon: Truck },
            { name: 'Stock Movements', route: 'stock-movements.index', pattern: 'stock-movements.*', icon: RefreshCw },
        ],
    },
    {
        group: 'Reports',
        items: [
            { name: 'Sales History', route: 'sales.index', pattern: 'sales.*', icon: Receipt },
            { name: 'Reports', route: 'reports.index', pattern: 'reports.*', icon: BarChart3 },
        ],
    },
    {
        group: 'Admin',
        items: [
            { name: 'Users', route: 'users.index', pattern: 'users.*', icon: Users, permission: 'manage-users' },
            { name: 'Roles', route: 'roles.index', pattern: 'roles.*', icon: Shield, permission: 'manage-roles' },
        ],
    },
];
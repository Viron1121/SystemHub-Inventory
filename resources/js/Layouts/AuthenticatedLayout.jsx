import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import SidebarLink from '@/Components/SidebarLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* ================= SIDEBAR ================= */}
            <aside className="hidden sm:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm">

                {/* Logo */}
                <div className="h-16 flex items-center px-5 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="h-8 w-auto text-gray-800" />
                        <span className="font-semibold text-gray-700">
                            Inventory
                        </span>
                    </Link>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">

                    <SidebarLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        📊 Dashboard
                    </SidebarLink>

                    <SidebarLink 
                        href={route('pos.index')}
                        active={route().current('pos.*')}
                    >
                        🛒 POS
                    </SidebarLink>

                    <SidebarLink 
                        href={route('products.index')}
                        active={route().current('products.*')}
                    >
                        📦 Products
                    </SidebarLink>

                    <SidebarLink 
                        href={route('categories.index')}
                        active={route().current('categories.*')}
                    >
                        🗂 Categories
                    </SidebarLink>

                    <SidebarLink 
                        href={route('suppliers.index')}
                        active={route().current('suppliers.*')}
                    >
                        🚚 Suppliers
                    </SidebarLink>

                    <SidebarLink 
                        href={route('stock-movements.index')}
                        active={route().current('stock-movements.*')}
                    >
                        🔄 Stock Movements
                    </SidebarLink>

                    <SidebarLink 
                        href={route('sales.index')}
                        active={route().current('sales.*')}
                    >
                        🧾 Sales History
                    </SidebarLink>

                    <SidebarLink 
                        href={route('reports.index')}
                        active={route().current('reports.*')}
                    >
                        📈 Reports
                    </SidebarLink>

                    <SidebarLink 
                        href={route('users.index')}
                        active={route().current('users.*')}
                    >
                        👤 Users
                    </SidebarLink>

                    <SidebarLink 
                        href={route('roles.index')}
                        active={route().current('roles.*')}
                    >
                        🛡️ Roles
                    </SidebarLink>

                </nav>

                {/* Footer user */}
                <div className="border-t p-4">
                    <div className="text-sm font-medium text-gray-700">
                        {user.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {user.email}
                    </div>
                </div>

            </aside>

            {/* ================= MAIN AREA ================= */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <nav className="bg-white border-b shadow-sm">
                    <div className="px-6 h-16 flex items-center justify-between">

                        <div className="flex items-center gap-2 sm:hidden">
                            <ApplicationLogo className="h-8 w-auto text-gray-800" />
                            <span className="font-semibold">Inventory</span>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4 ml-auto">

                            {/* User dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                                        <span className="text-sm text-gray-700">
                                            {user.name}
                                        </span>
                                        <span className="text-xs">▼</span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>

                            {/* Mobile toggle */}
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(prev => !prev)
                                }
                                className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
                            >
                                ☰
                            </button>

                        </div>
                    </div>

                    {/* MOBILE MENU */}
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t bg-white shadow-inner'}>
                        <div className="p-4 space-y-1">

                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                📊 Dashboard
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('pos.index')} active={route().current('pos.*')}>
                                🛒 POS
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('products.index')} active={route().current('products.*')}>
                                📦 Products
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('categories.index')} active={route().current('categories.*')}>
                                🗂 Categories
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('suppliers.index')} active={route().current('suppliers.*')}>
                                🚚 Suppliers
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('stock-movements.index')} active={route().current('stock-movements.*')}>
                                🔄 Stock Movements
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('sales.index')} active={route().current('sales.*')}>
                                🧾 Sales History
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('reports.index')} active={route().current('reports.*')}>
                                📈 Reports
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}>
                                👤 Users
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('roles.index')} active={route().current('roles.*')}>
                                🛡️ Roles
                            </ResponsiveNavLink>

                        </div>
                    </div>
                </nav>

                {/* HEADER */}
                {header && (
                    <header className="bg-white shadow-sm">
                        <div className="px-6 py-4">
                            {header}
                        </div>
                    </header>
                )}

                {/* CONTENT */}
                <main className="p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
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
                <nav className="flex-1 px-4 py-6 space-y-1">

                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="flex items-center gap-2 px-10 py-2 rounded-lg transition hover:bg-gray-100"
                    >
                        📊 Dashboard
                    </NavLink>

                    {/* Future modules */}
                    <NavLink  className="flex w-full items-center gap-2 px-10 py-2 rounded-lg hover:bg-gray-100">
                        📦 Products
                    </NavLink>

                     <NavLink href={route('users.index')} className="flex w-full items-center gap-2 px-10 py-2 rounded-lg hover:bg-gray-100">
                        👤 Users
                    </NavLink>
 {/*
                    <NavLink href={route('categories.index')} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                        🗂 Categories
                    </NavLink>
                    */}


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
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t bg-white'}>
                        <div className="p-4 space-y-2">

                            <ResponsiveNavLink href={route('dashboard')}>
                                📊 Dashboard
                            </ResponsiveNavLink>

                            {/* future links */}
                            {/*
                            <ResponsiveNavLink href={route('products.index')}>
                                📦 Products
                            </ResponsiveNavLink>
                            */}

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
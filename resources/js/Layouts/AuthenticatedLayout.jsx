import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Sidebar from '@/Components/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white shadow-sm sm:flex">

                {/* Logo */}
                <div className="flex h-16 items-center border-b px-5">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="h-8 w-auto text-gray-800" />
                        <span className="font-semibold text-gray-700">
                            Inventory
                        </span>
                    </Link>
                </div>

                {/* Nav */}
                <Sidebar />

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
            <div className="flex flex-1 flex-col">

                {/* TOP NAVBAR */}
                <nav className="bg-white shadow-sm">
                    <div className="flex h-16 items-center justify-between px-6">

                        <div className="flex items-center gap-2 sm:hidden">
                            <ApplicationLogo className="h-8 w-auto text-gray-800" />
                            <span className="font-semibold">Inventory</span>
                        </div>

                        {/* Right side */}
                        <div className="ml-auto flex items-center gap-4">

                            {/* User dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100">
                                        <span className="text-sm text-gray-700">
                                            {user.name}
                                        </span>
                                        <ChevronDown size={14} className="text-gray-500" />
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
                                    setShowingNavigationDropdown((prev) => !prev)
                                }
                                className="rounded-lg p-2 hover:bg-gray-100 sm:hidden"
                            >
                                <Menu size={20} className="text-gray-600" />
                            </button>

                        </div>
                    </div>

                    {/* MOBILE MENU — reuses the same Sidebar component */}
                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' border-t bg-white shadow-inner sm:hidden'
                        }
                    >
                        <Sidebar />
                    </div>
                </nav>

                {/* HEADER */}
                {header && (
                    <header className="bg-white shadow-sm">
                        <div className="px-6 py-4">{header}</div>
                    </header>
                )}

                {/* CONTENT */}
                <main className="p-6">{children}</main>

            </div>
        </div>
    );
}

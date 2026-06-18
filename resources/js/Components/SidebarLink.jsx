import { Link } from '@inertiajs/react';

export default function SidebarLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none w-full ${
                active
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            } ${className}`}
        >
            {children}
        </Link>
    );
}

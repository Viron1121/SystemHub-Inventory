import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function SidebarNavItem({ item, active }) {
    const Icon = item.icon;

    return (
        <Link
            href={route(item.route)}
            className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium no-underline transition
            ${
                active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <span className="flex items-center gap-3">
                <Icon
                    size={18}
                    strokeWidth={2}
                    className={active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}
                />
                {item.name}
            </span>

            {active && <ChevronRight size={16} className="text-indigo-600" />}
        </Link>
    );
}

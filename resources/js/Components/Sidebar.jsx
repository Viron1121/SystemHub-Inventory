import { usePage } from '@inertiajs/react';
import { navigationConfig } from '@/Config/navigation';
import SidebarGroup from '@/Components/SidebarGroup';

export default function Sidebar() {
    const { auth } = usePage().props;

    return (
        <nav className="flex-1 overflow-y-auto px-4 py-6">
            {navigationConfig.map(({ group, items }) => {
                const visibleItems = items.filter(
                    (item) =>
                        !item.permission ||
                        auth.user?.permissions?.includes(item.permission)
                );

                if (visibleItems.length === 0) return null;

                return (
                    <SidebarGroup
                        key={group}
                        group={group}
                        items={visibleItems}
                    />
                );
            })}
        </nav>
    );
}

import SidebarNavItem from '@/Components/SidebarNavItem';

export default function SidebarGroup({ group, items }) {
    return (
        <div className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {group}
            </p>

            <div className="space-y-1">
                {items.map((item) => (
                    <SidebarNavItem
                        key={item.route}
                        item={item}
                        active={route().current(item.pattern)}
                    />
                ))}
            </div>
        </div>
    );
}

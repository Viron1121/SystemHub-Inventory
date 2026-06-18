import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ movements }) {
    const columns = [
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: info => new Date(info.getValue()).toLocaleString()
        },
        {
            id: 'product',
            header: 'Product',
            cell: info => {
                const movement = info.row.original;
                return (
                    <span className="font-semibold text-gray-900">
                        {movement.product?.name} ({movement.product?.sku})
                    </span>
                );
            }
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: info => {
                const type = info.getValue();
                const badgeColor = type === 'IN' || type === 'RETURN' 
                    ? 'bg-green-100 text-green-800' 
                    : type === 'SALE' ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800';
                return (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColor}`}>
                        {type}
                    </span>
                );
            }
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: info => {
                const movement = info.row.original;
                const prefix = ['IN', 'RETURN'].includes(movement.type) ? '+' : '-';
                return (
                    <span className="font-bold text-gray-700">
                        {prefix}{info.getValue()}
                    </span>
                );
            }
        },
        {
            id: 'reference',
            header: 'Reference',
            cell: info => {
                const movement = info.row.original;
                return movement.reference_type ? `${movement.reference_type} #${movement.reference_id}` : '-';
            }
        },
        {
            accessorKey: 'user.name',
            header: 'User',
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stock Movements</h2>}>
            <Head title="Stock Movements" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Recent Movements</h3>
                                <Link 
                                    href={route('stock-movements.create')} 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Record Movement
                                </Link>
                            </div>

                            <DataTable 
                                columns={columns} 
                                data={movements} 
                                showSearch={true} 
                                searchPlaceholder="Search movements by product, type..."
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


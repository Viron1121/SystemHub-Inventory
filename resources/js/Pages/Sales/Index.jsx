import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ sales }) {
    const columns = [
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: info => new Date(info.getValue()).toLocaleString()
        },
        {
            accessorKey: 'invoice_number',
            header: 'Invoice',
            cell: info => <span className="font-semibold text-gray-900">{info.getValue()}</span>
        },
        {
            accessorKey: 'total_amount',
            header: 'Total Amount',
            cell: info => <span className="font-bold text-gray-700">${Number(info.getValue()).toFixed(2)}</span>
        },
        {
            accessorKey: 'payment_method',
            header: 'Payment Method',
            cell: info => <span className="capitalize">{info.getValue().replace('_', ' ')}</span>
        },
        {
            accessorKey: 'user.name',
            header: 'Cashier',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => {
                const status = info.getValue();
                const badgeColor = status === 'completed' ? 'bg-green-100 text-green-800' 
                    : status === 'void' ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800';
                return (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColor}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: info => {
                const sale = info.row.original;
                return (
                    <div className="text-right">
                        <Link href={route('sales.show', sale.id)} className="text-indigo-600 hover:text-indigo-900 font-medium">View Details</Link>
                    </div>
                );
            }
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sales History</h2>}>
            <Head title="Sales History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <h3 className="text-lg font-medium text-gray-900 mb-6">All Sales</h3>

                            <DataTable 
                                columns={columns} 
                                data={sales} 
                                showSearch={true} 
                                searchPlaceholder="Search sales by invoice, payment method..."
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


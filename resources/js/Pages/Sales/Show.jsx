import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Show({ sale }) {
    const itemColumns = [
        {
            id: 'product',
            header: 'Product',
            cell: info => {
                const item = info.row.original;
                return (
                    <span className="text-gray-900">
                        {item.product?.name} <span className="text-gray-400 text-xs">({item.product?.sku})</span>
                    </span>
                );
            }
        },
        {
            accessorKey: 'price',
            header: () => <div className="text-right">Price</div>,
            cell: info => <div className="text-right text-gray-500">${Number(info.getValue()).toFixed(2)}</div>
        },
        {
            accessorKey: 'quantity',
            header: () => <div className="text-center">Qty</div>,
            cell: info => <div className="text-center text-gray-500">{info.getValue()}</div>
        },
        {
            accessorKey: 'subtotal',
            header: () => <div className="text-right">Subtotal</div>,
            cell: info => <div className="text-right text-gray-900 font-medium">${Number(info.getValue()).toFixed(2)}</div>
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sale Details: {sale.invoice_number}</h2>}>
            <Head title={`Sale ${sale.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-4">
                        <Link href={route('sales.index')} className="text-indigo-600 hover:text-indigo-900">
                            &larr; Back to Sales History
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <h4 className="text-sm text-gray-500 uppercase tracking-wider">Invoice Number</h4>
                                    <p className="font-bold text-lg">{sale.invoice_number}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-gray-500 uppercase tracking-wider">Date</h4>
                                    <p className="font-bold text-lg">{new Date(sale.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-gray-500 uppercase tracking-wider">Cashier</h4>
                                    <p className="font-bold text-lg">{sale.user?.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-gray-500 uppercase tracking-wider">Status</h4>
                                    <p className="font-bold text-lg capitalize">{sale.status}</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-4">Items</h3>
                            
                            <div className="mb-8">
                                <DataTable 
                                    columns={itemColumns} 
                                    data={sale.sale_items || []} 
                                    showSearch={false} 
                                    defaultPageSize={5} 
                                    pageSizeOptions={[5, 10, 25]} 
                                />
                            </div>

                            <div className="flex justify-end">
                                <div className="w-64">
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-600 font-bold">Total Amount:</span>
                                        <span className="text-xl font-bold">${Number(sale.total_amount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-600">Payment Method:</span>
                                        <span className="capitalize">{sale.payment_method.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-600">Paid Amount:</span>
                                        <span>${Number(sale.paid_amount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Change:</span>
                                        <span>${Number(sale.change_amount).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


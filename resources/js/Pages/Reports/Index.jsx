import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ totalSales, totalOrders, lowStockProducts, topSellingProducts }) {
    const topSellingColumns = [
        {
            accessorKey: 'product.name',
            header: 'Product',
            cell: info => <span className="font-semibold text-gray-900">{info.getValue() || 'Unknown Product'}</span>
        },
        {
            accessorKey: 'total_sold',
            header: () => <div className="text-right">Total Sold</div>,
            cell: info => <div className="text-right font-bold text-gray-900">{info.getValue()}</div>
        }
    ];

    const lowStockColumns = [
        {
            accessorKey: 'name',
            header: 'Product',
            cell: info => <span className="font-semibold text-red-950">{info.getValue()}</span>
        },
        {
            accessorKey: 'stock_quantity',
            header: () => <div className="text-right">Stock</div>,
            cell: info => <div className="text-right font-bold text-red-700">{info.getValue()}</div>
        },
        {
            accessorKey: 'reorder_level',
            header: () => <div className="text-right">Reorder Level</div>,
            cell: info => <div className="text-right text-gray-700">{info.getValue()}</div>
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reports</h2>}>
            <Head title="Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <h3 className="text-sm font-bold text-gray-500 uppercase">Total Sales Revenue</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">${Number(totalSales).toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                            <h3 className="text-sm font-bold text-gray-500 uppercase">Total Orders Completed</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{totalOrders}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Top Selling Products */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
                                <DataTable 
                                    columns={topSellingColumns} 
                                    data={topSellingProducts || []} 
                                    showSearch={false} 
                                    defaultPageSize={5} 
                                    pageSizeOptions={[5, 10, 25]} 
                                    emptyStateMessage="No sales data available."
                                />
                            </div>
                        </div>

                        {/* Low Stock Alerts */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Low Stock Alerts</h3>
                                    <Link href={route('products.index')} className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">View All Products</Link>
                                </div>
                                <DataTable 
                                    columns={lowStockColumns} 
                                    data={lowStockProducts || []} 
                                    showSearch={false} 
                                    defaultPageSize={5} 
                                    pageSizeOptions={[5, 10, 25]} 
                                    getRowClassName={() => 'bg-red-50/50'}
                                    emptyStateMessage="All products are sufficiently stocked."
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}


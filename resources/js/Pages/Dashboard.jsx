import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import BaseLineChart from '../Components/Charts/BaseLineChart';

export default function Dashboard({ 
    totalSalesToday, 
    revenueToday, 
    totalProducts, 
    lowStockCount, 
    recentTransactions 
}) {
    const columns = [
        {
            accessorKey: 'invoice_number',
            header: 'Invoice',
            cell: info => {
                const transaction = info.row.original;
                return (
                    <Link href={route('sales.show', transaction.id)} className="hover:underline font-semibold text-gray-900">
                        {info.getValue()}
                    </Link>
                );
            }
        },
        {
            accessorKey: 'created_at',
            header: 'Time',
            cell: info => new Date(info.getValue()).toLocaleTimeString()
        },
        {
            accessorKey: 'total_amount',
            header: 'Amount',
            cell: info => <span className="font-bold text-gray-700">${Number(info.getValue()).toFixed(2)}</span>
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
        }
    ];

    const salesTrend = [
        { date: "Mon", revenue: 520 },
        { date: "Tue", revenue: 640 },
        { date: "Wed", revenue: 430 },
        { date: "Thu", revenue: 800 },
        { date: "Fri", revenue: 760 },
        { date: "Sat", revenue: 920 },
        { date: "Sun", revenue: 690 },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-b-4 border-indigo-500 hover:shadow-md transition">
                            <p className="text-sm font-medium text-gray-500 uppercase">Today's Revenue</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">${Number(revenueToday).toFixed(2)}</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border-b-4 border-blue-500 hover:shadow-md transition">
                            <p className="text-sm font-medium text-gray-500 uppercase">Sales Today</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalSalesToday}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-b-4 border-green-500 hover:shadow-md transition">
                            <p className="text-sm font-medium text-gray-500 uppercase">Total Products</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-b-4 border-red-500 hover:shadow-md transition">
                            <p className="text-sm font-medium text-gray-500 uppercase">Low Stock Alerts</p>
                            <p className="text-3xl font-bold text-red-600 mt-2">{lowStockCount}</p>
                        </div>
                    </div>
                    
                    {/* Recent Transactions Table */}
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                        {/* Left */}
                        <div className="lg:col-span-6">
                            <div className="bg-white rounded-xl shadow-sm border h-full p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Recent Transactions</h3>

                                    <Link
                                        href={route('sales.index')}
                                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                                    >
                                        View All
                                    </Link>
                                </div>

                                <DataTable
                                    columns={columns}
                                    data={recentTransactions || []}
                                    showSearch={false}
                                    defaultPageSize={5}
                                    pageSizeOptions={[5, 10, 20]}
                                />
                            </div>
                        </div>

                        {/* Right */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-xl shadow-sm border h-full p-6">
                                <BaseLineChart
                                    title="Sales Trend"
                                    data={salesTrend}
                                    xKey="date"
                                    dataKey="revenue"
                                />
                            </div>
                        </div>
                    </div>

                   

                </div>
            </div>
        </AuthenticatedLayout>
    );
}


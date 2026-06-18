import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Show({ user }) {
    const salesColumns = [
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: info => new Date(info.getValue()).toLocaleString()
        },
        {
            accessorKey: 'invoice_number',
            header: 'Invoice Number',
            cell: info => {
                const sale = info.row.original;
                return (
                    <Link href={route('sales.show', sale.id)} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                        {info.getValue()}
                    </Link>
                );
            }
        },
        {
            accessorKey: 'total_amount',
            header: 'Amount',
            cell: info => <span className="font-bold text-gray-700">${Number(info.getValue()).toFixed(2)}</span>
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => {
                const status = info.getValue();
                const badgeColor = status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
                return (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColor}`}>
                        {status}
                    </span>
                );
            }
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Details</h2>}>
            <Head title={`User - ${user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="mb-4">
                        <Link href={route('users.index')} className="text-indigo-600 hover:text-indigo-900 font-medium">
                            &larr; Back to Users
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase">Name</h4>
                                    <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase">Email</h4>
                                    <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase">Role</h4>
                                    <p className="mt-1 text-lg text-gray-900 capitalize">
                                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                            {user.role?.name || 'N/A'}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 uppercase">Member Since</h4>
                                    <p className="mt-1 text-lg text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
                                <Link 
                                    href={route('users.edit', user.id)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                >
                                    Edit User
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sales Handled by this User */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-4">Sales Handled</h3>
                            
                            <DataTable 
                                columns={salesColumns} 
                                data={user.sales || []} 
                                showSearch={false} 
                                defaultPageSize={5} 
                                pageSizeOptions={[5, 10, 25]} 
                                emptyStateMessage="No sales handled by this user."
                            />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}


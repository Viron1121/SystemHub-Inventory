import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ suppliers }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this supplier?')) {
            destroy(route('suppliers.destroy', id));
        }
    };

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => <span className="font-semibold text-gray-900">{info.getValue()}</span>
        },
        {
            accessorKey: 'contact_person',
            header: 'Contact',
        },
        {
            id: 'phone_email',
            header: 'Phone / Email',
            cell: info => {
                const supplier = info.row.original;
                return (
                    <div>
                        <div>{supplier.phone}</div>
                        <div className="text-xs text-gray-400">{supplier.email}</div>
                    </div>
                );
            }
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: info => {
                const supplier = info.row.original;
                return (
                    <div className="text-right space-x-2">
                        <Link href={route('suppliers.edit', supplier.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                        <button onClick={() => handleDelete(supplier.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                );
            }
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suppliers</h2>}>
            <Head title="Suppliers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">All Suppliers</h3>
                                <Link 
                                    href={route('suppliers.create')} 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Add Supplier
                                </Link>
                            </div>

                            <DataTable 
                                columns={columns} 
                                data={suppliers} 
                                showSearch={true} 
                                searchPlaceholder="Search suppliers by name, contact..."
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


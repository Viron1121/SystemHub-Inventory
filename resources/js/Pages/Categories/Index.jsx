import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index({ categories }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('categories.destroy', id));
        }
    };

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => <span className="font-semibold text-gray-900">{info.getValue()}</span>
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: info => {
                const category = info.row.original;
                return (
                    <div className="text-right space-x-2">
                        <Link href={route('categories.edit', category.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                        <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                );
            }
        }
    ];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}>
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">All Categories</h3>
                                <Link 
                                    href={route('categories.create')} 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Add Category
                                </Link>
                            </div>

                            <DataTable 
                                columns={columns} 
                                data={categories} 
                                showSearch={true} 
                                searchPlaceholder="Search categories by name..."
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


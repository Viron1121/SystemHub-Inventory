import { Link, useForm } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function ProductTable({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('products.destroy', id));
        }
    };

    const columns = [
        {
            accessorKey: 'sku',
            header: 'SKU',
        },
        {
            accessorKey: 'name',
            header: 'Product Name',
            cell: info => <span className="font-semibold text-gray-900">{info.getValue()}</span>
        },
        {
            accessorKey: 'category.name',
            header: 'Category',
            cell: info => info.getValue() || 'N/A'
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: info => <span>${Number(info.getValue()).toFixed(2)}</span>
        },
        {
            accessorKey: 'stock_quantity',
            header: 'Stock',
            cell: info => {
                const product = info.row.original;
                const isLow = product.stock_quantity <= product.reorder_level;
                return (
                    <span className={isLow ? 'text-red-600 font-bold' : ''}>
                        {info.getValue()}
                    </span>
                );
            }
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: info => {
                const isActive = info.getValue();
                return isActive ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                );
            }
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: info => {
                const product = info.row.original;
                return (
                    <div className="text-right space-x-2">
                        <Link href={route('products.edit', product.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                );
            }
        }
    ];

    return (
        <DataTable 
            columns={columns} 
            data={products} 
            showSearch={true} 
            searchPlaceholder="Search products by SKU, name, category..."
        />
    );
}


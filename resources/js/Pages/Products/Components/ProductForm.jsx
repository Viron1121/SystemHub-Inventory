import { Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ProductForm({ product, categories, suppliers, isEdit = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        sku: product?.sku || '',
        barcode: product?.barcode || '',
        category_id: product?.category_id || '',
        supplier_id: product?.supplier_id || '',
        price: product?.price || '',
        cost_price: product?.cost_price || '',
        reorder_level: product?.reorder_level || 0,
        is_active: product?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('products.update', product.id));
        } else {
            post(route('products.store'));
        }
    };

    return (
        <form onSubmit={submit} className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="name" value="Product Name *" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={!isEdit}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="sku" value="SKU (Stock Keeping Unit) *" />
                    <TextInput
                        id="sku"
                        type="text"
                        name="sku"
                        value={data.sku}
                        className="mt-1 block w-full bg-gray-50"
                        onChange={(e) => setData('sku', e.target.value)}
                        required
                    />
                    <InputError message={errors.sku} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="barcode" value="Barcode" />
                    <TextInput
                        id="barcode"
                        type="text"
                        name="barcode"
                        value={data.barcode}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('barcode', e.target.value)}
                    />
                    <InputError message={errors.barcode} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1 flex items-center mt-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-600">Product is Active</span>
                    </label>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="category_id" value="Category *" />
                    <select
                        id="category_id"
                        name="category_id"
                        value={data.category_id}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                        onChange={(e) => setData('category_id', e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="supplier_id" value="Supplier *" />
                    <select
                        id="supplier_id"
                        name="supplier_id"
                        value={data.supplier_id}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                        onChange={(e) => setData('supplier_id', e.target.value)}
                        required
                    >
                        <option value="">Select a supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.supplier_id} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="price" value="Selling Price *" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <TextInput
                            id="price"
                            type="number"
                            step="0.01"
                            name="price"
                            value={data.price}
                            className="block w-full pl-7"
                            onChange={(e) => setData('price', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="cost_price" value="Cost Price *" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <TextInput
                            id="cost_price"
                            type="number"
                            step="0.01"
                            name="cost_price"
                            value={data.cost_price}
                            className="block w-full pl-7"
                            onChange={(e) => setData('cost_price', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.cost_price} className="mt-2" />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <InputLabel htmlFor="reorder_level" value="Reorder Level" />
                    <TextInput
                        id="reorder_level"
                        type="number"
                        name="reorder_level"
                        value={data.reorder_level}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('reorder_level', e.target.value)}
                    />
                    <InputError message={errors.reorder_level} className="mt-2" />
                </div>

                {isEdit && (
                    <div className="col-span-2 md:col-span-1">
                        <InputLabel value="Current Stock (Read Only)" />
                        <TextInput
                            type="number"
                            value={product.stock_quantity}
                            className="mt-1 block w-full bg-gray-100"
                            disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Stock can only be modified via Stock Movements.</p>
                    </div>
                )}

            </div>

            <div className="flex items-center justify-end mt-8 border-t pt-6">
                <Link href={route('products.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                    Cancel
                </Link>
                <PrimaryButton disabled={processing}>
                    {isEdit ? 'Update Product' : 'Save Product'}
                </PrimaryButton>
            </div>
        </form>
    );
}

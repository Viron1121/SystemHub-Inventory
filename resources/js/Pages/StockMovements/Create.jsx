import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ products }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        type: 'IN',
        quantity: '',
        reference_type: 'manual',
        reference_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('stock-movements.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Record Stock Movement</h2>}>
            <Head title="Record Stock Movement" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <form onSubmit={submit} className="max-w-xl">
                                
                                <div className="mb-4">
                                    <InputLabel htmlFor="product_id" value="Product *" />
                                    <select
                                        id="product_id"
                                        name="product_id"
                                        value={data.product_id}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a product</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} (SKU: {product.sku}) - Stock: {product.stock_quantity}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.product_id} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <InputLabel htmlFor="type" value="Movement Type *" />
                                        <select
                                            id="type"
                                            name="type"
                                            value={data.type}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            onChange={(e) => setData('type', e.target.value)}
                                            required
                                        >
                                            <option value="IN">Stock IN (Add)</option>
                                            <option value="OUT">Stock OUT (Deduct)</option>
                                            <option value="ADJUSTMENT">Adjustment (Deduct)</option>
                                            <option value="RETURN">Return (Add)</option>
                                        </select>
                                        <InputError message={errors.type} className="mt-2" />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="quantity" value="Quantity *" />
                                        <TextInput
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            name="quantity"
                                            value={data.quantity}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('quantity', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.quantity} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="reference_type" value="Reference Type" />
                                    <select
                                        id="reference_type"
                                        name="reference_type"
                                        value={data.reference_type}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        onChange={(e) => setData('reference_type', e.target.value)}
                                    >
                                        <option value="manual">Manual Entry</option>
                                        <option value="purchase">Purchase Order</option>
                                        <option value="return">Customer Return</option>
                                    </select>
                                    <InputError message={errors.reference_type} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-6 pt-4 border-t">
                                    <Link href={route('stock-movements.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Record Movement
                                    </PrimaryButton>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

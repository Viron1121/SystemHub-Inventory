import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductForm from './Components/ProductForm';

export default function Edit({ product, categories, suppliers }) {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product</h2>}>
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            
                            <ProductForm 
                                product={product}
                                categories={categories} 
                                suppliers={suppliers} 
                                isEdit={true} 
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

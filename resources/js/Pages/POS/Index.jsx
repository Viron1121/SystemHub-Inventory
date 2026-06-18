import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Cart from './Cart';
import CheckoutModal from './CheckoutModal';

export default function Index({ products }) {
    const { errors, flash } = usePage().props;
    const [cart, setCart] = useState([]);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product_id === product.id);
            if (existingItem) {
                if (existingItem.quantity >= product.stock_quantity) {
                    alert('Cannot add more than available stock.');
                    return prevCart;
                }
                return prevCart.map(item => 
                    item.product_id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            return [...prevCart, { product_id: product.id, name: product.name, price: product.price, quantity: 1, stock: product.stock_quantity }];
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart => prevCart.map(item => {
            if (item.product_id === productId) {
                if (newQuantity > item.stock) {
                    alert('Cannot exceed available stock.');
                    return item;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.product_id !== productId));
    };

    const clearCart = () => setCart([]);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Point of Sale</h2>}>
            <Head title="POS" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}
                    {errors?.checkout && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{errors.checkout}</span>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Products Section */}
                        <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Search products by name or SKU..." 
                                    className="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map(product => (
                                    <div 
                                        key={product.id} 
                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-indigo-300 transition"
                                        onClick={() => addToCart(product)}
                                    >
                                        <div className="font-bold text-gray-800 h-10 overflow-hidden">{product.name}</div>
                                        <div className="text-xs text-gray-500 mb-2">SKU: {product.sku}</div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-indigo-600 font-bold">${Number(product.price).toFixed(2)}</span>
                                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Stock: {product.stock_quantity}</span>
                                        </div>
                                    </div>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <div className="col-span-full text-center py-8 text-gray-500 bg-white rounded-lg">
                                        No products found.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart Section */}
                        <div className="w-full md:w-96">
                            <Cart 
                                cart={cart} 
                                updateQuantity={updateQuantity} 
                                removeFromCart={removeFromCart} 
                                clearCart={clearCart} 
                                onCheckout={() => setIsCheckoutModalOpen(true)}
                                totalAmount={totalAmount}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CheckoutModal 
                isOpen={isCheckoutModalOpen} 
                onClose={() => setIsCheckoutModalOpen(false)}
                cart={cart}
                totalAmount={totalAmount}
                onSuccess={clearCart}
            />
        </AuthenticatedLayout>
    );
}

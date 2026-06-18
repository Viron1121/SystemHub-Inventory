export default function Cart({ cart, updateQuantity, removeFromCart, clearCart, onCheckout, totalAmount }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col" style={{ minHeight: '500px' }}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                <h3 className="font-bold text-lg text-gray-800">Current Order</h3>
                {cart.length > 0 && (
                    <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-800">Clear</button>
                )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {cart.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        Cart is empty
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cart.map(item => (
                            <li key={item.product_id} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex-1 pr-2">
                                    <div className="font-medium text-gray-800">{item.name}</div>
                                    <div className="text-sm text-gray-500">${Number(item.price).toFixed(2)}</div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center border rounded-md">
                                        <button 
                                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200" 
                                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                        >-</button>
                                        <span className="px-3 text-sm">{item.quantity}</span>
                                        <button 
                                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200" 
                                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                        >+</button>
                                    </div>
                                    <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                    <button onClick={() => removeFromCart(item.product_id)} className="text-xs text-red-500">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex justify-between items-center mb-4 text-xl font-bold text-gray-800">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
                <button 
                    onClick={onCheckout}
                    disabled={cart.length === 0}
                    className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

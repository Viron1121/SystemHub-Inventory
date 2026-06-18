import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function CheckoutModal({ isOpen, onClose, cart, totalAmount, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        items: [],
        payment_method: 'cash',
        paid_amount: '',
    });

    useEffect(() => {
        if (isOpen) {
            setData(data => ({
                ...data,
                items: cart,
                paid_amount: totalAmount.toFixed(2),
                payment_method: 'cash'
            }));
        }
    }, [isOpen, cart, totalAmount]);

    const submit = (e) => {
        e.preventDefault();
        post(route('pos.checkout'), {
            onSuccess: () => {
                onSuccess();
                onClose();
                reset();
            }
        });
    };

    if (!isOpen) return null;

    const change = Math.max(0, parseFloat(data.paid_amount || 0) - totalAmount);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
            <div className="relative w-full max-w-md mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                        <h3 className="text-2xl font-semibold">Checkout</h3>
                        <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={onClose}>
                            <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                    </div>

                    <div className="relative p-6 flex-auto">
                        <form id="checkout-form" onSubmit={submit}>
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-700">Order Summary</h4>
                                <div className="text-sm text-gray-600 mb-2">{cart.length} items</div>
                                <div className="flex justify-between items-center text-xl font-bold">
                                    <span>Total Amount:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                                <select 
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.payment_method}
                                    onChange={e => setData('payment_method', e.target.value)}
                                >
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Amount Paid</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.paid_amount}
                                    onChange={e => setData('paid_amount', e.target.value)}
                                    required
                                    min={totalAmount}
                                />
                                {errors.paid_amount && <p className="text-red-500 text-xs italic">{errors.paid_amount}</p>}
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-bold text-gray-700">Change:</span>
                                    <span className={`font-bold ${change > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                        ${change.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                        <button
                            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-600 text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-gray-400"
                            type="submit"
                            form="checkout-form"
                            disabled={processing || parseFloat(data.paid_amount || 0) < totalAmount}
                        >
                            Complete Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

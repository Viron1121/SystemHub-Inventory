<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;

class POSController extends Controller
{
    public function index()
    {
        return Inertia::render('POS/Index', [
            'products' => Product::where('is_active', true)->where('stock_quantity', '>', 0)->get()
        ]);
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'paid_amount' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $totalAmount = 0;
            
            // Calculate total and validate stock
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                if ($product->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for {$product->name}");
                }
                $totalAmount += $item['quantity'] * $item['price'];
            }

            if ($validated['paid_amount'] < $totalAmount) {
                throw new \Exception("Paid amount is less than total amount");
            }

            $changeAmount = $validated['paid_amount'] - $totalAmount;

            $sale = Sale::create([
                'invoice_number' => 'INV-' . strtoupper(uniqid()),
                'user_id' => auth()->id(),
                'total_amount' => $totalAmount,
                'payment_method' => $validated['payment_method'],
                'paid_amount' => $validated['paid_amount'],
                'change_amount' => $changeAmount,
                'status' => 'completed',
            ]);

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['quantity'] * $item['price'],
                ]);

                // Deduct stock
                $product->decrement('stock_quantity', $item['quantity']);

                // Create stock movement
                StockMovement::create([
                    'product_id' => $item['product_id'],
                    'user_id' => auth()->id(),
                    'type' => 'SALE',
                    'quantity' => $item['quantity'],
                    'reference_type' => 'sale',
                    'reference_id' => $sale->id,
                ]);
            }

            DB::commit();

            return redirect()->route('pos.index')->with('success', 'Checkout successful! Invoice: ' . $sale->invoice_number);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['checkout' => $e->getMessage()]);
        }
    }
}

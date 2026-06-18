<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StockMovement;
use App\Models\Product;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    public function index()
    {
        return Inertia::render('StockMovements/Index', [
            'movements' => StockMovement::with(['product', 'user'])->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('StockMovements/Create', [
            'products' => Product::where('is_active', true)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:IN,OUT,ADJUSTMENT,RETURN',
            'quantity' => 'required|integer|min:1',
            'reference_type' => 'nullable|in:purchase,manual,return',
            'reference_id' => 'nullable|integer',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Update product stock
        if (in_array($validated['type'], ['IN', 'RETURN'])) {
            $product->increment('stock_quantity', $validated['quantity']);
        } else {
            // OUT, ADJUSTMENT (if adjustment is negative, we handle it as OUT maybe?)
            // Wait, an adjustment could be a SET value. Let's assume quantity is absolute for IN/OUT.
            if ($product->stock_quantity < $validated['quantity']) {
                return back()->withErrors(['quantity' => 'Insufficient stock for this operation.']);
            }
            $product->decrement('stock_quantity', $validated['quantity']);
        }

        $validated['user_id'] = auth()->id();
        StockMovement::create($validated);

        return redirect()->route('stock-movements.index')->with('success', 'Stock movement recorded successfully.');
    }
}

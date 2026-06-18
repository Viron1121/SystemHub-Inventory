<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Product;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        return Inertia::render('Sales/Index', [
            'sales' => Sale::with(['user'])->latest()->get()
        ]);
    }

    public function show(Sale $sale)
    {
        $sale->load(['user', 'saleItems.product']);
        return Inertia::render('Sales/Show', [
            'sale' => $sale
        ]);
    }
}

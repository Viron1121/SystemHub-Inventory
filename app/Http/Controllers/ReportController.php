<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // Simple reporting data
        $totalSales = Sale::where('status', 'completed')->sum('total_amount');
        $totalOrders = Sale::where('status', 'completed')->count();
        $lowStockProducts = Product::whereRaw('stock_quantity <= reorder_level')->where('is_active', true)->get();
        $topSellingProducts = SaleItem::select('product_id', DB::raw('SUM(quantity) as total_sold'))
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->take(5)
            ->with('product')
            ->get();

        return Inertia::render('Reports/Index', [
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'lowStockProducts' => $lowStockProducts,
            'topSellingProducts' => $topSellingProducts
        ]);
    }
}

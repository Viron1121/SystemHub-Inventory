<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Sale;
use App\Models\Product;
use Carbon\Carbon;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Roles\RoleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ReportController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $today = Carbon::today();
    
    $totalSalesToday = Sale::whereDate('created_at', $today)->where('status', 'completed')->count();
    $revenueToday = Sale::whereDate('created_at', $today)->where('status', 'completed')->sum('total_amount');
    $totalProducts = Product::count();
    $lowStockCount = Product::whereRaw('stock_quantity <= reorder_level')->where('is_active', true)->count();
    $recentTransactions = Sale::with('user')->latest()->take(5)->get();

    return Inertia::render('Dashboard', [
        'totalSalesToday' => $totalSalesToday,
        'revenueToday' => $revenueToday,
        'totalProducts' => $totalProducts,
        'lowStockCount' => $lowStockCount,
        'recentTransactions' => $recentTransactions
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    
    // Inventory Routes
    Route::resource('categories', CategoryController::class);
    Route::resource('suppliers', SupplierController::class);
    Route::resource('products', ProductController::class);
    
    // Stock Movements
    Route::get('/stock-movements', [StockMovementController::class, 'index'])->name('stock-movements.index');
    Route::get('/stock-movements/create', [StockMovementController::class, 'create'])->name('stock-movements.create');
    Route::post('/stock-movements', [StockMovementController::class, 'store'])->name('stock-movements.store');
    
    // POS
    Route::get('/pos', [POSController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [POSController::class, 'checkout'])->name('pos.checkout');
    
    // Sales History
    Route::get('/sales', [SaleController::class, 'index'])->name('sales.index');
    Route::get('/sales/{sale}', [SaleController::class, 'show'])->name('sales.show');
    
    // Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});


require __DIR__.'/auth.php';

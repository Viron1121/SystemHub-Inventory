<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Roles\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $today = \Carbon\Carbon::today();
    
    $totalSalesToday = \App\Models\Sale::whereDate('created_at', $today)->where('status', 'completed')->count();
    $revenueToday = \App\Models\Sale::whereDate('created_at', $today)->where('status', 'completed')->sum('total_amount');
    $totalProducts = \App\Models\Product::count();
    $lowStockCount = \App\Models\Product::whereRaw('stock_quantity <= reorder_level')->where('is_active', true)->count();
    $recentTransactions = \App\Models\Sale::with('user')->latest()->take(5)->get();

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
    Route::resource('categories', \App\Http\Controllers\CategoryController::class);
    Route::resource('suppliers', \App\Http\Controllers\SupplierController::class);
    Route::resource('products', \App\Http\Controllers\ProductController::class);
    
    // Stock Movements
    Route::get('/stock-movements', [\App\Http\Controllers\StockMovementController::class, 'index'])->name('stock-movements.index');
    Route::get('/stock-movements/create', [\App\Http\Controllers\StockMovementController::class, 'create'])->name('stock-movements.create');
    Route::post('/stock-movements', [\App\Http\Controllers\StockMovementController::class, 'store'])->name('stock-movements.store');
    
    // POS
    Route::get('/pos', [\App\Http\Controllers\POSController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [\App\Http\Controllers\POSController::class, 'checkout'])->name('pos.checkout');
    
    // Sales History
    Route::get('/sales', [\App\Http\Controllers\SaleController::class, 'index'])->name('sales.index');
    Route::get('/sales/{sale}', [\App\Http\Controllers\SaleController::class, 'show'])->name('sales.show');
    
    // Reports
    Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
});


require __DIR__.'/auth.php';

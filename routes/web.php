<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\InterfazController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenuProductoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
    Route::get('/categoria/create', [CategoriaController::class, 'create'])->name('categoria.create');
    Route::post('/categoria', [CategoriaController::class, 'store'])->name('categoria.store');
    Route::get('/categoria/edit/{id}', [CategoriaController::class, 'edit'])->name('categoria.edit');
    Route::put('/categoria/{id}', [CategoriaController::class, 'update'])->name('categoria.update');
    Route::delete('/categoria/{id}', [CategoriaController::class, 'destroy'])->name('categoria.destroy');

    Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('/producto/create', [ProductoController::class, 'create'])->name('producto.create');
    Route::post('/producto', [ProductoController::class, 'store'])->name('producto.store');
    Route::get('/producto/edit/{id}', [ProductoController::class, 'edit'])->name('producto.edit');
    Route::put('/producto/{id}', [ProductoController::class, 'update'])->name('producto.update');
    Route::delete('/producto/{id}', [ProductoController::class, 'destroy'])->name('producto.destroy');

    Route::get('/clientes', [ClienteController::class, 'index'])->name('clientes.index');
    Route::get('/cliente/create', [ClienteController::class, 'create'])->name('cliente.create');
    Route::post('/cliente', [ClienteController::class, 'store'])->name('cliente.store');
    Route::get('/cliente/edit/{id}', [ClienteController::class, 'edit'])->name('cliente.edit');
    Route::put('/cliente/{id}', [ClienteController::class, 'update'])->name('cliente.update');
    Route::delete('/cliente/{id}', [ClienteController::class, 'destroy'])->name('cliente.destroy');

    Route::get('/menus', [MenuController::class, 'index'])->name('menus.index');
    Route::get('/menu/create', [MenuController::class, 'create'])->name('menu.create');
    Route::post('/menu', [MenuController::class, 'store'])->name('menu.store');
    Route::get('/menu/edit/{id}', [MenuController::class, 'edit'])->name('menu.edit');
    Route::get('/menu/detail/{id}', [MenuController::class, 'detail'])->name('menu.detail');
    Route::put('/menu/{id}', [MenuController::class, 'update'])->name('menu.update');
    Route::delete('/menu/{id}', [MenuController::class, 'destroy'])->name('menu.destroy');


    Route::get('/menu-productos', [MenuProductoController::class, 'index'])->name('menu-productos.index');
    Route::get('/menu-producto/create', [MenuProductoController::class, 'create'])->name('menu-producto.create');
    Route::post('/menu-producto', [MenuProductoController::class, 'store'])->name('menu-producto.store');
    Route::get('/menu-producto/edit/{id}', [MenuProductoController::class, 'edit'])->name('menu-producto.edit');
    Route::get('/menu-producto/detail/{id}', [MenuProductoController::class, 'detail'])->name('menu-producto.detail');
    Route::post('/menu-producto/{id}', [MenuProductoController::class, 'update'])->name('menu-producto.update');
    Route::delete('/menu-producto/{id}', [MenuProductoController::class, 'destroy'])->name('menu-producto.destroy');

    Route::get('/pedidos', [PedidoController::class, 'index'])->name('pedidos.index');
    Route::get('/pedido/create', [PedidoController::class, 'create'])->name('pedido.create');
    Route::post('/pedido', [PedidoController::class, 'store'])->name('pedido.store');
    Route::get('/pedido/edit/{id}', [PedidoController::class, 'edit'])->name('pedido.edit');
    Route::get('/pedido/detail/{id}', [PedidoController::class, 'detail'])->name('pedido.detail');
    Route::put('/pedido/{id}', [PedidoController::class, 'update'])->name('pedido.update');
    Route::delete('/pedido/{id}', [PedidoController::class, 'destroy'])->name('pedido.destroy');

    Route::get('/example_almacen',[InterfazController::class,'example_almacen'])->name('index.almacen.example');
    Route::get('/example_pedido',[InterfazController::class,'example_pedido'])->name('index.almacen.example');
    Route::get('/example_horario',[InterfazController::class,'example_horario'])->name('index.almacen.example');
    Route::get('/example_menu',[InterfazController::class,'example_menu'])->name('index.almacen.example');
});

require __DIR__.'/auth.php';

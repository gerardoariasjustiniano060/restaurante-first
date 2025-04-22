<?php

namespace App\Http\Controllers;

use App\Models\ComboModel;
use App\Models\MenuModel;
use App\Models\MenuProductoModel;
use App\Models\ProductoModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index(){
        $search = request('search');
        $query = MenuModel::query();

        if (request('search')) {
            $query->where('nombre', 'like', '%' . $search . '%')
            ->orWhere('descripcion', 'like', '%' . $search . '%');
        }

        $menus = $query->orderBy('id', 'desc')
        ->paginate(10);

        return Inertia::render('Menus/Index',[
            'menus' => $menus
        ]);
    }


    public function create(){
        $menu = new MenuModel();

        return Inertia::render('Menus/Formulario',[
            'isEdit' => false,
            'menu' => $menu
        ]);
    }

    public function edit($id){
        $menu = $menu = MenuModel::with([
            'menu_productos.producto.categoria', // Carga cada producto asociado
            'menu_productos.combos.producto' // Carga los combos y sus productos relacionados
        ])->find($id); 
        
        $productos = ProductoModel::with('categoria')->get();

        return Inertia::render('Menus/Formulario',[
            'isEdit' => false,
            'menu' => $menu,
            'productos' => $productos
        ]);
    }

    public function detail($id){
        $menu = $menu = MenuModel::with([
            'menu_productos.producto.categoria', // Carga cada producto asociado
            'menu_productos.combos.producto' // Carga los combos y sus productos relacionados
        ])->find($id); 
        
        return Inertia::render('Menus/Detail',[
            'menu' => $menu,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
        ]);

        $menu = MenuModel::create($validated);

        foreach ($request->productos as $key => $producto) {
            
            $menu_producto = MenuProductoModel::create([
                'precio' => $producto->precio,
                'descripcion' => $producto->descripcion,
                'completo' => $producto->completo,
                'producto_id' => $producto->producto_id,
                'menu_id' => $menu->id,
            ]);

            foreach ($producto->combos as $key => $combo) {
                ComboModel::create([
                    'precio' =>  $combo->precio,
                    'descripcion' =>  $combo->descripcion,
                    'producto_id' =>  $combo->producto_id,
                    'menu_producto_id' =>  $menu_producto->id, 
                ]);
            }
        }

        return to_route('menus.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
        ]);

        $menu = MenuModel::findOrFail($id);
        $menu->update($validated);

        return to_route('menus.index');
    }

    public function destroy($id)
    {
        $menu = MenuModel::findOrFail($id);
        $menu->delete();

        return redirect()->route('menus.index');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\ComboModel;
use App\Models\MenuModel;
use App\Models\MenuProductoModel;
use App\Models\ProductoModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuProductoController extends Controller
{
    public function index(){

    }


    public function create(){

    }

    public function edit(Request $request){
        dd($request);
    }

    public function detail($id){

    }

    public function store(Request $request)
    {
        MenuProductoModel::create([
            'precio' => $request->producto['precio'],
            'precio_combo' => $request->producto['precio'],
            'descripcion' => "sin descripción",
            'completo' => false,
            'producto_id' => $request->producto['id'],
            'menu_id' => $request->menu['id'],
        ]);
    }

    public function update(Request $request, $id)
    {
        $producto = ProductoModel::find($request['producto']['id']);
        $producto->precio = $request['precio'];
        $producto->update();

        $menu_producto = MenuProductoModel::find($id);
        $menu_producto->precio = $request['precio'];
        $menu_producto->precio_combo = $request['precio_combo'];
        $menu_producto->update();
    }

    public function destroy($id)
    {
        $menu_producto = MenuProductoModel::find($id);
        $menu_producto->delete();
    }
}

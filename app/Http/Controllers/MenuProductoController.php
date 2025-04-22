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

    public function edit($id){

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
        dd($request->all());
    }

    public function destroy($id)
    {
        $menu_producto = MenuProductoModel::find($id);
        $menu_producto->delete();
    }
}

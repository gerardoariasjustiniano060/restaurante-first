<?php

namespace App\Http\Controllers;

use App\Models\CategoriaModel;
use App\Models\ProductoModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index(){
        $search = request('search');
        $query = ProductoModel::query();

        if ($search) {
            $query->where(function  ($builder) use ($search) {
                $builder->where('nombre', 'like', '%' . $search . '%')
                    ->orWhereHas('categoria', function ($builder) use ($search) {
                        $builder->where('nombre', 'like', '%' . $search . '%');
                    });
            });
        }

        $productos = $query->orderBy('id', 'desc')
        ->with('categoria')
        ->paginate(10);

        return Inertia::render('Productos/Index',[
            'productos' => $productos
        ]);
    }


    public function create(){
        $producto = new ProductoModel();
        $categorias =  CategoriaModel::all();

        return Inertia::render('Productos/Formulario',[
            'isEdit' => false,
            'producto' => $producto,
            'categorias' => $categorias
        ]);
    }

    public function edit($id){
        $categorias =  CategoriaModel::all();
        $producto = ProductoModel::find($id);

        return Inertia::render('Productos/Formulario',[
            'isEdit' => false,
            'producto' => $producto,
            'categorias' => $categorias
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|min:3|max:100',
            'categoria_id' => 'required',
            'precio' => 'required|numeric|min:0',
        ]);

        $producto =  new ProductoModel();
        $producto->nombre = $request->nombre;
        $producto->categoria_id = $request->categoria_id;
        $producto->precio = $request->precio;
        $producto->save();

        return to_route('productos.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|min:3|max:100',
            'categoria_id' => 'required',
            'precio' => 'required|numeric|min:0',
        ]);

        $producto = ProductoModel::findOrFail($id);
        $producto->nombre = $request->nombre;
        $producto->categoria_id = $request->categoria_id;
        $producto->precio = $request->precio;
        $producto->update();

        return to_route('´productos.index');
    }

    public function destroy($id)
    {
        $categoria = ProductoModel::findOrFail($id);
        $categoria->delete();

        return to_route('´productos.index');
    }
}

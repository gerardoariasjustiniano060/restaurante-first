<?php

namespace App\Http\Controllers;

use App\Models\CategoriaModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index(){
        $search = request('search');
        $query = CategoriaModel::query();

        if (request('search')) {
            $query->where('nombre', 'like', '%' . $search . '%');
        }

        $categorias = $query->orderBy('id', 'desc')
        ->paginate(10);

        return Inertia::render('Categorias/Index',[
            'categorias' => $categorias
        ]);
    }

    public function create(){
        $categoria = new CategoriaModel();

        return Inertia::render('Categorias/Formulario',[
            'isEdit' => false,
            'categoria' => $categoria
        ]);
    }

    public function edit($id){
        $categoria = CategoriaModel::find($id);

        return Inertia::render('Categorias/Formulario',[
            'isEdit' => false,
            'categoria' => $categoria
        ]);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        CategoriaModel::create($validated);
        return to_route('categorias.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $categoria = CategoriaModel::findOrFail($id);
        $categoria->update($validated);

        return to_route('categorias.index');
    }

    public function destroy($id)
    {
        $categoria = CategoriaModel::findOrFail($id);
        $categoria->delete();

        return redirect()->route('categorias.index')->with('success', 'Categoría eliminada');
    }
}

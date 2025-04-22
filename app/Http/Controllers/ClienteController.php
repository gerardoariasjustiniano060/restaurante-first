<?php

namespace App\Http\Controllers;

use App\Models\ClienteModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index(){
        $search = request('search');
        $query = ClienteModel::query();

        if (request('search')) {
            $query->where('nombre_completo', 'like', '%' . $search . '%');
        }

        $clientes = $query->orderBy('id', 'desc')
        ->paginate(10);

        return Inertia::render('Clientes/Index',[
            'clientes' => $clientes
        ]);
    }


    public function create(){
        $cliente = new ClienteModel();

        return Inertia::render('Clientes/Formulario',[
            'isEdit' => false,
            'cliente' => $cliente
        ]);
    }

    public function edit($id){
        $cliente = ClienteModel::find($id);

        return Inertia::render('Clientes/Formulario',[
            'isEdit' => false,
            'cliente' => $cliente
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'telefono' => 'required|min:8|max:20'
        ]);

        ClienteModel::create($validated);
        return to_route('clientes.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre_completo' => 'required|string|max:255',
            'telefono' => 'required|min:8|max:20'
        ]);

        $cliente = ClienteModel::findOrFail($id);
        $cliente->update($validated);

        return to_route('clientes.index');
    }

    public function destroy($id)
    {
        $cliente = ClienteModel::findOrFail($id);
        $cliente->delete();
        return redirect()->route('clientes.index');
    }
}

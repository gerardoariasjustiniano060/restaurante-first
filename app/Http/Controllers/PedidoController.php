<?php

namespace App\Http\Controllers;

use App\Models\CajaModel;
use App\Models\ComboModel;
use App\Models\MenuModel;
use App\Models\MenuPedidoModel;
use App\Models\MenuProductoModel;
use App\Models\PedidoModel;
use App\Models\ProductoModel;
use App\Models\StockModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index(){
        $search = request('search');
        $query = PedidoModel::query();

        if (request('search')) {
            $query->where('nombre_completo', 'like', '%' . $search . '%');
        }

        $pedidos = $query->orderBy('id', 'desc')
        ->paginate(10);

        return Inertia::render('Pedidos/Index',[
            'pedidos' => $pedidos
        ]);
    }


    public function create(){
        $caja = CajaModel::where('user_id','=',Auth::id())->first();
        $pedido = new PedidoModel();

        return Inertia::render('Pedidos/Formulario',[
            'isEdit' => false,
            'pedido' => $pedido
        ]);
    }

    public function edit($id){
        $pedido = PedidoModel::find($id);

        return Inertia::render('Pedidos/Formulario',[
            'isEdit' => false,
            'pedido' => $pedido
        ]);
    }

    public function detail($id){
        $pedido = PedidoModel::find($id);

        return Inertia::render('Pedidos/Detail',[
            'isEdit' => false,
            'pedido' => $pedido
        ]);
    }

    public function store(Request $request,$caja)
    {
        $pedido = new PedidoModel();
        $pedido->monto_total = $request->monto_total;
        $pedido->estado = $request->estado;
        $pedido->cliente_id = $request->cliente_id;
        $pedido->caja_id = $caja->id;
        $pedido->user_id = $request->user_id;
        $pedido->save();

        foreach ($request->menu_pedido as $item) {
            $obj = new MenuPedidoModel();
            $obj->monto_total = $item->monto_total;
            $obj->cantidad = $item->cantidad;
            $obj->pedido_id = $pedido->id;
            $obj->menu_producto_id = $item->menu_producto_id;
            $obj->save();

            $stock = StockModel::where('menu_producto_id','=',$obj->menu_producto_id)->first();
            $stock->cantidad_maxima = $stock->cantidad_maxima - $obj->cantidad;
            $stock->update();
        }
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {

    }
}

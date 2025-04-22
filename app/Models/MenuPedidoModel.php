<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuPedidoModel extends Model
{
    use SoftDeletes;

    protected $table = 'menu_pedido';

    protected $fillable = [
        'monto_total',
        'cantidad',
        'pedido_id',
        'menu_producto_id',
    ];

    // Relación al menú
    public function menu()
    {
        return $this->belongsTo(MenuModel::class, 'menu_id');
    }

    public function pedido()
    {
        return $this->belongsTo(PedidoModel::class, 'pedido_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PedidoModel extends Model
{
    use SoftDeletes;

    /**
     * Nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'pedidos';

    /**
     * Atributos asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'fecha',
        'monto_total',
        'estado',
        'cliente_id',
        'caja_id',
        'user_id'
    ];

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class, 'cliente_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function caja()
    {
        return $this->belongsTo(CajaModel::class, 'caja_id');
    }

    public function menu_pedidos()
    {
        return $this->hasMany(MenuPedidoModel::class, 'pedido_id');
    }
}

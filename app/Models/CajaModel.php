<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CajaModel extends Model
{
    use SoftDeletes;

    /**
     * Nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'cajas';

    /**
     * Atributos asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'monto_inicial',
        'monto_total',
        'fecha',
        'user_id'
    ];

    public function pedidos()
    {
        return $this->hasMany(PedidoModel::class,'caja_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}


/*
    1    8o bs
         19/04/2024



        Pedido
    1    1   400  19/04/2024
    1    2   200  19/04/2024
    1














    1 menu
        1   Plato 1
            1
            2
            3

        2   Plato 2
        3   Plato 3
        4   Plato 4
        5   Plato 5
        6   Plato 6
        7   Plato 7
        8   Plato 8
        9   Plato 9




         */

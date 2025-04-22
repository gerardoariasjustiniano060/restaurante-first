<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockModel extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'stocks';

    protected $fillable = [
        'cantidad_maxima',
        'fecha',
        'menu_producto_id',
    ];

    public function menu_producto()
    {
        return $this->hasOne(MenuProductoModel::class,'menu_producto_id');
    }
}

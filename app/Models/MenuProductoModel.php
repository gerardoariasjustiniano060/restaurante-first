<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuProductoModel extends Model
{
    use SoftDeletes;

    protected $table = 'menu_producto';

    protected $fillable = [
        'precio',
        'precio_combo',
        'descripcion',
        'completo',
        'producto_id',
        'menu_id',
    ];

    // Relación al menú
    public function menu()
    {
        return $this->belongsTo(MenuModel::class, 'menu_id');
    }

    public function producto()
    {
        return $this->belongsTo(ProductoModel::class, 'producto_id');
    }

    public function combos()
    {
        return $this->hasMany(ComboModel::class, 'menu_producto_id');
    }

    public function stock()
    {
        return $this->hasOne(StockModel::class, 'menu_producto_id');
    }

    public function menu_pedidos()
    {
        return $this->hasMany(MenuPedidoModel::class, 'menu_producto');
    }
}

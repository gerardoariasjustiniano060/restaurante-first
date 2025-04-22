<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComboModel extends Model
{
    use SoftDeletes;

    protected $table = 'combos';

    /**
     * Atributos asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'descripcion',
        'cantidad',
        'producto_id',
        'menu_producto_id',
        'producto_id',
    ];

    public function menu_producto()
    {
        return $this->belongsTo(MenuProductoModel::class, 'menu_producto_id');
    }

    public function producto()
    {
        return $this->belongsTo(ProductoModel::class, 'producto_id');
    }
}

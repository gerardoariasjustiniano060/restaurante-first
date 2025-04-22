<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductoModel extends Model
{
    use SoftDeletes;

    protected $table = 'productos';

    /**
     * Atributos asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'categoria_id',
        'precio',         // Campo precio añadido
        'disponible',
    ];


    public function categoria()
    {
        return $this->belongsTo(CategoriaModel::class, 'categoria_id');
    }

    public function menu_productos()
    {
        return $this->hasMany(MenuProductoModel::class, 'producto_id');
    }

    public function combos()
    {
        return $this->hasMany(ComboModel::class, 'producto_id');
    }
}

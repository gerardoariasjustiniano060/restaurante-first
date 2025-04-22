<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuModel extends Model
{
    use SoftDeletes;

    protected $table = 'menus';

    /**
     * Atributos asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'descripcion',
        'fecha',  // no editable
        'actual'  // no editable
    ];

    public function menu_productos()
    {
        return $this->hasMany(MenuProductoModel::class, 'menu_id');
    }
}

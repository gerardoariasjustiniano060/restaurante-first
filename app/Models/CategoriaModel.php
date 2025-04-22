<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoriaModel extends Model
{
    use SoftDeletes;

    protected $table = 'categorias';

    /**
     * Atributos asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
    ];

    public function productos()
    {
        return $this->hasMany(ProductoModel::class, 'categoria_id');
    }

    const PRINCIPAL = 'terciario';
    const SECUNDARIO = 'terciario';
    const TERCIARIO = 'terciario';
}

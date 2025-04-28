<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InterfazController extends Controller
{
    public function example_almacen()  {
        return Inertia::render('Interfaz/Almacen/Index');
    }

    public function example_pedido(){
        // return Inertia::render('Interfaz/Pedido/Formulario');
        return Inertia::render('Interfaz/Pedido/Index');
    }

    public function example_horario()  {
        return Inertia::render('Interfaz/Horario/Index');
    }

    public function example_menu()  {
        return Inertia::render('Interfaz/Menu/Index');
    }
}

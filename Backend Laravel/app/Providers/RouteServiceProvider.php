<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider; //Rutas especificas
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {//Gestionamos las solicitudes 
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    }
}
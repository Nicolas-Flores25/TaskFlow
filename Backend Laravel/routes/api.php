<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class); //ruta Restfulusuarios
Route::resource('tasks', TaskController::class); //ruta tareas
Route::patch('tasks/{task}/toggle', [TaskController::class, 'toggleComplete']);
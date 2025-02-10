<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Retornamos  usuarios
    public function index()
    {
        return User::all();
    }

    //Creamos usuarios
    public function store(Request $request)
    {
        $request->validate([//Validamos
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6' //No necesario encriptar
        ]);

        $user = User::create([ //Creamos usuarios en la BD
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|min:6'
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ?? $user->password 
        ]);

        return response()->json($user, 200);
    }

    
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
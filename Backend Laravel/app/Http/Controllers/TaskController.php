<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //Retorno tareas
    public function index()
    {
        return Task::with('user')->get();
    }

    //Crear tarea
    public function store(Request $request)
    {
        $request->validate([ //Valida
            'user_id' => 'required|exists:users,id',
            'title' => 'required',
            'description' => 'nullable'
        ]);

        $task = Task::create($request->all());//Crea la tarea
        return response()->json($task, 201);// Retorna tarea con 201
    }

    public function update(Request $request, Task $task) //Actualiza tarea
    {
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy(Task $task) //elimina tarea
    {
        $task->delete();
        return response()->json(null, 204);
    }

    public function show(Task $task)//Obtiene una tarea en especifico
    {
        return $task->load('user');
    }

    public function toggleComplete(Task $task)//Marcar como completada
    {
        $task->completed = !$task->completed;
        $task->save();
        return response()->json($task);
    }
}
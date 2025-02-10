<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [ //Campos permitidos
        'user_id',
        'title',
        'description',
        'completed'
    ];
        // Uno a muchos
    public function user() //Relacion 1 a muchos
    {
        return $this->belongsTo(User::class); //Select * from users where id = user id
    }
}

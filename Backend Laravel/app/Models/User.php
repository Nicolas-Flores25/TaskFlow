<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;//Dprueba
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;


class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    //  Define que campos se puede modificar en la BD
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    //Informacion que no deseo enviar
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}

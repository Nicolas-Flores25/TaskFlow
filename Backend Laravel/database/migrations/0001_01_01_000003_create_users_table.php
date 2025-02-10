<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration //metodo up y down
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique(); //email unico
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password'); //Sin encriptar
            $table->rememberToken();    
            $table->timestamps(); //'created_at' y 'updated_at'
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); //Mail como id CP
            $table->string('token'); //Rcp
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); //Sesion
            $table->foreignId('user_id')->nullable()->index(); //relacion usuarios
            $table->string('ip_address', 45)->nullable(); //IP
            $table->text('user_agent')->nullable(); //Navegador
            $table->longText('payload');//Datos sesion
            $table->integer('last_activity')->index(); //Ultima actividad
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void //Eliminar tablas en rollback
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};

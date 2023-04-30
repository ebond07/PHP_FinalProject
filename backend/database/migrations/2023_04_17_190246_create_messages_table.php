<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('messages', function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedInteger('recipient')
             ->references('id')
             ->on('chat_users');
        $table->unsignedInteger('sender')
             ->references('id')
             ->on('chat_users');
        $table->longtext('content');
        $table->string('image')->nullable();
        $table->timestamps();
    });
}

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
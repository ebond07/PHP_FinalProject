<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;
    protected $fillable=[
        'recipient',
        'sender',
        'content'
    ];
    public function user_messages(): HasMany
    {
        return $this->hasMany(user_messages::class);
    }
}
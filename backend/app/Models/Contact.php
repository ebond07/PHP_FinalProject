<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'contact_id',
        'name',
        'email',
    ];

    public function chat_user(): BelongsTo
    {
        return $this->belongsTo(chat_user::class);
    }
}

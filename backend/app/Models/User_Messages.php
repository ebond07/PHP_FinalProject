<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User_Messages extends Model
{
    protected $table = 'user_messages';
    use HasFactory;
    protected $fillable = [
        'message_id',
        'user_id',
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

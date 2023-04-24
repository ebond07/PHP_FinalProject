<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chat_User extends Model
{
    protected $table = 'chat_users';
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
    ];

    public function user_message(): HasMany
    {
        return $this->hasMany(User_Messages::class);
    }
    public function contact(): HasMany
    {
        return $this->hasMany(Contact::class);
    }
}

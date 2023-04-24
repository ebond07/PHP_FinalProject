<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Contact;
use App\Models\Message;
use App\Models\User;
use App\Models\User_Messages;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function setUser(Request $request){
        $fields = $request->validate([
            'name'        => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
    
        $hashedPassword = Hash::make($fields['password']);
    
        $user = User::create([
            'name'        => $fields['name'],
            'email' => $fields['email'],
            'password' => $hashedPassword
        ]);
    
        return response($user, 201);
    }
    

    public function getUsers(){
        $arryUsers = User::all();
        return response($arryUsers, 200);
    }

    public function getUserById($id) {
        $user = User::findOrFail($id);
        return response($user, 200);
    }

    public function deleteUser($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return response(['message' => 'User deleted successfully'], 200);
    }

    
}

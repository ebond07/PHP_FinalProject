<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Contact;
use App\Models\Message;
use App\Models\User;
use App\Models\User_Messages;

class PageController extends Controller
{
    public function setUser(Request $request){
        $fields = $request->validate([
            'name'        => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        $user = User::create([
            'name'        => $fields['name'],
            'email' => $fields['email'],
            'password' => $fields['password']
        ]);

        return response($user, 201);
    }

    public function getUsers(){
        $arryUsers = User::all();
        return response($arryUsers, 200);
    }

    public function setMessage(Request $request){
        $fields = $request->validate([
            'recipient'        => 'required',
            'sender' => 'required',
            'content' => 'required'
        ]);
        $message = Message::create([
            'recipient'        => $fields['recipient'],
            'sender' => $fields['sender'],
            'content' => $fields['content']
        ]);

        return response($message, 201);
    }

    public function getMessages(){
        $arryMessages = Message::all();
        return response($arryMessages, 200);
    }

    public function setContact(Request $request){
        $fields = $request->validate([
            'name'        => 'required|string',
            'email' => 'required|string'
        ]);
        $contact = Contact::create([
            'name'        => $fields['name'],
            'email' => $fields['email']
        ]);

        return response($contact, 201);
    }

    public function getContacts(){
        $arryContacts = User::all();
        return response($arryContacts, 200);
    }
}

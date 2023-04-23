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

    public function getUserById($id) {
        $user = User::findOrFail($id);
        return response($user, 200);
    }

    public function deleteUser($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return response(['message' => 'User deleted successfully'], 200);
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
    
        // Create the User_Message entry
        $userMessage = User_Messages::create([
            'user_id' => $fields['recipient'], // Assuming recipient is the user ID
            'message_id' => $message->id
        ]);
    
        return response($message, 201);
    }
    

    public function getMessages(){
        $arryMessages = Message::all();
        return response($arryMessages, 200);
    }

    public function getMessagesFromFiveMinutes()
{
    $lastFiveMinutes = now()->subMinutes(5);
    $messages = Message::whereBetween('created_at', [$lastFiveMinutes, now()])->get();

    return response($messages, 200);
}

public function getMessagesRecievedByUser($id) {
    // Find the user by ID
    $user = User::findOrFail($id);

    // Get all message IDs associated with the user
    $messageIds = User_Messages::where('user_id', $user->id)->pluck('message_id');

    // Get the messages based on the message IDs
    $messages = Message::whereIn('id', $messageIds)->get();

    return response($messages, 200);
}

public function deleteMessage($id) {
    // Find the message by ID
    $message = Message::findOrFail($id);

    // Delete the User_Message record associated with the message
    $userMessage = User_Messages::where('message_id', $message->id)->first();
    if ($userMessage) {
        $userMessage->delete();
    }

    // Delete the message
    $message->delete();

    return response(null, 204);
}


    public function setContact(Request $request){
        $fields = $request->validate([
            'user_id' => 'required',
            'name'        => 'required|string',
            'email' => 'required|string'
            
        ]);
        $contact = Contact::create([
            'user_id'        => $fields['user_id'],
            'name'        => $fields['name'],
            'email' => $fields['email']
        ]);

        return response($contact, 201);
    }

    public function getContacts(){
        $arryContacts = Contact::all();
        return response($arryContacts, 200);
    }

    public function getContactsByUser($id)
    {
    // Find the user by ID
    $user = User::findOrFail($id);

    // Get all contacts associated with the user
    $contacts = Contact::where('user_id', $user->id)->get();

    return response($contacts, 200);
    }

    public function deleteContact($id) {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response(['message' => 'Contact deleted successfully'], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Contact;
use App\Models\Message;
use App\Models\Chat_User;
use App\Models\User_Messages;

class MessageController extends Controller
{
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
    $user = Chat_User::findOrFail($id);

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

}

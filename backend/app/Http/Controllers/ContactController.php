<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Contact;
use App\Models\Message;
use App\Models\Chat_User;
use App\Models\User_Messages;

class ContactController extends Controller
{
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
    $user = Chat_User::findOrFail($id);

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

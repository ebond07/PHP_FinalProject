<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ContactController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('v1/users', [UserController::class, 'setUser']);
Route::get('v1/users', [UserController::class, 'getUsers']);
Route::get('v1/users/{id}', [UserController::class, 'getUserById']);

Route::post('v1/messages', [MessageController::class, 'setMessage']);
Route::get('v1/messages', [MessageController::class, 'getMessages']);
Route::get('v1/getMessagesFromFiveMinutes', [MessageController::class, 'getMessagesFromFiveMinutes']);
Route::get('v1/users/{id}/messages', [MessageController::class, 'getMessagesRecievedByUser']);


Route::post('v1/setContact', [ContactController::class, 'setContact']);
Route::get('v1/getContacts', [ContactController::class, 'getContacts']);
Route::get('v1/getContactsByUser/{id}', [ContactController::class, 'getContactsByUser']);


Route::delete('v1/users/{id}', [UserController::class, 'deleteUser']);
Route::delete('v1/messages/{id}', [MessageController::class, 'deleteMessage']);
Route::delete('v1/contacts/{id}', [ContactController::class, 'deleteContact']);


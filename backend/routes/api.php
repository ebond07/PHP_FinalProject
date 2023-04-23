<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users', [PageController::class, 'setUser']);
Route::get('/users', [PageController::class, 'getUsers']);
Route::get('/users/{id}', [PageController::class, 'getUserById']);

Route::post('/messages', [PageController::class, 'setMessage']);
Route::get('/messages', [PageController::class, 'getMessages']);
Route::get('/getMessagesFromFiveMinutes', [PageController::class, 'getMessagesFromFiveMinutes']);
Route::get('/users/{id}/messages', [PageController::class, 'getMessagesRecievedByUser']);


Route::post('/setContact', [PageController::class, 'setContact']);
Route::get('/getContacts', [PageController::class, 'getContacts']);
Route::get('/getContactsByUser/{id}', [PageController::class, 'getContactsByUser']);


Route::delete('users/{id}', [PageController::class, 'deleteUser']);
Route::delete('messages/{id}', [PageController::class, 'deleteMessage']);
Route::delete('contacts/{id}', [PageController::class, 'deleteContact']);


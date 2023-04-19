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

Route::post('/setUser', [PageController::class, 'setUser']);
Route::get('/getUsers', [PageController::class, 'getUsers']);

Route::post('/setMessage', [PageController::class, 'setMessage']);
Route::get('/getMessages', [PageController::class, 'getMessages']);

Route::post('/setContact', [PageController::class, 'setContact']);
Route::get('/getContacts', [PageController::class, 'getContacts']);

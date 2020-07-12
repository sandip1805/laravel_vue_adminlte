<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

/* Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // Matches The "/admin/users" URL
    });
}); */
//Public Routes

Route::post('/login', 'API\AuthController@login');
Route::post('/register', 'API\AuthController@register');
Route::post('/refresh-token', 'API\AuthController@refreshToken');

//Authenticated Routes
Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', 'API\AuthController@logout');

    Route::apiResources([
        'user' => 'API\UserController'
    ]);
    Route::get('profile', 'API\UserController@profile');
    Route::put('profile', 'API\UserController@updateProfile');
});



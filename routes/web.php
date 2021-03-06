<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
}); */

//Auth::routes();

Route::get('/', function () {
    return view('home');
});
Route::get('{path}', function () {
    return view('home');
})->where('path', '[a-z0-9]([0-9a-z_\-\s])+$');

//Route::get('/', 'HomeController@index');

//Route::get('{path}', 'HomeController@index')->where('path', '[a-z0-9]([0-9a-z_\-\s])+$');

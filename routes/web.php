<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FullcalenderController;
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

Route::get('/', [FullcalenderController::class, 'index']);
Route::get('fullcalender/show_events', [FullcalenderController::class, 'show_events']);
Route::post('fullcalender/save_event', [FullcalenderController::class, 'store_event']);
Route::post('fullcalender/edit_event/{event}', [FullcalenderController::class, 'edit_event']);
Route::post('fullcalender/delete_event/{id}', [FullcalenderController::class, 'delete_event']);


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

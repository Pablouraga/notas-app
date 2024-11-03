<?php

use App\Http\Controllers\NotesController;
use Illuminate\Support\Facades\Route;

Route::get('/notes', [NotesController::class, 'index']);
Route::get('/notes/create', [NotesController::class, 'create']);
Route::post('/notes', [NotesController::class, 'store'])->name('notes.store');
Route::get('/notes/{id}', [NotesController::class, 'show']);
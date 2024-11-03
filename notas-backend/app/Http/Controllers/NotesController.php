<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    public function index()
    {
        $notes = Note::all();
        return response()->json($notes);
        // return view('notes.index', compact('notes'));
    }

    public function show($note)
    {
        $note = Note::findOrFail($note);
        return response()->json($note);
        // return view('notes.show', compact('note'));
    }

    public function create()
    {
        // return view('notes.create');
    }

    public function store(Request $request)
    {
        $note = new Note();
        $note->title = $request->title;
        $note->content = $request->content;
        $note->save();
        // return redirect('/notes');
    }
}

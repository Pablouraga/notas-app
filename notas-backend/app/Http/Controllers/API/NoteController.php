<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController;
use App\Models\Note;
use App\Http\Resources\NoteResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends BaseController
{
    public function index(): JsonResponse
    {
        $notes = Note::all();
        return $this->sendResponse(NoteResource::collection($notes), 'Notes retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $note =  Note::create($input);
        return $this->sendResponse(new NoteResource($note), 'Note created successfully.');
    }

    public function show($id): JsonResponse
    {
        $note = Note::find($id);
        if (is_null($note)) {
            return $this->sendError('Note not found.');
        }
        return $this->sendResponse(new NoteResource($note), 'Note retrieved successfully.');
    }

    public function update(Request $request, Note $note): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $note->title = $input['title'];
        $note->content = $input['content'];
        $note->save();

        return $this->sendResponse(new NoteResource($note), 'Note updated successfully.');
    }

    public function destroy(Note $note): JsonResponse
    {
        $note->delete();
        return $this->sendResponse([], 'Note deleted successfully.');
    }
}

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Note creation</title>
</head>

<body>
    <form action="{{ route('notes.store') }}" method="POST">
        @csrf
        <label for="title">Title</label>
        <input type="text" name="title" id="title">
        <br>
        <label for="content">Content</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <br>
        <button type="submit">Create note</button>
    </form>

    @isset($message)
        <p>{{ $message }}</p>
    @endisset
</body>

</html>

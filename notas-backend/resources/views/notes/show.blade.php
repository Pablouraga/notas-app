<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Note show</title>
</head>
<body>
    @isset($note)
        <h1>{{ $note->title }}</h1>
        <p>{{ $note->content }}</p>
    @endisset
</body>
</html>
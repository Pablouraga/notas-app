<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Note extends Model
{
    protected $fillable = [
        'title',
        'content'
    ];
    use HasApiTokens;
}

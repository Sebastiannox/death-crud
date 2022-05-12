<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    static $rules=[
        'date' =>'required',
        'time_start' =>'required',
        'time_end' =>'required',
        'contact_info' =>'required'

    ];
    protected $fillable=[
        'date',
        'time_start',
        'time_end',
        'contact_info'

    ];
}

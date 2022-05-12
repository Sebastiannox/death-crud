<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'http://127.0.0.1:8000/fullcalender',
        'http://127.0.0.1:8000/fullcalender/save_event',
        'http://127.0.0.1:8000/fullcalender/show_events',
        'http://127.0.0.1:8000/fullcalender/edit_event/{event}',
        'http://127.0.0.1:8000/fullcalender/delete_event/{id}',
    ];
}

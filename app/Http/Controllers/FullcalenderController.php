<?php

namespace App\Http\Controllers;
use App\Models\Event;
use Illuminate\Http\Request;
use Carbon\Carbon;
class FullcalenderController extends Controller
{
    public function index(Request $request)
    {
        return view ('event.index');
    }
    function show_events(Event $event)
    {
        $event= Event::select('id','date','time_start','time_end', 'contact_info')->get();
        $events=array();
        
        foreach ($event as $key => $event_val) {
            $events[$key]["id"] = $event_val['id'];
            $events[$key]["start"] = date('Y-m-d H:i:s', strtotime(($event_val["date"]." ".$event_val['time_start'])));
            $events[$key]["end"] = date('Y-m-d H:i:s', strtotime(($event_val["date"]." ".$event_val['time_end'])));
            $events[$key]["title"]=$event_val["contact_info"];
            $events[$key]["description"]=$event_val["contact_info"];
        }
        return response()->json($events);
    }
    public function store_event(Request $request)
    {
        request()->validate(Event::$rules);
        $event=Event::create($request->all());
    }
    function edit_event(Request $request, Event $event)
    {
        request()->validate(Event::$rules);
        $event->update($request->all());
        /* $event->date=Carbon::CreateFromFormat('Y-m-d', $event->date)->format('Y-m-d');
        $event->time_start=Carbon::CreateFromFormat('H:i:s', $event->time_start)->format('H:i:s');
        $event->time_end=Carbon::CreateFromFormat('H:i:s', $event->time_end)->format('H:i:s'); */
        return response()->json($event);
    }
    function delete_event(Request $request)
    {
        $event=Event::find($request->id)->delete();
        return response()->json($event);
    }
}

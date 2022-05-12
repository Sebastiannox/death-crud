@extends('layouts.app')
@section('content')
<div class="container">
    <div id="schedule">
    </div>
</div>
<div class="modal fade" id="event" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Dictate someone's last hour in this world</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <input type="hidden" for="idEvent" id="idEvent" name="idEvent">
          {!! csrf_field() !!}
          <div class="form-group">
            <label for="date">Date</label>
            <input type="text" class="form-control" name="date" id="date" aria-describedby="helpId" readonly>
            <small id="helpId" class="form-text text-muted">His/her last day in this world</small>
          </div>
          <div class="form-group">
            <label for="time_start">star time</label>
            <input type="text" class="form-control" name="time_start" id="time_start" aria-describedby="helpId" readonly>
            <small id="helpId" class="form-text text-muted">the beginning of his/her last hour</small>
          </div>
          <div class="form-group">
            <label for="time_end">end time</label>
            <input type="text" class="form-control" name="time_end" id="time_end" aria-describedby="helpId" readonly>
            <small id="helpId" class="form-text text-muted">the end of his/her last hour</small>
          </div>
          <div class="form-group">
            <label for="contact_info">information about the victim</label>
            <input type="text" class="form-control" name="contact_info" id="contact_info" aria-describedby="helpId" placeholder="write email of the victim">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnClose">Close</button>
        <button type="button" class="btn btn-warning" id="btnModify">Modify</button>
        <button type="button" class="btn btn-danger" id="btnDelete">Delete</button>
        <button type="button" class="btn btn-primary" id="btnSave" >Save</button>
      </div>
    </div>
  </div>
</div>
@endsection
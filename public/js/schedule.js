document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('schedule');
  let form = document.querySelector("form");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    displayEventTime: true,
    eventDurationEditable: false,
    allDaySlot:false,
    timeZone:'UTC',
    height: 570,
    eventOverlap: false,
    weekends: false,
    contentHeight: 600,
    slotMinTime: "09:00",
    slotMaxTime: "19:00",
    businessHours:{            
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
        startTime: '09:00',
        endTime: '19:00', 
    },
    displayEventTime: false,
    headerToolbar:{
        left: "prev,next,today",
        center:'title',
        right: 'dayGridMonth,timeGridWeek',
    },
    events: "http://127.0.0.1:8000/fullcalender/show_events",
    select:function(selectionInfo) {
      form.reset();
      var diffMs = (selectionInfo.end - selectionInfo.start); // milliseconds between startTime & endTime
      var diffDays = Math.floor(diffMs / 86400000); // days
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      if (diffDays==0 && diffHrs==1 && diffMins==0) { //since its virtually impossible for a person to go to another month or even a week while selecting the hours for an event i just compared the days, hours and minutes
        let starDateIn= selectionInfo.startStr.split("T");
        let date = starDateIn[0];
        let startTime= starDateIn[1].split("Z")[0];
        let endDateIn=selectionInfo.endStr.split("T");
        let endTime = endDateIn[1].split("Z")[0];
        $("#event").modal("show");
        $("#btnModify").hide();
        $("#btnSave").show();
        $("#btnDelete").hide();
        $("#date").attr("value"," ");
        $("#time_start").attr("value"," ");
        $("#time_end").attr("value"," ");
        $("#contact_info").attr("value", " ");
        $("#date").attr("value",date);
        $("#time_start").attr("value",startTime);
        $("#time_end").attr("value",endTime);
        }
    },
    eventDrop:function(info) {
      form.reset();
      console.log(info);
      $("#btnSave").hide();
      $("#btnModify").show();
      $("#btnDelete").show();
      $("#exampleModalLabel").html("");
      $("#exampleModalLabel").html("Did you changed your mindo about this one?");
      $("#event").modal("show");
      $("#date").attr("value"," ");
      $("#idEvent").attr("value", info.event._def.publicId);
      $("#time_start").attr("value"," ");
      $("#time_end").attr("value"," ");
      $("#contact_info").attr("value", " "); 
      dateMod=String(moment(info.event._instance.range.start).format()).split("T");
      $("#date").attr("value", dateMod[0]);
      $("#time_start").attr("value", String(info.event._instance.range.start.getUTCHours()+":"+info.event._instance.range.start.getUTCMinutes()+":"+info.event._instance.range.start.getUTCSeconds()));
      $("#time_end").attr("value", String(info.event._instance.range.end.getUTCHours()+":"+info.event._instance.range.end.getUTCMinutes()+":"+info.event._instance.range.end.getUTCSeconds()));
      $("#contact_info").attr("value", info.event._def.extendedProps.description);
    },
    dateClick: function(date){
      calendar.changeView('timeGridWeek', date.dateStr);
    },
    eventClick:function(info) {
      form.reset();
      $("#btnSave").hide();
      $("#btnModify").hide();
      $("#btnDelete").show();
      $("#exampleModalLabel").html("");
      $("#exampleModalLabel").html("Details");
      $("#event").modal("show");
      $("#date").attr("value"," ");
      $("#idEvent").attr("value", info.event._def.publicId);
      $("#time_start").attr("value"," ");
      $("#time_end").attr("value"," ");
      $("#contact_info").attr("value", " "); 
      dateMod=String(moment(info.event._instance.range.start).format()).split("T");
      $("#date").attr("value", dateMod[0]);
      $("#time_start").attr("value", String(info.event._instance.range.start.getUTCHours()+":"+info.event._instance.range.start.getUTCMinutes()+":"+info.event._instance.range.start.getUTCSeconds()));
      $("#time_end").attr("value", String(info.event._instance.range.end.getUTCHours()+":"+info.event._instance.range.end.getUTCMinutes()+":"+info.event._instance.range.end.getUTCSeconds()));
      $("#contact_info").attr("value", info.event._def.extendedProps.description);
      form.idEvent.value=info.event._def.publicId;
      form.date.value=dateMod[0];
      form.time_start.value=String(info.event._instance.range.start.getUTCHours()+":"+info.event._instance.range.start.getUTCMinutes()+":"+info.event._instance.range.start.getUTCSeconds());
      form.time_end=String(info.event._instance.range.end.getUTCHours()+":"+info.event._instance.range.end.getUTCMinutes()+":"+info.event._instance.range.end.getUTCSeconds());
      form.contact_info=info.event._def.extendedProps.description
      console.log(form);
    },
  });
  calendar.render();
  document.getElementById("btnSave").addEventListener("click", function(){
    sendData("http://127.0.0.1:8000/fullcalender/save_event");
    
  });
  document.getElementById("btnModify").addEventListener("click", function(){
    sendData("http://127.0.0.1:8000/fullcalender/edit_event/"+form.idEvent.value);
  });
  document.getElementById("btnDelete").addEventListener("click", function(){
    sendData("http://127.0.0.1:8000/fullcalender/delete_event/"+form.idEvent.value)
  });
  document.getElementById("btnClose").addEventListener("click", function(){
    $("#event").modal("hide");
    calendar.refetchEvents();
  });
  function sendData(url) {
    const dataEvent= new FormData(form);
    axios.post(url, dataEvent).
    then(
      (resp) =>{
        calendar.refetchEvents();
        $("#event").modal("hide");
        $("#date").attr("value"," ");
        $("#time_start").attr("value"," ");
        $("#time_end").attr("value"," ");
        $("#contact_info").attr("value", " ");
        calendar.changeView('timeGridWeek', date.dateStr);
      }
      ).catch(
        error=>{
          if (error.response) {
            console.log(error.response.data);
          }
        }
      )
    }
});
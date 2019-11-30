console.log("Cat is cute!!!");
document.addEventListener('DOMContentLoaded', function() {
    console.log("Some random stuffs");
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'list' ],
      timeZone: 'UTC',
      defaultView: 'listWeek',
  
      // customize the button names,
      // otherwise they'd all just say "list"
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' },
        listMonth: { buttonText: 'list month' }
      },
  
      header: {
        left: 'title',
        center: '',
        right: 'listDay,listWeek,listMonth'
      },
      events: 'https://fullcalendar.io/demo-events.json'
    });
  
    calendar.render();
});
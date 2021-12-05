var eventId = 0;
$(function() { // This is our so called “ready” function in shorthand
    var urlParams = new URLSearchParams(window.location.search);
    eventId = urlParams.get('id');

    $.ajax({
        url: "/events/" + eventId,
        method: "get"
    }).done(
        function (data) {
            $('#name').val(data.name);
            $('#description').val(data.description);
            $('#startDate').val(data.start.date);
            $('#startTime').val(data.start.time);
            $('#endDate').val(data.end.date);
            $('#endTime').val(data.end.time);
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );

    /**** DELETE FUNCTION HERE */
    $(".deleteEventBtn").on('click', function() {
        $.ajax(
            {
                url: '/events/'+eventId,
                method: 'delete'
            }
        ).done(
            function (data) {
                alert("Event deleted!");
                window.location.href = "/";
            }
        ).fail(
            function (err) {
                console.log(err.responseText);
            }
        );
    });
});

function editEvent() {
    var event = {
        id: eventId,
        name: $("#name").val(),
        description: $("#description").val(),
        startDate: $("#startDate").val(),
        startTime: $("#startTime").val(),
        endDate: $("#endDate").val(),
        endTime: $("#endTime").val()
    };
    $.ajax(
        {
            url: '/events',
            method: 'put',
            data: event
        }
    ).done(
        function (data) {
            alert("Event updated!");
            window.location.href = "/";
        }
    ).fail(
        function (err) {
           console.log(err.responseText);
        }
    );
    return false;
}


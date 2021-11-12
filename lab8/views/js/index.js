$(function() {
    $.ajax({
        url: "/events",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (event) {

                    //<!-- challenge ex -->
                    // Version 1:
                    let shownOrganizer = "Not available"
                    if(event.organizer != undefined){
                        shownOrganizer = event.organizer;
                     }

                    // Version 2: 
                    // if (typeof event.organizer === "undefined"){
                    //   var shownOrganizer="* Not available *";
                    // } else var shownOrganizer=event.organizer; 
                    //
                    // OR
                    /* Version 3:
                    var shownOrganizer = (typeof event.organizer === "undefined") ? "* Not available *":event.organizer;
                    */

                    $(".events").append(`
                    <article>
                        <h2>${event.name}</h2>
                        <div>
                            ${event.description}<br>
                            Start: ${event.start.date} ${event.start.time}<br>
                            End: ${event.end.date} ${event.end.time}<br>
                            Organizer: ${shownOrganizer}<br>
                        </div>
                    </article>
                    `);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )

    $(".addEvent").click(function () {
        $(".addNewEvent").show();
    })

    // the challenge ex
    $.ajax({
        url: "/organizers",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function (organizer) {
                    $("#organizer").append(`<option value='${organizer.company}'>${organizer.company}</option>`);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
})
$(function() {
    $.ajax({
        url: "/organizers",
        method: "get"
    })
        .done(
            function (data) {
                if(data.length>0) {
                    $(".organizersSection").show();
                }
                data.forEach(function (organizer) {
                    $(".organizerList").append(`<li> ${organizer.name} from ${organizer.company}</li>`);
                });
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
})
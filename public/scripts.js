/*form handler*/
$.ajax({
    url: '/api',
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    success: (res) => {
        document.getElementById("result").innerHTML = res;
    },
    error: (err) => {
        console.error(err);
    }
});

$(document).ready(() => {

    $("div > input[type=submit]#submit").on("click tap", () => {

        const name = $("#name").val();
        const note = $("#note").val();

        $.ajax({
            url: "/api",
            method:"POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                name: name,
                note: note,
            }),
            success: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.error(err);
            }
        });

        $.ajax({
            url: '/api',
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            success: (res) => {
                document.getElementById("result").innerHTML = res;
            },
            error: (err) => {
                console.error(err);
            }
        });
    });
});
//setInterval(() => {
//}, 1000);
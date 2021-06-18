
/*form handler*/

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
    });

let data = [];

    setInterval(() => {
        $.ajax({
            url: '/api',
            method: 'GET',
            success: (res) => {
                let dataDiff = res.filter(x => !data.includes(x));
                data = res;
            },
            error: (err) => {
                console.error(err);
            }
        })
    }, 1000);
});

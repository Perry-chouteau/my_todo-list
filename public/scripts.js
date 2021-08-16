/*form handler*/

function method_get() { //plus propre avec une fonction qu'un bloc
    return $.ajax({
        url: '/api',
        method: 'GET',
        contentType: "application/json; charset=utf-8",
        error: (err) => {
            console.error(err);
        }
    });
}

$(document).ready(() => {
    method_get().then(data => {
        for (i in data) {
            document.getElementById("result").innerHTML += `<div class="content"> <div class="content-50">Title: ${data[i].name}</div> <div class="content-50">Note: ${data[i].note}</div></div>`;
        }
    });

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
                method_get().then(data => {
                    document.getElementById("result").innerHTML = "";
                    data.sort(function(a, b){
                        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                        return 0;
                    });
                    console.log(data);
                    for (i in data) {
                        document.getElementById("result").innerHTML += `<div class="content"> <div class="content-50">Title: ${data[i].name}</div> <div class="content-50">Note: ${data[i].note}</div></div>`;
                    }
                }); 
            },
            error: (err) => {
                console.error(err);
            }
        });
    });
});
//setInterval(() => {
//}, 1000);
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3000;

const content = "./content"
const config = "./config"

app.use(express.json());

app.use(express.static('public'));

app.route('/api')
.post(function (req, res) {
    fs.readFile(path.join(config, "last-id"), "utf-8", (error, data) => {
        if (error) { data = "0"; return };
        fs.writeFile(path.join(content, data), JSON.stringify(req.body), () => {
            fs.mkdir(config, () => {
                fs.writeFile(path.join(config, "last-id"), +data + 1, () => {
                    res.status(200).send("post|ok");
                });
            });
        });
    });
})
app.route('/api')
.get(function (_, res) {
    let result = [];
    let len_data = -1;
    fs.readdir(content, (error, fileList) => {
        if (error) { return };
        console.log(fileList);
        for (element of fileList) {
            fs.readFile(path.join(content, element), "utf-8", (_, data) => {
                console.log(data);
                ++len_data;
                result[len_data] = data;
                console.log(len_data);
            });
        };
    });
    result[0] = "void";
    console.log(result);
    res.status(200).send(result);
});

app.listen(port);
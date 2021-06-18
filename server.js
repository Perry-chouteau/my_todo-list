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
        if (error) {
            data = "0";
        }
        fs.writeFile(path.join(content, data), JSON.stringify(req.body), () => {
            fs.mkdir(config, () => {
                fs.writeFile(path.join(config, "last-id"), +data + 1, () => {
                    res.status(200).send("ok");
                });
            });
        });
    });
})
.get(function (_, res) {
    fs.readdir(content, (error, data) => {
        if (error) data = "";
        res.status(200).send(data);
    });
});


app.listen(port);
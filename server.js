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
.get(function (_, res) {
    let result = [];
    let data = 0;
    let len_data = 0;
    fs.readdir(content, (error, fileList) => {
        if (error) { return; }
        console.log(fileList);
        for (element of fileList) {
            data = fs.readFileSync(path.join(content, element), "utf-8");
            result[len_data] = JSON.parse(data);
            ++len_data;
            console.log(len_data);
            //if (data_len == fileList.length)
            //    res.status(200).send(result);
        }
        console.log(result);
        res.status(200).send(result);
    });
});

app.listen(port);
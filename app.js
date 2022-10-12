const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const upload = multer();
const url = require("url");
let Client = require("ssh2-sftp-client");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder

app.get("/csv/:id", (req, res) => {

  const pathName = url.format(req.originalUrl);
  res.render(__dirname + "/public/index.ejs", {
    pathName: pathName,
    proceed: "0",
  });
});

app.post("/upload/:id", upload.single("uploadFile"), (req, res) => {
  console.log(req.file.buffer);

  let sftp = new Client();
  sftp
    .connect({
      host: "ax3nhusfdqxza.northeurope.azurecontainer.io",
      port: "22",
      username: "spr-kirppissftp",
      password: "393e3dyu5Rjs",
    })
    .then(() => {
      return sftp.append(Buffer.from(req.file.buffer), "/upload/testi.csv");
    })
    .then(() => {
      res.send({ status: true });
    })
    .then(() => {
      return sftp.end();
    })
    .catch((err) => {
      res.send({ status: false, error: err });
    });
});

app.listen(process.env.PORT || 3002, () => {
  console.log("Listen to port 3002");
});
module.exports = app;

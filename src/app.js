const express = require("express");
const app = express();
const qrcode = require("qrcode");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(express.static(process.cwd() + "/src/public"));

app.get("/", (_, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const { name } = req.body;
  qrcode.toDataURL(name, (err, src) => {
    if (err) res.render("error");
    res.render("qr", {
      qrcode: src,
    });
  });
});

app.listen(PORT, () => {
  console.log(PORT);
});

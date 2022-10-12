const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const contactRoutes = require("./routes/contact-routes");
const postRoutes = require("./routes/post-routes");
const postApiRoutes = require("./routes/api-post-routes");
const createPath = require("./helpers/create-path");

const app = express();

app.set("view engine", "ejs");

const PORT = process.env.PORT || 80;
const db = process.env.DB_CONNECT;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Conn to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listen port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(
  morgan(":method :url :status :res[content-lenght] - :response-time ms")
);

app.use(express.static("styles"));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = "Err Page";
  res.status(404).render(createPath("error"), { Title: title });
});

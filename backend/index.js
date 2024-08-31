const express = require("express");
const app = express();
const { PORT } = require("./config");
const mongoose = require("mongoose");
const bookModel = require("./models/book");
const booksRoute = require("./routes/booksRouter");
const cors =  require('cors');

// middleware for parsing the request body
app.use(express.json());


// middleware for handling cors policy
app.use(cors()); //allow all origin
// app.use(cors( //custom cors policy
//   {
//     origin: '',
//     methods: [],
//     allowedHeaders: []
//   }
// ))

app.get("/", (req, res) => {
  // console.log(req);
  return res.status(234).send("Welcome to the MERN stack tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(`mongodb://127.0.0.1:27017/books`)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

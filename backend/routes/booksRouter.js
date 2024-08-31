const express = require("express");
const bookModel = require("../models/book");
const mongoose = require("mongoose");

const router = express.Router();

// Route to save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "send all required fields title, author, publishedYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };
    const createdBook = await bookModel.create(newBook);
    res.status(201).send(createdBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get/find all the books from the database
router.get("/", async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get/find the book by id from the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update the book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).send({
        message: "send all required fields: title, author, publishedYear",
      });
    }

    const result = await bookModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res
      .status(200)
      .send({ message: "Book updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

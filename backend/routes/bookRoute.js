import express from "express";
import { Book } from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";

const bookRoute = express.Router();

bookRoute.post("/book", async (req, res) => {
  try {
    const { Name, Money, Day } = req.body;
    if (!Name || !Money || !Day) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide Name, Money and Day" });
    }
    await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "Booking added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ msg: "Internal server error, try again" });
  }
});

bookRoute.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books)
      return res.status(StatusCodes.OK).json({ msg: "Books not available" });
    res.status(StatusCodes.OK).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Internal server error" });
  }
});
bookRoute.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `book not found with id - ${id}` });

    res.status(StatusCodes.OK).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "internal server error" });
  }
});

bookRoute.put("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Money, Day } = req.body;
    if (!Name || !Money || !Day)
      return res
        .status(StatusCodes.OK)
        .json({ msg: "please provide all fields" });
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Booking with id ${id} not found` });
    res.status(StatusCodes.OK).json({ msg: "Booking updated", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({ msg: "Internal server error" });
  }
});

bookRoute.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Booking not found with id - ${id}` });
    res.status(StatusCodes.OK).json({ msg: "Booking Deleted", data: book });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "internal server error" });
  }
});

export default bookRoute;

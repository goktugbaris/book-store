const Book = require("../models/book");
const response = require("../response");
const { validationResult } = require("express-validator");
const multer = require("multer");
var path = require("path");
let bookImageName = null;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // file mimetype
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    bookImageName = Date.now() + path.extname(file.originalname);
    cb(null, bookImageName);
  },
});
exports.upload = multer({
  storage: storage,
});

exports.list = (req, res) => {
  Book.find({})
    .sort({ created: -1 })
    .populate("categoryBy")
    .exec((err, books) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      return new response(books, null).success(res);
    });
};

exports.getById = (req, res) => {
  Book.findById(req.params.book_id)
    .populate("categoryBy")
    .exec((err, book) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      if (book) {
        return new response(book, null).success(res);
      } else {
        return new response(null, err).notFound(res);
      }
    });
};

exports.listByCategoryId = (req, res) => {
  let _id = req.params.category_id;
  Book.find({ categoryBy: _id })
    .populate("categoryBy")
    .exec((err, books) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      return new response(books, null).success(res);
    });
};

exports.create = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new response(null, errors.array()).error400(res);
  }
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    price: req.body.price,
    stock: req.body.stock,
    picture:req.body.picture,
    categoryBy: req.body.categoryBy._id,
  });
  book.save((err) => {
    if (err) {
      return new response(null, err).error500(res);
    }
    return new response(book, null).created(res);
  });
};

exports.update = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new response(null, errors.array()).error400(res);
  }
  Book.findById(req.params.book_id, (err, book) => {
    if (err) {
      return new response(null, err).error500(res);
    }
    if (!book) {
      return new response().notFound(res);
    }
    const { title, author, price, language, stock, picture, categoryBy } = req.body;
    book.title = title;
    book.author = author;
    book.price = price;
    book.language = language;
    book.stock = stock;
    book.picture = picture;
    book.categoryBy = categoryBy._id;
    book.save((err) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      return new response(book, null).success(res);
    });
  });
};

exports.delete = (req, res) => {
  Book.findByIdAndDelete({ _id: req.params.book_id }, (err, book) => {
    if (err) {
      return new response(null, err).error500(res);
    }
    if (!book) {
      return new response().notFound(res);
    }
    return new response(book, null).success(res);
  });
};

exports.saveImage = (req, res) => {
  try {
    res
      .status(200)
      .json({
        status: true,
        url: `http://localhost:${process.env.port}/${bookImageName}`,
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

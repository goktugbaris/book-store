let Book = require("../models/book");
let response = require("../response");

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
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    price: req.body.price,
    stock: req.body.stock,
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
  Book.findById(req.params.book_id, (err, book) => {
    if (err) {
      return new response(null, err).error500(res);
    }
    if (!book) {
      return new response().notFound(res);
    }
    const { title, author, price, language, stock, categoryBy } = req.body;
    book.title = title;
    book.author = author;
    book.price = price;
    book.language = language;
    book.stock = stock;
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

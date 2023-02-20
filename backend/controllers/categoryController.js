let Category = require("../models/category");
let response = require("../response");

exports.list = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      return new response(null, err).error500(res);
    }
    return new response(categories, null).success(res);
  });
};

exports.getById = (req, res) => {
  Category.findById(req.params.category_id, (err, category) => {
    if (err) {
      return new response().notFound(res);
    }
    return new response(category, null).success(res);
  });
};

exports.create = (req, res) => {
  var category = new Category({
    name:req.body.name,
    books:req.body.books,
  });
 
  category.save((err) => {
    if (err) {
      return new response(null, err).error500(res);
    }
    return new response(category, null).created(res);
  });
};

exports.update = (req, res) => {
  Category.findById(req.params.category_id, (err, category) => {
    if (err) {
      return new response().notFound(res);
    }
    category.name = req.body.name;
    category.save((err) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      return new response(category, null).success(res);
    });
  });
};

exports.delete = (req, res) => {
  Category.findOneAndDelete(
    { _id: req.params.category_id },
    (err, category) => {
      if (err) {
        return new response(null, err).error500(res);
      }
      if (!category) {
        return new response().notFound(res);
      }
      return new response(category,err).success(res);
    }
  );
};

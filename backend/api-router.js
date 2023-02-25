let router = require("express").Router();
let categoryController = require("./controllers/categoryController");
let bookController = require("./controllers/bookController");

router
  .route("/category")
  .get(categoryController.list)
  .post(categoryController.create);

router
  .route("/category/:category_id")
  .put(categoryController.update)
  .delete(categoryController.delete)
  .get(categoryController.getById);

router.route("/book").get(bookController.list).post(bookController.create);

router
  .route("/book/:book_id")
  .get(bookController.getById)
  .put(bookController.update)
  .delete(bookController.delete);

router
  .route("/books/:category_id")
  .get(bookController.listByCategoryId);

module.exports = router;

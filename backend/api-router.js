const router = require("express").Router();
const categoryController = require("./controllers/categoryController");
const bookController = require("./controllers/bookController");
const {check} = require("express-validator");

router
  .route("/category")
  .get(categoryController.list)
  .post([check("name").notEmpty().withMessage("Required Field")],categoryController.create);

router
  .route("/category/:category_id")
  .put([check("name").notEmpty().withMessage("Required Field")],categoryController.update)
  .delete(categoryController.delete)
  .get(categoryController.getById);

var bookValidation = new Array(
[check("title").notEmpty().withMessage("Required Field")],
[check("author").notEmpty().withMessage("Required Field")],
[check("language").notEmpty().withMessage("Required Field")],
[check("price").notEmpty().withMessage("Required Field").isFloat()],
[check("stock").notEmpty().withMessage("Required Field").isInt()],
[check("categoryBy").notEmpty().withMessage("Required Field")]);

router.route("/book")
.get(bookController.list)
.post([bookValidation],bookController.create);

router
  .route("/book/:book_id")
  .get(bookController.getById)
  .put([bookValidation],bookController.update)
  .delete(bookController.delete);

router
  .route("/books/:category_id")
  .get(bookController.listByCategoryId);


router
  .route("/book/saveImage")
  .post(bookController.upload.single("picture"),bookController.saveImage);

module.exports = router;

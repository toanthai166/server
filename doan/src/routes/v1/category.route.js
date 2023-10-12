const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/create')
  .post(auth('category'), validate(categoryValidation.createCategory), categoryController.createCategory);
router.route('/').get(validate(categoryValidation.getCategorys), categoryController.getCategories);
router
  .route('/:categoryId/active')
  .patch(auth('category'), validate(categoryValidation.changeIsActiveCategory), categoryController.changeIsActiveCategory);
router
  .route('/:categoryId')
  .get(validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth('category'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth('category'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;

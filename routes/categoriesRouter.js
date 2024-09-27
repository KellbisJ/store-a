const express = require('express');

const CategoriesService = require('../services/categoriesService');

const validatorHandler = require('../middlewares/validatorHandler');

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();

const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json({
      message: 'Product created',
      newCategory,
    });
  },
);
router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json({
        message: 'Product updated',
        product,
      });
    } catch (error) {
      next(error);
    }
  },
);
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json({
        message: 'Product updated',
        product,
      });
    } catch (error) {
      next(error);
    }
  },
);
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.delete(id);
    res.status(200).json({
      message: 'Product deleted',
      category,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

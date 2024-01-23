const express = require('express');
const product = require('../schemas/products.schema');
const router = express.Router();

// 상품 작성 (POST)
router.post('/products', async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const { title, content, author, password } = req.body;
    const newProduct = new product({
      title, // == title: title
      content,
      author,
      password,
    });
    await newProduct.save();
    res.status(201).json({ message: '판매 상품을 등록하였습니다.' });
  } catch (err) {
    res.status(500).json({ message: '예기치 못한 에러가 발생했습니다.' });
  }
});

// 상품 목록 조회(GET)
router.get('/products', async (req, res) => {
  try {
    const product = await product
      .find()
      .select('_id title author status createdAt')
      .sort({ createdAt: -1 });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: '예기치 못한 에러가 발생했습니다.' });
  }
});

//상품 상세 조회(GET)
router.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      ' _id title author status createdAt'
    );

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패했습니다.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: '예기치 못한 에러가 발생했습니다.' });
  }
});

//상품 수정(PUT)
router.put('/products/:productId', async (req, res) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: '데이처 형식이 올바르지 않습니다.' });
    }
    const { title, content, password, status } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패 했습니다.' });
    }

    if (password !== product.password) {
      return res
        .status(401)
        .json({ message: '상품을 수월한 권한이 존재하지 않습니다.' });
    }
    product.title = title;
    product.content = content;
    product.status = status;
  } catch (err) {
    res.status(500).json({ message: '예기치 못한 에러가 발생했습니다.' });
  }
});

//상품 삭제(DELETE)

router.delete('/products/:productId', async (req, res) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: '데이처 형식이 올바르지 않습니다.' });
    }
    const productId = req.params.productId;
    const { password } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: '상품 조회에 실패 했습니다.' });
    }

    if (password !== product.password) {
      return res
        .status(401)
        .json({ message: '상품을 수월한 권한이 존재하지 않습니다.' });
    }
    await product.deleteOne({ id: productId });
    res.json({ message: '상품을 삭제하였습니다.' });
  } catch (err) {
    res.status(500).json({ message: '예기치 못한 에러가 발생했습니다.' });
  }
});

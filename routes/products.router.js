const express = require("express");
const router = express.Router();

router
	.route("/")
	.get((req, res) => {
		res.send("상품 목록 조회");
	})
	.post((req, res) => {
		console.log(req.body);
		const { title, content, author, password } = req.body; //구조분해할당
		if (!title || !content || !author || password) {
			return res.send(`데이터 형식이 올바르지 않습니다.`);
		}
		res.send("판매 상품을 등록하였습니다.");
	});

router
	.route("/:id")
	.get((req, res) => {
		res.send(`상품 상세 조회 : ${req.params.id}`);
	})
	.put((req, res) => {
		res.send(`상품 정보 수정 : ${req.params.id}`);
	})
	.delete((req, res) => {
		res.send(`상품 삭제 : ${req.params.id}`);
	});

module.exports = router;

const { Router } = require("express");
const { bookEntry } = require("./controllers/bookEntry");
const { getBook } = require("./controllers/getBook");

const router = Router();

router.get("/", (req, res) => {
	res.json("Welcome to Book Management backend");
});
router.post("/addbook", bookEntry);
router.get("/getbook", getBook);

module.exports = router;
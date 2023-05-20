const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const PORT = 8001;

const app = express();
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`app is live at ${PORT}`);
});
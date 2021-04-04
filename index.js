require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const RootController = require('./src/controller/RootController');
const RestExceptionHandler = require('./src/error/RestExceptionHandler');

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

/* Rest handler middleware */
RootController(app);

/* Error handler middleware */
RestExceptionHandler(app)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});
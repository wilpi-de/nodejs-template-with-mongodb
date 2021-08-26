const express = require("express");
const ApiError = require("./errors/apiError");
const errorController = require("./controllers/api/errorController");

// IMPORT ROUTES
const postRouter = require("./routes/api/postRouter");

const app = express();


// MIDDLEWARES
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// API ROUTES
app.use("/api/v1/posts", postRouter);

app.all("/api/*", (req, res, next) => {
    next(new ApiError(`Kann ${req.originalUrl} nicht finden.`, 404));
});

app.use(errorController);

module.exports = app;

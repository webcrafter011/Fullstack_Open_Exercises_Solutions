const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !author || !url || likes === undefined) {
    return response.status(400).json({
      error: "provide all the arguments",
    });
  }

  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((e) => next(e));
});

module.exports = blogsRouter;

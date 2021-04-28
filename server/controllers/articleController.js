const mongoose = require("mongoose");
const Article = require("../models/articleModel");
// create new cause
const createArticle = (req, res) => {
  const article = new Article({
    name: req.body.name,
    image: req.body.image,
    userId: req.body.userId,
    tags: req.body.tags,
  });

  return article
    .save()
    .then((newArticle) => {
      return res.status(201).json(newArticle);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

const getArticle = (req, res) => {
  console.log(req.body);
  if (req.body.tag)
    Article.find({ tags: { $regex: req.body.tag } })
      .then((allArticle) => {
        return res.status(200).json(allArticle);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  if (req.body.keyword)
    Article.find({ name: { $regex: req.body.keyword } })
      .then((allArticle) => {
        return res.status(200).json(allArticle);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  else {
    Article.find()
      .then((allArticle) => {
        return res.status(200).json(allArticle);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
};

const getArticleById = (req, res) => {
  const id = req.params.id;
  Article.findById(id)
    .then((singleArticle) => {
      res.status(200).json(singleArticle);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};
const getArticleOfUser = (req, res) => {
  const id = req.params.id;
  Article.find({ userId: id })
    .then((articlesOfUser) => {
      res.status(200).json(articlesOfUser);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};
const updateArticle = (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  Article.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};

const deleteArticle = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};
const postLike = async (req, res) => {
  const id = req.params.id;
  const updateObject = req.body.userId;
  await Article.updateOne({ _id: id }, { $push: { like: updateObject } })
    .exec()
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};
const deleteLike = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  Article.updateOne({ _id: id }, { $pull: { like: userId } })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};
const postComments = async (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  await Article.updateOne({ _id: id }, { $push: { comments: updateObject } })
    .exec()
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};
const updateComments = async (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const updateObject = req.body;
  Article.updateMany(
    { _id: id, comments: { commentId: commentId } },
    { $set: updateObject }
  )
    .exec()
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};
const deleteComment = async (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  Article.updateOne(
    { _id: id },
    { $pull: { comments: { commentId: commentId } } }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
};
module.exports = {
  updateComments,
  postLike,
  createArticle,
  getArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  deleteComment,
  deleteLike,
  postComments,
  getArticleOfUser,
};

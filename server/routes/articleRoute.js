const express = require("express");
const articleController = require("../controllers/articleController");
var multer = require("multer");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

var uploadAvatar = function (req, res) {
  upload(req, res, function (err) {
    console.log(req.body);
    console.log(req.file);

    if (err) {
      return res.end("Error uploading file.");
    }
    res.json(req.file);
  });
};
router.post("/upload", uploadAvatar);

router.post("/articles", articleController.createArticle);
router.get("/articles", articleController.getArticle);
router.get("/articles/:id", articleController.getArticleById);
router.put("/articles/:id", articleController.updateArticle);
router.delete("/articles/:id", articleController.deleteArticle);
router.post("/articles/:id/like", articleController.postLike);
router.delete("/articles/:id/like", articleController.deleteLike);
router.post("/articles/:id/comments", articleController.postComments);
router.delete(
  "/articles/:id/comments/:commentId",
  articleController.deleteComment
);
router.put(
  "/articles/:id/comments/:commentId",
  articleController.updateComments
);

module.exports = router;

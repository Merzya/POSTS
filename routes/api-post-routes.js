const express = require("express");
const {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
} = require("../controllers/api-post-controller");

const router = express.Router();

//vsi postu
router.get("/api/posts", getPosts);
// dodatu novuy
router.post("/api/post", addPost);
// post po id
router.get("/api/post/:id", getPost);
//vudalutu
router.delete("/api/post/:id", deletePost);
//zminutu
router.put("/api/post/:id", editPost);

module.exports = router;

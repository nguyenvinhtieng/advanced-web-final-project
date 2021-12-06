const express = require("express");
const router = express.Router();
const checkUser = require("../../app/middleware/checkUser");
const PostController = require("../../app/controllers/PostController");
const multer = require("multer");

router.post("/create", multer({ dest: "../../public/images/uploads", }).single("image"), PostController.createNewPost);
router.post("/:id", checkUser, multer({ dest: "../../public/images/uploads/" }).single("image"), PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/", PostController.getPosts);


module.exports = router;

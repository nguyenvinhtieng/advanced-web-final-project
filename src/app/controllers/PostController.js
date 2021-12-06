const Post = require('../models/Post');
const Account = require('../models/Account');
const uploadImage = require("../lib/uploadImage");
class PostController {
    async createNewPost(req, res) {
        const account = await Account.findOne({ _id: req.session.user_id }).lean();
        let imagePath = "";
        if (req.file) {
            imagePath = await uploadImage(
                req.file.path,
                req.file.filename
            );
        }
        let { content, urlYoutube } = req.body;
        urlYoutube = urlYoutube.replace("watch?v=", "embed/");
        const id_user = account._id;
        const username = account.username;
        const userAvatar = account.avatar;
        const newPost = new Post({
            username,
            userAvatar,
            content,
            imagePath,
            urlYoutube,
            id_user,
        });
        await newPost.save();
        res.status(200).send({ newPost });
    }

    async updatePost(req, res) {
        const account = req.account;
        const { id } = req.params;

        const imagePath = await uploadImage(req.file.path, req.file.filename);
        const { content, urlYoutube } = req.body;
        const updatePost = await Post.findByIdAndUpdate(id, {
            content,
            imagePath,
            urlYoutube,
        });
        res.status(200).send({ updatePost });
    }

    async deletePost(req, res) {
        const { id } = req.params;
        const deletePost = await Post.findByIdAndDelete(id);
        res.status(200).send({ deletePost });
    }

    async getPosts(req, res) {
        const { page, user } = req.query;
        if (user) {
            const posts = await Post.find({ id_user: user })
                .sort({ date: -1 })
                .skip(page * 10)
                .limit(10)
                .lean();
            res.status(200).send(posts);
        } else {
            const posts = await Post.find().sort({ date: -1 }).skip(page * 10).limit(10).lean();
            res.status(200).send({ posts });
        }
    }

    async addComment(req, res) {
        const account = await Account.findOne({
            _id: req.session.user_id,
        }).lean();
        const { post_id } = req.params;
        const { content } = req.body;
        const comment = { content, id_user: account._id, username: account.username, userAvatar: account.avatar };
        const post = await Post.findById(post_id);
        post.comments.push(comment);
        await post.save();
        res.status(200).send(comment);
    }

    async deleteComment(req, res) {
        const { post_id, comment_id } = req.params;
        const post = await Post.findById(post_id);
        const comment = post.comments.id(comment_id);
        comment.remove();
        await post.save();
        res.status(200).send({ comment });
    }

}

module.exports = new PostController();
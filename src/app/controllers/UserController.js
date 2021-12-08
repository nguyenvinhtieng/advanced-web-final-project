
const Account = require('../models/Account')
const Post = require('../models/Post')
const Notification = require('../models/Notification')
const uploadImage = require('../lib/uploadImage');

class UserController {
    async renderHome(req, res, next) {
        const account = req.account;
        const first_10_posts = await Post.find({})
            .sort({ date: -1 })
            .limit(10)
            .lean();
        const first_10_notifications = await Notification.find({
            user_id: account._id,
        })
            .sort({ date: -1 })
            .limit(10)
            .lean();
        res.render("./user/home", {
            account,
            first_10_posts,
            first_10_notifications,
        });
    }

    async renderProfile(req, res, next) {
        const account = await Account.findOne({ _id: req.session.user_id }).lean();
        let admin = false
        if (account.role == "admin") admin = true
        try {
            const user = await Account.findOne({ _id: req.params.id }).lean();
            const user_first_10_posts = await Post.find({ id_user: user._id })
                .sort({ date: -1 })
                .limit(10)
                .lean();
            res.render("./user/profile", { account, user, user_first_10_posts, admin });
        } catch (e) {
            res.redirect('/404')
        }
    }

    async updateAccount(req, res, next) {
        // const account = await Account.findOne({ _id: req.account._id });
        // account.username = req.body.username;
        // account.class = req.body.class;
        // account.faculty = req.body.faculty;
        let account = await Account.findOneAndUpdate({ _id: req.account._id }, req.body)
        console.log(account);
        if (req.file) {
            account.avatar = await uploadImage(req.file.path, req.file.filename);
        }
        res.redirect('back')
    }
}

module.exports = new UserController();

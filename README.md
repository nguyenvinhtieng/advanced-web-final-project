# Note

Còn thiếu:

```diff
- Update thông tin cá nhân của học sinh phần update ảnh chưa hoạt động
- Update bài viết chưa hoạt động nên bên view chưa update được
- Validate dữ liệu thì đa phần đã kiểm tra bên view rồi nên bên server có thể bỏ qua đỡ mắc công(còn k thì vẫn kiểm tra được)
```

Note:

```diff
+ Bên view đã viết sẵn hàm tạo flash message nên bên server muốn thông báo thì gọi hàm setFlashMessage, rồi truyền middleware flash vào route muốn thông báo
 ex: req.session.flash = setFlashMessage('error', 'Invalid account', "Tài khoản hoặc mật khẩu không chính xác")
> router.get('/login', flash, AccountController.renderLogin)
```

# Run sass

sass ./src/public/scss/app.scss ./src/public/stylesheets/style.css -w

# BEFORE

# Config

-   src/config/admin.js: **Tài khoản admin**
-   src/config/credentials.js **mongodb**
-   src/congfig/firebase.js **Tài khoản firebase**, vừa lưu trên firebase vừa backup trong upload/

# Todo

:ballot*box_with_check: \*\*Load thêm 10 bài viết tiếp theo */API/post.js\_\*\*

-   **home.hbs**

```
GET localhost:3000/API/post/?page=1 => post thứ 10-20
```

-   **views/user/profile.hbs**

```
GET localhost:3000/API/post/?page=1&user=61a8cc95a1e7480929f23613 => post thứ 10-20 của user 61a8cc95a1e7480929f23613 (account._id)
```

```
{
  "posts": [
    {
      "_id": "61ab5563ae245ce497d9e28b",
      "id_user": "61a8cc95a1e7480929f23613",
      "username": "Nguyễn Văn Dũng",
      "userAvatar": "https://lh3.googleusercontent.com/a-/AOh14Gh56l_ICq6E7425A_4__9Swv7UvqdPIM8Bii0dcDA=s96-c",
      "content": "post",
      "imagePath": "https://storage.googleapis.com/download/storage/v1/b/final-web-2021.appspot.com/o/%2Fuploads%2F7ec4ca6e02aec67b4c27c08d89af56c0?generation=1638618467213586&alt=media",
      "urlYoutube": "",
      "date": "2021-12-04T11:47:47.647Z",
      "comments": [
        {
          "id_user": "61a8cc95a1e7480929f23613",
          "username": "Nguyễn Văn Dũng",
          "userAvatar": "https://lh3.googleusercontent.com/a-/AOh14Gh56l_ICq6E7425A_4__9Swv7UvqdPIM8Bii0dcDA=s96-c",
          "content": "cmt 1",
          "_id": "61ab5c02e75767dc418757a2",
          "date": "2021-12-04T12:16:02.483Z"
        },
        {
          "id_user": "61a8cc95a1e7480929f23613",
          "username": "Nguyễn Văn Dũng",
          "userAvatar": "https://lh3.googleusercontent.com/a-/AOh14Gh56l_ICq6E7425A_4__9Swv7UvqdPIM8Bii0dcDA=s96-c",
          "content": "cmt 2",
          "_id": "61ab5c08e75767dc418757a7",
          "date": "2021-12-04T12:16:08.165Z"
        }
      ],
      "__v": 2
    },
    {
      "_id": "61ab4aeeae245ce497d9e234",
      "id_user": "61a8cc8ba1e7480929f23610",
      "username": "Admin",
      "userAvatar": "/images/logo.png",
      "content": "post",
      "imagePath": "",
      "urlYoutube": "",
      "date": "2021-12-04T11:03:10.523Z",
      "comments": [],
      "__v": 0
    },
  ]
}
```

:ballot*box_with_check: \*\*Load thêm 10 thông báo để phân trang */API/notification.js\_\*\*

-   Thông báo chung: **views/user/notification.hbs**

```
GET localhost:3000/API/notification/?page=1 => noti thứ 10-20
```

-   Thông báo theo chuyên mục **views/user/notification.hbs** (tạo view riêng cho nó nhìn đẹp hơn)

```
GET localhost:3000/API/notification/?page=1&category=pdh => noti thứ 10-20 trong category phòng đại học
```

-   Thông báo của tài khoảng phòng ban: **views/department/notification.hbs**

```
GET localhost:3000/API/notification/?page=1&department=B001 => noti thứ 10-20 của tài khoản B001
```

```
{
  "notifications": [
    {
      "_id": "61a8cf7bdca718626f78df9f",
      "userId": "61a8cedbdca718626f78df74",
      "username": "51900046",
      "category": "sdtc",
      "title": "Thong bao 3",
      "content": "I.  Giới thiệu:\r\ác môn học cùng tên nhưng khác mã môn học, sinh viên vui lòng liên hệ Khoa quản lý môn để được tư vấn thêm.",
      "date": "2021-12-02T13:51:55.688Z",
      "__v": 0
    },
    {
      "_id": "61a8cf76dca718626f78df9c",
      "userId": "61a8cedbdca718626f78df74",
      "username": "51900046",
      "category": "pcthssv",
      "title": "Thong bao 2",
      "content": "Đối với các môn học cùng tên nhưng khác mã môn học, sinh viên vui lòng liên hệ Khoa quản lý môn để được tư vấn thêm.",
      "date": "2021-12-02T13:51:50.204Z",
      "__v": 0
    }
  ]
}
```

-   :ballot_box_with_check: **Đăng post (xong nhưng chưa ajax) - API/post.js**
-   :ballot_box_with_check: **Sửa post (chưa ajax) - API/post.js**
-   :ballot_box_with_check: **Xóa post (chưa ajax) - API/post.js**
-   :ballot_box_with_check: **Bình luận (chưa ajax) - API/comment.js**
-   :ballot_box_with_check: **Xóa bình luận (chưa ajax) - API/comment.js**
-   :ballot_box_with_check: **modal tạo tài khoản - sửa nút radio thành checkbox**
-   :ballot_box_with_check: **views/user/detailNotification.hbs thêm nút trở về trang noti chung**
-   :ballot_box_with_check: **modal chỉnh sửa profile có trường class với faculty**

### Không biết bên view hiển thị lỗi như nào nên t chưa validate kỹ dữ liệu, chắc để làm sau cùng

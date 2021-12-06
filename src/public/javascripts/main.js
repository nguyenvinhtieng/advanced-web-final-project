function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");
        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        const icons = {
            success: "checkmark-circle-outline",
            info: "information-circle-outline",
            warning: "alert-circle-outline",
            error: "bug-outline"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <ion-icon name="${icon}"></ion-icon>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
function showSuccessToast(message, title = "Successfully", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'success',
        duration: duration
    })
}
function showInfoToast(message, title = "Information", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'info',
        duration: duration
    })
}
function showErrorToast(message, title = "Error", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'error',
        duration: duration
    })
}
let MY_URL = 'http://localhost:3000/'
let imgDepartments = ["pcthssv", 'pdh', 'psdh', 'pdtvmt', 'pktvkdcl', 'ptc', 'tdtclc', 'ttth', 'sdtc', 'atem', "tthtdnvcsv", 'kl', 'ttnnthbdvh', 'vcsktvkd', 'kmtcn', 'kddt', 'kcntt', 'kqtkd', 'kmtvbhld', 'kldcd', 'ktcnh', 'kgdqt'];

let departments = ["Phòng CTHSSV", "Phòng Đại Học", "Phòng Sau Đại Học", "Phòng Điện Toán Và Máy Tính", "Phòng Khảo Thí Và Kiểm Định Chất Lượng", "Phòng Tài Chính", "TDT Creative Language Center", "Trung Tâm Tin Học", "Trung Tâm Đào Tạo phát triển xã hội(SDTC)", "Trung Tâm Phát Triển Khoa Học Quản Lý và Ứng Dụng Công Nghệ (ATEM)", "Trung Tâm Hợp Tác Doanh Nghiệp Và Cựu Sinh Viên", "Khoa Luật", "Trung Tâm Ngoại Ngữ Tin Học Bồi Dưỡng Văn Hóa", " Viện chính sách kinh tế và kinh doanh", "Khoa Mỹ thuật công nghiệp", "Khoa Điện – Điện tử", "Khoa Công nghệ thông tin", "Khoa Quản trị kinh doanh", "Khoa Môi trường và bảo hộ lao động", "Khoa Lao động công đoàn", "Khoa Tài chính ngân hàng", "Khoa giáo dục quốc tế"];

if (document.getElementById('socket-page')) {
    socketPage()
} else {
    noSocket()
}

function socketPage() {
    var socket = io(MY_URL);
    socket.on("connect", () => {
        socket.send();
    })
    socket.emit('user-join', { user: document.getElementById('role-user').innerHTML.trim() || "department or admin" })
    socket.on("has-new-notify", (data) => {
        let message = `${data.username} Just posted new Notification for category(${data.category})<b> <a href='/notify/${data._id}'>Click here</a> </b> to view`
        showInfoToast(message, title = "Notification", duration = 10000)
    })

    let dropDown = document.querySelector('.drop-down')
    dropDown.addEventListener('click', () => {
        document.querySelector('.menu-dropdown').style.display = 'block'
    })

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.drop-down')) {
            document.querySelector('.menu-dropdown').style.display = 'none'
        }
    })
    let tabs = document.querySelectorAll('.tab-list .tab-item')
    let homeItems = document.querySelectorAll('.home-item')
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.className = "tab-item"
            })
            tab.className = "tab-item active"
            homeItems.forEach(item => {
                item.className = item.classList[0] + ' home-item'
            })
            homeItems[index].className = homeItems[index].classList[0] + ' ' + homeItems[index].classList[1] + " active"
        })
    })

    let btnOpenModalChangePassword = document.querySelector('.change-password')
    btnOpenModalChangePassword.addEventListener('click', () => {
        document.querySelector('#modal-change-password').checked = true
    })
    //++++++++++++++++++++++
    // NOTIFICATION PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('notification-page')) {
        let listDepartment = document.querySelector('.notifications-list-department')
        listDepartment.innerHTML = ''
        console.log(departments)
        departments.forEach(function (name, index) {
            let li = document.createElement('li')
            li.className = "notifications-department"
            li.innerHTML = `<a href="/category/${imgDepartments[index]}">
                                <img src="/images/department/${imgDepartments[index]}.png" alt="">
                                <div class="department-name">
                                   ${name}
                                </div>
                            </a>`;
            listDepartment.appendChild(li)
        })
    }
    //++++++++++++++++++++++
    // ACCOUNT PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('account-page')) {
        document.querySelectorAll('.header-menu-item')[1].classList.add('active')
        let departmentCreate = document.querySelector('.modal-create-account .modal-content .department-list')
        departmentCreate.innerHTML = ''
        departments.forEach(function (name, index) {
            let div = document.createElement('div')
            div.className = "department-item"
            div.innerHTML = ` <input type="checkbox" class="checkbox-input" name="department[]" id="${index}" 
                                value="${imgDepartments[index]}">
                                <label class="checkbox-label" for="${index}"></label>
                                <label for="${index}">${name}</label>`;
            departmentCreate.appendChild(div)
        })
        let formCreateAccount = document.querySelector('#formCreateAccount')
        formCreateAccount.onsubmit = (e) => {
            e.preventDefault();
            let username = document.querySelector('#username')
            if (username.value.trim() === '') {
                showErrorToast('Please enter a username')
                return
            }
            let isCheck = false
            let listCheckBox = document.querySelectorAll('.checkbox-input')
            listCheckBox.forEach(item => {
                if (item.checked) {
                    isCheck = true
                }
            })
            if (!isCheck) {
                showErrorToast('Please choose department!')
                return
            }
            formCreateAccount.submit()
        }
    }

    //++++++++++++++++++++++
    // PROFILE PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('profile-page')) {
        let file = document.querySelector('#file')
        file.addEventListener('change', (e) => {
            let preview = document.getElementById('file-select-preview')
            preview.setAttribute("src", window.URL.createObjectURL(e.target.files[0]))
        })
        let formUpdateAccount = document.getElementById('formUpdateInfor')
        console.log(formUpdateAccount)
        formUpdateAccount.onsubmit = (e) => {
            e.preventDefault();
            let name = document.getElementById('name').value
            let userClass = document.getElementById('class').value
            let faculty = document.getElementById('faculty').value
            if (name.trim() === '') {
                showErrorToast("Name empty!")
                return
            }
            if (userClass.trim() === '') {
                showErrorToast("Class empty!")
                return
            }
            if (faculty.trim() === '') {
                showErrorToast("Faculty empty!")
                return
            }
            formUpdateAccount.submit()
        }


        eventDeletePost()
    }
    //++++++++++++++++++++++
    // NOTIFICATIONS PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('notifications-page')) {
        document.querySelectorAll('.header-menu-item')[1].classList.add('active')
        let formCreateNotify = document.getElementById('formCreateNotification')
        formCreateNotify.onsubmit = (e) => {
            e.preventDefault();
            let title = document.getElementById('title').value
            let content = document.getElementById('content').value
            if (title.trim() === '') {
                showErrorToast("Title empty!")
                return
            }
            if (content.trim() === '') {
                showErrorToast("Content empty!")
                return
            }
            let isCheck = false
            let category
            let checkboxList = document.querySelectorAll('.checkbox-input')
            checkboxList.forEach(item => {
                if (item.checked) {
                    isCheck = true
                    category = item.value
                }
            })
            if (!isCheck) {
                showErrorToast("Please choose a Category")
                return
            }
            $.ajax({
                url: '/department/createNotify',
                type: 'POST',
                data: { title, content, category },
                success: function (response) {
                    showSuccessToast("Create Notification successfully!")
                    socket.emit('event-create-noti', response.notification)
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                }
            })

        }
    }
    //++++++++++++++++++++++
    // HOME PAGE
    // +++++++++++++++++++++++++
    if (document.getElementById('home-page')) {
        document.querySelectorAll('.header-menu-item')[0].classList.add('active')
        let inputImgPost = document.querySelector('#post-img')
        inputImgPost.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                document.querySelector('.modal-image-preview').style.display = 'block'
                let url = URL.createObjectURL(e.target.files[0]);
                let imgPreview = document.getElementById('img-post-preview')
                imgPreview.setAttribute("src", url);
                let btnDeleteImg = document.querySelector('.delete-img')
                btnDeleteImg.addEventListener('click', (e) => {
                    document.getElementById('post-img').value = null
                    inputImgPost.setAttribute("value", "")
                    document.querySelector('.modal-image-preview').style.display = 'none'
                })
            } else {
                document.querySelector('.modal-image-preview').style.display = 'none'
            }
        })

        let formCreatePost = document.querySelector('#formCreatePost')
        formCreatePost.onsubmit = (e) => {
            e.preventDefault()
            let contentPost = document.querySelector('#contentPost')
            if (contentPost.value.trim() === '') {
                showErrorToast('Please enter content');
                return
            }
            const body = new FormData(e.target)
            showInfoToast("Post is being processed!")
            fetch('/API/post/create', { method: 'post', body })
                .then(res => res.json())
                .then(res => {
                    showSuccessToast("Post successfully! ")
                    console.log(res)
                    document.getElementById('modal-create-newpost').checked = false
                    document.getElementById('contentPost').value = ""
                    document.querySelector('.youtube-link').value = ""
                    document.querySelector('.post-img-posted').value = null
                    console.log(document.getElementById('post-img'))
                    document.querySelector('.img-prv-create-post').style.display = 'none'
                    renderNewPost(res.newPost)
                })
                .catch(error => {
                    showErrorToast("Has error while processing post")
                    console.log(error)
                })
        }
        function renderNewPost(post) {
            let main = document.querySelector('#posts')
            main.innerHTML = `
            <div class="post">
            <div class="post-header">
                <div class="avatar-sm">
                    <img src='${post.userAvatar}' alt="Khoa Công Nghệ Thông Tin DH TDT">
                </div>
                <div class="post-header-infor">
                    <a href="/user/${post.id_user}" class="post-header-name">
                        ${post.username}
                    </a>
                    <div class="post-header-time">
                        ${post.date}
                    </div>
                </div>
                <div class="post-header-operation">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                    <ul class="list-operation">
                        <li class="item-operation delete">
                            <label for="modal-delete-post"> Delete </label>
                        </li>
                        <li class="item-operation edit">
                            <label for="modal-edit-post"> Edit </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="post-content">
                <div class="post-text">
                    ${post.content}
                </div>
                ${post.imagePath ? `<div class="post-img">
                                        <img src="${post.imagePath}" alt="">
                                    </div>` : ""}
                ${post.urlYoutube ? `<div class="post-video">
                                        <iframe width="560" height="315" src=${post.urlYoutube} title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen></iframe>
                                    </div>` : ``}
                
            </div>
            <div class="post-interact">
                <div class="comment-count">
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    <span>0 Comment</span>
                </div>
                <form action="/API/comment/{{this._id}}/create" method="post">
                    <div class="add-comment">
                        <input type="text" placeholder="Add a comment..." name="content">
                        <button>
                            <ion-icon name="paper-plane"></ion-icon>
                        </button>
                    </div>
                </form>
            </div>
            <ul class="post-comment">
                
            </ul>
        </div>
            ` + main.innerHTML
        }

        eventDeletePost()
        eventEditPost()

    }
    //++++++++++++++++++++++
    // ACCOUNT PAGE
    // +++++++++++++++++++++++++

}

// login page
function noSocket() {
    let loginForm = document.querySelector('#loginForm')
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        let username = document.getElementById('username')
        let password = document.getElementById('password')
        if (username.value.trim() === '') {
            showErrorToast("Username empty!")
            return;
        }
        if (password.value.trim() === '') {
            showErrorToast("Password empty!")
            return;
        }
        loginForm.submit()
    }
}

function eventDeletePost() {
    let postClicked = ''
    let btnDeletePost = document.querySelector('#btnDeletePost')
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('labelDeletePost')) {
            console.log(e.target.getAttribute('data-id'))
            btnDeletePost.setAttribute('data-id', e.target.getAttribute('data-id'))
            postClicked = e.target
        }
    })

    btnDeletePost.onclick = (e) => {
        let id = e.target.getAttribute('data-id').trim()
        let url = `/API/post/${id}`
        fetch(url, { method: 'delete', body: {} })
            .then(res => res.json())
            .then(res => {
                showSuccessToast("Post deleted!")
                document.querySelector('#modal-delete-post').checked = false
                deletePostFromView()
            })
            .catch(error => {
                console.log(error)
            })
    }
    function deletePostFromView() {
        let post = postClicked.parentNode.parentNode.parentNode.parentNode.parentNode
        post.innerHTML = ''
        post.style.display = 'none'
    }
}

function eventEditPost() {
    let postClicked = ''
    let contentBox = document.getElementById('postContentEdit')
    let idBox = document.getElementById('postIdEdit')
    let youtubeBox = document.querySelector('.youtube-link-edit-post')
    let imageBox = document.querySelector('.postImageEdit')
    window.addEventListener('click', (e) => {
        ///API/post/:id   post
        if (e.target.classList.contains('labelEditPost')) {
            idBox.value = e.target.getAttribute('data-id')
            contentBox.innerHTML = e.target.getAttribute('data-content')
            youtubeBox.value = e.target.getAttribute('data-youtube')
            if (e.target.getAttribute('data-img-link')) {
                imageBox.src = e.target.getAttribute('data-img-link')
                imageBox.parentNode.style.display = "block"
            } else {
                imageBox.src = ""
                imageBox.parentNode.style.display = "none"
            }
        }
    })
    let imgInput = document.getElementById('post-img-edit-post')
    imgInput.addEventListener('change', (e) => {
        alert("run")
        let preview = document.querySelector('.postImageEdit')
        preview.setAttribute("src", window.URL.createObjectURL(e.target.files[0]))
    })
    // function deletePostFromView() {
    //     let post = postClicked.parentNode.parentNode.parentNode.parentNode.parentNode
    //     post.innerHTML = ''
    //     post.style.display = 'none'
    // }
}
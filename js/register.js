function registerUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const userCaptcha =
        document.getElementById("captchaInput").value;

    if (userCaptcha !== captcha) {

        showNotification(
            "error",
            "Captcha Salah",
            "Silakan coba lagi"
        );

        generateCaptcha();
        return;
    }

    if (username.length < 5) {

        showNotification(
            "warning",
            "Username Salah",
            "Minimal 5 karakter"
        );

        return;
    }

    if (password.length < 6) {

        showNotification(
            "warning",
            "Password Lemah",
            "Minimal 6 karakter"
        );

        return;
    }

    if (password !== confirmPassword) {

        showNotification(
            "error",
            "Password Tidak Sama",
            "Periksa kembali password"
        );

        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const exist =
        users.find(u => u.username === username);

    if (exist) {

        showNotification(
            "error",
            "Username Digunakan",
            "Gunakan username lain"
        );

        return;
    }

    users.push({
        username,
        password,
        role: "user"
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    showNotification(
        "success",
        "Registrasi Berhasil",
        "Akun berhasil dibuat"
    );

    setTimeout(() => {

        const container =
            document.querySelector(
                ".container"
            );

        container.style.animation =
            "pageExit .6s ease forwards";

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 550);

    }, 1800);

}
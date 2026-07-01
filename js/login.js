const togglePassword =
    document.getElementById(
        "togglePassword"
    );

togglePassword.addEventListener(
    "click",
    () => {

        const passwordInput =
            document.getElementById(
                "password"
            );

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }

    }
);

function login() {

    // ======================
    // SECURITY CHECK
    // CEK APAKAH AKUN TERKUNCI
    // ======================

    if (isLocked()) {

        showNotification(
            "error",
            "Akun Dikunci",
            `Coba lagi dalam ${getRemainingLockTime()} detik`
        );

        return;
    }

    const username =
        document.getElementById(
            "username"
        ).value.trim();

    const password =
        document.getElementById(
            "password"
        ).value.trim();

    const userCaptcha =
        document.getElementById(
            "captchaInput"
        ).value.trim();

    // ======================
    // VALIDASI INPUT KOSONG
    // ======================

    if (username === "" || password === "") {

        showNotification(
            "warning",
            "Input Kosong",
            "Username dan password wajib diisi"
        );

        return;
    }

    // ======================
    // CAPTCHA VALIDATION
    // ======================

    if (userCaptcha !== captcha) {

        showNotification(
            "warning",
            "Captcha Salah",
            "Silakan coba lagi"
        );

        generateCaptcha();

        return;
    }

    // ======================
    // CEK USER
    // ======================

    const user =
        users.find(
            u =>
                u.username === username &&
                u.password === password
        );

    // ======================
    // LOGIN BERHASIL
    // ======================

    if (user) {

        sessionStorage.setItem(
            "user",
            user.username
        );

        sessionStorage.setItem(
            "role",
            user.role
        );

        // reset counter brute force
        resetAttempts();

        // audit log
        addAuditLog(
            `LOGIN SUCCESS | Username: ${username}`
        );

        showNotification(
            "success",
            "Login Berhasil",
            "Selamat datang di YouthCommittee"
        );

        setTimeout(() => {

            document.querySelector(
                ".container"
            ).style.animation =
                "dashboardTransitionOut .7s ease forwards";

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 700);

        }, 1800);

    }

    // ======================
    // LOGIN GAGAL
    // ======================

    else {

        increaseAttempts();

        const attempts =
            getLoginAttempts();

        addAuditLog(
            `LOGIN FAILED | Username: ${username}`
        );

        if (attempts >= 3) {

            showNotification(
                "error",
                "Akun Dikunci",
                "3x gagal login. Tunggu 30 detik"
            );

        } else {

            showNotification(
                "error",
                "Login Gagal",
                `Username/password salah (${attempts}/3)`
            );

        }

        generateCaptcha();

    }

}
function goRegister() {

    const container =
        document.querySelector(
            ".container"
        );

    container.style.animation =
        "pageExit .6s ease forwards";

    setTimeout(() => {

        window.location.href =
            "register.html";

    }, 550);

}
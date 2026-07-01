let captcha = "";

function generateCaptcha() {

    captcha =
        Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase();

    document.getElementById(
        "captchaText"
    ).innerHTML = captcha;

}

generateCaptcha();
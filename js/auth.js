if (
    !sessionStorage.getItem("role")
) {
    window.location.href =
        "login.html";
}

// ======================
// SESSION TIMEOUT
// ======================

let idleTimer;

function resetIdleTimer() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {

        showNotification(
            "warning",
            "Session Timeout",
            "Sesi berakhir. Anda logout otomatis."
        );

        addAuditLog(
            "AUTO LOGOUT | Session Timeout"
        );

        setTimeout(() => {

            sessionStorage.clear();

            window.location.href =
                "login.html";

       }, 2000);

    }, 20000);
}

[
    "mousemove",
    "keypress",
    "click",
    "scroll"
].forEach(event => {
    document.addEventListener(
        event,
        resetIdleTimer
    );
});

resetIdleTimer();
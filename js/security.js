const MAX_ATTEMPTS = 3;
const LOCK_TIME = 30000;

function getLoginAttempts() {
    return parseInt(localStorage.getItem("loginAttempts")) || 0;
}

function increaseAttempts() {
    let attempts = getLoginAttempts() + 1;
    localStorage.setItem("loginAttempts", attempts);

    if (attempts >= MAX_ATTEMPTS) {
        localStorage.setItem(
            "lockUntil",
            Date.now() + LOCK_TIME
        );
    }
}

function resetAttempts() {
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("lockUntil");
}

function isLocked() {
    const lockUntil =
        parseInt(localStorage.getItem("lockUntil")) || 0;

    return Date.now() < lockUntil;
}

function getRemainingLockTime() {
    const lockUntil =
        parseInt(localStorage.getItem("lockUntil")) || 0;

    return Math.ceil(
        (lockUntil - Date.now()) / 1000
    );
}
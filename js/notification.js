function showNotification(type, title, message) {

    const container =
        document.getElementById(
            "notificationContainer"
        );

    const notif =
        document.createElement("div");

    notif.className =
        `custom-notif ${type}`;

    let icon = "";

    if (type === "success") {
        icon = "✅";
    }

    if (type === "error") {
        icon = "❌";
    }

    if (type === "warning") {
        icon = "⚠️";
    }

    notif.innerHTML = `
        <div class="notif-icon">
            ${icon}
        </div>

        <div class="notif-text">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>

        <div class="notif-progress"></div>
    `;

    container.appendChild(notif);

    setTimeout(() => {

        notif.style.animation =
            "slideOut .5s ease forwards";

        setTimeout(() => {
            notif.remove();
        }, 500);

    }, 3000);
}
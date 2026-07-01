let devtoolsOpen = false;

setInterval(() => {

    const widthDiff =
        window.outerWidth - window.innerWidth;

    const heightDiff =
        window.outerHeight - window.innerHeight;

    if (
        widthDiff > 160 ||
        heightDiff > 160
    ) {

        if (!devtoolsOpen) {

            devtoolsOpen = true;

            addAuditLog(
                "SECURITY ALERT | DevTools Opened"
            );

            showNotification(
                "warning",
                "Security Alert",
                "Developer tools terdeteksi"
            );
        }

    } else {
        devtoolsOpen = false;
    }

}, 1000);
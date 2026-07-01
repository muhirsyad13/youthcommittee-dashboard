function addAuditLog(activity) {

    const logs =
        JSON.parse(
            localStorage.getItem("auditLogs")
        ) || [];

    const timestamp =
        new Date().toLocaleString("id-ID");

    logs.push({
        activity,
        timestamp
    });

    localStorage.setItem(
        "auditLogs",
        JSON.stringify(logs)
    );
}

function getAuditLogs() {
    return JSON.parse(
        localStorage.getItem("auditLogs")
    ) || [];
}
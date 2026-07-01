
const role = sessionStorage.getItem("role");
const user =
    sessionStorage.getItem(
        "user"
    );

document.getElementById("welcomeText").innerHTML =
    `Halo, ${user} 👋`;

if (role !== "admin") {
    document.getElementById("menuWarga").style.display = "none";
}

// ======================
// HITUNG DATA OTOMATIS
// ======================
let residents =
    JSON.parse(
        localStorage.getItem("residents")
    ) || [];
const totalWarga = residents.length;

const totalPria =
    residents.filter(
        r => r.jk === "Laki-Laki"
    ).length;

const totalWanita =
    residents.filter(
        r => r.jk === "Perempuan"
    ).length;

const totalKK =
    residents.filter(
        r => r.status === "Kepala Keluarga"
    ).length;

animateCounter("totalWarga", totalWarga);
animateCounter("totalPria", totalPria);
animateCounter("totalWanita", totalWanita);
animateCounter("totalKK", totalKK);

function animateCounter(id, target) {

    let count = 0;

    const interval =
        setInterval(() => {

            count++;

            document.getElementById(id).innerHTML = count;

            if (count >= target) {

                clearInterval(interval);

            }

        }, 20);

}

// ======================
// CHART GENDER
// ======================

new Chart(
    document.getElementById("genderChart"),
    {
        type: "doughnut",

        data: {
            labels: [
                "Laki-Laki",
                "Perempuan"
            ],

            datasets: [{
                data: [
                    totalPria,
                    totalWanita
                ],

                backgroundColor: [
                    "#123A8C",
                    "#ec4899"
                ],

                borderWidth: 0
            }]
        },

        options: {
            responsive: true,
            cutout: "72%",

            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    }
);
// ======================
// STATUS KELUARGA
// ======================

const kepalaKeluarga =
    residents.filter(
        r => r.status === "Kepala Keluarga"
    ).length;

const istri =
    residents.filter(
        r => r.status === "Istri"
    ).length;

const anak =
    residents.filter(
        r => r.status === "Anak"
    ).length;

new Chart(
    document.getElementById("statusChart"),
    {
        type: "bar",

        data: {
            labels: [
                "Kepala Keluarga",
                "Istri",
                "Anak"
            ],

            datasets: [{
                data: [
                    kepalaKeluarga,
                    istri,
                    anak
                ],

                backgroundColor: [
                    "#10b981",
                    "#ec4899",
                    "#f59e0b"
                ],

                borderRadius: 15
            }]
        },

        options: {
            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);
const alamatCount = {};

residents.forEach(r => {

    alamatCount[r.alamat] =
        (alamatCount[r.alamat] || 0) + 1;

});

new Chart(
    document.getElementById("alamatChart"),
    {
        type: "bar",

        data: {
            labels: Object.keys(alamatCount),

            datasets: [{
                label: "Jumlah Warga",
                data: Object.values(alamatCount),
                backgroundColor: "#123A8C",
                borderRadius: 12
            }]
        },

        options: {
            indexAxis: "y",

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    }
);

function logout() {

    Swal.fire({

        title: "Logout ?",

        icon: "question",

        showCancelButton: true

    }).then((result) => {

        if (result.isConfirmed) {

            sessionStorage.clear();

            window.location.href = "login.html";

        }

    });

}

const ADMIN_SECURITY_PIN = "7788";

function verifyAdminAccess() {

    const role =
        sessionStorage.getItem("role");

    if (role !== "admin") {

        showNotification(
            "error",
            "Akses Ditolak",
            "Hanya admin yang dapat membuka Data Warga"
        );

        addAuditLog(
            "ACCESS DENIED | Non-admin tried opening Data Warga"
        );

        return;
    }

    const captchaCode =
        Math.floor(
            1000 + Math.random() * 9000
        );

    Swal.fire({

        title: "Verifikasi Admin",

        html: `
    <p style="
        margin-bottom:20px;
        color:rgba(255,255,255,.8);
        font-size:14px;
    ">
        Verifikasi tambahan diperlukan untuk membuka Data Warga
    </p>

    <input
        id="adminPin"
        class="swal2-input"
        placeholder="Security PIN">

    <input
        id="adminCaptcha"
        class="swal2-input"
        placeholder="Masukkan Captcha">

    <div style="
        margin-top:18px;
        padding:14px;
        border-radius:16px;
        background:rgba(255,255,255,.12);
        color:white;
        font-size:24px;
        font-weight:700;
        letter-spacing:4px;
    ">
        ${captchaCode}
    </div>
`,

        confirmButtonText: "Verifikasi",
        cancelButtonText: "Batal",
        showCancelButton: true,

        preConfirm: () => {

            const pin =
                document.getElementById(
                    "adminPin"
                ).value.trim();

            const captchaInput =
                document.getElementById(
                    "adminCaptcha"
                ).value.trim();

            if (pin === "") {
                Swal.showValidationMessage(
                    "PIN wajib diisi"
                );
                return false;
            }

            if (pin !== ADMIN_SECURITY_PIN) {

                Swal.showValidationMessage("❌ Security PIN salah"
                );

                return false;
            }

            if (
                captchaInput != captchaCode
            ) {

                Swal.showValidationMessage("❌ Captcha salah");

                return false;
            }

            return true;
        }

    }).then((result) => {

        if (result.isConfirmed) {

            addAuditLog(
                "ADMIN ACCESS SUCCESS | Data Warga"
            );

            Swal.fire({
                icon: "success",
                title: "Akses Diberikan",
                html: `
        Verifikasi admin berhasil.<br>
        Mengalihkan ke <b>Data Warga</b>
    `,
                timer: 1800,
                showConfirmButton: false
            });

            setTimeout(() => {

                window.location.href =
                    "warga.html";

            }, 1500);
        }

    });

}
function scrollToStats() {
    document.querySelector(".charts-grid")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function showPage(pageId, clickedMenu) {
    document.querySelectorAll(".page-section")
        .forEach(page => {
            page.classList.add("hidden");
        });

    document.getElementById(pageId)
        .classList.remove("hidden");

    document.querySelectorAll(".sidebar li")
        .forEach(menu => {
            menu.classList.remove("active");
        });

    if (clickedMenu) {
        clickedMenu.classList.add("active");
    }
}
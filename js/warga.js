if (
    sessionStorage.getItem("role")
    !== "admin"
) {
    window.location.href =
        "dashboard.html";
}

let residents =
    JSON.parse(
        localStorage.getItem("residents")
    ) || [];

let adminCaptcha =
    Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

document.getElementById(
    "adminCaptcha"
).innerHTML =
    adminCaptcha;

/* =========================
ADMIN VERIFY
========================= */

function verifyAdmin() {

    const input =
        document.getElementById(
            "adminInput"
        ).value;

    if (input === adminCaptcha) {

        document.getElementById(
            "captchaContainer"
        ).style.display = "none";

        document.getElementById(
            "mainContent"
        ).style.display = "block";

        Swal.fire({
            icon: "success",
            title: "Akses Diberikan",
            html: `
        <div style="font-size:15px">
            Verifikasi admin berhasil.<br>
            Selamat datang di panel <b>Data Warga</b>
        </div>
    `,
            timer: 1800,
            showConfirmButton: false
        });

        loadTable();
        updateStats();

    } else {

        Swal.fire({
            icon: "error",
            title: "Verifikasi Gagal",
            html: `
        <div style="font-size:15px">
            Kode captcha yang Anda masukkan salah
        </div>
    `,
            confirmButtonText: "Coba Lagi"
        });

    }
}

/* =========================
ADD RESIDENT
========================= */

function addResident() {

    const nama =
        document.getElementById(
            "nama"
        ).value;

    const usia =
        document.getElementById(
            "usia"
        ).value;

    const jk =
        document.getElementById(
            "jk"
        ).value;

    const alamat =
        document.getElementById(
            "alamat"
        ).value;

    const status =
        document.getElementById(
            "status"
        ).value;

    if (
        !nama || !usia ||
        !jk || !alamat || !status
    ) {
        Swal.fire({
            icon: "warning",
            title: "Data belum lengkap"
        });
        return;
    }

    residents.push({
        no: residents.length + 1,
        nama,
        usia,
        jk,
        alamat,
        status
    });

    localStorage.setItem(
        "residents",
        JSON.stringify(residents)
    );

    loadTable();
    updateStats();

    Swal.fire({
        icon: "success",
        title: "Reset Berhasil",
        html: `
        <div style="font-size:15px">
            Semua data warga berhasil dihapus
        </div>
    `,
        timer: 1800,
        showConfirmButton: false
    });
}

/* =========================
LOAD TABLE
========================= */

function loadTable() {

    const tbody =
        document.getElementById("tbody");

    let html = "";

    residents.forEach((r, index) => {

        html += `
<tr>
<td>${index + 1}</td>
<td>${r.nama}</td>
<td>${r.usia}</td>
<td>${r.jk}</td>
<td>${r.alamat}</td>

<td>
    <span class="status-badge ${getStatusClass(r.status)}">
        ${r.status}
    </span>
</td>

<td>
<button class="delete-btn"
onclick="deleteResident(${index})">
Hapus
</button>
</td>
</tr>
`;
    });

    tbody.innerHTML = html;
}

/* =========================
DELETE
========================= */

function deleteResident(index) {

    Swal.fire({
        title: "Hapus Data?",
        html: `
            <div style="font-size:15px">
                Data warga ini akan dihapus permanen
            </div>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal"
    }).then((result) => {

        if (result.isConfirmed) {

            residents.splice(index, 1);

            localStorage.setItem(
                "residents",
                JSON.stringify(residents)
            );

            loadTable();
            updateStats();

            Swal.fire({
                icon: "success",
                title: "Data Terhapus",
                text: "Data warga berhasil dihapus",
                timer: 1500,
                showConfirmButton: false
            });
        }

    });
}

/* =========================
STATS
========================= */

function updateStats() {

    document.getElementById(
        "totalWarga"
    ).innerHTML =
        residents.length;

    document.getElementById(
        "pria"
    ).innerHTML =
        residents.filter(
            r => r.jk === "Laki-Laki"
        ).length;

    document.getElementById(
        "wanita"
    ).innerHTML =
        residents.filter(
            r => r.jk === "Perempuan"
        ).length;

    document.getElementById(
        "kk"
    ).innerHTML =
        residents.filter(
            r => r.status === "Kepala Keluarga"
        ).length;
}

/* =========================
FILTER
========================= */

document
    .getElementById(
        "filterStatus"
    )
    .addEventListener(
        "change",
        filterTable
    );

document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "keyup",
        filterTable
    );

function getStatusClass(status) {

    if (status === "Kepala Keluarga") {
        return "status-kk";
    }

    if (status === "Istri") {
        return "status-istri";
    }

    return "status-anak";
}

function filterTable() {

    const keyword =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

    const status =
        document.getElementById(
            "filterStatus"
        ).value;

    const rows =
        document.querySelectorAll(
            "#tbody tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        const rowStatus =
            row.children[5].innerText;

        const cocokNama =
            text.includes(keyword);

        const cocokStatus =
            status === "" ||
            rowStatus === status;

        row.style.display =
            (cocokNama && cocokStatus)
                ? "" : "none";
    });
}
document
    .getElementById("excelFile")
    .addEventListener(
        "change",
        importExcel
    );

function importExcel(event) {

    console.log("IMPORT BERJALAN");

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        const data =
            new Uint8Array(
                e.target.result
            );

        const workbook =
            XLSX.read(data, {
                type: "array"
            });

        const sheetName =
            workbook.SheetNames[0];

        const sheet =
            workbook.Sheets[sheetName];

        const json =
            XLSX.utils.sheet_to_json(sheet);
        console.log("HEADER EXCEL:");
        console.log(Object.keys(json[0]));

        console.log(json);

        const importedResidents = json.map(row => {

            const keys = Object.keys(row);

            const genderKey = keys.find(
                key => key.includes("JENIS")
            );

            const statusKey = keys.find(
                key => key.includes("STATUS")
            );

            return {
                nama:
                    (row["NAMA LENGKAP"] || "").trim(),

                usia:
                    row["USIA"] || "",

                jk:
                    normalizeGender(
                        row[genderKey]
                    ),

                alamat:
                    (row["ALAMAT"] || "").trim(),

                status:
                    (row[statusKey] || "").trim()
            };
        });
        residents = importedResidents;

        localStorage.setItem(
            "residents",
            JSON.stringify(residents)
        );

        loadTable();
        updateStats();

        Swal.fire({
            icon: "success",
            title: "Import Berhasil",
            text: `${residents.length} data warga dimuat`
        });

    };

    reader.readAsArrayBuffer(file);
}
function normalizeGender(value) {

    if (!value) return "";

    const gender =
        value.toString()
            .trim()
            .toLowerCase();

    if (
        gender === "laki-laki" ||
        gender === "laki laki" ||
        gender === "l"
    ) {
        return "Laki-Laki";
    }

    if (
        gender === "perempuan" ||
        gender === "p"
    ) {
        return "Perempuan";
    }

    return value;
}
console.log("DATA RESIDENT:");
console.log(residents);
function resetResidents() {

    Swal.fire({
        title: "Hapus semua data warga?",
        text: "Data yang sudah diimport akan dihapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal"
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.removeItem("residents");
            residents = [];

            loadTable();
            updateStats();

            Swal.fire({
                icon: "success",
                title: "Data berhasil direset"
            });
        }

    });

}

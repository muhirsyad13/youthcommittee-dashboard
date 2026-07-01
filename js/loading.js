let progress = 0;

const progressBar =
    document.getElementById(
        "progressBar"
    );

const percent =
    document.getElementById(
        "percent"
    );

const interval =
    setInterval(() => {

        progress++;

        progressBar.style.width =
            progress + "%";

        percent.innerHTML =
            progress + "%";

        if (progress === 25) {

            document.getElementById(
                "step1"
            ).innerHTML =
                "✅ Memuat Dashboard";

        }

        if (progress === 50) {

            document.getElementById(
                "step2"
            ).innerHTML =
                "✅ Memuat Data Warga";

        }

        if (progress === 75) {

            document.getElementById(
                "step3"
            ).innerHTML =
                "✅ Memuat Hak Akses";

        }

        if (progress === 100) {

            document.getElementById(
                "step4"
            ).innerHTML =
                "✅ Memuat Sistem Keamanan";

            clearInterval(interval);

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1000);

        }

    }, 30);
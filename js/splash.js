setTimeout(() => {

    document.body.classList.add(
        "fade-out"
    );

    setTimeout(() => {

        window.location.href =
            "loading.html";

    }, 800);

}, 3000);
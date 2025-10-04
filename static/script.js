document.addEventListener("DOMContentLoaded", () => {
    const boites = document.querySelectorAll(".boite");

    boites.forEach(boite => {
        if (boite.textContent.trim().length > 20) {
            boite.style.fontSize = "14px";
        }

        if (boite.textContent.trim().length > 40) {
            boite.style.fontSize = "12px";
        }
        boite.addEventListener("click", () => {
            const piece = boite.dataset.piece;
            const total = boite.dataset.total;
            const achete = boite.dataset.achete;
            const acheteurs = boite.dataset.acheteurs;

            alert(
                `${piece}\n` +
                `Progression: ${achete}/${total}\n` +
                `Acheteurs: ${acheteurs || "aucun"}`
            );
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const boites = document.querySelectorAll(".boite");

    boites.forEach(boite => {
        // adaptation de la taille de police dans les boites
        if (boite.textContent.trim().length > 20) {
            boite.style.fontSize = "14px";
        }

        if (boite.textContent.trim().length > 40) {
            boite.style.fontSize = "12px";
        }

        // Gestion des pièces en transparence et liens avec boites

        const pieceType = boite.dataset.svgtype;
        const pieces = document.querySelectorAll(`[data-type="${pieceType}"]`);

        if (pieces.length > 0) {

            // Survol de la boîte
            boite.addEventListener("mouseenter", () => {
                boite.classList.add("highlight");
                pieces.forEach(p => {
                    p.classList.add("highlight")
                    // Amène l'élément en haut de la pile
                    p.parentNode.appendChild(p);
                });

            });
            boite.addEventListener("mouseleave", () => {
                boite.classList.remove("highlight");
                pieces.forEach(p => p.classList.remove("highlight"));
            });

            // Survol des pièces (chaque élément du SVG)
            pieces.forEach(piece => {
                piece.addEventListener("mouseenter", () => {
                    boite.classList.add("highlight");
                    pieces.forEach(p => p.classList.add("highlight"));
                });
                piece.addEventListener("mouseleave", () => {
                    boite.classList.remove("highlight");
                    pieces.forEach(p => p.classList.remove("highlight"));
                });
            });
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

document.addEventListener("DOMContentLoaded", () => {
    const boites = document.querySelectorAll(".boite");
    let selectedBoite = null; // boîte actuellement sélectionnée
    let selectedPieces = [];

    boites.forEach(boite => {
        // Ajuste la taille de police selon la longueur du texte
        const len = boite.textContent.trim().length;
        if (len > 40) boite.style.fontSize = "12px";
        else if (len > 20) boite.style.fontSize = "14px";

        const pieceType = boite.dataset.svgtype;
        const pieces = document.querySelectorAll(`[data-type="${pieceType}"]`);

        // ---- Survol ----
        if (pieces.length > 0) {
            boite.addEventListener("mouseenter", () => {
                if (!boite.classList.contains("highlight-selected"))
                    highlightPiece(boite, pieces);
            });
            boite.addEventListener("mouseleave", () => {
                unlightPiece(boite, pieces);
            });

            pieces.forEach(piece => {
                piece.addEventListener("mouseenter", () => {
                    if (!boite.classList.contains("highlight-selected"))
                        highlightPiece(boite, pieces);
                });
                piece.addEventListener("mouseleave", () => {
                    unlightPiece(boite, pieces);
                });
            });
        }

        // ---- Clic ----
        boite.addEventListener("click", (e) => {
            e.stopPropagation();

            // Supprime la sélection précédente
            if (selectedBoite && selectedBoite !== boite) {
                unselectPiece(selectedBoite, selectedPieces);
            }

            unlightPiece(boite, pieces)

            // Sélectionne la nouvelle boîte
            selectedBoite = boite;
            selectedPieces = pieces;
            selectPiece(boite, pieces);

            // Affiche les infos
            const infoBox = document.getElementById("piece-info");
            const infoTitle = document.getElementById("piece-info-title");
            const infoProgress = document.getElementById("piece-info-progress");
            const infoAcheteurs = document.getElementById("piece-info-acheteurs");
            const imageElement = document.getElementById("piece-info-image");
            const imageContainer = document.getElementById("piece-info-image-container");

            const piece = boite.dataset.piece;
            const total = boite.dataset.total;
            const achete = boite.dataset.achete;
            const acheteurs = boite.dataset.acheteurs;
            const image = boite.dataset.image;

            infoTitle.textContent = piece;
            infoProgress.textContent = `${achete}/${total}`;
            infoAcheteurs.textContent = acheteurs || "aucun";

            if (image) {
                imageElement.src = image;
                imageContainer.style.display = "block";
            } else {
                imageElement.src = "";
                imageContainer.style.display = "none";
            }

            infoBox.style.display = "block";
        });
    });

    // ---- Fermeture du bloc d’infos ----
    const infoBox = document.getElementById("piece-info");
    const infoClose = document.getElementById("piece-info-close");

    document.addEventListener("click", (e) => {
        // Si clic sur le bouton × ou en dehors
        if (e.target === infoClose || (!infoBox.contains(e.target) && !e.target.classList.contains("boite"))) {
            infoBox.style.display = "none";

            // Supprime la sélection persistante
            if (selectedBoite) {
                unselectPiece(selectedBoite, selectedPieces);
                selectedBoite = null;
                selectedPieces = [];
            }
        }
    });
});

// ---- Fonctions highlight / unhighlight / select ----
function highlightPiece(boite, pieces) {
    boite.classList.add("highlight");
    pieces.forEach(p => {
        p.classList.add("highlight");
        p.parentNode.appendChild(p);
    });
}

function unlightPiece(boite, pieces) {
    boite.classList.remove("highlight");
    pieces.forEach(p => p.classList.remove("highlight"));
}

function selectPiece(boite, pieces) {
    boite.classList.add("highlight-selected");
    pieces.forEach(p => {
        p.classList.add("highlight-selected");
        p.parentNode.appendChild(p);
    });
}

function unselectPiece(boite, pieces) {
    boite.classList.remove("highlight-selected");
    pieces.forEach(p => p.classList.remove("highlight-selected"));
}

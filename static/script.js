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
                highlightPiece(boite, pieces);

            });
            boite.addEventListener("mouseleave", () => {
                unlightPiece(boite,pieces);
            });

            // Survol des pièces (chaque élément du SVG)
            pieces.forEach(piece => {
                piece.addEventListener("mouseenter", () => {
                    highlightPiece(boite, pieces)
                });
                piece.addEventListener("mouseleave", () => {
                    unlightPiece(boite,pieces);
                });
            });
        }
        
        boite.addEventListener("click", () => {
            

            highlightPiece(boite, pieces);

            // Récupère les éléments du bloc d’infos
            const infoBox = document.getElementById("piece-info");
            const infoTitle = document.getElementById("piece-info-title");
            const infoProgress = document.getElementById("piece-info-progress");
            const infoAcheteurs = document.getElementById("piece-info-acheteurs");
            const imageElement = document.getElementById("piece-info-image");
            const imageContainer = document.getElementById("piece-info-image-container");
            

            // Injection des données
            const piece = boite.dataset.piece;
            const total = boite.dataset.total;
            const achete = boite.dataset.achete;
            const acheteurs = boite.dataset.acheteurs;
            const image = boite.dataset.image;

            infoTitle.textContent = piece;
            infoProgress.textContent = `${achete}/${total}`;
            infoAcheteurs.textContent = acheteurs || "aucun";
            
            
            // Gestion de l'image
            if (image) {
                imageElement.src = image;
                imageContainer.style.display = "block";
            } else {
                imageElement.src = "";
                imageContainer.style.display = "none";
            }


            // Affiche le bloc d’infos
            infoBox.style.display = "block";

        });
    });
});


// Fermeture du bloc d’infos
const infoBox = document.getElementById("piece-info");
const infoClose = document.getElementById("piece-info-close");

document.addEventListener("click", (e) => {
    // Si on clique sur le bouton × ou à l’extérieur du bloc
    if (e.target === infoClose || (!infoBox.contains(e.target) && !e.target.classList.contains("boite"))) {
        infoBox.style.display = "none";
    }
});

function highlightPiece(boite, pieces){
    boite.classList.add("highlight");
    console.log("Highlight "+boite.dataset.piece)
    if (pieces.length > 0) {
        pieces.forEach(p => {
            p.classList.add("highlight")
            // Amène l'élément en haut de la pile
            p.parentNode.appendChild(p);
        });
    }
}

function unlightPiece(boite, pieces){
    boite.classList.remove("highlight");
    pieces.forEach(p => p.classList.remove("highlight"));
}
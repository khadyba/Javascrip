// import { Chart } from 'chart.js';

export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {
 
        const id = event.target.dataset.id;
        const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
        const avis = await reponse.json();
        window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))
        const pieceElement = event.target.parentElement;
        afficherAvis(pieceElement, avis)
     });
 
    }
 }
 
 export function afficherAvis(pieceElement, avis){
    const avisElement = document.createElement("p");
        for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
        }
        pieceElement.appendChild(avisElement);
 }

 export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const avis = {
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur: event.target.querySelector("[name=utilisateur]").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    });
    
 }

 export async function afficherGraphiqueAvis() {
    try {
        // Récupération des avis
        const response = await fetch("http://localhost:8081/avis");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des avis.");
        }
        const avis = await response.json();
        
        // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
        const nb_commentaires = [0, 0, 0, 0, 0];
        for (let commentaire of avis) {
            nb_commentaires[commentaire.nbEtoiles - 1]++;
        }
        
        // Légende qui s'affichera sur la gauche à côté de la barre horizontale
        const labels = ["5", "4", "3", "2", "1"];
        
        // Données et personnalisation du graphique
        const data = {
            labels: labels,
            datasets: [{
                label: "Étoiles attribuées",
                data: [...nb_commentaires].reverse(), // Copie pour éviter de modifier l'original
                backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
            }],
        };
        
        // Configuration du graphique
        const config = {
            type: "bar",
            data: data,
            options: {
                indexAxis: "y", // Affichage horizontal
            },
        };
        
        // Rendu du graphique dans l'élément canvas
        const graphiqueAvis = new Chart(
            document.querySelector("#graphique-avis"),
            config,
        );

        // Récupération des pièces depuis le localStorage
        const piecesJSON = window.localStorage.getItem("pieces");
        const pieces = piecesJSON ? JSON.parse(piecesJSON) : [];

        // Calcul du nombre de commentaires pour les pièces disponibles et non disponibles
        let nbCommentairesDispo = 0;
        let nbCommentairesNonDispo = 0;
        
        for (let avisItem of avis) {
            const piece = pieces.find(p => p.id === avisItem.pieceId);

            if (piece) {
                if (piece.disponibilite) {
                    nbCommentairesDispo++;
                } else {
                    nbCommentairesNonDispo++;
                }
            }
        }

        // Légende pour les commentaires disponibles/non disponibles
        const labelsDispo = ["Disponibles", "Non dispo."];

        // Données et personnalisation du graphique
        const dataDispo = {
            labels: labelsDispo,
            datasets: [{
                label: "Nombre de commentaires",
                data: [nbCommentairesDispo, nbCommentairesNonDispo],
                backgroundColor: "rgba(0, 230, 255, 1)", // turquoise
            }],
        };

        // Configuration du graphique
        const configDispo = {
            type: "bar",
            data: dataDispo,
        };

        // Rendu du graphique dans l'élément canvas
        new Chart(
            document.querySelector("#graphique-dispo"),
            configDispo,
        );

    } catch (error) {
        console.error("Erreur lors de l'affichage des graphiques : ", error);
    }
}



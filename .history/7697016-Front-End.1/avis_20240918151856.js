export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {

 
      const id = event.target.dataset.id;
    //   on stok la reponse dans une constante 
      const  reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
    //   nous reconstituons  les donner en memoir   grace a la methode json 
      const avis = await reponse.json();
      window.localStorage.setItem(`'avis-piece'`)
    //   on les ajout au dom en recupérent l'element parent 
      const pieceElement = event.target.parentElement;
    //   nous créeons l'element p 
      const avisElement = document.createElement("p");
    //   nous remplissons la balise html p en parcourant les avis et en ajoutant le nom de l'utilisateur et son commentaire
      for (let i = 0; i < avis.length; i++) {
         avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
      }
    //   nous ratachons l'element p au parent récuperer précedement 
      pieceElement.appendChild(avisElement);
 
     });
 
    }
 
 }

 export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();  
    // Création de l’objet du nouvel avis.
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value),
            utilisateur: event.target.querySelector("[name=utilisateur").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
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
 
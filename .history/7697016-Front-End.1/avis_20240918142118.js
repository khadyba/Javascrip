export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {

 
      const id = event.target.dataset.id;
    //   on stok la reponse dans une constante 
      const  reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
    //   nous reconstituons  les donner en memoir   grace a la methode json 
      const avis = await reponse.json();
    //   on les ajout
      const pieceElement = event.target.parentElement;
      const avisElement = document.createElement("p");
      for (let i = 0; i < avis.length; i++) {
         avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
      }
      pieceElement.appendChild(avisElement);
 
     });
 
    }
 
 }

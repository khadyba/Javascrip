// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();






for (let i = 0; i < pieces.length; i++) {
    // Création des balises 
    const article = pieces[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = pieces[i].image;
    // Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";


    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";

    const stockElement = document.createElement("p");
    stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
 
    
    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie...

    pieceElement.appendChild(nomElement);

    pieceElement.appendChild(prixElement);

    pieceElement.appendChild(categorieElement);

    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

    }


    // on recupére l'id du bouton pour le triage
    const boutonTrier = document.querySelector(".btn-trier");
    //   ecoute le clic du boutton 
    boutonTrier.addEventListener("click", function () {
     // on crée une copie de la liste avec Array.from
    const pieceOrdonner = Array.from(pieces);
    // nous appelons la fonction sort qui prend en parametre les deux valeur 
    // a comparer et retourne le calcul de diference de prix
    pieceOrdonner.sort(function (a, b){
        return a.prix - b.prix;

    });
    console.log(pieceOrdonner)
});
// on recupére le bouton pour filtrer 
const boutonFiltrer = document.querySelector(".btn-filtrer");
// on ecoute le clic du boutton
boutonFiltrer.addEventListener("click", function () {
    // on utilise methode  filter avec une focntion anonyme qui retourne une valeur booleen
    // selon la conditions piéce.prix <= 35
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees)

});

// filtrer les pieces qui on une descriptions
const  filtdescription = document.querySelector(".btn-filtdescription");
filtdescription.addEventListener("click", function () {

    const piecesFiltre = pieces.filter(function (piece) {
        return piece.descriptions ;
    });
    console.log(piecesFiltre)
})

// trier les piéce par odre decroissant 
const boutonDesc = document.querySelector(".btn-desc");
boutonDesc.addEventListener("click", function() {
    const pieceOrdonner = Array.from(pieces);
    // nous appelons la fonction sort qui prend en parametre les deux valeur 
    // a comparer et retourne le calcul de diference de prix
    pieceOrdonner.sort(function (a, b){
        return b.prix - a.prix;

    });
    console.log(pieceOrdonner)    

})

const noms = pieces.map(piece => piece.nom);
   for ( let i = pieces.length -1 ; i >= 0; i--) {
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
   }
   //Création de la liste
   const abordablesElements = document.createElement('ul');
   //Ajout de chaque nom à la liste
   for(let i=0; i < noms.length ; i++){
       const nomElement = document.createElement('li');
       //    le remplissage
       nomElement.innerText = noms[i];
    //    lajout au parent
       abordablesElements.appendChild(nomElement)
    }
    // Ajout de l'en-tête puis de la liste au bloc résultats filtres
    document.querySelector('.abordables')
    .appendChild(abordablesElements)

// 
    const nomDisponibles = pieces.map(piece => piece.nom)
    const prixDisponibles = pieces.map(piece => piece.prix)


// on parcour la liste des piéces du fin  au debut 
 for ( let i = pieces.length -1 ; i >= 0; i--) {
    if(pieces[i].disponiblité === false){
        nomDisponibles.splice(i,1)
        prixDisponibles.splice(i,1)
    }
   }
//    on cree la liste 
const disponibiliteElement = document.createElement('ul');
for( left i=0 ; i < nomDisponibles.length ; i++){
    
}


const inputsCouleur = document.querySelectorAll(".inp-couleur");
const inputRange = document.querySelector(".inp-range");
const btns = document.querySelectorAll('button');
const fond = document.querySelector('body');
const containerCouleurs = document.querySelector('.container-couleurs');
const span = document.querySelector('span');
const btnRandom = document.querySelector('.random');


// Init
let valCouleurs = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3; 

//remplit les inputs avec les 2 couleurs initiales
inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];

//on ajoute les couleurs initiales aux background des inputs
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

//on ajoute les couleurs au body
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;

//Changement de l'inclinaison
inputRange.addEventListener('input', (e) => {
    inclinaison = e.target.value * 3.6;
    //car calcul en 360 obligatoire
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
})

//Aout - Suppression de couleurs
btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve);
})

function rajouteEnleve(e){
    span.innerText = '';
    const allInputs = document.querySelectorAll('.inp-couleur');

    //formule pour avoir des couleurs random
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //console.log(randomColor)

    //ajout de couleurs
    if (e.target.className === 'plus'){
        if(allInputs.length > 4){
            return;
        }

        //nouvel input couleur
        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class','inp-couleur');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlength', 7);
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor}`;
        containerCouleurs.appendChild(nvCouleur);

        //Maj le tableau initial + le fond
        valCouleurs.push(`#${randomColor.toUpperCase()}`);
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        index++;
    }

    //suppression de couleurs.
    else if (e.target.className === "moins"){
        if(valCouleurs.length === 2){
            span.innerText = "Il faut au moins deux couleurs !";
        } else { 
            valCouleurs.pop();
            allInputs[allInputs.length -1].remove();
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
            index--;
        }
    }

    //Maj des couleurs dans les nouveaux inputs
    allInputs.forEach (inp => {
        inp.addEventListener('input', majColors);
    });

}

//Maj des inputs de base 
inputsCouleur.forEach (inp => {
    inp.addEventListener('input', majColors);
});

function majColors(e){
    let indexEnCours = e.target.getAttribute('data-index');

    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
}

//couleurs randoms

btnRandom.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.inp-couleur');
    for (i = 0; i < valCouleurs.length; i++) {
        valCouleurs[i] = `#${Math.floor(Math.random()*16777215).toString(16)}`
        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i].toUpperCase();
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
    }
})


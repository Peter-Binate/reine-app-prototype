$(document).ready(function () {
  //Animation de la page titre
  setTimeout(function () {
    $(".accueil").fadeOut(500);
  }, 4000);

  var textWrapper = document.querySelector(".titre1");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: true })
    .add({
      targets: ".titre1 .letter",
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 1500,
      delay: (el, i) => 20 * (i + 1),
    })
    .add({
      targets: ".titre1",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 5000,
    });

  var textWrapper = document.querySelector(".titre2");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: true })
    .add({
      targets: ".titre2 .letter",
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 2000, // Vitesse d'apparition de la phrase entière
      delay: (el, i) => 20 * (i + 1), // vitesse d'apparition lettre par lettre
    })
    .add({
      targets: ".titre2",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 5000,
    });
});

//L'ensemble des questions:
var questions = [
  "Sélectionner un fichier texte ?",
  "Souhaitez-vous lémmatiser le texte?",
  "Nombre d'arbre à générer",
  "Nombre de mots par arbre",
  "Nombre d'itérations de l'algorithme",
];

var input = ["nomfichier", "non", 2, 4, 100]; //L'ensemble des valeurs inscrites par l'utilisateur dans le formulaire
var compteur = 0; // Sert à déterminer à quelle étape on se situe l'utilisateur pour ensuite animer la barre d'étape en fonction de son avancement
var tailleTab = 4; // Taille du tableau questions
var choix = false; // Sert à déterminer si on a cliquer ou non sur le curseur à l'étape 2

//Permet de Récupérer la variable du checkbox. Si on clique sur le boutton:
$("#checkboxID").click(function () {
  if (choix === false) {
    input[compteur] = "Oui"; // Insère la nouvelle valeur du checkbox dans le tableau input
    choix = true;
  } else {
    input[compteur] = "Non"; // Insère la nouvelle valeur du checkbox dans le tableau input
  }
});

//Permet d'afficher le boutton checkbox seulement pour la question 2
$("#onoff").css("display", "none");

var bouttonMouse = false; //Permet de savoir si on reste appuyer sur le boutton de la souris
var BouttonInput = false; //Permet de savoir si on appuie sur le boutton + ou -

//Lorsque que l'on clique sur le boutton "-"
$("#inputmoins").on("click", function () {
  BouttonInput = false;
  var inputnumber = parseInt($("#nombre").val());

  //On soustrait 1 à l'input nombre
  $("#nombre").val(inputnumber - 1);
});

//Lorsque que l'on clique sur le boutton "+"
$("#inputplus").on("click", function () {
  BouttonInput = true;
  var inputnumber = parseInt($("#nombre").val());

  //On ajoute 1 à l'input nombre
  $("#nombre").val(inputnumber + 1);
});

$(".inputoperation").mousedown(function () {
  bouttonMouse = true;
});

$(".inputoperation").mouseup(function () {
  bouttonMouse = false;
});

// Fonction pour animer la barre étape du formulaire lorsqu'on clique "suivant"
function AnimationStepBarreSuivant() {
  if (compteur <= 5) {
    //Animation des étapes (étapes complétées qui deviennent vertes en appuyant: "suivant")
    $("ul li:nth-child(" + compteur + ") .fa").css("background", "#148e14");

    if (compteur < 5) {
      //Animation de la barre étape (étape qui devient verte)
      $(".w3-container").css("display", "block");
      $(".w3-container").css("width", compteur * 25 + "%");
    }
  }
}

//On fait disparaitre le bouton précédent à l'étape 1
$(".precedent").css("display", "none");

// On récupère le nom du fichier et on l'insère dans le tableau des résultats (input[compteur])
$("#file").change(function () {
  //On remplace la valeur (par défaut) de l'input file par le nom du fichier
  input[compteur] = $("#file").val();

  //Remplace le texte "Choisir un fichier" par le nom du fichier
  $(".input-label").html($("#file").val().split("\\")[2]);
});

function suivant() {
  //On fait apparaitre le bouton précédent
  $(".precedent").css("display", "block");

  //A l'étape 1
  if (compteur === 0) {
    // Si l'utilisateur a oublié de sélectionner un fichié
    if ($("#file").val() == "" || $("#file").val() == null) {
      alert(
        "Vous devez obligatoirement choisir un fichier avant de cliquer sur suivant!"
      );
    } else {
      AnimationStepBarreSuivant();

      //On fait disparaitre l'input file
      $(".input-label").css("display", "none");

      //On fait apparaitre l'input curseur
      $("#onoff").css("display", "block");
      compteur++;

      AnimationStepBarreSuivant();

      // On affiche la bonne question
      $("h1").text(questions[compteur]);
      $("#checkboxID").val(input[compteur]);
    }
  } else if (compteur === 1) {
    //Récupère la valeur inscrite par l'utilisateur dans l'input
    $("#onoff").css("display", "none");
    $("#nombre").css("display", "block");
    $(".inputoperation").css("display", "flex");

    //Si l'utilisateur inscrit un nombre dans l'input
    compteur++;

    AnimationStepBarreSuivant();

    // On affiche la bonne question
    $("h1").text(questions[compteur]);
  }

  //Si on est pas encore arriver à la dernière étape
  else if (compteur < tailleTab) {
    if (compteur === 2 && $("#nombre").val() != "") {
      VerificationRegex();
    } else if (compteur === 3 && $("#nombre").val() != "") {
      VerificationRegex2();
    } else {
      alert(
        "Vous devez obligatoirement remplir le champs avnt de cliquer sur suivant"
      );
    }
  }

  //Sinon on génère le résultat
  else {
    VerificationRegex3();
  }

  //Affiche le mot Générer à la dernière étape du formulaire
  if (compteur === 4) {
    $("#next").text("Générer");
  }
}

//Fait apparaitre un cahargement après avoir remplis le formulaire
function ApparitionModale() {
  $("div").remove(".w3, #affichage, .box, .precedent, .next");
  $(".progressbar").css("display", "none");
  $(".box").css("display", "flex");
  $(".modal").css("opacity", "1");
}

// Fonction qui vérifie si la valeur du nombre inscrit dans l'input est compris dans l'intervalle: [1-20]
function VerificationRegex() {
  var regexInput = /^[2-9]$|^(1[0-9])|[2][0]$/; //Regex qui a pour intervalle: [1-20]
  var inputNombre = $("#nombre").val();

  //On vérifie si la valeur de l'input est validé par le regex
  if (regexInput.test(inputNombre)) {
    //On insère la dernière valeur dans le tableau
    input[compteur] = $("#nombre").val();
    $("#nombre").val(input[compteur]);

    //Si on clique sur suivant
    compteur++;

    AnimationStepBarreSuivant();

    // On affiche la bonne question
    $("h1").text(questions[compteur]);

    //Permet d'afficher les bonnes valeurs lorsqu'on retourne en arrière ou en avant
    $("#nombre").val(input[compteur]);
  } else {
    alert("Votre nombre doit être compris entre 2 et 20 !");
  }
}

// Fonction qui vérifie si la valeur du nombre inscrit dans l'input est compris dans l'intervalle: [4-20]
function VerificationRegex2() {
  var regexInput = /^[4-9]$|^(1[0-9])|[2][0]$/; //Regex qui a pour intervalle: [4-20]
  var inputNombre = $("#nombre").val();

  //On vérifie si la valeur de l'input est validé par le regex
  if (regexInput.test(inputNombre)) {
    //On insère la dernière valeur dans le tableau
    input[compteur] = $("#nombre").val();
    $("#nombre").val(input[compteur]);

    //Si on clique sur suivant
    compteur++;

    AnimationStepBarreSuivant();

    // On affiche la bonne question
    $("h1").text(questions[compteur]);

    //Permet d'afficher les bonnes valeurs lorsqu'on retourne en arrière ou en avant
    $("#nombre").val(input[compteur]);
  } else {
    alert("Votre nombre doit être compris entre 4 et 20 !");
  }
}

// Fonction qui vérifie si la valeur du nombre inscrit dans l'input est compris dans l'intervalle: [100-1000]
function VerificationRegex3() {
  var regexInput = /^(?:[1-9][0-9][0-9]|1000)$/; //Regex qui a pour intervalle: [100-1000]
  var inputNombre = $("#nombre").val();

  //On vérifie si la valeur de l'input est validé par le regex
  if (regexInput.test(inputNombre)) {
    //On insère la dernière valeur dans le tableau
    input[compteur] = $("#nombre").val();
    $("#nombre").val(input[compteur]);
    ApparitionModale();
    setInterval(() => {
      window.location.href = 'algorithme.html';
    }, 3000);
    
    if (compteur === 4 && compteur < 6) {
      $("ul li:nth-child(" + (compteur + 1) + ") .fa").css(
        "background",
        "#148e14"
      );
    }

    AnimationStepBarreSuivant();

    //On affiche l'ensemble des résultats dans le tableau
    AfficherValeur();
  } else {
    alert("Votre nombre doit être compris entre 100 et 1000 !");
  }
}

function precedent() {
  if (compteur > 0) {
    //Animation des étapes (étapes qui redeviennent blanches en appuyant: "précédent")
    $("ul li:nth-child(" + (compteur + 1) + ") .fa").css("background", "#fff");

    //Animation de la barre étape (étape qui devient blanche)
    $(".w3-container").css("width", (compteur - 1) * 25 + "%");
  }

  //Si on est à la question 1
  if (compteur === 1) {
    $(".precedent").css("display", "none");
    $(".input-label").css("display", "block");
    $("#onoff").css("display", "none");
    $("#nombre").css("display", "none");
    $(".inputoperation").css("display", "none");
    compteur--;

    // On affiche la bonne question
    $("h1").text(questions[compteur]);
  }

  //Sinon si on est à la question 2 on affiche le curseur
  else if (compteur === 2) {
    $("#file").css("display", "none");
    $(".input-label").css("display", "none");
    $("#onoff").css("display", "block");
    $("#nombre").css("display", "none");
    $(".inputoperation").css("display", "none");

    compteur--;

    // On affiche la bonne question
    $("h1").text(questions[compteur]);
  }

  //Sinon si on est à la question 3, 4 ou 5 on décrémente (lorsqu'on clique précédent)
  else if (compteur > 0) {
    //Si on clique sur précédent:
    compteur--;

    // On affiche la bonne question
    $("h1").text(questions[compteur]);

    //Permet d'afficher les bonnes valeurs lorsqu'on retourne en arrière ou en avant
    $("#nombre").val(input[compteur]);
  } else {
  }

  if (compteur < 4) {
    $("#next").text("Suivant");
  }
}

//Permet d'afficher l'ensembles des valeurs inscrites par l'utilisateur dans le formulaire
function AfficherValeur() {
  console.log(
    "Voici l'ensemble des valeurs rentré par l'utilisateur: " + input
  );
}

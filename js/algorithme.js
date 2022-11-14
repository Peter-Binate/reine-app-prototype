$(function () {
  //Récupère le nombre d'éléments ayant pour class charts
  var charts = $(".charts").length;

  var mots = [
    [
      "avoir",
      "dus",
      "futur",
      "génération",
      "laisserons",
      "passion",
      "suivants",
    ], //Mots présent dans la section 1
    ["parler", "manger", "sport", "frites", "ordinateur", "gâteau"], //Mots présent dans la section 2
    ["casque", "souris", "vacances", "danser", "château", "ballon"], //Mots présent dans la section 3
    ["café", "président", "courrir", "chiffre", "école", "papier"], //Mots présent dans la section 4
    ["jogging", "trahison", "bouclier", "collection", "chien", "voyage"], //Mots présent dans la section 5
    ["crabe", "entreprise", "épée", "collègue", "salaire", "promotion"], //Mots présent dans la section 6
    ["métro", "soda", "plante", "serpent", "transport", "voiture"], //Mots présent dans la section 7
    ["livre", "bus", "astuce", "jeux-vidéo", "écran", "magasin"], //Mots présent dans la section 8
    ["prince", "mariage", "peur", "fantôme", "surprise", "monde"], //Mots présent dans la section 9
    ["dormir", "lettre", "famille", "télévision", "anniversaire", "pays"], //Mots présent dans la section 10
  ];
  for (let index = 0; index < charts; index++) {
    var i = 0;

    while (i < mots[index].length) {
      //Fait apparaitre chaque tableau dans une section avec une jauge proportionnelle à l'indice de l'élément du tableau: mots
      var html =
        '<div class="charts__chart chart--p' +
        (mots[index].length - i) * 10 +
        ' chart--green">' +
        mots[index][i] +
        "</div>";
      $("#liste-" + (index + 1)).append(html);
      i++;
    }
  }

  //Contenue du tableau
  var myArray = [
    { type: "Auxiliaire", mot: "avoir", occurrence: "80 occurrences" },
    { type: "Verbe", mot: "dus", occurrence: "77 occurrences" },
    { type: "Nom", mot: "futur", occurrence: "74 occurrences" },
    { type: "Nom", mot: "génération", occurrence: "50 occurrences" },
    { type: "Verbe", mot: "laisserons", occurrence: "45 occurrences" },
    { type: "Nom", mot: "passion", occurrence: "42 occurrences" },
    { type: "Adjectif", mot: "suivants", occurrence: "30 occurrences" },
  ];

  //Fonction qui permet de ranger les mots par ordre: croissant, décroissant ou alphabétique
  $("th").on("click", function () {
    var column = $(this).data("column");
    var order = $(this).data("order");
    var text = $(this).html();
    text = text.substring(0, text.length - 1);

    if (order == "desc") {
      $(this).data("order", "asc");
      myArray = myArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      text += "&#9660";
    } else {
      $(this).data("order", "desc");
      myArray = myArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
      text += "&#9650";
    }
    $(this).html(text);
    buildTable(myArray);
  });

  buildTable(myArray);

  function buildTable(data) {
    var table = document.getElementById("myTable");
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      var row = `<tr>
							<td>${data[i].type}</td>
							<td>${data[i].mot}</td>
							<td>${data[i].occurrence}</td>
					  </tr>`;
      table.innerHTML += row;
    }
  }
});

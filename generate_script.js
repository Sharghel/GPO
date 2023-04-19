/*
 ***************************************************
 * Auteur : Corentin Hallot                         *
 * Objectif : script permettant la gestion des GPOs *
 * Date de début : 19/04/2023                       *
 * Dernière modification : 19/04/2023               *
 ****************************************************
 *
 * Première étape : récupération du statut de toute les GPOs.
 * Pour ce faire, on utilise un script powershell récupérant le statut de toute les GPOs.
 * Également, il nous faut stocker l'information du statut actuel des GPOs.
 * 
 * Deuxième étape : afficher visuellement le statut des GPOs.
 * Pour ce faire, pour chaque GPOs, on set le statut des checkbox correspondant.
 * L'état validé (checked), correspond à une GPOs active.
 * 
 * Troisième étape : génération du script pour changer le statut des GPOs.
 * Lorsque le formulaire de demande de génération de script est reçu, on effectue les étapes suivantes : 
 *  1.| Pour chaque checkbox, on compare si son état (checked ou non) est différent de la GPO correspondante.
 *      Pour simplifier le traitement, l'id de chaque checkbox correspond au nom d'une GPO.
 * 
 *  2.| Si l'état de la checkbox est différent du statut de la GPO, 
 *      alors la commande necessaire pour changer le statut de la GPO est insérée dans le script powershell.
 * 
 *      Commande d'activation : (get-gpo "GPO_NAME").gpostatus="AllSettingsEnabled"
 *      Commande de désactivation : (get-gpo "GPO_NAME").gpostatus="AllSettingsDisabled"
 * 
 * Quatrième étape : téléchargement du script
 * Une fois le script généré, il est automatiquement téléchargé.
 * Afin de le rendre exécutable avec un simple clic, un second script est généré et téléchargé.
 * Celui-ci est un script bash contenant la ligne suivante : powershell.exe C:\Users\Administrateur\Downloads\script_powershell.ps1
 *     
 */

 /**
  * Temporairement, le temps de pouvoir faire les test de script pwoershell sur le serveur,
  * nous utiliserons des valeurs arbitraires pour set le statut des GPOs
  * 
  * Pour rappel, voici les statuts possible d'une GPO : 
  * activé : AllSettingsEnabled
  * désactivé : AllSettingsDisabled
  * 
  * Ainsi, nous avons : 
  * Verrouiller_cmd : activé
  * Verrouiller_registre : activé
  * Verrouiller_compte : désactivé
  * Verrouiller_usb : désactivé
  */

 const gpos_statuts = [ ["Verrouiler_cmd", "AllSettingsEnabled"], 
                                        ["Verrouiler_registre", "AllSettingsEnabled"],
                                        ["Verrouiler_compte", "AllSettingsDisabled"], 
                                        ["Verrouiler_usb", "AllSettingsDisabled"]
                                    ];

/**
 * Début de la deuxième étape : afficher visuellement le statut des GPOs. 
 */

// Initialisation des variables contenant les checkbox
const checkbox_Verrouiler_cmd = document.querySelector('#Verrouiler_cmd');
const checkbox_Verrouiler_registre = document.querySelector('#Verrouiler_registre');
const checkbox_Verrouiler_compte = document.querySelector('#Verrouiler_compte');
const checkbox_Verrouiler_usb = document.querySelector('#Verrouiler_usb');

gpos_statuts.forEach(gpo => {

    console.log("Statut de la gpo " + gpo[0] + " ; ");
    
    // Si gpo est activé, alors on check la checkbox, sinon on la uncheck
        //la fonction eval permet de récupérer le contenu de la variable corresopndant au nom concaténé, permettant la variabilisation de variable
    if( gpo[1] == "AllSettingsEnabled" ) {
        console.log("activé");
        eval("checkbox_"+gpo[0]).setAttribute("checked",true);
    } else {
        console.log("désactivé");
        eval("checkbox_"+gpo[0]).removeAttribute("checked",false);
    }
});

// Création de la rebrique pour le login :

//// Bouton de fermeture de la modale :

const btnFermeture = document.querySelector("#fermer")
const modale = document.querySelector("#loginmodale")

btnFermeture.addEventListener("click", function(event) {
    event.preventDefault()
    modale.style.display = "none";
})
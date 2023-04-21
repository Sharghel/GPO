/*
 ***************************************************
 * Auteur : Corentin Hallot
 * Objectif : script permettant la gestion des GPOs
 * Date de début : 19/04/2023
 * Dernière modification : 21/04/2023
 ****************************************************
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

 const gposStatus = [ ["Verrouiller_cmd", "AllSettingsEnabled"], 
                                     ["Verrouiller_registre", "AllSettingsEnabled"],
                                     ["Verrouiller_compte", "AllSettingsDisabled"], 
                                     ["Verrouiller_usb", "AllSettingsDisabled"]
                                ];

// LIRE LE FICHIER : "RessourcesFiles\AllGposStatus.csv"

    
/**
 * Début de la deuxième étape : afficher visuellement le statut des GPOs. 
 */

/**
 * Initialisation de la liste checkboxGpo contenant toutes les checkbox associé aux gpos.
 * Chaque élément de la liste possède un attribut data-nomGPO, idienfifiant le nom de la GPO à laquelle la checkbox correspond.
 */
const checkboxGpo = document.querySelectorAll('#checkbox_gpo');

/**
 * Pour chaque checkbox, on récupère le nom de la gpo à laquelle elle correspond
 * Une fois le nom connu, on récupère le statut de la GPO.
 * Si la GPO existe (statut non null), on positionne l'état de la checkbox (checck ou non) suivant le statut de la GPO
 * Pour rappel, les statut des GPOs sont : activé (true) et désactivé (false)
 * Si la GPO n'existe pas, alors on cache la checkbox.
 */
checkboxGpo.forEach(checkboxAPositionner => {
    
    const  nomDeLaGpoCorrespondante   = checkboxAPositionner.getAttribute("data-nomGPO");
    const  statutDeLaGpoCorrespondante = getGpoStatutByName(nomDeLaGpoCorrespondante); //boolean : true, false ou null

    if( statutDeLaGpoCorrespondante != null) {

        if( statutDeLaGpoCorrespondante ) {
            checkboxAPositionner.checked = true;
        } else {
            checkboxAPositionner.checked = false;
        }
    } else {
        checkboxAPositionner.checked = false;
        checkboxAPositionner.hidden = true;
    }
});

/**
 * Début de la troisième étape : génération du script pour changer le statut des GPOs.
 */

/**
 * Initialisation de la variable demandeGenerationScript pour y ajouter le listener
 */
const demandeGenerationScript = document.querySelector('#generate_script');

demandeGenerationScript.addEventListener("click", function(event) {

    // retrait du comportement par défaut pour ne pas rafraichir la page
    event.preventDefault();
    // initialisation d'une nouvelle variable contenant script powershell qui sera à télécharger
    let scriptPowershell = "";

    // pour chaque checkbox
    checkboxGpo.forEach(checkbox => {
    
        const  nomDeLaGpoCheck   = checkbox.getAttribute("data-nomGPO");
        const  statutDeLaGpoCheck = getGpoStatutByName(nomDeLaGpoCheck); //boolean : true ou false

        /**
         * Si l'attribut checked est différent du statutDeLaGpoCorresopndante cela signifie que l'état a été modifié
         * Dans ce cas, ajout la commande correspondant à l'état de la checkbox (activé / désactivé) dans la variable scriptPowershell
         */
        if( checkbox.checked != statutDeLaGpoCheck ) {

            if( checkbox.checked ) {
                scriptPowershell += "(get-gpo \""+nomDeLaGpoCheck+").gpostatus=\"AllSettingsEnabled\"\n";
            } else {
                scriptPowershell += "(get-gpo \""+nomDeLaGpoCheck+").gpostatus=\"AllSettingsDisabled\"\n";
            }
        }
    });

    // Téléchargement des fichiers
    doawnloadScript(scriptPowershell, "updateGposStatus.ps1", "text/ps1");
    // doawnloadScript("powershell.exe C:\Users\Administrateur\Downloads\script_powershell.ps1", "click me to start script powershell.bat", "bat");
});


/**
 * FONCTIONS
 */


/**
 * @param {String} nomGPO - le nom d'une GPO
 * @returns le statut du nom de la gpo donné
 * @returns renvoie null si la GPO n'existe pas
 */
function getGpoStatutByName(nomGPO) {
    
    let statut_a_retourner = null;
    gposStatus.forEach(element => {
        if( element[0] == nomGPO ) {
            // Si la GPO est activé
            if( element[1] == "AllSettingsEnabled") {
                statut_a_retourner = true;
            } else {
                statut_a_retourner = false;
            }
        }
    });

    return statut_a_retourner;

}

function doawnloadScript(data, name, type) {
    const anchor = document.createElement('a')
    anchor.href = window.URL.createObjectURL(new Blob([data], { type }))
    anchor.download = name;
    anchor.click();
}

// Création de la rebrique pour le login :
const modale = document.querySelector("#loginmodale")

//// Bouton d'ouverture de la modale :

const OuvertureLoginModale = document.querySelector("#OuvertureLoginModale")

OuvertureLoginModale.addEventListener("click", function(event) {
    event.preventDefault()
    modale.style.display = "inherit";
})

//// Bouton de fermeture de la modale :

const btnFermeture = document.querySelector("#fermer")

btnFermeture.addEventListener("click", function(event) {
    event.preventDefault()
    modale.style.display = "none";
})
/*
 ***************************************************
 * Auteur : Corentin Hallot                         *
 * Objectif : script permettant la gestion des GPOs *
 * Date de début : 19/04/2023                       *
 * Dernière modification : 19/04/2023               *
 ****************************************************
 *
 * Première étape : récupération du statut de toute les GPOs
 * Pour ce faire, on utilise un script powershell récupérant le statut de toute les GPOs.
 * Également, il nous faut stocker l'information du statut actuel des GPOs.
 * 
 * Deuxième étape : afficher visuellement le statut des GPOs
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
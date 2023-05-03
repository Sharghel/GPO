<?php
/*
 ***************************************************
 * Auteur : Corentin Hallot
 * Objectif : éxécuter le script powershell préparé afin de récupérer le nom et le statut de toutes les gpos existantes,
 * puis de les écrire dans un fichier cvs   
 * Date de début : 21/04/202
 * Dernière modification : 03/05/2023 
 ****************************************************
 */

/**
 * Execution du script powershell récupérant le nom et le status de toutes les gpos sous forme de tableau : {[gpoName, status],[gpoName, status]}
 */
$pathScriptGetAllGposStatus = 'RessourcesFiles\GetAllGposStatus.ps1';
$prepare = 'powershell -executionpolicy remotesigned -command "& {"'.$pathScriptGetAllGposStatus.'"; exit $err}"';
$resultPowershell = shell_exec($prepare);
/*
$resultPowershell = "Verrouiller_cmd
AllSettingsDisabled
\\0
Verrouiller_compte
AllSettingsDisabled
\\0
Verrouiller_registre
AllSettingsDisabled
\\0
Verrouiller_usb
AllSettingsDisabled
\\0";
*/
echo("Chaine initiale : " . $resultPowershell . "<br>");

/**
 * Initialisation des variables nécessaires au traitelement de la chaine retournée par le script powershell
 */
$currentStr = $resultPowershell;
$chaineDeControle = "\\0";
$resultTraitement = array();

/**
 * Boucle de traitement du résultat du script powershell
 */
while(true) {
    echo("------------------------------". "<br>");
    echo("currentStr : ". $currentStr . "<br>");

    /**
     * Retourne l'offset de la première occurence de la chaine \0.
     * Pour rappel, la chaine de caractère possède le format suivant : nomGPO statusGPO \0 nomGPO statusGPO \0 ...
     */
    $offset = strpos($currentStr, $chaineDeControle);
    echo("offset : " . $offset) . "<br>";

    /**
     * Si l'occurrence \0 n'a pas été trouvé, alors strpos retourne null.
     * Dans ce cas, on stop la boucle de traitement while.
     * Sinon, on effectue le traitement
     */
    if(  !$offset ) {
        break 1;
    } else {

        /**
         * On ajoute la chaine de caractère correspondante à la GPO actuelle dans le tableau de résultat du traitement
         */
        echo( stristr($currentStr, $chaineDeControle, true) . "<br>" );
        array_push($resultTraitement, stristr($currentStr, $chaineDeControle, true));

        /**
         * Retourne la chaine de caractère depuis la première occurence de la chaine \0.
         * La chaine \0 fait 2 caractères. Afin de ne pas prendre en compte le caractère espace, la sous-chaine part de offset+3.
         * Phase de test : caractère retour chariot : +3 ==> +4
         */
        $currentStr = substr($currentStr, $offset+4);
        echo("currentStr :". $currentStr . "<br>");
    }
}

/**
 * Affichage du tableau resultTraitement
 */
var_dump($resultTraitement);

/**
 * Ecriture du status de toutes les gpos dans le fichier RessourcesFiles\AllGposStatus.csv
 */
 $list = array (
    array("Verrouiller_cmd", "AllSettingsEnabled"),
    array("Verrouiller_registre", "AllSettingsEnabled"),
    array("Verrouiller_compte", "AllSettingsDisabled"),
    array("Verrouiller_usb", "AllSettingsDisabled")
 );
 
 $file = fopen('RessourcesFiles\AllGposStatus.csv', 'w');
 
 foreach ($list as $fields) {
     fputcsv($file, $fields);
 }
 
 fclose($file);
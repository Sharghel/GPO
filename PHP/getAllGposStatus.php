<?php
/*
 ***************************************************
 * Auteur : Corentin Hallot
 * Objectif : éxécuter le script powershell préparé afin de récupérer le nom et le statut de toutes les gpos existantes,
 * puis de les écrire dans un fichier cvs   
 * Date de début : 21/04/202
 * Dernière modification : 21/04/2023 
 ****************************************************
 */

/**
 * Execution du script powershell récupérant le nom et le status de toutes les gpos sous forme de tableau : {[gpoName, status],[gpoName, status]}
 */
$pathScriptGetAllGposStatus = '..\RessourcesFiles\GetAllGposStatus.ps1';
$prepare = 'powershell -executionpolicy remotesigned -command "& {"'.$pathScriptGetAllGposStatus.'"; exit $err}"';
$result = shell_exec($prepare);

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
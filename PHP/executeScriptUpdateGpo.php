<?php
/*
 ***************************************************
 * Auteur : Corentin Hallot
 * Objectif : mettre à jour les gpos en utilisant le script powershell généré avec javascript
 * Date de début : 21/04/202
 * Dernière modification : 21/04/2023 
 ****************************************************
 */

 /**
  * initialisation d'un drapeau. Celui-ci sera abaissé lorsque l'objectif sera atteint.
  */
 $flag = true;

 /**
  * Préparation de la commande d'éxécution du fichier
  */
$pathScriptUpdateGposStatus = 'C:\Users\hallo\Downloads\UpdateGposStatus.ps1';
$prepare = 'powershell -executionpolicy remotesigned -command "& {"'.$pathScriptGetAllGposStatus.'"; exit $err}"';

//  while($flag) {

    /**
     * Vérification de l'existance du ficheir
     */
    if( file_exists($pathScriptUpdateGposStatus) ) {

        /**
         * Passage du drapeau à faux
         */
        $flag = false;

        /**
         * Execution du script powershell
         */
        // shell_exec($prepare);
        echo("EXECUTION SCRIPT POWERSHELL");
    }
//  }

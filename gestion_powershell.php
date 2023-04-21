<?php
$psPath = "powershell.exe";
$psDIR = "PathToPowrshell";
$psScript = "C:\Users\hallo\OneDrive\Bureau\TestPowershell.ps1";
$runScript = $psDIR. $psScript;
$runCMD = $psPath." ".$runScript;
$output= shell_exec($runCMD);
echo( '<pre>' );
echo( $output );
echo( '</pre>' );
?>
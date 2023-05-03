# return "Hello World !"

$name_verrouiller_cmd = (Get-GPO Verrouiller_cmd).DisplayName
$status_verrouiller_cmd = (Get-GPO Verrouiller_cmd).GpoStatus
$fin_verrouiller_cmd = "\0";
$gpo_verrouiller_cmd = @($name_verrouiller_cmd, $status_verrouiller_cmd, $fin_verrouiller_cmd)

$name_verrouiller_compte = (Get-GPO Verrouiller_compte).DisplayName
$status_verrouiller_compte = (Get-GPO Verrouiller_compte).GpoStatus
$fin_verrouiller_compte =  "\0";
$gpo_verrouiller_compte = @($name_verrouiller_compte, $status_verrouiller_compte, $fin_verrouiller_compte)

$name_verrouiller_registre = (Get-GPO Verrouiller_registre).DisplayName
$status_verrouiller_registre = (Get-GPO Verrouiller_registre).GpoStatus
$fin_verrouiller_registre =  "\0";
$gpo_verrouiller_registre = @($name_verrouiller_registre, $status_verrouiller_registre, $fin_verrouiller_registre)

$name_verrouiller_usb = (Get-GPO Verrouiller_usb).DisplayName
$status_verrouiller_usb = (Get-GPO Verrouiller_usb).GpoStatus
$fin_verrouiller_usb =  "\0";
$gpo_verrouiller_usb = @($name_verrouiller_usb, $status_verrouiller_usb, $fin_verrouiller_usb)

$all_gpo = @($gpo_verrouiller_cmd,$gpo_verrouiller_compte,$gpo_verrouiller_registre,$gpo_verrouiller_usb)

return $all_gpo;
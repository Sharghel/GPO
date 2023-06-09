<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPO</title>
    <link rel="stylesheet" href="style.css">
    <?php include('PHP\getAllGposStatus.php') ?>
    <!-- <?php include('PHP\executeScriptUpdateGpo.php') ?> -->
</head>
<body>
    <form action="" method="POST" class="loginmodale" id="loginmodale">
        <button id="fermer" class="fermer">X</button>
        <p>Modale d'authentification</p>
        <input type="text" placeholder="Veuillez mettre votre nom d'utilisateur" class="name">
        <input type="password" placeholder="Veuillez insérer votre mot de passe" class="mdp">
        <input type="submit" value="Connexion">
    </form>
<div class="bandeau">
    <div class="btn">
        <a class="login" id="OuvertureLoginModale" title="Login">Login</a>
    </div>
</div>
<form action="" method="post" class="form">
    <div class="bt">
        <div class="cmd gap">
            Verrouiller le cmd
            <input type="checkbox" id="checkbox_gpo" data-nomGPO="Verrouiller_cmd">
        </div>
        <div class="registre gap">
            Verrouiller le regedit
            <input type="checkbox" id="checkbox_gpo" data-nomGPO="Verrouiller_registre">
        </div>
        <div class="compte gap">
            Verrouiller le compte au bout de 5 mauvaises tentatives pendant 10 minutes
            <input type="checkbox" id="checkbox_gpo" data-nomGPO="Verrouiller_compte">
        </div>
        <div class="usb gap">
            Verrouiller les ports usb
            <input type="checkbox" id="checkbox_gpo" data-nomGPO="Verrouiller_usb">
        </div>
    </div>
    <input type="submit" id ="generate_script" value="Génerer votre script">
</form>
<script src="JavaScript\generateScriptUpdateGpo.js"></script>
</body>
</html>

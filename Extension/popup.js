document.addEventListener('DOMContentLoaded', function() {

    var enregistrerBtn = document.getElementById('enregistrerBtn');
    var adresseSource = document.getElementById('adresseSource');
    var idSource = document.getElementById('idSource');
    var passwordSource = document.getElementById('passwordSource');

    enregistrerBtn.addEventListener('click', function() {
        if (!adresseSource.value || !idSource.value || !passwordSource.value) {
            console.log('Tous les champs doivent être remplis.');
            return;
        }

        chrome.runtime.sendMessage({
            action: "connect",
            server: adresseSource.value,
            username: idSource.value,
            password: passwordSource.value
        }, function(reponse) {
            console.log(reponse);
        });

        chrome.runtime.sendMessage({
            action: "downloadDoc",
        }, function(reponse) {
            console.log(reponse);
        });
    });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // ouverture de la popup de configuration
    if (request.action === "openWindow") {
        chrome.windows.create({url: "popup.html", type: "popup", width: 400, height: 400});
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // téléchargement de la doc
    if (request.action === "downloadDoc" && request.etat_name != "") {
        console.log("Lancement du téléchargement de " + request.etat_name);
        
        chrome.storage.sync.get("token", function(result) {
            if (chrome.runtime.lastError) {
                // Gérer l'erreur
                console.error("Erreur lors de la récupération des données :", chrome.runtime.lastError);
                sendResponse({ error: chrome.runtime.lastError.message }); // Renvoyer l'erreur
            }
        });

        chrome.storage.sync.get("server", function(result) {
            if (chrome.runtime.lastError) {
                // Gérer l'erreur
                console.error("Erreur lors de la récupération des données (storage server):", chrome.runtime.lastError);
                sendResponse({ error: chrome.runtime.lastError.message }); // Renvoyer l'erreur
            } else {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(`http://mathieu-rio.fr:8090/api/collections/Documentation/records?filter=etat_name='${request.etat_name}'`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    sendResponse({ result: result }); // Envoyer la réponse
                })
                .catch(error => {
                    console.error('Erreur lors de la requête fetch :', error);
                    sendResponse({ error: error.message }); // Renvoyer l'erreur
                });
            }
        });

        return true; // Indique que la réponse est asynchrone
    }
});




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // verification de la connexion
    if (request.action === "tokenVerification") {
        chrome.storage.sync.get("token", function(resultat) {
            if (chrome.runtime.lastError) {
                // Gérer l'erreur
                console.log("Erreur lors de la récupération des données :", chrome.runtime.lastError);
                chrome.windows.create({url: "popup.html", type: "popup", width: 400, height: 400}); // demande de connexion
            } else {
                // verifier au pret du serveur le token (to-do)
                sendResponse({result: "Connected"});
            }
        });

        if (request.action === "openWindow") {
            chrome.windows.create({url: "popup.html", type: "popup", width: 400, height: 400});
        }
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // connexion
    if (request.action === "connect") {
        console.log(request);
        fetch(`${request.server}/api/collections/users/auth-with-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identity: request.username,
                password: request.password
            })
        }).then(response => response.json())
        .then(data => {
            if (data.token) {
                chrome.storage.sync.set({"token": data.token}, function() {
                    console.log("Données sauvegardées dans chrome.storage.sync.");
                });

                chrome.storage.sync.set({"server": data.server});

                chrome.storage.sync.get("token", function(resultat) {
                    if (chrome.runtime.lastError) {
                        // Gérer l'erreur
                        console.log("Erreur lors de la récupération des données :", chrome.runtime.lastError);
                    } else {
                        sendResponse({result: "Connected"});
                    }
                });
            }
        })
        .catch(error => console.error('Erreur lors de l\'authentification:', error));
    }
    // Retourner true pour indiquer que la réponse sera asynchrone
    return true;
});


function createPopup(content) {

    // Supprimer l'ancien popup s'il existe
    const oldPopup = document.getElementById('customPopup');
    if (oldPopup) {
        oldPopup.remove();
    }

    // Créer un nouvel élément de popup
    const popup = document.createElement('div');
    popup.id = 'customPopup';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.padding = '10px';
    popup.style.background = 'white';
    popup.style.border = '1px solid #ddd';
    popup.style.zIndex = '10000'; // Assurez-vous qu'il est bien visible
    popup.innerText = content;

    // Ajouter le popup au document
    document.body.appendChild(popup);

    // Supprimer le popup après 3 secondes
    setTimeout(() => {
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }, 3000);
}

function createPopupMouse(content, event) {

    // Supprimer l'ancien popup s'il existe
    const oldPopup = document.getElementById('customPopup');
    if (oldPopup) {
        oldPopup.remove();
    }

    // Créer un nouvel élément de popup
    const popup = document.createElement('div');
    popup.id = 'customPopup';
    popup.style.position = 'absolute';
    popup.style.top = event.clientY + "px";
    popup.style.left = event.clientX + "px";
    popup.style.padding = '10px';
    popup.style.background = 'white';
    popup.style.border = '1px solid #ddd';
    popup.style.zIndex = '10000'; // Assurez-vous qu'il est bien visible
    popup.innerText = content;
    popup.style.opacity = "90%";

    // Ajouter le popup au document
    document.body.appendChild(popup);

    // Supprimer le popup après 3 secondes
    setTimeout(() => {
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }, 3000);
}

function popupInfo() {
    // Créer un nouvel élément de popup
    const popup = document.createElement('div');
    popup.id = 'popupInfo';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.width = '50px';
    popup.style.height = '50px';
    popup.style.borderRadius = '100%';
    // popup.style.background = 'blue';
    // popup.style.backgroundImage = "url('./images/icon128.png')";
    popup.style.border = '1px solid #ddd';
    popup.style.zIndex = '9999'; // Assurez-vous qu'il est bien visible

    // Créer un élément image
    var image = document.createElement("img");
    // Récupérer l'URL de l'image à partir de l'extension Chrome
    image.src = chrome.runtime.getURL("images/icon128.png");
    image.style.width = '50px';
    image.style.height = '50px';
    // Ajouter l'image à la popup
    popup.appendChild(image);

    popup.onclick = function() {
        console.log("click")
        chrome.runtime.sendMessage({action: "openWindow"}, function(response) {
            console.log("response", response)
        });
    };    

    // Ajouter le popup au document
    document.body.appendChild(popup);
}

function handleMouseOver(event) {

    const ar = [
        {
            name: "BA11-ADHERENTS MUTUELLE",
            desc: "requetes des mutuelle"
        },
        {
            name: "BA12-LISTE SALARIE (adresse et enfant)",
            desc: "liste des salarie avec leurs enfant et adresse"
        },
        {
            name: "BA13-MEDAILLES",
            desc: "liste des medailles"
        },
    ]


    if (event.target.id.includes('ListingURE_detailView_listColumn')) {
        for (let i of ar) {
            if (event.target.innerText === i.name) {
                console.log(event.clientX, event.clientY);
                createPopupMouse(i.desc, event);
                break;
            }
        }
    }
}

function handleMouseEnter(event) {

    var name = "iframe4660-837469";

    if (event.target.id === name) {
        var iframeDocument = event.target.contentDocument || event.target.contentWindow.document;
        console.log(iframeDocument)
        iframeDocument.addEventListener('mouseover', handleMouseOver)
    }
}

function checkIframOrigin(iframename) {
    try {
        var iframe = window.frames[iframename];
        var iframeLocation = iframe.location.href;
        console.log("same origin, access granted")
        var _iframe = document.getElementsByName(iframename)[0];
        popupInfo();
        _iframe.addEventListener('load', function() {
            var iframeDocument = _iframe.contentDocument || _iframe.contentWindow.document;
            console.log(iframeDocument);
            iframeDocument.addEventListener('mouseover', handleMouseEnter)  
        });
    } catch (e) {
        console.log("pas d'acces", e)
        // afficher une popup d'erreur
    }
}

if (window.location.href === 'https://pleiades-bo.fr.lactadom.ad/BOE/BI') {
    console.log("test start");
    checkIframOrigin("servletBridgeIframe")
}
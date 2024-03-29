// let ar = [
//     // Structure initiale du tableau
// ];


// function createPopup(content) {

//     // Supprimer l'ancien popup s'il existe
//     const oldPopup = document.getElementById('customPopup');
//     if (oldPopup) {
//         oldPopup.remove();
//     }

//     // Créer un nouvel élément de popup
//     const popup = document.createElement('div');
//     popup.id = 'customPopup';
//     popup.style.position = 'fixed';
//     popup.style.bottom = '20px';
//     popup.style.right = '20px';
//     popup.style.padding = '10px';
//     popup.style.background = 'white';
//     popup.style.border = '1px solid #ddd';
//     popup.style.zIndex = '10000'; // Assurez-vous qu'il est bien visible
//     popup.innerText = content;

//     // Ajouter le popup au document
//     document.body.appendChild(popup);

//     // Supprimer le popup après 3 secondes
//     setTimeout(() => {
//         if (document.body.contains(popup)) {
//             document.body.removeChild(popup);
//         }
//     }, 3000);
// }

// function createPopupMouse(content, event) {

//     // Supprimer l'ancien popup s'il existe
//     const oldPopup = document.getElementById('customPopup');
//     if (oldPopup) {
//         oldPopup.remove();
//     }

//     // Créer un nouvel élément de popup
//     const popup = document.createElement('div');
//     popup.id = 'customPopup';
//     popup.style.position = 'absolute';
//     popup.style.top = event.clientY + "px";
//     popup.style.left = event.clientX + "px";
//     popup.style.padding = '10px';
//     popup.style.background = 'white';
//     popup.style.border = '1px solid #ddd';
//     popup.style.zIndex = '10000'; // Assurez-vous qu'il est bien visible
//     popup.innerHTML = content;
//     popup.style.opacity = "90%";

//     // Ajouter le popup au document
//     document.body.appendChild(popup);

//     // Supprimer le popup après 3 secondes
//     setTimeout(() => {
//         if (document.body.contains(popup)) {
//             document.body.removeChild(popup);
//         }
//     }, 10000);
// }

// function popupInfo() {
//     // Créer un nouvel élément de popup
//     const popup = document.createElement('div');
//     popup.id = 'popupInfo';
//     popup.style.position = 'fixed';
//     popup.style.bottom = '20px';
//     popup.style.right = '20px';
//     popup.style.width = '50px';
//     popup.style.height = '50px';
//     popup.style.borderRadius = '100%';
//     popup.style.border = '1px solid #ddd';
//     popup.style.zIndex = '9999'; // Assurez-vous qu'il est bien visible

//     // Créer un élément image
//     var image = document.createElement("img");
//     // Récupérer l'URL de l'image à partir de l'extension Chrome
//     image.src = chrome.runtime.getURL("images/icon128.png");
//     image.style.width = '50px';
//     image.style.height = '50px';
//     // Ajouter l'image à la popup
//     popup.appendChild(image);

//     popup.onclick = function() {
//         console.log("click")
//         chrome.runtime.sendMessage({action: "openWindow"}, function(response) {
//             console.log("response", response)
//         });
//     };

//     // Ajouter le popup au document
//     document.body.appendChild(popup);
// }

// function handleMouseOver(event) {
//     if (event.target.id.includes('ListingURE_detailView_listColumn')) {
//         console.log("etat detecter: " + event.target.innerText)


//         chrome.runtime.sendMessage({action: "downloadDoc", etat_name: event.target.innerText}, function(response) {
//             var obj = JSON.parse(response.result);
//             if (obj && obj.totalItems) {
//                 createPopupMouse(obj.items[0].description, event);
//             } else {
//                 console.log("Réponse invalide ou aucun élément trouvé.");
//             }
//         });
//     }
// }

// function handleMouseEnter(event) {

//     var name = "iframe4660-837469";

//     if (event.target.id === name) {
//         var iframeDocument = event.target.contentDocument || event.target.contentWindow.document;
//         console.log(iframeDocument)
//         iframeDocument.addEventListener('mouseover', handleMouseOver)
//     }
// }

// function checkIframOrigin(iframename) {
//     try {
//         var iframe = window.frames[iframename];
//         var iframeLocation = iframe.location.href;
//         console.log("same origin, access granted")
//         var _iframe = document.getElementsByName(iframename)[0];
//         popupInfo();
//         _iframe.addEventListener('load', function() {
//             var iframeDocument = _iframe.contentDocument || _iframe.contentWindow.document;
//             console.log(iframeDocument);
//             iframeDocument.addEventListener('mouseover', handleMouseEnter)
//         });
//     } catch (e) {
//         console.log("pas d'acces", e)
//         // afficher une popup d'erreur
//     }
// }

// if (window.location.href === 'https://pleiades-bo.fr.lactadom.ad/BOE/BI' || window.location.href.includes('http://localhost:3000/')) {
//     console.log("test start");
//     checkIframOrigin("servletBridgeIframe")
// }



// Pas de variables globales déclarées ici car la structure initiale du tableau n'est pas utilisée dans les fonctions

function removeOldPopup() {
    const oldPopup = document.getElementById('customPopup');
    if (oldPopup) {
        oldPopup.remove();
    }
}

function createBasePopup(content, { id, position, top, left, bottom, right, padding, background, border, zIndex, opacity, innerHTML }) {
    const popup = document.createElement('div');
    popup.id = id;
    popup.style.position = position;
    if (top) popup.style.top = `${top}px`;
    if (left) popup.style.left = `${left}px`;
    if (bottom) popup.style.bottom = bottom;
    if (right) popup.style.right = right;
    popup.style.padding = padding;
    popup.style.background = background;
    popup.style.border = border;
    popup.style.zIndex = zIndex;
    if (opacity) popup.style.opacity = opacity;
    popup[innerHTML ? 'innerHTML' : 'innerText'] = content;

    document.body.appendChild(popup);
    return popup;
}

function createPopup(content) {
    removeOldPopup();
    const popup = createBasePopup(content, {
        id: 'customPopup',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: 'white',
        border: '1px solid #ddd',
        zIndex: '10000'
    });

    setTimeout(() => {
        popup.remove();
    }, 3000);
}

function createPopupMouse(content, event) {
    removeOldPopup();
    const popup = createBasePopup(content, {
        id: 'customPopup',
        position: 'absolute',
        top: event.clientY,
        left: event.clientX,
        padding: '10px',
        background: 'white',
        border: '1px solid #ddd',
        zIndex: '10000',
        opacity: '90%',
        innerHTML: true
    });

    setTimeout(() => {
        popup.remove();
    }, 10000);
}

function popupInfo() {
    const popup = createBasePopup('', {
        id: 'popupInfo',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '0',
        background: 'transparent',
        border: '1px solid #ddd',
        zIndex: '9999'
    });
    popup.style.width = '50px';
    popup.style.height = '50px';
    popup.style.borderRadius = '100%';

    const image = document.createElement("img");
    image.src = chrome.runtime.getURL("images/icon128.png");
    image.style.width = '50px';
    image.style.height = '50px';
    popup.appendChild(image);

    popup.onclick = function() {
        console.log("click");
        chrome.runtime.sendMessage({action: "asToken"}, function(response) {
            if (response.result === "true") {
                console.log(response.result)
                chrome.runtime.sendMessage({action: "openWindowConfirmed"});
            } else {
                console.log(response.result)
                chrome.runtime.sendMessage({action: "openWindow"});
            }
        });
    };
}

function handleMouseOver(event) {
    if (event.target.id.includes('ListingURE_detailView_listColumn')) {
        console.log("etat detecter: " + event.target.innerText)


        chrome.runtime.sendMessage({action: "downloadDoc", etat_name: event.target.innerText}, function(response) {
            var obj = JSON.parse(response.result);
            if (obj && obj.totalItems) {
                createPopupMouse(obj.items[0].description, event);
            } else {
                console.log("Réponse invalide ou aucun élément trouvé.");
            }
        });
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

function checkIframeOrigin(iframeName) {
    try {
        const iframe = window.frames[iframeName];
        console.log("same origin, access granted");
        const _iframe = document.getElementsByName(iframeName)[0];
        popupInfo();
        _iframe.addEventListener('load', function() {
            const iframeDocument = _iframe.contentDocument || _iframe.contentWindow.document;
            console.log(iframeDocument);
            iframeDocument.addEventListener('mouseover', handleMouseEnter);
        });
    } catch (e) {
        console.log("pas d'accès", e);
    }
}

if (['https://pleiades-bo.fr.lactadom.ad/BOE/BI', 'http://localhost:3000/'].some(url => window.location.href.includes(url))) {
    console.log("test start");
    checkIframeOrigin("servletBridgeIframe");
}

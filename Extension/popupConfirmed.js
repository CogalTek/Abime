document.addEventListener('DOMContentLoaded', function() {

    var disconnectBtn = document.getElementById('disconnect');
    var abimeUiBtn = document.getElementById('abimeUI');

    disconnectBtn.addEventListener('click', function() {
        chrome.runtime.sendMessage({
            action: "disconnect"
        });
        document.close();
    })

    abimeUiBtn.addEventListener('click', function() {
        window.open("http://mathieu-rio.fr", '_blank').focus();
    })
});

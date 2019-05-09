init();

function init() {
    var url = new URL(window.location.href);
    var pathName = url.pathname;
    var validPage = false;
    var elementId = '';

    // Check if the current page is for 'Apex Class', 'Apex Trigger' or 'Visualforce Page'
    if (pathName != null && pathName != '' 
        && (pathName.startsWith('/066') || pathName.startsWith('/01p') || pathName.startsWith('/01q') 
            || pathName.startsWith('/apexpages/setup/viewApexPage.apexp')
            || pathName.startsWith('/setup/build/viewApexClass.apexp') 
            || pathName.startsWith('/setup/build/viewApexTrigger.apexp'))) {


        if (!pathName.includes('/e') 
            && ((pathName.startsWith('/066') && pathName.length>15) 
                || pathName.startsWith('/apexpages/setup/viewApexPage.apexp'))
            && document.querySelector("[id*='codePanel']") != null) {

            // VF Page
            elementId = document.querySelector("[id*='codePanel']").id;
            validPage = true;
        } else if (!pathName.includes('/e') 
            && ((pathName.startsWith('/01p') && pathName.length>15) 
                || pathName.startsWith('/setup/build/viewApexClass.apexp'))
            && document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1]!= null) {

            // Apex Class
            elementId = document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1].id;
            validPage = true;
        } else if (!pathName.includes('/e') 
            && ((pathName.startsWith('/01q') && pathName.length>15) 
                || pathName.startsWith('/setup/build/viewApexTrigger.apexp'))
            && document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1] != null) {

            // Apex Trigger
            elementId = document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1].id;
            validPage = true;
        }

        if (validPage) {
            var scriptCode = 'function copyToClipboard(){var tempInput=document.createElement("textarea"); '
                             + 'var text = document.getElementById(\''+ elementId + '\').innerText; '
                             + 'tempInput.value = text.replace(\/ \/g, " "); '
                             + 'document.body.appendChild(tempInput); tempInput.select(); '
                             + 'document.execCommand("copy");tempInput.remove();alert("Code Copied!")}';

            var script = document.createElement("script");
            var inlineScript = document.createTextNode(scriptCode);
            script.appendChild(inlineScript);
            document.head.appendChild(script);

            var copyButtonTop = document.createElement('input');
            copyButtonTop.setAttribute('id', 'CopyButton');
            copyButtonTop.setAttribute('class', 'btn');
            copyButtonTop.setAttribute('type', 'button');
            copyButtonTop.setAttribute('value', 'Copy');
            copyButtonTop.setAttribute('onClick', 'copyToClipboard();');

            var copyButtonBottom = document.createElement('input');
            copyButtonBottom.setAttribute('id', 'CopyButton');
            copyButtonBottom.setAttribute('class', 'btn');
            copyButtonBottom.setAttribute('type', 'button');
            copyButtonBottom.setAttribute('value', 'Copy');
            copyButtonBottom.setAttribute('onClick', 'copyToClipboard();');

            var topButtonsTD = document.querySelector("[class*='pbButton']");
            topButtonsTD.insertBefore(copyButtonTop, topButtonsTD.childNodes[0]);

            var bottomButtonsTD = document.querySelector("[class*='pbButtonb']");
            bottomButtonsTD.insertBefore(copyButtonBottom, bottomButtonsTD.childNodes[0]);
        }
    }
}
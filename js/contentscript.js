init();

function init() {
    var url = new URL(window.location.href);
    var pathName = url.pathname;
    var validPage = false;
    var elementKey = '';
    var keyType = 'id';
    var buttonPos = 'both';
    var elementType = '';

    // Check if the current page is for 'Apex Class', 'Apex Trigger' or 'Visualforce Page'
    if (pathName != null && pathName != '' 
        && (pathName.startsWith('/066') || pathName.startsWith('/01p') || pathName.startsWith('/01q')
            || pathName.startsWith('/099') || pathName.startsWith('/00N') 
            || pathName.startsWith('/apexpages/setup/viewApexPage.apexp')
            || pathName.startsWith('/setup/build/viewApexClass.apexp') 
            || pathName.startsWith('/setup/build/viewApexTrigger.apexp') 
            || pathName.startsWith('/apexpages/setup/viewApexComponent.apexp'))) {

        if (!pathName.includes('/e') 
            && ((pathName.startsWith('/066') && pathName.length>15) 
                || pathName.startsWith('/apexpages/setup/viewApexPage.apexp'))
            && document.querySelector("[id*='codePanel']") != null) {

            // VF Page View Mode
            elementKey = document.querySelector("[id*='codePanel']").id;
            validPage = true;
        } else if (!pathName.includes('/e') 
            && ((pathName.startsWith('/099') && pathName.length>15) 
                || pathName.startsWith('/apexpages/setup/viewApexComponent.apexp'))
            && document.querySelector("[id*='codePanel']") != null) {

            // VF Component View Mode
            elementKey = document.querySelector("[id*='codePanel']").id;
            validPage = true;
        } else if ((pathName.startsWith('/01p') && pathName.length>15) 
            || pathName.startsWith('/setup/build/viewApexClass.apexp') 
            || pathName.startsWith('/setup/build/editApexClass.apexp')) {

            // Apex Class Page
            
            if (!pathName.includes('/e') && document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1] != null) {
                
                // Apex Class View Page
                elementKey = document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1].id;
                validPage = true;
            } else if (pathName.includes('/e') || pathName.startsWith('/setup/build/editApexClass.apexp')) {

                // Apex Class Edit Page
                elementKey = 'textarea';
                elementType = 'textarea';
                validPage = true;
                buttonPos = 'top';
            }
        } else if (!pathName.includes('/e') 
            && ((pathName.startsWith('/01q') && pathName.length>15) 
                || pathName.startsWith('/setup/build/viewApexTrigger.apexp'))
            && document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1] != null) {

            // Apex Trigger View Mode
            elementKey = document.querySelectorAll("[id*='codeBlockItem:codeTable:0']")[1].id;
            validPage = true;
        } else if (!pathName.includes('/e') 
            && (pathName.startsWith('/00N') && pathName.length>15) 
            && document.querySelector("[class*='last detailRow']") != null) {

            // Formula Field View Mode
            elementKey = 'last detailRow';
            keyType = 'class';
            validPage = true;
            buttonPos = 'top';
        }

        // If the page is valid for copy button add the Copy button and Event Script.
        if (validPage) {
            
            if (buttonPos =='both' || buttonPos == 'top') {
                // Create top button
                var copyButtonTop = document.createElement('input');
                copyButtonTop.setAttribute('id', 'CopyButtonTop');
                copyButtonTop.setAttribute('class', 'btn');
                copyButtonTop.setAttribute('type', 'button');
                copyButtonTop.setAttribute('value', 'Copy');

                // Add top button to page
                var topButtonsTD = document.querySelector("[class*='pbButton']");
                topButtonsTD.insertBefore(copyButtonTop, topButtonsTD.childNodes[0]);

                // Event listener for top button
                copyButtonTop.addEventListener("click", function() {
                    copyToClipboard(elementKey, keyType, elementType);
                });
            }

            if (buttonPos =='both' || buttonPos == 'bottom') {
                // Create bottom button
                var copyButtonBottom = document.createElement('input');
                copyButtonBottom.setAttribute('id', 'CopyButtonBottom');
                copyButtonBottom.setAttribute('class', 'btn');
                copyButtonBottom.setAttribute('type', 'button');
                copyButtonBottom.setAttribute('value', 'Copy');

                // Add bottom button to page
                var bottomButtonsTD = document.querySelector("[class*='pbButtonb']");
                bottomButtonsTD.insertBefore(copyButtonBottom, bottomButtonsTD.childNodes[0]);

                // Event listener for bottom button
                copyButtonBottom.addEventListener("click", function() {
                    copyToClipboard(elementKey, keyType, elementType);
                });
            }
        }
    }
}

function copyToClipboard(elementKey, keyType, elementType) {
    if (elementType == 'textarea') {
        var iframe = document.querySelector("[name*='codeeditor:buffer']");
        var tempInput = iframe.contentWindow.document.getElementById(elementKey);

        tempInput.select();
        iframe.contentWindow.document.execCommand("copy");
        alert("Code Copied!");
    } else {
        var tempInput = document.createElement("textarea"); 
        if (keyType == 'id') {
            var text = document.getElementById(elementKey).innerText.trim();
        } else if (keyType == 'class') {
            var text = document.querySelector("[class*= '" + elementKey + "']").innerText.trim();
        }
        tempInput.value = text.replace(/ /g, " "); 
        document.body.appendChild(tempInput);

        tempInput.select(); 
        document.execCommand("copy");
        tempInput.remove();
        alert("Code Copied!");
    }
}
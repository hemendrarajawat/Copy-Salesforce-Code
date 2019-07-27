chrome.storage.sync.get(null, function (data) {
    var returnData = getData(data);
    debugger;

    document.getElementById('editPageAvailable').checked = returnData.editPageAvailable;

    if (returnData.buttonPosition == 'first') {
        document.getElementById('buttonPosition').checked = true;
        document.getElementById('buttonPositionLabel').classList.add('checked');
    } else {
        document.getElementById('buttonPosition').checked = false;
        document.getElementById('buttonPositionLabel').classList.remove('checked');
    }
});

document.getElementById('editPageAvailable').onchange = function(input) {
    if (input.srcElement.checked) {
        set({
            editPageAvailable : true
        });
    } else {
        set({
            editPageAvailable : false
        });
    }
}

document.getElementById('buttonPosition').onchange = function(input) {
    if (input.srcElement.checked) {
        document.getElementById('buttonPositionLabel').classList.add('checked');

        set({
            buttonPosition : 'first'
        });
    } else {
        document.getElementById('buttonPositionLabel').classList.remove('checked');

        set({
            buttonPosition : 'last'
        });
    }
}
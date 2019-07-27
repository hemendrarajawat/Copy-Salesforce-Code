function getData(data) {
    var returnData = {};

    if (data.buttonPosition == null) {
        set({
            'buttonPosition' : 'first'
        });
        
        returnData.buttonPosition = 'first';
    } else {
        returnData.buttonPosition = data.buttonPosition;
    }

    if (data.editPageAvailable == null) {
        set({
            'editPageAvailable' : true
        });
        
        returnData.editPageAvailable = true;
    } else {
        returnData.editPageAvailable = data.editPageAvailable;
    }

    return returnData;
}

function set(data) {
    chrome.storage.sync.set(data);
}
//
var InitSettings = {
    "GLOBAL": {
        "AesKey" : '4ea5d5059fe13cd38e7f16a6c2f80ec6d976176b',
    },
    "APP": {
        "LoginName" 		: "AppLoginName",
        "CookieStorageName" : "RNT-APP",
    }
};

function AesDecryption(Data) {
    return JSON.parse(CryptoJS.AES.decrypt(Data, InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
}

function AesEncryption(Data) {
    return CryptoJS.AES.encrypt(JSON.stringify(Data), InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString();;
}

function ResponseValidation(ResData) {
    if (ResData.InvalidToken != undefined) {
        if (ResData.InvalidToken == true) {
            alert('Token expired OR Invalid session');
        }
    }
    return ResData;
}

function DataTableResponseValidation(ResData) {
    if (ResData.InvalidToken != undefined) {
        if (ResData.InvalidToken == true) {
            alert('Token expired OR Invalid session');
            return 	{
                'sEcho' 				: 0,
                'iTotalRecords' 		: 0,
                'iTotalDisplayRecords' 	: 0,
                'aaData' 				: {}
            };
        }
    }
    return ResData;
}

function GetFormData(FormId) {
    var ResData = new Object();
    var FormDataArr = $("#"+FormId).serializeArray();
    FormDataArr.forEach(function(Item) {
        ResData[Item.name] = Item.value;
    });
    return ResData;
}

function GetCurrTimezoneOffset() {
    var Dt = new Date();
    var TimezoneOffset = Dt.getTimezoneOffset();
    return TimezoneOffset;
}
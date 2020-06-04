/***
    RAT AngularJS App Main Script
***/
var AppSettings = { 
    'assetsPath'    : '../assets/',
    'globalPath'    : '../assets/global/',
    'layoutPath'    : '../assets/layouts/layout4/',
    'profilePath'   : '../assets/global/img/profile/',
    'PHPAPI'        : '../services/api.php'
};


/* Metronic App */
var RAT = angular.module("RAT", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "ngCookies",
    "ngCkeditor",
    "ngIdle",
    "RAT.Services"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
RAT.config(['$ocLazyLoadProvider'/*,'KeepaliveProvider', 'IdleProvider'*/, function($ocLazyLoadProvider/*, KeepaliveProvider, IdleProvider*/) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
    /*IdleProvider.idle(5);
    IdleProvider.timeout(30);
    KeepaliveProvider.interval(10);*/
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
RAT.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
RAT.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        //AesKey          : '476f616c446f6e65456e634b6579afcd',
        layout          : {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath      : '../assets/',
        globalPath      : '../assets/global/',
        layoutPath      : '../assets/layouts/layout4/',
        profilePath     : '../assets/global/img/profile/',
        fileIconsPath   : '../assets/global/img/file-icons/',
        PHPServicePath  : '../services/api.php'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* SET GLOBAL VARIBLES */
RAT.factory('GlobalVars', ['$rootScope', function($rootScope) { 
    var JWT        = "";
    var UserInfo   = {};
    var MenuAccess = {};
    var GlobalVars = {};

    GlobalVars.SetJWT = function(DataJWT) { 
        JWT =  DataJWT;
        $rootScope.gvJWT = DataJWT;
        return $rootScope.gvJWT;
    };
    GlobalVars.SetUserInfo = function(DataUserInfo) {        
		/*if(DataUserInfo['Dob'] == ''){
			DataUserInfo['Age'] = "-";
		} else {
			DataUserInfo['Age'] = DataUserInfo['Age'];
		}*/
		if(DataUserInfo['Gender'] == 'F' && DataUserInfo['ProfilePic']==''){
			DataUserInfo['ProfilePic'] = "../assets/global/img/profile/f.png";
		} else if(DataUserInfo['Gender'] == 'M' && DataUserInfo['ProfilePic']=='') {
			DataUserInfo['ProfilePic'] = "../assets/global/img/profile/m.png";
		} else if(DataUserInfo['Gender'] == 'U' && DataUserInfo['ProfilePic']=='') {
			DataUserInfo['ProfilePic'] = "../assets/global/img/profile/m.png";
		}
        $rootScope.gvUserInfo = DataUserInfo;
        //console.log(DataUserInfo);
        return $rootScope.gvUserInfo;
    };
	
	GlobalVars.CalculateAge = function CalculateAge(DateString) {
		var Birthday = +new Date(DateString);
		return ~~((Date.now() - Birthday) / (31557600000));
	}
    
    $rootScope.GlobalVars = GlobalVars;
    return GlobalVars;

}]);

/* Setup App Main Controller */
RAT.controller('AppCtrl', ['$scope', '$rootScope', '$filter', 'Idle', '$cookies', '$cookieStore', '$window', 'GlobalVars', function($scope, $rootScope, $filter, Idle, $cookies, $cookieStore, $window, GlobalVars, $timeout) {
    
    // APP DEFAULT IDLE TIME 
    $scope.idle             = 300;
    $scope.timeout          = 15;
    $scope.IdleTimeCount    = 0;

    $rootScope.DeleteBroadcastFun   = "";
    $rootScope.DeleteConfirmMsg     = "Are you sure do you want to delete the selection?";

    $rootScope.UserAcc = [];
    // AES DATA DECRYPTION 
    $scope.AesDecryption = function(Data) {
        return JSON.parse(CryptoJS.AES.decrypt(Data, InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
    }

    $scope.AesEncryption = function(Data) {
        return CryptoJS.AES.encrypt(JSON.stringify(Data), InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString();;
    }

    // VALIDATE SESSION DATA 
    $scope.CookieValidation = function() {
        var StorageData =  $cookieStore.get(InitSettings.APP.CookieStorageName, {path:'/'});
		//console.log(StorageData);
        // CHECK COOKIES DATA FOR LOGIN VALIDATION
        if(StorageData == undefined || StorageData === "") {
            $window.location.href= "index.html";
            return;
        }
        GlobalVars.SetJWT(StorageData.JWT);
        GlobalVars.SetUserInfo($scope.AesDecryption(StorageData.UserInfo));

        /*var IdleData = $scope.AesDecryption(StorageData.IdleTime);
        $scope.idle     = parseInt(IdleData.IdleTime);
        $scope.timeout  = parseInt(IdleData.TimeOut);*/
    }
	
	$scope.UpdateStorageInfo = function(StorageType, DataObj) {
        var StorageData =  $cookieStore.get(InitSettings.APP.CookieStorageName, {path:'/'});
        StorageData[StorageType] = $scope.AesDecryption(StorageData[StorageType]);
        angular.forEach(DataObj, function(Value, Index){
            StorageData[StorageType][Index] = Value
        });

        if(StorageType == "JWT")
            GlobalVars.SetJWT(StorageData[StorageType]);
        else if(StorageType == "UserInfo")
            GlobalVars.SetUserInfo(StorageData[StorageType]);



        StorageData[StorageType] = $scope.AesEncryption(StorageData[StorageType]);
		
        $cookies.putObject(InitSettings.APP.CookieStorageName, StorageData, {path:'/'});
    }
    
    $scope.CookieValidation();

    $scope.$on('$viewContentLoaded', function() {
        //$scope.UpdateStorageData('UserInfo', {FirstName: "Thiru", LastName: "Murugan"});
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 

        // FORM ACTION STATUS 
        $scope.ActionStatus = {"Status": "", "Msg": ""};
        $scope.ShowStatus = function(Status, Msg) {
            if(Status == "S")
                $scope.ActionStatus.Status = "Success";
            else if(Status == "E")
                $scope.ActionStatus.Status = "Error";
            else if(Status == "I")
                $scope.ActionStatus.Status = "Info";
            else
                $scope.ActionStatus.Status = "Warning";

            //$scope.$apply(function(){
                $scope.ActionStatus.Msg = Msg;
            //})
            $("#ActionStatus").toggleClass("hide");
            setTimeout(function() {
                $("#ActionStatus").toggleClass("hide");
            }, 7000 );
        }

        // DATA TABLE CHECK BOX CHECKED AND UNCHECKED FUNCTION
        $scope.DataTableCheckBoxSelecteIDs = function (CheckBoxName) {
            var SelectedIDs = [];
            $("input[name='"+CheckBoxName+"[]']:checked").each( function() {
                SelectedIDs.push(parseInt($(this).val()));
            }); 
            return SelectedIDs;
        }

        // DATA TABLE CHECK BOX CHECKED AND UNCHECKED FUNCTION
        $scope.DataTableCheckBoxSelecteAll = function (CheckBoxName, CheckedStatus) {
            $("input[name='"+CheckBoxName+"[]']").each( function() {
                $(this).prop( "checked", CheckedStatus);
            }); 
            return $scope.DataTableCheckBoxSelecteIDs(CheckBoxName);
        }

        //PATIENT SEND REFERRAL CHECK BOX CHECKED AND UNCHECKED FUNCTION
        $scope.CheckBoxSelectedVal = function (CheckBoxName) {
            var SelectedVals = [];
            $("input[name='"+CheckBoxName+"[]']:checked").each( function() {
                SelectedVals.push($(this).val());
            }); 
            return SelectedVals;
        }

        $scope.CheckBoxSelectedAll = function (CheckBoxName, CheckedStatus) {
            $("input[name='"+CheckBoxName+"[]']").each( function() {
                $(this).prop( "checked", CheckedStatus);
            }); 
            return $scope.CheckBoxSelectedVal(CheckBoxName);
        }

        /*** DELETE CONFIRM BOX FUNCTIONS ***/        
        $rootScope.DelConfirmBox = function(DeleteBroadcastFun, DeleteConfirmMsg) {
            if(DeleteConfirmMsg === undefined)
                $rootScope.DeleteConfirmMsg = "Are you sure do you want to delete the selection?";
            else
                $rootScope.DeleteConfirmMsg = DeleteConfirmMsg;

            $('#DelConfirmBox').modal('show');
            $rootScope.DeleteBroadcastFun = DeleteBroadcastFun;
        }
        //CALL CHILD CONTROLER DELETE CONFIRM YES FUNCTION 
        $scope.DelConfirmBoxYes = function() {
            $scope.$broadcast($rootScope.DeleteBroadcastFun);
            $('#DelConfirmBox').modal('hide');
        }
        $scope.DelConfirmBoxNo = function() { // CLOSE THE CONFIRM POPUP
            $('#DelConfirmBox').modal('hide');
        }

        //$scope.AuditLogInfo = {};
        $scope.$on('ShowAuditLog', function(event, AuditLogInfo) {
            $scope.$apply(function() {
                $scope.AuditLogInfo = AuditLogInfo;
            });
            $('#ViewAuditLog').modal('show');
        });

        // SESSION EXPIRING FUNCTUIONS
        $scope.SessionJWT = $rootScope.gvJWT;
       /* $scope.$on('IdleStart', function() {
            $("#SessionExpiring").modal('show');
        });
        $scope.$on('IdleEnd', function() {
             $("#SessionExpiring").modal('hide');
        });
        $scope.$on('IdleWarn', function(e, CountDown) {
           
            $scope.$apply(function(){
                $scope.IdleTimeCount = CountDown;
            });
           if(CountDown == 1) {
                $scope.CloseSessionExpiring();
                $("#SessionOut").modal('show');
                $cookies.remove(InitSettings.APP.CookieStorageName, {path:'/'});

            }
            
        });*/

        /*$scope.$watch('idle', function(value) {
            if (value !== null) 
                Idle.setIdle(value);
        });

        $scope.$watch('timeout', function(value) {
            if (value !== null) 
                Idle.setTimeout(value);
        });*/
        /*$scope.CloseSessionExpiring = function() {
            $("#SessionExpiring").modal('hide');
        }
        $scope.ResetSessionExpiring = function() {
            $("#SessionExpiring").modal('hide');
            Idle.watch();
        }
        $scope.ToggleSessionExpiredLogin = function() {
            $(".SessionExpiredToggler" ).slideToggle("slow");
            $(".SessionExpiredToggler").removeClass('hide');

            $('.modal-footer.SessionExpired').addClass('hide');
            $('.modal-footer.SessionLogin').removeClass('hide');
        }*/

      /*  $scope.SessionExpiredLogin = function() {
            var Dt = new Date();
            var TimezoneOffset = Dt.getTimezoneOffset();

            var Parms = {"FunctionName":"SessionLogin", "TimezoneOffset":TimezoneOffset, "Password":$scope.SessionPass, "JWT": $rootScope.gvJWT }
            Ajax({
                url     : $rootScope.settings.PHPServicePath+'account/account.php',
                type    : 'POST',
                data    : Parms,
                success : function(Res) {
                    var ResData = AesDecryption(Res);
					//console.log(ResData['StorageData']);
                    if(ResData.Status == 'S') {
                        $cookies.putObject(InitSettings.APP.CookieStorageName, ResData['StorageData'], {path:'/'});
                        $("#SessionOut").modal('hide');
                        $("#LockScreen").modal('hide');
                        $scope.SessionPass = "";
                        Idle.watch();
                        $rootScope.UpdateLockStatus(false);
                    }
                    else {
                        $('.SessionLoginError').removeClass('hide');
                    } 
                }
            });
        }*/

        $scope.ValidateForm = function(FormName) {
            var IsFocusedErr = false;
            angular.forEach(FormName, function(control, name) {
                if (typeof name === 'string' && name.charAt(0) !== '$') {
                    control.$setTouched();
                    control.$setDirty();
                    control.$validate();
                    if(control.$invalid && !IsFocusedErr) {
                        //$('#ReferralName').focus();
                        console.log(name);
                    }

                    //console.log(name);
                }
            });
        }

        $rootScope.UpdateLockStatus = function(LockStatus) {
            if(LockStatus == true)
                Idle.unwatch();
            else
                Idle.watch();
        };
    });

   /* $scope.$watch("SessionPass", function() {
        $('.SessionLoginError').addClass('hide');
    });*/

    $rootScope.GetFileExt = function(file) {
        return (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
    };        
    $rootScope.FormatFileSize = function(FileSize) {
        if (FileSize / 1024 > 1) {
            if (((FileSize / 1024) / 1024) > 1) {
                FileSize = (Math.round(((FileSize / 1024) / 1024) * 100) / 100);
                var ActualFileSize = FileSize + " GB";
            } else {
                FileSize = (Math.round((FileSize / 1024) * 100) / 100)
                var ActualFileSize = FileSize + " MB";
            }
        } else {
            FileSize = (Math.round(FileSize * 100) / 100)
            var ActualFileSize = FileSize  + " KB";
        }
        return ActualFileSize;
    };

    $rootScope.GetFileIcon = function(FileExtension) {
        var FileIcon;
        if( FileExtension == "3gp"){ FileIcon = '3gp.png'; }
        else if( FileExtension == "avi"){ FileIcon = 'avi.png'; }
        else if( FileExtension == "bmp"){ FileIcon = 'bmp.png'; }
        else if( FileExtension == "css"){ FileIcon = 'css.png'; }
        else if( FileExtension == "doc" || FileExtension == "docx" || FileExtension == "rtf" ){ FileIcon = 'doc.png'; }
        else if( FileExtension == "flv" ){ FileIcon = 'flv.png'; }
        else if( FileExtension == "gif" ){ FileIcon = 'gif.png'; }
        else if( FileExtension == "jpg" || FileExtension == "jpeg" ){ FileIcon = 'jpg.png'; }
        else if( FileExtension == "mdb" ){ FileIcon = 'mdb.png'; }
        else if( FileExtension == "mp3" ){ FileIcon = 'mp3.png'; }
        else if( FileExtension == "mp4" ){ FileIcon = 'mp4.png'; }
        else if( FileExtension == "mpg" ){ FileIcon = 'mpg.png'; }
        else if( FileExtension == "pdf" ){ FileIcon = 'pdf.png'; }
        else if( FileExtension == "png" ){ FileIcon = 'png.png'; }
        else if( FileExtension == "ppt" || FileExtension == "pptx" ){ FileIcon = 'ppt.png'; }
        else if( FileExtension == "rar" ){ FileIcon = 'rar.png'; }
        else if( FileExtension == "txt" ){ FileIcon = 'txt.png'; }
        else if( FileExtension == "wma" ){ FileIcon = 'wma.png'; }
        else if( FileExtension == "wmv" ){ FileIcon = 'wmv.png'; }
        else if( FileExtension == "xls" || FileExtension == "xlsx"  ){ FileIcon = 'xls.png'; }
        else if( FileExtension == "zip" ){ FileIcon = 'zip.png'; }
        else {  FileIcon = 'unknown.png'; }

        return $rootScope.settings.fileIconsPath + FileIcon;
    };

    /* DATE VALIDATIONS  */
    $scope.DateIsLessThanCurrDate = function(SelectedDate, ErrMsg) {
        var Today = $filter('date')(new Date(), "MM/dd/yyyy");
        if(new Date(SelectedDate) < new Date(Today)) {
            if(ErrMsg != undefined)
                // $scope.ShowStatus("E", ErrMsg);
            return true;
        }
        if(new Date(SelectedDate) >= new Date(Today)) 
            return false;
    }

    $scope.DateIsGreaterThanCurrDate = function(SelectedDate, ErrMsg) {
        var Today = $filter('date')(new Date(), "MM/dd/yyyy");
        console.log(new Date(SelectedDate) +" > "+ new Date(Today));

        if(new Date(SelectedDate) > new Date(Today)) {
            console.log(ErrMsg);
            if(ErrMsg != undefined)
                // $scope.ShowStatus("E", ErrMsg);
            return true;
        }
        if(new Date(SelectedDate) <= new Date(Today)) 
            return false;
    }

    $scope.DateIsLessThanStartDate = function(StartDate, EndDate) {
        if(new Date(EndDate) < new Date(StartDate)) {
            return true;
        }
        if(new Date(EndDate) >= new Date(StartDate)) 
            return false;
    }

    $scope.GetDayInWeek = function(SelectedDate) {
        var Dt = new Date(SelectedDate);
        var WeekDay = Dt.getDay();
        var Day = "";
        switch(WeekDay) {
            case(0):
                Day = "SUNDAY";
                break;
            case(1):
                Day = "MONDAY";
                break;
            case(2):
                Day = "TUESDAY";
                break;
            case(3):
                Day = "WEDNESDAY";
                break;
            case(4):
                Day = "THURSDAY";
                break;
            case(5):
                Day = "FRIDAY";
                break;
            case(6):
                Day = "SATURDAY";
                break;
        }
        return Day;
    }

    $scope.IsWeekEnd = function(SelectedDate) {
        var Dt = new Date(SelectedDate);
        var WeekDay = Dt.getDay();
        if(WeekDay == 0 || WeekDay == 6)
            return true;
        return false;
    }

    //APPLICATION LOGOUT
    $scope.LogOut = function() {
        // CLEAR SESSION DATA
        $cookies.remove(InitSettings.APP.CookieStorageName, {path:'/'});
        window.location.href = 'index.html'; 
    };

    $rootScope.$on('$stateChangeStart', function (Event, ToState, ToParams, FromState, FromParams) {
        // if route requires auth and user is not logged in
        /*if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
        // redirect back to login
            $location.path('/login');
        }*/
        /*console.log(to);
        console.log(toParams);
        console.log(from);
        console.log(fromParams);*/

        //Event.preventDefault();
        //$state.go('login');



    });

    /*$rootScope.$on('$stateChangeStart', function (event, next, current) {
        // if route requires auth and user is not logged in
        if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
            // redirect back to login
            $location.path('/login');
        }

        console.log(current);
        console.log($rootScope.UserAcc);
    });
*/
    $scope.LoadUserAcc = function(){
        console.log("LoadUserAcc")
        var Parms = {FunctionName: 'UserMenuAccess'};
        Ajax({
            url      : $rootScope.settings.PHPServicePath+'account/account.php',
            type     : 'POST',
            data     : Parms,
            success  : function(Res) {
                var JsonData = AesDecryption(Res);
                console.log(JsonData);
                $scope.$apply(function() {
                    $rootScope.LeftMenu = JsonData.LeftMenu;
                    $rootScope.UserAcc  = JsonData.UserAcc;
                });

                setTimeout(function() {
                    Layout.initSidebar(); // init sidebar
                }, 500)
            }
        }); 
    }

}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
RAT.controller('HeaderCtrl', ['$scope', '$rootScope', '$cookies', '$cookieStore', function($rootScope, $scope, $cookies, $cookieStore, UserS, AppMenuS, UserTypeS, $http, $timeout) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });

    $scope.FormData  = {};

    $scope.ErrorMsg = '';
    $scope.ShowErrorMsg = false;

    //SUBMIT FORM
    $scope.FormSubmit = function(isValid) {
            $scope.FormData.EndPoint = 'Account/Authenticate/changepassword';
            if(isValid) {
            Ajax({
                data    : $scope.FormData,
                success : function(Res) {
                     if (!Res['S']) {
                        $scope.ShowErrorMsg = true;
                        $scope.ErrorMsg = Res['M'];
                    } else {
                        alert("Password Change Successfully");
                        $scope.FormReset();
                    }                            
                    $scope.$apply();   
                }
            });
        }
    }
    $scope.ShowModal = function() {
        $('#Changepassword').modal('show');
    }

    $scope.FormReset = function() {
        $scope.FormData ={};
        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;
        location.reload();
        // $scope.FrmChangePassword.$submitted = false;
        // $scope.FrmChangePassword.$setPristine();
        // $scope.FrmChangePassword.$setUntouched();
        $('#Changepassword').modal('hide');
    };
}]);

/* Setup Layout Part - Sidebar */
RAT.controller('LeftSidebarCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    //$scope.LeftMenu = [];
    /*$scope.LoadLeftMenu = function(){
        var Parms = {FunctionName: 'UserMenuAccess'};
        Ajax({
            url      : $rootScope.settings.PHPServicePath+'account/account.php',
            type     : 'POST',
            data     : Parms,
            success  : function(Res) {
                var JsonData = AesDecryption(Res);
                $scope.$apply(function() {
                    $scope.LeftMenu     = JsonData.LeftMenu;
                    $rootScope.UserAcc  = JsonData.UserAcc;
                });

                setTimeout(function() {
                    Layout.initSidebar(); // init sidebar
                }, 500)
            }
        }); 
    }*/

    $scope.$on('$includeContentLoaded', function() {
        //Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Sidebar */
RAT.controller('PageHeadCtrl', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Quick Sidebar */
RAT.controller('QuickSidebarCtrl', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
RAT.controller('ThemePanelCtrl', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
RAT.controller('FooterCtrl', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Init global settings and run the app */
RAT.run(["$rootScope", "settings", "$state", "Idle", function($rootScope, settings, $state, Idle) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    Idle.watch();
}]);

// COMMON AJAX CALL
var Ajax = function(Options) {
    App.startPageLoading();

    var JWT = GetAppJWT();
    if(Options.type == null)
        Options.type = 'POST';
    if(Options.data == null)
        Options.data = {};

    var Path = window.location.pathname;
    Options.url = window.location.origin + Path.replace('/app/', '/services/').replace('home.html', '') + 'api.php';

    if (Options.data instanceof FormData || ($.type(Options.data) === "object" && Options.files != null && Options.files != '')) {
        if (!(Options.data instanceof FormData) && Options.data != null) {
            var frmData = new FormData();
            $.each(Options.data, function(key) {
                frmData.append(key, Options.data[key]);
            });
            $.each(Options.files, function(key) {
                frmData.append(key, Options.files[key]);
            });
            Options.data = frmData;
            delete Options.files;
        }
        Options.data.append('JWT', JWT);
        Options.contentType = false;
        Options.processData = false;
        Options.dataType = 'json';
    } else if ($.type(Options.data) === "array")
        Options.data['JWT'] = JWT;
    else if ($.type(Options.data) === "object" && (Options.files == null || Options.files == ''))
        Options.data['JWT'] = JWT;
    else
        Options.data = Options.data+"&JWT="+JWT;
    
    if(Options.success != null){
        var tempSuccess = Options.success;
        Options.success = function(Res) {
            App.stopPageLoading(); // HIDE PRE-LOADER 
            var ResData = Res;
            if(ResData != null) {
                //ResponseValidation(AesDecryption(Res));
                if (!jQuery.isPlainObject(ResData)) {
                    if (IsJsonString(ResData)) {
                            ResData = $.parseJSON(ResData);
                            /*if(ResData.InvalidToken != undefined) {
                                if(ResData.InvalidToken == true) {
                                    alert('Token expired OR Invalid session')
                                    //window.location.href = '../index.html';
                                    //return;
                                }
                            }*/
                    }
                } 
            }
            tempSuccess(ResData);
        };
    }
    /*
    if(Options.data.length != 0) {
        //var PostData = Options.data;
        var PostData = {"PostData": AesEncryption(Options.data)};
        Options.data = PostData;
        //console.log(Options.data);
    }*/
    return $.ajax(Options);
}

function GetAppJWT() {
    var $rootScope = angular.element(document).injector().invoke(function($rootScope){return $rootScope;});
    return $rootScope.gvJWT;
}

function IsJsonString(JsonStr) {
    try {
        JSON.parse(JsonStr);
    } catch (e) {
        console.log("JSON ERROR ! \n"+JsonStr);
        return false;
    }
    return true;
}

/*function AesEncryption(Data) {
    return CryptoJS.AES.encrypt(JSON.stringify(Data), InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString();
}

function AesDecryption(Data) {
    return JSON.parse(CryptoJS.AES.decrypt(Data, InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
}*/
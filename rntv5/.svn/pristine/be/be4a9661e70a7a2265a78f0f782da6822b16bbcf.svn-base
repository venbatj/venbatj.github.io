angular.module('RAT').controller('MyProfileCtrl', function($rootScope, $scope) {
    
    $scope.$on('$viewContentLoaded', function() {   
        
	});
    
});


// angular.module('RAT').controller('MyProfileCtrl', function($rootScope, $scope, UserS, $timeout) {
 
//     $scope.MyProfile   = [];
//     $scope.FormData    = [];
//     $scope.ProfileTempImg = $scope.gvUserInfo.ProfilePic;
	

//     $scope.$on('$viewContentLoaded', function() {   
//         var Parms = {'FunctionName':'GetUsetInfoByID'};
//         Ajax({
//             url     : $rootScope.settings.PHPServicePath+'app-manager/user-setting/my-profile.php',
//             type    : 'POST',
//             data    : Parms,
//             success : function(Res) {
//                 var Output = AesDecryption(Res);
//                 console.log(Output);
//                 $scope.$apply(function() {
// 					$scope.MyProfile = Output;
//                     $scope.FormData  = Output;
                   
// 				   $scope.MyProfile['GenderLabel'] = UserS.GetGenderLabel(Output['Gender']);

// 					var $CodeOption = $("<option></option>").val(Output.City).text(Output.CityName);
// 					$("#CityName").append($CodeOption);
// 					$("#CityName").val(Output.City).trigger('change.select2');
					
// 					var $CodeOption = $("<option></option>").val(Output.State).text(Output.StateName);
// 					$("#StateName").append($CodeOption);
// 					$("#StateName").val(Output.State).trigger('change.select2');

//                 });
//             }
//         });       
//     });
	
// 	$scope.CalculateAge = function CalculateAge(DateString) {
//         var Birthday = +new Date(DateString);
//         return ~~((Date.now() - Birthday) / (31557600000));
// 	}

//     $scope.FormSubmit = function(isValid) {
//         if(isValid) {
//             var Parms = $scope.MyProfile;
//             console.log(Parms);
//             Parms['FunctionName'] = 'UpdateProfileInfo';

//             Ajax({
//                 url     : $rootScope.settings.PHPServicePath+'app-manager/user-setting/my-profile.php',
//                 type    : 'POST',
//                 data    : Parms,
//                 success : function(Res) {
//                     var Output = AesDecryption(Res);
// 					console.log(Output);
//                     if (Output['Status'] == 'S') {
// 						$scope.UpdateStorageInfo("UserInfo", Output['StorageData']);

//                         $scope.ShowStatus("S", "My Profile Modified Successfully");
//                         $scope.PageToggler();
//                     }
//                     else if(Output['Status'] == 'E')
//                         $scope.ShowStatus("E", "My Profile Already Exist");
//                 }
//             });
//         }
//     }

//     $scope.InputMask = function() {
//         $("#ZipCode").inputmask("999-99",{placeholder:" "})
//         $("#Mobile").inputmask("mask", {mask:"(999) 999-9999"})
//         $("#Dob").inputmask("mm/dd/yyyy",{placeholder:"mm/dd/yyyy"})
//         $("#Fax").inputmask("mask", {mask:"(999) 999-9999"})
//         $("#Phone").inputmask("mask", {mask:"999-9999"})
//         $("#PhoneExt").inputmask("9999",{placeholder:" "})
//     }
// 	$scope.InputMask();
//     $('#CityName').select2({
//         placeholder: 'Select a City',
//         allowClear: true,
//         width: 'off',
//         ajax: {
//             url     : $rootScope.settings.PHPServicePath+'masters/drop-down-master.php',
//             type    : 'POST',
//             //dataType: 'json',
//             delay: 250,
//             data: function(params) {
//                 return {
//                     'FunctionName'      : 'GetCityDropdown',
//                     'CityName'          : params.term, // search term
//                     'JWT'               : $rootScope.gvJWT
//                 };
//             },
//             processResults: function(data, page) {
//                 data = AesDecryption(data);
//                 var OpData = $.map(data, function (obj) {
//                     obj.id   = obj.id || obj.RefID; 
//                     obj.name = obj.name || obj.CityName;
//                     obj.text = obj.name;
//                     return obj;
//                 });
               
//                 $('#CityName :selected').text(data);
//                 return { results: OpData };
//             },
//             cache: true
//         },
//         escapeMarkup: function(markup) {
//             return markup;
//         }, // let our custom formatter work
//         minimumInputLength: 2,
//         templateResult: FormatOption,
//         templateSelection: FormatRepoSelection
//     });

//     $('#StateName').select2({
//         placeholder: 'Select a State',
//         allowClear: true,
//         width: 'off',
//         ajax: {
//             url     : $rootScope.settings.PHPServicePath+'masters/drop-down-master.php',
//             type    : 'POST',
//             //dataType: 'json',
//             delay: 250,
//             data: function(params) {
//                 return {
//                     'FunctionName'      : 'GetStateDropdown',
//                     'StateName'         : params.term, // search term
//                     'JWT'               : $rootScope.gvJWT
//                 };
//             },
//             processResults: function(data, page) {
//                 data = AesDecryption(data);
//                 var OpData = $.map(data, function (obj) {
//                     obj.id   = obj.id || obj.RefID; 
//                     obj.name = obj.name || obj.StateName;
//                     obj.text = obj.name;
//                     return obj;
//                 });
               
//                 $('#StateName :selected').text(data);
//                 return { results: OpData };
//             },
//             cache: true
//         },
//         escapeMarkup: function(markup) {
//             return markup;
//         }, // let our custom formatter work
//         minimumInputLength: 2,
//         templateResult: FormatOption,
//         templateSelection: FormatRepoSelection
//     });


//     function FormatOption(Item) {
//         if (Item.loading) return Item.text.id;
//         var markup = "<span>"+Item.name+"</span>";
//         return markup;
//     }

//     function FormatRepoSelection(repo) {
//         return repo.name || repo.text;
//     }


//     $scope.PageToggler = function() {
//         $(".ui-page-toggler" ).slideToggle("slow");
//         $('.ui-page-toggler').removeClass('hide');
//     }
//     $scope.ShowListPage = function() {
//         $scope.PageToggler();
//         $scope.FormReset();
//     }
//     $scope.ShowAddForm = function() {
//         $scope.PageToggler();
//     }
	
// 	/*$scope.FormReset = function(selector) {
//         $scope.FormData = angular.copy({"RefID" : 0 });
//         $scope.FrmMyProfile.$submitted = false;
//         $scope.FrmMyProfile.$setPristine();
//         $scope.FrmMyProfile.$setUntouched();

//         // CLEAR SELECTED CHECKBOX IN DATATABLE
//         $scope.TblSelectAll = false;
//         $scope.SelectedIDs = $scope.DataTableCheckBoxSelecteAll('TblMyProfile', $scope.TblSelectAll);

//         //DATADATA RELOAD
//         dTable.draw();
//         $scope.$apply();
//     };*/

//     // set sidebar closed and body solid layout mode
//     $rootScope.settings.layout.pageContentWhite = true;
//     $rootScope.settings.layout.pageBodySolid = false;
//     $rootScope.settings.layout.pageSidebarClosed = false;

    

//     /* PROFILE FILE UPLOAD */
//     $scope.OpenFilePicker = function() {
//         $timeout(function(){
//             angular.element('#FileAttachments').click();
//         }, 100);
//     };
    
//     $scope.FileSelected = function(event) {
//         var Reader = new FileReader();
//         Reader.onload = function(event) {
//             $scope.ProfileTempImg = event.target.result; 
//         }
//         Reader.readAsDataURL(event.target.files[0]);
        
//         $scope.SelectedFile = event.target.files[0];
//         $("#ProfileImgUploadeBar").removeClass("hide");
//         $(".fileinput-button").addClass("hide");

//     }
//     $scope.ClearImage = function() {
//         $("#ProfileImgUploadeBar").addClass("hide");
//         $(".fileinput-button").removeClass("hide");
//         $scope.ProfileTempImg = $scope.gvUserInfo.ProfilePic;
//     }

//     $scope.UploadImage = function() {
//         App.startPageLoading();
//         var PostData = new FormData();
//         PostData.append("JWT", $rootScope.gvJWT);
//         PostData.append("FunctionName", "UploadImageFromUser");

//         $.each($scope.FormData, function(key) {
//             PostData.append(key, $scope.FormData[key]);
//         });
//         PostData.append('ProfilePic', $scope.SelectedFile);

//         $.ajax({
//             url         : $rootScope.settings.PHPServicePath+'app-manager/user-setting/my-profile.php',
//             type        : 'POST',
//             data        : PostData,
//             cache       : false,
//             dataType    : 'text',
//             processData : false, // Don't process the files
//             contentType : false, // Set content type to false as jQuery will tell the server its a query string request
//             success: function(Res) {
//                 App.stopPageLoading();
//                 var ResData = AesDecryption(Res);

//                 if(ResData.Status == "S") {
//                     $scope.UpdateStorageInfo("UserInfo", {"ProfilePic": ResData.ProfilePic});
//                     $("#ProfileImgUploadeBar").addClass("hide");
//                     $(".fileinput-button").removeClass("hide");
//                 }
//             }
//         });
//     };

// });
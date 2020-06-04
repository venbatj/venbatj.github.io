angular.module('RAT').controller('AppCtrl', function($rootScope, $scope) {
    // SCOPE VARIBLES
    $scope.frontcard = true;
    $scope.commoncard = false;
    $scope.backcard = false;
    $scope.FormData         = {"ID" : 0, "Type" :'Idea'};
    $scope.getfbType = function(type) {
        $scope.FormData.Type = type;
        console.log(type);
        $("."+ type).css("borderBottom", "2px solid #ddba76");
    }
    $scope.nextPage = function(feedback) {
        console.log(feedback);
        if(feedback) {
            $scope.FormData.Feedback = feedback; 
            $scope.frontcard = false;
            $scope.commoncard = true;
            $scope.backcard = false;
        }else {
            $('.body-fb, .fb-media').css("background", "#f36");
            setTimeout(function() {
                $('.body-fb, .fb-media').css("background", "#fff");
            }, 100);
        }
    }
    $scope.backtomain = function() {
        $scope.frontcard = true;
        $scope.commoncard = false;
        $scope.backcard = false;
        $scope.FormData = {};
    }
    

    $scope.submitFeedback = function(isValid) {
        if(isValid) {
            $scope.commoncard = false;
            $scope.frontcard = false;
            $scope.backcard = true;
            var Parms = $scope.FormData;
          Ajax({
              data: {
                  EndPoint: 'Masters/Country/submitFeedback',
                  data:Parms
              },
              success: function(Res) {
              }
          });
        }
  }
    $scope.backtofrontfb = function() {
        $scope.frontcard = true;
        $scope.commoncard = false;
        $scope.backcard = false;
    }
    
    $scope.showfeedback = function() {
        // $('#ViewFeedbackblog').modal('show');
        $('#ViewFeedback').modal('show');
    }
});
// /**
//  * Category Controller
//  * @namespace Controllers
//  */
// (function() {
//     'use strict';

//     angular.module('RAT').controller('Category', Category);

//     /**
//      * @namespace Category
//      * @desc Category Controller
//      * @memberOf Controllers
//      */
//     function Category($rootScope, $scope, DataTableS) {
//         $scope.$on('$viewContentLoaded', function() {            
//             loadListPage();
//         });

//         // Declarations and assumptions
//         $scope.FormData = {};
//         $scope.FormCategory = {};

//         $scope.ErrorMsg = '';
//         $scope.ShowErrorMsg = false;

//         $scope.formSubmit = formSubmit;
//         $scope.formClear = formClear;
//         $scope.deleteArray = [];
        
//         var oTable = null;

//         $scope.showSaveAlert = function() {
//             $('#save-category').modal('show');
//         }

//         // Function definitions

//         /**
//          * @name loadListPage
//          * @desc Called on $viewContentLoaded
//          * @memberOf Controllers.Category
//          */
//         function loadListPage() {
//             var DTProps = DataTableS.getDefaults();
//             DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
//             DTProps.fnServerParams = function(aoData) {  
//                 aoData.push(  
//                     { 'name': 'EndPoint', 'value': 'Masters/Category/getDataByPage'},
//                     { 'name': 'JWT', 'value': $rootScope.gvJWT}
//                 );
//             };
//             DTProps.order = [[1, 'asc']];
//             DTProps.columns = [
//                 { data: null, defaultContent: '', class: 'check-box-column' },
//                 { data: 'CategoryName' },
//                 { data: 'Description' },
//                 { data: null, defaultContent: '', class: 'action-column'}
//             ];
//             DTProps.rowCallback = function(Row, Data) {
//                 DataTableS.createCheckBoxColumn(Row, Data['ID']);
//                 DataTableS.createEditActionColumn(3, Row, Data['ID'], editCategory);                
//             };
//             oTable = $('#category-data-table').DataTable(DTProps);
//             DataTableS.checkBoxEvents('#category-data-table');
//             DataTableS.onDeleteClick('#category-data-table', function(RefArr) {
//                 deleteCategory(RefArr);
//             });
//         }

//         /**
//          * @name editCategory
//          * @desc Called on click of edit icon in data table
//          * @memberOf Controllers.Category
//          */
//         function editCategory(ID) {
//             Ajax({
//                 data: {
//                     EndPoint: 'Masters/Category/getDataByID',
//                     ID: ID
//                 },
//                 success: function(Res) {
//                     if (Res['S']) {
//                         $scope.FormData = Res['D'];
//                         $scope.$apply();
//                     }
//                 }
//             });
//         }        
       
//         /**
//          * @name deleteCategory
//          * @desc Called on click of delete icon in data table
//          * @memberOf Controllers.Category
//          */
//         function deleteCategory(IDArray) {
//             $scope.deleteArray = IDArray;
//             $rootScope.DelConfirmBox('onClickCategoryDeleteConfirmBoxOk');
//         }

//         $scope.$on('onClickCategoryDeleteConfirmBoxOk', function(event, obj) {
//             Ajax({
//                 data: {
//                     EndPoint: 'Masters/Category/remove',
//                     IDArr: $scope.deleteArray
//                 },
//                 success: function(Res) {
//                     if (Res['S'] && Res['D']) {
//                         oTable.draw();

//                         if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
//                             formClear();                            
//                         }

//                         DataTableS.resetDelete('#category-data-table');
//                         $scope.deleteArray = [];
//                         $scope.$apply();
//                     }
//                 }
//             });
//         });

//         /**
//          * @name formSubmit
//          * @desc Called on click of save button in form
//          * @memberOf Controllers.Category
//          */
//         function formSubmit(isValid) {
//             $scope.FormData.EndPoint = 'Masters/Category/insertUpdate';

//             if (isValid) {
//                 Ajax({
//                     data: $scope.FormData,
//                     success: function(Res) {
//                         if (!Res['S']) {
//                             $scope.ShowErrorMsg = true;
//                             $scope.ErrorMsg = Res['M'];
//                         } else {
//                             $scope.showSaveAlert();
//                             formClear();
//                             oTable.draw();
//                         }                            
//                         $scope.$apply();    
//                     }
//                 });
//             }            
//         }

//         /**
//          * @name formSubmit
//          * @desc Called to clear the form, restore the defaults
//          * @memberOf Controllers.Category
//          */
//         function formClear() {
//             $scope.ErrorMsg = '';
//             $scope.ShowErrorMsg = false;
//             $scope.FormData = {};

//             $scope.FormCategory.$submitted = false;
//             $scope.FormCategory.$setPristine();
//             $scope.FormCategory.$setUntouched();
//         }
//     }

//     Category.$inject = ['$rootScope', '$scope', 'DataTableS'];
// })();
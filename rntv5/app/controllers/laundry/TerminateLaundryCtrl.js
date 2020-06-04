
    angular.module('RAT').controller('TerminateLaundryCtrl', function($rootScope,$state, $scope, $location, DataTableS,$timeout) {
        var oTable;
     if ($state.params != null && $state.params.AssignLaundryID != null && $state.params.AssignLaundryID > 0)
         $scope.AssignLaundryID = $state.params.AssignLaundryID;

         loadCustomerDropdown();
         loadLaundryDropdown();
         loadLaundryVendorDropdown();
 
         $scope.FrmTerminateLaundry = {};
         $scope.TerminateLaundry = {};
 
         $scope.LocationList = [];
         $scope.LaundryVendorList = [];
         $scope.CustomerList = [];
         $scope.LaundryList = [];
         $scope.AssignData = [];
         $scope.AssignLocationList = [];
 
         $scope.LaundryToCustomerList = [
             { ID: '', LaundryToCustomer: '--Select--' },
             { ID: 1, LaundryToCustomer: 'New Assignment' },
             { ID: 2, LaundryToCustomer: 'Change' },
             { ID: 3, LaundryToCustomer: 'Terminate' }
         ];
         $scope.InputMask = InputMask;
         $scope.onCustChange = onCustChange;
         $scope.onLaundryChange = onLaundryChange;
 
         function InputMask() {
             $('#terminatestart-date').click(function () {
                 $("#terminate-start-date").datepicker({ format: 'dd M yyyy', }).focus();
             });
             $('#terminateend-date').click(function () {
                 $("#terminate-end-date").datepicker({ format: 'dd M yyyy', }).focus();
             });
         }
         $scope.InputMask();
         $scope.onLaundryLocationChange =function(ID) {
             console.log(ID);
 
                 Ajax({
                     data: {
                         EndPoint: 'Laundry/AssignLaundry/getDataByLaundryLocID',
                         ID: ID
                     },
                     success: function (Res) {
                         console.log(Res);
                         if (Res['S'] && Res['D'] != '') {
                               $scope.TerminateLaundry = Res['D'];
                             console.log($scope.TerminateLaundry);
                             angular.forEach($scope.CustomerList, function(Value, Key) {
                                 if (Value.ID == $scope.TerminateLaundry.CustomerID)
                                  $scope.TerminateLaundry.CustomerName = Value.CustomerName;
                             });
                             angular.forEach($scope.LocationList, function(Value, Key) {
                                 if (Value.ID == $scope.TerminateLaundry.CustomerLocationID)
                                     $scope.TerminateLaundry.CustomerLocationName = Value.CustomerLocationName;
                             });
                             angular.forEach($scope.LaundryList, function(Value, Key) {
                                 if (Value.ID == $scope.TerminateLaundry.LaundryID)
                                  $scope.TerminateLaundry.LaundryName = Value.LaundryName;
                             });
                             angular.forEach($scope.AssignLocationList, function(Value, Key) {
                                 if (Value.ID == $scope.TerminateLaundry.LaundryLocationID) {
                                     $scope.TerminateLaundry.LaundryLocationName = Value.LaundryLocationName;
                                 } 
                             });  
                            $scope.AssignData.push(angular.copy($scope.TerminateLaundry));
                            $scope.TerminateLaundry = {};
                            $scope.$apply();
                           }
                     }
                 });
             $scope.TerminateLaundry = {};
          }
     
     /**
      * @name saveAssignLaundry
      * @desc Called on click of save button
      * @memberOf Controllers.LaundryDetail
      */
     $scope.saveAssignLaundry = function(TerminateLaundry) {
         $scope.TerminateLaundry.EndPoint = 'Laundry/AssignLaundry/insertUpdate';
     
         if (TerminateLaundry) {
             Ajax({
                 data: $scope.TerminateLaundry,
                 success: function(Res) {
                     console.log(Res);
                     if (Res['S']) {
                         $scope.AssignLaundryID = Res['D'];
                         console.log($scope.AssignLaundryID)
                         $scope.assignCancel();
                     }                            
                     $scope.$apply();  
                 }
             });
         }
     }
     $('#laundry-vendor').select2({
         placeholder: 'Select a Laundry Vendor',
         allowClear: true,
         width: 'off',
     });   
     $('#terminate-customer').select2({
         placeholder: 'Select a Customer',
         allowClear: true,
         width: 'off',
     });  
     $('#terminate-location').select2({
         placeholder: 'Select a Customer Location',
         allowClear: true,
         width: 'off',
     }); 
     $('#terminate-laundry').select2({
         placeholder: 'Select a Laundry',
         allowClear: true,
         width: 'off',
     }); 
     $('#terminate-laundry-location').select2({
         placeholder: 'Select a Laundry Location',
         allowClear: true,
         width: 'off',
     });  
     function loadLaundryVendorDropdown() {
         Ajax({
             data: {
                 EndPoint: 'Laundry/BasicDetail/getAllData'
             },
             success: function(Res) {
                 $scope.LaundryVendorList = Res['D'];
                 $scope.$apply();
             }
         });
     }
     $scope.LaundryVendorNameChange = function(ID) {
         Ajax({
             data: {
                 EndPoint: 'Laundry/BasicDetail/getDataByID',
                 ID: ID
             },
             success: function (Res) {
                 if (Res['S'])
                     $scope.LaundryDetail = Res['D'];
                     $location.url('/laundry/edit-details/' + Res['D']['ID'] + '');
                 $scope.$apply();
             }
         });
     }
     function loadCustomerDropdown() {
         Ajax({
             data: {
                 EndPoint: 'Customer/BasicDetail/getAllData'
             },
             success: function (Res) {
                 $scope.CustomerList = Res['D'];
                 $scope.$apply();
             }
         });
     }
     function loadCustomerLocationDropdown(CustomerID) {
         Ajax({
             data: {
                 EndPoint: 'Customer/LocationInfo/getCustomerLocationData',
                 CustomerID:CustomerID
             },
             success: function (Res) {
                 $scope.LocationList = Res['D'];
                 $("#assign-location").val('').trigger('change.select2');
                 $scope.$apply();
             }
         });
     }
     function loadLaundryLocationDropdown(LaundryID) {
         console.log(LaundryID);
         Ajax({
             data: {
                 EndPoint: 'Customer/LocationInfo/getLaundryLocationData',
                 LaundryID:LaundryID
             },
             success: function (Res) {
                 $scope.AssignLocationList = Res['D'];
                 $("#assign-laundry-location").val('').trigger('change.select2');
                 $scope.$apply();
             }
         });
     }
     function loadLaundryDropdown() {
         Ajax({
             data: {
                 EndPoint: 'Laundry/BasicDetail/getAllData'
             },
             success: function(Res) {
                 $scope.LaundryList = Res['D'];
                 $scope.$apply();
             }
         });
     }
     function onCustChange(ID) {
         loadCustomerLocationDropdown(ID);
     }
     function onLaundryChange(ID) {
         loadLaundryLocationDropdown(ID);
     }
     $scope.childData=true;
     $scope.terminateCancel = function(){
        $scope.childData=false;
        $scope.TerminateLaundry = {};
 
     $("#terminate-customer").val('').trigger('change.select2');
     $("#terminate-location").val('').trigger('change.select2');
     $("#terminate-laundry").val('').trigger('change.select2');
     $("#terminate-laundry-location").val('').trigger('change.select2');
 
     }
     /**
      * @name BackLaundryIndexPage
      * @desc Called on click of back button
      * @memberOf Controllers.CustomerDetail
      */
     $scope.BackLaundryIndexPage = function() {
         $location.url('/laundry/laundry');
     }
 });
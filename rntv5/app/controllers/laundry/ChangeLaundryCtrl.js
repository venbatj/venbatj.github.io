
    angular.module('RAT').controller('ChangeLaundryCtrl', function($rootScope,$state, $scope, $location, DataTableS,$timeout) {
        var oTable;
        
     if ($state.params != null && $state.params.AssignLaundryID != null && $state.params.AssignLaundryID > 0)
     $scope.AssignLaundryID = $state.params.AssignLaundryID;

         loadCustomerDropdown();
         loadLaundryDropdown();
         loadLaundryVendorDropdown();
 
         $scope.FrmChangeLaundry = {};
         $scope.ChangeLaundry = {};
 
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
             $('#changestart-date').click(function () {
                 $("#change-start-date").datepicker({ format: 'dd M yyyy', }).focus();
             });
             $('#changeend-date').click(function () {
                 $("#change-end-date").datepicker({ format: 'dd M yyyy', }).focus();
             });
         }
         $scope.InputMask();
          $scope.onCCLocationChange =function(ID) {
              console.log(ID);
  
                  Ajax({
                      data: {
                          EndPoint: 'Laundry/AssignLaundry/getDataByLocationID',
                          ID: ID
                      },
                      success: function (Res) {
                          console.log(Res);
                          if (Res['S'] && Res['D'] != '') {
                                $scope.ChangeLaundry = Res['D'];
                              console.log($scope.ChangeLaundry);
                              angular.forEach($scope.CustomerList, function(Value, Key) {
                                  if (Value.ID == $scope.ChangeLaundry.CustomerID)
                                   $scope.ChangeLaundry.CustomerName = Value.CustomerName;
                              });
                              angular.forEach($scope.LocationList, function(Value, Key) {
                                  if (Value.ID == $scope.ChangeLaundry.CustomerLocationID)
                                      $scope.ChangeLaundry.CustomerLocationName = Value.CustomerLocationName;
                              });
                              angular.forEach($scope.LaundryList, function(Value, Key) {
                                  if (Value.ID == $scope.ChangeLaundry.LaundryID)
                                   $scope.ChangeLaundry.LaundryName = Value.LaundryName;
                              });
                              angular.forEach($scope.AssignLocationList, function(Value, Key) {
                                  if (Value.ID == $scope.ChangeLaundry.LaundryLocationID) {
                                      $scope.ChangeLaundry.LaundryLocationID = Value.LaundryLocationID;
                                  } 
                              });  
                             $scope.AssignData.push(angular.copy($scope.ChangeLaundry));
                             onLaundryChange($scope.ChangeLaundry.LaundryID);
                            setTimeout(function(){
                                $("#change-laundry").val(Res['D'].LaundryID).trigger('change.select2');
                                $("#change-laundry-location").val(Res['D'].LaundryLocationID).trigger('change.select2');
                            },700);
                             $scope.$apply();
                          }
                      }
                  });
              $scope.ChangeLaundry = {};
           }
      
     /**
      * @name saveChangeLaundry
      * @desc Called on click of save button
      * @memberOf Controllers.LaundryDetail
      */
     $scope.saveChangeLaundry = function(FrmChangeLaundry) {
         console.log(FrmChangeLaundry);
         console.log('call');
         $scope.ChangeLaundry.EndPoint = 'Laundry/AssignLaundry/insertUpdate';
     
         if (FrmChangeLaundry) {
             Ajax({
                 data: $scope.ChangeLaundry,
                 success: function(Res) {
                     console.log(Res);
                     if (Res['S']) {
                         $scope.AssignLaundryID = Res['D'];
                         console.log($scope.AssignLaundryID)
                         // $scope.assignCancel();
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
     $('#change-customer').select2({
         placeholder: 'Select a Customer',
         allowClear: true,
         width: 'off',
     });  
     $('#change-location').select2({
         placeholder: 'Select a Customer Location',
         allowClear: true,
         width: 'off',
     });           
     $('#change-laundry').select2({
         placeholder: 'Select a Laundry',
         allowClear: true,
         width: 'off',
     });              
     $('#change-laundry-location').select2({
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
         $scope.childData = true;
    $scope.changeCancel = function(){
         $scope.childData = false;
         $scope.ChangeLaundry = {};
 
     $("#change-customer").val('').trigger('change.select2');
     $("#change-location").val('').trigger('change.select2');
     $("#change-laundry").val('').trigger('change.select2');
     $("#change-laundry-location").val('').trigger('change.select2');
 
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
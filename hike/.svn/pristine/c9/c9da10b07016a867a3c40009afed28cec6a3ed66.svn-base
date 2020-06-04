
    angular.module('RAT').controller('AssignLaundryCtrl', function($rootScope,$state, $scope, $location, DataTableS,$timeout) {
       var oTable;
       
    if ($state.params != null && $state.params.AssignLaundryID != null && $state.params.AssignLaundryID > 0)
        $scope.AssignLaundryID = $state.params.AssignLaundryID;

    if ($scope.AssignLaundryID > 0) {
        $timeout(function () {
            loadRelationalData($scope.AssignLaundryID);
        }, 1000);
    }
        $scope.$on('$viewContentLoaded', function() {  
            // loadAssignLaundry(); 
        });
        function loadRelationalData(ID) {
            // loadAssignLaundry(ID); 
        }
        loadCustomerDropdown();
        loadLaundryDropdown();
        loadLaundryVendorDropdown();

        $scope.FrmAssignLaundry = {};
        $scope.AssignLaundry = {};

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
            $('#assignstart-date').click(function () {
                $("#assign-start-date").datepicker({ format: 'dd M yyyy', }).focus();
            });
            $('#assignend-date').click(function () {
                $("#assign-end-date").datepicker({ format: 'dd M yyyy', }).focus();
            });
        }
        $scope.DateError = false;
        $scope.reminder = function(){
            $timeout(function () {
            var myDate = new Date($scope.AssignLaundry.StartDate);
            var myDate1 = new Date($scope.AssignLaundry.EndDate);
            if(myDate <= myDate1) {
                $scope.DateError = true;
            } else {
                $scope.DateError = false;
            }
        }, 700);
        }

        $scope.InputMask();
        $scope.onLocationChange =function(ID) {
            console.log(ID);
                Ajax({
                    data: {
                        EndPoint: 'Laundry/AssignLaundry/getDataByLaundryLocID',
                        ID: ID
                    },
                    success: function (Res) {
                        console.log(Res['D']);
                        if (Res['S']) {
                            if(Res['D'] != ''){
                                $scope.AssignLaundry = Res['D'];
                                angular.forEach($scope.CustomerList, function(Value, Key) {
                                    if (Value.ID == $scope.AssignLaundry.CustomerID)
                                     $scope.AssignLaundry.CustomerName = Value.CustomerName;
                                });
                                angular.forEach($scope.LocationList, function(Value, Key) {
                                    if (Value.ID == $scope.AssignLaundry.CustomerLocationID)
                                        $scope.AssignLaundry.CustomerLocationName = Value.CustomerLocationName;
                                });
                                angular.forEach($scope.LaundryList, function(Value, Key) {
                                    if (Value.ID == $scope.AssignLaundry.LaundryID)
                                     $scope.AssignLaundry.LaundryName = Value.LaundryName;
                                });
                                $scope.AssignData.push(angular.copy($scope.AssignLaundry));
                                console.log($scope.AssignData);
                                $scope.AssignLaundry = {};
                                $scope.$apply();
                            }
                        }
                    }
                });
            }
     
    /**
     * @name saveAssignLaundry
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    $scope.saveAssignLaundry = function(FrmAssignLaundry) {
        console.log(FrmAssignLaundry);
        $scope.AssignLaundry.EndPoint = 'Laundry/AssignLaundry/InsertLaundry';
        console.log($scope.AssignLaundry.LaundryID);
    
        if (FrmAssignLaundry) {
            Ajax({
                data: $scope.AssignLaundry,
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
    $('#customer-laundry').select2({
        placeholder: 'Select a Customer',
        allowClear: true,
        width: 'off',
    });   
    $('#assign-location').select2({
        placeholder: 'Select a Customer Location',
        allowClear: true,
        width: 'off',
    });          
    $('#assign-laundry').select2({
        placeholder: 'Select a Laundry',
        allowClear: true,
        width: 'off',
    });       
    $('#assign-laundry-location').select2({
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
        $scope.assignCancel = function(){
        $scope.childData=false;
        $scope.AssignLaundry = {};

    $("#customer-laundry").val('').trigger('change.select2');
    $("#assign-location").val('').trigger('change.select2');
    $("#assign-laundry").val('').trigger('change.select2');
    $("#assign-laundry-location").val('').trigger('change.select2');

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
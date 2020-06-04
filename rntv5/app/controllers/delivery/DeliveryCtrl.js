angular.module('RAT').controller('DeliveryCtrl', function($state,$rootScope, $scope,$location, DataTableS) {
    var oTable;
  
    if ($state.params != null && $state.params.DeliveryID != null && $state.params.DeliveryID > 0)
        $scope.DeliveryID = $state.params.DeliveryID;

    $scope.CustomerDeliveryList = [];
    $scope.Warehouselist = [];
    // $scope.LaundryLocationList = [];
    $scope.LaundryList = [];
    $scope.CategoryList = [];
    $scope.ProductList = [];
    $scope.VariantList = [];

    $scope.DeliveryData = {};
    $scope.FrmDelivery = {};
    $scope.FormCompareLaundry = {};
    $scope.ScheduleData = {};
    $scope.SubDeliveryData = {};
    $scope.DeliveryDataPickup = [];

    // loadLocationDropdown();
    loadCustomerDropdown();
    loadWarehouseDropdown();
    loadCategoryDropdown();
    loadLaundryDropdown();
    $scope.childdelivery = true;
    $scope.revisedDate = false;
    
    $scope.onCategoryChange = onCategoryChange;
    $scope.onLaundryChange = onLaundryChange;
    $scope.onProductChange = onProductChange;
    $scope.onCustomerChange = onCustomerChange;

    $scope.DeliveryList = [
        { ID: '', Delivery: '--Select--' },
        { ID: 1, Delivery: 'Delivery' },
        { ID: 2, Delivery: 'Pickup' },
    ];
    $scope.DeliverList = [
        { ID: '', Deliver: '--Select--' },
        { ID: 1, Deliver: 'Laundry' },
        { ID: 2, Deliver: 'Customer' }
    ];
    $scope.TypeList = [
        { ID: '', Type: '--Select--' },
        { ID: 1, Type: 'Fresh ' },
        { ID: 2, Type: 'Replenishment' }
    ];
    $scope.RequestList = [
        { ID: '', SendRequest: '--Select--' },
        { ID: 1, SendRequest: 'RNT delivery team ' },
        { ID: 2, SendRequest: 'laundry delivery team' }
    ];
    $scope.$on('UserType',function(event,data){
        loaduserType(data['OrderType']);
    })
    $scope.$on('$viewContentLoaded', function() {
        loadDeliveryDetails();
        loadDeliveryDetail();
        
        $('#deliver').select2({
            placeholder: 'Select the Deliver',
            allowClear: true,
            width: 'off',
        });
        $('#deliver-type').select2({
            placeholder: 'Select the Type',
            allowClear: true,
            width: 'off',
        });
        $('#request-type').select2({
            placeholder: 'Select the Send Request',
            allowClear: true,
            width: 'off',
        });
        $('#schedule-laundry').select2({
            placeholder: 'Select the Laundry',
            allowClear: true,
            width: 'off',
        });
        $('#customer-location').select2({
            placeholder: 'Select Customer Location',
            allowClear: true,
            width: 'off',
        });
        $('#linen-location').select2({
            placeholder: 'Select Linen Loocation',
            allowClear: true,
            width: 'off',
        });
        $('#linen-delivery').select2({
            placeholder: 'Select Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#customer-delivery').select2({
            placeholder: 'Select Customer',
            allowClear: true,
            width: 'off',
        });
        $('#category').select2({
            placeholder: 'Select a Category',
            allowClear: true,
            width: 'off',
        });
        $('#product').select2({
            placeholder: 'Select a Product',
            allowClear: true,
            width: 'off',
        });
        $('#variant').select2({
            placeholder: 'Select a Variant',
            allowClear: true,
            width: 'off',
        });
        $('#warehouse-delivery').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#assign-laundry').select2({
            placeholder: 'Select a Laundry',
            allowClear: true,
            width: 'off',
        });
    });

    $scope.deliveryProjectPage = function() {
        $location.url('/delivery/delivery-project-plan');
    }
    $scope.ManagePage = function() {
        $location.url('/delivery/manage-pickup');
    }
    $scope.SchedulePage = function() {
        $location.url('/delivery/schedule-warehouse');
    }

    $('#pickup-time').click(function () {
        $("#pickuptime").datetimepicker({ format: 'dd M yyyy hh:ii:ss', }).focus();
    });
    $('#sdelivery-time').click(function () {
        $("#sdeliverytime").datetimepicker({ format: 'dd M yyyy hh:ii:ss', }).focus();
    });
    $('#delivery-date').click(function () {
        $("#deliverytime").datetimepicker({ format: 'dd M yyyy hh:ii:ss', }).focus();
    });
    $('#valid-untill').click(function () {
        $("#validuntil").datepicker({ format: 'dd M yyyy', }).focus();
    });
    $('#revised-pickup').click(function () {
        $("#revisedpickup").datetimepicker({ format: 'dd M yyyy hh:ii:ss', }).focus();
    });
    $('#revised-delivery').click(function () {
        $("#reviseddelivery").datetimepicker({ format: 'dd M yyyy hh:ii:ss', }).focus();
    });
    $('#revised-until').click(function () {
        $("#reviseduntil").datepicker({ format: 'dd M yyyy', }).focus();
    });
    
    /**
     * @name assignDelivery
     * @desc Called on click of save button
     * @memberOf Controllers.Delivery Details
     */
    $scope.assignDelivery = function(FrmDelivery) {
        $scope.DeliveryData.EndPoint = 'Delivery/Delivery/insertUpdate';
        if (FrmDelivery.$valid) {
            Ajax({
                data: $scope.DeliveryData,
                success: function(Res) {
                    $scope.DeliveryData = Res['D'];
                    $scope.ClearDleivery();
                    $scope.$apply();    
                }
            });
        }
    }
    /**
     * @name assignDeliverydata
     * @desc Called on click of save button
     * @memberOf Controllers.Delivery Details
     */
    $scope.assignDeliverydata = function(FormCompareLaundry) {
        $scope.ScheduleData.EndPoint = 'Delivery/Delivery/insertUpdatedata';
        if (FormCompareLaundry.$valid) {
            Ajax({
                data: $scope.ScheduleData,
                success: function(Res) {
                    $scope.ScheduleData = Res['D'];
                    $scope.ClearDleiverydata();
                    $scope.$apply();    
                }
            });
        }
    }
    /**
     * @name loadDeliveryDetails
     * @desc Called to load delivery details
     * @memberOf Controllers.DeliveryDetails
     */
    function loadDeliveryDetails() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 7]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Delivery/Delivery/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CustomerName' },
            { data: 'CustomerLocation' },
            { data: 'LaundryAssigned' },
            { data: 'SchedulePickupTime' },
            { data: 'ScheduleDeliveryTime' },
            { data: 'ValidUntil' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(7, Row, Data['ID'], editDliveryDetail);                
        };
        oTable = $('#delivery-manage-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#delivery-manage-data-table');
        DataTableS.onDeleteClick('#delivery-manage-data-table', function(RefArr) {
            deleteDeliveryDetails(RefArr);
        });
    }
    /**
     * @name loadDeliveryDetail
     * @desc Called to load delivery details
     * @memberOf Controllers.DeliveryDetails
     */
    function loadDeliveryDetail() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 7]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Delivery/Delivery/getDataByPages'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'WarehouseName' },
            { data: 'CustomerName' },
            { data: 'CustomerLocation' },
            { data: 'LaundryID' },
            { data: 'LaundryLocationID' },
            { data: 'DeliveryDateTime' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(7, Row, Data['ID'], editScheduleDliveryData);                
        };
        oTable = $('#schedule-manage-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#schedule-manage-data-table');
        DataTableS.onDeleteClick('#schedule-manage-data-table', function(RefArr) {
            // deleteDeliveryDetails(RefArr);
        });
    }
    /**
     * @name editDliveryDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function editDliveryDetail(ID) {
        console.log(ID);
        $scope.revisedDate =true;
        Ajax({
            data: {
                EndPoint: 'Delivery/Delivery/getDataByID',
                ID: ID
            },
            success: function(Res) {
                console.log(Res);
                if (Res['S']) {
                    $scope.DeliveryData = Res['D'];
                        onCustomerChange($scope.DeliveryData.CustomerID);
                        setTimeout(function(){
                        $('#customer-delivery').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#customer-location').val(Res['D'].CustomerLocationID).trigger('change.select2');
                    },1000);
                    $scope.$apply();
                }
            }
        });
    }
    /**
     * @name editScheduleDliveryData
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function editScheduleDliveryData(ID) {
        Ajax({
            data: {
                EndPoint: 'Delivery/Delivery/getDataByIDs',
                ID: ID
            },
            success: function(Res) {
                console.log(Res);
                if (Res['S']) {
                    onCustomerChange($scope.SubDeliveryData.CustomerID);
                    onLaundryChange($scope.SubDeliveryData.LaundryID);
                    setTimeout(function(){
                        $scope.SubDeliveryData = Res['D'];
                        // $scope.SubDeliveryData.Deliver =2;
                        console.log($scope.SubDeliveryData.Deliver);
                        $('#warehouse-delivery').val(Res['D'].WarehouseID).trigger('change.select2');
                        $('#assign-laundry-location').val(Res['D'].LaundryLocationID).trigger('change.select2');
                        $('#deliver-type').val(Res['D'].Type).trigger('change.select2');
                        $('#deliver').val(Res['D'].Deliver).trigger('change.select2');
                        $('#schedule-laundry').val(Res['D'].LaundryID).trigger('change.select2');
                        $('#customer-delivery').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#customer-location').val(Res['D'].CustomerLocationID).trigger('change.select2');
                    },1000);
                    $scope.$apply();
                }
            }
        });
    }
    /**
     * @name deleteDeliveryDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.CustomerDetail
     */
    function deleteDeliveryDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickManageDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickManageDeleteConfirmBoxOk', function (event, obj) {
        Ajax({
            data: {
                EndPoint: 'Delivery/Delivery/remove',
                IDArr: $scope.deleteArray
            },
            success: function (Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    if ($.inArray(parseInt($scope.DeliveryData.ID), $scope.deleteArray) >= 0) {
                        ClearDleivery(FrmDelivery);
                }
                    DataTableS.resetDelete('#delivery-manage-data-table');
                    $scope.$apply();
                }
            }
        });
    });

    $scope.onLocationChange = function(ID){
        console.log(ID);
        Ajax({
            data: {
                EndPoint: 'Customer/LocationInfo/getDeliveryLocationData',
                CustomerLocationID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.DeliveryData.LaundryID = Res['D']['LaundryID'];
                    $('#laundry-data').val(Res['D'].LaundryID).trigger('change.select2');
                    $scope.$apply();
                }
            }
        });
    }
    function onCustomerChange(ID) {
        loadCustomerLocationDropdown(ID);
    }
    function onLaundryChange(ID) {
        loadLaundryLocationDropdown(ID);
    }
    function loadCustomerLocationDropdown(CustomerID) {
        console.log(CustomerID);
        Ajax({
            data: {
                EndPoint: 'Customer/LocationInfo/getCustomerLocationData',
                CustomerID:CustomerID
            },
            success: function (Res) {
                $scope.DeliveryLocationList = Res['D'];
                $("#customer-location").val('').trigger('change.select2');
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
                $scope.LaundryLocationList = Res['D'];
                $("#assign-laundry-location").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }
    function loaduserType(data){
    $scope.SubDeliveryData = {};
        Ajax({
            data: {
                EndPoint: 'Delivery/Delivery/getUserTypeID',
                UserTypeID:data
            },
            success: function(Res) {
                $scope.SubDeliveryData = Res['D'];
                $scope.$apply();
            }
        });
    }
    $scope.onInvRepChange = function() {
            $scope.$broadcast("UserType",$scope.SubDeliveryData);
            $location.url('/delivery/manage-pickup');
    }
    $scope.DeliveryAssign = function() {
        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.SubDeliveryData.CategoryID){
                $scope.SubDeliveryData.CategoryName = Value.CategoryName;
            console.log($scope.SubDeliveryData.CategoryName);
            }
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubDeliveryData.ProductID){
                $scope.SubDeliveryData.ProductName = Value.ProductName;
                console.log($scope.SubDeliveryData.ProductName);
            }
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.VariantID == $scope.SubDeliveryData.VariantID){
                $scope.SubDeliveryData.VariantName = Value.VariantName;
                console.log($scope.SubDeliveryData.VariantName);
            }
        }); 
        $scope.DeliveryDataPickup.push(angular.copy($scope.SubDeliveryData));
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
        $scope.SubDeliveryData = {};
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
    function loadCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.CustomerDeliveryList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function loadWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function(Res) {
                $scope.Warehouselist = Res['D'];
                $scope.$apply();
            }
        });
    }
    function loadCategoryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Category/getAllData'
            },
            success: function (Res) {
                $scope.CategoryList = Res['D'];
            }
        });
    }

    function loadProductDropdown(CategoryID) {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Masters/Product/getProductByCategoryID',
                CategoryID: CategoryID
            },
            success: function (Res) {
                $scope.ProductList = Res['D'];
                    $("#product").val('').trigger('change.select2');
                    $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }

    function loadVariantDropdown(ProductID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getVariantByProductID',
                ProductID: ProductID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                    $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }

    function onCategoryChange(ID) {
        loadProductDropdown(ID);
    }

    function onProductChange(ProductID) {
        loadVariantDropdown(ProductID);
    }
    /**
     * @name ClearDleivery
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LinenDetail
     */
    $scope.ClearDleivery = function(FrmDelivery) {
        $scope.childdelivery = false;
        $scope.SubDeliveryData = {};
        $scope.DeliveryData = {};

        $("#customer-delivery").val('').trigger('change.select2');
        $("#customer-location").val('').trigger('change.select2');
        $("#warehouse-delivery").val('').trigger('change.select2');
    }
    /**
     * @name ClearDleiverydata
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LinenDetail
     */
    $scope.ClearDleiverydata = function(FormCompareLaundry) {
        $scope.childdelivery = false;
        $scope.SubDeliveryData = {};
        $scope.ScheduleData = {};

        $("#deliver-type").val('').trigger('change.select2');
        $("#deliver").val('').trigger('change.select2');
        $("#request-type").val('').trigger('change.select2');
        $("#customer-delivery").val('').trigger('change.select2');
        $("#customer-location").val('').trigger('change.select2');
        $("#warehouse-delivery").val('').trigger('change.select2');
    }
    $scope.BackManagement = function(){
        $location.url('/delivery/delivery');        
    }
});
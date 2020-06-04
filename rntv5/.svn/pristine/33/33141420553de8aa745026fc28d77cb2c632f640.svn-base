angular.module('RAT').controller('OrderRFIDCtrl', function($state, $scope, $timeout,$location, DataTableS, $rootScope) {
    var oTable;

    if ($state.params != null && $state.params.InventoryID != null && $state.params.InventoryID > 0)
        $scope.InventoryID = $state.params.InventoryID;

    if ($scope.InventoryID > 0) {
        $scope.AddPage = false;
        $timeout(function () {
            loadRelationalData($scope.InventoryID);
        }, 1000);
    }
    function loadRelationalData(ID) {
        loadOrderRFID(ID);
        loadOrderRFIDData(ID);
    }

    $scope.FormOrderRFID = {};
    $scope.RFID = {InventoryID:0};
    $scope.RFIDData = {};

    $scope.$on('$viewContentLoaded', function() {
        $('#customer').select2({
            placeholder: 'Select a Customer',
            allowClear: true,
            width: 'off',
        });
        $('#warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#ordering-reason').select2({
            placeholder: 'Select a Order Reason ',
            allowClear: true,
            width: 'off',
        }); 
        $('#product').select2({
            placeholder: 'Select a Product',
            allowClear: true,
            width: 'off',
        });  
        $('#supply-vendor').select2({
            placeholder: 'Select a Supply Vendor',
            allowClear: true,
            width: 'off',
        });   
        $('#rfid-order-type').select2({
            placeholder: 'RFID For',
            allowClear: true,
            width: 'off',
        });
    });

    $scope.OrderTypeList = [];
    $scope.CustomerList = [];
    $scope.OrderingReasonList = [];
    $scope.SupplierList = [];
    $scope.OrderRFIDData = [];
    $scope.WarehouseList = [];

    $scope.addData = addData;
    $scope.formClear = formClear;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.cancel = cancel;

    loadCustomerIDDropdown();
    loadOrderingReasonIDDropdown();
    loadSupplierDropdown();
    loadOrderTypeIDDropdown();
    loadWarehouseDropdown();

    $scope.updateChild = false;
    $scope.updateChild1 = false;
    $scope.addChild = true;

    $scope.showOrderRFID = function() {
        $('#saveinventory').modal('show');
    }

    $scope.Customer = false;
    $scope.Warehouse = false;
    $scope.RFIDOrderType = false;

    $scope.onOrderTypeChange = function() {
        if ($scope.RFID.OrderTypeID == '1') {
            $scope.Customer = true;
            $scope.Warehouse = false;
        } else if ($scope.RFID.OrderTypeID == '2') {
            $scope.Warehouse = true;
            $scope.Customer = false;
        }
    }

    /**
     * @name loadOrderRFIDData
     * @desc Called on click of load load Inventory Data
     * @memberOf Controllers.OrderRFIDCtrl
     */
    function loadOrderRFIDData(ID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getOrderRFID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.OrderRFIDData = Res['D']['SubInventory'];
                    $scope.onOrderTypeChange(0, 'OrderType');
                    $scope.FlagName = 'OrderType';
                    // $scope.RFIDOrderType = false;
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name loadOrderRFID
     * @desc Called to load customer details
     * @memberOf Controllers.OrderRFIDCtrl
     */
    function loadOrderRFID(ID) {
        var DTProps = DataTableS.getDefaults();
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getOrderRFID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.RFID = Res['D'];
                    $scope.OrderRFIDData = Res['D']['SubInventory'];
                    $scope.onOrderTypeChange(0, 'OrderType');
                    $scope.FlagName = 'OrderType';
                    // $scope.RFIDOrderType = false;
                    $timeout(function () {
                        $('#customer').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#ordering-reason').val(Res['D'].ActionID).trigger('change.select2');
                        // $('#rfid-order-type').val(Res['D'].OrderTypeID).trigger('change.select2');
                        $('#warehouse').val(Res['D'].WarehouseID).trigger('change.select2');
                    }, 500);
                    $scope.$apply();
                }
            }
        });
        oTable = $('#inventory-details-data-table').DataTable(DTProps);
            DataTableS.onDeleteClick('#order-rfid-table', function(RefArr) {
            removeData(RefArr);
        });
    }

    /**
     * @name removeData
     * @desc Called on click of remove
     * @memberOf Controllers.OrderRFIDCtrl
     */
    $scope.removeData = function(index, ID) {
        $scope.index = index;
        if (ID > 0) {
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickOrderRFIDData1DeleteConfirmBoxOk');
        } else {
            $rootScope.DelConfirmBox('OnClickOrderRFIDData2DeleteConfirmBoxOk');
        }
    }
    $scope.$on('OnClickOrderRFIDData1DeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/removeOrderRFIDData',
                ID: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    loadOrderRFIDData($scope.InventoryID);
                }
            }
        });
    });
    $scope.$on('OnClickOrderRFIDData2DeleteConfirmBoxOk', function(event, obj) {
        $scope.OrderRFIDData.splice($scope.index, 1);
    });

    /**
     * @name editData
     * @desc Called to edit icon
     * @memberOf Controllers.OrderRFIDCtrl
     */
    $scope.editData = function(Index, ID) {
        if (ID != undefined) {
            $scope.updateChild = true;
            $scope.addChild = false;
            $scope.updateChild1 = false;
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/getOrderRFIDDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.RFIDData = Res['D'];
                        
                        $('#supply-vendor').val(Res['D'].SupplierID).trigger('change.select2');
                        $scope.$apply();
                    }
                }
            });
        } else {
            $scope.updateChild = false;
            $scope.updateChild1 = true;
            $scope.addChild = false;
            angular.forEach($scope.OrderRFIDData, function(Value, Key) {
                if (Key == Index) {
                    $scope.RFIDData = Value; 
                    $('#supply-vendor').val(Value.SupplierID).trigger('change.select2');
                }
            });
        }
    }   

    /**
     * @name addData
     * @desc Called to AddData
     * @memberOf Controllers.OrderRFID
     */
    function addData() {
        angular.forEach($scope.SupplierList, function(Value, Key) {
            if (Value.ID == $scope.RFIDData.SupplierID)
             $scope.RFIDData.RFIDSupplierName = Value.RFIDSupplierName;
        });
        $scope.OrderRFIDData.push(angular.copy($scope.RFIDData));

        $("#supply-vendor").val('').trigger('change.select2');
        $scope.RFIDData = {};
    }

    /**
     * @name saveOrderRFID
     * @desc Called to save rfid details
     * @memberOf Controllers.OrderRFIDCtrl
     */
    $scope.saveOrderRFID = function(isValid) {
        if (isValid) {
            Ajax({
                data: {
                EndPoint: 'Inventory/Inventory/insertUpdateOrderRFID',
                Inventory: $scope.RFID,
                SubInventory: $scope.OrderRFIDData
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        loadRelationalData($scope.InventoryID);
                        // backToManagmentPage();
                        $scope.showOrderRFID();
                        // window.alert('Saved Succefully');
                    }
                    $scope.$apply();
                }
            });
        } 
    };

    /**
     * @name update
     * @desc Called on click of update button
     * @memberOf Controllers.OrderRFIDCtrl
     */
    $scope.update = function() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/updateChildRFIDData',
                SubForm: $scope.RFIDData,
            },
            success: function(Res) {
                $scope.RFIDData = Res['D'];
                loadOrderRFIDData($scope.InventoryID);
                $('#supply-vendor').val('').trigger('change.select2');
                $scope.RFIDData = {};
                $scope.updateChild = false;
                $scope.updateChild1 = false;
                $scope.addChild = true;
            }
        });
    }

    /**
     * @name update1
     * @desc Called on click of update button
     * @memberOf Controllers.OrderRFIDCtrl
     */
    $scope.update1 = function(Index) {
        angular.forEach($scope.OrderRFIDData, function(Value, Key) {
            if (Key == Index) {
                $('#supply-vendor').val(Value.SupplierID).trigger('change.select2');
            }   
        }); 

        angular.forEach($scope.SupplierList, function(Value, Key) {
            if (Value.ID == $scope.RFIDData.SupplierID)
             $scope.RFIDData.RFIDSupplierName = Value.RFIDSupplierName;
        });

        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.RFIDData = {};
        $('#supply-vendor').val('').trigger('change.select2');
    }

    /**
     * @name cancelChild
     * @desc Called on click of cancel button
     * @memberOf Controllers.OrderRFIDCtrl
     */
    $scope.cancelChild = function() {
        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.RFIDData = {};
        $('#supply-vendor').val('').trigger('change.select2');
    }

    function loadCustomerIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function (Res) {
                $scope.CustomerList = Res['D'];
            }
        });
    }

    function loadOrderingReasonIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryAction/getAllData'
            },
            success: function (Res) {
                $scope.OrderingReasonList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadSupplierDropdown() {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/BasicDetail/getAllData'
            },
            success: function (Res) {
                $scope.SupplierList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadOrderTypeIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderInventoryType/getAllData'
            },
            success: function (Res) {
                $scope.OrderTypeList = Res['D'];
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
                $scope.WarehouseList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function formClear() {
        $scope.RFID = {};
        $("#product").val('').trigger('change.select2');

        $scope.FormOrderRFID.$submitted = false;
        $scope.FormOrderRFID.$setPristine();
        $scope.FormOrderRFID.$setUntouched();
    }

    $scope.cancelTable = cancelTable;
    function cancelTable(index) {
        $scope.OrderRFIDData.splice(index);
    }

    /**
     * @name cancel
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.OrderRFIDCtrl
     */
    function cancel() {
        $scope.RFID = {};
        cancelTable();

        $scope.FormOrderRFID.$submitted = false;
        $scope.ShowOrderRFIDData = false;
        // $scope.FormOrderRFID.$setPristine();
        // $scope.FormOrderRFID.$setUntouched();
        $("#ordering-reason").val('').trigger('change.select2');
        $("#customer").val('').trigger('change.select2');
        $("#warehouse").val('').trigger('change.select2');
    }

     /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf inventory.OrderRFIDCtrl
     */
    function backToManagmentPage() {
        $location.url('/inventory/inventory-index');
    }


});
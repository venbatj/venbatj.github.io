angular.module('RAT').controller('ReturnInventoryCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
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
        loadReturnInventory(ID);
        loadInventoryData(ID);
    }

    $scope.RtnInventory = {};
    $scope.ReturnInventory = {InventoryID:0};
    $scope.SubReturnInventory = {};

    $scope.$on('$viewContentLoaded', function () {
        $('#variant').select2({
            placeholder: 'Select a Variant',
            allowClear: true,
            width: 'off',
        });
        $('#product').select2({
            placeholder: 'Select a Product',
            allowClear: true,
            width: 'off',
        });
        $('#category').select2({
            placeholder: 'Select a Category',
            allowClear: true,
            width: 'off',
        });
    });

    $scope.InventoryData = [];
    $scope.InventoryMoveList = [];
    $scope.InventoryActionList = [];
    $scope.CustomerList = [];
    $scope.InventoryWarehouseList = [];
    $scope.OrderingReasonList = [];

    $scope.onCustomerChange = onCustomerChange
    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.saveReturnInventory = saveReturnInventory;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.cancelReturnInventory = cancelReturnInventory;

    loadSendInvMoveDropdown();
    loadSendInvActionDropdown();
    loadSendInvCustomerDropdown();
    loadSendInvWarehouseDropdown();
    loadSendInvReasonDropdown();

    $scope.updateChild = false;
    $scope.updateChild1 = false;
    $scope.addChild = true;

    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    
    $scope.paste = function (e) {
        e.preventDefault();
        return false
    }

    $scope.SaveReturnInv = function() {
        $('#save-return-inv').modal('show');
    }

    /**
     * @name loadInventoryData
     * @desc Called to load InventoryData
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    function loadInventoryData(ID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $scope.$apply();
                }
            }
        });
    }
   
    /**
     * @name loadReturnInventory
     * @desc Called to load Inventory
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    function loadReturnInventory(ID) {
        var DTProps = DataTableS.getDefaults();
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.ReturnInventory = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $scope.onCustomerChange(0, 'customer');
                    $scope.FlagName = 'customer';
                    $timeout(function () {
                        $('#inventory-move').val(Res['D'].InventoryMoveID).trigger('change.select2');
                        $('#inventory-customer').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#inventory-action').val(Res['D'].ActionID).trigger('change.select2');
                        $('#ordering-reason').val(Res['D'].OrderingReasonID).trigger('change.select2');
                        $('#inventory-warehouse').val(Res['D'].WarehouseID).trigger('change.select2');
                    }, 500);
                    $scope.$apply();
                }
            }
        });
        oTable = $('#inventory-details-data-table').DataTable(DTProps);
            DataTableS.onDeleteClick('#return-inventory-table', function(RefArr) {
            removeData(RefArr);
        });
    }

    /**
     * @name removeData
     * @desc Called on click of remove
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    $scope.removeData = function(index, ID) {
        $scope.index = index;
        if (ID > 0) {
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickReturnInventoryData1DeleteConfirmBoxOk');
        } else {
            $rootScope.DelConfirmBox('OnClickReturnInventoryData2DeleteConfirmBoxOk');
        }
    }
    $scope.$on('OnClickReturnInventoryData1DeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/removeInventory',
                    ID: $scope.deleteArray
                },
                success: function(Res) {
                    console.log(Res);   
                    if (Res['S'] && Res['D']) {
                        oTable.draw();
                        loadInventoryData($scope.InventoryID);
                    }
                }
            });
    });
    $scope.$on('OnClickReturnInventoryData2DeleteConfirmBoxOk', function(event, obj) {
        $scope.InventoryData.splice($scope.index, 1);
    });

    /**
     * @name saveReturnInventory
     * @desc Called on click of save button
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    function saveReturnInventory(isValid) {
        if (isValid) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/returnInsertUpdate',
                    Inventory: $scope.ReturnInventory,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    console.log(Res);
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        loadRelationalData($scope.InventoryID);
                        $scope.SaveReturnInv();
                        // window.alert("Saved successfully!");
                        backToManagmentPage();
                    }
                    $scope.$apply();
                }
            });
        }
    }

    /**
     * @name editData
     * @desc Called on click of edit
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    $scope.editData = function(Index, ID) {
        if (ID != undefined) {
            $scope.updateChild = true;
            $scope.addChild = false;
            $scope.updateChild1 = false;
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/getCustomerDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.SubReturnInventory = Res['D'];
                        onCategoryChange($scope.SubReturnInventory.CategoryID);
                        onProductChange($scope.SubReturnInventory.ProductID);
                        $timeout(function () {
                            $('#category').val(Res['D'].CategoryID).trigger('change.select2');
                            $('#product').val(Res['D'].ProductID).trigger('change.select2');
                            $('#variant').val(Res['D'].VariantID).trigger('change.select2');
                        }, 500);
                        $scope.$apply();
                    }
                }
            });
        } else {
            $scope.updateChild = false;
            $scope.updateChild1 = true;
            $scope.addChild = false;
            angular.forEach($scope.InventoryData, function(Value, Key) {
                if (Key == Index) {
                    $scope.SubReturnInventory = Value; 
                    onCategoryChange(Value.CategoryID);
                    onProductChange(Value.ProductID);
                    $timeout(function () {
                        $('#category').val(Value.CategoryID).trigger('change.select2');
                        $('#product').val(Value.ProductID).trigger('change.select2');
                        $('#variant').val(Value.VariantID).trigger('change.select2');
                    }, 500);
                }
            });
        }
    }   

    /**
     * @name sendAddData
     * @desc Called on click of AddData
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    $scope.addReturnData = function() {
        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.SubReturnInventory.CategoryID)
             $scope.SubReturnInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubReturnInventory.ProductID)
                $scope.SubReturnInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.ID == $scope.SubReturnInventory.VariantID) {
                $scope.SubReturnInventory.VariantName = Value.VariantName;
            } 
        });
        $scope.InventoryData.push(angular.copy($scope.SubReturnInventory));

        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
        $scope.SubReturnInventory = {};
    }

    /**
     * @name update
     * @desc Called on click of update button
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    $scope.update = function() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/updateChildData',
                SubFormInventory: $scope.SubReturnInventory,
            },
            success: function(Res) {
                console.log(Res);
                $scope.SubReturnInventory = Res['D'];
                loadInventoryData($scope.InventoryID);
                $('#category').val('').trigger('change.select2');
                $('#product').val('').trigger('change.select2');
                $('#variant').val('').trigger('change.select2');
                $scope.SubReturnInventory = {};
                $scope.updateChild = false;
                $scope.updateChild1 = false;
                $scope.addChild = true;
            }
        });
    }

    /**
     * @name update1
     * @desc Called on click of update button
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    $scope.update1 = function(Index) {
        angular.forEach($scope.InventoryData, function(Value, Key) {
            if (Key == Index) {
                onCategoryChange(Value.CategoryID);
                onProductChange(Value.ProductID);
                $('#category').val(Value.CategoryID).trigger('change.select2');
                $('#product').val(Value.ProductID).trigger('change.select2');
                $('#variant').val(Value.VariantID).trigger('change.select2');
            }   
        }); 

        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.SubReturnInventory.CategoryID)
             $scope.SubReturnInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubReturnInventory.ProductID)
                $scope.SubReturnInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.ID == $scope.SubReturnInventory.VariantID) {
                $scope.SubReturnInventory.VariantName = Value.VariantName;
            } 
        });

        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SubReturnInventory = {};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
    }

    /**
     * @name cancel
     * @desc Called on click of cancel button
     * @memberOf Controllers.ReturnInventoryCtrl
     */
    $scope.cancelChild = function() {
        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SubReturnInventory = {};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
    }

    function initSendInvMove() {
        $('#inventory-move').select2({
            placeholder: 'Select a Inventory Move',
            allowClear: true,
            width: 'off',
        });
    }
    function loadSendInvMoveDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryMove/getAllData'
            },
            success: function (Res) {
                initSendInvMove();
                $scope.InventoryMoveList = Res['D'];
            }
        });
    }
    function initSendInvAction() {
        $('#inventory-action').select2({
            placeholder: 'Select a Inventory Action',
            allowClear: true,
            width: 'off',
        });
    }
    function loadSendInvActionDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getActionForRInv'
            },
            success: function (Res) {
                initSendInvAction();
                $scope.InventoryActionList = Res['D'];
            }
        });
    }
    function initSendInvCustomer() {
        $('#inventory-customer').select2({
            placeholder: 'Select a Customer',
            allowClear: true,
            width: 'off',
        });
    }
    function loadSendInvCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function (Res) {
                initSendInvCustomer();
                $scope.CustomerList = Res['D'];
            }
        });
    }
    function initSendInvWarehouse() {
        $('#inventory-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
    }
    function loadSendInvWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function (Res) {
                initSendInvWarehouse();
                $scope.InventoryWarehouseList = Res['D'];
            }
        });
    }
    function initSendInvReason() {
        $('#ordering-reason').select2({
            placeholder: 'Select a Reason',
            allowClear: true,
            width: 'off',
        });
    }
    function loadSendInvReasonDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderingInventoryReason/getAllData'
            },
            success: function (Res) {
                initSendInvReason();
                $scope.OrderingReasonList = Res['D'];
            }
        });
    }
    function loadCategoryDropdown(CustomerID) {
        $scope.ProductList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getCategoryByCustomerID',
                CustomerID: CustomerID
            },
            success: function (Res) {
                $scope.CategoryList = Res['D'];
                $scope.$apply()
            }
        });
    }
    function loadProductDropdown(CategoryID) {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getProductByCustomerID',
                CategoryID: CategoryID,
                CustomerID: $scope.ReturnInventory.CustomerID
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
                EndPoint: 'Inventory/Inventory/getVariantByCustomerID',
                ProductID: ProductID,
                CustomerID: $scope.ReturnInventory.CustomerID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }

    function onCustomerChange(CustomerID) {
        loadCategoryDropdown(CustomerID);
    }
    function onCategoryChange(CategoryID) {
        loadProductDropdown(CategoryID);
    }
    function onProductChange(ProductID) {
        loadVariantDropdown(ProductID);
    }

    $scope.childData = true;
    function cancelReturnInventory() {
        $scope.ReturnInventory = {};
        $scope.SubReturnInventory = {};
        $scope.childData =false;
        
        $scope.ReturnInventory.$submitted = false;
        $('#inventory-move').val('').trigger('change.select2');
        $('#inventory-customer').val('').trigger('change.select2');
        $('#inventory-action').val('').trigger('change.select2');
        $('#ordering-reason').val('').trigger('change.select2');
        $('#inventory-warehouse').val('').trigger('change.select2');
        $("#category").val('').trigger('change.select2');
        $("#sproduct").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf inventory.InventoryManagement
     */
    function backToManagmentPage() {
        $location.url('/inventory/inventory-details');
    }

});
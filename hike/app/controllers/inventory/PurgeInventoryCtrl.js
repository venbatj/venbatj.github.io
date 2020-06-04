angular.module('RAT').controller('PurgeInventoryCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
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
        loadPurgeInventory(ID);
        loadInventoryData(ID);
    }

    $scope.SndInventory = {};
    $scope.PurgeInventory = {InventoryID:0};
    $scope.SubPurgeInventory = {};

    $scope.$on('$viewContentLoaded', function () {
        /* INITIALIZE THE SELECT2 DROPDOWN START */
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
    $scope.SInvMoveList = [];
    $scope.SInvActionList = [];
    $scope.SInvCustomerList = [];
    $scope.SInvWarehouseList = [];
    $scope.SInvOrderingReasonList = [];
    $scope.SupplierList = [];

    $scope.onWarehouseChange = onWarehouseChange;
    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.savePurgeInventory = savePurgeInventory;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.cancelPurgeInvantory = cancelPurgeInvantory;

    loadSupplierDropdown();
    loadPurgeMoveDropdown();
    loadPurgeActionDropdown();
    loadPurgeCustomerDropdown();
    loadPurgeWarehouseDropdown();
    loadPurgeReasonDropdown();

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
    $scope.SavePurgeInv = function() {
        $('#save-purge-inv').modal('show');
    }

    /**
     * @name loadInventoryData
     * @desc Called to load InventoryData
     * @memberOf Controllers.PurgeInventoryCtrl
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
     * @name loadPurgeInventory
     * @desc Called to load Inventory
     * @memberOf Controllers.PurgeInventoryCtrl
     */
    function loadPurgeInventory(ID) {
        var DTProps = DataTableS.getDefaults();
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.PurgeInventory = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $scope.onWarehouseChange(0, 'warehouse');
                    $scope.FlagName = 'warehouse';
                    $timeout(function () {
                        $('#inventory-supplier').val(Res['D'].SupplierID).trigger('change.select2');
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
            DataTableS.onDeleteClick('#purge-inventory-table', function(RefArr) {
            removeData(RefArr);
        });
    }
    
    /**
     * @name removeData
     * @desc Called on click of remove
     * @memberOf Controllers.PurgeInventoryCtrl
     */
    $scope.removeData = function(index, ID) {
        $scope.index = index;
        if (ID > 0) {
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickPurgeInventoryData1DeleteConfirmBoxOk');
        } else {
            $rootScope.DelConfirmBox('OnClickPurgeInventoryData2DeleteConfirmBoxOk');
        }
    }
    $scope.$on('OnClickPurgeInventoryData1DeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/removeInventory',
                ID: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    loadInventoryData($scope.InventoryID);
                }
            }
        });
    });
    $scope.$on('OnClickPurgeInventoryData2DeleteConfirmBoxOk', function(event, obj) {
        $scope.InventoryData.splice($scope.index, 1);
    });

    /**
     * @name savePurgeInventory
     * @desc Called on click of save button
     * @memberOf Controllers.PurgeInventoryCtrl
     */
    function savePurgeInventory(isValid) {
        if (isValid) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/purgeInsertUpdate',
                    Inventory: $scope.PurgeInventory,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                    if ($scope.AddPage)
                        loadRelationalData($scope.InventoryID);
                        $scope.SavePurgeInv();
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
     * @memberOf Controllers.PurgeInventoryCtrl
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
                        $scope.SubPurgeInventory = Res['D'];
                        onCategoryChange($scope.SubPurgeInventory.CategoryID);
                        onProductChange($scope.SubPurgeInventory.ProductID);
                        $timeout(function() {
                        $('#category').val(Res['D'].CategoryID).trigger('change.select2');
                        $('#product').val(Res['D'].ProductID).trigger('change.select2');
                        $('#variant').val(Res['D'].VariantID).trigger('change.select2');
                        }, 1000);
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
                    $scope.SubPurgeInventory = Value; 
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
     * @memberOf Controllers.PurgeInventoryCtrl
     */
    $scope.addPurgeData = function() {
        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.SubPurgeInventory.CategoryID)
             $scope.SubPurgeInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubPurgeInventory.ProductID)
                $scope.SubPurgeInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.ID == $scope.SubPurgeInventory.VariantID) {
                $scope.SubPurgeInventory.VariantName = Value.VariantName;
            } 
        });

        $scope.InventoryData.push(angular.copy($scope.SubPurgeInventory));

        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
        $scope.SubPurgeInventory = {};
    }

    /**
     * @name update
     * @desc Called on click of update button
     * @memberOf Controllers.PurgeInventoryCtrl
     */
    $scope.update = function() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/updateChildData',
                SubFormInventory: $scope.SubPurgeInventory,
            },
            success: function(Res) {
                $scope.SubPurgeInventory = Res['D'];
                loadInventoryData($scope.InventoryID);
                $('#category').val('').trigger('change.select2');
                $('#product').val('').trigger('change.select2');
                $('#variant').val('').trigger('change.select2');
                $scope.SubPurgeInventory = {};
                $scope.updateChild = false;
                $scope.updateChild1 = false;
                $scope.addChild = true;
            }
        });
    }

    /**
     * @name update1
     * @desc Called on click of update button
     * @memberOf Controllers.PurgeInventoryCtrl
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
            if (Value.ID == $scope.SubPurgeInventory.CategoryID)
             $scope.SubPurgeInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubPurgeInventory.ProductID)
                $scope.SubPurgeInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.ID == $scope.SubPurgeInventory.VariantID) {
                $scope.SubPurgeInventory.VariantName = Value.VariantName;
            } 
        });

        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SubPurgeInventory = {};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
    }

    $scope.cancelChild = function() {
        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SubPurgeInventory = {};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
    }

    function initInventorySupplier() {
        $('#inventory-supplier').select2({
            placeholder: 'Select a Supplier List',
            allowClear: true,
            width: 'off',
        });
    }

    function loadSupplierDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                initInventorySupplier();
                $scope.SupplierList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function initPurgeMove() {
        $('#inventory-move').select2({
            placeholder: 'Select a Inventory Move',
            allowClear: true,
            width: 'off',
        });
    }
    function loadPurgeMoveDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryMove/getAllData'
            },
            success: function (Res) {
                initPurgeMove();
                $scope.InventoryMoveList = Res['D'];
            }
        });
    }
    function initPurgeAction() {
        $('#inventory-action').select2({
            placeholder: 'Select a Inventory Action',
            allowClear: true,
            width: 'off',
        });
    }
    function loadPurgeActionDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getActionForPInv'
            },
            success: function (Res) {
                initPurgeAction();
                $scope.InventoryActionList = Res['D'];
            }
        });
    }
    function initPurgeCustomer() {
        $('#inventory-customer').select2({
            placeholder: 'Select a Customer',
            allowClear: true,
            width: 'off',
        });
    }
    function loadPurgeCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function (Res) {
                initPurgeCustomer();
                $scope.CustomerList = Res['D'];
            }
        });
    }
    function initPurgeWarehouse() {
        $('#inventory-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
    }
    function loadPurgeWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function (Res) {
                initPurgeWarehouse();
                $scope.WarehouseList = Res['D'];
            }
        });
    }
    function initPurgeReason() {
        $('#ordering-reason').select2({
            placeholder: 'Select a Reason',
            allowClear: true,
            width: 'off',
        });
    }
    function loadPurgeReasonDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderingInventoryReason/getAllData'
            },
            success: function (Res) {
                initPurgeReason();
                $scope.OrderingReasonList = Res['D'];
            }
        });
    }
    function loadPurgeCategoryDropdown() {
        $scope.ProductList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getCategoryByWarehouseID',
                WarehouseID: $scope.PurgeInventory.WarehouseID
            },
            success: function (Res) {
                $scope.CategoryList = Res['D'];
                $scope.$apply()
            }
        });
    }
    function loadPurgeProductDropdown(CategoryID) {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getProductByWarehouseID',
                CategoryID: CategoryID,
                WarehouseID: $scope.PurgeInventory.WarehouseID
            },
            success: function (Res) {
                $scope.ProductList = Res['D'];
                $("#product").val('').trigger('change.select2');
                $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }
    function loadPurgeVariantDropdown(ProductID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getVariantByWarehouseID',
                ProductID: ProductID,
                WarehouseID: $scope.PurgeInventory.WarehouseID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }

    function onWarehouseChange() {
        loadPurgeCategoryDropdown();
    }
    function onCategoryChange(CategoryID) {
        loadPurgeProductDropdown(CategoryID);
    }
    function onProductChange(ProductID) {
        loadPurgeVariantDropdown(ProductID);
    }

    $scope.childData = true;
    function cancelPurgeInvantory() {
        $scope.PurgeInventory = {};
        $scope.SubPurgeInventory = {};
        $scope.childData =false;
        
        $scope.PurgeInventory.$submitted = false;
        $('#inventory-supplier').val('').trigger('change.select2');
        $('#inventory-move').val('').trigger('change.select2');
        $('#inventory-customer').val('').trigger('change.select2');
        $('#inventory-action').val('').trigger('change.select2');
        $('#ordering-reason').val('').trigger('change.select2');
        $('#inventory-warehouse').val('').trigger('change.select2');
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
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
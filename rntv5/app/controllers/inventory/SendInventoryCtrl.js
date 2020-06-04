angular.module('RAT').controller('SendInventoryCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
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
        loadSendInventory(ID);
        loadInventoryData(ID);
    }

    $scope.SndInventory = {};
    $scope.SendInventory = {InventoryID:0};
    $scope.SendSubInventory = {};

    $scope.$on('$viewContentLoaded', function () {
        /* INITIALIZE THE SELECT2 DROPDOWN START */
        $('#send-inventory-move').select2({
            placeholder: 'Select a Inventory Move',
            allowClear: true,
            width: 'off',
        });
        $('#send-inventory-action').select2({
            placeholder: 'Select a Inventory Action',
            allowClear: true,
            width: 'off',
        });
        $('#send-inventory-customer').select2({
            placeholder: 'Select a Customer',
            allowClear: true,
            width: 'off',
        });
        $('#send-inventory-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#send-ordering-reason').select2({
            placeholder: 'Select a Reason',
            allowClear: true,
            width: 'off',
        });
        $('#send-variant').select2({
            placeholder: 'Select a Variant',
            allowClear: true,
            width: 'off',
        });
        $('#send-product').select2({
            placeholder: 'Select a Product',
            allowClear: true,
            width: 'off',
        });
        $('#send-category').select2({
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

    $scope.onSendWarehouseChange = onSendWarehouseChange;
    $scope.onSInvCategoryChange = onSInvCategoryChange;
    $scope.onSInvProductChange = onSInvProductChange;
    $scope.saveSendInventory = saveSendInventory;
    $scope.cancelSendInventory = cancelSendInventory;
    $scope.backToManagmentPage = backToManagmentPage;

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

    $scope.SaveSendInv = function() {
        $('#save-send-inv').modal('show');
    }

    function loadInventoryData(ID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                console.log(Res);
                if (Res['S']) {
                    // $scope.InventoryData = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name loadSendInventory
     * @desc Called to load Inventory
     * @memberOf Controllers.SendInventoryCtrl
     */
    function loadSendInventory(ID) {
        var DTProps = DataTableS.getDefaults();
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.SendInventory = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $scope.onSendWarehouseChange(0, 'warehouse');
                    $scope.loadCategory = 'warehouse';
                    
                    $timeout(function () {
                        $('#send-inventory-move').val(Res['D'].InventoryMoveID).trigger('change.select2');
                        $('#send-inventory-customer').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#send-inventory-action').val(Res['D'].ActionID).trigger('change.select2');
                        $('#send-ordering-reason').val(Res['D'].OrderingReasonID).trigger('change.select2');
                        $('#send-inventory-warehouse').val(Res['D'].WarehouseID).trigger('change.select2');
                    }, 500);
                    $scope.$apply();
                }
            }
        });
        oTable = $('#inventory-details-data-table').DataTable(DTProps);
            DataTableS.onDeleteClick('#send-inventory-table', function(RefArr) {
            removeData(RefArr);
        });
    }

    $scope.removeData = function(index, ID) {
        $scope.index = index;
        if (ID > 0) {
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickSendInventoryData1DeleteConfirmBoxOk');
        } else {
            $rootScope.DelConfirmBox('OnClickSendInventoryData2DeleteConfirmBoxOk');
        }
    }
    $scope.$on('OnClickSendInventoryData1DeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/removeInventory',
                    ID: $scope.deleteArray
                },
                success: function(Res) {
                    console.log(Res);   
                    if (Res['S'] && Res['D']) {
                        // oTable.draw();
                        loadInventoryData($scope.InventoryID);
                    }
                }
            });
    });
    $scope.$on('OnClickSendInventoryData2DeleteConfirmBoxOk', function(event, obj) {
        $scope.InventoryData.splice($scope.index, 1);
    });
    
    /**
     * @name saveSendInventory
     * @desc Called on click of save button
     * @memberOf Controllers.SendInventoryCtrl
     */
    function saveSendInventory(isValid) {
        if (isValid) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/returnInsertUpdate',
                    Inventory: $scope.SendInventory,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    console.log(Res);
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        loadSendInventory($scope.InventoryID);
                        $scope.SaveSendInv();
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
     * @memberOf Controllers.SendInventoryCtrl
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
                        $scope.SendSubInventory = Res['D'];
                        onSInvCategoryChange($scope.SendSubInventory.CategoryID);
                        onSInvProductChange($scope.SendSubInventory.ProductID);
                    
                        $timeout(function () {
                            $('#send-category').val(Res['D'].CategoryID).trigger('change.select2');
                            $('#send-product').val(Res['D'].ProductID).trigger('change.select2');
                            $('#send-variant').val(Res['D'].VariantID).trigger('change.select2');
                        }, 500);
                        
                    }
                }
            });
        } else {
            $scope.updateChild = false;
            $scope.updateChild1 = true;
            $scope.addChild = false;
            angular.forEach($scope.InventoryData, function(Value, Key) {
                if (Key == Index) {
                    $scope.SendSubInventory = Value; 
                    onSInvCategoryChange(Value.CategoryID);
                    onSInvProductChange(Value.ProductID);
                    $timeout(function () {
                        $('#send-category').val(Value.CategoryID).trigger('change.select2');
                        $('#send-product').val(Value.ProductID).trigger('change.select2');
                        $('#send-variant').val(Value.VariantID).trigger('change.select2');
                    }, 500);
                }
            });
        }
    }   

    /**
     * @name sendAddData
     * @desc Called on click of AddData
     * @memberOf Controllers.SendInventoryCtrl
     */
    $scope.sendAddData = function() {
        angular.forEach($scope.SInvCategoryList, function(Value, Key) {
            if (Value.ID == $scope.SendSubInventory.CategoryID)
             $scope.SendSubInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.SInvProductList, function(Value, Key) {
            if (Value.ID == $scope.SendSubInventory.ProductID)
                $scope.SendSubInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.SInvVariantList, function(Value, Key) {
            if (Value.ID == $scope.SendSubInventory.VariantID) {
                $scope.SendSubInventory.VariantName = Value.VariantName;
            } 
        });

        $scope.InventoryData.push(angular.copy($scope.SendSubInventory));

        $("#send-category").val('').trigger('change.select2');
        $("#send-product").val('').trigger('change.select2');
        $("#send-variant").val('').trigger('change.select2');
        $scope.SendSubInventory = {};
    }

    $scope.update = function() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/updateChildData',
                SubFormInventory: $scope.SendSubInventory,
            },
            success: function(Res) {
                $scope.SendSubInventory = Res['D'];
                loadInventoryData($scope.InventoryID);
                $('#send-category').val('').trigger('change.select2');
                $('#send-product').val('').trigger('change.select2');
                $('#send-variant').val('').trigger('change.select2');
                $scope.SendSubInventory = {};
                $scope.updateChild = false;
                $scope.updateChild1 = false;
                $scope.addChild = true;
            }
        });
    }

    $scope.update1 = function(Index) {
        angular.forEach($scope.InventoryData, function(Value, Key) {
            if (Key == Index) {
                onSInvCategoryChange(Value.CategoryID);
                onSInvProductChange(Value.ProductID);
                $('#send-category').val(Value.CategoryID).trigger('change.select2');
                $('#send-product').val(Value.ProductID).trigger('change.select2');
                $('#send-variant').val(Value.VariantID).trigger('change.select2');
            }   
        }); 

        angular.forEach($scope.SInvCategoryList, function(Value, Key) {
            if (Value.ID == $scope.SendSubInventory.CategoryID)
             $scope.SendSubInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.SInvProductList, function(Value, Key) {
            if (Value.ID == $scope.SendSubInventory.ProductID)
                $scope.SendSubInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.SInvVariantList, function(Value, Key) {
            if (Value.ID == $scope.SendSubInventory.VariantID) {
                $scope.SendSubInventory.VariantName = Value.VariantName;
            } 
        });

        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SendSubInventory = {};
        $('#send-category').val('').trigger('change.select2');
        $('#send-product').val('').trigger('change.select2');
        $('#send-variant').val('').trigger('change.select2');
    }

    $scope.cancelChild = function() {
        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SendSubInventory = {};
        $('#send-category').val('').trigger('change.select2');
        $('#send-product').val('').trigger('change.select2');
        $('#send-variant').val('').trigger('change.select2');
    }

    function loadSendInvMoveDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryMove/getAllData'
            },
            success: function (Res) {
                $scope.SInvMoveList = Res['D'];
            }
        });
    }
   
    function loadSendInvActionDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getActionForSInv'
            },
            success: function (Res) {
                $scope.SInvActionList = Res['D'];
            }
        });
    }
    
    function loadSendInvCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function (Res) {
                $scope.SInvCustomerList = Res['D'];
            }
        });
    }
  
    function loadSendInvWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function (Res) {
                $scope.SInvWarehouseList = Res['D'];
            }
        });
    }
   
    function loadSendInvReasonDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderingInventoryReason/getAllData'
            },
            success: function (Res) {
                $scope.SInvOrderingReasonList = Res['D'];
            }
        });
    }    
    function loadSendCategoryDropdown(WarehouseID) {
        $scope.SInvProductList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getCategoryByWarehouseID',
                WarehouseID: WarehouseID
            },
            success: function (Res) {
                $scope.SInvCategoryList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function loadSendProductDropdown(CategoryID) {
        $scope.SInvVariantList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getProductByWarehouseID',
                CategoryID: CategoryID,
                WarehouseID: $scope.SendInventory.WarehouseID
            },
            success: function (Res) {
                $scope.SInvProductList = Res['D'];
                $("#send-product").val('').trigger('change.select2');
                $("#send-variant").val('').trigger('change.select2');
               
                $scope.$apply();
            }
        });
    }
    function loadSendVariantDropdown(ProductID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getVariantByWarehouseID',
                ProductID: ProductID,
                WarehouseID: $scope.SendInventory.WarehouseID
            },
            success: function (Res) {
                $scope.SInvVariantList = Res['D'];
                $("#send-variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }

    function onSendWarehouseChange(WarehouseID) {
        loadSendCategoryDropdown(WarehouseID);
        
    }
    function onSInvCategoryChange(CategoryID) {
        loadSendProductDropdown(CategoryID);
    }
    function onSInvProductChange(ProductID) {
        loadSendVariantDropdown(ProductID);
    }

    $scope.childData = true;
    function cancelSendInventory() {
        $scope.SendInventory = {};
        $scope.SendSubInventory = {};
        $scope.childData =false;
        
        $scope.SendInventory.$submitted = false;
        $('#send-inventory-move').val('').trigger('change.select2');
        $('#send-inventory-customer').val('').trigger('change.select2');
        $('#send-inventory-action').val('').trigger('change.select2');
        $('#send-ordering-reason').val('').trigger('change.select2');
        $('#send-inventory-warehouse').val('').trigger('change.select2');
        $('#send-category').val('').trigger('change.select2');
        $('#send-product').val('').trigger('change.select2');
        $('#send-variant').val('').trigger('change.select2');
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
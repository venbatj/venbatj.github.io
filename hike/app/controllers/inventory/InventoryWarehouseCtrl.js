angular.module('RAT').controller('InventoryWarehouseCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
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
        loadInventory(ID);
        loadInventoryData(ID);
    }

    $scope.OrderwareInventor = {};
    $scope.OrderWarehouse = {InventoryID:0};
    $scope.SubOrderWarehouse = {};

    $scope.disableorder  = true;
    $scope.$on('$viewContentLoaded', function () {
        /* INITIALIZE THE SELECT2 DROPDOWN START */

        $('#inventory-supplier').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-action').select2({
            placeholder: 'Select a Inventory Action',
            allowClear: true,
            width: 'off',
        });
        $('#ordering-reason').select2({
            placeholder: 'Select a Order Inventory Reason ',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-move').select2({
            placeholder: 'Select a Inventory Move',
            allowClear: true,
            width: 'off',
        });
        $('#order-type').select2({
            placeholder: 'Select a Ordering Inventory Type',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#category').select2({
            placeholder: 'Select a category',
            allowClear: true,
            width: 'off',
        });
        $('#product').select2({
            placeholder: 'Select a category',
            allowClear: true,
            width: 'off',
        });
        $('#variant').select2({
            placeholder: 'Select a category',
            allowClear: true,
            width: 'off',
        });
    });

    $scope.SupplierList = [];
    $scope.CategoryList = [];
    $scope.OrderinventoryforList = [];
    $scope.ProductList = []; // Product
    $scope.VariantList = []; // Variant
    $scope.OrderTypeList = [];
    $scope.InventoryMoveList = [];
    $scope.IdentifyLinenList = [];
    $scope.OrderingReasonList = [];
    $scope.InventoryActionList = [];
    $scope.InventoryWarehouseList = [];
    $scope.InventoryData = [];

    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.onVariantChange = onVariantChange;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.saveInventory = saveInventory;
    $scope.cancelSubInvantory = cancelSubInvantory;
    $scope.removeData = removeData;

    loadCategoryDropdown();
    loadInventoryMoveDropdown();
    loadIdentifyLinenDropdown();
    loadInventorySupplierDropdown();
    loadOrderTypeIDDropdown();
    loadOrderingReasonIDDropdown();
    loadInventoryActionIDDropdown();
    loadWarehouseIDDropdown();

    $scope.updateChild = false;
    $scope.updateChild1 = false;
    $scope.addChild = true;

    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
        
    $scope.showWareInventory = function() {
        $('#saveinventory').modal('show');
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
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name loadInventory
     * @desc Called to load customer details
     * @memberOf Controllers.CustomerDetail
     */
    function loadInventory(ID) {
        var DTProps = DataTableS.getDefaults();
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                $scope.disableorder  = true;
                if (Res['S']) {
                    $scope.OrderWarehouse = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $timeout(function () {
                        $('#order-type').val(Res['D'].OrderTypeID).trigger('change.select2');
                        $('#inventory-move').val(Res['D'].InventoryMoveID).trigger('change.select2');
                        $('#inventory-action').val(Res['D'].ActionID).trigger('change.select2');
                        $('#inventory-warehouse').val(Res['D'].WarehouseID).trigger('change.select2');
                        $('#inventory-supplier').val(Res['D'].SupplierID).trigger('change.select2');
                        $('#ordering-reason').val(Res['D'].OrderingReasonID).trigger('change.select2');
                        $("#category").val(Res['D'].CategoryID).trigger('change.select2');
                        $("#product").val(Res['D'].ProductID).trigger('change.select2');
                        $("#variant").val(Res['D'].VariantID).trigger('change.select2');
                    
                    }, 500);
                    $scope.$apply();
                }
            }
        });
            oTable = $('#inventory-details-data-table').DataTable(DTProps);
            DataTableS.onDeleteClick('#inventory-warehouse-table', function(RefArr) {
            removeData(RefArr);
        });
    } 

    function removeData(index,ID) {
        $scope.index = index;
        if (ID > 0) {
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickWarehouseInventoryDataDeleteConfirmBoxOk');
         }else{
            $rootScope.DelConfirmBox('OnClickchildWarehouseInventoryDataDeleteConfirmBoxOk');
        }
    }

    $scope.$on('OnClickWarehouseInventoryDataDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/removeInventory',
                ID: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    loadInventoryData($scope.InventoryID);
                }
            }
        });
    });

    $scope.$on('OnClickchildWarehouseInventoryDataDeleteConfirmBoxOk', function(event, obj) {
        $scope.InventoryData.splice($scope.index, 1);
    });

    /**
     * @name saveInventory
     * @desc Called on click of save button
     * @memberOf Controllers.CustomerDetail
     */
    function saveInventory(isValid) {
        if (isValid) {
            Ajax({
                data:{
                    EndPoint: 'Inventory/Inventory/WarehouseinsertUpdate',
                    OrderWarehouse: $scope.OrderWarehouse,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                    if ($scope.AddPage)
                        loadRelationalData($scope.InventoryID);
                        $scope.showWareInventory();
                        // backToManagmentPage();
                    }
                    $scope.$apply();
                }
            });
        }
    }

    $scope.editData = function(Index, ID) {
        $scope.updateChild = true;
        $scope.updateChild1 = false;
        $scope.addChild = false;
        if (ID != undefined) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/getCustomerDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.SubOrderWarehouse = Res['D'];
                        onCategoryChange($scope.SubOrderWarehouse.CategoryID);
                        onProductChange($scope.SubOrderWarehouse.ProductID);
                        setTimeout(function(){
                            $('#category').val(Res['D'].CategoryID).trigger('change.select2');
                            $('#product').val(Res['D'].ProductID).trigger('change.select2');
                            $('#variant').val(Res['D'].VariantID).trigger('change.select2');
                        },1000);
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
                    $scope.SubOrderWarehouse = Value; 
                    onCategoryChange(Value.CategoryID);
                    onProductChange(Value.ProductID);
                    $timeout(function () {
                        $('#category').val(Value.CategoryID).trigger('change.select2');
                        $('#product').val(Value.ProductID).trigger('change.select2');
                        $('#variant').val(Value.VariantID).trigger('change.select2');
                    }, 1000);
                }
            });
        }
    }     

    $scope.update1 = function() {
        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.SubOrderWarehouse.CategoryID)
             $scope.SubOrderWarehouse.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubOrderWarehouse.ProductID)
                $scope.SubOrderWarehouse.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.VariantID == $scope.SubOrderWarehouse.VariantID) 
                $scope.SubOrderWarehouse.VariantName = Value.VariantName;
        });
        $scope.SubOrderWarehouse ={};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
        $scope.addChild = true;
        $scope.updateChild = false;
        $scope.updateChild1 = false;
    }
    
    $scope.update = function() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/updateChildData',
                SubFormInventory: $scope.SubOrderWarehouse,
            },
            success: function(Res) {
                console.log(Res);
                $scope.SubOrderWarehouse = Res['D'];
                loadRelationalData($scope.InventoryID);
                $('#category').val('').trigger('change.select2');
                $('#product').val('').trigger('change.select2');
                $('#variant').val('').trigger('change.select2');
                $scope.updateChild = false;
                $scope.updateChild1 = false;
                $scope.addChild = true;
                $scope.SubOrderWarehouse ={};
            }
        });
    }

    $scope.cancelChild = function() {
        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SubOrderWarehouse = {};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
    }

    $scope.cancelTable = cancelTable;
    function cancelTable($index) {
        $scope.InventoryData.splice($index);
    }

    /**
     * @name cancelSubInvantory
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.Category
     */
        function cancelSubInvantory() {
        $scope.OrderWarehouse = {};
        $scope.SubOrderWarehouse = {};
        cancelTable();
        $scope.OrderwareInventor.$submitted = false;
        $('#order-type').val('').trigger('change.select2');
        $('#inventory-move').val('').trigger('change.select2');
        $('#customer-id').val('').trigger('change.select2');
        $('#inventory-action').val('').trigger('change.select2');
        $('#ordering-reason').val('').trigger('change.select2');
        $('#inventory-supplier').val('').trigger('change.select2');
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
    }

    $scope.addcustData =function() {
        
       angular.forEach($scope.CategoryList, function(Value, Key) {
           if (Value.ID == $scope.SubOrderWarehouse.CategoryID)
            $scope.SubOrderWarehouse.CategoryName = Value.CategoryName;
       });
       angular.forEach($scope.ProductList, function(Value, Key) {
           if (Value.ID == $scope.SubOrderWarehouse.ProductID)
               $scope.SubOrderWarehouse.ProductName = Value.ProductName;
       });
       angular.forEach($scope.VariantList, function(Value, Key) {
           if (Value.VariantID == $scope.SubOrderWarehouse.VariantID) {
               $scope.SubOrderWarehouse.VariantName = Value.VariantName;
           } 
       });  
       $scope.InventoryData.push(angular.copy($scope.SubOrderWarehouse));
       $("#category").val('').trigger('change.select2');
       $("#product").val('').trigger('change.select2');
       $("#variant").val('').trigger('change.select2');
       $scope.SubOrderWarehouse = {};

    }

    function loadInventoryActionIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getInventoryaction'
            },
            success: function (Res) {
                $scope.InventoryActionList = Res['D'];
                $scope.$apply();
            }
        });
    }
   
    function loadOrderingReasonIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderingInventoryReason/getAllData'
            },
            success: function (Res) {
                $scope.OrderingReasonList = Res['D'];
                $scope.$apply();
            }
        });
    }
   
    function loadIdentifyLinenDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/IdentifyLinen/getAllData'
            },
            success: function (Res) {
                $scope.IdentifyLinenList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryMoveDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryMove/getAllData'
            },
            success: function (Res) {
                $scope.InventoryMoveList = Res['D'];
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
   
    function loadWarehouseIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function (Res) {
                $scope.InventoryWarehouseList = Res['D'];
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
                // if ($scope.InventoryOrderID < 0) {
                //     $scope.OrderWarehouse.ProductID = '';
                //     $scope.OrderWarehouse.VariantID = '';
                    $("#product").val('').trigger('change.select2');
                    $("#variant").val('').trigger('change.select2');
                // }
                $scope.$apply();
            }
        });
    }

    function loadInventorySupplierDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.SupplierList = Res['D'];
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
                // if ($scope.InventoryOrderID < 0) {
                //     $scope.OrderWarehouse.VariantID = '';
                    $("#variant").val('').trigger('change.select2');
                // }
                $scope.$apply();
            }
        });
    }

    function loadPricing(VariantID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getVariantID',
                VariantID: VariantID
            },
            success: function (Res) {
                if (Res['S'] && Res['D']) {
                    $scope.OrderWarehouse.VariantName = Res['D']['VariantName'];
                    $scope.$apply();
                }
            }
        });
    }

    function onCategoryChange(ID) {
        loadProductDropdown(ID);
    }

    function onProductChange(ProductID) {
        loadVariantDropdown(ProductID);
    }

    function onVariantChange(VariantID) {
        loadPricing(VariantID);
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf inventory.InventoryManagement
     */
    function backToManagmentPage() {
        $location.url('/inventory/inventory-warehouse-list');
    }
});
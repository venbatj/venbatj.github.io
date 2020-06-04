angular.module('RAT').controller('AddInventoryCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
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

    $scope.AddFrmInventor = {};
    $scope.AddWareSupply = {InventoryID:0};
    $scope.SubAddWareSupply = {};

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
    $scope.InventoryMoveList = [];
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
    loadInventorySupplierDropdown();
    loadOrderingReasonIDDropdown();
    loadInventoryActionIDDropdown();
    loadWarehouseIDDropdown();


    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    $scope.paste = function (e) {
        e.preventDefault();
        return false
    }

        
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
                    $scope.AddWareSupply = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    console.log($scope.AddWareSupply);
                    console.log($scope.InventoryData);
                    $timeout(function () {
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
            DataTableS.onDeleteClick('#order-inventory-customer-add-table', function(RefArr) {
            removeData(RefArr);
        });
    }
    function removeData(index,ID) {
        $scope.index = index;
        if (ID > 0) {
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickAddInventoryDataDeleteConfirmBoxOk');
        }else{
            $rootScope.DelConfirmBox('OnClickAddInventorychildDataDeleteConfirmBoxOk');
        }
    }
        $scope.$on('OnClickAddInventoryDataDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/removeInventory',
                    ID: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        // oTable.draw();
                        loadInventoryData($scope.InventoryID);
                    }
                }
            });
        });
        $scope.$on('OnClickAddInventorychildDataDeleteConfirmBoxOk', function(event, obj) {
            $scope.InventoryData.splice($scope.index, 1);
        });

        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.editData = function(Index, ID) {
        $scope.updateChild = true;
        $scope.addChild = false;
            if (ID != undefined) {
                Ajax({
                        data: {
                            EndPoint: 'Inventory/Inventory/getCustomerDataByID',
                            ID: ID
                        },
                        success: function(Res) {
                            if (Res['S']) {
                                $scope.SubAddWareSupply = Res['D'];
                                onCategoryChange($scope.SubAddWareSupply.CategoryID);
                                onProductChange($scope.SubAddWareSupply.ProductID);
                                setTimeout(function(){
                                $('#category').val(Res['D'].CategoryID).trigger('change.select2');
                                $('#product').val(Res['D'].ProductID).trigger('change.select2');
                                $('#variant').val(Res['D'].VariantID).trigger('change.select2');
                            },1000);
                        // $scope.$apply();
                        }
                    }
                });
            } else {
                $scope.updateChild = false;
                $scope.updateChild1 = true;
                $scope.addChild = false;
                angular.forEach($scope.InventoryData, function(Value, Key) { 
                    if (Key == Index) { 
                        $scope.SubAddWareSupply = Value; 
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

        $scope.update1 = function(Index) {
            angular.forEach($scope.CategoryList, function(Value, Key) {
                if (Value.ID == $scope.SubAddWareSupply.CategoryID)
                 $scope.SubAddWareSupply.CategoryName = Value.CategoryName;
            });
            angular.forEach($scope.ProductList, function(Value, Key) {
                if (Value.ID == $scope.SubAddWareSupply.ProductID)
                    $scope.SubAddWareSupply.ProductName = Value.ProductName;
            });
            angular.forEach($scope.VariantList, function(Value, Key) {
                if (Value.VariantID == $scope.SubAddWareSupply.VariantID) 
                    $scope.SubAddWareSupply.VariantName = Value.VariantName;
            });
            $scope.SubAddWareSupply ={};
            $('#category').val('').trigger('change.select2');
            $('#product').val('').trigger('change.select2');
            $('#variant').val('').trigger('change.select2');
            $scope.addChild = true;
            $scope.updateChild1 = false;
        }

        $scope.update = function() {
            console.log('come');
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/updateChildData',
                    SubFormInventory: $scope.SubAddWareSupply,
                },
                success: function(Res) {
                    $scope.SubAddWareSupply = Res['D'];
                    loadRelationalData($scope.InventoryID);
                    $('#category').val('').trigger('change.select2');
                    $('#product').val('').trigger('change.select2');
                    $('#variant').val('').trigger('change.select2');
                    $scope.updateChild = false;
                    $scope.addChild = true;
                    $scope.SubAddWareSupply ={};
                }
            });
        } 
        $scope.cancelChild = function() {
            $scope.updateChild = false;
            $scope.updateChild1 = false;
            $scope.addChild = true;
            $scope.SubAddWareSupply = {};
            $('#category').val('').trigger('change.select2');
            $('#product').val('').trigger('change.select2');
            $('#variant').val('').trigger('change.select2');
        }
    
    /**
     * @name saveInventory
     * @desc Called on click of save button
     * @memberOf Controllers.CustomerDetail
     */
    function saveInventory(isValid) {
        if (isValid) {
            Ajax({
                data:{
                    EndPoint: 'Inventory/Inventory/AddDatainsertUpdate',
                    AddWareSupply: $scope.AddWareSupply,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                    if ($scope.AddPage)
                        loadRelationalData($scope.InventoryID);
                        $scope.showWareInventory();                        
                        backToManagmentPage();
                    }
                    $scope.$apply();
                }
            });
        }
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
        $scope.AddWareSupply = {};
        $scope.SubAddWareSupply = {};
        cancelTable();

        $scope.AddFrmInventor.$submitted = false;
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

    $scope.addInventoryData =function() {
        
       angular.forEach($scope.CategoryList, function(Value, Key) {
           if (Value.ID == $scope.SubAddWareSupply.CategoryID)
            $scope.SubAddWareSupply.CategoryName = Value.CategoryName;
       });
       angular.forEach($scope.ProductList, function(Value, Key) {
           if (Value.ID == $scope.SubAddWareSupply.ProductID)
               $scope.SubAddWareSupply.ProductName = Value.ProductName;
       });
       angular.forEach($scope.VariantList, function(Value, Key) {
           if (Value.VariantID == $scope.SubAddWareSupply.VariantID) {
               $scope.SubAddWareSupply.VariantName = Value.VariantName;
           } 
       });  
       $scope.InventoryData.push(angular.copy($scope.SubAddWareSupply));
       $("#category").val('').trigger('change.select2');
       $("#product").val('').trigger('change.select2');
       $("#variant").val('').trigger('change.select2');
       $scope.SubAddWareSupply = {};
    }


    function initInventoryAction() {
    }
    function loadInventoryActionIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getInventoryaction'
            },
            success: function (Res) {
                initInventoryAction();
                $scope.InventoryActionList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initOrderingReason() {
    }
    function loadOrderingReasonIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderingInventoryReason/getAllData'
            },
            success: function (Res) {
                initOrderingReason();
                $scope.OrderingReasonList = Res['D'];
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
    function initCustomer() {
    }
    function loadWarehouseIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function (Res) {
                initCustomer();
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
                if ($scope.InventoryOrderID < 0) {
                    $scope.AddWareSupply.ProductID = '';
                    $scope.AddWareSupply.VariantID = '';
                }
                $scope.$apply();
            }
        });
    }

    function initInventorySupplier() {
    }

    function loadInventorySupplierDropdown() {
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


    function loadVariantDropdown(ProductID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getVariantByProductID',
                ProductID: ProductID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                if ($scope.InventoryOrderID < 0) {
                    $scope.AddWareSupply.VariantID = '';
                }
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
                    $scope.AddWareSupply.VariantName = Res['D']['VariantName'];
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
        $location.url('/inventory/inventory-details');
    }


});
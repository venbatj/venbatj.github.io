angular.module('RAT').controller('InventoryCustomerCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
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

    $scope.OrderFrmInventor = {};
    $scope.OrderCustomer = {InventoryID:0};
    $scope.SubOrderCustomer = {};

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
        $('#customer-id').select2({
            placeholder: 'Select a customer',
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
    $scope.ProductList = []; 
    $scope.VariantList = []; 
    $scope.OrderTypeList = [];
    $scope.InventoryMoveList = [];
    $scope.OrderingReasonList = [];
    $scope.InventoryActionList = [];
    $scope.CustomerList = [];
    $scope.InventoryData = [];

    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.onVariantChange = onVariantChange;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.saveInventory = saveInventory;
    $scope.cancelSubInvantory = cancelSubInvantory;
    // $scope.Calculate = Calculate;
    $scope.cancelTable = cancelTable;

    loadCategoryDropdown();
    loadInventoryMoveDropdown();
    loadIdentifyLinenDropdown();
    loadInventorySupplierDropdown();
    loadOrderTypeIDDropdown();
    loadOrderingReasonIDDropdown();
    loadInventoryActionIDDropdown();
    loadCustomerIDDropdown();

    $scope.updateChild = false;
    $scope.updateChild1 = false;
    $scope.addChild = true;

    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
        
    $scope.showCustInventory = function() {
        $('#saveinventory').modal('show');
    }

    /**
     * @name Calculate
     * @desc Called on click of load Calculate Salary
     * @memberOf Controllers.CalculateDeliveryTechCost
     */
    // function Calculate() {
    //     $scope.SubOrderCustomer.QtyToBeOrdered = Math.round($scope.SubOrderCustomer.QtyByCustomer - $scope.SubOrderCustomer.QtyUsedFromWarehouse);
    // }    

    /**
     * @name loadInventoryData
     * @desc Called on click of load load Inventory Data
     * @memberOf Controllers.loadInventoryData
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
     * @name loadInventory
     * @desc Called to load customer details
     * @memberOf Controllers.InventorycustomerCrtl
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
                    $scope.OrderCustomer = Res['D'];
                    $scope.InventoryData = Res['D']['SubInventory'];
                    $timeout(function () {
                        $('#order-type').val(Res['D'].OrderTypeID).trigger('change.select2');
                        $('#inventory-move').val(Res['D'].InventoryMoveID).trigger('change.select2');
                        $('#inventory-action').val(Res['D'].ActionID).trigger('change.select2');
                        $('#customer-id').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#inventory-supplier').val(Res['D'].SupplierID).trigger('change.select2');
                        $('#ordering-reason').val(Res['D'].OrderingReasonID).trigger('change.select2');
                        $('#category').val(Res['D'].CategoryID).trigger('change.select2');
                    
                    }, 500);
                    $scope.$apply();
                }
            }
        });
        oTable = $('#inventory-details-data-table').DataTable(DTProps);
        DataTableS.onDeleteClick('#order-inventory-customer-table', function(RefArr) {
            removeData(RefArr);
        });
    }

    $scope.removeData = function(index, ID) {
        $scope.index = index;
        if(ID >0){
            $scope.deleteArray = ID;
            $rootScope.DelConfirmBox('OnClickInventoryCustomerDeleteConfirmBoxOk');
        }else{
            $rootScope.DelConfirmBox('OnClickchildInventoryCustomerDeleteConfirmBoxOk');
        }
    }

    $scope.$on('OnClickInventoryCustomerDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/removeInventory',
                ID: $scope.deleteArray
            },
            success: function(Res) {
                console.log(Res);
                if (Res['S'] && Res['D']) {
                    loadInventoryData($scope.InventoryID);
                }
            }
        });
    });

    $scope.$on('OnClickchildInventoryCustomerDeleteConfirmBoxOk', function(event, obj) {
        $scope.InventoryData.splice($scope.index, 1);
    });

    /**
     * @name saveInventory
     * @desc Called on click of save button
     * @memberOf Controllers.CustomerDetail
     */
    function saveInventory() {
            Ajax({
                data:{
                    EndPoint: 'Inventory/Inventory/OrderinsertUpdate',
                    OrderCustomer: $scope.OrderCustomer,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        loadRelationalData($scope.InventoryID);
                        $scope.showCustInventory();
                    }
                    $scope.$apply();
                }
            });
    }

    function cancelTable($index) {
        $scope.InventoryData.splice($index);
    }

    /**
     * @name cancelSubInvantory
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.Category
     */
    function cancelSubInvantory() {
        $scope.OrderCustomer = {};
        $scope.SubOrderCustomer = {};
        cancelTable();

        $scope.OrderFrmInventor.$submitted = false;
        
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

    $scope.custyinv = true;
    $scope.addcustData =function() {
       angular.forEach($scope.CategoryList, function(Value, Key) {
           if (Value.ID == $scope.SubOrderCustomer.CategoryID)
            $scope.SubOrderCustomer.CategoryName = Value.CategoryName;
       });
       angular.forEach($scope.ProductList, function(Value, Key) {
           if (Value.ID == $scope.SubOrderCustomer.ProductID)
               $scope.SubOrderCustomer.ProductName = Value.ProductName;
       });
       angular.forEach($scope.VariantList, function(Value, Key) {
           if (Value.VariantID == $scope.SubOrderCustomer.VariantID) 
               $scope.SubOrderCustomer.VariantName = Value.VariantName;
       });

       $scope.InventoryData.push(angular.copy($scope.SubOrderCustomer));
       $("#category").val('').trigger('change.select2');
       $("#product").val('').trigger('change.select2');
       $("#variant").val('').trigger('change.select2');
       $scope.SubOrderCustomer = {};

    }

    /**
     * @name editData
     * @desc Called on click of edit
     * @memberOf Controllers.InventoryCustomerCtrl
     */
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
                        $scope.SubOrderCustomer = Res['D'];
                        onCategoryChange($scope.SubOrderCustomer.CategoryID);
                        onProductChange($scope.SubOrderCustomer.ProductID);
                        setTimeout(function(){
                            $('#category').val(Res['D'].CategoryID).trigger('change.select2');
                            $('#product').val(Res['D'].ProductID).trigger('change.select2');
                            $('#variant').val(Res['D'].VariantID).trigger('change.select2');
                        },1000);
                    }
                }
            });
        } else {
            $scope.updateChild = false;
            $scope.updateChild1 = true;
            $scope.addChild = false;
            angular.forEach($scope.InventoryData, function(Value, Key) { 
                if (Key == Index) { 
                    $scope.SubOrderCustomer = Value; 
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
            if (Value.ID == $scope.SubOrderCustomer.CategoryID)
             $scope.SubOrderCustomer.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubOrderCustomer.ProductID)
                $scope.SubOrderCustomer.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.VariantID == $scope.SubOrderCustomer.VariantID) 
                $scope.SubOrderCustomer.VariantName = Value.VariantName;
        });
        $scope.SubOrderCustomer ={};
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
                EndPoint: 'Inventory/Inventory/updatecustChildData',
                SubOrderCustomer: $scope.SubOrderCustomer,
            },
            success: function(Res) {
                $scope.SubOrderCustomer = Res['D'];
                loadRelationalData($scope.InventoryID);
                $('#category').val('').trigger('change.select2');
                $('#product').val('').trigger('change.select2');
                $('#variant').val('').trigger('change.select2');
                $scope.updateChild = false;
                $scope.updateChild1 = false;
                $scope.addChild = true;
                $scope.SubOrderCustomer ={};
            }
        });
    }

    $scope.cancelChild = function() {
        $scope.updateChild = false;
        $scope.updateChild1 = false;
        $scope.addChild = true;
        $scope.SubOrderCustomer = {};
        $('#category').val('').trigger('change.select2');
        $('#product').val('').trigger('change.select2');
        $('#variant').val('').trigger('change.select2');
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
   
    function loadCustomerIDDropdown() {
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
                $("#variant").val('').trigger('change.select2');
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
                    $scope.OrderCustomer.VariantName = Res['D']['VariantName'];
                    $scope.$apply();
                }
            }
        });
    }

    function onCategoryChange(ID) {
        loadProductDropdown(ID);
    }

    function onProductChange(ID) {
        loadVariantDropdown(ID);
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
        $location.url('/inventory/inventory-customer-list');
    }


});
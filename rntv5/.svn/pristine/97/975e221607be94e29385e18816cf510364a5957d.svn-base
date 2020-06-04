angular.module('RAT').controller('OrderInventoryCtrl', function ($state, $scope, $timeout, $location) {

    if ($state.params != null && $state.params.InventoryID != null && $state.params.InventoryID > 0)
        $scope.InventoryID = $state.params.InventoryID;

    if ($scope.InventoryID > 0) {
        $timeout(function () {
            loadRelationalData($scope.InventoryID);
        }, 1000);
    }
    function loadRelationalData(ID) {
        loadInventory(ID);
    }
    $scope.FormOrderInventory = {};
    $scope.FormData = {};

    $scope.CategoryList = [];
    $scope.OrderinventoryforList = [];
    $scope.ProductList = []; // Product
    $scope.VariantList = []; // Variant


    $scope.$on('$viewContentLoaded', function () {
        /* INITIALIZE THE SELECT2 DROPDOWN START */

        $('#ordering-reason').select2({
            placeholder: 'Select a Order Inventory Reason ',
            allowClear: true,
            width: 'off',
        });
        $('#order-type').select2({
            placeholder: 'Select a Ordering Inventory Type',
            allowClear: true,
            width: 'off',
        });
        $('#customer').select2({
            placeholder: 'Select a customer',
            allowClear: true,
            width: 'off',
        });
    });
    $scope.OrderTypeList = [];
    $scope.OrderingReasonList = [];
    $scope.CustomerList = [];

    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.onOrderTypeChange = onOrderTypeChange;
    $scope.onVariantChange = onVariantChange;
    $scope.CheckTypeValue = CheckTypeValue;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.saveInventory = saveInventory;
    $scope.cancelSubInvantory = cancelSubInvantory;
    $scope.removeData = removeData;
    $scope.addData = addData;
    $scope.Calculate = Calculate;

    loadCategoryDropdown();
    loadOrderTypeIDDropdown();
    loadOrderingReasonIDDropdown();
    loadCustomerIDDropdown();


    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    $scope.paste = function (e) {
        e.preventDefault();
        return false
    }
              
    /**
     * @name Calculate
     * @desc Called on click of load Calculate Salary
     * @memberOf Controllers.CalculateDeliveryTechCost
     */
    function Calculate(){
        $scope.FormData.QtyToBeOrdered =$scope.FormData.QtyByCustomer - $scope.FormData.QtyUsedFromWarehouse;
    }    

    /**
     * @name loadInventory
     * @desc Called to load customer details
     * @memberOf Controllers.CustomerDetail
     */
    function loadInventory(ID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/OrderInventory/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S']) {
                    $scope.Inventory = Res['D'];
                    if (Res['D'].OrderTypeID == 1) {
                        $scope.OrderType = 'Customer';
                        $scope.CustomerEnable = true;
                    }
                    else if (Res['D'].OrderTypeID == 2) {
                        $scope.OrderType = 'Warehouse';
                        $scope.WarehouseEnable = true;
                    }
                    $timeout(function () {
                        $scope.InventoryItem = true;
                        $("#category").val(Res['D'].CategoryID).trigger('change.select2');
                        $scope.onCategoryChange(Res['D'].CategoryID);
                        $scope.InventoryData = (Res['D']);
                        $scope.onProductChange(Res['D'].ProductID);
                        $('#order-type').val(Res['D'].OrderTypeID).trigger('change.select2');
                        $('#customer').val(Res['D'].CustomerID).trigger('change.select2');
                        $('#ordering-reason').val(Res['D'].OrderingReasonID).trigger('change.select2');
                    }, 500);
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveInventory
     * @desc Called on click of save button
     * @memberOf Controllers.CustomerDetail
     */
    function saveInventory(isValid) {
        $scope.FormData.EndPoint = 'Inventory/OrderInventory/insertUpdate';
        if (isValid) {
            Ajax({
                data: $scope.Inventory,
                success: function (Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                    if ($scope.AddPage)
                        loadRelationalData($scope.InventoryID);
                        backToManagmentPage();
                    }
                    $scope.$apply();
                }
            });
        }
    }
    /**
     * @name cancelSubInvantory
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.Category
     */
    function cancelSubInvantory() {
        $scope.Inventory = {};

        backToManagmentPage();
        $scope.FormOrderInventory.$submitted = false;
        $scope.FormOrderInventory.$setPristine();
        $scope.FormOrderInventory.$setUntouched();
    }

    $scope.addData =function() {
        $scope.InventoryData.push(angular.copy($scope.SubInventory));
        // $scope.SubInventory = angular.copy(defaultSubInventory());
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
        $scope.SubInventory = {};
    }

    function removeData() {
        $scope.InventoryData = false;
    }

    function addData() {
        $scope.InventoryItem = false;
        $scope.InventoryData = $scope.FormData;
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
    function initOrderType() {
    }
    function loadOrderTypeIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderInventoryType/getAllData'
            },
            success: function (Res) {
                initOrderType();
                $scope.OrderTypeList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initCustomer() {
    }
    function loadCustomerIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function (Res) {
                initCustomer();
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
                if ($scope.InventoryOrderID < 0) {
                    $scope.FormData.ProductID = '';
                    $scope.FormData.VariantID = '';
                }
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
                    $scope.FormData.VariantID = '';
                }
                $scope.$apply();
            }
        });
    }

    function loadPricing(VariantID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getVariantByID',
                VariantID: VariantID
            },
            success: function (Res) {
                if (Res['S'] && Res['D']) {
                    $scope.FormData.VariantName = Res['D']['VariantName'];
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
    function onOrderTypeChange() {
        if ($scope.FormData.OrderTypeID == 2 || $scope.FormData.OrderTypeID == 1) {
            setTimeout(function () {
                $('#category').select2({
                    placeholder: 'Select a category',
                    allowClear: true,
                    width: 'off',
                });
                $('#product').select2({
                    placeholder: 'Select a product',
                    allowClear: true,
                    width: 'off',
                });
                $('#variant').select2({
                    placeholder: 'Select a variant',
                    allowClear: true,
                    width: 'off',
                });
                $('#category').val('').trigger('change.select2');
                $('#product').val('').trigger('change.select2');
                $('#variant').val('').trigger('change.select2');
            }, 100);
        }
        var ID = $('#order-type').select2('data')[0].id;
        angular.forEach($scope.OrderTypeList, function (value, key) {
            if (value.ID == ID) {
                $scope.OrderType = value.OrderType;
            }
        });
    }

    $scope.WarehouseEnable = false;
    $scope.CustomerEnable = false;
    function CheckTypeValue(Value) {
        if (Value == 1) {
            $scope.CustomerEnable = true;
            $scope.WarehouseEnable = false;
            $scope.FormData.VariantID = '';
            $scope.FormData.CategoryID = '';
            $scope.FormData.ProductID = '';
        } else if (Value == 2) {
            $scope.WarehouseEnable = true;
            $scope.CustomerEnable = false;
            $scope.FormData.VariantID = '';
            $scope.FormData.CategoryID = '';
            $scope.FormData.ProductID = '';

        }
    }

    function onVariantChange(VariantID) {
        loadPricing(VariantID);
    }
    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf FormData.InventoryManagement
     */
    function backToManagmentPage() {
        $location.url('/inventory/order-inventory-details');
    }


});
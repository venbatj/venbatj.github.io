angular.module('RAT').controller('InventoryReportCtrl', function($rootScope, $scope, $location, DataTableS) {
    var oTable;

    $scope.FormInventoryReport = {};
    $scope.FormData = {};

    $scope.CategoryList = []; // category
    $scope.ProductList = []; // Product
    $scope.VariantList = []; // Variant

    $scope.$on('$viewContentLoaded', function () {

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
    });

    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.onVariantChange = onVariantChange;

    setTimeout(function() {
        loadCategoryDropdown();
        loadInventory();
    },500);

    /**
     * @name loadInventory
     * @desc Called to load Inventory 
     * @memberOf Controllers.eliveryTechDetails
     */
    $scope.CategoryID = [];
    // $scope.ProductID = [];
    // $scope.VariantID = [];
    function loadInventory() {
        // $scope.FormData.CategoryID = [1, 2];
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,8]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getDataByPage'},
                {name: 'CategoryID', value: $scope.FormData.CategoryID},
                // {name: 'ProductID', value: $scope.FormData.ProductID},
                // {name: 'VariantID', value: $scope.FormData.VariantID},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
            console.log($scope.FormData.CategoryID);
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'InventoryMove' },
            { data: 'ScannedQty' },
            { data: 'ManualQty' },
            { data: 'IdentifyLinen' },
            { data: 'InventoryAction' },
            { data: 'CustomerName' },
            { data: 'WarehouseName' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(8, Row, Data['ID'], editInventory);                
        };
        oTable = $('#inventory-details-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#inventory-details-data-table');
        DataTableS.onDeleteClick('#inventory-details-data-table', function(RefArr) {
            deleteInventory(RefArr);
        });
    }

    $scope.Search = function() {
        oTable.draw();
        console.log($scope.oTable);
    }

    $scope.ExportData = function() {
        Ajax({
            data: {
            EndPoint: 'Inventory/Inventory/ExportData',
            // InventoryID:InventoryID
            },
            success: function(Res) {
                if (Res['S'] && Res['D'] != null && Res['D'] != '') {
                    // console.log('yes');
                    var Link    = document.createElement("a");    
                    Link.href   = Res['D'];
                    Link.style  = "visibility:hidden";
                    Link.target = '_blank';
                    document.body.appendChild(Link);
                    Link.click();
                    document.body.removeChild(Link);
                
                    $scope.InventoryID = Res['D'];
                    console.log($scope.InventoryID);
                    // console.log('nooo');
                }
            }
        });
    }

    /**
     * @name editInventory
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function editInventory(ID) {
        $location.url('/inventory/edit-details/' + ID + '');
        $scope.$apply();
    }

    /**
     * @name deleteInventory
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function deleteInventory(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickInventoryDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickInventoryDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    
                if ($.inArray(parseInt($scope.InventoryID), $scope.deleteArray) >= 0) {
                        clearInventory();    
                    }
                    DataTableS.resetDelete('#inventory-details-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    function initCategory() {
    }
    
    function loadCategoryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Category/getAllData'
            },
            success: function (Res) {
                initCategory();
                $scope.CategoryList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadProductDropdown(CategoryID) {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Masters/Product/getCategoryID',
                CategoryID: CategoryID
            },
            success: function (Res) {
                $scope.ProductList = Res['D'];
                    $scope.FormData.ProductID = '';
                    $scope.FormData.VariantID = '';
                $scope.$apply();
            }
        });
    }

    function loadVariantDropdown(ProductID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getProductID',
                ProductID: ProductID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                    $scope.FormData.VariantID = '';
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

    function onVariantChange(VariantID) {
        loadPricing(VariantID);
    }
});
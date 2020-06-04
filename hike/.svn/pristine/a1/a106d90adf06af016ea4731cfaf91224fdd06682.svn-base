angular.module('RAT').controller('InventoryCtrl', function($rootScope, $stateParams, $state, $scope, $location, DataTableS) {
    var oTable;
    var oCTable;
    var oWTable;
    var oBTable;

    $scope.$on('$viewContentLoaded', function() {
        loadInventory();
        loadInventoryCustomer();
        loadInventoryWarehouse();
        loadInventoryBoth();
        loadViewCustomerList();
        loadViewWarehouseList();
        loadViewBothList();
    });
    loadSupplierDropdown();
    loadSendCustomerDropdown();
    loadInventoryWarehouseDropdown();

    $scope.SupplierList = [];
    $scope.CustomerList = [];
    $scope.InventoryWarehouseList = [];

    $scope.openAddPage = openAddPage;
    $scope.backToInventoryPage = backToInventoryPage;
    

    $scope.onListingChange = function() {
        if ($scope.Inventory.CustomerID == 'CustomerAll')
            $location.url('/inventory/inventory-details');
    }
    $scope.onCustomerListingChange = function() {
        if ($scope.InventoryCust.CustomerID == 'CustAll')
            $location.url('/inventory/inventory-customer-list');
    }
    $scope.onWarehouseListingChange = function() {
        if ($scope.InventoryWare.WarehouseID == 'WareAll')
            $location.url('/inventory/inventory-warehouse-list');
    }
    $scope.onInvBothChange = function() {
        if ($scope.InventoryBoth.CustomerID == 'BothAll')
            $location.url('/inventory/inventory-all-list');
    }

    $scope.Searching = function() {
        console.log('search');
        $state.go('Inventory-Details', {
            'CustomerName': $scope.Inventory.CustomerID,
            'WarehouseName': $scope.Inventory.WarehouseID,
            'LinenSupplierName': $scope.Inventory.SupplierID
            }, {
            location: 'replace',
            reload: true
        });
    }
    $scope.SearchingCust = function() {
        console.log('search');
        $state.go('Inventory-CustomerList', {
            'CustomerName': $scope.InventoryCust.CustomerID,
            'LinenSupplierName': $scope.InventoryCust.SupplierID
            }, {
            location: 'replace',
            reload: true
        });
    }
    $scope.SearchingWare = function() {
        console.log('search');
        $state.go('Inventory-WarehouseList', {
            'WarehouseName': $scope.InventoryWare.WarehouseID,
            'LinenSupplierName': $scope.InventoryWare.SupplierID
            }, {
            location: 'replace',
            reload: true
        });
    }
    $scope.SearchingBoth = function() {
        console.log('search');
        $state.go('Inventory-BothList', {
            'CustomerName': $scope.InventoryBoth.CustomerID,
            'WarehouseName': $scope.InventoryBoth.WarehouseID,
            'LinenSupplierName': $scope.InventoryBoth.SupplierID
            }, {
            location: 'replace',
            reload: true
        });
    }

    /**
     * @name loadInventory
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadInventory() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,6]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
                {name: 'CustomerName', value: $stateParams.CustomerName},
                {name: 'WarehouseName', value: $stateParams.WarehouseName},
                {name: 'LinenSupplierName', value: $stateParams.LinenSupplierName},
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CustomerName' },
            { data: 'WarehouseName' },
            // { data: 'InventoryMove' },
            { data: 'ManualQty' },
            { data: 'LinenSupplierName' },
            { data: 'InventoryAction' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(6, Row, Data['ID'], editInventory);                
        };
        oTable = $('#inventory-details-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#inventory-details-data-table');
        DataTableS.onDeleteClick('#inventory-details-data-table', function(RefArr) {
            deleteInventory(RefArr);
        });
    }

    /**
     * @name loadInventoryCustomer
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadInventoryCustomer() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getCustomerDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
                {name: 'CustomerName', value: $stateParams.CustomerName},
                {name: 'LinenSupplierName', value: $stateParams.LinenSupplierName},
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CustomerName' },
            { data: 'LinenSupplierName' },
            { data: 'InventoryAction' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editInventory);   
            DataTableS.createReportActionColumn(4, Row, Data['ID'], ReportActionCustomer);                
        };
        oCTable = $('#inventory-customer-details').DataTable(DTProps);
        DataTableS.checkBoxEvents('#inventory-customer-details');
        DataTableS.onDeleteClick('#inventory-customer-details', function(RefArr) {
            deleteInventoryCustomer(RefArr);
        });
    }

    function ReportActionCustomer(ID, event) {
        var tr = $(event).parent().closest('tr');
        var row = oCTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/getInvDataByID',
                    ID: ID,
                },
                success: function(Res) {
                    $scope.ReportCust = Res['D'];
                    $scope.TempData = [];

                    if ($scope.ReportCust != null) {
                        angular.forEach($scope.ReportCust, function(Val, key) {
                            $scope.TempData.push({Category: Val.CategoryName, Product: Val.ProductName, Variant: Val.VariantName, Qty: Val.QtyToBeOrdered});
                        });
                    }
                    $scope.$apply();
                }
            });

            var columns = "";

            setTimeout(function() {
                angular.forEach($scope.TempData, function(Val, Key) {
                    columns += '<tr>'+
                    '<td>'+Val.Category+'</td>'+
                    '<td>'+Val.Product+'</td>'+
                    '<td>'+Val.Variant+'</td>'+
                    '<td>'+Val.Qty+'</td>'+
                    '</tr>'
                    });
                row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Category</th><th>Product</th><th>Variant</th><th>Qty</th></tr>'+columns+'</table>')).show();
                tr.addClass('shown');
            }, 1000);
        }
    }

     /**
     * @name deleteInventoryCustomer
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function deleteInventoryCustomer(IDArray) {
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
                    oCTable.draw();
                    
                if ($.inArray(parseInt($scope.InventoryID), $scope.deleteArray) >= 0) {
                        clearInventory();    
                    }
                    DataTableS.resetDelete('#inventory-customer-details');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    /**
     * @name loadInventoryWarehouse
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadInventoryWarehouse() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getWarehouseDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
                {name: 'WarehouseName', value: $stateParams.WarehouseName},
                {name: 'LinenSupplierName', value: $stateParams.LinenSupplierName},
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'WarehouseName' },
            { data: 'LinenSupplierName' },
            { data: 'InventoryAction' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editInventory);
            DataTableS.createReportActionColumn(4, Row, Data['ID'], ReportActionWarehouse);                
        };
        oWTable = $('#inventory-warehouse-details').DataTable(DTProps);
        DataTableS.checkBoxEvents('#inventory-warehouse-details');
        DataTableS.onDeleteClick('#inventory-warehouse-details', function(RefArr) {
            deleteInventoryWarehouse(RefArr);
        });
    }

    function ReportActionWarehouse(ID, event) {
        var tr = $(event).parent().closest('tr');
        var row = oWTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/getInvDataByID',
                    ID: ID,
                },
                success: function(Res) {
                    $scope.ReportCust = Res['D'];
                    $scope.TempData = [];
                    console.log($scope.ReportCust);

                    if ($scope.ReportCust != null) {
                        angular.forEach($scope.ReportCust, function(Val, key) {
                            $scope.TempData.push({Category: Val.CategoryName, Product: Val.ProductName, Variant: Val.VariantName, Qty: Val.QtyToBeOrdered});
                        });
                    }
                    $scope.$apply();
                }
            });

            var columns = "";

            setTimeout(function() {
                angular.forEach($scope.TempData, function(Val, Key) {
                    columns += '<tr>'+
                    '<td>'+Val.Category+'</td>'+
                    '<td>'+Val.Product+'</td>'+
                    '<td>'+Val.Variant+'</td>'+
                    '<td>'+Val.Qty+'</td>'+
                    '</tr>'
                    });
                row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Category</th><th>Product</th><th>Variant</th><th>Qty</th></tr>'+columns+'</table>')).show();
                tr.addClass('shown');
            }, 1000);
        }
    }

     /**
     * @name deleteInventory
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function deleteInventoryWarehouse(IDArray) {
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
                    oWTable.draw();
                    
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

     /**
     * @name loadInventoryBoth
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadInventoryBoth() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getBothDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
                {name: 'CustomerName', value: $stateParams.CustomerName},
                {name: 'WarehouseName', value: $stateParams.WarehouseName},
                {name: 'LinenSupplierName', value: $stateParams.LinenSupplierName},
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CustomerName' },
            { data: 'WarehouseName' },
            { data: 'LinenSupplierName' },
            { data: 'InventoryAction' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editInventory);  
            DataTableS.createReportActionColumn(5, Row, Data['ID'], ReportBothAction);              
        };
        oBTable = $('#inventory-all-details').DataTable(DTProps);
        DataTableS.checkBoxEvents('#inventory-all-details');
        DataTableS.onDeleteClick('#inventory-all-details', function(RefArr) {
            deleteInventoryBoth(RefArr);
        });
    }

    function ReportBothAction(ID, event) {
        var tr = $(event).parent().closest('tr');
        var row = oBTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/getInvDataByID',
                    ID: ID,
                },
                success: function(Res) {
                    $scope.ReportCust = Res['D'];
                    $scope.TempData = [];
                    console.log($scope.ReportCust);

                    if ($scope.ReportCust != null) {
                        angular.forEach($scope.ReportCust, function(Val, key) {
                            $scope.TempData.push({Category: Val.CategoryName, Product: Val.ProductName, Variant: Val.VariantName, Qty: Val.QtyToBeOrdered});
                        });
                    }
                    $scope.$apply();
                }
            });

            var columns = "";

            setTimeout(function() {
                angular.forEach($scope.TempData, function(Val, Key) {
                    columns += '<tr>'+
                    '<td>'+Val.Category+'</td>'+
                    '<td>'+Val.Product+'</td>'+
                    '<td>'+Val.Variant+'</td>'+
                    '<td>'+Val.Qty+'</td>'+
                    '</tr>'
                    });
                row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Category</th><th>Product</th><th>Variant</th><th>Qty</th></tr>'+columns+'</table>')).show();
                tr.addClass('shown');
            }, 1000);
        }
    }

     /**
     * @name deleteInventory
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function deleteInventoryBoth(IDArray) {
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
                    oBTable.draw();
                    
                if ($.inArray(parseInt($scope.InventoryID), $scope.deleteArray) >= 0) {
                        clearInventory();    
                    }
                    DataTableS.resetDelete('#inventory-all-details');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    /**
     * @name editInventory
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    // function editInventory(ID) {
    //     console.log(ID);
    //     $location.url('/inventory/edit-details/' + ID + '');
    //     $scope.$apply();
    // }
    function editInventory(ID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getDataByID',
                ID: ID,
            },
            success: function(Res) {
                console.log(Res['D'].Flag);
                console.log(ID);
                if (Res['D'].Flag == 'C') { //Order for customer
                    $location.url('/inventory/order-edit-details/' + ID + '');
                    $scope.$apply();
                } else if (Res['D'].Flag == 'W') {//Order for warehouse
                    $location.url('/inventory/ware-edit-details/' + ID + '');
                    $scope.$apply();
                } else if (Res['D'].Flag == 'F') {//Order RFID
                    $location.url('/inventory/rfid-edit-details/' + ID + '');
                    $scope.$apply();
                } else if (Res['D'].Flag == 'S') {//Add Inventory
                    $location.url('/inventory/add-edit-details/' + ID + '');
                    $scope.$apply();
                } else if (Res['D'].Flag == 'X') {//send inventory
                    $location.url('/inventory/send-edit-details/' + ID + '');
                    $scope.$apply();
                } else if (Res['D'].Flag == 'Y') {//return inventory
                    $location.url('/inventory/return-edit-details/' + ID + '');
                    $scope.$apply();
                } else if (Res['D'].Flag == 'Z') {//purge inventory
                    $location.url('/inventory/purge-edit-details/' + ID + '');
                    $scope.$apply();
                }
            }
        });
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

    /**
     * @name loadInventoryCustomer
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadViewCustomerList() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,7]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getViewCustomerDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
            );
        };
        DTProps.order = [0, 'desc'];
        DTProps.columns = [
            // { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CustomerName' },
            { data: 'Modified' },
            { data: '' },
            { data: '' },
            { data: '' },
            { data: '' },
            { data: '' },
            // { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            // DataTableS.createCheckBoxColumn(Row, Data['ID']);
            // DataTableS.createEditActionColumn(7, Row, Data['ID'], editInventory);   
        };
        oVCTable = $('#view-customer-list').DataTable(DTProps);
        DataTableS.checkBoxEvents('#view-customer-list');
        DataTableS.onDeleteClick('#view-customer-list', function(RefArr) {
            deleteViewCustomer(RefArr);
        });
    }

    /**
     * @name loadViewWarehouseList
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadViewWarehouseList() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,7]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getViewWarehouseDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
            );
        };
        DTProps.order = [0, 'desc'];
        DTProps.columns = [
            { data: 'WarehouseName' },
            { data: 'Modified' },
            { data: '' },
            { data: '' },
            { data: '' },
            { data: '' },
            { data: '' },
        ];
        DTProps.rowCallback = function(Row, Data) {
            // DataTableS.createCheckBoxColumn(Row, Data['ID']);
            // DataTableS.createEditActionColumn(7, Row, Data['ID'], editInventory);   
        };
        oVWTable = $('#view-warehouse-list').DataTable(DTProps);
        DataTableS.checkBoxEvents('#view-warehouse-list');
        DataTableS.onDeleteClick('#view-warehouse-list', function(RefArr) {
            deleteViewWarehouse(RefArr);
        });
    }

    /**
     * @name loadViewBothList
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadViewBothList() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,8]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/Inventory/getViewBothDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT},
            );
        };
        DTProps.order = [0, 'desc'];
        DTProps.columns = [
            { data: 'CustomerName' },
            { data: 'WarehouseName' },
            { data: 'Modified' },
            { data: '' },
            { data: '' },
            { data: '' },
            { data: '' },
            { data: '' },
        ];
        DTProps.rowCallback = function(Row, Data) {
            // DataTableS.createCheckBoxColumn(Row, Data['ID']);
            // DataTableS.createEditActionColumn(7, Row, Data['ID'], editInventory);   
        };
        oVWTable = $('#customer-warehouse-list').DataTable(DTProps);
        DataTableS.checkBoxEvents('#customer-warehouse-list');
        DataTableS.onDeleteClick('#customer-warehouse-list', function(RefArr) {
            deleteViewWarehouse(RefArr);
        });
    }

    $('#inventory-supplier').select2({
        placeholder: 'Select a Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    $('#cust-inventory-supplier').select2({
        placeholder: 'Select a Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    $('#ware-inventory-supplier').select2({
        placeholder: 'Select a Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    function loadSupplierDropdown() {
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

    $('#customer-id').select2({
        placeholder: 'Select a customer',
        allowClear: true,
        width: 'off',
    });
    $('#cust-customer-id').select2({
        placeholder: 'Select a customer',
        allowClear: true,
        width: 'off',
    });
    function loadSendCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.CustomerList = Res['D'];
                $scope.$apply();
            }
        });
    }
   
    $('#inventory-warehouse').select2({
        placeholder: 'Select a Warehouse',
        allowClear: true,
        width: 'off',
    });
    $('#ware-inventory-warehouse').select2({
        placeholder: 'Select a Warehouse',
        allowClear: true,
        width: 'off',
    });
    function loadInventoryWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function(Res) {
                $scope.InventoryWarehouseList = Res['D'];
                $scope.$apply();
            }
        });
    }

    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.eliveryTechDetails
     */
    
    function openAddPage() {
        $location.url('/inventory/inventory-index');
    }
    $scope.importInventory = function(){
        $location.url('/inventory/import-inventory');
    }
    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf inventory.InventoryManagement
     */
    function backToInventoryPage() {
            $location.url('/inventory/inventory-index');
    }

});
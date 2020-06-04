angular.module('RAT').controller('InventoryManagementCtrl', function ($rootScope,$state, $scope, $timeout, $location, DataTableS) {
    // var oTable;

    if ($state.params != null && $state.params.InventoryID != null && $state.params.InventoryID > 0)
        $scope.InventoryID = $state.params.InventoryID;


    if ($scope.InventoryID > 0) {
        $scope.AddPage = false;
        $timeout(function () {
            loadRelationalData($scope.InventoryID);
        }, 1000);
    }
    function loadRelationalData(ID) {
        // loadInventory(ID);
    }

    $scope.FrmInventor = {};
    $scope.Inventory = {InventoryID:0};
    $scope.SubInventory = {};

    $scope.disableorder  = true;
    $scope.ForWarehouse  = true;
    $scope.Foracustomer = true;

    $scope.$on('$viewContentLoaded', function () {
        /* INITIALIZE THE SELECT2 DROPDOWN START */

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
        $('#identify-linen').select2({
            placeholder: 'Select a Identify Linen',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-move').select2({
            placeholder: 'Select a Inventory Move',
            allowClear: true,
            width: 'off',
        });
        $('#order-type').select2({
            placeholder: 'Order RFID for',
            allowClear: true,
            width: 'off',
        });
        $('#customer-id').select2({
            placeholder: 'Select a customer',
            allowClear: true,
            width: 'off',
        });
        $('#prospect-id').select2({
            placeholder: 'Select a Prospect',
            allowClear: true,
            width: 'off',
        });
        $('#reason-id').select2({
            placeholder: 'Select a Reason',
            allowClear: true,
            width: 'off',
        });
        $('#reason-rfid').select2({
            placeholder: 'Select a Reason',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-report').select2({
            placeholder: 'Select the Report',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-rec').select2({
            placeholder: 'Select the Reconciliation',
            allowClear: true,
            width: 'off',
        });
        $('#invntory-mng').select2({
            placeholder: 'Select the PO Type',
            allowClear: true,
            width: 'off',
        });
        $('#order-rfid-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#customer-idd').select2({
            placeholder: 'Select a customer',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-reason').select2({
            placeholder: 'Select a Reason',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-linen').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-linen-supplier-id').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#send-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#send-warehousey').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#warehouse-idd').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-supplier').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#linen-data').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-supplier-linen').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#return-customer').select2({
            placeholder: 'Select a customer',
            allowClear: true,
            width: 'off',
        });
        $('#supplier-linen').select2({
            placeholder: 'Select a Linen Supplier',
            allowClear: true,
            width: 'off',
        });
        $('#send-customer').select2({
            placeholder: 'Select a customer',
            allowClear: true,
            width: 'off',
        });
        $('#order-rfid-customer').select2({
            placeholder: 'Select a customer',
            allowClear: true,
            width: 'off',
        });
        $('#inventory-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#return-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#purge-warehouse').select2({
            placeholder: 'Select a Warehouse',
            allowClear: true,
            width: 'off',
        });
        $('#action').select2({
            placeholder: 'Select a Action',
            allowClear: true,
            width: 'off',
        });
        $('#return-action').select2({
            placeholder: 'Select a Action',
            allowClear: true,
            width: 'off',
        });
        $('#purge-action').select2({
            placeholder: 'Select a Action',
            allowClear: true,
            width: 'off',
        });
        $('#action-idd').select2({
            placeholder: 'Select a Action',
            allowClear: true,
            width: 'off',
        });
    });

    $scope.CategoryList = [];
    $scope.OrderinventoryforList = [];
    $scope.ProductList = []; // Product
    $scope.VariantList = []; // Variant
    $scope.OrderTypeList = [];
    $scope.InventoryMoveList = [];
    $scope.IdentifyLinenList = [];
    $scope.OrderingReasonList = [];
    $scope.InventoryActionList = [];
    $scope.CustomerList = [];
    $scope.InventoryData = [];
    
    $scope.CustInventoryList = [];
    $scope.SendCustomerList = [];
    $scope.ReturnCustomerList = [];
    $scope.SupplierList = [];
    $scope.LinenSupplierList = [];
    $scope.InventorySupplierList = [];
    $scope.InventoryLinenList = [];
    $scope.OrderReasonList = [];
    $scope.InvRepList = [];
    $scope.InventoryReasonList = [];
    $scope.ActionIDList = [];
    $scope.OrderInventoryActionList = [];
    $scope.ActionList = [];
    $scope.PurgeActionList = [];
    $scope.WarehouseList = [];
    $scope.SWarehouseList = [];
    $scope.RWarehouseList = [];
    $scope.PWarehouseList = [];
    $scope.ReturnActionIDList =[];
    $scope.LinenList = [];
    $scope.SupplierList =[];

    $scope.onCustomerChange = onCustomerChange;
    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    // $scope.onInventoryActionChange = onInventoryActionChange;
    // $scope.onOrderTypeChange = onOrderTypeChange;
    // $scope.onVariantChange = onVariantChange;
    $scope.CheckTypeValue = CheckTypeValue;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.saveInventory = saveInventory;
    $scope.cancelSubInvantory = cancelSubInvantory;
    $scope.removeData = removeData;
    $scope.addData = addData;
    $scope.Calculate = Calculate;
    $scope.backToInventoryPage = backToInventoryPage;
    $scope.AddInventor = AddInventor;
    $scope.SInventory = SInventory;
    $scope.RetrnInventory = RetrnInventory;
    $scope.PrgeInventory = PrgeInventory;

    loadCategoryDropdown();
    loadInventoryMoveDropdown();
    loadIdentifyLinenDropdown();
    loadOrderTypeIDDropdown();
    loadOrderingReasonIDDropdown();
    loadInventoryActionIDDropdown();
    loadOrderReasonIDDropdown();
    loadInvRepDropdown();
    loadInventoryReasonIDDropdown();
    loadCustInventoryDropdown();
    loadSendCustomerDropdown();
    loadRFIDCustomerDropdown();
    loadReturnCustomerDropdown();
    loadSupplierDropdown();
    loadLinenSupplierDropdown();
    loadActionIDDropdown();
    loadWarehouseDropdown();
    loadSWarehouseDropdown();
    loadInventoryWarehouseDropdown();
    loadRWarehouseDropdown();
    loadPWarehouseDropdown();
    loadPurgeActionIDDropdown();
    loadReturnActionIDDropdown();
    loadInventoryIDDropdown();
    loadInventoryActionDropdown();
    loadInventoryActionDropdown();
    loadInventoryLinenSupplierDropdown();
    loadInventoryLinenDropdown();
    loadInventoryLinenorderDropdown();
    loadInventorySupplierDropdown();
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

    $scope.onInvRepChange = function() {
        if ($scope.InventoryRep.InventoryReport == 'InvRepCustomer') {
            $location.url('/inventory/inventory-customer-list');
        } else if ($scope.InventoryRep.InventoryReport == 'InvRepWarehouse') {
            $location.url('/inventory/inventory-warehouse-list');
        } else if ($scope.InventoryRep.InventoryReport == 'InvRepAll') {
            $location.url('/inventory/inventory-all-list');
        }
    }

    $scope.onInvViewMngChange = function() {
        if ($scope.InvViewMng.InventoryViewMng == 'InvRepCustomer') {
            $location.url('/inventory/cust-view-list');
        } else if ($scope.InvViewMng.InventoryViewMng == 'InvRepWarehouse') {
            $location.url('/inventory/ware-view-list');
        } else if ($scope.InvViewMng.InventoryViewMng == 'InvRepAll') {
            $location.url('/inventory/all-view-list');
        }
    }

    $scope.RFIDCustomer = true;
    $scope.RFIDWarehouse = false;
    $scope.OrderInventory = true;
    $scope.AddInventory = false;
    $scope.PurgeInventory = false;
    $scope.LinenSupp = false;
    $scope.OrderTypeID = true;
    $scope.Warehouse = false;
    $scope.Customer = true;
    $scope.AddInvtr = false;
    $scope.OrderTypes = true;
    $scope.ReturnInventory = false;
    $scope.childData = true;
    $scope.Order = true;
    $scope.WarehouseEnable = false;
    $scope.CustomerEnable = false;

    $scope.onRFIDOrderTypeChange = function() {
        if ($scope.OrderRfid.OrderType == '1') {
            $scope.RFIDCustomer = true;
            $scope.RFIDWarehouse = false;
        } else if ($scope.OrderRfid.OrderType == '2') {
            $scope.RFIDCustomer = false;
            $scope.RFIDWarehouse = true;
        }
    }
              
    /**
     * @name Calculate
     * @desc Called on click of load Calculate Salary
     * @memberOf Controllers.CalculateDeliveryTechCost
     */
    function Calculate(){
        $scope.SubInventory.QtyToBeOrdered = Math.round($scope.SubInventory.QtyByCustomer - $scope.SubInventory.QtyUsedFromWarehouse);
    }    
    
    function removeData(index, ID) {
        $scope.deleteArray = ID;
        $rootScope.DelConfirmBox('OnClickInventoryDataDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickInventoryDataDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/removeInventory',
                ID: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    loadInventory($scope.InventoryID);
                }
            }
        });
    });

    $scope.editData = function(ID) {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getCustomerDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.SubInventory = Res['D'];
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
        if (isValid) {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/insertUpdate',
                    Inventory: $scope.Inventory,
                    SubInventory: $scope.InventoryData
                } ,
                success: function (Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                    if ($scope.AddPage)
                        loadRelationalData($scope.InventoryID);
                        window.alert("Saved successfully!");
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
        $scope.childData =false;
        
        $scope.FrmInventor.$submitted = false;
        $scope.FrmInventor.$setPristine();
        $scope.FrmInventor.$setUntouched();
        $('#order-type').val('').trigger('change.select2');
        $('#inventory-move').val('').trigger('change.select2');
        $('#identify-linen').val('').trigger('change.select2');
        $('#customer-id').val('').trigger('change.select2');
        $('#inventory-action').val('').trigger('change.select2');
        $('#ordering-reason').val('').trigger('change.select2');
        $('#inventory-warehouse').val('').trigger('change.select2');
        $('#inventory-supplier').val('').trigger('change.select2');
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
    }

    function addData() {
        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.SubInventory.CategoryID)
             $scope.SubInventory.CategoryName = Value.CategoryName;
        });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.SubInventory.ProductID)
                $scope.SubInventory.ProductName = Value.ProductName;
        });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.VariantID == $scope.SubInventory.VariantID) {
                $scope.SubInventory.VariantName = Value.VariantName;
            } 
        });
        $scope.Order = false;    
        $scope.InventoryData.push(angular.copy($scope.SubInventory));
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
        $scope.SubInventory = {};
    }

    $scope.InvCustomer = function() {
        $('#inv-cust').modal('show');
    }
    $scope.InvWarehouse = function() {
        $('#inv-warehouse').modal('show');
    }
    $scope.sendInvAction = function() {
        $('#inv-action').modal('show');
    }
    $scope.InvLinenSupp = function() {
        $('#inv-linensupplier').modal('show');
    }
    $scope.InvOrderReason = function() {
        $('#inv-ordering-reason').modal('show');
    }
    $scope.OrderRFIDType = function() {
        $('#order-rfid-type').modal('show');
    }

    $scope.WarInventory = function() {
        if ($scope.FormInventory == undefined) {
            $scope.InvWarehouse();
        } else if ($scope.FormInventory.Warehouse == undefined) {
            $scope.InvWarehouse();
        } else if ($scope.FormInventory.LinenSupplier == undefined) {
            $scope.InvLinenSupp();
        } else if ($scope.FormInventory.InventoryReason == undefined) {
            $scope.InvOrderReason();
        } else {
            Ajax({
                data: {
                EndPoint: 'Inventory/Inventory/WarInventory',
                Data: $scope.FormInventory,
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        $location.url('/inventory/ware-edit-details/' + Res['D']['D'] + '');
                        $scope.$apply();
                    }
                }
            });
        }   
    }

    $scope.OrderInventory = function() {
        if ($scope.FormDatas == undefined) {
            $scope.InvCustomer();
        } else if ($scope.FormDatas.CustomerName == undefined) {
            $scope.InvCustomer();
        } else if ($scope.FormDatas.SupplierName == undefined) {
            $scope.InvLinenSupp();
        } else if ($scope.FormDatas.OrderingReason == undefined) {
            $scope.InvOrderReason();
        } else {
            Ajax({
                data: {
                EndPoint: 'Inventory/Inventory/OrderInventory',
                Data: $scope.FormDatas,
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        $location.url('/inventory/order-edit-details/' + Res['D']['D'] + '');
                        $scope.$apply();
                    }
                }
            });
        }   
    }

    $scope.RfidInventory = function() {
        if ($scope.OrderRfid == undefined) {
            $scope.InvCustomer();
        } else if ($scope.OrderRfid.OrderType == undefined) {
            $scope.OrderRFIDType();
        } else if ($scope.OrderRfid.OrderType == '1' && $scope.OrderRfid.RFIDCustomer == undefined) {
            $scope.InvCustomer();
        } else if ($scope.OrderRfid.OrderType == '2' && $scope.OrderRfid.RFIDWarehouse == undefined) {
            $scope.InvWarehouse();
        } else if ($scope.OrderRfid.RFIDOrderingReason == undefined) {
            $scope.InvOrderReason();
        } else {
            Ajax({
                data: {
                EndPoint: 'Inventory/Inventory/RfidInventory',
                Data: $scope.OrderRfid,
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];
                        $location.url('/inventory/rfid-edit-details/' + Res['D']['D'] + '');
                        $scope.$apply();
                    }
                }
            });
        }   
    }
    
    function AddInventor() {
        if ($scope.FormData == undefined) {
            $scope.InvLinenSupp();
        } else if ($scope.FormData.InventoryLinenSupplier == undefined) {
            $scope.InvLinenSupp();
        } else if ($scope.FormData.InvWarehouse == undefined) {
            $scope.InvWarehouse();
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/AddInventory',
                    InventoryLinenSupplier: $scope.FormData
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];  
                        $location.url('/inventory/add-edit-details/' + Res['D']['D'] + '');
                        $scope.$apply();
                    }
                }
            });
        }
    }
    
    function SInventory() {
        if ($scope.SendInventory == undefined) {
            $scope.InvCustomer();
        } else if ($scope.SendInventory.SendCustomer == undefined) {
            $scope.InvCustomer();
        } else if ($scope.SendInventory.Warehouse == undefined) {
            $scope.InvWarehouse();
        } else if ($scope.SendInventory.Action == undefined) {
            $scope.sendInvAction();
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/SendInventory',
                    SendInventory: $scope.SendInventory
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];  
                        $location.url('/inventory/send-edit-details/' + Res['D']['D'] + '');

                        $scope.$apply();
                    }
                }
            });
        }
    }
    
    function RetrnInventory() {
        if ($scope.ReturnInventory == undefined) {
            $scope.InvCustomer();
        } else if ($scope.ReturnInventory.ReturnCustomer == undefined) {
            $scope.InvCustomer();
        } else if ($scope.ReturnInventory.Warehouse == undefined) {
            $scope.InvWarehouse();
        } else if ($scope.ReturnInventory.ReturnAction == undefined) {
            $scope.sendInvAction();
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/ReturnInventory',
                    ReturnInventory: $scope.ReturnInventory
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D']['InventoryID'];  
                        $scope.CustomerID = Res['D']['CustomerID'];  
                        $scope.WarehouseID = Res['D']['Warehouse'];
                        $location.url('/inventory/return-edit-details/' + Res['D']['D'] + '');
                        $scope.$apply();
                    }
                }
            });
        }
    }
    
    function PrgeInventory() {
        if ($scope.PurgeInventory == undefined) {
            $scope.sendInvAction();
        } else if ($scope.PurgeInventory.PurgeAction == undefined) {
            $scope.sendInvAction();
        } else if ($scope.PurgeInventory.PurgeWarehouse == undefined) {
            $scope.InvWarehouse();
        } else {
            Ajax({
                data: {
                    EndPoint: 'Inventory/Inventory/PurgeInventory',
                    PurgeInventory: $scope.PurgeInventory
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.InventoryID = Res['D'];  
                        $location.url('/inventory/purge-edit-details/' + Res['D']['D'] + '');
                        $scope.$apply();
                    }
                }
            });
        }
    }

    function loadCustInventoryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.CustInventoryList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadSendCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.SendCustomerList = Res['D'];
                $scope.$apply();
            }
        });
    }
   
    function loadRFIDCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.RFIDCustomerList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadReturnCustomerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Customer/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.ReturnCustomerList = Res['D'];
                $scope.$apply();
            }
        });
    }

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

    function loadLinenSupplierDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.LinenSupplierList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryLinenSupplierDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.InventorySupplierList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryLinenDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.InventoryLinenList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryLinenorderDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.LinenList = Res['D'];
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

    function loadOrderReasonIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getInventoryaction'
            },
            success: function (Res) {
                $scope.OrderReasonList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInvRepDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderInventoryType/getAllData'
            },
            success: function (Res) {
                $scope.InvRepList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryReasonIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/OrderingInventoryReason/getAllData'
            },
            success: function (Res) {
                $scope.InventoryReasonList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function (Res) {
                $scope.WarehouseList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadSWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function(Res) {
                $scope.SWarehouseList = Res['D'];
                $scope.$apply();
            }
        });
    }

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

    function loadRWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function(Res) {
                $scope.RWarehouseList = Res['D'];
                $scope.$apply();
            }
        });
    }
    
    function loadPWarehouseDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Warehouse/getAllData'
            },
            success: function(Res) {
                $scope.PWarehouseList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadActionIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getActionForSInv'
            },
            success: function (Res) {
                $scope.ActionList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadReturnActionIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getActionForRInv'
            },
            success: function (Res) {
                $scope.ReturnActionIDList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadPurgeActionIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getActionForPInv'
            },
            success: function (Res) {
                $scope.PurgeActionList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryActionIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryAction/getAllData'
            },
            success: function (Res) {
                $scope.InventoryActionList = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadInventoryIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryAction/getAllData'
            },
            success: function (Res) {
                $scope.ActionIDList = Res['D'];
                $scope.$apply();
            }
        });
    }
   
    function loadInventoryActionDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InventoryAction/getAllData'
            },
            success: function (Res) {
                $scope.OrderInventoryActionList = Res['D'];
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
                EndPoint: 'Masters/OrderInventoryType/getOrderTypeForORderRFID'
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

    function loadSendCategoryDropdown(CustomerID) {
        $scope.ProductList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getCategoryByCustomerID',
                CustomerID: CustomerID
            },
            success: function (Res) {
                $scope.CategoryList = Res['D'];
                if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.CategoryID = '';
                    $scope.Inventory.ProductID = '';
                    // $scope.Inventory.VariantID = '';
                }
                $scope.$apply()
            }
        });
    }

    function loadReturnCategoryDropdown(WarehouseID) {
        $scope.ProductList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getCategoryByWarehouseID',
                WarehouseID: WarehouseID
            },
            success: function (Res) {
                $scope.CategoryList = Res['D'];
                if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.CategoryID = '';
                    $scope.Inventory.ProductID = '';
                    // $scope.Inventory.VariantID = '';
                }
                $scope.$apply()
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
                    $scope.Inventory.ProductID = '';
                    $scope.Inventory.VariantID = '';
                }
                $scope.$apply();
            }
        });
    }

    function loadSendProductDropdown() {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getProductByCustomerID',
                CategoryID: $scope.SubInventory.CategoryID,
                CustomerID: $scope.Inventory.CustomerID
            },
            success: function (Res) {
                console.log(Res);
                $scope.ProductList = Res['D'];
                if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.ProductID = '';
                    $scope.Inventory.VariantID = '';
                }
                $scope.$apply();
            }
        });
    }

    function loadReturnProductDropdown() {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getProductByWarehouseID',
                CategoryID: $scope.SubInventory.CategoryID,
                WarehouseID: $scope.Inventory.WarehouseID
            },
            success: function (Res) {
                $scope.ProductList = Res['D'];
                if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.ProductID = '';
                    $scope.Inventory.VariantID = '';
                }
                $scope.$apply();
            }
        });
    }

    function loadVariantDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getVariantByProductID',
                ProductID: $scope.SubInventory.ProductID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.VariantID = '';
                }
                $scope.$apply();
            }
        });
    }

    function loadSendVariantDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getVariantByCustomerID',
                ProductID: $scope.SubInventory.ProductID,
                CustomerID: $scope.Inventory.CustomerID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                // if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.VariantID = '';
                // }
                $scope.$apply();
            }
        });
    }

    function loadReturnVariantDropdown() {
        Ajax({
            data: {
                EndPoint: 'Inventory/Inventory/getVariantByWarehouseID',
                ProductID: $scope.SubInventory.ProductID,
                WarehouseID: $scope.Inventory.WarehouseID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                // if ($scope.InventoryOrderID < 0) {
                    $scope.Inventory.VariantID = '';
                // }
                $scope.$apply();
            }
        });
    }

    function onCustomerChange(ID, Selection) {
        if (Selection == 'Customer') {
            loadSendCategoryDropdown($scope.Inventory.CustomerID);
        } else if (Selection == 'Warehouse') {
            loadReturnCategoryDropdown($scope.Inventory.WarehouseID);
        }
    }

    function onCategoryChange(ID, Selection) {
        if (Selection == 'OrderCustomer') {
            loadProductDropdown(ID);
        } else if (Selection == 'OrderWarehouse') {
            loadProductDropdown(ID);
        } else if (Selection == 'AddInventory') {
            loadProductDropdown(ID);
        } else if (Selection == 'Cust') {
            loadSendProductDropdown();
        } else if (Selection == 'Ware') {
            loadReturnProductDropdown();
        }
    }

    function onProductChange(ID, Selection) {
        if (Selection == 'OrderCustomer1') {
            loadVariantDropdown();
        } else if (Selection == 'OrderWarehouse1') {
            loadVariantDropdown();
        } else if (Selection == 'AddInventory1') {
            loadVariantDropdown();
        } else if (Selection == 'Cust1') {
            loadSendVariantDropdown();
        } else if (Selection == 'Ware1') {
            loadReturnVariantDropdown();
        }
    }

    function CheckTypeValue(Value) {
        if (Value == 1) {
            $scope.CustomerEnable = true;
            $scope.WarehouseEnable = false;
            $scope.ForWarehouse = false;
            $scope.Foracustomer = true;
            $scope.SubInventory = {};
        } else if (Value == 2) {
            $scope.Foracustomer  = false;
            $scope.ForWarehouse = true;
            $scope.WarehouseEnable = true;
            $scope.CustomerEnable = false;
            $scope.SubInventory = {};
        }
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf inventory.InventoryManagement
     */
    function backToManagmentPage() {
        $location.url('/inventory/inventory-index');
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
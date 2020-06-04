angular.module('RAT').controller('OrderRFIDManagementCtrl', function($rootScope, $scope, $location, DataTableS) {
    var oTable;

    $scope.$on('$viewContentLoaded', function() {
        loadOrderRFID();
    });

    $scope.openAddPage = openAddPage;
    $scope.backToManagmentPage = backToManagmentPage;
    /**
     * @name loadOrderRFID
     * @desc Called to load eliveryTechDetails details
     * @memberOf Controllers.eliveryTechDetails
     */
    function loadOrderRFID() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0,4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Inventory/OrderRFID/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'OrderType' },
            { data: 'CustomerName' },
            { data: 'OrderingReason' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editOrderRFID);                
        };
        oTable = $('#order-rfid-details-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#order-rfid-details-data-table');
        DataTableS.onDeleteClick('#order-rfid-details-data-table', function(RefArr) {
            deleteOrderRFID(RefArr);
        });
    }

    /**
     * @name editOrderRFID
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function editOrderRFID(ID) {
        $location.url('/inventory/rfid-edit-details/' + ID + '');
        $scope.$apply();
    }

    /**
     * @name deleteOrderRFID
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.eliveryTechDetails
     */
    function deleteOrderRFID(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickOrderRFIDDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickOrderRFIDDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Inventory/OrderRFID/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    
                if ($.inArray(parseInt($scope.OrderRFID), $scope.deleteArray) >= 0) {
                        clearOrderRFID();    
                    }
                    DataTableS.resetDelete('#order-rfid-details-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.eliveryTechDetails
     */
    
    function openAddPage() {
        $location.url('/inventory/order-rfid');
    }
    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf inventory.OrderRFIDManagement
     */
    function backToManagmentPage() {
        $location.url('/inventory/order-rfid-management');
    }

});
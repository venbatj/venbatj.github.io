angular.module('RAT').controller('RFIDManagementCtrl', function($rootScope, $scope,$location, DataTableS) {
    var oTable;

    $scope.$on('$viewContentLoaded', function() {
        loadRFIDSupplierDetails();
    });

    $scope.openAddPage = openAddPage;
    $scope.importRFIDSupplier = importRFIDSupplier;
    /**
     * @name loadRFIDSuppliernDetails
     * @desc Called to load rfid supplier details
     * @memberOf Controllers.RFIDManagementCtrl
     */
    function loadRFIDSupplierDetails() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'RFIDSupplier/BasicDetail/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'RFIDSupplierName' },
            { data: 'City' },
            { data: 'Country' },
            { data: 'Status' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editRFIDSupplierDetail);                
        };
        oTable = $('#rfid-supplier-management-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#rfid-supplier-management-data-table');
        DataTableS.onDeleteClick('#rfid-supplier-management-data-table', function(RefArr) {
            deleteRFIDSupplierDetails(RefArr);
        });
    }

    /**
     * @name editRFIDSupplierDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.RFIDManagementCtrl
     */
    function editRFIDSupplierDetail(ID) {
        $location.url('/rfid/rfid-supplier-edit-details/' + ID + '');
        $scope.$apply();
    }

    /**
     * @name deleteRFIDSupplierDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.RFIDManagementCtrl
     */
    function deleteRFIDSupplierDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickBasicDetailDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/BasicDetail/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();

                if ($.inArray(parseInt($scope.RFIDSupplierDetailsID), $scope.deleteArray) >= 0) {
                        clearBasicDetail();    
                    }
                    DataTableS.resetDelete('#rfid-supplier-management-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });
    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.RFIDManagementCtrl
     */
    
    function openAddPage() {
        $location.url('/rfid/rfid-supplier');
    }
    /**
     * @name importRFIDSupplier
     * @desc Called on click of import rfid supplier button
     * @memberOf Controllers.RFIDManagementCtrl
     */
    function importRFIDSupplier() {
        $location.url('/rfid/import-rfid');
    }
});
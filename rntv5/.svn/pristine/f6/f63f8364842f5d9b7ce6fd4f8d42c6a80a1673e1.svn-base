angular.module('RAT').controller('LinenSupplierManagementCtrl', function($rootScope, $scope,$location, DataTableS) {
    var oTable;

    $scope.$on('$viewContentLoaded', function() {
        loadLinenDetails();
    });

    $scope.openAddPage = openAddPage;
    $scope.importLinen = importLinen;
    /**
     * @name loadLinenDetails
     * @desc Called to load linen details
     * @memberOf Controllers.LinenDetail
     */
    function loadLinenDetails() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'LinenSupplier/BasicDetail/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'LinenSupplierName' },
            { data: 'City' },
            { data: 'Country' },
            { data: 'Status' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editLinenDetail);                
            DataTableS.createReportActionColumn(5, Row, Data['ID'], viewLinenDetails);              
        };
        oTable = $('#linen-management-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#linen-management-data-table');
        DataTableS.onDeleteClick('#linen-management-data-table', function(RefArr) {
            deleteLinenDetails(RefArr);
        });
    }

    /**
     * @name editLinenDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function editLinenDetail(ID) {
        $location.url('/linen/edit-details/' + ID + '/edit');
        $scope.$apply();
    }
    /**
     * @name viewLinenDetails
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function viewLinenDetails(ID) {
        $location.url('/linen/edit-details/' + ID + '/view');
        $scope.$apply();
    }

    /**
     * @name deleteLinenDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function deleteLinenDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickBasicDetailDeleteConfirmBoxOk', function(event, obj) {
        // $('#check-all-linen-details').trigger('click');
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();

                if ($.inArray(parseInt($scope.LinenSupplierDetailsID), $scope.deleteArray) >= 0) {
                        clearBasicDetail();    
                    }
                    DataTableS.resetDelete('#linen-management-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });
    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.LinenDetail
     */
    $scope.BackIndexPage = function() {
        $location.url('/linen/linen');
    }
    
    function openAddPage() {
        $location.url('/linen/linen-details');
    }
    /**
     * @name importLinen
     * @desc Called on click of import linen button
     * @memberOf Controllers.LinenSupplierManagement
     */
    function importLinen() {
        $location.url('/linen/import-linen');
    }
});
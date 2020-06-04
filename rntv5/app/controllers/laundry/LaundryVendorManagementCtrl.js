angular.module('RAT').controller('LaundryVendorManagementCtrl', function($rootScope, $scope, $location, DataTableS) {
    var oTable;

    $scope.$on('$viewContentLoaded', function() {
        loadLaundryDetails();
    });

    $scope.openAddPage = openAddPage;
    $scope.importLaundry = importLaundry;
    $scope.BackLaundryIndexPage = BackLaundryIndexPage;

    /**
     * @name loadLaundryDetails
     * @desc Called to load laundry details
     * @memberOf Controllers.LaundryDetail
     */
    function loadLaundryDetails() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Laundry/BasicDetail/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'LaundryName' },
            // { data: 'DeliveryManager' },
            { data: 'LocationCount' },
            { data: 'ContractCount' },
            { data: 'Status' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editLaundryDetail);                
            DataTableS.createReportActionColumn(5, Row, Data['ID'], viewCustomerDetails);              
        };
        oTable = $('#laundry-management-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#laundry-management-data-table');
        DataTableS.onDeleteClick('#laundry-management-data-table', function(RefArr) {
            deleteLaundryDetails(RefArr);
        });
    }

    /**
     * @name editLaundryDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function editLaundryDetail(ID) {
        $location.url('/laundry/edit-details/' + ID + '/edit');
        $scope.$apply();
    }
    /**
     * @name viewCustomerDetails
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function viewCustomerDetails(ID) {
        $location.url('/laundry/edit-details/' + ID + '/view');
        $scope.$apply();
    }

    /**
     * @name deleteLaundryDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function deleteLaundryDetails(IDArray) {
        // $scope.deleteArray = IDArray;
        getLocationCount(IDArray);
    }
    $scope.$on('OnClickBasicDetailDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Laundry/BasicDetail/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                    $scope.$apply();
                }
            }
        });
    });

    function getLocationCount(ID) {
        Ajax({
            data: {
            EndPoint: 'Laundry/BasicDetail/getLocationCount',
            ID: ID
            },
            success: function(Res) {
                $scope.deleteArray = ID;
                if (Res['D']) {
                    if (Res['D']['Count'] > 0) {
                        $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk', 'Laundry ' + Res['D']['LaundryName'] + ' have ' + Res['D']['Count'] + ' Contracts. Are you sure You want to delete the Selection');
                    }
                } else {
                    $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk');
                }

                $scope.$apply();
            }
        });
    }

    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.LaundryDetail
     */
    function openAddPage() {
        $location.url('/laundry/laundry-details');
    }
    /**
     * @name importLaundry
     * @desc Called on click of import laundry button
     * @memberOf Controllers.LaundryManagement
     */
    function importLaundry() {
        $location.url('/laundry/import-laundry');
    }

    /**
     * @name backToLaundryPage
     * @desc Called on click of back button
     * @memberOf Controllers.LaundryDetail
     */
    function BackLaundryIndexPage() {
        $location.url('/laundry/laundry');
    }
});
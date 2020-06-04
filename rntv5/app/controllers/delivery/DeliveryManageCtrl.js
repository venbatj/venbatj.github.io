angular.module('RAT').controller('DeliveryManageCtrl', function($rootScope, $scope,$location, DataTableS) {
    var oTable;

    $scope.$on('$viewContentLoaded', function() {
        loadDeliveryDetails();
    });

    $scope.openAddPage = openAddPage;
    /**
     * @name loadDeliveryDetails
     * @desc Called to load delivery details
     * @memberOf Controllers.DeliveryDetails
     */
    function loadDeliveryDetails() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Delivery/Delivery/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'User' },
            { data: 'CustomerName' },
            { data: 'Suppliername' },
            { data: 'WarehouseName' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editDliveryDetail);                
        };
        oTable = $('#delivery-manage-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#delivery-manage-data-table');
        DataTableS.onDeleteClick('#delivery-manage-data-table', function(RefArr) {
            deleteDeliveryDetails(RefArr);
        });
    }

    /**
     * @name editDliveryDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.DliveryDetail
     */
    function editDliveryDetail(ID) {
        $location.url('/delivery/manage-pickup/' + ID + '');
        $scope.$apply();
    }

    /**
     * @name deleteDeliveryDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.DliveryDetail
     */
    function deleteDeliveryDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickBasicDetailDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Delivery/Delivery/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();

                if ($.inArray(parseInt($scope.DeliveryID), $scope.deleteArray) >= 0) {
                        clearBasicDetail();    
                    }
                    DataTableS.resetDelete('#delivery-manage-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });
    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.DliveryDetail
     */
    $scope.BackIndexPage = function() {
        $location.url('/delivery/delivery');
    }
    
    function openAddPage() {
        $location.url('/delivery/manage-pickup');
    }
});
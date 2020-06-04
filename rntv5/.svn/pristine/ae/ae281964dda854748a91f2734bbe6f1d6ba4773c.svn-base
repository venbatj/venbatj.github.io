angular.module('RAT').controller('DeliveryTechCostAnalysisListCtrl', function($rootScope, $scope, $location, DataTableS) {
    var oTable;

    $scope.$on('$viewContentLoaded', function() {
        loadDeliveryTechDetails();
    });

    $scope.openAddPage = openAddPage;

    /**
     * @name loadDeliveryTechDetails
     * @desc Called to load DeliveryTechDetails details
     * @memberOf Controllers.DeliveryTechDetails
     */
    function loadDeliveryTechDetails() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Settings/AnalysisData/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'EffectiveFrom' },
            { data: 'TotalDeliveryCost' },
            { data: 'TechCost' },
            { data: 'Status' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editDeliveryTechDetails);                
        };
        oTable = $('#delivery-tech-analysis-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#delivery-tech-analysis-data-table');
        DataTableS.onDeleteClick('#delivery-tech-analysis-data-table', function(RefArr) {
            deleteDeliveryTechDetails(RefArr);
        });
    }

    /**
     * @name editDeliveryTechDetails
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.DeliveryTechDetails
     */
    function editDeliveryTechDetails(ID) {
        $location.url('/settings/edit-details/' + ID + '');
        $scope.$apply();
    }

    /**
     * @name deleteDeliveryTechDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.DeliveryTechDetails
     */
    function deleteDeliveryTechDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickAnalysisDataDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickAnalysisDataDeleteConfirmBoxOk', function(event, obj) {
        $('#check-all-delivery-tech-analysis-details').trigger('click');
        Ajax({
            data: {
                EndPoint: 'Settings/AnalysisData/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    oTable.draw();
                if ($.inArray(parseInt($scope.DeliveryTechCostAnalysisID), $scope.deleteArray) >= 0) {
                    clearAnalysisData();    
                    }
                    DataTableS.resetDelete('#delivery-tech-analysis-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    /**
     * @name openAddPage
     * @desc Called on click of add button
     * @memberOf Controllers.DeliveryTechDetails
     */
    function openAddPage() {
        $location.url('/settings/add/delivery-tech-cost-analysis');
    }
});
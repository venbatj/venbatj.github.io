/**
 * Customer Management Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('GenerateQuoteManagement', GenerateQuoteManagement);
        
    /**
     * @namespace GenerateQuoteManagement
     * @desc Generate Quote Management Controller
     * @memberOf Controllers
     */
    function GenerateQuoteManagement($rootScope, $scope, $location, DataTableS) {
        var oTable;

        $scope.$on('$viewContentLoaded', function() {
            loadGenerateQuoteDetails();
        });

        $scope.openAddPage = openAddPage;
        $scope.backToManagmentPage = backToManagmentPage;
        
        /**
         * @name loadQuoteGenerateDetails
         * @desc Called to load quote generate details
         * @memberOf Controllers.GenerateQuoteManagement
         */
        function loadGenerateQuoteDetails() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    {name: 'EndPoint', value: 'Manage/PriceCalculator/getDataByPage'},
                    {name: 'JWT', value: $rootScope.gvJWT}
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: 'CustomerName' },
                { data: 'CustomerType' },
                { data: 'QuoteType' },
                { data: 'FileName' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createReportActionColumn(4, Row, Data['ID'], ReportAction);
            };
            oTable = $('#quote-generation-management-data-table').DataTable(DTProps);
        }

        /**
         * @name editGenerateQuoteDetail
         * @desc Called on click of view icon in data table
         * @memberOf Controllers.GenerateQuoteManagement
         */
        function ReportAction(ID) {
            $location.url('/sales/quote-edit-details/' + ID + '/view');
            $scope.$apply();
        }

        /**
         * @name openAddPage
         * @desc Called on click of add button
         * @memberOf Controllers.GenerateQuoteManagement
         */
        function openAddPage() {
            $location.url('/sales/generate-quote');
        }

        /**
         * @name backToManagmentPage
         * @desc Called on click of back button
         * @memberOf Controllers.GenerateQuote
         */
        function backToManagmentPage() {
            $location.url('/sales/sales-management');
        }
    }

    GenerateQuoteManagement.$inject = ['$rootScope', '$scope', '$location', 'DataTableS'];
})();
/**
 * InvoicingFrequency Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('InvoicingFrequency', InvoicingFrequency);

    /**
     * @namespace InvoicingFrequency
     * @desc InvoicingFrequency Controller
     * @memberOf Controllers
     */
    function InvoicingFrequency($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormInvoicingFrequency = {};

        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;

        $scope.formSubmit = formSubmit;
        $scope.formClear = formClear;
        $scope.deleteArray = [];
        
        var oTable = null;

        // Function definitions

        /**
         * @name loadListPage
         * @desc Called on $viewContentLoaded
         * @memberOf Controllers.InvoicingFrequency
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/InvoicingFrequency/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'InvoicingFrequency' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function( Row, Data ) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editInvoicingFrequency);                
            };
            oTable = $('#invoicing-frequency-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#invoicing-frequency-data-table');
            DataTableS.onDeleteClick('#invoicing-frequency-data-table', function(RefArr) {
                deleteInvoicingFrequency(RefArr);
            });
        }

        /**
         * @name editInvoicingFrequency
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.InvoicingFrequency
         */
        function editInvoicingFrequency(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InvoicingFrequency/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name deleteInvoicingFrequency
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.InvoicingFrequency
         */
        function deleteInvoicingFrequency(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickInvoicingFrequencyDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickInvoicingFrequencyDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InvoicingFrequency/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#invoicing-frequency-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.InvoicingFrequency
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/InvoicingFrequency/insertUpdate';

            if (isValid) {
                Ajax({
                    data: $scope.FormData,
                    success: function(Res) {
                        if (!Res['S']) {
                            $scope.ShowErrorMsg = true;
                            $scope.ErrorMsg = Res['M'];
                        } else {
                            formClear();
                            oTable.draw();
                        }                            
                        $scope.$apply();    
                    }
                });
            }            
        }

        /**
         * @name formSubmit
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.InvoicingFrequency
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormInvoicingFrequency.$submitted = false;
            $scope.FormInvoicingFrequency.$setPristine();
            $scope.FormInvoicingFrequency.$setUntouched();
        }
    }

    InvoicingFrequency.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
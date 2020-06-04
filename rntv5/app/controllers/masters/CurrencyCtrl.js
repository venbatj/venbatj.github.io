/**
 * Currency Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Currency', Currency);

    /**
     * @namespace Currency
     * @desc Currency Controller
     * @memberOf Controllers
     */
    function Currency($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormCurrency = {};

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
         * @memberOf Controllers.Currency
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Currency/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'CurrencyName' },
                { data: 'Code' },
                { data: 'ExchangeRate' },
                { data: 'ERModifiedAt' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(5, Row, Data['ID'], editCurrency);                
            };
            oTable = $('#currency-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#currency-data-table');
            DataTableS.onDeleteClick('#currency-data-table', function(RefArr) {
                deleteCurrency(RefArr);
            });
        }

        /**
         * @name editCurrency
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Currency
         */
        function editCurrency(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Currency/getDataByID',
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
         * @name deleteCurrency
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Currency
         */
        function deleteCurrency(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickCurrencyDeleteConfirmBoxOk');
        }

        $scope.$on('onClickCurrencyDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Currency/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#currency-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Currency
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Currency/insertUpdate';

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
         * @name formClear
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.Currency
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormCurrency.$submitted = false;
            $scope.FormCurrency.$setPristine();
            $scope.FormCurrency.$setUntouched();
        }
    }

    Currency.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
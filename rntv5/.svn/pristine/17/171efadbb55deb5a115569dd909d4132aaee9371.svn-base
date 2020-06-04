/**
 * QuoteType Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('QuoteType', QuoteType);

    /**
     * @namespace QuoteType
     * @desc QuoteType Controller
     * @memberOf Controllers
     */
    function QuoteType($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormQuoteType = {};

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
         * @memberOf Controllers.QuoteType
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/QuoteType/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'QuoteType' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editQuoteType);                
            };
            oTable = $('#quote-type-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#quote-type-data-table');
            DataTableS.onDeleteClick('#quote-type-data-table', function(RefArr) {
                deleteQuoteType(RefArr);
            });
        }

        /**
         * @name editQuoteType
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.QuoteType
         */
        function editQuoteType(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/QuoteType/getDataByID',
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
         * @name deleteQuoteType
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.QuoteType
         */
        function deleteQuoteType(ID) {
            $scope.deleteArray = [parseInt(ID)];
            $rootScope.DelConfirmBox('OnClickQuoteTypeDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickQuoteTypeDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/QuoteType/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#quote-type-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.QuoteType
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/QuoteType/insertUpdate';

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
         * @memberOf Controllers.QuoteType
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormQuoteType.$submitted = false;
            $scope.FormQuoteType.$setPristine();
            $scope.FormQuoteType.$setUntouched();
        }
    }

    QuoteType.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
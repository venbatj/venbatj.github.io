/**
 * ContractType Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('ContractType', ContractType);

    /**
     * @namespace ContractType
     * @desc ContractType Controller
     * @memberOf Controllers
     */
    function ContractType($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormContractType = {};

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
         * @memberOf Controllers.ContractType
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/ContractType/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'ContractType' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];
            DTProps.rowCallback = function( Row, Data ) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editContractType);                
            };
            oTable = $('#contract-type-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#contract-type-data-table');
            DataTableS.onDeleteClick('#contract-type-data-table', function(RefArr) {
                deleteContractType(RefArr);
            });
        }

        /**
         * @name editContractType
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.ContractType
         */
        function editContractType(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/ContractType/getDataByID',
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
         * @name deleteContractType
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.ContractType
         */
        function deleteContractType(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickContractTypeDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickContractTypeDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/ContractType/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }
                        DataTableS.resetDelete('#contract-type-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.ContractType
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/ContractType/insertUpdate';

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
         * @memberOf Controllers.ContractType
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormContractType.$submitted = false;
            $scope.FormContractType.$setPristine();
            $scope.FormContractType.$setUntouched();
        }
    }

    ContractType.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
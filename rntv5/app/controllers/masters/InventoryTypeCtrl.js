/**
 * InventoryType Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('InventoryType', InventoryType);

    /**
     * @namespace InventoryType
     * @desc InventoryType Controller
     * @memberOf Controllers
     */
    function InventoryType($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormInventoryType = {};

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
         * @memberOf Controllers.InventoryType
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 2]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/InventoryType/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'InventoryType' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(2, Row, Data['ID'], editInventoryType);                
            };
            oTable = $('#inventory-type-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#inventory-type-data-table');
            DataTableS.onDeleteClick('#inventory-type-data-table', function(RefArr) {
                deleteInventoryType(RefArr);
            });
        }

        /**
         * @name editInventoryType
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.InventoryType
         */
        function editInventoryType(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryType/getDataByID',
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
         * @name deleteInventoryType
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.InventoryType
         */
        function deleteInventoryType(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickInventoryTypeDeleteConfirmBoxOk');
        }

        $scope.$on('onClickInventoryTypeDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryType/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#inventory-type-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.InventoryType
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/InventoryType/insertUpdate';

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
         * @memberOf Controllers.InventoryType
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormInventoryType.$submitted = false;
            $scope.FormInventoryType.$setPristine();
            $scope.FormInventoryType.$setUntouched();
        }
    }

    InventoryType.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
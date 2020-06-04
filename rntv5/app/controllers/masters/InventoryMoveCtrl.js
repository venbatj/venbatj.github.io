/**
 * InventoryMove Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('InventoryMove', InventoryMove);

    /**
     * @namespace InventoryMove
     * @desc InventoryMove Controller
     * @memberOf Controllers
     */
    function InventoryMove($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormInventoryMove = {};

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
         * @memberOf Controllers.InventoryMove
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/InventoryMove/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'InventoryMove' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editInventoryMove);                
            };
            oTable = $('#inventory-move-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#inventory-move-data-table');
            DataTableS.onDeleteClick('#inventory-move-data-table', function(RefArr) {
                deleteInventoryMove(RefArr);
            });
        }

        /**
         * @name editInventoryMove
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.InventoryMove
         */
        function editInventoryMove(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryMove/getDataByID',
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
         * @name deleteInventoryMove
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.InventoryMove
         */
        function deleteInventoryMove(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickInventoryMoveDeleteConfirmBoxOk');
        }

        $scope.$on('onClickInventoryMoveDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryMove/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#inventory-move-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.InventoryMove
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/InventoryMove/insertUpdate';

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
         * @memberOf Controllers.InventoryMove
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormInventoryMove.$submitted = false;
            $scope.FormInventoryMove.$setPristine();
            $scope.FormInventoryMove.$setUntouched();
        }
    }

    InventoryMove.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
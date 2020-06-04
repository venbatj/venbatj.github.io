/**
 * OrderingInventoryReason Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('OrderingInventoryReason', OrderingInventoryReason);

    /**
     * @namespace OrderingInventoryReason
     * @desc OrderingInventoryReason Controller
     * @memberOf Controllers
     */
    function OrderingInventoryReason($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormOrderingInventoryReason = {};

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
         * @memberOf Controllers.OrderingInventoryReason
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/OrderingInventoryReason/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'OrderingReason' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editOrderingInventoryReason);                
            };
            oTable = $('#order-inventory-reason-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#order-inventory-reason-data-table');
            DataTableS.onDeleteClick('#order-inventory-reason-data-table', function(RefArr) {
                deleteOrderingInventoryReason(RefArr);
            });
        }

        /**
         * @name editOrderingInventoryReason
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.OrderingInventoryReason
         */
        function editOrderingInventoryReason(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/OrderingInventoryReason/getDataByID',
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
         * @name deleteOrderingInventoryReason
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.OrderingInventoryReason
         */
        function deleteOrderingInventoryReason(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickOrderingInventoryReasonDeleteConfirmBoxOk');
        }

        $scope.$on('onClickOrderingInventoryReasonDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/OrderingInventoryReason/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#order-inventory-reason-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.OrderingInventoryReason
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/OrderingInventoryReason/insertUpdate';

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
         * @memberOf Controllers.OrderingInventoryReason
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormOrderingInventoryReason.$submitted = false;
            $scope.FormOrderingInventoryReason.$setPristine();
            $scope.FormOrderingInventoryReason.$setUntouched();
        }
    }

    OrderingInventoryReason.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
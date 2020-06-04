/**
 * Order Inventory Type Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('OrderInventoryType', OrderInventoryType);

    /**
     * @namespac Order Inventory Type
     * @desc Order Inventory Type Controller
     * @memberOf Controllers
     */
    function OrderInventoryType($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormOrderInventory = {};

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
         * @memberOf Controllers.OrderInventoryType
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/OrderInventoryType/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'OrderType' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editOrderInventoryType);                
            };
            oTable = $('#order-inventory-type-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#order-inventory-type-data-table');
            DataTableS.onDeleteClick('#order-inventory-type-data-table', function(RefArr) {
                deleteOrderInventoryType(RefArr);
            });
        }

        /**
         * @name editOrderInventoryType
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.OrderInventoryType
         */
        function editOrderInventoryType(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/OrderInventoryType/getDataByID',
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
         * @name deleteOrderInventoryType
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.OrderInventoryType
         */
        function deleteOrderInventoryType(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickOrderInventoryTypeDeleteConfirmBoxOk');
        }

        $scope.$on('onClickOrderInventoryTypeDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/OrderInventoryType/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#order-inventory-type-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.OrderInventoryType
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/OrderInventoryType/insertUpdate';
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
         * @memberOf Controllers.OrderInventoryType
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormOrderInventory.$submitted = false;
            $scope.FormOrderInventory.$setPristine();
            $scope.FormOrderInventory.$setUntouched();
        }
    }

    OrderInventoryType.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
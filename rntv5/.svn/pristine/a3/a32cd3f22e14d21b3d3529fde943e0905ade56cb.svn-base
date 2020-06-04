/**
 * InventoryAction Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('InventoryAction', InventoryAction);

    /**
     * @namespace InventoryAction
     * @desc InventoryAction Controller
     * @memberOf Controllers
     */
    function InventoryAction($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
            loadInventoryTypeDropdown();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormInventoryAction = {};

        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;

        $scope.formSubmit = formSubmit;
        $scope.formClear = formClear;
        $scope.deleteArray = [];
        $scope.InventoryTypeList = [];
        
        var oTable = null;

        function initInventoryType() {
            $('#inventory-type-id').select2({
                placeholder: 'Select a InventoryType',
                allowClear: true,
                width: 'off',
            });
        }
    
        function loadInventoryTypeDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryType/getAllData'
                },
            success: function(Res) {
                initInventoryType();
                $scope.InventoryTypeList = Res['D'];
                $scope.$apply();
                }
            });
        }

        // Function definitions

        /**
         * @name loadListPage
         * @desc Called on $viewContentLoaded
         * @memberOf Controllers.InventoryAction
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/InventoryAction/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'InventoryTypeID' },
                { data: 'InventoryAction' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(4, Row, Data['ID'], editInventoryAction);                
            };
            oTable = $('#inventory-action-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#inventory-action-data-table');
            DataTableS.onDeleteClick('#inventory-action-data-table', function(RefArr) {
                deleteInventoryAction(RefArr);
            });
        }

        /**
         * @name editInventoryAction
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.InventoryAction
         */
        function editInventoryAction(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryAction/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $('#inventory-type-id').val(Res['D']['InventoryTypeID']).trigger('change.select2');

                        $scope.$apply();
                    }
                }
            });
        }        
       
        /**
         * @name deleteInventoryAction
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.InventoryAction
         */
        function deleteInventoryAction(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickInventoryActionDeleteConfirmBoxOk');
        }

        $scope.$on('onClickInventoryActionDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/InventoryAction/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#inventory-action-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.InventoryAction
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/InventoryAction/insertUpdate';

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
         * @memberOf Controllers.InventoryAction
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormInventoryAction.$submitted = false;
            $scope.FormInventoryAction.$setPristine();
            $scope.FormInventoryAction.$setUntouched();
            $("#inventory-type-id").val('').trigger('change.select2');
            initInventoryType();
        }
    }

    InventoryAction.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
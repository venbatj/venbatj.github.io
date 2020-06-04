/**
 * CustomerType Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('CustomerType', CustomerType);

    /**
     * @namespace CustomerType
     * @desc CustomerType Controller
     * @memberOf Controllers
     */
    function CustomerType($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormCustomerType = {};

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
         * @memberOf Controllers.CustomerType
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/CustomerType/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'CustomerType' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editCustomerType);                
            };
            oTable = $('#customer-type-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#customer-type-data-table');
            DataTableS.onDeleteClick('#customer-type-data-table', function(RefArr) {
                deleteCustomerType(RefArr);
            });
        }

        /**
         * @name editCustomerType
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerType
         */
        function editCustomerType(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerType/getDataByID',
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
         * @name deleteCustomerType
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerType
         */
        function deleteCustomerType(ID) {
            $scope.deleteArray = [parseInt(ID)];
            $rootScope.DelConfirmBox('OnClickCustomerTypeDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickCustomerTypeDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerType/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#customer-type-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.CustomerType
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/CustomerType/insertUpdate';

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
         * @memberOf Controllers.CustomerType
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormCustomerType.$submitted = false;
            $scope.FormCustomerType.$setPristine();
            $scope.FormCustomerType.$setUntouched();
        }
    }

    CustomerType.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
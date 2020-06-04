/**
 * CustomerService Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('CustomerService', CustomerService);

    /**
     * @namespace CustomerService
     * @desc CustomerService Controller
     * @memberOf Controllers
     */
    function CustomerService($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormCustomerService = {};

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
         * @memberOf Controllers.CustomerService
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/CustomerService/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'CustomerService' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editCustomerService);                
            };
            oTable = $('#customer-service-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#customer-service-data-table');
            DataTableS.onDeleteClick('#customer-service-data-table', function(RefArr) {
                deleteCustomerService(RefArr);
            });
        }

        /**
         * @name editCustomerService
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerService
         */
        function editCustomerService(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerService/getDataByID',
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
         * @name deleteCustomerService
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerService
         */
        function deleteCustomerService(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickCustomerServiceDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickCustomerServiceDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerService/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#customer-service-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.CustomerService
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/CustomerService/insertUpdate';

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
         * @memberOf Controllers.CustomerService
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormCustomerService.$submitted = false;
            $scope.FormCustomerService.$setPristine();
            $scope.FormCustomerService.$setUntouched();
        }
    }

    CustomerService.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
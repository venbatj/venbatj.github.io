/**
 * Customer Management Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('CustomerManagement', CustomerManagement);
        
    /**
     * @namespace CustomerManagement
     * @desc Customer Management Controller
     * @memberOf Controllers
     */
    function CustomerManagement($rootScope, $state, $stateParams, $scope, $location, DataTableS) {
        var oTable;
        $scope.$on('$viewContentLoaded', function() {
            loadCustomerDetails();
            loadCountryDropdown();
            loadContractTypeDropdown();
            loadCustomerTypeDropdown();
            loadAccountManagerDropdown();
        });

        $scope.onListingChange1 = function(){
            if ($scope.BasicDetail.ContractTypeID == 'ContractAll1' )
                $location.url('/customer/customer-management');
        }

        $scope.onListingChange2 = function(){
            if ($scope.BasicDetail.CustomerTypeID == 'ContractAll2' )
                $location.url('/customer/customer-management');
        }

        $scope.Searching = function() {
            $state.go('Customer-Management', {
                'CustomerType': $scope.BasicDetail.CustomerTypeID,
                'AccountManager': $scope.BasicDetail.AccountManager
                }, {
                location: 'replace',
                reload: true
            });
        }

        $scope.openAddPage = openAddPage;
        $scope.importCustomer = importCustomer;

        $scope.CountryNameList = [];
        $scope.ContractTypeList = [];
        $scope.CustomerTypeList = [];
        $scope.AccountManagerList = [];

        $('#country-name').select2({
            placeholder: 'Select a country',
            allowClear: true,
            width: 'off',
        });
        function loadCountryDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/getAllData'
                },
                success: function(Res) {
                    $scope.CountryNameList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        $('#account-manager').select2({
            placeholder: 'Select Account Manager',
            allowClear: true,
            width: 'off',
        });
        function loadAccountManagerDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getAllDataAccount'
                },
                success: function(Res) {
                    $scope.AccountManagerList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        $('#contract-type').select2({
            placeholder: 'contract type',
            allowClear: true,
            width: 'off',
        });
        function loadContractTypeDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/ContractType/getAllData'
                },
                success: function(Res) {
                    $scope.ContractTypeList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        $('#customer-type').select2({
            placeholder: 'customer type',
            allowClear: true,
            width: 'off',
        });
        function loadCustomerTypeDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerType/getAllData'
                },
                success: function(Res) {
                    $scope.CustomerTypeList = Res['D'];
                    $scope.$apply();
                }
            });
        }


        /**
         * @name loadCustomerDetails
         * @desc Called to load customer details
         * @memberOf Controllers.CustomerManagement
         */
        function loadCustomerDetails() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 7]}];
            DTProps.fnServerParams = function (aoData) {  
                aoData.push(  
                    {name: 'EndPoint', value: 'Customer/BasicDetail/getDataByPage'},
                    {name: 'JWT', value: $rootScope.gvJWT},
                    {name: 'CustomerType', value: $stateParams.CustomerType},
                    {name: 'AccountManager', value: $stateParams.AccountManager},
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'CustomerName' },
                { data: 'CustomerType' },
                { data: 'AccountManager' },
                { data: 'LocationCount' },
                { data: 'ContractCount' },
                { data: 'Status' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];

            DTProps.rowCallback = function(Row, Data) {
           
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(7, Row, Data['ID'], editCustomerDetail);  
            DataTableS.createReportActionColumn(7, Row, Data['ID'], viewCustomerDetails);              
        };
            oTable = $('#customer-managment-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#customer-managment-data-table');
            DataTableS.onDeleteClick('#customer-managment-data-table', function(RefArr) {
                deleteCustomerDetails(RefArr);
            });
        }

        /**
         * @name viewCustomerDetails
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerManagement
         */
        function viewCustomerDetails(ID) {
            $location.url('/customer/edit-details/' + ID + '/view');
            $scope.$apply();
        }
        /**
         * @name editCustomerDetail
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerManagement
         */
        function editCustomerDetail(ID) {
            $location.url('/customer/edit-details/' + ID + '/edit');
            $scope.$apply();
        }

        /**
         * @name deleteCustomerDetails
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerManagement
         */
        function deleteCustomerDetails(IDArray) {
            console.log(IDArray);
            getContractCount(IDArray);
        }

        $scope.$on('OnClickBasicDetailDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/remove',
                    IDArr: $scope.deleteArray,
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();
                        $scope.$apply();
                    }
                }
            });
        });

        function getContractCount(ID) {
            Ajax({
                data: {
                EndPoint: 'Customer/BasicDetail/getContractCount',
                ID: ID
                },
                success: function(Res) {
                    console.log(Res);
                    console.log(Res['D']);
                    $scope.deleteArray = ID;
                    // $scope.Str = 'Data' + '<br>' + 'Hii';
                    if (Res['D']) {
                        if (Res['D']['Count'] > 0) {
                            // $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk', 'Customer ' + Res['D']['CustomerName'] + ' have ' + Res['D']['Count'] + ' Contracts. Are you sure You want to delete all the ' + Res['D']['Count'] + ' Contracts');
                            $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk', 'Customer ' + Res['D']['CustomerName'] + ' have ' + Res['D']['Count'] + ' Contracts. Are you sure You want to delete the Selection');
                        }
                    } else {
                        $rootScope.DelConfirmBox('OnClickBasicDetailDeleteConfirmBoxOk');
                    }

                    $scope.$apply();
                }
            });
        }

        /**
         * @name openAddPage
         * @desc Called on click of add button
         * @memberOf Controllers.CustomerManagement
         */
        function openAddPage() {
            $location.url('/customer/customer-details');
        }

        /**
         * @name importCustomer
         * @desc Called on click of import customer button
         * @memberOf Controllers.CustomerManagement
         */
        function importCustomer() {
            $location.url('/customer/import-customer');
        }
        
        /**
         * @name BackManagement
         * @desc Called on click of back button
         * @memberOf Controllers.CustomerDetail
         */
        $scope.BackManagement = function() {
            $location.url('/customer/customer-index');
        }
    }

    CustomerManagement.$inject = ['$rootScope','$state','$stateParams', '$scope', '$location', 'DataTableS'];
})();
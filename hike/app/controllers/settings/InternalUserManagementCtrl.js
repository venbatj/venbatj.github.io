/**
 * InternalUserManagement Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('InternalUserManagement', InternalUserManagement);

    /**
     * @namespace InternalUserManagement
     * @desc InternalUserManagement Controller
     * @memberOf Controllers
     */
    function InternalUserManagement($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormInternalUserManagement = {};

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
         * @memberOf Controllers.InternalUserManagement
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 11]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Settings/InternalUserManagement/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'LoginID' },
                { data: 'UserTypeID' },
                { data: 'FirstName' },
                { data: 'LastName' },
                { data: 'DepartmentD' },
                { data: 'DesignationID' },
                { data: 'MemberID' },
                { data: 'EmployeeID'},
                { data: 'Phone' },
                { data: 'Location' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function( Row, Data ) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(11, Row, Data['ID'], editInternalUserManagement);                
            };
            oTable = $('#user-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#user-data-table');
            DataTableS.onDeleteClick('#user-data-table', function(RefArr) {
                deleteInternalUserManagement(RefArr);
            });   
        }
        $scope.DisableTextBox = false;

        /**
         * @name editInternalUserManagement
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.InternalUserManagement
         */
        function editInternalUserManagement(ID) {
            Ajax({
                data: {
                    EndPoint: 'Settings/InternalUserManagement/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $scope.DisableTextBox = true;

                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name deleteInternalUserManagement
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.InternalUserManagement
         */
        function deleteInternalUserManagement(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickInternalUserManagementDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickInternalUserManagementDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Settings/InternalUserManagement/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#user-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.InternalUserManagement
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Settings/InternalUserManagement/insertUpdate';

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
         * @memberOf Controllers.InternalUserManagement
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.DisableTextBox = false;
            $scope.FormData = {};

            $scope.FormInternalUserManagement.$submitted = false;
            $scope.FormInternalUserManagement.$setPristine();
            $scope.FormInternalUserManagement.$setUntouched();
        }
    }

    InternalUserManagement.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
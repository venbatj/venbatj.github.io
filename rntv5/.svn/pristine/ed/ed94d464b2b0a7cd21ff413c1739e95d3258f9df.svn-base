/**
 * Role Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Role', Role);

    /**
     * @namespace Role
     * @desc Role Controller
     * @memberOf Controllers
     */
    function Role($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormRole = {};

        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;

        $scope.formSubmit = formSubmit;
        $scope.formClear = formClear;
        $scope.deleteArray = [];
        
        var oTable = null;

        $scope.showSaveAlert = function() {
            $('#save-role').modal('show');
        }

        // Function definitions

        /**
         * @name loadListPage
         * @desc Called on $viewContentLoaded
         * @memberOf Controllers.Role
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Role/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'UserRole' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editRole);                
            };
            oTable = $('#role-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#role-data-table');
            DataTableS.onDeleteClick('#role-data-table', function(RefArr) {
                deleteRole(RefArr);
            });
        }
        
        /**
         * @name editRole
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Role
         */
        function editRole(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Role/getDataByID',
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
         * @name deleteRole
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Role
         */
        function deleteRole(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickRoleDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickRoleDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Role/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#role-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Role
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Role/insertUpdate';

            if (isValid) {
                Ajax({
                    data: $scope.FormData,
                    success: function(Res) {
                        if (!Res['S']) {
                            $scope.ShowErrorMsg = true;
                            $scope.ErrorMsg = Res['M'];
                        } else {
                            $scope.showSaveAlert();
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
         * @memberOf Controllers.Role
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormRole.$submitted = false;
            $scope.FormRole.$setPristine();
            $scope.FormRole.$setUntouched();
        }
    }

    Role.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
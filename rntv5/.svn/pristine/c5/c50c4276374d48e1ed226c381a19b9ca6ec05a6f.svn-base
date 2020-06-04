/**
 * Department Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Department', Department);

    /**
     * @namespace Department
     * @desc Department Controller
     * @memberOf Controllers
     */
    function Department($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormDepartment = {};

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
         * @memberOf Controllers.Department
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 2]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Department/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'Department' },
                
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(2, Row, Data['ID'], editDepartment);                
            };
            oTable = $('#department-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#department-data-table');
            DataTableS.onDeleteClick('#department-data-table', function(RefArr) {
                deleteDepartment(RefArr);
            });
        }

        /**
         * @name editDepartment
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Department
         */
        function editDepartment(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Department/getDataByID',
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
         * @name deleteDepartment
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Department
         */
        function deleteDepartment(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickDepartmentDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickDepartmentDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Department/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#department-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Department
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Department/insertUpdate';

            if (isValid) {
                Ajax({
                    data: $scope.FormData,
                    success: function(Res) {
                        // if (!Res['S']) {
                        //     $scope.ShowErrorMsg = true;
                        //     $scope.ErrorMsg = Res['M'];
                        // } else {
                            formClear();
                            oTable.draw();
                        // }                            
                        $scope.$apply();    
                    }
                });
            }            
        }

        /**
         * @name formSubmit
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.Department
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormDepartment.$submitted = false;
            $scope.FormDepartment.$setPristine();
            $scope.FormDepartment.$setUntouched();
        }
    }

    Department.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
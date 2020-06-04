/**
 * Designation Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Designation', Designation);

    /**
     * @namespace Designation
     * @desc Designation Controller
     * @memberOf Controllers
     */
    function Designation($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormDesignation = {};

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
         * @memberOf Controllers.Designation
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 2]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Designation/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'Designation' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(2, Row, Data['ID'], editDesignation);                
            };
            oTable = $('#designation-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#designation-data-table');
            DataTableS.onDeleteClick('#designation-data-table', function(RefArr) {
                deleteDesignation(RefArr);
            });
        }

        /**
         * @name editDesignation
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Designation
         */
        function editDesignation(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Designation/getDataByID',
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
         * @name deleteDesignation
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Designation
         */
        function deleteDesignation(ID) {
            $scope.deleteArray = [parseInt(ID)];
            $rootScope.DelConfirmBox('OnClickDesignationDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickDesignationDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Designation/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#designation-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Designation
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Designation/insertUpdate';

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
         * @memberOf Controllers.Designation
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormDesignation.$submitted = false;
            $scope.FormDesignation.$setPristine();
            $scope.FormDesignation.$setUntouched();
        }
    }

    Designation.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
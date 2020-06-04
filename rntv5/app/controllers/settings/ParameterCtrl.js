/**
 * Parameter Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Parameter', Parameter);

    /**
     * @namespace Parameter
     * @desc Parameter Controller
     * @memberOf Controllers
     */
    function Parameter($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormParameter = {};

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
         * @memberOf Controllers.Parameter
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Parameter/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'ParameterKey' },
                { data: 'ParameterValue' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function( Row, Data ) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(4, Row, Data['ID'], editParameter);                
            };
            oTable = $('#parameter-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#parameter-data-table');
            DataTableS.onDeleteClick('#parameter-data-table', function(RefArr) {
                deleteParameter(RefArr);
            });
        }

        /**
         * @name editParameter
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Parameter
         */
        function editParameter(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Parameter/getDataByID',
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
         * @name deleteParameter
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Parameter
         */
        function deleteParameter(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickParameterDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickParameterDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Parameter/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#parameter-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Parameter
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Parameter/insertUpdate';

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
         * @memberOf Controllers.Parameter
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormParameter.$submitted = false;
            $scope.FormParameter.$setPristine();
            $scope.FormParameter.$setUntouched();
        }
    }

    Parameter.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
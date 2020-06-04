/**
 * IdentifyLinen Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('IdentifyLinen', IdentifyLinen);

    /**
     * @namespace IdentifyLinen
     * @desc IdentifyLinen Controller
     * @memberOf Controllers
     */
    function IdentifyLinen($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormIdentifyLinen = {};

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
         * @memberOf Controllers.IdentifyLinen
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/IdentifyLinen/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'IdentifyLinen' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editIdentifyLinen);                
            };
            oTable = $('#identify-linen-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#identify-linen-data-table');
            DataTableS.onDeleteClick('#identify-linen-data-table', function(RefArr) {
                deleteIdentifyLinen(RefArr);
            });
        }

        /**
         * @name editIdentifyLinen
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.IdentifyLinen
         */
        function editIdentifyLinen(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/IdentifyLinen/getDataByID',
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
         * @name deleteIdentifyLinen
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.IdentifyLinen
         */
        function deleteIdentifyLinen(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickIdentifyLinenDeleteConfirmBoxOk');
        }

        $scope.$on('onClickIdentifyLinenDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/IdentifyLinen/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#identify-linen-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.IdentifyLinen
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/IdentifyLinen/insertUpdate';

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
         * @memberOf Controllers.IdentifyLinen
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormIdentifyLinen.$submitted = false;
            $scope.FormIdentifyLinen.$setPristine();
            $scope.FormIdentifyLinen.$setUntouched();
        }
    }

    IdentifyLinen.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
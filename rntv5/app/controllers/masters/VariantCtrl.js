/**
 * Variant Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Variant', Variant);

    /**
     * @namespace Variant
     * @desc Variant Controller
     * @memberOf Controllers
     */
    function Variant($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormVariant = {};

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
         * @memberOf Controllers.Variant
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 2]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Variant/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'VariantName' },
                //{ data: 'VariantCode' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editVariant);                
            };
            oTable = $('#variant-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#variant-data-table');
            DataTableS.onDeleteClick('#variant-data-table', function(RefArr) {
                deleteVariant(RefArr);
            });
        }

        /**
         * @name editVariant
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Variant
         */
        function editVariant(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Variant/getDataByID',
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
         * @name deleteVariant
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Variant
         */
        function deleteVariant(ID) {
            $scope.deleteArray = [parseInt(ID)];
            $rootScope.DelConfirmBox('OnClickVariantDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickVariantDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Variant/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#variant-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Variant
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Variant/insertUpdate';

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
         * @memberOf Controllers.Variant
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormVariant.$submitted = false;
            $scope.FormVariant.$setPristine();
            $scope.FormVariant.$setUntouched();
        }
    }

    Variant.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
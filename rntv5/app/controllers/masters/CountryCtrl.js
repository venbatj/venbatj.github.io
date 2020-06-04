/**
 * Country Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Country', Country);

    /**
     * @namespace Country
     * @desc Country Controller
     * @memberOf Controllers
     */
    function Country($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormCountry = {};

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
         * @memberOf Controllers.Country
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 2]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Country/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'CountryName' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(2, Row, Data['ID'], editCountry);                
            };
            oTable = $('#country-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#country-data-table');
            DataTableS.onDeleteClick('#country-data-table', function(RefArr) {
                deleteCountry(RefArr);
            });
        }

        /**
         * @name editCountry
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Country
         */
        function editCountry(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/getDataByID',
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
         * @name deleteCountry
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Country
         */
        function deleteCountry(ID) {
            $scope.deleteArray = [parseInt(ID)];
            $rootScope.DelConfirmBox('OnClickCountryDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickCountryDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#country-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Country
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Country/insertUpdate';

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
         * @memberOf Controllers.Country
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormCountry.$submitted = false;
            $scope.FormCountry.$setPristine();
            $scope.FormCountry.$setUntouched();
        }
    }

    Country.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
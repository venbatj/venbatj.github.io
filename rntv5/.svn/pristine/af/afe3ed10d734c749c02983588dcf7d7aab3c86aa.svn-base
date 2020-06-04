/**
 * City Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('City', City);

    /**
     * @namespace City
     * @desc City Controller
     * @memberOf Controllers
     */
    function City($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
            loadCountryIDDropdown();
        });

        $scope.CountryIDList = []; 

        function initCountryID() {
            $('#country-id').select2({
                placeholder: 'Select a country ID',
                allowClear: true,
                width: 'off',
            });
        }

        function loadCountryIDDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/getAllData'
                },
                success: function(Res) {
                    initCountryID();
                    $scope.CountryIDList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormCity = {};

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
         * @memberOf Controllers.City
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/City/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column'},
                { data: 'CountryName' },
                { data: 'CityName' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editCity);                
            };
            oTable = $('#city-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#city-data-table');
            DataTableS.onDeleteClick('#city-data-table', function(RefArr) {
                deleteCity(RefArr);
            });
        }

        /**
         * @name editCity
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.City
         */
        function editCity(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/City/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        console.log(Res['D']);
                        $scope.FormData = Res['D'];
                        $('#country-id').val(Res['D'].CountryID).trigger('change.select2'); 
                        $scope.$apply();
                    }
                }
            });
        }
       
        /**
         * @name deleteCity
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.City
         */
        function deleteCity(ID) {
            $scope.deleteArray = [parseInt(ID)];
            $rootScope.DelConfirmBox('OnClickCityDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickCityDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/City/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#city-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.City
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/City/insertUpdate';

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
         * @memberOf Controllers.City
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormCity.$submitted = false;
            $scope.FormCity.$setPristine();
            $scope.FormCity.$setUntouched();
            $("#country-id").val('').trigger('change.select2');
            initCountryID();
        }
    }

    City.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
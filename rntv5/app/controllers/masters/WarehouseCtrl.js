/**
 * Warehouse Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Warehouse', Warehouse);

    /**
     * @namespace Warehouse
     * @desc Warehouse Controller
     * @memberOf Controllers
     */
    function Warehouse($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormWarehouse = {};

        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;

        $scope.formSubmit = formSubmit;
        $scope.formClear = formClear;
        $scope.deleteArray = [];
        $scope.CityList = [];
        $scope.CountryList = [];
        
        var oTable = null;
        loadCityDropdown();
        loadCountryDropdown();

        function initCity() {
            $('#city-idd').select2({
                placeholder: 'Select a City Name',
                allowClear: true,
                width: 'off',
            });
        }
    
        function loadCityDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/City/getAllData'
                },
                success: function(Res) {
                    initCity();
                    $scope.CityList = Res['D'];
                    $scope.$apply();
                }
            });
        }
        function initCountry() {
            $('#country-idd').select2({
                placeholder: 'Select a Country Name',
                allowClear: true,
                width: 'off',
            });
        }
    
        function loadCountryDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/getAllData'
                },
                success: function(Res) {
                    initCountry();
                    $scope.CountryList = Res['D'];
                    $scope.$apply();
                }
            });
        }
        
        $scope.filterValue = function ($event) {
            if (isNaN(String.fromCharCode($event.keyCode))) {
                $event.preventDefault();
            }
        };
        // Function definitions

        /**
         * @name loadListPage
         * @desc Called on $viewContentLoaded
         * @memberOf Controllers.Warehouse
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 6]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Warehouse/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'WarehouseName' },
                { data: 'WarehouseManager' },
                { data: 'Rooms' },
                { data: 'CityID' },
                { data: 'CountryID' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(6, Row, Data['ID'], editWarehouse);                
            };
            oTable = $('#warehousing-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#warehousing-data-table');
            DataTableS.onDeleteClick('#warehousing-data-table', function(RefArr) {
                deleteWarehouse(RefArr);
            });
        }

        /**
         * @name editWarehouse
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Warehouse
         */
        function editWarehouse(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Warehouse/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $('#city-idd').val(Res['D'].CityID).trigger('change.select2'); 
                        $('#country-idd').val(Res['D'].CountryID).trigger('change.select2'); 
                        $scope.$apply();
                    }
                }
            });
        }        
       
        /**
         * @name deleteWarehouse
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Warehouse
         */
        function deleteWarehouse(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickWarehouseDeleteConfirmBoxOk');
        }

        $scope.$on('onClickWarehouseDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Warehouse/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#warehousing-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Warehouse
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Warehouse/insertUpdate';

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
         * @memberOf Controllers.Warehouse
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormWarehouse.$submitted = false;
            $scope.FormWarehouse.$setPristine();
            $scope.FormWarehouse.$setUntouched();
            $("#city-idd").val('').trigger('change.select2');
            initCity();
            $("#country-idd").val('').trigger('change.select2');
            initCountry();
        }
    }

    Warehouse.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
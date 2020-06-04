/**
 * Menu Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('Menu', Menu);

    /**
     * @namespace Menu
     * @desc Menu Controller
     * @memberOf Controllers
     */
    function Menu($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormMenu = {};

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
         * @memberOf Controllers.Menu
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 7]}];
            DTProps.fnServerParams = function(aoData) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/Menu/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'MenuName' },
                { data: 'Icon' },
                { data: 'Path' },
                { data: 'DisplayInMenu' },
                { data: 'Description' },
                { data: 'MenuID' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(7, Row, Data['ID'], editMenu);                
            };
            oTable = $('#menu-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#menu-data-table');
            DataTableS.onDeleteClick('#menu-data-table', function(RefArr) {
                deleteMenu(RefArr);
            });
        }

        /**
         * @name editMenu
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Menu
         */
        function editMenu(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Menu/getDataByID',
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
         * @name deleteMenu
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.Menu
         */
        function deleteMenu(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('onClickMenuDeleteConfirmBoxOk');
        }

        $scope.$on('onClickMenuDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/Menu/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#menu-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

    // DROPDOWN DATA
    
    $scope.MenuList = []; 

    $scope.$on('$viewContentLoaded', function() {
        /* INITIALIZE THE SELECT2 DROPDOWN START */
        
        $('#menu').select2({
            placeholder: 'Select a menu',
            allowClear: true,
            width: 'off',
        });
    });
    function loadMenuDropdown() {            
        Ajax({
            data: {
                EndPoint: 'Masters/Manu/getAllData'
            },
            success: function(Res) {
                $scope.MenuList = Res['D'];
            }
        });
    }

    function onMenuChange() {
        var ID = $('#menu').select2('data')[0].id;        
        angular.forEach($scope.MenuList, function(value, key) {
            if (value.ID == ID) {
                $scope.Menu = value.Menu;
            }
        });
    }
        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.Menu
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/Menu/insertUpdate';

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
         * @memberOf Controllers.Menu
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormMenu.$submitted = false;
            $scope.FormMenu.$setPristine();
            $scope.FormMenu.$setUntouched();
        }
    }

    Menu.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
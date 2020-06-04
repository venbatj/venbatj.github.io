/**
 * UserType Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('UserType', UserType);

    /**
     * @namespace UserType
     * @desc UserType Controller
     * @memberOf Controllers
     */
    function UserType($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormUserType = {};

        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;

        $scope.formSubmit = formSubmit;
        $scope.formClear = formClear;
        $scope.deleteArray = [];
        
        var oTable = null;

        $scope.showSaveAlert = function() {
            $('#save-usertype').modal('show');
        }

        // Function definitions

        /**
         * @name loadListPage
         * @desc Called on $viewContentLoaded
         * @memberOf Controllers.UserType
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 3]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/UserType/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'UserType' },
                { data: 'Description' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(3, Row, Data['ID'], editUserType);                
            };
            oTable = $('#user-type-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#user-type-data-table');
            DataTableS.onDeleteClick('#user-type-data-table', function(RefArr) {
                deleteUserType(RefArr);
            });
        }

        /**
         * @name editUserType
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.UserType
         */
        function editUserType(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/UserType/getDataByID',
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
         * @name deleteUserType
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.UserType
         */
        function deleteUserType(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickUserTypeDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickUserTypeDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/UserType/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#user-type-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.UserType
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/UserType/insertUpdate';
            console.log($scope.FormData);
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
         * @memberOf Controllers.UserType
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormUserType.$submitted = false;
            $scope.FormUserType.$setPristine();
            $scope.FormUserType.$setUntouched();
        }
    }

    UserType.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
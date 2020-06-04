/**
 * User Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('User', User);
    
    /**
     * @namespace User
     * @desc User Controller
     * @memberOf Controllers
     */
    function User($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
            loadUserTypeIDDropdown();
            loadDesignationIDDropdown();
            loadDepartmentIDDropdown();
        });
      
        $scope.UserTypeIDList = [];
        $scope.DesignationIDList = [];

        function initUserTypeID() {
            $('#usertype-id').select2({
                placeholder: 'Select a User Type ',
                allowClear: true,
                width: 'off',
            });
        }

        function loadUserTypeIDDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/UserType/getAllData'
                },
                success: function(Res) {
                    initUserTypeID();
                    $scope.UserTypeIDList = Res['D'];
                    $scope.$apply();
                }
            });
        }
       
        function initDesignationID() {
            $('#designation-id').select2({
                placeholder: 'Select a Designation ',
                allowClear: true,
                width: 'off',
            });
        }
        function loadDesignationIDDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Designation/getAllData'
                },
                success: function(Res) {
                    initDesignationID();
                    $scope.DesignationIDList = Res['D'];
                    $scope.$apply();
                }
            });
        }
        $scope.DepartmentIDList = [];
        console.log($scope.DepartmentIDList = []);
        function initDepartmentID() {
            $('#department-id').select2({
                placeholder: 'Select a Department ',
                allowClear: true,
                width: 'off',
            });
        }
        function loadDepartmentIDDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Department/getAllData'
                },
                success: function(Res) {
                    initDepartmentID();
                    $scope.DepartmentIDList = Res['D'];
                    $scope.$apply();
                }
            });
        }
        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormUser = {};

        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;

        $scope.formSubmit = formSubmit;
        $scope.formClear = formClear;
        $scope.InputMask = InputMask;
        $scope.deleteArray = [];
        var oTable = null;

    // Phone Validation
    function InputMask() {
        $('#phone').inputmask("mask", {mask:"(999) 999-9999"})
        }
        $scope.InputMask();

        // Function definitions
        /**
         * @name loadListPage
         * @desc Called on $viewContentLoaded
         * @memberOf Controllers.User
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 9]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Settings/User/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            }; 
             
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'FirstName' },
                { data: 'LastName' },
                { data: 'UserType' },
                { data: 'Department' },
                { data: 'Designation' },
                { data: 'EmployeeID'},
                { data: 'EmailID'},
                { data: 'Phone' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
          

            DTProps.rowCallback = function( Row, Data ) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(9, Row, Data['ID'], editUser);                
            };
            oTable = $('#user-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#user-data-table');
            DataTableS.onDeleteClick('#user-data-table', function(RefArr) {
                deleteUser(RefArr);
            });   
              
        }
        /**
         * @name editUser
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.User
         */
        $scope.DisableTextBox = false;
        // $scope.DisableTextBox1 = false;

        function editUser(ID) {
            Ajax({
                data: {
                    EndPoint: 'Settings/User/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $scope.DisableTextBox = true;
                        $('#usertype-id').val(Res['D'].UserTypeID).trigger('change.select2'); 
                        $('#designation-id').val(Res['D'].DesignationID).trigger('change.select2'); 
                        $('#department-id').val(Res['D'].DepartmentD).trigger('change.select2'); 
                        $scope.$apply();
                    }
                }
            });
        }
        /**
         * @name deleteUser
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.User
         */
        function deleteUser(IDArray) {
            $scope.deleteArray =IDArray;
            $rootScope.DelConfirmBox('OnClickUserDeleteConfirmBoxOk');
        }
        $scope.$on('OnClickUserDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Settings/User/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();
                    if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                        formClear();                            
                        }
                        DataTableS.resetDelete('#user-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.User
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Settings/User/insertUpdate';

            if (isValid) {
                Ajax({
                    data: $scope.FormData,
                    success: function(Res) {
                        if (!Res['S']) {
                            $scope.ShowErrorMsg = true ;
                            $scope.ErrorMsg = Res['M'];
                        } else {
                            $scope.LoginID = Res['D'];
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
         * @memberOf Controllers.User
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.DisableTextBox = false;
            $scope.EmpErrorMsg = false;
            $scope.FormData = {};
            $scope.deleteArray.disable =true;

            $scope.FormUser.$submitted = false;
            $scope.FormUser.$setPristine();
            $scope.FormUser.$setUntouched();
            $("#usertype-id").val('').trigger('change.select2');
            initUserTypeID();
            $("#designation-id").val('').trigger('change.select2');
            initDesignationID();
            $("#department-id").val('').trigger('change.select2');
            initDepartmentID();
        }
    }

    User.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
/**
 * EmailConfiguration Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('EmailConfiguration', EmailConfiguration);

    /**
     * @namespace EmailConfiguration
     * @desc EmailConfiguration Controller
     * @memberOf Controllers
     */
    function EmailConfiguration($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
        });

        // Declarations and assumptions
        $scope.FormData = {};
        $scope.FormEmailConfiguration = {};

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
         * @memberOf Controllers.EmailConfiguration
         */
        function loadListPage() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [0, 6]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    { 'name': 'EndPoint', 'value': 'Masters/EmailConfiguration/getDataByPage'},
                    { 'name': 'JWT', 'value': $rootScope.gvJWT}
                );
            };
            DTProps.order = [[1, 'asc']];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'Host' },
                { data: 'Port' },
                { data: 'SMTPSecure'},
                { data: 'SenderName' },
                { data: 'UserName' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function( Row, Data ) {
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(6, Row, Data['ID'], editEmailConfiguration);                
            };
            oTable = $('#email-configuration-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#email-configuration-data-table');
            DataTableS.onDeleteClick('#email-configuration-data-table', function(RefArr) {
                deleteEmailConfiguration(RefArr);
            });   
        }

        /**
         * @name editEmailConfiguration
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.EmailConfiguration
         */
        function editEmailConfiguration(ID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/EmailConfiguration/getDataByID',
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
         * @name deleteEmailConfiguration
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.EmailConfiguration
         */
        function deleteEmailConfiguration(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickEmailConfigurationDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickEmailConfigurationDeleteConfirmBoxOk', function(event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Masters/EmailConfiguration/remove',
                    IDArr: $scope.deleteArray
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        oTable.draw();

                        if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                            formClear();                            
                        }

                        DataTableS.resetDelete('#email-configuration-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        /**
         * @name formSubmit
         * @desc Called on click of save button in form
         * @memberOf Controllers.EmailConfiguration
         */
        function formSubmit(isValid) {
            $scope.FormData.EndPoint = 'Masters/EmailConfiguration/insertUpdate';

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
         * @memberOf Controllers.EmailConfiguration
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.FormData = {};

            $scope.FormEmailConfiguration.$submitted = false;
            $scope.FormEmailConfiguration.$setPristine();
            $scope.FormEmailConfiguration.$setUntouched();
        }
    }

    EmailConfiguration.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
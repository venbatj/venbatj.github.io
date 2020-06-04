/**
 * Customer Import Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('ImportCustomer', ImportCustomer);
        
    /**
     * @namespace ImportCustomer
     * @desc Customer Import Controller
     * @memberOf Controllers
     */
    function ImportCustomer($rootScope, $scope, $location, DataTableS, FilePicker) {
        var oTable;

        $scope.ImportFile = null;

        $scope.$on('$viewContentLoaded', function() {
            loadImportHistory();
        });

        $scope.selectFile = selectFile;
        $scope.importInit = importInit;
        $scope.backToManagmentPage = backToManagmentPage;
        $scope.backToImportPage = backToImportPage;
        
        /**
         * @name loadImportHistory
         * @desc Called to load import history
         * @memberOf Controllers.ImportCustomer
         */
        function loadImportHistory() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [2]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    {name: 'EndPoint', value: 'Customer/Import/getDataByPage'},
                    {name: 'JWT', value: $rootScope.gvJWT},
                );
            };
            DTProps.order = [[0, 'desc']];
            DTProps.columns = [
                { data: 'ImportAt' },
                { data: 'SrcDownload' },
                { data: null, defaultContent: '', class: 'action-column'}
            ];
            DTProps.rowCallback = function(Row, Data) {
                DataTableS.createReportActionColumn(2, Row, Data['ID'],ReportAction);
            };
            oTable = $('#import-customer-data-table').DataTable(DTProps);
        }

        /**
         * @name ReportAction
         * @desc Called to load customer details
         * @memberOf Controllers.ImportCustomer
         */
       
        function ReportAction(ID, event) {
            var tr = $(event).parent().closest('tr');
            var row = oTable.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                Ajax({
                    data: {
                        EndPoint: 'Customer/Import/getDataByID',
                        ID: ID
                    },
                    success: function(Res) {
                        if (Res['S']) {
                            $scope.Import = Res['D'];
                            $scope.TempData = [];

                            if ($scope.Import !=null) {
                                //HIDE THE WARNING FIELD
                                // angular.forEach($scope.Import.Customer, function(Val, Key) {
                                //     $scope.TempData.push({Name:(Val.Name == undefined) ? 'Laundry' : Val.Name, Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
                                // });
                                angular.forEach($scope.Import.Customer, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Laundry' : Val.Name, Line: Val.Line, Msg: Val.Msg});
                                });
                                angular.forEach($scope.Import.BillingInfo, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'BillingInfo' : Val.Name, Line: Val.Line, Msg: Val.Msg});
                                });
                                angular.forEach($scope.Import.ShippingInfo, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'ShippingInfo' : Val.Name, Line: Val.Line, Msg: Val.Msg});
                                });
                                angular.forEach($scope.Import.Contract, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Contract' : Val.Name, Line: Val.Line, Msg: Val.Msg});
                                });
                                angular.forEach($scope.Import.Contacts, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Contacts' : Val.Name, Line: Val.Line, Msg: Val.Msg});
                                });
                            }
                            $scope.$apply();
                        }
                    }
                });

                var columns ="";

                setTimeout(function() {
                angular.forEach($scope.TempData, function(Val,Key) {
                    columns += '<tr>'+
                    '<td>'+Val.Name +'</td>'+
                    '<td>'+Val.Line +'</td>'+
                    '<td>'+Val.Msg+'</td>'+
                    // '<td>'+Val.Warnings+'</td>'+
                    '</tr>'
                    });
                // row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Sheet Name</th><th>Line</th><th>Message</th><th>Warning</th></tr>'+columns+'</table')).show();
                row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Sheet Name</th><th>Line</th><th>Message</th></tr>'+columns+'</table')).show();
                }, 500);
            }
        }

        /**
         * @name selectFile
         * @desc Called on click of import button
         * @memberOf Controllers.ImportCustomer
         */
        function selectFile() {
            $('#import-customer-ctrl .up-btn').click();
        }

        /**
         * @name importInit
         * @desc Called when file input field is created
         * @memberOf Controllers.ImportCustomer
         */
        function importInit() {
            FilePicker.fileSelector('#import-customer-ctrl', function(file) {
                $scope.ImportFile = {ImportFile: file};
                importSelectedFile();
            }, function() {
                $scope.ImportFile = null;
            });
        }

        /**
         * @name importSelectedFile
         * @desc Called when after selection of the import file
         * @memberOf Controllers.ImportCustomer
         */
        function importSelectedFile() {
            Ajax({
                files: $scope.ImportFile,
                data: {EndPoint: 'Customer/Import/import'},
                success: function(Res) {
                    //console.log(Res);
                    if (Res['S']) {
                        alert('Import finished successfully');
                        $scope.ImportFile = null;
                        oTable.draw();
                        $scope.$apply(); 
                    } else {
                        alert('Import failed :(');
                    }   
                }
            });
        }

        /**
         * @name backToManagmentPage
         * @desc Called on click of back button
         * @memberOf Controllers.CustomerDetail
         */
        function backToManagmentPage() {
                $location.url('/customer/customer-management');
        }
        function backToImportPage() {
            $('.ImportDetails').addClass('hide');
            $('.portlet-body').removeClass('hide');
        }
    }

    ImportCustomer.$inject = ['$rootScope', '$scope', '$location', 'DataTableS', 'FilePicker'];
})();
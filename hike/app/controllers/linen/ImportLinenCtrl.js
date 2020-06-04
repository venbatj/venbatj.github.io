/**
 * Linen Import Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('ImportLinen', ImportLinen);
        
    /**
     * @namespace ImportLinen
     * @desc Linen Import Controller
     * @memberOf Controllers
     */
    function ImportLinen($rootScope, $scope, $location, DataTableS, FilePicker) {
        var oTable;
        $scope.ImportFile = null;

        $scope.$on('$viewContentLoaded', function() {
            loadImportHistory();
        });

        $scope.selectFile           = selectFile;
        $scope.importInit           = importInit;
        $scope.backToManagmentPage  = backToManagmentPage;
        
        /**
         * @name loadImportHistory
         * @desc Called to load import history
         * @memberOf Controllers.ImportLinen
         */
        function loadImportHistory() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [2]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    {'name': 'EndPoint', value: 'LinenSupplier/Import/getDataByPage'},
                    {'name': 'JWT', value: $rootScope.gvJWT}
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
            oTable = $('#import-linen-data-table').DataTable(DTProps);
        }
        /**
         * @name ReportAction
         * @desc Called to load linen details
         * @memberOf Controllers.LinenDetail
         */
        function ReportAction(ID,event) {
            var tr = $(event).parent().closest('tr');
            var row = oTable.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
            Ajax({
                data: {
                    EndPoint: 'LinenSupplier/Import/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.Import = Res['D'];
                        $scope.TempData = [];
                        if ($scope.Import !=null){
                            angular.forEach($scope.Import.Linen, function(Val, Key) {
                                $scope.TempData.push({Name:(Val.Name == undefined) ? 'Linen' : Val.Name,Line: Val.Line, Msg: Val.Msg});
                            });
                            angular.forEach($scope.Import.BillingInfo, function(Val, Key) {
                                $scope.TempData.push({Name:(Val.Name == undefined) ? 'Billing Info' : Val.Name,Line: Val.Line, Msg: Val.Msg});
                            });
                            angular.forEach($scope.Import.Contacts, function(Val, Key) {
                                $scope.TempData.push({Name:(Val.Name == undefined) ? 'Contact Info' : Val.Name,Line: Val.Line, Msg: Val.Msg});
                            });
                            angular.forEach($scope.Import.Contract, function(Val, Key) {
                                $scope.TempData.push({Name:(Val.Name == undefined) ? 'Contract Info' : Val.Name,Line: Val.Line, Msg: Val.Msg});
                            });
                        }
                        $scope.$apply();
                    }
                }
            });
            var columns ="";
            setTimeout(function(){
            angular.forEach($scope.TempData, function(Val,Key){
                columns += '<tr>'+
                '<td>'+ Val.Line +'</td>'+
                '<td>'+Val.Msg+'</td>'+
                // '<td>'+Val.Warnings+'</td>'+
                '</tr>'
                });
                row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Sheet Name</th><th>Line</th><th>Message</th></tr>'+columns+'</table')).show();
                // row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Sheet Name</th><th>Line</th><th>Message</th></tr>'+columns+'</table')).show();
            },500);
        }
    }

        /**
         * @name selectFile
         * @desc Called on click of import button
         * @memberOf Controllers.ImportLinen
         */
        function selectFile() {
            $('#import-linen-ctrl .up-btn').click();
        }

        /**
         * @name importInit
         * @desc Called when file input field is created
         * @memberOf Controllers.ImportLinen
         */
        function importInit() {
            FilePicker.fileSelector('#import-linen-ctrl', function(file) {
                $scope.ImportFile = {ImportFile: file};
                importSelectedFile();
            }, function() {
                $scope.ImportFile = null;
            });
        }

        /**
         * @name importSelectedFile
         * @desc Called when after selection of the import file
         * @memberOf Controllers.ImportLinen
         */
        function importSelectedFile() {
            Ajax({
                files: $scope.ImportFile,
                data: {EndPoint: 'LinenSupplier/Import/import'},
                success: function(Res) {
                    console.log(Res);
                    if (Res['S']) {
                        alert('Import finished successfully');
                        $scope.ImportFile = null;
                        oTable.draw();
                    $scope.$apply();    
                }
                }
            });
        }
        
        /**
         * @name backToManagmentPage
         * @desc Called on click of back button
         * @memberOf Controllers.LinenDetail
         */
        function backToManagmentPage() {
                $location.url('/linen/linen-supplier-management');
            }
    }

    ImportLinen.$inject = ['$rootScope', '$scope', '$location', 'DataTableS', 'FilePicker'];
})();
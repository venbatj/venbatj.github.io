/**
 * Laundry Import Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('ImportLaundry', ImportLaundry);
        
    /**
     * @namespace ImportLaundry
     * @desc Laundry Import Controller
     * @memberOf Controllers
     */
    function ImportLaundry($rootScope, $scope, $location, DataTableS, FilePicker) {
        var oTable;
        
        $scope.ImportFile = null;

        $scope.$on('$viewContentLoaded', function() {
            loadImportHistory();
        });

        $scope.selectFile = selectFile;
        $scope.importInit = importInit;
        $scope.backToManagmentPage = backToManagmentPage;
        
        /**
         * @name loadImportHistory
         * @desc Called to load import history
         * @memberOf Controllers.ImportLaundry
         */
        function loadImportHistory() {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{orderable: false, targets: [2]}];
            DTProps.fnServerParams = function ( aoData ) {  
                aoData.push(  
                    {name: 'EndPoint', value: 'Laundry/Import/getDataByPage'},
                    {name: 'JWT', value: $rootScope.gvJWT}
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
            oTable = $('#import-laundry-data-table').DataTable(DTProps);
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
                        EndPoint: 'Laundry/Import/getDataByID',
                        ID: ID
                    },
                    success: function(Res) {
                        if (Res['S']) {
                            $scope.Import = Res['D'];
                            $scope.TempData = [];
                            if ($scope.Import !=undefined){
                                angular.forEach($scope.Import.Laundry, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Laundry' : Val.Name,Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
                                });
                                angular.forEach($scope.Import.BillingInfo, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Billing Info' : Val.Name,Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
                                });
                                angular.forEach($scope.Import.FacilityInfo, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Facility Info' : Val.Name,Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
                                });
                                angular.forEach($scope.Import.Contacts, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Contact Info' : Val.Name,Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
                                });
                                angular.forEach($scope.Import.ShippingInfo, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'ShippingInfo' : Val.Name,Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
                                });
                                angular.forEach($scope.Import.Contract, function(Val, Key) {
                                    $scope.TempData.push({Name:(Val.Name == undefined) ? 'Contract Info' : Val.Name,Line: Val.Line, Msg: Val.Msg, Warnings: (Val.Warnings == undefined) || (Val.Warnings == '') ? 'NA' : Val.Warnings});
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
                    '<td>'+ Val.Name +'</td>'+
                    '<td>'+ Val.Line +'</td>'+
                    '<td>'+Val.Msg+'</td>'+
                    // '<td>'+Val.Warnings+'</td>'+
                    '</tr>'
                    });
                row.child($('<table class="table table-striped table-bordered table-hover dt-responsive"><tr><th>Sheet Name</th><th>Line</th><th>Message</th></tr>'+columns+'</table')).show();
                },500);
            }
        }
        /**
         * @name selectFile
         * @desc Called on click of import button
         * @memberOf Controllers.ImportLaundry
         */
        function selectFile() {
            $('#import-laundry-ctrl .up-btn').click();
        }

        /**
         * @name importInit
         * @desc Called when file input field is created
         * @memberOf Controllers.ImportLaundry
         */
        function importInit() {
            FilePicker.fileSelector('#import-laundry-ctrl', function(file) {
                $scope.ImportFile = {ImportFile: file};
                importSelectedFile();
            }, function() {
                $scope.ImportFile = null;
            });
        }

        /**
         * @name importSelectedFile
         * @desc Called when after selection of the import file
         * @memberOf Controllers.ImportLaundry
         */
        function importSelectedFile() {
            Ajax({
                files: $scope.ImportFile,
                data: {EndPoint: 'Laundry/Import/import'},
                success: function(Res) {
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
         * @memberOf Controllers.LaundryDetail
         */
        function backToManagmentPage() {
            $location.url('/laundry/laundry-vendor-management');
        }
    }

    ImportLaundry.$inject = ['$rootScope', '$scope', '$location', 'DataTableS', 'FilePicker'];
})();
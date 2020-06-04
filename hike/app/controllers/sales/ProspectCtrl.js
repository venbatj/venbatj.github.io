angular.module('RAT').controller('ProspectCtrl', function($rootScope,$scope,$state, $timeout,DataTableS,$location) {
    var oTable;
    
    $scope.$on('$viewContentLoaded', function() {
        loadProspect();

    });
    $scope.ConvertCustomer = ConvertCustomer;
    $scope.editProspect = editProspect;
    $scope.ShowBOM = ShowBOM;
    /**
     * @name loadProspect
     * @desc Called to load quote generate details
     * @memberOf Controllers.GenerateQuoteManagement
     */
    function loadProspect() {
    var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                {name: 'EndPoint', value: 'Manage/Prospect/getDataByPage'},
                {name: 'JWT', value: $rootScope.gvJWT}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: 'CustomerName' },
            { data: 'HOCityID' },
            { data: 'Modified' },
            { data: 'BOM' },
            { data: 'Action' },
            { data: 'FileName' }
        ];
        oTable = $('#prospect-data-table').DataTable(DTProps);
    }

        /**
         * @name editProspect
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.Currency
         */
        function editProspect(ID) {
            Ajax({
                data: {
                    EndPoint: 'Manage/Prospect/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $scope.FormData.QuoteItems = Res['D']['QuoteItems']; 
                        $location.url('/sales/quote-edit-details/' + Res['D']['ID'] + '/edit');
                            $scope.ShowConvertCustBtn = true;
                            $scope.$apply();
                    }
                }
            });
        }   
        function ShowBOM(ID) {
            Ajax({
                data: {
                    EndPoint: 'Manage/Prospect/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $scope.FormData.QuoteItems = Res['D']['QuoteItems']; 
                        $('#Billofmaterial').modal('show');
                        $scope.$apply();
                    }
                }
            });
        }
        $scope.removeItem = function($index) {
            $scope.FormData.QuoteItems.splice($index, 1);
            window.alert("Are you sure do you want to delete the selection?");
        }
        /**
         * @name ConvertCustomer
         * @desc Called on click of Convert Customer
         * @memberOf Controllers.GenerateQuote
         */
        function ConvertCustomer(ID) {
            console.log(ID);
            // return;
            Ajax({
                data: {
                EndPoint: 'Manage/Prospect/CoverttoCustomer',
                // CapturedData: $scope.FormData
                ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.FormData = Res['D'];
                        $location.url('/customer/edit-details/' + Res['D'] + '');
                    } else {
                        window.alert("Customer Already Exist!");
                    }
                    $scope.$apply();
                }
            });
        }
   
  
});
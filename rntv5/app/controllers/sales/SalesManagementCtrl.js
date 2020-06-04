angular.module('RAT').controller('SalesManagementCtrl', function($state,$rootScope, $scope,$location) {
  
    $scope.GenerateQuoteID = 0;
       
    if ($state.params != null && $state.params.GenerateQuoteID != null && $state.params.GenerateQuoteID > 0)
        $scope.GenerateQuoteID = $state.params.GenerateQuoteID;
    
    if ($scope.GenerateQuoteID > 0) {
    $scope.AddPage = false;
        $timeout(function() {
            loadRelationalData($scope.GenerateQuoteID);
        }, 1000);
    }

    $scope.ProspectList = [];
    $scope.QuoteList = [];

    loadProspectDropdown();
    loadQuoteDropdown();

    $scope.ViewNewquotePage = function () {
        $location.url('/sales/generate-quote');
    }
    $scope.ViewCollateral = function () {
        $location.url('/sales/collaterals');
    }
    $scope.ViewProspect = function () {
        $location.url('/sales/prospect');
    }


    $('#prospect-id').select2({
        placeholder: 'Prospect List',
        allowClear: true,
        width: 'off',
    });
    $('#Quote-id').select2({
        placeholder: 'Converted Customer',
        allowClear: true,
        width: 'off',
    });
        function loadProspectDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getProspectData'
                },
                success: function (Res) {
                    $scope.ProspectList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function loadQuoteDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getQuoteData'
                },
                success: function (Res) {
                    $scope.QuoteList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        $scope.onSalesChange = function(ID) {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S'])
                        $scope.FormData = Res['D'];
                        $location.url('/sales/quote-edit-details/' + Res['D']['ID'] + '/edit');
                    $scope.$apply();
                }
            });
        }
        $scope.onProspectChange = function(ID) {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S'])
                        $scope.FormData = Res['D'];
                        $location.url('/sales/quote-edit-details/' + Res['D']['ID'] + '/edit');
                    $scope.$apply();
                }
            });
        }

});
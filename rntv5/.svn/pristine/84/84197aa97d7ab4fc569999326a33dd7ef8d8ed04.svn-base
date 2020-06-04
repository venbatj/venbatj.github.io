/**
 * Menu Controller
 * @namespace Controller
 */
(function() {
    'use strict';

    angular.module('RAT').controller('ProductPricing', ProductPricing);

    /**
     * @namespace ProductPricing
     * @desc ProductPricing Controller
     * @memberOf Controllers
     */
    function ProductPricing($rootScope, $scope, $state) {

        $scope.$on('$viewContentLoaded', function() { 
            // loadProductDropdown();
            loadProductPricing();
        });

        if ($state.params != null && $state.params.ProductVariantID != null && $state.params.ProductVariantID > 0)
            $scope.ProductVariantID = $state.params.ProductVariantID;
        
        if ($scope.ProductVariantID > 0) {
            $timeout(function() {
                loadRelationalData($scope.ProductVariantID);
            }, 1000);
        }

        $scope.productList = [];
        $scope.ProductPricing = [];
        $scope.WashCostLinen = [];
        $scope.UpdatedData = [];

        $scope.ProductPricingData = {};
        $scope.CostOfLinenUSD = {};
        $scope.IDData = {};

        $scope.saveProductPricing  = saveProductPricing;
        $scope.saveProductCosting = saveProductCosting;
        $scope.formClear = formClear;
        $scope.GetChangedData = GetChangedData;

        /**
         * @name loadProductPricing
         * @desc Called to load Product Variant
         * @memberOf Controllers.ProductPricing
         */
        function loadProductPricing() {
            Ajax({
                data: {
                    EndPoint: 'Settings/ProductPricing/getProductPricingByPVID'
                },
                success: function(Res) {
                    if (Res['D']) {
                        $scope.ProductPricing = Res['D'];
                        var TempCost = [];
                        var TempWash = [];
                        for(var i=0; i<$scope.ProductPricing.length; i++) {
                            TempCost.push({Cost: $scope.ProductPricing[i].TCLinen});
                            TempWash.push({Wash: $scope.ProductPricing[i].WCLinen});
                        }
                        setTimeout(() => {
                            $scope.$apply(function() {
                                $scope.CostOfLinenUSD = TempCost;
                                $scope.WashCostLinen = TempWash;
                            });
                        }, 1000);
                        angular.forEach($scope.ProductPricing, function(Value, Key) {
                            $scope.IDData[Key] = Value.ID;
                        });
                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name saveProductPricing
         * @desc Called on click of save button
         * @memberOf Controllers.ProductPricing
         */
        function saveProductPricing(isValid) {
            $scope.ProductPricingData.EndPoint = 'Settings/ProductPricing/insertUpdate';
            
            if (isValid) {
                Ajax({
                    data: $scope.ProductPricingData,
                    success: function(Res) {
                        if (!Res['S']) {
                            $scope.ShowErrorMsg = true;
                            $scope.ErrorMsg = Res['M'];   
                        } else {
                            window.alert("Saved successfully!");
                            formClear();
                        }
                        $scope.$apply();    
                    }
                });
            }
        }   

        /**
         * @name saveProductCosting
         * @desc Called on click of save button
         * @memberOf Controllers.ProductPricing
         */
        function saveProductCosting() {
            var tempData = {
                Cost: $scope.CostOfLinenUSD,
                Wash: $scope.WashCostLinen, 
                IDData: $scope.IDData,
                Updated: $scope.UpdatedData,
                EndPoint: 'Settings/ProductPricing/insertCost'
            };

            $scope.UpdatedData = [];
            if (1) {
                Ajax({
                    data: tempData,
                    success: function(Res) {
                            $scope.ProductVariantID = Res['D'];
                            window.alert("Saved successfully!");
                            loadProductPricing();
                        $scope.$apply();    
                    }
                });
            }
        }   

        /**
         * @name GetChangedData
         * @desc for CostModifiedDate
         * @memberOf Controllers.ProductPricing
         */
        function GetChangedData(Data) {
            $scope.UpdatedData.push(Data);
        }

        /**
         * @name formClear
         * @desc restore the defaults
         * @memberOf Controllers.ProductPricing
         */
        function formClear() {
            $scope.ErrorMsg = '';
            $scope.ShowErrorMsg = false;
            $scope.ProductPricingData = {};
        }
    
        // function initProduct() {
        //     $('#product').select2({
        //         placeholder: 'Select a product',
        //         allowClear: true,
        //         width: 'off',
        //     });
        // }

        // function loadProductDropdown() {
        //     Ajax({
        //         data: {
        //             EndPoint: 'Masters/Product/getAllDataProduct'
        //         },
        //         success: function(Res) {
        //             initProduct();
        //             $scope.productList = Res['D'];
        //             $scope.$apply();
        //         }
        //     });
        // }
    }
})();
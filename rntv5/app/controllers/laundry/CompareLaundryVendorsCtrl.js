angular.module('RAT').controller('CompareLaundryVendorsCtrl', function($rootScope, $state, $scope, $location, $timeout, DataTableS, FilePicker, $anchorScroll) {
    
    $scope.$on('$viewContentLoaded', function() {
        $('#category').select2({
            placeholder: 'Select a Category',
            allowClear: true,
            width: 'off',
        });
        $('#product').select2({
            placeholder: 'Select a Product',
            allowClear: true,
            width: 'off',
        });
        $('#variant').select2({
            placeholder: 'Select a Variant',
            allowClear: true,
            width: 'off',
        });
    });

    loadCategoryDropdown();

    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.BackIndexPage = BackIndexPage;
    $scope.Clearcomparison = Clearcomparison;
    $scope.cancelTable = cancelTable;

    $scope.CategoryList = [];
    $scope.ProductList = [];
    $scope.VariantList = [];
    $scope.LaundryVendorData = [];

    if ($state.params != null && $state.params.CategoryID != null && $state.params.CategoryID > 0)
        $scope.CategoryID = $state.params.CategoryID;

    if ($state.params != null && $state.params.ProductID != null && $state.params.ProductID > 0)
        $scope.ProductID = $state.params.ProductID;

    if ($state.params != null && $state.params.VariantID != null && $state.params.VariantID > 0)
        $scope.VariantID = $state.params.VariantID;
        
    if ($scope.CategoryID > 0) {
        if ($scope.ProductID > 0) {
            if ($scope.VariantID > 0) {
                $scope.AddPage = false;
                $timeout(function() {
                    loadRelationalData($scope.CategoryID, $scope.ProductID, $scope.VariantID);
                }, 1000);
            }
        }
    }

    function loadRelationalData(CategoryID, ProductID, VariantID) { 
        loadCompareLaundry(CategoryID, ProductID, VariantID);
    }

    function loadCompareLaundry(CategoryID, ProductID, VariantID) {
        $scope.CompareLaundryVendor = [];
        setTimeout(function() { 
            onCategoryChange(CategoryID, ProductID);
            onProductChange(ProductID, VariantID);
            $('#category').val(CategoryID).trigger('change.select2');
            $scope.CompareLaundryVendor.CategoryID = $scope.CategoryID;
            $scope.CompareLaundryVendor.ProductID = $scope.ProductID;
            $scope.$apply();
            // $('#product').val(ProductID).trigger('change.select2');
            // $('#variant').val(VariantID).trigger('change.select2');
        }, 500);
        Ajax({
            data: {
                EndPoint: 'Laundry/BasicDetail/getCompareLaundryVendor',
                CategoryID: CategoryID,
                ProductID: ProductID,
                VariantID: VariantID
            },
            success: function(Res) {
                console.log(Res);
                    $scope.LaundryVendorData = Res['D'];
                $scope.$apply();
            }
        });
    }

    function loadCategoryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Category/getAllData'
            },
            success: function (Res) {
                $scope.CategoryList = Res['D'];
            }
        });
    }
    function loadProductDropdown(CategoryID, ProductID) {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Masters/Product/getProductByCategoryID',
                CategoryID: CategoryID
            },
            success: function (Res) {
                $scope.ProductList = Res['D'];
                $scope.CompareLaundryVendor.ProductID = 0;
                $scope.CompareLaundryVendor.VariantID = 0;
                    $("#product").val('').trigger('change.select2');
                    $("#variant").val('').trigger('change.select2');
                    $timeout(function() {
                        $('#product').val(ProductID).trigger('change.select2');
                    }, 1000);
                $scope.$apply();
            }
        });
    }
    function loadVariantDropdown(ProductID, VariantID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getVariantByProductID',
                ProductID: ProductID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                $scope.CompareLaundryVendor.VariantID = 0;
                    $("#variant").val('').trigger('change.select2');
                    $timeout(function() {
                        $('#variant').val(VariantID).trigger('change.select2');
                    }, 1000);
                $scope.$apply();
            }
        });
    }
    function onCategoryChange(ID, ProductID) {
        loadProductDropdown(ID, ProductID);
    }
    function onProductChange(ProductID, VariantID) {
        loadVariantDropdown(ProductID, VariantID);
    }

    $scope.ComparisonData = function(CategoryID, ProductID, VariantID) {
        $location.url('/laundry/compare-laundry-vendors-edit/' + CategoryID + '/' + ProductID + '/' + VariantID + '');
    }

    function cancelTable($index) {
        $scope.LaundryVendorData.splice($index);
    }

    function Clearcomparison() {
        cancelTable();
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf Controllers.LinenDetail
     */
    function BackIndexPage() {
        $location.url('/laundry/laundry');
    }

});
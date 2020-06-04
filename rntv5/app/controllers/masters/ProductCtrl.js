/**
 * Product Controller
 * @namespace Controllers
 */
(function() {
    'use strict';
    angular.module('RAT').controller('Product', Product);

    /**
     * @namespace Product
     * @desc Product Controller
     * @memberOf Controllers
     */
    function Product($rootScope, $scope, DataTableS) {
        $scope.$on('$viewContentLoaded', function() {            
            loadListPage();
            loadCategoryIDDropdown();
            loadVariantIDDropdown();
        });

        $scope.CategoryList = []; 
        $scope.VariantIDList = []; 

        function initCategoryID() {
            $('#category-id').select2({
                placeholder: 'Select a Category',
                allowClear: true,
                width: 'off',
            });
        }
    
        function loadCategoryIDDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Category/getAllData'
                },
            success: function(Res) {
                initCategoryID();
                $scope.CategoryList = Res['D'];
                $scope.$apply();
                }
            });
        }
    function initVariantID() {
        $('#variant-id').select2({
            placeholder: 'Select a variant ID',
            allowClear: true,
            width: 'off',
        });
    }

    function loadVariantIDDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Variant/getAllData'
            },
        success: function(Res) {
            initVariantID();
            $scope.VariantIDList = Res['D'];
            $scope.$apply();
            }
        });
    }
    // Declarations and assumptions
    $scope.FormData = {};
    $scope.FormProduct = {};

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
     * @memberOf Controllers.Product
     */
    function loadListPage() {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'Masters/Product/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT}
            );
        };
        DTProps.order = [[1, 'asc']];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CategoryID' },
            { data: 'ProductName' },
            { data: 'VariantName' },
            { data: 'Description' },
            { data: null, defaultContent: '', class: 'action-column' }
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editProduct);                
        };
        oTable = $('#product-data-table').DataTable(DTProps);
        DataTableS.checkBoxEvents('#product-data-table');
        DataTableS.onDeleteClick('#product-data-table', function(RefArr) {
            deleteProduct(RefArr);
        });
    }

    /**
     * @name editProduct
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.Product
     */
    function editProduct(ID) {
        Ajax({
            data: {
                EndPoint: 'Masters/Product/getDataByID',
                ID: ID
            },
        success: function(Res) {
            console.log(Res);
            if (Res['S']) {
                $scope.FormData = Res['D'];
                $('#category-id').val(Res['D']['CategoryID']).trigger('change.select2');
                $('#variant-id').val(Res['D']['VariantID']).trigger('change.select2');
                $scope.$apply();
                }
            }
        });
    }

    /**
     * @name deleteProduct
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.Product
     */
    function deleteProduct(ID) {
        $scope.deleteArray = [parseInt(ID)];
        $rootScope.DelConfirmBox('OnClickProductDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickProductDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Masters/Product/remove',
                IDArr: $scope.deleteArray
            },
        success: function(Res) {
            if (Res['S'] && Res['D']) {
                oTable.draw();
            if ($.inArray(parseInt($scope.FormData.ID), $scope.deleteArray) >= 0) {
                formClear();                            
                }
                DataTableS.resetDelete('#product-data-table');
                $scope.deleteArray = [];
                $scope.$apply();
                }
            }
        });
    });

    /**
     * @name formSubmit
     * @desc Called on click of save button in form
     * @memberOf Controllers.Product
     */
    function formSubmit(isValid) {
        $scope.FormData.EndPoint = 'Masters/Product/insertUpdate';
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
     * @memberOf Controllers.Product
     */
    function formClear() {
        $scope.ErrorMsg = '';
        $scope.ShowErrorMsg = false;
        $scope.FormData = {};

        $scope.FormProduct.$submitted = false;
        $scope.FormProduct.$setPristine();
        $scope.FormProduct.$setUntouched();
        $("#category-id").val('').trigger('change.select2');
        initVariantID();
        $("#variant-id").val('').trigger('change.select2');
        initCategoryID();
        }
    }

    Product.$inject = ['$rootScope', '$scope', 'DataTableS'];
})();
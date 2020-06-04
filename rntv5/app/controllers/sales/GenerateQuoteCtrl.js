/**
 * Generate Quote Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('GenerateQuoteCtrl', GenerateQuote)

    /**
     * @namespace GenerateQuote
     * @desc GenerateQuote Controller
     * @memberOf Controllers
     */
    function GenerateQuote($rootScope, $scope, $timeout, $location, $state) {    
        $scope.ShowPC = true;
        $scope.ShowCA = false;
        $scope.AddPage = true;

        $scope.FormData = defaultData();
        $scope.QuoteData = defaultSubFormData();

        $scope.RecoveryWashPeriod = 180;
        $scope.TechCostPerDay = 0;

        $scope.SubFormData = defaultSubFormData();

        $scope.OccupancyList = [];
        $scope.MarginList = [];
        $scope.ValidityList = [];

        $scope.CurrencyList = [
            {Currency: 'Arab Emirates Dirham', CurrencyCode: 'AED'},
            {Currency: 'United States Dollar', CurrencyCode: 'USD'}
        ];

        $scope.CustomerType = 'Hotel';
        $scope.QuoteType = 'Rental Sales';
        $scope.FormData.IsExistingCustomer = 'N';

        $scope.ShowCustomerID = false;
        $scope.ShowCustomerName = true;
        $scope.ShowConvertCustBtn = false;

        $scope.QuoteChange = function(Value) {
            if (Value == 'Y') {
                $scope.ShowCustomerID = true;
                $scope.ShowCustomerName = false;
                $scope.ShowConvertCustBtn = false;
            } else {
                $scope.ShowCustomerName = true;
                $scope.ShowCustomerID = false;
                $scope.ShowConvertCustBtn = false;
            }
        }
       
        
        for (var I = 5; I <= 100; I = I + 5) {
            $scope.OccupancyList.push(I);
            $scope.MarginList.push(I);
        }

        for (var I = 7; I < 100; I = I + 7) {
            $scope.ValidityList.push(I);
        }

        // DROPDOWN DATA
        $scope.CustomerTypeList = []; // CustomerType
        $scope.QuoteTypeList = []; // QuoteType
        $scope.CategoryList = []; // Category
        $scope.ProductList  = []; // Product
        $scope.VariantList  = []; // Variant
        $scope.CountryList = []; // Country
        $scope.CityList = []; // City

        $scope.$on('$viewContentLoaded', function() {
            /* INITIALIZE THE SELECT2 DROPDOWN START */
            $('#customer-id').select2({
                placeholder: 'Select a Customer',
                allowClear: true,
                width: 'off',
            });
            $('#customer-type').select2({
                placeholder: 'Select a customer type',
                allowClear: true,
                width: 'off',
            });
            $('#quote-type').select2({
                placeholder: 'Select a quote type',
                allowClear: true,
                width: 'off',
            });

            $('#category').select2({
                placeholder: 'Select a category',
                allowClear: true,
                width: 'off',
            });
            $('#product').select2({
                placeholder: 'Select a product',
                allowClear: true,
                width: 'off',
            });        
            $('#variant').select2({
                placeholder: 'Select a variant',
                allowClear: true,
                width: 'off',
            });
            $('#country').select2({
                placeholder: 'Select a country',
                allowClear: true,
                width: 'off',
            });
            $('#city').select2({
                placeholder: 'Select a city',
                allowClear: true,
                width: 'off',
            });
            $('#sales-person-name').select2({
                placeholder: 'Select a SalesPerson',
                allowClear: true,
                width: 'off',
            });

            $timeout(function() {
                $("#customer-type").val(1).trigger('change');
                $("#quote-type").val(2).trigger('change');
            }, 1000);
        });

        $scope.onCustomerTypeChange = onCustomerTypeChange;
        $scope.onQuoteTypeChange = onQuoteTypeChange;
        $scope.onCategoryChange = onCategoryChange;
        $scope.onCustomerChange = onCustomerChange;
        $scope.onProductChange = onProductChange;
        $scope.onVariantChange = onVariantChange;
        $scope.removeItem = removeItem;
        $scope.addItem = addItem;
        $scope.backToManagmentPage = backToManagmentPage;
        $scope.ConvertCustomer = ConvertCustomer;

        loadCustomerTypeDropdown();
        loadQuoteTypeDropdown();
        loadCategoryDropdown();
        loadCountryDropdown();
        loadCityDropdown();
        loadSalePersonDropdown();
        loadcustomerDropdown();

        function defaultData() {
            return {
                ID: 0,
                QuoteItems: [],
                QuoteData: [],
                CustomerTypeID: 1,
                CustomerName: '',
                QuoteTypeID: 2,
                HOCountryID: 0,
                HOCityID: 0,
                HOPhone: '',
                POBox: '',
                TotalQtyPurchased: 0,
                TotalPurchaseCost: 0,
                // SPName: $rootScope.gvUserInfo.FullName,
                SPName: 0,
                RoomCount: 100,
                PARLevelExpected: 2.5,
                OccupancyConsidering: '50',
                PTMargin: '25',
                QuoteValidity: '7',
                Currency: 'AED'
            };
        }

        function defaultSubFormData() {
            if ($scope.FormData.QuoteTypeID == 1) {
                return {
                    ID: 0,
                    CostOfLinen: 'NA',
                    ProductName: '',
                    VariantName: '',
                    VariantID: 0,
                    ProductID: 0,
                    TotalQuantity: 'NA',
                    BillableQty: 'NA',
                    Qty: 0,
                    LinenCostPerUse: 'NA',
                    TechCostPerUse: 'NA',
                    DeliveryCostPerUse: 'NA', 
                    PriceToCustomer: 0,
                    EstBillingPerDay: 'NA',
                    BreakevenDays: 'NA',
                    PurchaseCost: 'Na',
                    WarehouseCost: 'NA',
                    LaundryCost: 'NA',
                    TotalCost: 'NA'
                };
            } else if ($scope.FormData.QuoteTypeID == 3) {
                return {
                    ID: 0,
                    CostOfLinen: 'NA',
                    ProductName: '',
                    VariantName: '',
                    VariantID: 0,
                    ProductID: 0,
                    TotalQuantity: 'NA',
                    BillableQty: 'NA',
                    Qty: 0,
                    LinenCostPerUse: 'NA',
                    TechCostPerUse: 'NA',
                    DeliveryCostPerUse: 'NA', 
                    PriceToCustomer: 0,
                    EstBillingPerDay: 'NA',
                    BreakevenDays: 'NA',
                    PurchaseCost: 0,
                    WarehouseCost: 'NA',
                    LaundryCost: 0,
                    TotalCost: 'NA'
                };
            } else {
                return { 
                    ID: 0,
                    CostOfLinen: 0,
                    ProductName: '',
                    VariantName: '',
                    VariantID: 0,
                    ProductID: 0,
                    TotalQuantity: 0,
                    BillableQty: 0,
                    Qty: 0,
                    LinenCostPerUse: 0,
                    TechCostPerUse: 0,
                    DeliveryCostPerUse: 0, 
                    PriceToCustomer: 0,
                    EstBillingPerDay: 0,
                    BreakevenDays: 0,
                    WarehouseCost: 0
                };
            }

        }

        function loadRelationalData(ID) {
            loadGenerateQuote(ID);
        }

        $scope.GenerateQuoteID = 0;
       
        if ($state.params != null && $state.params.GenerateQuoteID != null && $state.params.GenerateQuoteID > 0)
            $scope.GenerateQuoteID = $state.params.GenerateQuoteID;
        
        if ($scope.GenerateQuoteID > 0) {
        $scope.AddPage = false;
            $timeout(function() {
                loadRelationalData($scope.GenerateQuoteID);
            }, 1000);
        }
        $scope.ShowGenerateQuote = true;

        /**
         * @name loadGenerateQuote
         * @desc Called to load generate quote
         * @memberOf Controllers.GenerateQuoteCtrl
         */
                $scope.disable = false;
            function loadGenerateQuote(ID) {
                $scope.visible = false;
            if ($state.params.Prospect == 'view'){
                $scope.disable = true;
                $scope.ShowGenerateQuote = false;
            }
            // $scope.ContactInfo.ContactForRef = $scope.CustomerID;
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getDataByID',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        console.log(Res['D']);
                        $scope.FormData = Res['D'];
                        if ($scope.FormData.CustomerID == 0) {
                            $scope.ShowCustomerName = true;
                            $scope.ShowCustomerID = false;
                            $scope.ShowConvertCustBtn = true;
                        } else {
                            $scope.ShowCustomerID = true;
                            $scope.ShowCustomerName = false;
                            $scope.ShowConvertCustBtn = false;
                        }
                        $scope.FormData.QuoteItems = Res['D']['QuoteItems'];  
                        console.log($scope.FormData.QuoteItems);
                        $timeout(function() {
                            $('#country').val(Res['D'].HOCountryID).trigger('change.select2');
                            $('#city').val(Res['D'].HOCityID).trigger('change.select2');
                            $('#customer-type').val(Res['D'].CustomerTypeID).trigger('change.select2');
                            $('#quote-type').val(Res['D'].QuoteTypeID).trigger('change.select2');
                            $('#sales-person-name').val(Res['D'].SPName).trigger('change.select2');
                            $('#customer-id').val(Res['D'].CustomerID).trigger('change.select2');
                        }, 1000);
                           
                        $scope.$apply();
                    }
                }
            });
        }

        function loadSalePersonDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getSalesPerson',
                },
                success: function(Res) {
                    $scope.SalesPersonNameList = Res['D'];
                }
            });
        } 

        function loadcustomerDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getAllData',
                },
                success: function(Res) {
                    $scope.CustomerList = Res['D'];
                }
            });
        }

        function loadCustomerTypeDropdown() {            
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerType/getAllData'
                },
                success: function(Res) {
                    $scope.CustomerTypeList = Res['D'];
                }
            });
        }

        function loadQuoteTypeDropdown() {            
            Ajax({
                data: {
                    EndPoint: 'Masters/QuoteType/getAllData'
                },
                success: function(Res) {
                    $scope.QuoteTypeList = Res['D'];
                }
            });
        }

        function loadCategoryDropdown() {            
            Ajax({
                data: {
                    EndPoint: 'Masters/Category/getAllData'
                },
                success: function(Res) {
                    $scope.CategoryList = Res['D'];
                }
            });
        }

        function loadCountryDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/getAllData'
                },
                success: function(Res) {
                    $scope.CountryList = Res['D'];
                }
            });
        }

        function loadCityDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/City/getAllData'
                },
                success: function(Res) {
                    $scope.CityList = Res['D'];
                }
            });
        } 

        function loadProductDropdown(CategoryID) {
            $scope.VariantList = [];
            Ajax({
                data: {
                    EndPoint: 'Masters/Product/getProductByCategoryID',
                    CategoryID: CategoryID
                },
                success: function(Res) {
                    $scope.ProductList = Res['D'];

                    $scope.SubFormData.ProductID = 0;
                    $scope.SubFormData.VariantID = 0;
                    $("#product").val('').trigger('change.select2');
                    $("#variant").val('').trigger('change.select2');

                    $scope.$apply();
                }
            });
        }

        function loadVariantDropdown(ProductID) {
            Ajax({
                data: {
                    EndPoint: 'Masters/ProductVariant/getVariantByProductID',
                    ProductID: ProductID
                },
                success: function(Res) {
                    $scope.SubFormData.VariantID = 0;
                    $("#variant").val('').trigger('change.select2');
                    
                    $scope.VariantList = Res['D'];

                    $scope.$apply();
                }
            });
        }

        function loadPricing(ProductID, VariantID) {
            Ajax({
                data: {
                    EndPoint: 'Settings/ProductPricing/getProductVariantByPVID',
                    ProductID: ProductID,
                    VariantID: VariantID
                },
                success: function(Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.SubFormData.CostOfLinen = parseFloat(Res['D']['TCLinen']);
                        $scope.SubFormData.LaundryCost = parseFloat(Res['D']['WCLinen']);
                        $scope.SubFormData.ProductName = Res['D']['ProductName'];
                        $scope.SubFormData.VariantName = Res['D']['VariantName'];

                        $scope.$apply();
                    }
                }
            });
        }

        function onCustomerTypeChange() {
            if ($('#customer-type').select2('data')['0'] != undefined) {
            var ID = $('#customer-type').select2('data')[0].id;
                angular.forEach($scope.CustomerTypeList, function(value, key) {
                    if (value.ID == ID) {
                        $scope.CustomerType = value.CustomerType;
                    }
                });
            }
        } 

        function onQuoteTypeChange() {
            if ($('#quote-type').select2('data')['0'] != undefined) {
            var ID = $('#quote-type').select2('data')[0].id;   
                angular.forEach($scope.QuoteTypeList, function(value, key) {
                    if (value.ID == ID) {
                        $scope.QuoteType = value.QuoteType;
                    }
                });
            }
        }

        function onCategoryChange(ID) {
            loadProductDropdown(ID);        
        }

        function onCustomerChange(ID) {
            Ajax({
                data: {
                    EndPoint: 'Manage/PriceCalculator/getCustomerInfo',
                    ID: ID
                },
                success: function(Res) {
                    if (Res['S']) {
                        console.log(Res);
                        $scope.FormData.CustomerTypeID = Res['D'].CustomerTypeID;
                        $scope.FormData.POBox = Res['D'].Zip;
                        $scope.FormData.HOPhone = Res['D'].LandlineNumber;
                        $scope.FormData.HOCity = Res['D'].CityID;
                        $scope.FormData.HOCountry = Res['D'].CountryID;
                        $scope.FormData.HOLocation = Res['D'].LocationCount;
                        // $scope.FormData.ACName = Res['D'].FirstName;
                        // $scope.FormData.ACPhone = Res['D'].Phone;
                        // $scope.FormData.ACEmail = Res['D'].EmailID;
                        // $scope.FormData.BCName = Res['D'].BDFirstName;
                        // $scope.FormData.BCPhone = Res['D'].BDPhone;
                        // $scope.FormData.BCEmail = Res['D'].BDEmailID;
                        $('#country').val(Res['D'].CountryID).trigger('change.select2');
                        $('#city').val(Res['D'].CityID).trigger('change.select2'); 
                        $('#customer-type').val(Res['D'].CustomerTypeID).trigger('change.select2');
                    }
                    $scope.$apply();
                }
            });
        }

        function onProductChange(ProductID) {
            loadVariantDropdown(ProductID);
        }

        function onVariantChange(ProductID, VariantID) {
            loadPricing(ProductID, VariantID);
        }

        // function removeItem($index) {
        //     $scope.FormData.QuoteItems.splice($index, 1);
        //     aggregatedValue();
        //     window.alert("Are you sure do you want to delete the selection?");
        // }

        function removeItem($index) {
            console.log($index);
            $rootScope.DelConfirmBox('OnClickQuoteDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickQuoteDeleteConfirmBoxOk', function($index, event, obj) {
            $scope.FormData.QuoteItems.splice($index, 1);
            aggregatedValue();
        });

        function calculateTotalQuantity(RoomCount, PARLevelExpected, Qty) {
            return RoomCount * PARLevelExpected * Qty;
        }

        function calculateBillableQty(RoomCount, OccupancyConsidering, Qty) {
            return Math.round(RoomCount * (OccupancyConsidering / 100) * Qty);
        }

        function calculatePurchaseCost(CostOfLinen, TotalQuantity) {
            return CostOfLinen * TotalQuantity;
        }

        function calculateLinenCostPerUse(CostOfLinen, RecoveryWashPeriod, OccupancyConsidering) {
            return CostOfLinen / (RecoveryWashPeriod * (OccupancyConsidering / 100));
        }

        function calculateTotalCost(LinenCostPerUse, TechCostPerUse, DeliveryCostPerUse, WarehouseCost, LaundryCost) {
            return LinenCostPerUse + TechCostPerUse + DeliveryCostPerUse + WarehouseCost + LaundryCost;
        }

        function calculatePriceToCustomer(TotalCost, PTMargin, LaundryCost, PurchaseCost) {
            if ($scope.FormData.QuoteTypeID == 1) {
                return (LaundryCost / (PTMargin / 100));
            } else if ($scope.FormData.QuoteTypeID == 3) {
                return (PurchaseCost / (PTMargin / 100));
            } else {
                return (TotalCost / (1 - (PTMargin / 100)));
            }
        }

        function calculateEstBillingPerDay(PriceToCustomer, BillableQty) {
            return PriceToCustomer * BillableQty;
        }

        function calculateBreakevenDays(PurchaseCost, EstBillingPerDay, TechCostPerUse, DeliveryCostPerUse, WarehouseCost, LaundryCost, BillableQty) {
            return Math.round(PurchaseCost / (EstBillingPerDay - (TechCostPerUse + DeliveryCostPerUse + WarehouseCost + LaundryCost) * BillableQty));
        }

        function addItem() {
            if ($scope.FrmPriceCalculator.$valid && $scope.SubFormData.VariantID > 0 && $scope.SubFormData.Qty > 0) {
                $scope.SubFormData.TotalQuantity = calculateTotalQuantity($scope.FormData.RoomCount, $scope.FormData.PARLevelExpected, $scope.SubFormData.Qty);
                $scope.SubFormData.BillableQty = calculateBillableQty($scope.FormData.RoomCount, $scope.FormData.OccupancyConsidering, $scope.SubFormData.Qty);
                
                $scope.SubFormData.PurchaseCost = calculatePurchaseCost($scope.SubFormData.CostOfLinen, $scope.SubFormData.TotalQuantity);
                $scope.SubFormData.LinenCostPerUse = calculateLinenCostPerUse($scope.SubFormData.CostOfLinen, $scope.RecoveryWashPeriod, $scope.FormData.OccupancyConsidering);
                $scope.SubFormData.TechCostPerUse = 0.00;
                $scope.SubFormData.DeliveryCostPerUse = 0.00;
                $scope.SubFormData.WarehouseCost = 0.00;

                $scope.SubFormData.TotalCost = calculateTotalCost($scope.SubFormData.LinenCostPerUse, $scope.SubFormData.TechCostPerUse, $scope.SubFormData.DeliveryCostPerUse, 0, $scope.SubFormData.LaundryCost);
                $scope.SubFormData.PriceToCustomer = calculatePriceToCustomer($scope.SubFormData.TotalCost, $scope.FormData.PTMargin, $scope.SubFormData.LaundryCost, $scope.SubFormData.PurchaseCost);
                $scope.SubFormData.EstBillingPerDay = calculateEstBillingPerDay($scope.SubFormData.PriceToCustomer, $scope.SubFormData.BillableQty);
                
                $scope.SubFormData.BreakevenDays = calculateBreakevenDays($scope.SubFormData.PurchaseCost, $scope.SubFormData.EstBillingPerDay, $scope.SubFormData.TechCostPerUse, $scope.SubFormData.DeliveryCostPerUse, 0, $scope.SubFormData.LaundryCost, $scope.SubFormData.BillableQty);
                
                //$scope.TechCostPerDay

                $scope.FormData.QuoteItems.unshift(angular.copy($scope.SubFormData));

                $scope.SubFormData = angular.copy(defaultSubFormData());
                $("#variant").val('').trigger('change.select2');
                $("#product").val('').trigger('change.select2');
                aggregatedValue();
            }
        };

        function aggregatedValue() {
            var TotalQtyPurchased = 0;
            var TotalPurchaseCost = 0;
            $scope.FormData.QuoteItems.forEach(function(X) {
                TotalQtyPurchased += X.TotalQuantity;
                TotalPurchaseCost += X.PurchaseCost;
            });
            $scope.FormData.TotalQtyPurchased = TotalQtyPurchased;
            $scope.FormData.TotalPurchaseCost = TotalPurchaseCost;
        }

        $scope.OnRoomCountChange = function() {
            regenerateQuoteDetails();
        };

        function regenerateQuoteDetails() {
            $scope.FormData.QuoteItems.forEach(function(X, I) {
                $scope.FormData.QuoteItems[I].TotalQuantity = calculateTotalQuantity($scope.FormData.RoomCount, $scope.FormData.PARLevelExpected, $scope.FormData.QuoteItems[I].Qty);
                $scope.FormData.QuoteItems[I].BillableQty = calculateBillableQty($scope.FormData.RoomCount, $scope.FormData.OccupancyConsidering, $scope.FormData.QuoteItems[I].Qty);

                $scope.FormData.QuoteItems[I].PurchaseCost = calculatePurchaseCost($scope.FormData.QuoteItems[I].CostOfLinen, $scope.FormData.QuoteItems[I].TotalQuantity);
                $scope.FormData.QuoteItems[I].LinenCostPerUse = calculateLinenCostPerUse($scope.FormData.QuoteItems[I].CostOfLinen, $scope.RecoveryWashPeriod, $scope.FormData.OccupancyConsidering);
            
                $scope.FormData.QuoteItems[I].TotalCost = calculateTotalCost($scope.FormData.QuoteItems[I].LinenCostPerUse, $scope.FormData.QuoteItems[I].TechCostPerUse, $scope.FormData.QuoteItems[I].DeliveryCostPerUse, 0, $scope.FormData.QuoteItems[I].LaundryCost);
                $scope.FormData.QuoteItems[I].PriceToCustomer = calculatePriceToCustomer($scope.FormData.QuoteItems[I].TotalCost, $scope.FormData.PTMargin);
                $scope.FormData.QuoteItems[I].EstBillingPerDay = calculateEstBillingPerDay($scope.FormData.QuoteItems[I].PriceToCustomer, $scope.FormData.QuoteItems[I].BillableQty);
                
                $scope.FormData.QuoteItems[I].BreakevenDays = calculateBreakevenDays($scope.FormData.QuoteItems[I].PurchaseCost, $scope.FormData.QuoteItems[I].EstBillingPerDay, $scope.FormData.QuoteItems[I].TechCostPerUse, $scope.FormData.QuoteItems[I].DeliveryCostPerUse, 0, $scope.FormData.QuoteItems[I].LaundryCost, $scope.FormData.QuoteItems[I].BillableQty);
            });
            aggregatedValue();
        }

        $scope.OnPARLevelChange = function() {
            regenerateQuoteDetails();
        };

        $scope.OnOccupancyChange = function() {
            regenerateQuoteDetails();
        };

        $scope.OnMarginChange = function() {
            regenerateQuoteDetails();
        };

        function inputMask() {
            $("#HOPhoneNo").inputmask("mask", {mask:"(999) 999-9999"})
            $("#BOPhoneNo").inputmask("mask", {mask:"(999) 999-9999"})
            $("#ACPhoneNo").inputmask("mask", {mask:"(999) 999-9999"})
        }
        inputMask();

        $scope.visible=true;
        $scope.FormSubmit = function(isValid) {
        if (isValid && $scope.FormData.QuoteItems && $scope.FormData.QuoteItems.length) {
            $scope.visible=false;
            Ajax({
                data: {
                EndPoint: 'Manage/PriceCalculator/generateQuote',
                CapturedData: $scope.FormData,
                QuoteItems: $scope.FormData.QuoteItems
                },
                success: function(res) {
                    if (res['S'] && res['D'] != null && res['D'] != '') {
                        var Link    = document.createElement("a");    
                        Link.href   = res['D'];
                        Link.style  = "visibility:hidden";
                        Link.target = '_blank';
                        //Link.download   = DownloadName;
                        document.body.appendChild(Link);
                        Link.click();
                        document.body.removeChild(Link);
                    
                        $scope.GenerateQuoteID = res['D'];

                        $scope.QuoteGenerationID = res['S']['D']['D'];

                        if ($scope.AddPage)
                            loadRelationalData($scope.GenerateQuoteID);
                        }
                    }
                });
            } else
                alert('At least the mandatory fields should be filled!');
        };

        /**
         * @name ConvertCustomer
         * @desc Called on click of Convert Customer
         * @memberOf Controllers.GenerateQuote
         */
        function ConvertCustomer() {
            Ajax({
                data: {
                EndPoint: 'Manage/PriceCalculator/CovertCustomer',
                CapturedData: $scope.FormData, 
                QuoteGenerationID: $scope.QuoteGenerationID
                },
                success: function(Res) {
                    if (Res['S']) {
                        $scope.QuoteGenerationID = Res['D'];

                        $scope.FormData = Res['D'];

                        $location.url('/customer/edit-details/' + Res['D'] + '/edit');
                    } else {
                        window.alert("Customer Already Exist!");
                    }
                    $scope.$apply();
                }
            });
        }

        /**
         * @name backToManagmentPage
         * @desc Called on click of back button
         * @memberOf Controllers.GenerateQuote
         */
        function backToManagmentPage() {
            $location.url('/sales/generate-quote-management');
        }

        $scope.cancel = function() {
            $scope.FormData = angular.copy(defaultData());
            $scope.FrmPriceCalculator.$submitted = false;
            $scope.FrmPriceCalculator.$setPristine();
            $scope.FrmPriceCalculator.$setUntouched();
            
            $scope.SubFormData = angular.copy(defaultSubFormData());

            $("#customer-type").val('').trigger('change');
            $("#quote-type").val('').trigger('change');

            $("#product").val('').trigger('change.select2');
            $("#variant").val('').trigger('change.select2');
            $("#country").val('').trigger('change.select2');
            $("#city").val('').trigger('change.select2');
            $("#sales-person-name").val('').trigger('change.select2');
            $("#customer-id").val('').trigger('change.select2');
            $scope.$apply();
        };
    }

    GenerateQuote.$inject = ['$rootScope', '$scope', '$timeout', '$location', '$state'];
})();
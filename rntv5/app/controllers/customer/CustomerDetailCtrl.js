/**
 * Customer Detail Controller
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular.module('RAT').controller('CustomerDetail', CustomerDetail);

    /**
     * @namespace CustomerDetail
     * @desc Customer Detail Controller
     * @memberOf Controllers
     */
    function CustomerDetail($rootScope, $state, $scope, $location, $timeout, DataTableS, FilePicker, $log, $filter, $anchorScroll) {
        var oTable;
        var oCCTable;
        var oCBTable;
        var oCSTable;
        var oCContTable;
        var oCLTable;
        var oALTable;

        $scope.$on('$viewContentLoaded', function () {
            loadCustomerTypeDropdown();
            loadLaundryIDDropdown();
            loadCustomerDropdown();
            loadProspectcDropdown();
            loadCountryDropdown();
            loadCityDropdown();
            loadCurrencyDropdown();
            loadContractTypeDropdown();
            loadInvoicingFrequencyDropdown();
            loadAccountManagerDropdown();
        });
        $scope.CustomerLogo = null;
        $scope.CustomerContract = { Contract: null, TradeLicenseUpload: null, TaxCertificate: null };

        $scope.CustomerTypeList = [];
        $scope.LaundryIDList = [];
        $scope.CustomerList = [];
        $scope.ProspectList = [];
        $scope.CityList = [];
        $scope.CountryList = [];
        $scope.LocationList = [];
        $scope.CurrencyList = [];
        $scope.ContractTypeList = [];
        $scope.InvoicingFrequencyList = [];
        $scope.AccountManagerList = [];
        $scope.CustomerContactArr = [];
        $scope.CustomerContractArr = [];
        $scope.CustomerLocationArr = [];
        $scope.CustomerBillingArr = [];
        $scope.CustomerShippingArr = [];
        $scope.CustomerLaundryArr = [];

        $scope.BasicDetail = {};
        $scope.FormCustomerType = {};
        $scope.ContactInfo = {};
        $scope.FormContactInfo = {};
        $scope.BillingInfo = {};
        $scope.FormBillingInfo = {};
        $scope.ShippingInfo = {};
        $scope.FormShippingInfo = {};
        $scope.FormAssignLaundry = {};
        $scope.ContractInfo = {};
        $scope.SpecialNotes = {};
        $scope.AssignLaundry = {};
        $scope.LocationInfo = {};

        $scope.CDShowErrorMsg = false;
        $scope.BIShowErrorMsg = false;
        $scope.SIShowErrorMsg = false;
        $scope.CIShowErrorMsg = false;
        $scope.ChangesSaved = true;
        $scope.AddPage = true;

        $scope.CDErrorMsg = '';
        $scope.BIErrorMsg = '';
        $scope.SIErrorMsg = '';
        $scope.CIErrorMsg = '';

        $scope.StarList = [
            { ID: '', Star: '--Select--' },
            { ID: 1, Star: '1' },
            { ID: 2, Star: '2' },
            { ID: 3, Star: '3' },
            { ID: 4, Star: '4' },
            { ID: 5, Star: '5' },
            { ID: 6, Star: '6' },
            { ID: 7, Star: '7' },
        ];

        $scope.AverageOccupancyRateList = [
            { ID: '', AverageOccupancyRate: '--Select--' },
            { ID: 50, AverageOccupancyRate: '50%' },
            { ID: 60, AverageOccupancyRate: '60%' },
            { ID: 70, AverageOccupancyRate: '70%' },
            { ID: 80, AverageOccupancyRate: '80%' },
            { ID: 90, AverageOccupancyRate: '90%' },
            { ID: 100, AverageOccupancyRate: '100%' },
        ];

        $scope.PaymentTermsList = [
            { ID: '', PaymentTerms: '--Select--' },
            { ID: 7, PaymentTerms: '7' },
            { ID: 14, PaymentTerms: '14' },
            { ID: 21, PaymentTerms: '21' },
            { ID: 28, PaymentTerms: '28' },
            { ID: 35, PaymentTerms: '35' },
            { ID: 42, PaymentTerms: '42' },
            { ID: 49, PaymentTerms: '49' },
            { ID: 56, PaymentTerms: '56' },
            { ID: 63, PaymentTerms: '63' },
            { ID: 70, PaymentTerms: '70' },
            { ID: 77, PaymentTerms: '77' },
            { ID: 84, PaymentTerms: '84' },
            { ID: 91, PaymentTerms: '91' },
        ];

        $scope.LogisticsList = [
            { ID: '', Logistics: '--Select--' },
            { ID: 1, Logistics: 'By Laundry' },
            { ID: 2, Logistics: 'By RNT' },
            { ID: 3, Logistics: 'By Third Party' }
        ];

        $scope.AdvanceList = [
            { ID: '', Advance: '--Select--' },
            { ID: 1, Advance: 'Yes' },
            { ID: 2, Advance: 'No' }
        ];

        $scope.LogisticsList = [
            { ID: '', Logistics: '--Select--' },
            { ID: 1, Logistics: 'By laundry' },
            { ID: 2, Logistics: 'By RNT' },
            { ID: 3, Logistics: 'Third Party' }
        ];

        $scope.CustomerID = 0;
        var ID = $scope.CustomerID;
        $scope.CCSendInviteLabel = 'Send Invite';
        $scope.BISendInviteLabel = 'Send Invite';
        $scope.SISendInviteLabel = 'Send Invite';

        $scope.filterValue = function ($event) {
            if (isNaN(String.fromCharCode($event.keyCode))) {
                $event.preventDefault();
            }
        };
        $scope.paste = function (e) {
            e.preventDefault();
            return false
        }

        if ($state.params != null && $state.params.CustomerID != null && $state.params.CustomerID > 0)
            $scope.CustomerID = $state.params.CustomerID;
            
            //console.log($state.params.CustDetail)
        if ($scope.CustomerID > 0) {
            $scope.AddPage = false;
            loadCustomerDetail($scope.CustomerID);
            loadContractInfo($scope.CustomerID);
            loadBillOfMaterial($scope.CustomerID);
            loadLaundryInfo($scope.CustomerID);
            loadSpecialNotes($scope.CustomerID);
            $timeout(function () {
                loadRelationalData($scope.CustomerID);
            }, 1000);
        }
        $scope.locationCount =[];
        $scope.saveCustomerDetail = saveCustomerDetail;
        $scope.saveCustomerContact = saveCustomerContact;
        $scope.saveCustomerLocation = saveCustomerLocation;
        $scope.saveLaundry = saveLaundry;
        $scope.saveBillingDetail = saveBillingDetail;
        $scope.saveShippingDetail = saveShippingDetail;
        $scope.initLogoPicker = initLogoPicker;
        $scope.initContractUpload = initContractUpload;
        $scope.initTradeLicense = initTradeLicense;
        $scope.InputMask = InputMask;
        $scope.reminder = reminder;
        $scope.initTaxCertificate = initTaxCertificate;
        $scope.clearCustomerContact = clearCustomerContact;
        $scope.clearCustomerLocation = clearCustomerLocation;
        $scope.ClearCustomerDetails = ClearCustomerDetails;
        $scope.clearBillingDetail = clearBillingDetail;
        $scope.clearShippingDetail = clearShippingDetail;
        $scope.ClearLaundry = ClearLaundry;
        $scope.clearBasicDetail = clearBasicDetail;
        $scope.saveContractInfo = saveContractInfo;
        // $scope.saveLaundry = saveLaundry;
        $scope.saveSpecialNotes = saveSpecialNotes;
        $scope.clearContractInfo = clearContractInfo;
        $scope.backToManagmentPage = backToManagmentPage;
        $scope.onSelectedQuoteVersion = onSelectedQuoteVersion;
        $scope.onAllQuoteVersion = onAllQuoteVersion;
        $scope.onGetLocation = onGetLocation;

        function initLogoPicker() {
            FilePicker.imageSelector('#customer-logo-ctrl', function (image) {
                $scope.CustomerLogo = { Logo: image };
            }, function () {
                $scope.CustomerLogo = null;
            });
        }
        $scope.enableContract = true;
            function initContractUpload() {

                FilePicker.fileSelector('#contract-upload-ctrl', function (file) {
                    $scope.CustomerContract.Contract = file;
                    $scope.enableContract = false;
                    $scope.$apply();
                }, function () {
                    $scope.CustomerContract.Contract = null;
                    $scope.enableContract = true;
                });
                if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '') {
                    FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
                } 

        }
        
        function initTradeLicense() {
            FilePicker.fileSelector('#trade-license-ctrl', function (file) {
                $scope.CustomerContract.TradeLicenseUpload = file;
                $scope.ContractInfo.RMTradeLicense = 'N';
            }, function () {
                $scope.CustomerContract.TradeLicenseUpload = null;
                $scope.ContractInfo.RMTradeLicense = 'Y';
            });
            if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
                FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
        }
        function initTaxCertificate() {
            FilePicker.fileSelector('#tax-certificate-ctrl', function (file) {
                $scope.CustomerContract.TaxCertificate = file;
                $scope.ContractInfo.RMTaxCertificate = 'N';
            }, function () {
                $scope.CustomerContract.TaxCertificate = null;
                $scope.ContractInfo.RMTaxCertificate = 'Y';
            });
            if ($scope.ContractInfo.TaxCertificateUpload != null && $scope.ContractInfo.TaxCertificateUpload != '')
                FilePicker.displayFileName('#tax-certificate-ctrl', $scope.ContractInfo.TaxCertificateUpload);
        }

        function setFileNames() {
            if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '') 
                FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
                //console.log("hello");
                // $scope.enableContract = false;
            if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
                FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
            if ($scope.ContractInfo.TaxCertificateUpload != null && $scope.ContractInfo.TaxCertificateUpload != '')
                FilePicker.displayFileName('#tax-certificate-ctrl', $scope.ContractInfo.TaxCertificateUpload);
        }

        function InputMask() {
            $timeout(function () {
                $('#calendar').click(function () {
                    $("#ContractSignedDate").datepicker({ format: 'dd M yyyy', }).focus();
                });

                $('#start-date').click(function () {
                    $("#delivery-start-date").datepicker({ format: 'dd M yyyy', }).focus();
                });
                $('#end-date').click(function () {
                    $("#delivery-end-date").datepicker({ format: 'dd M yyyy', }).focus();
                });
                $('#laundry-start').click(function () {
                    $("#LaundryStart").datepicker({ format: 'dd M yyyy', }).focus();
                });
                $('#laundry-end').click(function () {
                    $("#LaundryEnd").datepicker({ format: 'dd M yyyy', }).focus();
                });
                $('#reminder1').click(function () {
                    $("#RenewalReminder1Date").datepicker({ format: 'dd M yyyy', }).focus();
                });
                $('#reminder2').click(function () {
                    $("#RenewalReminder2Date").datepicker({ format: 'dd M yyyy', }).focus();
                });
                $('#reminder3').click(function () {
                    $("#RenewalReminder3Date").datepicker({ format: 'dd M yyyy', }).focus();
                });

            }, 700)
        }
        $scope.InputMask();

        $scope.ContractError = false;
        function reminder() {
            $timeout(function () {
                var myDate = new Date($scope.ContractInfo.DeliveryEndDate);
                var myDate1 = new Date($scope.ContractInfo.DeliveryStartDate);
                    if(myDate < myDate1) {
                        $scope.ContractError = true;
                    } else {
                        $scope.ContractError = false;
                     }
                var monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var day2 = 2; var day15 = 15; var day30 = 30;
                var newDate2 = new Date(myDate - day2 * 24 * 60 * 60 * 1000);
                var newDate15 = new Date(myDate - day15 * 24 * 60 * 60 * 1000);
                var newDate30 = new Date(myDate - day30 * 24 * 60 * 60 * 1000);
                var dd2 = newDate2.getDate().toString();
                var dd15 = newDate15.getDate().toString();
                var dd30 = newDate30.getDate().toString();
                var M2 = monthNames[(newDate2.getMonth() + 1).toString()];
                var M15 = monthNames[(newDate15.getMonth() + 1).toString()];
                var M30 = monthNames[(newDate30.getMonth() + 1).toString()];
                var yyyy2 = newDate2.getFullYear().toString();
                var yyyy15 = newDate15.getFullYear().toString();
                var yyyy30 = newDate30.getFullYear().toString();
                $scope.ContractInfo.RenewalReminder3Date = (dd2[1] ? dd2 : "0" + dd2[0]) + ' ' + (M2[1] ? M2 : "0" + M2[0]) + ' ' + yyyy2;
                $scope.ContractInfo.RenewalReminder2Date = (dd15[1] ? dd15 : "0" + dd15[0]) + ' ' + (M15[1] ? M15 : "0" + M15[0]) + ' ' + yyyy15;
                $scope.ContractInfo.RenewalReminder1Date = (dd30[1] ? dd30 : "0" + dd30[0]) + ' ' + (M30[1] ? M30 : "0" + M30[0]) + ' ' + yyyy30;
            }, 700);
            // $scope.$apply();
        }

        $scope.displayEmail = function (ID) {
            angular.forEach($scope.AccountManagerList, function (value) {
                if (value.ID == ID)
                    $('#display-email').html(value.EmailID);
            });
        }

        $scope.onLocationChange = function (ID) {
            $scope.formhide = true;
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#spacing').html("Location : ");
                    $('#coma1').html(",");
                    $('#coma2').html(",");
                    $('#coma3').html(",");
                    $('#coma4').html(",");
                    $('#coma5').html(",");
                    $('#coma6').html(",");
                if (value.ID == ID)
                    $('#location-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#location-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#location-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#location-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#location-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#location-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#location-zip').html(value.LocationPhone);
            });
        }

        $scope.onBLocationChange = function (ID) {
            $scope.Locationshow = true;
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#bspacing').html("Location : ");
                    $('#bcoma1').html(",");
                    $('#bcoma2').html(",");
                    $('#bcoma3').html(",");
                    $('#bcoma4').html(",");
                    $('#bcoma5').html(",");
                    $('#bcoma6').html(",");
                if (value.ID == ID)
                    $('#blocation-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#blocation-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#blocation-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#blocation-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#blocation-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#blocation-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#blocation-zip').html(value.LocationPhone);
            });
        }

        $scope.onSLocationChange = function (ID) {
            $scope.locationform = true;
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#sspacing').html("Location : ");
                    $('#scoma1').html(",");
                    $('#scoma2').html(",");
                    $('#scoma3').html(",");
                    $('#scoma4').html(",");
                    $('#scoma5').html(",");
                    $('#scoma6').html(",");
                if (value.ID == ID)
                    $('#slocation-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#slocation-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#slocation-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#slocation-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#slocation-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#slocation-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#slocation-zip').html(value.LocationPhone);
            });
        }

        $scope.onCCLocationChange = function (ID) {
            $scope.formhiding = true;
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#cc-spacing').html("Location : ");
                    $('#cc-coma1').html(",");
                    $('#cc-coma2').html(",");
                    $('#cc-coma3').html(",");
                    $('#cc-coma4').html(",");
                    $('#cc-coma5').html(",");
                    $('#cc-coma6').html(",");
                if (value.ID == ID)
                    $('#cc-location-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#cc-location-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#cc-location-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#cc-location-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#cc-location-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#cc-location-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#cc-location-zip').html(value.LocationPhone);
            });
        }

        $scope.onLHLocationChange = function (ID) {
            $scope.laundryhide = true;
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#lh-spacing').html("Location : ");
                    $('#lh-coma1').html(",");
                    $('#lh-coma2').html(",");
                    $('#lh-coma3').html(",");
                    $('#lh-coma4').html(",");
                    $('#lh-coma5').html(",");
                    $('#lh-coma6').html(",");
                if (value.ID == ID)
                    $('#lh-location-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#lh-location-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#lh-location-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#lh-location-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#lh-location-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#lh-location-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#lh-location-zip').html(value.LocationPhone);
            });
        }

        $scope.onSPLLocationChange = function (ID) {
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#spl-spacing').html("Location : ");
                    $('#spl-coma1').html(",");
                    $('#spl-coma2').html(",");
                    $('#spl-coma3').html(",");
                    $('#spl-coma4').html(",");
                    $('#spl-coma5').html(",");
                    $('#spl-coma6').html(",");
                if (value.ID == ID)
                    $('#spl-location-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#spl-location-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#spl-location-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#spl-location-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#spl-location-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#spl-location-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#spl-location-zip').html(value.LocationPhone);
            });
        }

        $scope.onBOMLocationChange = function (ID) {
            $scope.formhide = true;
            angular.forEach($scope.LocationList, function (value) {
                if (value.ID == ID)
                    $('#bom-spacing').html("Location : ");
                    $('#bom-coma1').html(",");
                    $('#bom-coma2').html(",");
                    $('#bom-coma3').html(",");
                    $('#bom-coma4').html(",");
                    $('#bom-coma5').html(",");
                    $('#bom-coma6').html(",");
                if (value.ID == ID)
                    $('#bom-location-name').html(value.LocationName);
                if (value.ID == ID)
                    $('#bom-location-address').html(value.LocationAddress);
                if (value.ID == ID)
                    $('#bom-location-city').html(value.LocationCity);
                if (value.ID == ID)
                    $('#bom-location-state').html(value.LocationState);
                if (value.ID == ID)
                    $('#bom-location-country').html(value.LocationZipcode);
                if (value.ID == ID)
                    $('#bom-location-phone').html(value.LocationCountry);
                if (value.ID == ID)
                    $('#bom-location-zip').html(value.LocationPhone);
            });
        }

        
        $scope.showAssignLaundry = function() {
            $('#assignLaundry').modal('show');
        }
        $scope.showBasicDetails = function() {
            $('#basicDetails').modal('show');
        }
        $scope.showBilling = function() {
            $('#billingInfo').modal('show');
        }
        $scope.showCantact = function() {
            $('#contactInfo').modal('show');
        }
        $scope.showCantract = function() {
            $('#contractInfo').modal('show');
        }
        $scope.locationInfo = function() {
            $('#locationInfo').modal('show');
        }
        $scope.shippingInfo = function() {
            $('#shippingInfo').modal('show');
        }
        $scope.specialNotes = function() {
            $('#specialNoties').modal('show');
        }
        function loadRelationalData(ID) {
            loadCustomerContacts(ID);
            loadCustomerLocation(ID);
            loadBillingDetails(ID);
            loadShippingDetails(ID);
            loadAllQuoteVersionDropdown(ID);
            loadSelectedQuoteVersionDropdown(ID);
            loadCCLocationDropdown(ID);

        }

        $scope.showtext = function () {
            var text = document.getElementById("txtarea");
            var showarea = document.getElementById("adduserdata");
            showarea.innerHTML = text.value;
        }
        $scope.onListingChange = function () {
            if ($scope.BasicDetail.ContractTypeID == 'ContractAll')
                $location.url('/customer/customer-management');
        }

        $scope.LocationError = false;
        $scope.Calculate = function () {
            if (parseInt($("#contractlocation").val()) > parseInt($("#nooflocation").val()))
                $scope.LocationError = true;
            else
                $scope.LocationError = false;
        }

        $scope.ContractCount = {}
        $scope.CheckTypeValue = function() {
            $scope.ContractCount = {}
            for (var i = 1; i <= $scope.BasicDetail.ContractCount; i++) {
                $scope.ContractCount[i] = i;
            }
        }

        /**
         * @name loadCustomerDetail
         * @desc Called to load customer details
         * @memberOf Controllers.CustomerDetail
         */
        function loadCustomerDetail(ID) {
        $scope.disable = true;
        if($state.params.CustDetail =='view')
            $scope.disable = true;
        if($state.params.CustDetail =='edit')
            $scope.disable = false;
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.BasicDetail = Res['D'];
                        $scope.addLocate = Res['D'].ContractCount;
                        $scope.ContractCount=Res['D'].ContractCount;
                        $timeout(function () {
                            $('#currency').val(Res['D'].Currency).trigger('change.select2');
                            $('#customer-type').val(Res['D'].CustomerTypeID).trigger('change.select2');
                            $('#laundry-id').val(Res['D'].LaundryID).trigger('change.select2');
                            $('#account-manager').val(Res['D'].AccountManager).trigger('change.select2');
                            $scope.displayEmail(Res.D.AccountManager);
                        }, 1000);
                        $scope.$apply();
                        if ($scope.BasicDetail.LogoDisplay != null && $scope.BasicDetail.LogoDisplay != '')
                            FilePicker.displayImage('#customer-logo-ctrl', $scope.BasicDetail.LogoDisplay);
                        $scope.CheckTypeValue();
                    }
                }
            });
        }
        /**
         * @name saveCustomerDetail
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveCustomerDetail(BasicDetail) {
            $scope.BasicDetail.EndPoint = 'Customer/BasicDetail/insertUpdate';
            if (BasicDetail) {
                Ajax({
                    files: $scope.CustomerLogo,
                    data: $scope.BasicDetail,
                    success: function (Res) {
                        if (!Res['S']) {
                            $scope.CDShowErrorMsg = true;
                            $scope.CDErrorMsg = Res['M'];
                        } else {
                            $scope.showBasicDetails();
                            $scope.CustomerID = Res['D'];
                            if ($scope.AddPage)
                                loadRelationalData($scope.CustomerID);
                                // window.alert("Saved successfully!");
                                ClearCustomerDetails();
                        }
                        $scope.$apply();
                    }
                });
            }
        }
        /**
         * @name loadCustomerLocation
         * @desc Called to load customer contacts
         * @memberOf Controllers.CustomerDetail
         */
        function loadCustomerLocation(ID) {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{ orderable: false, targets: [0, 5] }];
            DTProps.fnServerParams = function (aoData) {
                aoData.push(
                    { 'name': 'EndPoint', 'value': 'Customer/LocationInfo/getDataByPage' },
                    { 'name': 'JWT', 'value': $rootScope.gvJWT },
                    { 'name': 'CustomerID', 'value': ID }
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'LocationName' },
                { data: 'LocationCity' },
                { data: 'LocationCountry' },
                { data: 'LocationPhone' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];
            DTProps.rowCallback = function (Row, Data) {
                if($scope.BasicDetail.LocationCount <= $scope.locationCount.length){
                    if($scope.BasicDetail.ContractCount <= $scope.locationCount.length){
                        $scope.locationCount.push(Data.ID);
                        $scope.BasicDetail.ContractCount = $scope.locationCount.length;
                        $scope.BasicDetail.LocationCount = $scope.locationCount.length;
                    }
                }else if($scope.BasicDetail.ContractCount <= $scope.locationCount.length){
                    $scope.locationCount.push(Data.ID);
                    $scope.BasicDetail.ContractCount = $scope.locationCount.length;
                }
                else{
                    $scope.locationCount.push(Data.ID);
                }
                $scope.CustomerLocationArr.push(Data);
                if ($scope.CustomerLocationArr.length != 0) {
                    $timeout(function () {
                        $('#tooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }, 1000);
                }
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(5, Row, Data['ID'], editCustomerLocation);
            };

            $timeout(function () {
                oCLTable = $('#location-details-data-table').DataTable(DTProps);
                DataTableS.checkBoxEvents('#location-details-data-table');
                DataTableS.onDeleteClick('#location-details-data-table', function (RefArr) {
                    deleteCustomerLocation(RefArr);
                });
            }, 1000);
        }
        $scope.locationRow =function(color){
            return {'background-color':'color'};
        }
        /**
         * @name saveCustomerLocation
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveCustomerLocation(FormLocationInfo) {
            $scope.LocationInfo.EndPoint = 'Customer/LocationInfo/insertUpdate';
            $scope.LocationInfo.CreatedBy = $scope.CustomerID;

            if (FormLocationInfo.$valid) {
                Ajax({
                    data: $scope.LocationInfo,
                    success: function (Res) {
                        if (!Res['S']) {
                            $scope.CLShowErrorMsg = true;
                            $scope.CLErrorMsg = Res['M'];
                        } else {
                            $scope.locationInfo();
                            clearCustomerLocation(FormLocationInfo);
                            loadCCLocationDropdown($scope.CustomerID);
                            $scope.CustomerLocationArr = [];
                            $scope.locationCount =[];
                            oCLTable.draw();
                            // window.alert("Saved successfully!");
                        }
                        $scope.$apply();
                    }
                });
            }
        }
        $scope.editLocation = function(ID){
            Ajax({
                data: {
                    EndPoint: 'Customer/LocationInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.LocationInfo = Res['D'];
                        $timeout(function () {
                            $('#country').val(Res['D'].LocationCountry).trigger('change.select2');
                            $('#city').val(Res['D'].LocationCity).trigger('change.select2');
                            $('#location').val(Res['D'].LocationID).trigger('change.select2');
                        }, 1000);
                        $scope.$apply();
                    }
                }
            });

        }
        /**
         * @name editCustomerLocation
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        function editCustomerLocation(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/LocationInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.LocationInfo = Res['D'];
                        $timeout(function () {
                            $('#country').val(Res['D'].LocationCountry).trigger('change.select2');
                            $('#city').val(Res['D'].LocationCity).trigger('change.select2');
                            $('#location').val(Res['D'].LocationID).trigger('change.select2');
                        }, 1000);
                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name deleteCustomerLocation
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        function deleteCustomerLocation(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickLocationInfoDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickLocationInfoDeleteConfirmBoxOk', function (event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Customer/LocationInfo/remove',
                    IDArr: $scope.deleteArray
                },
                success: function (Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.locationCount =[];
                        $scope.CustomerLocationArr =[];
                        oCLTable.draw();
                        $scope.deletelocation();
                        if ($.inArray(parseInt($scope.LocationInfo.ID), $scope.deleteArray) >= 0) {
                            clearCustomerLocation(FormLocationInfo);
                    }
                        DataTableS.resetDelete('#location-details-data-table');
                        $scope.deleteArray = [];
                        $scope.ClearChkbx = false;
                        $scope.$apply();
                    }
                }
            });
        });

        $scope.deletelocation =function(){
            if($scope.CustomerLocationArr.length == 0){
                $('#tooltips').css({
                    "color": "black",
                    "background-color": "#fff",
                    "font-size": "15px",
                    "padding": "6px"
                })
            }}
        /**
         * @name loadCustomerContacts
         * @desc Called to load customer contacts
         * @memberOf Controllers.CustomerDetail
         */
        function loadCustomerContacts(ID) {

            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{ orderable: false, targets: [0, 4] }];
            DTProps.fnServerParams = function (aoData) {
                aoData.push(
                    { 'name': 'EndPoint', 'value': 'Customer/ContactInfo/getDataByPage' },
                    { 'name': 'JWT', 'value': $rootScope.gvJWT },
                    { 'name': 'CustomerID', 'value': ID }
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'Name' },
                { data: 'EmailID' },
                { data: 'LocationID' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];

            DTProps.rowCallback = function (Row, Data) {
                $scope.CustomerContactArr.push(Data);
                if ($scope.CustomerContactArr.length != 0) {
                    $timeout(function () {
                        $('#CItooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }, 500);
                }
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(4, Row, Data['ID'], editCustomerContact);
            };

            $timeout(function () {
                oCCTable = $('#customer-contact-data-table').DataTable(DTProps);
                DataTableS.checkBoxEvents('#customer-contact-data-table');
                DataTableS.onDeleteClick('#customer-contact-data-table', function (RefArr) {
                    deleteCustomerContact(RefArr);
                });
            }, 1000);
        }

        /**
         * @name editCustomerContact
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        $scope.HideInviteContact = false;
        function editCustomerContact(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/ContactInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.ContactInfo = Res['D']
                        if ($scope.ContactInfo.SendInvite == 'N') {
                            $scope.HideInviteContact = false;
                            // $scope.ContactInfo.SendInvite = 'Y';
                            $scope.CCSendInviteLabel = 'Send Invite';
                        } else {
                            $scope.HideInviteContact = false;
                            // $scope.ContactInfo.SendInvite == 'N';
                            // $scope.ContactInfo.SendInvite = '';
                            $scope.CCSendInviteLabel = 'Resend Invite';
                        }
                        $('#location').val(Res['D'].LocationID).trigger('change.select2');
                        $scope.$apply();
                    }
                }
            });
        }
        /**
         * @name deleteCustomerContact
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        function deleteCustomerContact(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickContactInfoDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickContactInfoDeleteConfirmBoxOk', function (event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Customer/ContactInfo/remove',
                    IDArr: $scope.deleteArray
                },
                success: function (Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.CustomerContactArr = [];
                        oCCTable.draw();
                        $scope.deleteContact();
                        // $('#check-all-customer-contact').val('');
                        if ($.inArray(parseInt($scope.ContactInfo.ID), $scope.deleteArray) >= 0) {
                            clearCustomerContact();
                        }
                        DataTableS.resetDelete('#customer-contact-data-table');
                        $scope.deleteArray = [];
                        $scope.ClearChkbx = false;

                        $scope.$apply();
                    }
                }
            });
        });
        $scope.deleteContact = function(){
            if($scope.CustomerContactArr.length == 0){
                $('#CItooltips').css({
                    "color": "black",
                    "background-color": "#fff",
                    "font-size": "15px",
                    "padding": "6px"
                })
            }
        }

        

        /**
         * @name saveCustomerContact
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveCustomerContact(FormContactInfo) {
            $scope.ContactInfo.EndPoint = 'Customer/ContactInfo/insertUpdate';
            $scope.ContactInfo.ContactForRef = $scope.CustomerID;

            if (FormContactInfo.$valid) {
                Ajax({
                    data: $scope.ContactInfo,
                    success: function (Res) {
                        if (!Res['S']) {
                            $scope.CIShowErrorMsg = true;
                            $scope.CIErrorMsg = Res['M'];
                        } else {
                            $scope.showCantact();
                            clearCustomerContact(FormContactInfo);
                            $scope.CustomerContactArr = [];
                            oCCTable.draw();
                        }
                        $scope.$apply();
                    }
                });
            }
        }

        // $scope.Reasonforchange =false;
        function loadLaundryInfo(ID) {
            $scope.Reasonforchange =true;
            // $scope.Reasonforchange =true;
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{ orderable: false, targets: [0, 6] }];
            DTProps.fnServerParams = function (aoData) {
                aoData.push(
                    { 'name': 'EndPoint', 'value': 'Customer/AssignLaundry/getDataByPage' },
                    { 'name': 'JWT', 'value': $rootScope.gvJWT },
                    { 'name': 'CustomerID', 'value': ID }
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'LocationID' },
                { data: 'LaundryID' },
                { data: 'Logistics' },
                { data: 'DeliveryStartDate' },
                { data: 'DeliveryEndDate' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];
            DTProps.rowCallback = function (Row, Data) {
                $scope.CustomerLaundryArr.push(Data);
                if ($scope.CustomerLaundryArr.length != 0) {
                    $timeout(function () {
                        $('#LHtooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }, 500);
                }
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(6, Row, Data['ID'], editLaundryDetail);
            };
            $timeout(function () {
                oALTable = $('#laundry-details-data-table').DataTable(DTProps);
                DataTableS.checkBoxEvents('#laundry-details-data-table');
                DataTableS.onDeleteClick('#laundry-details-data-table', function (RefArr) {
                    deleteLaundryDetails(RefArr);
                });
            }, 1000);
        }

        /**
         * @name editLaundryDetail
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerDetail
         */
            $scope.Reasonforchange =false;
            function editLaundryDetail(ID) {
                $scope.Reasonforchange =true;
                $scope.savedisable =false;
                Ajax({
                data: {
                    EndPoint: 'Customer/AssignLaundry/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.AssignLaundry = Res['D']
                        $timeout(function () {
                            $('#lh-location').val(Res['D'].LocationID).trigger('change.select2');
                            $('#laundry-id').val(Res['D'].LaundryID).trigger('change.select2');
                        }, 500);

                        $scope.$apply();
                    }
                }
            });
        }
        /**
         * @name saveLaundry
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveLaundry(FormAssignLaundry) {
            $scope.Reasonforchange =true;
            $scope.AssignLaundry.EndPoint = 'Customer/AssignLaundry/insertUpdate';
            $scope.AssignLaundry.CustomerID = $scope.CustomerID;
            // $scope.AssignLaundry.LocationID = $scope.LocationID;
            // //console.log($scope.AssignLaundry);
            // return;
            if (FormAssignLaundry.$valid) {
                Ajax({
                    data: $scope.AssignLaundry,
                    success: function (Res) {
                        if (Res['S']) {
                            $scope.showAssignLaundry();
                            $scope.CustomerLaundryArr = [];
                            oALTable.draw();
                            // $scope.Reasonforchange =true;
                            ClearLaundry(FormAssignLaundry);
                        }
                        $scope.$apply();
                    }
                });
            }
        }

        function deleteLaundryDetails(IDArray) {
            //console.log('contract');
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickLaundryInfoDeleteConfirmBoxOk');
        }
        $scope.$on('OnClickLaundryInfoDeleteConfirmBoxOk', function (event, obj) {
            //console.log('delete');
            Ajax({
                data: {
                    EndPoint: 'Customer/AssignLaundry/remove',
                    IDArr: $scope.deleteArray
                },
                success: function (Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.CustomerLaundryArr = [];
                        oALTable.draw();
                        $scope.deleteLaundryInfo();

                        if ($.inArray(parseInt($scope.ContractInfo.ID), $scope.deleteArray) >= 0) {
                            ClearLaundry();
                        }

                        DataTableS.resetDelete('#laundry-details-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });
        $scope.deleteLaundryInfo = function(){
            //console.log('laundry');
            if($scope.CustomerLaundryArr.length == 0){
                $('#LHtooltips').css({
                    "color": "black",
                    "background-color": "#fff",
                    "font-size": "15px",
                    "padding": "6px"
                })
            }
        }
        $scope.locationDate = function(ID){
            //console.log(ID);
            Ajax({
                data: {
                    EndPoint: 'Customer/AssignLaundry/getDateByLocationID',
                    ID: ID
                },
                success: function (Res) {
                    //console.log(Res);
                    if (Res['S']) {
                        $scope.AssignLaundry.DeliveryStartDate = Res['D']['DeliveryStartDate'];
                        $scope.AssignLaundry.DeliveryEndDate = Res['D']['DeliveryEndDate'];
                        //console.log($scope.AssignLaundry);
                        $scope.$apply();
                    }
                }
            });
        }
        /**
         * @name loadBillingDetails
         * @desc Called to load billing details
         * @memberOf Controllers.CustomerDetail
         */
        function loadBillingDetails(ID) {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{ orderable: false, targets: [0, 4] }];
            DTProps.fnServerParams = function (aoData) {
                aoData.push(
                    { 'name': 'EndPoint', 'value': 'Customer/BillingInfo/getDataByPage' },
                    { 'name': 'JWT', 'value': $rootScope.gvJWT },
                    { 'name': 'CustomerID', 'value': ID }
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'Name' },
                { data: 'EmailID' },
                { data: 'LocationID' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];
            DTProps.rowCallback = function (Row, Data) {
                $scope.CustomerBillingArr.push(Data);
                if ($scope.CustomerBillingArr.length != 0) {
                    $timeout(function () {
                        $('#BItooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }, 500);
                }
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(4, Row, Data['ID'], editBillingDetail);
            };

            $timeout(function () {
                oCBTable = $('#billing-details-data-table').DataTable(DTProps);
                DataTableS.checkBoxEvents('#billing-details-data-table');
                DataTableS.onDeleteClick('#billing-details-data-table', function (RefArr) {
                    deleteBillingDetails(RefArr);
                });
            }, 1000);
        }

        /**
         * @name editBillingDetail
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        $scope.HideInviteBilling = false;
        function editBillingDetail(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BillingInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.BillingInfo = Res['D'];

                        if ($scope.BillingInfo.SendInvite == 'N') {
                            $scope.HideInviteBilling = false;
                            // $scope.BillingInfo.SendInvite = 'Y';
                            $scope.BISendInviteLabel = 'Send Invite';
                        } else {
                            $scope.HideInviteBilling = false;
                            // $scope.BillingInfo.SendInvite == 'N';
                            // $scope.BillingInfo.SendInvite = '';
                            $scope.BISendInviteLabel = 'Resend Invite';
                        }
                        $('#bill-location').val(Res['D'].LocationID).trigger('change.select2');
                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name saveBillingDetail
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveBillingDetail(FormBillingInfo) {
            $scope.BillingInfo.EndPoint = 'Customer/BillingInfo/insertUpdate';
            $scope.BillingInfo.SourceRefID = $scope.CustomerID;

            if (FormBillingInfo.$valid) {
                Ajax({
                    data: $scope.BillingInfo,
                    success: function (Res) {
                        if (!Res['S']) {
                            $scope.BIShowErrorMsg = true;
                            $scope.BIErrorMsg = Res['M'];
                        } else {
                            $scope.showBilling();
                            clearBillingDetail(FormBillingInfo);
                            $scope.CustomerBillingArr = [];
                            // window.alert("Saved successfully!");
                            oCBTable.draw();
                        }
                        $scope.$apply();
                    }
                });
            }
        }

        /**
         * @name deleteBillingDetails
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        function deleteBillingDetails(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickBillingInfoDeleteConfirmBoxOk');
        }

        $scope.$on('OnClickBillingInfoDeleteConfirmBoxOk', function (event, obj) {
            // $('#check-all-customer-billing-info').trigger('click');
            Ajax({
                data: {
                    EndPoint: 'Customer/BillingInfo/remove',
                    IDArr: $scope.deleteArray
                },
                success: function (Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.CustomerBillingArr = [];
                        oCBTable.draw();
                        $scope.deleteBilling();

                        if ($.inArray(parseInt($scope.BillingInfo.ID), $scope.deleteArray) >= 0) {
                            clearBillingDetail();
                        }

                        DataTableS.resetDelete('#billing-details-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });
        $scope.deleteBilling = function(){
            if($scope.CustomerBillingArr.length == 0){
                $('#BItooltips').css({
                    "color": "black",
                    "background-color": "#fff",
                    "font-size": "15px",
                    "padding": "6px"
                })
            }
        }

        /**
         * @name loadShippingDetails
         * @desc Called to load shipping details
         * @memberOf Controllers.CustomerDetail
         */
        function loadShippingDetails(ID) {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{ orderable: false, targets: [0, 4] }];
            DTProps.fnServerParams = function (aoData) {
                aoData.push(
                    { 'name': 'EndPoint', 'value': 'Customer/ShippingInfo/getDataByPage' },
                    { 'name': 'JWT', 'value': $rootScope.gvJWT },
                    { 'name': 'CustomerID', 'value': ID }
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'Name' },
                { data: 'EmailID' },
                { data: 'LocationID' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];
            DTProps.rowCallback = function (Row, Data) {
                $scope.CustomerShippingArr.push(Data);
                if ($scope.CustomerShippingArr.length != 0) {
                    $timeout(function () {
                        $('#SItooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }, 500);
                }
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(4, Row, Data['ID'], editShippingDetail);
            };
            $timeout(function () {
                oCSTable = $('#shipping-details-data-table').DataTable(DTProps);
                DataTableS.checkBoxEvents('#shipping-details-data-table');
                DataTableS.onDeleteClick('#shipping-details-data-table', function (RefArr) {
                    deleteShippingDetails(RefArr);
                });
            }, 1000);
        }

        /**
         * @name editShippingDetail
         * @desc Called on click of edit icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        $scope.HideInviteShipping = false;
        function editShippingDetail(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/ShippingInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.ShippingInfo = Res['D'];

                        if ($scope.ShippingInfo.SendInvite == 'N') {
                            $scope.HideInviteShipping = false;
                            // $scope.ShippingInfo.SendInvite = 'Y';
                            $scope.SISendInviteLabel = 'Send Invite';
                        } else {
                            $scope.HideInviteShipping = false;
                            // $scope.ShippingInfo.SendInvite == 'N';
                            // $scope.ShippingInfo.SendInvite = '';
                            $scope.SISendInviteLabel = 'Resend Invite';
                        }
                        $('#shipp-location').val(Res['D'].LocationID).trigger('change.select2');
                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name saveShippingDetail
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveShippingDetail(FormShippingInfo) {
            $scope.ShippingInfo.EndPoint = 'Customer/ShippingInfo/insertUpdate';
            $scope.ShippingInfo.SourceRefID = $scope.CustomerID;

            if (FormShippingInfo.$valid) {
                Ajax({
                    data: $scope.ShippingInfo,
                    success: function (Res) {
                        if (!Res['S']) {
                            $scope.SIShowErrorMsg = true;
                            $scope.SIErrorMsg = Res['M'];
                        } else {
                            $scope.shippingInfo();
                            clearShippingDetail(FormShippingInfo);
                            $scope.CustomerShippingArr = [];
                            // window.alert("Saved successfully!");
                            oCSTable.draw();
                        }
                        $scope.$apply();
                    }
                });
            }
        }

        /**
         * @name deleteShippingDetails
         * @desc Called on click of delete icon in data table
         * @memberOf Controllers.CustomerDetail
         */
        function deleteShippingDetails(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickShippingInfoDeleteConfirmBoxOk');
        }
        $scope.$on('OnClickShippingInfoDeleteConfirmBoxOk', function (event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Customer/ShippingInfo/remove',
                    IDArr: $scope.deleteArray
                },
                success: function (Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.CustomerShippingArr = [];
                        oCSTable.draw();
                        $scope.deleteShipping();

                        if ($.inArray(parseInt($scope.ShippingInfo.ID), $scope.deleteArray) >= 0) {
                            clearShippingDetail();
                        }

                        DataTableS.resetDelete('#shipping-details-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });
        $scope.deleteShipping = function(){
            if($scope.CustomerShippingArr.length == 0){
                $('#SItooltips').css({
                    "color": "black",
                    "background-color": "#fff",
                    "font-size": "15px",
                    "padding": "6px"
                })
            }
        }

        function loadContractInfo(ID) {
            var DTProps = DataTableS.getDefaults();
            DTProps.columnDefs = [{ orderable: false, targets: [0, 7] }];
            DTProps.fnServerParams = function (aoData) {
                aoData.push(
                    { 'name': 'EndPoint', 'value': 'Customer/ContractInfo/getDataByPage' },
                    { 'name': 'JWT', 'value': $rootScope.gvJWT },
                    { 'name': 'CustomerID', 'value': ID }
                );
            };
            DTProps.order = [];
            DTProps.columns = [
                { data: null, defaultContent: '', class: 'check-box-column' },
                { data: 'LocationID' },
                { data: 'ContractSignedDate' },
                { data: 'DeliveryStartDate' },
                { data: 'DeliveryEndDate' },
                { data: 'ContractTypeID' },
                { data: 'InvoicingFrequencyID' },
                { data: null, defaultContent: '', class: 'action-column' }
            ];
            DTProps.rowCallback = function (Row, Data) {
                $scope.CustomerContractArr.push(Data);
                if ($scope.CustomerContractArr.length != 0) {
                    $timeout(function () {
                        $('#CTItooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }, 500);
                }
                DataTableS.createCheckBoxColumn(Row, Data['ID']);
                DataTableS.createEditActionColumn(7, Row, Data['ID'], editContractDetail);
            };
            $timeout(function () {
                oCContTable = $('#contract-details-data-table').DataTable(DTProps);
                DataTableS.checkBoxEvents('#contract-details-data-table');
                DataTableS.onDeleteClick('#contract-details-data-table', function (RefArr) {
                    deleteContractDetails(RefArr);
                });
            }, 1000);
        }


        /**
         * @name EditContractInfo
         * @desc Called to load contract info
         * @memberOf Controllers.CustomerDetail
         */
        function editContractDetail(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/ContractInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.ContractInfo = Res['D'];
                        var CheckBoxStatus = { Y: true, N: false };
                        $scope.ContractInfo.RenewalReminder1 = CheckBoxStatus[$scope.ContractInfo.RenewalReminder1];
                        $scope.ContractInfo.RenewalReminder2 = CheckBoxStatus[$scope.ContractInfo.RenewalReminder2];
                        $scope.ContractInfo.RenewalReminder3 = CheckBoxStatus[$scope.ContractInfo.RenewalReminder3];
                        $timeout(function () {
                            $('#invoicing-frequency').val(Res['D'].InvoicingFrequencyID).trigger('change.select2');
                            $('#contract-type').val(Res['D'].ContractTypeID).trigger('change.select2');
                            $('#contract-location').val(Res['D'].LocationID).trigger('change.select2');
                        }, 1000);
                        $scope.$apply();
                        setFileNames();
                    }
                }
            });
        }

        /**
         * @name saveContractInfo
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveContractInfo(FormContractInfo) {
            $scope.ContractInfo.EndPoint = 'Customer/ContractInfo/insertUpdate';
            $scope.ContractInfo.CustomerID = $scope.CustomerID;
            if (FormContractInfo.$valid) {
                Ajax({
                    files: $scope.CustomerContract,
                    data: $scope.ContractInfo,
                    success: function (Res) {
                        if (!Res['S']) {
                            $scope.CNTShowErrorMsg = true;
                            $scope.CNTErrorMsg = Res['M'];
                        } else {
                            $scope.showCantract();
                            // window.alert("Saved successfully!");
                            clearContractInfo(FormContractInfo);
                            $scope.CustomerContractArr = [];
                            oCContTable.draw();
                        }
                        $scope.$apply();
                    }
                });
            }
        }

        function deleteContractDetails(IDArray) {
            $scope.deleteArray = IDArray;
            $rootScope.DelConfirmBox('OnClickContractInfoDeleteConfirmBoxOk');
        }
        $scope.$on('OnClickContractInfoDeleteConfirmBoxOk', function (event, obj) {
            Ajax({
                data: {
                    EndPoint: 'Customer/ContractInfo/remove',
                    IDArr: $scope.deleteArray
                },
                success: function (Res) {
                    if (Res['S'] && Res['D']) {
                        $scope.CustomerContractArr = [];
                        oCContTable.draw();
                        $scope.deleteContractInfo();

                        if ($.inArray(parseInt($scope.ContractInfo.ID), $scope.deleteArray) >= 0) {
                            clearContractDetail();
                        }

                        DataTableS.resetDelete('#contract-details-data-table');
                        $scope.deleteArray = [];
                        $scope.$apply();
                    }
                }
            });
        });

        $scope.deleteContractInfo = function(){
            if($scope.CustomerContractArr.length == 0){
                $('#CTItooltips').css({
                    "color": "black",
                    "background-color": "#fff",
                    "font-size": "15px",
                    "padding": "6px"
                })
            }
        }
        function loadBillOfMaterial(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BillOfMaterial/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['D']) {
                        $scope.QuoteItems = Res['D'];
                        $scope.$apply();
                    }
                }
            });
        }


        /**
         * @name loadSpecialNotes
         * @desc Called to load contract info
         * @memberOf Controllers.CustomerDetail
         */
        function loadSpecialNotes(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/SpecialNotesInfo/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    //console.log(Res['D'].LocationID);
                    if (Res['S']) {
                        $scope.SpecialNotes = Res['D'];
                        $timeout(function () {
                            $('#spl-location').val(Res['D'].LocationID).trigger('change.select2');
                            if ($scope.SpecialNotes.LocationID > 0) {
                                $('#SNtooltips').css({
                                    "color": "white",
                                    "background-color": "#299d9d",
                                    "font-size": "15px",
                                    "padding": "6px"
                                })
                            }
                        }, 2000);
                        // $('#spl-location').val(Res['D'].LocationID).trigger('change.select2');
                        $scope.$apply();
                    }
                }
            });
        }

        /**
         * @name saveSpecialNotes
         * @desc Called on click of save button
         * @memberOf Controllers.CustomerDetail
         */
        function saveSpecialNotes(FormSpecialNotes) {
            $scope.SpecialNotes.EndPoint = 'Customer/SpecialNotesInfo/insertUpdate';
            $scope.SpecialNotes.CustomerID = $scope.CustomerID;

            if (FormSpecialNotes) {
                Ajax({
                    data: $scope.SpecialNotes,
                    success: function (Res) {
                        if (Res['S']) {
                            $scope.specialNotes();
                            $timeout(function () {
                                // window.alert("Saved successfully!");
                                backToManagmentPage();
                            }, 1000);
                            $scope.$apply();
                        }
                    }
                });
            }
        }

        $scope.ViewCustomerPage = function () {
            $location.url('/customer/customer-details');
        }

        /**
         * @name importInit
         * @desc Called when file input field is created
         * @memberOf Controllers.ImportCustomer
         */
        $scope.importInit = function () {
            FilePicker.fileSelector('#import-customer', function (file) {
                $scope.ImportFile = { ImportFile: file };
                importSelectedFile();
            }, function () {
                $scope.ImportFile = null;
            });
        }

        $scope.selectFile = function () {
            $('#import-customer .up-btn').click();
        }


        $scope.Search = function() {
            //console.log('helo');
        // $scope.ContractTypeChange = function () {
            $state.go('Customer-Management', {
                'AccountManager': $scope.BasicDetail.AccountManager,
                'CustomerType': $scope.BasicDetail.CustomerTypeID
            }, {
                    location: 'replace',
                    reload: true
                });
        // }

        // oTable.draw();
        // //console.log($scope.oTable);
        }

        $scope.onEdit = function () {
            window.scrollTo(0, 0);
        }
        

        $scope.CustomerChange = function (ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getDataByID',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S']) {
                        $scope.BasicDetail = Res['D'];
                        $location.url('/customer/edit-details/' + Res['D']['ID'] + '/edit');
                        $scope.$apply();
                    }
                }
            });
        } 

        // $scope.onCCLocationChange = function(ID) {
        //     Ajax({
        //         data: {
        //             EndPoint: 'Customer/BasicDetail/getDateByID',
        //             ID: ID
        //         },
        //         success: function (Res) {
        //             if (Res['S']) {
        //                 $scope.ContractInfo = Res['D'];
        //                 $scope.$apply();
        //             }
        //         }
        //     });
        // }

        $scope.onLaundryIDChange = function (ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getLaundryDetails',
                    ID: ID
                },
                success: function (Res) {
                    if (Res['S'])
                        $scope.FormData = Res['D'];

                    $scope.$apply();
                }
            });
        }
        $scope.onCustomerChange = function(ID) {
            // //console.log(ID);
            Ajax({
                data: {
                    EndPoint: 'Manage/Prospect/CoverttoCustomer',
                    ID: ID
                },
                success: function (Res) {
                    //console.log(Res);
                    if (Res['S']) {
                        $scope.ID = Res['D'];
                        $scope.FormData = Res['D'];
                        $location.url('/customer/edit-details/' + Res['D'] + '/edit');
                    } else {
                        window.alert("Customer Already Exist!");
                    }
                    $scope.$apply();
                }
            });
        }
        $scope.locationInform = function () {
            $location.hash('navbar');
            $anchorScroll();
        }

        $scope.ContactInform = function () {
            $location.hash('contactinfo');
            $anchorScroll();
        }

        $scope.BillingInform = function () {
            $location.hash('billinginform');
            $anchorScroll();
        }
        $scope.shippingInform = function () {
            $location.hash('shippinginfo');
            $anchorScroll();
        }

        $scope.ContractInform = function () {
            $location.hash('contractinfo');
            $anchorScroll();
        }

        $scope.BillOfMaterial = function () {
            $location.hash('billofmaterial');
            $anchorScroll();
        }

        $scope.LaundryHistory = function () {
            $location.hash('laundryhistory');
            $anchorScroll();
        }

        $scope.SpecialNoteInfo = function () {
            $location.hash('specialnotes');
            $anchorScroll();
        }

        function onSelectedQuoteVersion(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getBillingInfo',
                    ID: ID
                },
                success: function (Res) {
                    //console.log(Res);
                    if (Res['S']) {
                        $scope.QuoteItems = Res['D'];
                    }
                    $scope.$apply();
                }
            });
        }

        function onGetLocation(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getLocation',
                    ID: ID
                },
                success: function (Res) {
                    //console.log(Res['D'].HOLocation);
                    if (Res['S']) {
                        $scope.LocationID = Res['D'].HOLocation;
                    }
                    $scope.$apply();
                }
            });
        }

        function onAllQuoteVersion(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getBillingInfo',
                    ID: ID
                },
                success: function (Res) {
                    //console.log(Res);
                    if (Res['S']) {
                        $scope.QuoteItems = Res['D'];
                        $timeout(function () {
                            $('#BOMtooltips').css({
                                "color": "white",
                                "background-color": "#299d9d",
                                "font-size": "15px",
                                "padding": "6px"
                            })
                        }, 500);
                    }
                    $scope.$apply();
                }
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
                data: { EndPoint: 'Customer/Import/import' },
                success: function (Res) {
                    if (Res['S']) {
                        alert('Import finished successfully');
                        $scope.ImportFile = null;
                        $scope.$apply();
                    } else {
                        alert('Import finished successfully');
                    }
                }
            });
        }

        /**
         * @name ConvertCustomer
         * @desc Called on click of Convert Customer
         * @memberOf Controllers.GenerateQuote
         */
        $scope.ConvertCustomer = function (ID) {
            Ajax({
                data: {
                    EndPoint: 'Manage/Prospect/CoverttoCustomer',
                    ID: ID
                },
                success: function (Res) {
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

        // $timeout(function() {
        $('#contract-type').select2({
            placeholder: 'contract type',
            allowClear: true,
            width: 'off',
        });
        $('#customer-type').select2({
            placeholder: 'customer type',
            allowClear: true,
            width: 'off',
        });
        $('#cust-inventory-id').select2({
            placeholder: 'Select a Prospect',
            allowClear: true,
            width: 'off',
        });
        $('#prospect-id').select2({
            placeholder: 'Select a Prospect',
            allowClear: true,
            width: 'off',
        });
        $('#customer-list').select2({
            placeholder: 'Select a Customer',
            allowClear: true,
            width: 'off',
        });
        $('#acc-manager').select2({
            placeholder: 'Select a Account Manager',
            allowClear: true,
            width: 'off',
        });
        // }, 2000);

        function initCustomerType() {
        }

        function loadCustomerTypeDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/CustomerType/getAllData'
                },
                success: function (Res) {
                    initCustomerType();
                    $scope.CustomerTypeList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function initLaundry() {
            $('#laundry-id').select2({
                placeholder: 'Select a Laundry',
                allowClear: true,
                width: 'off',
            });
        }

        function loadLaundryIDDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Laundry/BasicDetail/getAllData'
                },
                success: function (Res) {
                    initLaundry();
                    $scope.LaundryIDList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function initProspect() {
        }

        function loadProspectcDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Manage/Prospect/getProspect'
                },
                success: function (Res) {
                    initProspect();
                    $scope.ProspectList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function initCustomer() {
        }

        function loadCustomerDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getAllData'
                },
                success: function (Res) {
                    initCustomer();
                    $scope.CustomerList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function initCity() {
            $('#city').select2({
                placeholder: 'Select a city',
                allowClear: true,
                width: 'off',
            });
        }

        function loadCityDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/City/getAllData'
                },
                success: function (Res) {
                    initCity();
                    $scope.CityList = Res['D'];
                }
            });
        }

        function initCountry() {
            $('#country').select2({
                placeholder: 'Select a country',
                allowClear: true,
                width: 'off',
            });
        }
        function initLocation() {
            $('#contract-location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
            $('#lh-location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
            $('#location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
            $('#bom-location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
            $('#spl-location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
            $('#bill-location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
            $('#shipp-location').select2({
                placeholder: 'Select a Location Name',
                allowClear: true,
                width: 'off',
            });
        }

        // function loadBOMLocation(ID) {
        //     Ajax({
        //         data: {
        //             EndPoint: 'Customer/BasicDetail/getQuoteLocation',
        //             ID: ID
        //         },
        //         success: function (Res) {
        //             initLocation();
        //             $scope.bomLocationList = Res['D'];
        //             $scope.$apply();
        //         }
        //     });
        // }

        function loadCCLocationDropdown(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/LocationInfo/getAllLocationData',
                    ID: ID
                },
                success: function (Res) {
                    initLocation();
                    $scope.LocationList = Res['D'];
                    $scope.$apply();
                }
            });
        }
        function loadCountryDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Country/getAllData'
                },
                success: function (Res) {
                    initCountry();
                    $scope.CountryList = Res['D'];
                }
            });
        }

        function initCurrency() {
            $('#currency').select2({
                placeholder: 'Select a currency',
                allowClear: true,
                width: 'off',
            });
        }

        function loadCurrencyDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/Currency/getAllData'
                },
                success: function (Res) {
                    initCurrency();
                    $scope.CurrencyList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function initContractType() {
        }

        function loadContractTypeDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/ContractType/getAllData'
                },
                success: function (Res) {
                    initContractType();
                    $scope.ContractTypeList = Res['D'];
                    $scope.$apply();
                }
            });
        }

        function initInvoicingFrequency() {
            $('#invoicing-frequency').select2({
                placeholder: 'Select a Invoicing Frequency',
                allowClear: true,
                width: 'off',
            });
        }

        function loadInvoicingFrequencyDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Masters/InvoicingFrequency/getAllData'
                },
                success: function (Res) {
                    initInvoicingFrequency();
                    $scope.InvoicingFrequencyList = Res['D'];
                }
            });
        }

        function initAccountManager() {
            $('#account-manager').select2({
                placeholder: 'Select a AccountManager',
                allowClear: true,
                width: 'off',
            });
        }

        function loadAccountManagerDropdown() {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getAllDataAccount'
                },
                success: function (Res) {
                    initAccountManager();
                    $timeout(function () {
                        $scope.AccountManagerList = Res['D'];
                    }, 200);
                }
            });
        }

        function initAllQuoteVersion() {
            $('#all-quote-version').select2({
                placeholder: 'Select a Quote Version',
                allowClear: true,
                width: 'off',
            });
        }

        function loadAllQuoteVersionDropdown(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getAllQuoteVersion',
                    ID: ID
                },
                success: function (Res) {
                    initAllQuoteVersion();
                    if (Res['S']) {
                        $scope.AllQuoteVersionList = Res['D'];
                    }
                }
            });
        }

        function initSelectedQuoteVersion() {
            $('#selected-quote-version').select2({
                placeholder: 'Select a Quote Version',
                allowClear: true,
                width: 'off',
            });
        }

        function loadSelectedQuoteVersionDropdown(ID) {
            Ajax({
                data: {
                    EndPoint: 'Customer/BasicDetail/getSelectedQuoteVersion',
                    ID: ID
                },
                success: function (Res) {
                    initSelectedQuoteVersion();
                    $scope.SelectedQuoteVersionList = Res['D'];
                }
            });
        }

        /**
         * @name clearCustomerContact
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.CustomerDetail
         */
        function clearCustomerContact(FormContactInfo) {
            $scope.CIErrorMsg = '';
            $scope.CIShowErrorMsg = false;
            $scope.HideInviteContact = false;
            $scope.formhide = false;
            $scope.CCSendInviteLabel = 'Send Invite';
            $scope.ContactInfo = {};
            $scope.ContactInfo.LocationName = '';

            FormContactInfo.$submitted = false;
            FormContactInfo.$setPristine();
            FormContactInfo.$setUntouched();
            $("#location").val('').trigger('change.select2');
            initLocation();
        }

        /**
         * @name clearCustomerLocation
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.CustomerDetail
         */
        function clearCustomerLocation(FormLocationInfo) {
            $scope.CLErrorMsg = '';
            $scope.CLShowErrorMsg = false;
            $scope.LocationInfo = {};

            FormLocationInfo.$submitted = false;
            FormLocationInfo.$setPristine();
            FormLocationInfo.$setUntouched();
            $("#city").val('').trigger('change.select2');
            initCity();
            $("#country").val('').trigger('change.select2');
            initCountry();
        }

        function ClearCustomerDetails() {
            $scope.CDErrorMsg = '';
            $scope.CDShowErrorMsg = false;
            // FormBasicDetail.$submitted = false;
            // FormBasicDetail.$setPristine();
            // FormBasicDetail.$setUntouched();
        }

        /**
         * @name clearBillingDetail
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.CustomerDetail
         */
        function clearBillingDetail(FormBillingInfo) {
            $scope.BIErrorMsg = '';
            $scope.BIShowErrorMsg = false;
            $scope.HideInviteBilling = false;
            $scope.Locationshow = false;
            $scope.BISendInviteLabel = 'Send Invite';
            $scope.BillingInfo = {};

            FormBillingInfo.$submitted = false;
            FormBillingInfo.$setPristine();
            FormBillingInfo.$setUntouched();
            $("#bill-location").val('').trigger('change.select2');
            initLocation();
        }

        /**
         * @name clearShippingDetail
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.ShippingDetail
         */
        function clearShippingDetail(FormShippingInfo) {
            $scope.SIErrorMsg = '';
            $scope.SIShowErrorMsg = false;
            $scope.HideInviteShipping = false;
            $scope.locationform = false;
            $scope.SISendInviteLabel = 'Send Invite';
            $scope.ShippingInfo = {};

            FormShippingInfo.$submitted = false;
            FormShippingInfo.$setPristine();
            FormShippingInfo.$setUntouched();
            $("#shipp-location").val('').trigger('change.select2');
            initLocation();
        }

        /**
         * @name ClearLaundry
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.BasicDetail
         */
        function ClearLaundry(FormAssignLaundry) {
            $scope.AssignLaundry = {};
            $scope.laundryhide = false;
            $scope.Reasonforchange =false;

            FormAssignLaundry.$submitted = false;
            FormAssignLaundry.$setPristine();
            FormAssignLaundry.$setUntouched();

            $("#lh-location").val('').trigger('change.select2');
            initLocation();
            $("#laundry-id").val('').trigger('change.select2');
            initLaundry();
        }

        /**
         * @name clearBasicDetail
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.BasicDetail
         */
        function clearBasicDetail(FormBasicDetail) {
            $scope.BasicDetail = {};

            FormBasicDetail.$submitted = false;
            FormBasicDetail.$setPristine();
            FormBasicDetail.$setUntouched();
        }

        /**
         * @name clearContractInfo
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.CustomerDetail
         */
        function clearContractInfo(FormContractInfo) {
            $scope.ContractInfo = {};
            $scope.CNTErrorMsg = '';
            $scope.formhiding = false;
            $scope.CNTShowErrorMsg = false;
            $scope.CustomerContract = { TradeLicenseUpload: null, ContractUpload: null, TaxCertificateUpload: null };

            FormContractInfo.$submitted = false;
            FormContractInfo.$setPristine();
            FormContractInfo.$setUntouched();
            $("#invoicing-frequency").val('').trigger('change.select2');
            initInvoicingFrequency();
            $("#contract-type").val('').trigger('change.select2');
            initContractType();
            $("#contract-location").val('').trigger('change.select2');
            initLocation();

            FilePicker.displayFileName('#trade-license-ctrl', '');
            FilePicker.displayFileName('#contract-upload-ctrl', '');
            FilePicker.displayFileName('#tax-certificate-ctrl', '');
        }

        /**
         * @name backToManagmentPage
         * @desc Called on click of back button
         * @memberOf Controllers.CustomerDetail
         */
        function backToManagmentPage() {
            $location.url('/customer/customer-management');
        }
    }
})();
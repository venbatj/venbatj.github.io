angular.module('RAT').controller('LaundryCtrl', function($rootScope, $state, $scope, $location, $timeout, DataTableS, FilePicker, $anchorScroll) {
    var oCLTable;    
    var oLCTable;
    var oLBTable;
    var oLFTable;
    var oCContTable;
    var oCostTable;

    $scope.$on('$viewContentLoaded', function() {
        loadCountryDropdown();
        loadBICountryDropdown();
        loadCityDropdown();
        loadBICityDropdown();
        loadCustomerServiceDropdown();
        loadInvoicingFrequencyDropdown();
        loadCurrencyDropdown();
        loadDeliveryManagerDropdown();
        loadLaundryVendorDropdown();
        loadCategoryDropdown();
        loadContractTypeDropdown();
    });

    $scope.LaundryLogo = null;
    $scope.LaundryContract = {Contract: null, TradeLicenseUpload: null, TaxCertificate: null};
    $scope.LaundryFacility = {FacilityImg: null, ExistingInfrastructure: null};

    $scope.CountryList = [];
    $scope.BICountryList = [];
    $scope.CityList = [];
    $scope.BICityList = [];
    $scope.TypesOfCustomerServices = [];
    $scope.InvoicingFrequencyList = [];
    $scope.CurrencyList = [];
    $scope.DeliveryManagerList = [];
    $scope.LaundryVendorList = [];
    $scope.CategoryList = [];
    $scope.ProductList = [];
    $scope.VariantList = [];
    $scope.LaundryCostingArr = [];
    $scope.LaundryLocationArr = [];
    $scope.locationCount = [];
    $scope.LocationList = [];
    $scope.LaundryContactArr = [];
    $scope.LaundryBillingArr = [];
    $scope.LaundryContractArr = [];
    $scope.ContractTypeList = [];

    $scope.BasicDetail = {};
    $scope.ContactInfo = {};
    $scope.FormContactInfo = {};
    $scope.BillingInfo = {};
    $scope.FormBillingInfo = {};
    $scope.FacilityInfo = {};
    $scope.FormFacilityInfo = {};
    $scope.ContractInfo = {};
    $scope.CostingInfo = {};
    $scope.LocationInfo = {};

    $scope.LDShowErrorMsg = false;
    $scope.BIShowErrorMsg = false;
    $scope.CIShowErrorMsg = false;
    $scope.CNTShowErrorMsg = false;
    $scope.ChangesSaved = true;
    $scope.AddPage = true;

    $scope.LDErrorMsg = '';
    $scope.BIErrorMsg = '';
    $scope.CIErrorMsg = '';
    $scope.CNTErrorMsg = '';

    $scope.LaundryID = 0;
    $scope.LCSendInviteLabel = 'Send Invite';
    $scope.BISendInviteLabel = 'Send Invite';

    $scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
        $event.preventDefault();
        }
    };
    $scope.paste = function(e){
        e.preventDefault();
        return false
     }

    if ($state.params != null && $state.params.LaundryID != null && $state.params.LaundryID > 0)
        $scope.LaundryID = $state.params.LaundryID;
        
    if ($scope.LaundryID > 0) {
        $scope.AddPage = false;
        loadLaundryDetail($scope.LaundryID);
        loadContractInfo($scope.LaundryID);
        
        $timeout(function() {
            loadRelationalData($scope.LaundryID);
        }, 1000);
    }

    $scope.saveLaundryDetail = saveLaundryDetail;
    $scope.saveLaundryContact = saveLaundryContact;
    $scope.saveBillingDetail = saveBillingDetail;
    $scope.saveFacilityDetail = saveFacilityDetail;
    $scope.initLogoPicker = initLogoPicker;
    $scope.initfacilityPicker = initfacilityPicker;
    $scope.InputMask = InputMask;
    $scope.initContractUpload = initContractUpload;
    $scope.initTradeLicense = initTradeLicense;
    $scope.initTaxCertificate = initTaxCertificate;
    $scope.clearLaundryContact = clearLaundryContact;
    $scope.clearBillingDetail = clearBillingDetail;
    $scope.clearFacilityDetail = clearFacilityDetail;
    $scope.clearContractInfo = clearContractInfo;
    $scope.saveContractInfo = saveContractInfo;
    $scope.clearBasicDetail = clearBasicDetail;
    $scope.initInfrastructure = initInfrastructure;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.saveLaundryCost = saveLaundryCost;
    $scope.clearLaundryCosting = clearLaundryCosting;
    $scope.clearLaundryLocation =  clearLaundryLocation;
    $scope.saveLaundryLocation = saveLaundryLocation;
    $scope.reminder = reminder;

    $scope.LaundryToCustomerList = [
        { ID: '', LaundryToCustomer: '--Select--' },
        { ID: 1, LaundryToCustomer: 'New Assignment' },
        { ID: 2, LaundryToCustomer: 'Change' },
        { ID: 3, LaundryToCustomer: 'Terminate' }
    ];

    $scope.CLvCompare = function() {
        $('#laundry-compare-category').modal('show');
    }
    $scope.PLvCompare = function() {
        $('#laundry-compare-product').modal('show');
    }
    $scope.VLvCompare = function() {
        $('#laundry-compare-variant').modal('show');
    }
    $scope.onTop = function () {
        window.scrollTo(0, 0);
    }
    $scope.ShowLaundry = function() {
        $('#laundry-details').modal('show');
    }
    $scope.ShowLocation = function() {
        $('#laundry-location-info').modal('show');
    }
    $scope.ShowContact = function() {
        $('#laundry-contact-info').modal('show');
    }
    $scope.ShowBilling = function() {
        $('#laundry-billing-info').modal('show');
    }
    $scope.ShowContract = function() {
        $('#laundry-contract-info').modal('show');
    }
    $scope.ShowCosting = function() {
        $('#costing-info').modal('show');
    }
    $scope.LaundryLocationInfo = function () {
        $location.hash('location-info');
        $anchorScroll();
    }
    $scope.LaundryContactInfo = function () {
        $location.hash('contact-info');
        $anchorScroll();
    }
    $scope.LaundryBillingInfo = function () {
        $location.hash('billing-info');
        $anchorScroll();
    }
    $scope.LaundryContractInfo = function () {
        $location.hash('contract-info');
        $anchorScroll();
    }
    $scope.LaundryCostingInfo = function () {
        $location.hash('cost-info');
        $anchorScroll();
    }

    $scope.ComparisonData = function(CategoryID, ProductID, VariantID) {
        if ($scope.ComparisonLaundry == undefined) {
            $scope.CLvCompare();
        } else if ($scope.ComparisonLaundry.CategoryID == undefined) {
            $scope.CLvCompare();
        } else if ($scope.ComparisonLaundry.ProductID == undefined) {
            $scope.PLvCompare();
        } else if ($scope.ComparisonLaundry.VariantID == undefined) {
            $scope.VLvCompare();
        } else {
        $location.url('/laundry/compare-laundry-vendors-edit/' + CategoryID + '/' + ProductID + '/' + VariantID + '');
        }
    }

    // $scope.onAssignLaundryChange = function() {
    //     if($scope.AssignCustomer.LaundryToCustomer == 1)
    //         $location.url('/laundry/assign-laundry');
    //         if($scope.AssignCustomer.LaundryToCustomer == 2)
    //             $location.url('/laundry/change-laundry');
    //         if($scope.AssignCustomer.LaundryToCustomer == 3)
    //             $location.url('/laundry/terminate-laundry');
    // }
    $scope.onAssignLaundryChange = function(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/AssignLaundry/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {                      
                    $scope.AssignLaundry = Res['D'];
                        if($scope.AssignCustomer.LaundryToCustomer == 1)
                            $location.url('/laundry/assign-laundry/' + Res['D']['ID'] + '');
                        if($scope.AssignCustomer.LaundryToCustomer == 2)
                            $location.url('/laundry/change-laundry/' + Res['D']['ID'] + '');
                        if($scope.AssignCustomer.LaundryToCustomer == 3)
                            $location.url('/laundry/terminate-laundry/' + Res['D']['ID'] + '');
                    $timeout(function() {
                        $("#customer-laundry").val('').trigger('change.select2');
                        $("#assign-location").val('').trigger('change.select2');
                        $("#assign-laundry").val('').trigger('change.select2');
                        $("#assign-laundry-location").val('').trigger('change.select2');
                    }, 1000);                          
                    $scope.$apply();
                
                }
            }
        });
    }

    $scope.ViewLaundryPage = function(ID) {
        $location.url('/laundry/laundry-details');
    }

    $scope.selectFile = function() {
        $('#import-laundry .up-btn').click();
    }

    $scope.importInit = function() {
        FilePicker.fileSelector('#import-laundry', function(file) {
            $scope.ImportFile = {ImportFile: file};
            importSelectedFile();
        }, function() {
            $scope.ImportFile = null;
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

    function initLogoPicker() {
        FilePicker.imageSelector('#laundry-logo-ctrl', function(file) {
            $scope.LaundryLogo = {Logo: file};
        }, function() {
            $scope.LaundryLogo = null;
        });
    }

    function initfacilityPicker() {
        FilePicker.imageSelector('#facility-logo-ctrl', function(file) {
            $scope.LaundryFacility.FacilityImg = file;
            $scope.FacilityInfo.RMFacilityImg = 'N';
        }, function() {
            $scope.LaundryFacility.FacilityImg = null;
            $scope.FacilityInfo.RMFacilityImg = 'Y';
        });

        if ($scope.FacilityInfo.FacilityImgDisplay != null && $scope.FacilityInfo.FacilityImgDisplay != '')
            FilePicker.displayImage('#facility-logo-ctrl', $scope.FacilityInfo.FacilityImgDisplay);
    }
    
    function initInfrastructure() {
        FilePicker.fileSelector('#facility-upload-ctrl', function(file) {
            $scope.LaundryFacility.ExistingInfrastructure = file;
            $scope.FacilityInfo.RMExistingInfrastructure = 'N';
        }, function() {
            $scope.LaundryFacility.ExistingInfrastructure = null;
            $scope.FacilityInfo.RMExistingInfrastructure = 'Y';
        });

        if ($scope.FacilityInfo.ExistingInfrastructure != null && $scope.FacilityInfo.ExistingInfrastructure != '')
            FilePicker.displayFileName('#facility-upload-ctrl', $scope.FacilityInfo.ACFNExistingInfrastructure);
    }

    function setFaclityFileNames() {
        if ($scope.FacilityInfo.FacilityImgDisplay != null && $scope.FacilityInfo.FacilityImgDisplay != '')
            FilePicker.displayImage('#facility-logo-ctrl', $scope.FacilityInfo.FacilityImgDisplay);
        if ($scope.FacilityInfo.ExistingInfrastructure != null && $scope.FacilityInfo.ExistingInfrastructure != '')
            FilePicker.displayFileName('#facility-upload-ctrl', $scope.FacilityInfo.ACFNExistingInfrastructure);
    }
    
    function initContractUpload() {
        FilePicker.fileSelector('#contract-upload-ctrl', function(file) {
            $scope.LaundryContract.Contract = file;
        }, function() {
            $scope.LaundryContract.Contract = null;
        });

        if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '')
            FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
    }
    function initTradeLicense() {
        FilePicker.fileSelector('#trade-license-ctrl', function(file) {
            $scope.LaundryContract.TradeLicenseUpload = file;
            $scope.ContractInfo.RMTradeLicense = 'N';
        }, function() {
            $scope.LaundryContract.TradeLicenseUpload = null;
            $scope.ContractInfo.RMTradeLicense = 'Y';
        });

        if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
            FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
    }
    function initTaxCertificate() {
        FilePicker.fileSelector('#tax-certificate-ctrl', function(file) {
            $scope.LaundryContract.TaxCertificate = file;
            $scope.ContractInfo.RMTaxCertificate = 'N';
        }, function() {
            $scope.LaundryContract.TaxCertificate = null;
            $scope.ContractInfo.RMTaxCertificate = 'Y';
        });

        if ($scope.ContractInfo.TaxCertificateUpload != null && $scope.ContractInfo.TaxCertificateUpload != '')
            FilePicker.displayFileName('#tax-certificate-ctrl', $scope.ContractInfo.TaxCertificateUpload);
    }

    function setContractDisplayFileNames() {
        if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '')
            FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
        if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
            FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
        if ($scope.ContractInfo.TaxCertificateUpload != null && $scope.ContractInfo.TaxCertificateUpload != '')
            FilePicker.displayFileName('#tax-certificate-ctrl', $scope.ContractInfo.TaxCertificateUpload);
    }
    
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

    function InputMask() {
        $('#SignedDate').click(function () {
            $("#ContractSignedDate").datepicker({ format: 'dd M yyyy', }).focus();
        });
        $('#start-date').click(function () {
            $("#delivery-start-date").datepicker({ format: 'dd M yyyy', }).focus();
        });
        $('#end-date').click(function () {
            $("#delivery-end-date").datepicker({ format: 'dd M yyyy', }).focus();
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
        $('#assignstart-date').click(function () {
            $("#assign-start-date").datepicker({ format: 'dd M yyyy', }).focus();
        });
        $('#assignend-date').click(function () {
            $("#assign-end-date").datepicker({ format: 'dd M yyyy', }).focus();
        });
    }
    $scope.InputMask();
    
    function loadRelationalData(ID) {
        loadLaundryContacts(ID);
        loadBillingDetails(ID);
        loadFacilityDetails(ID);
        loadCostingDetails(ID);
        loadLaundryLocation(ID);
        loadCCLocationDropdown(ID);
        // initialize(ID);
    }

    /**
     * @name loadLaundryDetail
     * @desc Called to load laundry details
     * @memberOf Controllers.LaundryDetail
     */
    function loadLaundryDetail(ID) {
        $scope.disable = true;
        if($state.params.laundryDetail =='view')
            $scope.disable = true;
        if($state.params.laundryDetail =='edit')
            $scope.disable = false;
        Ajax({
            data: {
                EndPoint: 'Laundry/BasicDetail/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {                      
                    $scope.BasicDetail = Res['D'];
                    $timeout(function() {
                        $('#city-laundry').val(Res['D'].CityID).trigger('change.select2');
                        $('#country-laundry').val(Res['D'].CountryID).trigger('change.select2');
                        $('#currency').val(Res['D'].Currency).trigger('change.select2');
                        $('#delivery-manager').val(Res['D'].DeliveryManager).trigger('change.select2');
                    }, 1000);                          
                    $scope.$apply();
                    if ($scope.BasicDetail.LogoDisplay != null && $scope.BasicDetail.LogoDisplay != '')
                        FilePicker.displayImage('#laundry-logo-ctrl', $scope.BasicDetail.LogoDisplay);
                
                }
            }
        });
    }

    /**
     * @name saveLaundryDetail
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    function saveLaundryDetail(BasicDetail) {
        $scope.BasicDetail.EndPoint = 'Laundry/BasicDetail/insertUpdate';
     
        if (BasicDetail) {
            Ajax({
                files: $scope.LaundryLogo,
                data: $scope.BasicDetail,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.LDShowErrorMsg = true;
                        $scope.LDErrorMsg = Res['M'];
                    } else {
                        $scope.LaundryID = Res['D'];
                        if ($scope.AddPage)
                            loadRelationalData($scope.LaundryID);
                            // window.alert("Saved successfully!"); 
                            $scope.ShowLaundry();      
                    }                            
                    $scope.$apply();  
                }
            });
        }
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
     * @name loadLaundryLocation
     * @desc Called to load Laundry contacts
     * @memberOf Controllers.LaundryDetail
     */
    function loadLaundryLocation(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{ orderable: false, targets: [0, 5] }];
        DTProps.fnServerParams = function (aoData) {
            aoData.push(
                { 'name': 'EndPoint', 'value': 'Laundry/LocationInfo/getDataByPage' },
                { 'name': 'JWT', 'value': $rootScope.gvJWT },
                { 'name': 'LaundryID', 'value': ID }
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
            $scope.LaundryLocationArr.push(Data);
            if ($scope.LaundryLocationArr.length != 0) {
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
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editLaundryLocation);
        };

        $timeout(function () {
            oCLTable = $('#location-details-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#location-details-data-table');
            DataTableS.onDeleteClick('#location-details-data-table', function (RefArr) {
                deleteLaundryLocation(RefArr);
            });
        }, 1000);
    }
    $scope.locationRow =function(color){
        return {'background-color':'color'};
    }

    /**
     * @name saveLaundryLocation
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    function saveLaundryLocation(FormLocationInfo) {
        $scope.LocationInfo.EndPoint = 'Laundry/LocationInfo/insertUpdate';
        $scope.LocationInfo.CreatedBy = $scope.LaundryID;

        if (FormLocationInfo.$valid) {
            Ajax({
                data: $scope.LocationInfo,
                success: function (Res) {
                    if (!Res['S']) {
                        $scope.CLShowErrorMsg = true;
                        $scope.CLErrorMsg = Res['M'];
                    } else {
                        $scope.LaundryLocationInfo();
                        clearLaundryLocation(FormLocationInfo);
                        loadCCLocationDropdown($scope.LaundryID);
                        $scope.LaundryLocationArr = [];
                        $scope.locationCount = [];
                        oCLTable.draw();
                        $scope.ShowLocation();
                        // window.alert("Saved successfully!");
                    }
                    $scope.$apply();
                }
            });
        }
    }

    /**
     * @name editLaundryLocation
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function editLaundryLocation(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/LocationInfo/getDataByID',
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
     * @name deleteLaundryLocation
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function deleteLaundryLocation(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickLocationInfoDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickLocationInfoDeleteConfirmBoxOk', function (event, obj) {
        Ajax({
            data: {
                EndPoint: 'Laundry/LocationInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function (Res) {
                if (Res['S'] && Res['D']) {
                    $scope.locationCount = [];
                    $scope.LaundryLocationArr = [];
                    oCLTable.draw();
                    $scope.deletelocation();
                    if ($.inArray(parseInt($scope.LocationInfo.ID), $scope.deleteArray) >= 0) {
                        clearLaundryLocation(FormLocationInfo);
                }
                    DataTableS.resetDelete('#location-details-data-table');
                    $scope.deleteArray = [];
                    $scope.ClearChkbx = false;
                    $scope.$apply();
                }
            }
        });
    });

    $scope.deletelocation =function() {
        if($scope.LaundryLocationArr.length == 0) {
            $('#tooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }}
    
    /**
     * @name loadLaundryContacts
     * @desc Called to load laundry contacts
     * @memberOf Controllers.LaundryDetail
     */
    function loadLaundryContacts(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'Laundry/ContactInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LaundryID', 'value': ID}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'Name' },
            { data: 'EmailID' },
            { data: 'LocationID' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            $scope.LaundryContactArr.push(Data);
                if ($scope.LaundryContactArr.length != 0) {
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
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editLaundryContact);                
        };
        $timeout(function() {
            oLCTable = $('#laundry-contact-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#laundry-contact-data-table');
            DataTableS.onDeleteClick('#laundry-contact-data-table', function(RefArr) {
                deleteLaundryContact(RefArr);
            });
        }, 1000);
    }

    /**
     * @name editLaundryContact
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    $scope.HideInviteContact = false;
    function editLaundryContact(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/ContactInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.ContactInfo = Res['D'];
                    if ($scope.ContactInfo.SendInvite == 'N'){
                        $scope.HideInviteContact = false;
                        // $scope.ContactInfo.SendInvite = 'Y';
                        $scope.LCSendInviteLabel = 'Send Invite';
                    } else {
                        $scope.HideInviteContact = false;
                        // $scope.ContactInfo.SendInvite == 'N';
                        // $scope.ContactInfo.SendInvite = '';
                        $scope.LCSendInviteLabel = 'Resend Invite';
                    }
                    $('#contact-location').val(Res['D'].LocationID).trigger('change.select2');
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveLaundryContact
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    function saveLaundryContact(FormContactInfo) {
        $scope.ContactInfo.EndPoint = 'Laundry/ContactInfo/insertUpdate';
        $scope.ContactInfo.ContactForRef = $scope.LaundryID;

        if (FormContactInfo.$valid) {
            Ajax({
                data: $scope.ContactInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.CIShowErrorMsg = true;
                        $scope.CIErrorMsg = Res['M'];
                    } else {                          
                        clearLaundryContact(FormContactInfo);
                        // window.alert("Saved successfully!");
                        $scope.LaundryContactArr = [];
                        $scope.ShowContact();
                        oLCTable.draw();
                    }
                    $scope.$apply();    
                }
            });
        }
    }

    /**
     * @name deleteLaundryContact
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function deleteLaundryContact(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickContactInfoDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickContactInfoDeleteConfirmBoxOk', function(event, obj) {
        $('#check-all-laundry-contact').trigger('click');
        Ajax({
            data: {
                EndPoint: 'Laundry/ContactInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LaundryContactArr = [];
                    $scope.deletecontact();
                    oLCTable.draw();

                    if ($.inArray(parseInt($scope.ContactInfo.ID), $scope.deleteArray) >= 0) {
                        clearLaundryContact();                            
                    }

                    DataTableS.resetDelete('#laundry-contact-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });
    $scope.deleteContact = function(){
        if($scope.LaundryContactArr.length == 0){
            $('#CItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }

    /**
     * @name loadBillingDetails
     * @desc Called to load billing details
     * @memberOf Controllers.LaundryDetail
     */
    function loadBillingDetails(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'Laundry/BillingInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LaundryID', 'value': ID}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'Name' },
            { data: 'EmailID' },
            { data: 'LocationID' },
            // { data: 'Country' },
            // { data: 'Phone' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            $scope.LaundryBillingArr.push(Data);
            if ($scope.LaundryBillingArr.length != 0) {
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
        $timeout(function() {
            oLBTable = $('#billing-details-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#billing-details-data-table');
            DataTableS.onDeleteClick('#billing-details-data-table', function(RefArr) {
                deleteBillingDetails(RefArr);
            });
        }, 1000);
    }

    /**
     * @name editBillingDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    $scope.HideInviteBilling = false;
    function editBillingDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/BillingInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
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
                    setTimeout(function(){
                        $('#billing-location').val(Res['D'].LocationID).trigger('change.select2');
                        $('#city-billing').val(Res['D'].CityID).trigger('change.select2');
                        $('#country-billing').val(Res['D'].CountryID).trigger('change.select2');
                    },700);
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveBillingDetail
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    function saveBillingDetail(FormBillingInfo) {
        $scope.BillingInfo.EndPoint = 'Laundry/BillingInfo/insertUpdate';
        $scope.BillingInfo.SourceRefID = $scope.LaundryID;

        if (FormBillingInfo.$valid) {
            Ajax({
                data: $scope.BillingInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.BIShowErrorMsg = true;
                        $scope.BIErrorMsg = Res['M'];
                    } else {
                        $scope.LaundryBillingArr = [];
                        clearBillingDetail(FormBillingInfo);
                        // window.alert("Saved successfully!");
                        $scope.ShowBilling();
                        oLBTable.draw();
                    }
                    $scope.$apply();    
                }
            });
        }
    }

    /**
     * @name deleteBillingDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function deleteBillingDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickBillingInfoDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickBillingInfoDeleteConfirmBoxOk', function(event, obj) {
        $('#check-all-laundry-billing').trigger('click');
        Ajax({
            data: {
                EndPoint: 'Laundry/BillingInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LaundryBillingArr = [];
                    $scope.deleteBilling();
                    oLBTable.draw();

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
        if($scope.LaundryBillingArr.length == 0){
            $('#BItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }

    /**
     * @name loadFacilityDetails
     * @desc Called to load facility details
     * @memberOf Controllers.LaundryDetail
     */
    function loadFacilityDetails(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'Laundry/FacilityInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LaundryID', 'value': ID}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'LaundrySize' },
            { data: 'VehicleCount' },
            { data: 'CustomerServiceID' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editFacilityDetail);                
        };
            
        $timeout(function() {
            oLFTable = $('#facility-details-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#facility-details-data-table');
            DataTableS.onDeleteClick('#facility-details-data-table', function(RefArr) {
                deleteFacilityDetails(RefArr);
            });
        }, 1000);
        $scope.$apply();
    }

    /**
     * @name editFacilityDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function editFacilityDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/FacilityInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                $scope.FacilityInfo = Res['D'];
                $('#customer-service').val(Res['D'].CustomerServiceID).trigger('change.select2');
                $scope.$apply();
                setFaclityFileNames();
            }
        });
    }

     /**
     * @name saveFacilityDetail
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    function saveFacilityDetail(FormFacilityInfo) {
        $scope.FacilityInfo.EndPoint = 'Laundry/FacilityInfo/insertUpdate';
        $scope.FacilityInfo.LaundryID = $scope.LaundryID;

        if (FormFacilityInfo.$valid) {
            if ($scope.LaundryFacility.ExistingInfrastructure == null && $scope.LaundryFacility.FacilityImg == null)
                $scope.LaundryFacility = null;
            Ajax({
                files: $scope.LaundryFacility,
                data: $scope.FacilityInfo,
                success: function(Res) {
                    if (Res['S']) {
                        clearFacilityDetail(FormFacilityInfo);
                        window.alert("Saved successfully!");
                        oLFTable.draw();
                        $scope.$apply();
                    }
                }
            });
        }
    }

    /**
     * @name deleteFacilityDetails
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LaundryDetail
     */
    function deleteFacilityDetails(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickFacilityInfoDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickFacilityInfoDeleteConfirmBoxOk', function(event, obj) {
            $('#check-all-laundry-facility').trigger('click');
            Ajax({
            data: {
                EndPoint: 'Laundry/FacilityInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['D']) {
                    oLFTable.draw();

                    if ($.inArray(parseInt($scope.FacilityInfo.ID), $scope.deleteArray) >= 0) {
                        clearFacilityDetail(FormFacilityInfo);                            
                    }

                    DataTableS.resetDelete('#facility-details-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    // /**
    //  * @name loadContractInfo
    //  * @desc Called to load laundry details
    //  * @memberOf Controllers.LaundryDetail
    //  */
    // function loadContractInfo(ID) {
    //     Ajax({
    //         data: {
    //             EndPoint: 'Laundry/ContractInfo/getDataByID',
    //             ID: ID
    //         },
    //         success: function(Res) {
    //             if (Res['S']) {              
    //                 $scope.ContractInfo = Res['D'];
    //                 var CheckBoxStatus = {Y: true, N: false};
    //                 $scope.ContractInfo.RenewalReminder1 = CheckBoxStatus[$scope.ContractInfo.RenewalReminder1];
    //                 $scope.ContractInfo.RenewalReminder2 = CheckBoxStatus[$scope.ContractInfo.RenewalReminder2];
    //                 $scope.ContractInfo.RenewalReminder3 = CheckBoxStatus[$scope.ContractInfo.RenewalReminder3];
    //                 $timeout(function() {
    //                     $('#invoicing-frequency').val(Res['D'].InvoicingFrequencyID).trigger('change.select2');
    //                 }, 1000);
    //                 $scope.$apply();
    //                 setContractDisplayFileNames();
    //             }
    //         }
    //     });
    // }

    // /**
    //  * @name saveContractInfo
    //  * @desc Called on click of save button
    //  * @memberOf Controllers.LaundryDetail
    //  */
    // function saveContractInfo(FormContractInfo) {
    //     $scope.ContractInfo.EndPoint = 'Laundry/ContractInfo/insertUpdate';
    //     $scope.ContractInfo.LaundryID = $scope.LaundryID;

    //     if (FormContractInfo) {
    //         Ajax({
    //             files: $scope.LaundryContract,
    //             data: $scope.ContractInfo,
    //             success: function(Res) {
    //                 if (Res['S']) {
    //                     window.alert("Saved successfully!");
    //                     backToManagmentPage();
    //                    $scope.$apply(); 
    //                 }
    //             }
    //         });
    //     }
    // }

    function loadContractInfo(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{ orderable: false, targets: [0, 7] }];
        DTProps.fnServerParams = function (aoData) {
            aoData.push(
                { 'name': 'EndPoint', 'value': 'Laundry/ContractInfo/getDataByPage' },
                { 'name': 'JWT', 'value': $rootScope.gvJWT },
                { 'name': 'LaundryID', 'value': ID }
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'LocationName' },
            { data: 'ContractSignedDate' },
            { data: 'DeliveryStartDate' },
            { data: 'DeliveryEndDate' },
            { data: 'ContractType' },
            { data: 'InvoicingFrequency' },
            { data: null, defaultContent: '', class: 'action-column' }
        ];
        DTProps.rowCallback = function (Row, Data) {
            $scope.LaundryContractArr.push(Data);
            if ($scope.LaundryContractArr.length != 0) {
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
     * @memberOf Controllers.LaundryDetail
     */
    function editContractDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/ContractInfo/getDataByID',
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
                    setContractDisplayFileNames();
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveContractInfo
     * @desc Called on click of save button
     * @memberOf Controllers.LaundryDetail
     */
    function saveContractInfo(FormContractInfo) {
        $scope.ContractInfo.EndPoint = 'Laundry/ContractInfo/insertUpdate';
        $scope.ContractInfo.LaundryID = $scope.LaundryID;
        if (FormContractInfo.$valid) {
            Ajax({
                files: $scope.LaundryContract,
                data: $scope.ContractInfo,
                success: function (Res) {
                    if (!Res['S']) {
                        $scope.CNTShowErrorMsg = true;
                        $scope.CNTErrorMsg = Res['M'];
                    } else {
                        // window.alert("Saved successfully!");
                        clearContractInfo(FormContractInfo);
                        $scope.LaundryContractArr = [];
                        oCContTable.draw();
                        $scope.ShowContract();
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
                EndPoint: 'Laundry/ContractInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function (Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LaundryContractArr = [];
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
        if($scope.LaundryContractArr.length == 0){
            $('#CTItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }

    /**
     * @name loadCostingDetails
     * @desc Called to load billing details
     * @memberOf Controllers.LinenDetail
     */
    function loadCostingDetails(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 5]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'Laundry/CostingInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LaundryID', 'value': ID}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'CategoryName' },
            { data: 'ProductName' },
            { data: 'VariantName' },
            { data: 'Cost' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            $scope.LaundryCostingArr.push(Data);
            if ($scope.LaundryCostingArr.length != 0) {
                $timeout(function () {
                    $('#CostItooltips').css({
                        "color": "white",
                        "background-color": "#299d9d",
                        "font-size": "15px",
                        "padding": "6px"
                    })
                }, 500);
            }
            DataTableS.createCheckBoxColumn(Row, Data['ID']);
            DataTableS.createEditActionColumn(5, Row, Data['ID'], editCostingDetail);                
        };
        $timeout(function() {
            oCostTable = $('#costing-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#costing-data-table');
            DataTableS.onDeleteClick('#costing-data-table', function(RefArr) {
                deleteCostingDetail(RefArr);
            });
        },1000);
    }

    /**
     * @name editCostingDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function editCostingDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/CostingInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.CostingInfo = Res['D'];
                    onCategoryChange($scope.CostingInfo.CategoryID);
                    onProductChange($scope.CostingInfo.ProductID);
                    $('#cost-category').val(Res['D'].CategoryID).trigger('change.select2');
                    $('#cost-product').val(Res['D'].ProductID).trigger('change.select2');
                    $('#cost-variant').val(Res['D'].VariantID).trigger('change.select2');
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveLinenCost
     * @desc Called on click of save button
     * @memberOf Controllers.LinenSupplierDetail
     */
    function saveLaundryCost(FormCostingInfo) {
        console.log(FormCostingInfo);
        $scope.CostingInfo.EndPoint = 'Laundry/CostingInfo/insertUpdate';
        console.log($scope.CostingInfo.EndPoint);
        $scope.CostingInfo.LaundryID = $scope.LaundryID;
        if (FormCostingInfo) {
            Ajax({
                data: $scope.CostingInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.CostIShowErrorMsg = true;
                        $scope.CostIErrorMsg = Res['M'];
                    } else {                          
                        clearLaundryCosting(FormCostingInfo);
                        $scope.ShowCosting();
                        $scope.LaundryCostingArr = [];
                        oCostTable.draw();
                    }
                    $scope.$apply(); 
                }
            });
        }
    }

     /**
     * @name deleteCostingDetail
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function deleteCostingDetail(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickCostingInfoDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickCostingInfoDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'Laundry/CostingInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LaundryCostingArr = [];
                    oCostTable.draw();
                    $scope.deleteCosting();
                    DataTableS.resetDelete('#costing-data-table');
                    $scope.deleteArray = [];
                }
            }
        });
    });

    $scope.deleteCosting = function(){
        if($scope.LaundryCostingArr.length == 0){
            $('#CostItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }
    $timeout(function() {
        $('#contact-location').select2({
            placeholder: 'Select a Location',
            allowClear: true,
            width: 'off',
        });
        $('#billing-location').select2({
            placeholder: 'Select a Location',
            allowClear: true,
            width: 'off',
        });
        $('#city-billing').select2({
            placeholder: 'Select a City',
            allowClear: true,
            width: 'off',
        });
        $('#country-billing').select2({
            placeholder: 'Select a Country',
            allowClear: true,
            width: 'off',
        });
        $('#contract-location').select2({
            placeholder: 'Select a Location',
            allowClear: true,
            width: 'off',
        });
        $('#contract-type').select2({
            placeholder: 'Select a Contract type',
            allowClear: true,
            width: 'off',
        });
        $('#payment-terms').select2({
            placeholder: 'Select a Payment Term',
            allowClear: true,
            width: 'off',
        });
        $('#cost-category').select2({
            placeholder: 'Category',
            allowClear: true,
            width: 'off',
        });
        $('#cost-product').select2({
            placeholder: 'Product',
            allowClear: true,
            width: 'off',
        });
        $('#cost-variant').select2({
            placeholder: 'Variant',
            allowClear: true,
            width: 'off',
        });
        $('#country-laundry').select2({
            placeholder: 'Select a country',
            allowClear: true,
            width: 'off',
        });
        setTimeout(function(){
            $('#contact-location').val('').trigger('change.select2');
            $('#billing-location').val('').trigger('change.select2');
            $('#city-billing').val('').trigger('change.select2');
            $('#country-billing').val('').trigger('change.select2');
            $('#contract-location').val('').trigger('change.select2');
            $('#contract-type').val('').trigger('change.select2');
            $('#payment-terms').val('').trigger('change.select2');
            $('#cost-category').val('').trigger('change.select2');
            $('#cost-product').val('').trigger('change.select2');
            $('#cost-variant').val('').trigger('change.select2');
            $('#country-laundry').val('').trigger('change.select2');
        },700);
    }, 500);
    function loadCCLocationDropdown(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/LocationInfo/getAllLocationData',
                ID: ID
            },
            success: function (Res) {
                $scope.LocationList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function loadContractTypeDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/ContractType/getAllData'
            },
            success: function (Res) {
                $scope.ContractTypeList = Res['D'];
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
        $('#city-billing').select2({
            placeholder: 'Select a city',
            allowClear: true,
            width: 'off',
        });
        setTimeout(function(){            
            $('#city').val('').trigger('change.select2');
        },700);

    }
    function loadCityDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/City/getAllData'
            },
            success: function(Res) {
                initCity();
                $scope.CityList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initBICity() {
        $('#bi-city').select2({
            placeholder: 'Select a city',
            allowClear: true,
            width: 'off',
        });
    }
    function loadBICityDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/City/getAllData'
            },
            success: function(Res) {
                initBICity();
                $scope.BICityList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initCountry() {
        $('#country').select2({
            placeholder: 'Select a country',
            allowClear: true,
            width: 'off',
        });
        setTimeout(function(){            
            $('#country').val('').trigger('change.select2');
        },700);
    }
    function loadCountryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Country/getAllData'
            },
            success: function(Res) {
                initCountry();
                $scope.CountryList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initBICountry() {
        $('#bi-country').select2({
            placeholder: 'Select a country',
            allowClear: true,
            width: 'off',
        });
    }
    function loadBICountryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Country/getAllData'
            },
            success: function(Res) {
                initBICountry();
                $scope.BICountryList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initCustomerService() {
        $('#customer-service').select2({
            placeholder: 'Select a customer service',
            allowClear: true,
            width: 'off',
        });
    }
    function loadCustomerServiceDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/CustomerService/getAllData'
            },
            success: function(Res) {
                initCustomerService();
                $scope.TypesOfCustomerServices = Res['D'];
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
        setTimeout(function(){
            $('#invoicing-frequency').val('').trigger('change.select2');
        },700);
    }
    function loadInvoicingFrequencyDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/InvoicingFrequency/getAllData'
            },
            success: function(Res) {
                initInvoicingFrequency();
                $scope.InvoicingFrequencyList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initCurrency() {
        $('#currency').select2({
            placeholder: 'Select a currency',
            allowClear: true,
            width: 'off',
        });
        setTimeout(function(){
            $('#currency').val('').trigger('change.select2');
        },700);
    }
    function loadCurrencyDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Currency/getAllData'
            },
            success: function(Res) {
                initCurrency();
                $scope.CurrencyList = Res['D'];
                $scope.$apply();
            }
        });
    }
    function initDeliveryManager() {
        $('#delivery-manager').select2({
            placeholder: 'Select a DeliveryManager',
            allowClear: true,
            width: 'off',
        });
    }
    function loadDeliveryManagerDropdown() {
        Ajax({
            data: {
                EndPoint: 'Laundry/BasicDetail/getAllDataDelivery'
            },
            success: function(Res) {
                initDeliveryManager();
                $scope.DeliveryManagerList = Res['D'];
                angular.forEach($scope.DeliveryManagerList, function(Item, Index) {
                    if (Item.EmailID == '') {
                        Item.FirstName = Item.FirstName;
                    } else {
                        Item.FirstName = Item.FirstName+' ('+Item.EmailID+')';
                    }
                });
                $scope.$apply();
            }
        });
    }
    $('#asign-laundry').select2({
        placeholder: 'Assign Laundry to a Customer',
        allowClear: true,
        width: 'off',
    });
    $('#laundry-vendor').select2({
        placeholder: 'Select a Laundry Vendor',
        allowClear: true,
        width: 'off',
    });
    function loadLaundryVendorDropdown() {
        Ajax({
            data: {
                EndPoint: 'Laundry/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.LaundryVendorList = Res['D'];
                $scope.$apply();
            }
        });
    }
    $scope.LaundryVendorNameChange = function(ID) {
        Ajax({
            data: {
                EndPoint: 'Laundry/BasicDetail/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S'])
                    $scope.LaundryDetail = Res['D'];
                    $location.url('/laundry/edit-details/' + Res['D']['ID'] + '/edit');
                $scope.$apply();
            }
        });
    }
    $('#category').select2({
        placeholder: 'Category',
        allowClear: true,
        width: 'off',
    });
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
    $('#product').select2({
        placeholder: 'Product',
        allowClear: true,
        width: 'off',
    });
    function loadProductDropdown(CategoryID) {
        $scope.VariantList = [];
        Ajax({
            data: {
                EndPoint: 'Masters/Product/getProductByCategoryID',
                CategoryID: CategoryID
            },
            success: function (Res) {
                $scope.ProductList = Res['D'];
                    $("#product").val('').trigger('change.select2');
                    $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }
    $('#variant').select2({
        placeholder: 'Variant',
        allowClear: true,
        width: 'off',
    });
    function loadVariantDropdown(ProductID) {
        Ajax({
            data: {
                EndPoint: 'Masters/ProductVariant/getVariantByProductID',
                ProductID: ProductID
            },
            success: function (Res) {
                $scope.VariantList = Res['D'];
                $("#variant").val('').trigger('change.select2');
                $scope.$apply();
            }
        });
    }
    function onCategoryChange(ID) {
        loadProductDropdown(ID);
    }

    function onProductChange(ProductID) {
        loadVariantDropdown(ProductID);
    }

     /**
         * @name clearLaundryLocation
         * @desc Called to clear the form, restore the defaults
         * @memberOf Controllers.LaundryDetail
         */
        function clearLaundryLocation(FormLocationInfo) {
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

    /**
     * @name clearLaundryContact
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LaundryDetail
     */
    function clearLaundryContact(FormContactInfo) {
        $scope.CIErrorMsg = '';
        $scope.CIShowErrorMsg = false;
        $scope.HideInviteContact = false;
        $scope.LCSendInviteLabel = 'Send Invite';
        $scope.ContactInfo = {};

        FormContactInfo.$submitted = false;
        FormContactInfo.$setPristine();
        FormContactInfo.$setUntouched();
        $('#contact-location').val('').trigger('change.select2');

    }

    /**
     * @name clearBillingDetail
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LaundryDetail
    */
    function clearBillingDetail(FormBillingInfo) {
        $scope.BIErrorMsg = '';
        $scope.BIShowErrorMsg = false;
        $scope.HideInviteBilling = false;
        $scope.BISendInviteLabel = 'Send Invite';
        $scope.BillingInfo = {};

        FormBillingInfo.$submitted = false;
        FormBillingInfo.$setPristine();
        FormBillingInfo.$setUntouched();
        $('#bi-country').val('').trigger('change.select2');
        $('#bi-city').val('').trigger('change.select2');
        $('#city-billing').val('').trigger('change.select2');
        $('#country-billing').val('').trigger('change.select2');
        $('#billing-location').val('').trigger('change.select2');
    }

    /**
     * @name clearFacilityDetail
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LaundryDetail
     */
    function clearFacilityDetail(FormFacilityInfo) {
        $scope.FacilityInfo = {};
        $scope.LaundryFacility = {FacilityImg: null, ExistingInfrastructure: null};
        // $scope.LaundryImg = true;
        FormFacilityInfo.$submitted = false;
        FormFacilityInfo.$setPristine();
        FormFacilityInfo.$setUntouched();
        $('#customer-service').val('').trigger('change.select2');
        initCustomerService();
		
		FilePicker.displayImage('#facility-logo-ctrl', '');
		FilePicker.displayFileName('#facility-upload-ctrl', '');
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
     * @memberOf Controllers.LaundryDetail
     */
    function clearContractInfo(FormContractInfo) {
        $scope.CNTErrorMsg = '';
        $scope.CNTShowErrorMsg = false;
        $scope.ContractInfo = {};
        // $scope.LaundryContract = { TradeLicenseUpload: null, ContractUpload: null, TaxCertificateUpload: null };

        FormContractInfo.$submitted = false;
        FormContractInfo.$setPristine();
        FormContractInfo.$setUntouched();
        $('#invoicing-frequency').val('').trigger('change.select2');
        $('#contract-location').val('').trigger('change.select2');
        $('#contract-type').val('').trigger('change.select2');
        $('#payment-terms').val('').trigger('change.select2');
        initInvoicingFrequency();
        FilePicker.displayFileName('#trade-license-ctrl', '');
        FilePicker.displayFileName('#contract-upload-ctrl', '');
        FilePicker.displayFileName('#tax-certificate-ctrl', '');
    }

    /**
     * @name clearLaundryCosting
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LaundryDetail
     */
    function clearLaundryCosting(FormCostingInfo) {
        $scope.CostIErrorMsg = '';
        $scope.CostIShowErrorMsg = false;
        $scope.CostingInfo = {};

        FormCostingInfo.$submitted = false;
        FormCostingInfo.$setPristine();
        FormCostingInfo.$setUntouched();
    }
    
    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf Controllers.LaundryDetail
     */
    function backToManagmentPage() {
        if (!$scope.ChangesSaved) {

        } else
            $location.url('/laundry/laundry-vendor-management');
    }
});
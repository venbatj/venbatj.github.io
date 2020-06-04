angular.module('RAT').controller('RFIDCtrl', function($rootScope, $state, $scope, $location, $timeout, DataTableS, FilePicker, $anchorScroll) {
    var oLBTable;

    $scope.$on('$viewContentLoaded', function() {
        loadCountryDropdown();
        loadBICountryDropdown();
        loadCityDropdown();
        loadBICityDropdown();
        loadInvoicingFrequencyDropdown();
        loadCurrencyDropdown();
        loadDeliveryManagerDropdown();
    });
    
    $scope.RFIDSupplierLogo = null;
    $scope.RFIDSupplierContract = {Contract: null, TradeLicense: null, TaxCertificate: null};

    $scope.CountryList      = [];
    $scope.BICountryList    = [];
    $scope.CityList         = [];
    $scope.BICityList       = [];
    $scope.InvoicingFrequencyList = [];
    $scope.CurrencyList      = [];
    $scope.DeliveryManagerList = [];
    $scope.RFIDContactArr = [];
    $scope.RFIDBillingArr = [];

    $scope.BasicDetail = {};
    $scope.BillingInfo = {};
    $scope.ContractInfo = {};
    $scope.FormContractInfo = {};
    $scope.FormContactInfo = {};
    $scope.ContactInfo = {};
    $scope.FormBillingInfo = {};

    $scope.LDShowErrorMsg = false;
    $scope.BIShowErrorMsg = false;
    $scope.FIShowErrorMsg = false;
    $scope.LIShowErrorMsg = false;
    $scope.CIShowErrorMsg = false;
    $scope.CNTShowErrorMsg = false;
    $scope.ChangesSaved = true;
    $scope.AddPage = true;

    $scope.LSDErrorMsg = '';
    $scope.BIErrorMsg = '';

    $scope.RFIDSupplierID = 0;
    $scope.BISendInviteLabel = 'Send Invite';
    $scope.LCSendInviteLabel = 'Send Invite';

    $scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
    };

    if ($state.params != null && $state.params.RFIDSupplierID != null && $state.params.RFIDSupplierID > 0)
        $scope.RFIDSupplierID = $state.params.RFIDSupplierID;
    
    if ($scope.RFIDSupplierID > 0) {
        $scope.AddPage = false;
        loadRFIDSupplierDetail($scope.RFIDSupplierID);
        loadContractInfo($scope.RFIDSupplierID);
        $timeout(function() {
            loadRelationalData($scope.RFIDSupplierID);
        }, 1000);
    }

    if ($scope.RFIDSupplierID > 0) {
        if ($scope.BillingInfo.BCSendInviteY =0) {
            $scope.DisableSendInvite=true;
        }
    }

    $scope.saveRFIDSupplier      = saveRFIDSupplier;
    $scope.saveBillingDetail    = saveBillingDetail;
    $scope.saveRFIDSupplierContact = saveRFIDSupplierContact;
    $scope.saveContractInfo     = saveContractInfo;
    $scope.InputMask            = InputMask;
    $scope.initLogoPicker       = initLogoPicker;
    $scope.initContractUpload   = initContractUpload;
    $scope.initTradeLicense     = initTradeLicense;
    $scope.initTaxCertificate   = initTaxCertificate;
    $scope.clearBillingDetail   = clearBillingDetail;
    $scope.clearRFIDSupplierContact = clearRFIDSupplierContact;
    $scope.clearContractInfo    = clearContractInfo;
    $scope.clearBasicDetail     = clearBasicDetail;
    $scope.backToManagmentPage  = backToManagmentPage;
    
    $scope.paste = function(e){
        e.preventDefault();
        return false
     }

    function initLogoPicker() {
        FilePicker.imageSelector('#rfid-supplier-logo-ctrl', function(image) {
            $scope.RFIDSupplierLogo = {Logo: image};
        }, function() {
            $scope.RFIDSupplierLogo = null;
        });
    }
    function initContractUpload() {
        FilePicker.fileSelector('#contract-upload-ctrl', function(file) {
            $scope.RFIDSupplierContract.Contract = file;
        }, function() {
            $scope.RFIDSupplierContract.Contract = null;
        });

        if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '')
            FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
    }
    function initTradeLicense() {
        FilePicker.fileSelector('#trade-license-ctrl', function(file) {
            $scope.RFIDSupplierContract.TradeLicense = file;
            $scope.ContractInfo.RMTradeLicense = 'N';
        }, function() {
            $scope.RFIDSupplierContract.TradeLicense = null;
            $scope.ContractInfo.RMTradeLicense = 'Y';
        });

        if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
            FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
    }
    function initTaxCertificate() {
        FilePicker.fileSelector('#tax-certificate-ctrl', function(file) {
            $scope.RFIDSupplierContract.TaxCertificate = file;
            $scope.ContractInfo.RMTaxCertificate = 'N';
        }, function() {
            $scope.RFIDSupplierContract.TaxCertificate = null;
            $scope.ContractInfo.RMTaxCertificate = 'Y';
        });

        if ($scope.ContractInfo.TaxCertificateUpload != null && $scope.ContractInfo.TaxCertificateUpload != '')
            FilePicker.displayFileName('#tax-certificate-ctrl', $scope.ContractInfo.TaxCertificateUpload);
    }
    function setFileNames() {
        if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '')
            FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
        if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
            FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
        if ($scope.ContractInfo.TaxCertificateUpload != null && $scope.ContractInfo.TaxCertificateUpload != '')
            FilePicker.displayFileName('#tax-certificate-ctrl', $scope.ContractInfo.TaxCertificateUpload);
    }

    // function InputMask() {
    //     $("#ContractSignedDate").inputmask("mm-dd-yyyy",{placeholder:"mm-dd-yyyy"})
    // }

    function InputMask() {
        $timeout(function () {
            $('#calendar').click(function () {
                $("#ContractSignedDate").datepicker({ format: 'dd M yyyy', }).focus();
            });
        }, 700)
    }

    $scope.InputMask();

    function loadRelationalData(ID) {
    loadContactsDetails(ID);
    loadBillingDetails(ID);
    }

    $scope.showBasicDetails = function() {
        $('#basicDetails').modal('show');
    }
    $scope.showCantact = function() {
        $('#contactInfo').modal('show');
    }
    $scope.showBilling = function() {
        $('#billingInfo').modal('show');
    }
    $scope.showContract = function() {
        $('#contract-popup').modal('show');
    }

    $scope.ContactInform = function () {
        $location.hash('contact-info');
        $anchorScroll();
    }
    $scope.BillingInform = function () {
        $location.hash('billing-info');
        $anchorScroll();
    }
    $scope.ContractInform = function () {
        $location.hash('contract-info');
        $anchorScroll();
    }
    $scope.onEdit = function () {
        window.scrollTo(0, 0);
    }

    /**
     * @name loadRFIDSupplierDetail
     * @desc Called to load RFID Supplier details
     * @memberOf Controllers.RFIDCtrl
     */
    function loadRFIDSupplierDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/BasicDetail/getDataByID',
                ID: ID
            },
            success: function(Res) {
                console.log(Res);
                if (Res['S']) {
                    $scope.BasicDetail = Res['D'];
                    $timeout(function(){
                    $('#delivery-manager').val(Res['D'].DeliveryManager).trigger('change.select2');
                    $('#city').val(Res['D'].CityID).trigger('change.select2');
                    $('#country').val(Res['D'].CountryID).trigger('change.select2');
                    $('#currency').val(Res['D'].Currency).trigger('change.select2');
                    },1000);
                    $scope.$apply();
                    if ($scope.BasicDetail.LogoDisplay != null && $scope.BasicDetail.LogoDisplay != '')
                        FilePicker.displayImage('#rfid-supplier-logo-ctrl', $scope.BasicDetail.LogoDisplay);
                
                }
            }
        });
    }

    /**
     * @name saveRFIDSupplier
     * @desc Called on click of save button
     * @memberOf Controllers.RFIDCtrl
     */
    function saveRFIDSupplier(BasicDetail) {
        console.log(BasicDetail);
        $scope.BasicDetail.EndPoint = 'RFIDSupplier/BasicDetail/insertUpdate';
        if (BasicDetail) {
            Ajax({
                files: $scope.RFIDSupplierLogo,
                data: $scope.BasicDetail,
                success: function(Res) {
                console.log(Res);
                if (!Res['S']) {
                    $scope.LSDShowErrorMsg = true;
                    $scope.LSDErrorMsg = Res['M'];
                } else {
                    $scope.RFIDSupplierID = Res['D'];
                    // window.alert("Saved Succesfully");
                    $scope.showBasicDetails();
                if ($scope.AddPage)
                    loadRelationalData($scope.RFIDSupplierID);
                    }                            
                    $scope.$apply();    
                }
            });
        }
    }

    /**
     * @name loadContactsDetails
     * @desc Called to load contacts
     * @memberOf Controllers.RFIDCtrl
     */
    function loadContactsDetails(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'RFIDSupplier/ContactInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'RFIDSupplierID', 'value': ID}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'Name' },
            { data: 'EmailID' },
            { data: 'Phone' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            $scope.RFIDContactArr.push(Data);
                if ($scope.RFIDContactArr.length != 0) {
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
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editRFIDSupplierContact);                
        };
        $timeout(function() {
            oLCTable = $('#rfid-supplier-contact-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#rfid-supplier-contact-data-table');
            DataTableS.onDeleteClick('#rfid-supplier-contact-data-table', function(RefArr) {
                deleteRFIDSupplierContact(RefArr);
            });
        }, 1000);
    }

    /**
     * @name editRFIDSupplierContact
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.RFIDCtrl
     */
    $scope.HideInviteContact = false;
    function editRFIDSupplierContact(ID) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/ContactInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.ContactInfo = Res['D'];
                    if ($scope.ContactInfo.SendInvite == 'N'){
                        $scope.HideInviteContact = false;
                        $scope.LCSendInviteLabel = 'Send Invite';
                    } else {
                        $scope.HideInviteContact = false;
                        $scope.LCSendInviteLabel = 'Resend Invite';
                    }
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveRFIDSupplierContact
     * @desc Called on click of save button
     * @memberOf Controllers.RFIDCtrl
     */
    function saveRFIDSupplierContact(FormContactInfo) {
        $scope.ContactInfo.EndPoint = 'RFIDSupplier/ContactInfo/insertUpdate';
        $scope.ContactInfo.ContactForRef = $scope.RFIDSupplierID;
        if (FormContactInfo) {
            Ajax({
                data: $scope.ContactInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.LIShowErrorMsg = true;
                        $scope.LIErrorMsg = Res['M'];
                    } else {                          
                        clearRFIDSupplierContact(FormContactInfo);
                        $scope.RFIDContactArr = [];
                        $scope.showCantact();
                        oLCTable.draw();
                    }
                    $scope.$apply(); 
                }
            });
        }
    }

    /**
     * @name deleteRFIDSupplierContact
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.RFIDCtrl
     */
    function deleteRFIDSupplierContact(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickContactInfoDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickContactInfoDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/ContactInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.RFIDContactArr = [];
                    oLCTable.draw();
                    $scope.deleteContact();
                    if ($.inArray(parseInt($scope.ContactInfo.ID), $scope.deleteArray) >= 0) {
                        clearRFIDSupplierContact();                            
                    }

                    DataTableS.resetDelete('#rfid-supplier-contact-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    $scope.deleteContact = function() {
        if($scope.RFIDContactArr.length == 0){
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
     * @memberOf Controllers.RFIDCtrl
     */
    function loadBillingDetails(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'RFIDSupplier/BillingInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'RFIDSupplierID', 'value': ID}
            );
        };
        DTProps.order = [];
        DTProps.columns = [
            { data: null, defaultContent: '', class: 'check-box-column' },
            { data: 'Name' },
            { data: 'EmailID' },
            { data: 'Phone' },
            { data: null, defaultContent: '', class: 'action-column'}
        ];
        DTProps.rowCallback = function(Row, Data) {
            $scope.RFIDBillingArr.push(Data);
            if ($scope.RFIDBillingArr.length != 0) {
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
                deleteBillingDetail(RefArr);
            });
        },1000);
    }

    /**
     * @name editBillingDetail
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.RFIDCtrl
     */
    $scope.HideInvite = false;
    function editBillingDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/BillingInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.BillingInfo = Res['D'];

                if ($scope.BillingInfo.SendInvite == 'N'){
                    $scope.HideInvite = false;
                    $scope.BISendInviteLabel = 'Send Invite';
                } else {
                    $scope.HideInvite = false;
                    $scope.BISendInviteLabel = 'Resend Invite';
                }
                    console.log($scope.BillingInfo);
                    $('#bi-country').val(Res['D'].CountryID).trigger('change.select2');
                    $('#bi-city').val(Res['D'].CityID).trigger('change.select2');
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveBillingDetail
     * @desc Called on click of save button
     * @memberOf Controllers.RFIDCtrl
     */
    function saveBillingDetail(FormBillingInfo) {
        $scope.BillingInfo.EndPoint = 'RFIDSupplier/BillingInfo/insertUpdate';
        $scope.BillingInfo.SourceRefID = $scope.RFIDSupplierID;

        if (FormBillingInfo.$valid) {
            Ajax({
                data: $scope.BillingInfo,
                success: function(Res) {
                    console.log(Res);
                    if (!Res['S']) {
                        $scope.BIShowErrorMsg = true;
                        $scope.BIErrorMsg = Res['M'];
                    } else {
                        $scope.RFIDBillingArr = [];
                        clearBillingDetail(FormBillingInfo);
                        $scope.showBilling();
                        oLBTable.draw();
                    }
                    $scope.$apply();    
                }
            });
        }
    }

    /**
     * @name deleteBillingDetail
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.RFIDCtrl
     */
    function deleteBillingDetail(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickBillingInfoDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickBillingInfoDeleteConfirmBoxOk', function(event, obj) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/BillingInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.RFIDBillingArr = [];
                    oLBTable.draw();
                    $scope.deleteBilling();
                if ($.inArray(parseInt($scope.BillingInfo.ID), $scope.deleteArray) >= 0) {
                    clearBillingDetail();                            
                    }
                    DataTableS.resetDelete('#billing-details-data-table');
                    $scope.deleteArray = [];
                }
            }
        });
    });

    $scope.deleteBilling = function(){
        if($scope.RFIDBillingArr.length == 0){
            $('#BItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }

    /**
     * @name loadContractInfo
     * @desc Called to load Contract details
     * @memberOf Controllers.RFIDCtrl
     */
    function loadContractInfo(ID) {
        Ajax({
            data: {
                EndPoint: 'RFIDSupplier/ContractInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                console.log(Res);
                if (Res['S']) {
                    $scope.ContractInfo = Res['D'];
                    $timeout(function() {
                        $('#invoicing-frequency').val(Res['D'].InvoicingFrequencyID).trigger('change.select2');
                    }, 1000);   
                    setFileNames();
                    if($scope.ContractInfo.RFIDSupplierID > 0  ){
                        $('#CNTtooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }
                    $scope.$apply();
                }
            }
        });
    }

    /**
     * @name saveContractInfo
     * @desc Called on click of save button
     * @memberOf Controllers.RFIDCtrl
     */
    function saveContractInfo(FormContractInfo) {
        $scope.ContractInfo.EndPoint = 'RFIDSupplier/ContractInfo/insertUpdate';
        $scope.ContractInfo.RFIDSupplierID = $scope.RFIDSupplierID;

        console.log( $scope.ContractInfo);
        if (FormContractInfo) {
            Ajax({
                files: $scope.RFIDSupplierContract,
                data: $scope.ContractInfo,
                success: function(Res) {
                    console.log(Res);
                    if (Res['S']) {
                        // $scope.CIDShowErrorMsg = true;
                        // $scope.CIDErrorMsg = Res['M'];
                        $scope.showContract();
                        backToManagmentPage();
                        $scope.$apply();    
                    }                            
                }
            });
        }
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
            placeholder: 'Select a Delivery Manager',
            allowClear: true,
            width: 'off',
        });
    }

    function loadDeliveryManagerDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllDataDelivery'
            },
            success: function(Res) {
                initDeliveryManager();
                $scope.DeliveryManagerList = Res['D'];
                angular.forEach($scope.DeliveryManagerList, function(Item, Index) {
                    if(Item.EmailID == "") {
                        Item.FirstName = Item.FirstName;
                    } else {
                        Item.FirstName = Item.FirstName+" ("+Item.EmailID+")";
                    }
                
                });
                $scope.$apply();
            }
        });
    }

    /**
     * @name clearBasicDetail
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.BasicDetail
     */
    function clearBasicDetail(FormBasicDetail) {
        $scope.BasicDetail = {};

        FormBasicDetail.$submitted = false;
        $scope.deleteArray.IDArray = false;
        FormBasicDetail.$setPristine();
        FormBasicDetail.$setUntouched();
    }
    
    /**
     * @name clearBillingDetail
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.RFIDCtrl
     */
    function clearBillingDetail(FormBillingInfo) {
        $scope.BIErrorMsg = '';
        $scope.BIShowErrorMsg = false;
        $scope.BillingInfo.SendInvite = {};

        $scope.BillingInfo = {};

        $scope.HideInvite = false;
        FormBillingInfo.$submitted = false;
        FormBillingInfo.$setPristine();
        FormBillingInfo.$setUntouched();
        $("#bi-country").val('').trigger('change.select2');
        initBICountry();
        $("#bi-city").val('').trigger('change.select2');
        initBICity();
    }

    /**
     * @name clearRFIDSupplierContact
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.RFIDCtrl
     */
    function clearRFIDSupplierContact(FormContactInfo) {
        $scope.CIErrorMsg = '';
        $scope.LIShowErrorMsg = false;
        $scope.HideInviteContact = false;
        $scope.LCSendInviteLabel = 'Send Invite';
    // $scope.ContactInfo.SendInvite = {};
        $scope.ContactInfo = {};

        FormContactInfo.$submitted = false;
        FormContactInfo.$setPristine();
        FormContactInfo.$setUntouched();
    }

    /**
     * @name clearContractInfo
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.RFIDCtrl
     */
    function clearContractInfo(FormContractInfo) {
        $scope.CNTErrorMsg = '';
        $scope.CNTShowErrorMsg = false;
        $scope.ContractInfo = {};

        FormContractInfo.$submitted = false;
        FormContractInfo.$setPristine();
        FormContractInfo.$setUntouched();
        $("#invoicing-frequency").val('').trigger('change.select2');
        initInvoicingFrequency();
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf Controllers.RFIDCtrl
     */

    function backToManagmentPage() {
        // if (!$scope.ChangesSaved) {

        // } else {
            $location.url('/rfid/rfid-supplier-management');
        // }
    }
});
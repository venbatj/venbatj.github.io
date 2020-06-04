angular.module('RAT').controller('LinenCtrl', function($rootScope, $state, $scope, $location, $timeout, DataTableS, FilePicker, $anchorScroll) {
    var oLBTable;
    var oCostTable;
    $scope.ImportFile = null;

    $scope.$on('$viewContentLoaded', function() {
        loadCountryDropdown();
        loadBICountryDropdown();
        loadCityDropdown();
        loadBICityDropdown();
        loadInvoicingFrequencyDropdown();
        loadCurrencyDropdown();
        loadDeliveryManagerDropdown();
        loadLinenSupplierDropdown();
        loadCategoryDropdown();
    });

    $scope.LinenLogo = null;
    $scope.LinenSupplierContract = {Contract: null, TradeLicense: null, TaxCertificate: null};

    $scope.CountryList      = [];
    $scope.BICountryList    = [];
    $scope.CityList         = [];
    $scope.BICityList       = [];
    $scope.InvoicingFrequencyList = [];
    $scope.CurrencyList      = [];
    $scope.DeliveryManagerList = [];
    $scope.LinenSupplierList = [];
    $scope.CategoryList = [];
    $scope.LinenBillingArr =[];
    $scope.LinenContactArr =[];
    $scope.ProductList = [];
    $scope.VariantList = [];
    $scope.LinenSupplierData = [];
    $scope.LinenSupplierData1 = [];
    $scope.LinenSupplierData2 = [];
    $scope.LinenCostingArr = [];
   
    $scope.BasicDetail = {};
    $scope.ComparelinenSupplier = {};
    $scope.BillingInfo = {};
    $scope.ContractInfo = {};
    $scope.FormContractInfo = {};
    $scope.FormContactInfo = {};
    $scope.ContactInfo = {};
    $scope.FormBillingInfo = {};
    $scope.FrmCompareSuplier = {};
    $scope.CostingInfo = {};

    $scope.LDShowErrorMsg = false;
    $scope.BIShowErrorMsg = false;
    $scope.FIShowErrorMsg = false;
    $scope.LIShowErrorMsg = false;
    $scope.CIShowErrorMsg = false;
    $scope.CNTShowErrorMsg = false;
    $scope.CostIShowErrorMsg = false;
    $scope.ChangesSaved = true;
    $scope.AddPage = true;
    $scope.HideInvite = false;

    $scope.LSDErrorMsg = '';
    $scope.BIErrorMsg = '';
    $scope.CostIErrorMsg = '';

    $scope.AdvanceList = [
        { ID: '', Advance: '--Select--' },
        { ID: 1, Advance: 'Yes' },
        { ID: 2, Advance: 'No' }
    ];

    $scope.ViewCustomerPage = function(ID) {
        $location.url('/linen/linen-details');
    }

    $scope.CompareSuppliers = function() {
        $location.url('/linen/compare-linen-suppliers');
    }

    $scope.LinenSupplierID = 0;
    $scope.CompareSupplier = {};
    $scope.BISendInviteLabel = 'Send Invite';
    $scope.LCSendInviteLabel = 'Send Invite';

    $scope.filterValue = function($event) {
        if(isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    $scope.paste = function(e){
        e.preventDefault();
        return false
    }
    $scope.ContactInform = function () {
        $location.hash('contactinfo');
        $anchorScroll();
    }
    $scope.BillingInform = function () {
        $location.hash('billinginform');
        $anchorScroll();
    }
    $scope.ContractInform = function () {
        $location.hash('contractinfo');
        $anchorScroll();
    }
    $scope.CostingInform = function () {
        $location.hash('cost-info');
        $anchorScroll();
    }
    $scope.onTop = function () {
        window.scrollTo(0, 0);
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
    $scope.ShowContract = function() {
        $('#ContractInfo').modal('show');
    }
    $scope.ShowCosting = function() {
        $('#costing-info').modal('show');
    }

    if ($state.params != null && $state.params.LinenSupplierID != null && $state.params.LinenSupplierID > 0)
        $scope.LinenSupplierID = $state.params.LinenSupplierID;
        
    if ($scope.LinenSupplierID > 0) {
        $scope.AddPage = false;
            loadLinenDetail($scope.LinenSupplierID);
            loadContractInfo($scope.LinenSupplierID);
            $timeout(function() {
            loadRelationalData($scope.LinenSupplierID);
            }, 1000);
        }
    
    if ($scope.LinenSupplierID > 0) {
        if ($scope.BillingInfo.BCSendInviteY = 0)
            $scope.DisableSendInvite=true;
    }

    $scope.saveLinenDetail = saveLinenDetail;
    $scope.saveBillingDetail = saveBillingDetail;
    $scope.saveLinenContact = saveLinenContact;
    $scope.saveContractInfo = saveContractInfo;
    $scope.InputMask = InputMask;
    $scope.initLogoPicker = initLogoPicker;
    $scope.initContractUpload = initContractUpload;
    $scope.initTradeLicense = initTradeLicense;
    $scope.initTaxCertificate = initTaxCertificate;
    $scope.clearBillingDetail = clearBillingDetail;
    $scope.clearLinenContact = clearLinenContact;
    $scope.clearContractInfo = clearContractInfo;
    $scope.backToManagmentPage = backToManagmentPage;
    $scope.onCategoryChange = onCategoryChange;
    $scope.onProductChange = onProductChange;
    $scope.BackIndexPage = BackIndexPage;
    $scope.saveLinenCost = saveLinenCost;
    $scope.clearLinenCosting = clearLinenCosting;
    $scope.reminder = reminder;

    function initLogoPicker() {
        FilePicker.imageSelector('#linen-logo-ctrl', function(image) {
            $scope.LinenLogo = {Logo: image};
        }, function() {
            $scope.LinenLogo = null;
        });
    }
    function initContractUpload() {
        FilePicker.fileSelector('#contract-upload-ctrl', function(file) {
            $scope.LinenSupplierContract.Contract = file;
        }, function() {
            $scope.LinenSupplierContract.Contract = null;
        });

        if ($scope.ContractInfo.ContractUpload != null && $scope.ContractInfo.ContractUpload != '')
            FilePicker.displayFileName('#contract-upload-ctrl', $scope.ContractInfo.ContractUpload);
    }
    function initTradeLicense() {
        FilePicker.fileSelector('#trade-license-ctrl', function(file) {
            $scope.LinenSupplierContract.TradeLicense = file;
            $scope.ContractInfo.RMTradeLicense = 'N';
        }, function() {
            $scope.LinenSupplierContract.TradeLicense = null;
            $scope.ContractInfo.RMTradeLicense = 'Y';
        });

        if ($scope.ContractInfo.TradeLicenseUpload != null && $scope.ContractInfo.TradeLicenseUpload != '')
            FilePicker.displayFileName('#trade-license-ctrl', $scope.ContractInfo.TradeLicenseUpload);
    }
    function initTaxCertificate() {
        FilePicker.fileSelector('#tax-certificate-ctrl', function(file) {
            $scope.LinenSupplierContract.TaxCertificate = file;
            $scope.ContractInfo.RMTaxCertificate = 'N';
        }, function() {
            $scope.LinenSupplierContract.TaxCertificate = null;
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
    
    $scope.CompareData = function() {
        angular.forEach($scope.CategoryList, function(Value, Key) {
            if (Value.ID == $scope.ComparelinenSupplier.CategoryID)
                $scope.ComparelinenSupplier.CategoryName = Value.CategoryName;
            });
        angular.forEach($scope.ProductList, function(Value, Key) {
            if (Value.ID == $scope.ComparelinenSupplier.ProductID)
                $scope.ComparelinenSupplier.ProductName = Value.ProductName;
            });
        angular.forEach($scope.VariantList, function(Value, Key) {
            if (Value.VariantID == $scope.ComparelinenSupplier.VariantID)
                $scope.ComparelinenSupplier.VariantName = Value.VariantName;
        }); 
        angular.forEach($scope.LinenSupplierList, function(Value, Key) {
            if (Value.ID == $scope.ComparelinenSupplier.FirstLinenSupplier){
                $scope.ComparelinenSupplier.FirstLinenSupplier = Value.LinenSupplierName;
            }
        }); 
        angular.forEach($scope.LinenSupplierList, function(Value, Key) {
            if (Value.ID == $scope.ComparelinenSupplier.SecondLinenSupplier)
                $scope.ComparelinenSupplier.SecondLinenSupplier = Value.LinenSupplierName;
        }); 
        angular.forEach($scope.LinenSupplierList, function(Value, Key) {
            if (Value.ID == $scope.ComparelinenSupplier.ThirdLinenSupplier)
                $scope.ComparelinenSupplier.ThirdLinenSupplier = Value.LinenSupplierName;
        }); 
        if($scope.ComparelinenSupplier.FirstLinenSupplier !=undefined){
            $scope.Supplierdata = true;
            $scope.LinenSupplierData.push(angular.copy($scope.ComparelinenSupplier));
        }
        if($scope.ComparelinenSupplier.SecondLinenSupplier !=undefined){
            $scope.linenSup= true;
            $scope.LinenSupplierData1.push(angular.copy($scope.ComparelinenSupplier));
        }
        if($scope.ComparelinenSupplier.ThirdLinenSupplier !=undefined){
            $scope.linenSupplier= true;
            $scope.LinenSupplierData2.push(angular.copy($scope.ComparelinenSupplier));
        }
        // $scope.LinenSupplierData.push(angular.copy($scope.CompareLinenSupplier));
        $("#first-linen-supplier").val('').trigger('change.select2');
        $("#second-linen-supplier").val('').trigger('change.select2');
        $("#third-linen-supplier").val('').trigger('change.select2');
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
        $scope.ComparelinenSupplier = {};
    }

    function InputMask() {
        $timeout(function () {
            $('#calendar').click(function () {
                $("#ContractSignedDate").datepicker({ format: 'dd M yyyy', }).focus();
            });
            $('#start-date').click(function () {
                $("#contract-start-date").datepicker({ format: 'dd M yyyy', }).focus();
            });
            $('#end-date').click(function () {
                $("#contract-end-date").datepicker({ format: 'dd M yyyy', }).focus();
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
            var myDate = new Date($scope.ContractInfo.ContractEndDate);
            var myDate1 = new Date($scope.ContractInfo.ContractStartDate);
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


    /**
     * @name selectFile
     * @desc Called on click of import button
     * @memberOf Controllers.ImportLinen
     */
    $scope.selectFile = function() {
        $('#import-linen .up-btn').click();
    }

    /**
     * @name importInit
     * @desc Called when file input field is created
     * @memberOf Controllers.ImportLinen
     */
    $scope.importInit = function() {
        FilePicker.fileSelector('#import-linen', function(file) {
            $scope.ImportFile = {ImportFile: file};
            importSelectedFile();
        }, function() {
            $scope.ImportFile = null;
        });
    }

    /**
     * @name importSelectedFile
     * @desc Called when after selection of the import file
     * @memberOf Controllers.ImportLinen
     */
    function importSelectedFile() {
        Ajax({
            files: $scope.ImportFile,
            data: {EndPoint: 'LinenSupplier/Import/import'},
            success: function(Res) {
                if (Res['S']) {
                    alert('Import finished successfully');
                    $scope.ImportFile = null;
                    oTable.draw();
                $scope.$apply();    
            }else
                alert('Import finished successfully');
            }
        });
    }

    function loadRelationalData(ID) {
    loadLinenContacts(ID);
    loadBillingDetails(ID);
    loadCostingDetails(ID);
    }

    $scope.CLnCompare = function() {
        $('#linen-compare-category').modal('show');
    }
    $scope.PLnCompare = function() {
        $('#linen-compare-product').modal('show');
    }
    $scope.VLnCompare = function() {
        $('#linen-compare-variant').modal('show');
    }

    $scope.ComparisonData = function(CategoryID, ProductID, VariantID) {
        if ($scope.ComaprisonLinen == undefined) {
            $scope.CLnCompare();
        } else if ($scope.ComaprisonLinen.CategoryID == undefined) {
            $scope.CLnCompare();
        } else if ($scope.ComaprisonLinen.ProductID == undefined) {
            $scope.PLnCompare();
        } else if ($scope.ComaprisonLinen.VariantID == undefined) {
            $scope.VLnCompare();
        } else {
        $location.url('/linen/compare-linen-suppliers-edit/' + CategoryID + '/' + ProductID + '/' + VariantID + '');
        }
    }

    /**
     * @name loadLinenDetail
     * @desc Called to load linen details
     * @memberOf Controllers.LinenDetail
     */
    function loadLinenDetail(ID) {
        $scope.disable = true;
        if($state.params.linenDetail =='view')
            $scope.disable = true;
        if($state.params.linenDetail =='edit')
            $scope.disable = false;
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getDataByID',
                ID: ID
            },
            success: function(Res) {
                console.log(Res['D'].DeliveryManager);
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
                        FilePicker.displayImage('#linen-logo-ctrl', $scope.BasicDetail.LogoDisplay);
                
                }
            }
        });
    }

    /**
     * @name saveLinenDetail
     * @desc Called on click of save button
     * @memberOf Controllers.LinenDetail
     */
    function saveLinenDetail(BasicDetail) {
        $scope.BasicDetail.EndPoint = 'LinenSupplier/BasicDetail/insertUpdate';
        if (BasicDetail) {
            Ajax({
                files: $scope.LinenLogo,
                data: $scope.BasicDetail,
                success: function(Res) {
            if (!Res['S']) {
                    $scope.LSDShowErrorMsg = true;
                    $scope.LSDErrorMsg = Res['M'];
                } else {
                    $scope.LinenSupplierID = Res['D'];
                    $scope.showBasicDetails();
                    if ($scope.AddPage)
                        loadRelationalData($scope.LinenSupplierID);
                    }                            
                    $scope.$apply();    
                }
            });
        }
    }

    /**
     * @name loadContractInfo
     * @desc Called to load linen details
     * @memberOf Controllers.LinenDetail
     */
    function loadContractInfo(ID) {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/ContractInfo/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.ContractInfo = Res['D'];
                    $timeout(function() {
                        $('#invoicing-frequency').val(Res['D'].InvoicingFrequencyID).trigger('change.select2');
                    }, 1000);   
                    if($scope.ContractInfo.LinenSupplierID > 0  ){
                        $('#CTItooltips').css({
                            "color": "white",
                            "background-color": "#299d9d",
                            "font-size": "15px",
                            "padding": "6px"
                        })
                    }
                    $scope.$apply();
                    setFileNames();
                }
            }
        });
    }

    /**
     * @name saveContractInfo
     * @desc Called on click of save button
     * @memberOf Controllers.LinenDetail
     */
    function saveContractInfo(FormContractInfo) {
        $scope.ContractInfo.EndPoint = 'LinenSupplier/ContractInfo/insertUpdate';
        $scope.ContractInfo.LinenSupplierID = $scope.LinenSupplierID;

        console.log( $scope.ContractInfo);
        if (FormContractInfo) {
            Ajax({
                files: $scope.LinenSupplierContract,
                data: $scope.ContractInfo,
                success: function(Res) {
                    console.log(Res);
                    if (Res['S']) {
                        $scope.CIDShowErrorMsg = true;
                        $scope.CIDErrorMsg = Res['M'];
                        $scope.ShowContract();
                        backToManagmentPage();
                        $scope.$apply();    
                    }                            
                }
            });
        }
    }

    /**
     * @name loadBillingDetails
     * @desc Called to load billing details
     * @memberOf Controllers.LinenDetail
     */
    function loadBillingDetails(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'LinenSupplier/BillingInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LinenSupplierID', 'value': ID}
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
            $scope.LinenBillingArr.push(Data);
            if ($scope.LinenBillingArr.length != 0) {
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
     * @memberOf Controllers.LinenDetail
     */
    function editBillingDetail(ID) {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BillingInfo/getDataByID',
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
     * @memberOf Controllers.LinenDetail
     */
    function saveBillingDetail(FormBillingInfo) {
        $scope.BillingInfo.EndPoint = 'LinenSupplier/BillingInfo/insertUpdate';
        $scope.BillingInfo.SourceRefID = $scope.LinenSupplierID;

        if (FormBillingInfo.$valid) {
            Ajax({
                data: $scope.BillingInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.BIShowErrorMsg = true;
                        $scope.BIErrorMsg = Res['M'];
                    } else {
                        clearBillingDetail(FormBillingInfo);
                        $scope.showBilling();
                        $scope.LinenBillingArr = [];
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
     * @memberOf Controllers.LinenDetail
     */
    function deleteBillingDetail(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickBillingInfoDeleteConfirmBoxOk');
    }
    $scope.$on('OnClickBillingInfoDeleteConfirmBoxOk', function(event, obj) {
        // $('#check-all-billing-details').trigger('click');
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BillingInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LinenBillingArr = [];
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
        if($scope.LinenBillingArr.length == 0){
            $('#BItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }

    /**
     * @name loadLinenContacts
     * @desc Called to load linen contacts
     * @memberOf Controllers.LinenDetail
     */
    function loadLinenContacts(ID) {
        var DTProps = DataTableS.getDefaults();
        DTProps.columnDefs = [{orderable: false, targets: [0, 4]}];
        DTProps.fnServerParams = function ( aoData ) {  
            aoData.push(  
                { 'name': 'EndPoint', 'value': 'LinenSupplier/ContactInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LinenSupplierID', 'value': ID}
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
            $scope.LinenContactArr.push(Data);
            if ($scope.LinenContactArr.length != 0) {
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
            DataTableS.createEditActionColumn(4, Row, Data['ID'], editLinenContact);                
        };
        $timeout(function() {
            oLCTable = $('#linen-contact-data-table').DataTable(DTProps);
            DataTableS.checkBoxEvents('#linen-contact-data-table');
            DataTableS.onDeleteClick('#linen-contact-data-table', function(RefArr) {
                deleteLinenContact(RefArr);
            });
        }, 1000);
    }

    /**
     * @name editLinenContact
     * @desc Called on click of edit icon in data table
     * @memberOf Controllers.LinenDetail
     */
    $scope.HideInviteContact = false;
    function editLinenContact(ID) {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/ContactInfo/getDataByID',
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
     * @name saveLinenContact
     * @desc Called on click of save button
     * @memberOf Controllers.LinenSupplierDetail
     */
    function saveLinenContact(FormContactInfo) {
        $scope.ContactInfo.EndPoint = 'LinenSupplier/ContactInfo/insertUpdate';
        $scope.ContactInfo.ContactForRef = $scope.LinenSupplierID;
        if (FormContactInfo) {
            Ajax({
                data: $scope.ContactInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.LIShowErrorMsg = true;
                        $scope.LIErrorMsg = Res['M'];
                    } else {                          
                        clearLinenContact(FormContactInfo);
                        $scope.showCantact();
                        $scope.LinenContactArr = [];
                        oLCTable.draw();
                    }
                    $scope.$apply(); 
                }
            });
        }
    }

    /**
     * @name deleteLinenContact
     * @desc Called on click of delete icon in data table
     * @memberOf Controllers.LinenDetail
     */
    function deleteLinenContact(IDArray) {
        $scope.deleteArray = IDArray;
        $rootScope.DelConfirmBox('OnClickContactInfoDeleteConfirmBoxOk');
    }

    $scope.$on('OnClickContactInfoDeleteConfirmBoxOk', function(event, obj) {
        $('#check-all-linen-contact').trigger('click');
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/ContactInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LinenContactArr = [];
                    oLCTable.draw();
                    $scope.deleteContact();
                    if ($.inArray(parseInt($scope.ContactInfo.ID), $scope.deleteArray) >= 0) {
                        clearLinenContact();                            
                    }

                    DataTableS.resetDelete('#linen-contact-data-table');
                    $scope.deleteArray = [];
                    $scope.$apply();
                }
            }
        });
    });

    $scope.deleteContact = function(){
        if($scope.LinenContactArr.length == 0){
            $('#CItooltips').css({
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
                { 'name': 'EndPoint', 'value': 'LinenSupplier/CostingInfo/getDataByPage'},
                { 'name': 'JWT', 'value': $rootScope.gvJWT},
                { 'name': 'LinenSupplierID', 'value': ID}
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
            $scope.LinenCostingArr.push(Data);
            if ($scope.LinenCostingArr.length != 0) {
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
                EndPoint: 'LinenSupplier/CostingInfo/getDataByID',
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
    function saveLinenCost(FormCostingInfo) {
        $scope.CostingInfo.EndPoint = 'LinenSupplier/CostingInfo/insertUpdate';
        $scope.CostingInfo.LinenSupplierID = $scope.LinenSupplierID;
        if (FormCostingInfo) {
            Ajax({
                data: $scope.CostingInfo,
                success: function(Res) {
                    if (!Res['S']) {
                        $scope.CostIShowErrorMsg = true;
                        $scope.CostIErrorMsg = Res['M'];
                    } else {                          
                        clearLinenCosting(FormCostingInfo);
                        $scope.ShowCosting();
                        $scope.LinenCostingArr = [];
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
                EndPoint: 'LinenSupplier/CostingInfo/remove',
                IDArr: $scope.deleteArray
            },
            success: function(Res) {
                if (Res['S'] && Res['D']) {
                    $scope.LinenCostingArr = [];
                    oCostTable.draw();
                    $scope.deleteCosting();
                    DataTableS.resetDelete('#costing-data-table');
                    $scope.deleteArray = [];
                }
            }
        });
    });

    $scope.deleteCosting = function(){
        if($scope.LinenCostingArr.length == 0){
            $('#CostItooltips').css({
                "color": "black",
                "background-color": "#fff",
                "font-size": "15px",
                "padding": "6px"
            })
        }
    }

    $scope.LinenSupplierChange = function(ID) {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getDataByID',
                ID: ID
            },
            success: function (Res) {
                if (Res['S'])
                    $scope.LinenDetail = Res['D'];
                    $location.url('/linen/edit-details/' + Res['D']['ID'] + '/edit');
                $scope.$apply();
            }
        });
    }
    $timeout(function() {
        $('#advance').select2({
            placeholder: 'Select a Advance',
            allowClear: true,
            width: 'off',
        });
    }, 1000);
    
    $('#first-supplier').select2({
        placeholder: 'Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    $('#second-supplier').select2({
        placeholder: 'Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    $('#third-supplier').select2({
        placeholder: 'Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    $('#linen-supplier').select2({
        placeholder: 'Select a Linen Supplier',
        allowClear: true,
        width: 'off',
    });
    $('#first-linen-supplier').select2({
        placeholder: 'Select a Linen Supplier 1',
        allowClear: true,
        width: 'off',
    });
    $('#second-linen-supplier').select2({
        placeholder: 'Select a Linen Supplier 2',
        allowClear: true,
        width: 'off',
    });
    $('#third-linen-supplier').select2({
        placeholder: 'Select a Linen Supplier 3',
        allowClear: true,
        width: 'off',
    });
    function loadLinenSupplierDropdown() {
        Ajax({
            data: {
                EndPoint: 'LinenSupplier/BasicDetail/getAllData'
            },
            success: function(Res) {
                $scope.LinenSupplierList = Res['D'];
                $scope.$apply();
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
                $scope.$apply();
            }
        });
    }
    function loadBICityDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/City/getAllData'
            },
            success: function(Res) {
                $scope.BICityList = Res['D'];
                $scope.$apply();
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
                $scope.$apply();
            }
        });
    }
    function loadBICountryDropdown() {
        Ajax({
            data: {
                EndPoint: 'Masters/Country/getAllData'
            },
            success: function(Res) {
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
                    if(Item.EmailID=="") {
                        Item.FirstName = Item.FirstName;
                    } else {
                        Item.FirstName = Item.FirstName+" ("+Item.EmailID+")";
                    }
                
                });
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
    $('#category').select2({
        placeholder: 'Category',
        allowClear: true,
        width: 'off',
    });
    $('#product').select2({
        placeholder: 'Product',
        allowClear: true,
        width: 'off',
    });
    setTimeout(function(){
        $('#cost-category').select2({
            placeholder: 'Select a Category',
            allowClear: true,
            width: 'off',
        });
        $('#cost-product').select2({
            placeholder: 'Select a Product',
            allowClear: true,
            width: 'off',
        });
        $('#cost-variant').select2({
            placeholder: 'Select a Variant',
            allowClear: true,
            width: 'off',
        });
        $('#city').select2({
            placeholder: 'Select a city',
            allowClear: true,
            width: 'off',
        });
        $('#country').select2({
            placeholder: 'Select a country',
            allowClear: true,
            width: 'off',
        });
        $('#bi-city').select2({
            placeholder: 'Select a city',
            allowClear: true,
            width: 'off',
        });
        $('#bi-country').select2({
            placeholder: 'Select a country',
            allowClear: true,
            width: 'off',
        });
        $('#city').val('').trigger('change.select2');
        $('#country').val('').trigger('change.select2');
        $("#bi-city").val('').trigger('change.select2');
        $("#bi-country").val('').trigger('change.select2');
        $('#cost-category').val('').trigger('change.select2');
        $('#cost-product').val('').trigger('change.select2');
        $('#cost-variant').val('').trigger('change.select2');
    },1000);
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
     * @name Clearcomparison
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.BasicDetail
     */
    $scope.Clearcomparison = function(FrmCompareSuplier) {
        $scope.LinenSupplierData = [];
        $scope.LinenSupplierData1 = [];
        $scope.LinenSupplierData2 = [];
        $scope.ComparelinenSupplier = {};
        $scope.Supplierdata = false;
        $scope.linenSup = false;
        $scope.linenSupplier = false;
        $("#first-linen-supplier").val('').trigger('change.select2');
        $("#second-linen-supplier").val('').trigger('change.select2');
        $("#third-linen-supplier").val('').trigger('change.select2');
        $("#category").val('').trigger('change.select2');
        $("#product").val('').trigger('change.select2');
        $("#variant").val('').trigger('change.select2');
    }
    
    /**
     * @name clearBillingDetail
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LinenDetail
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
        $("#bi-city").val('').trigger('change.select2');
    }

    /**
     * @name clearLinenContact
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LinenDetail
     */
    function clearLinenContact(FormContactInfo) {
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
     * @memberOf Controllers.LinenDetail
     */
    function clearContractInfo(FormContractInfo) {
        $scope.CNTErrorMsg = '';
        $scope.CNTShowErrorMsg = false;
        $scope.ContractInfo = {};
        $scope.LinenSupplierContract = { TradeLicenseUpload: null, ContractUpload: null, TaxCertificateUpload: null };

        FormContractInfo.$submitted = false;
        FormContractInfo.$setPristine();
        FormContractInfo.$setUntouched();
        $("#invoicing-frequency").val('').trigger('change.select2');
        initInvoicingFrequency();

        FilePicker.displayFileName('#trade-license-ctrl', '');
        FilePicker.displayFileName('#contract-upload-ctrl', '');
        FilePicker.displayFileName('#tax-certificate-ctrl', '');
    }

    /**
     * @name clearLinenCosting
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.LinenDetail
     */
    function clearLinenCosting(FormCostingInfo) {
        $scope.CostIErrorMsg = '';
        $scope.CostIShowErrorMsg = false;
        $scope.CostingInfo = {};
        $('#cost-category').val('').trigger('change.select2');
        $('#cost-product').val('').trigger('change.select2');
        $('#cost-variant').val('').trigger('change.select2');

        FormCostingInfo.$submitted = false;
        FormCostingInfo.$setPristine();
        FormCostingInfo.$setUntouched();
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf Controllers.LinenDetail
     */
    function BackIndexPage() {
        $location.url('/linen/linen');
    }

    /**
     * @name backToManagmentPage
     * @desc Called on click of back button
     * @memberOf Controllers.LinenDetail
     */
    function backToManagmentPage() {
        if (!$scope.ChangesSaved) {

        } else {
        $location.url('/linen/linen-supplier-management');
        }
    }
});
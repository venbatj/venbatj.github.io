angular.module('RAT').controller('DeliveryTechCostAnalysisFormCtrl', function($state, $scope, $location, $timeout,$filter) {
  
    if ($state.params != null && $state.params.DeliveryTechCostAnalysisID != null && $state.params.DeliveryTechCostAnalysisID > 0)
        $scope.DeliveryTechCostAnalysisID = $state.params.DeliveryTechCostAnalysisID;

    $scope.DisableTextBox =false;
    if ($scope.DeliveryTechCostAnalysisID > 0) {
    $scope.DisableTextBox =true;
        $timeout(function() {
        loadRelationalData($scope.DeliveryTechCostAnalysisID);
        }, 1000);
    }
    LoadCostParameters();

    function loadRelationalData(ID) {
        loadDeliveryTechDetails(ID);
    }

    $scope.AnalysisData = {};
    $scope.FormAnalysisData = {};

    $scope.DTErrorMsg = '';
    $scope.DTShowErrorMsg = false;

    $scope.onlyNumbers = /^[1-9]+[0-9]*$/;
        
    $scope.saveDeliveryTechDetails  = saveDeliveryTechDetails;
    $scope.clearDeliveryTechDetails = clearDeliveryTechDetails;
    // $scope.backToManagmentPage      = backToManagmentPage;
    // $scope.InputMask                = InputMask;
    $scope.CalculateDeliveryTechCost= CalculateDeliveryTechCost;
    $scope.LoadCostParameters       = LoadCostParameters;

    // Validation
    $scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
     };
     $scope.isNumberKey = function(evt)
     {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31 
          && (charCode < 48 || charCode > 57))
           return false;

        return true;
     }
    /**
     * @name loadDeliveryTechDetails
     * @desc Called to load DeliveryTechDetails 
     * @memberOf Controllers.DeliveryTechDetails
     */
    function loadDeliveryTechDetails(ID) {
        Ajax({
            data: {
                EndPoint: 'Settings/AnalysisData/getDataByID',
                ID: ID
            },
            success: function(Res) {
                if (Res['S']) {
                    $scope.AnalysisData = Res['D'];
                    $scope.$apply();
                }
            }
        });
    }
    /**
     * @name saveDeliveryTechDetails
     * @desc Called on click of save button
     * @memberOf Controllers.DeliveryTechDetails
     */
    function saveDeliveryTechDetails(isValid) {
        $scope.AnalysisData.EndPoint = 'Settings/AnalysisData/insertUpdate';
            if (isValid) {
            Ajax({
            data: $scope.AnalysisData,
            success: function(Res) {
                if (!Res['S']) {
                    $scope.DTShowErrorMsg = true;
                    $scope.DTErrorMsg = Res['M'];
                } else{
                    $scope.DeliveryTechCostAnalysisID = Res['D'];
                    window.alert('Saved Successfully');
                    loadRelationalData($scope.DeliveryTechCostAnalysisID);
                        $scope.$apply();    
                    }
                }
            });
        }
    }
    function LoadCostParameters() {
        Ajax({
            data: {
                EndPoint: 'Settings/AnalysisData/LoadCostParameters',
            },
            success: function(Res) {
                $scope.CostParameters = Res;
                if (Res['S']) {
                    $scope.AnalysisData = Res['D'];
                    $scope.$apply();     
                }
            }
        });
    }
    // function InputMask() {
    //     $("#EffectiveFrom").inputmask("mm/dd/yyyy",{placeholder:"mm/dd/yyyy"})
    // }
    // $scope.InputMask();

    // $scope.checkErr = function (EffectiveFrom) {
    //     $scope.EffectiveFromerrMessage = '';
    //     var CurrentDate = new Date();
    //         if (new Date(EffectiveFrom) <= new Date(CurrentDate)) {
    //         $scope.EffectiveFromerrMessage = 'Date can be in the future, Please correct it';
    //     }
    // };
              
    /**
     * @name CalculateDeliveryTechCost
     * @desc Called on click of load Calculate Salary
     * @memberOf Controllers.CalculateDeliveryTechCost
     */
    function CalculateDeliveryTechCost(Selection){
        if (Selection ){
            $timeout(function() {
            $scope.AnalysisData.LDriverSalary = Math.round($scope.AnalysisData.BDriverSalary*(1+$scope.CostParameters.BenefitsOverheads/100));
            $scope.AnalysisData.LFuelCostMaintenance =$scope.AnalysisData.BFuelCostMaintenance;
            $scope.AnalysisData.LVanEMIInsurance =$scope.AnalysisData.BVanEMIInsurance;
            $scope.AnalysisData.LocationCountInternalTeam =$scope.AnalysisData.LocationCountOPSTeam;
            $scope.AnalysisData.LocationCountLaundryTeam =$scope.AnalysisData.LocationCountOPSTeam/2;
            $scope.AnalysisData.LOpsCoordinatorSalary = Math.round($scope.AnalysisData.BOpsCoordinatorSalary*(1+$scope.CostParameters.BenefitsOverheads/100));
            $scope.AnalysisData.ITReaderCostRFID = Math.round($scope.AnalysisData.ICReaderCostRFID*($scope.CostParameters.DollarConversionRate));
            $scope.AnalysisData.ITTablet = Math.round($scope.AnalysisData.ICTablet*($scope.CostParameters.DollarConversionRate));
            $scope.AnalysisData.ITTotalTechCost = Math.round($scope.AnalysisData.ICTotalTechCost*($scope.CostParameters.DollarConversionRate));
            $scope.AnalysisData.TotalDeliveryCost =  Math.round((Number($scope.AnalysisData.LDriverSalary)+Number($scope.AnalysisData.LOpsCoordinatorSalary)
                +Number($scope.AnalysisData.LVanEMIInsurance)+Number($scope.AnalysisData.LFuelCostMaintenance))/(Number($scope.AnalysisData.LocationCountOPSTeam)*30));
            }, 100);                          
        }
    }    
    $scope.CheckTypeValue = function (type){
            $timeout(function() {
            $scope.AnalysisData.TechCost = Math.round((($scope.AnalysisData.ITTotalTechCost / $scope.AnalysisData.LocationCountOPSTeam)+
                ($scope.AnalysisData.ITTotalTechCost / $scope.AnalysisData.LocationCountOPSTeam)+($scope.AnalysisData.BinCost*$scope.AnalysisData.BinCount*$scope.CostParameters.DollarConversionRate))/30);
        
            }, 1000);        
    }
    /**
     * @name clearDeliveryTechDetails
     * @desc Called to clear the form, restore the defaults
     * @memberOf Controllers.AnalysisData
     */
     function clearDeliveryTechDetails() {
        $scope.DTErrorMsg = '';
        $scope.DTShowErrorMsg = false;
        $scope.AnalysisData = {};

        $scope.FormAnalysisData.$submitted = false;
        $scope.FormAnalysisData.$setPristine();
        $scope.FormAnalysisData.$setUntouched();
        // backToManagmentPage();
    }
    // /**
    //  * @name backToManagmentPage
    //  * @desc Called on click of back button
    //  * @memberOf Controllers.AnalysisData
    //  */
    // function backToManagmentPage() {
    //     $location.url('/settings/delivery-tech-cost-analysis');
    // }
});
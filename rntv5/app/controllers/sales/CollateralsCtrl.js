/**
 * Customer Detail Controller
 * @namespace Controllers
 */
(function() {
    'use strict';

    angular.module('RAT').controller('CollateralsCtrl', Collaterals);
        
    /**
     * @namespace Collaterals
     * @desc Customer Detail Controller
     * @memberOf Controllers
     */
    function Collaterals($rootScope, $state, $scope, $location, $timeout, DataTableS, FilePicker, ChannelS, $filter) {
        $scope.$on('$viewContentLoaded', function() {
            
        });

        $scope.initContractTemplate = initContractTemplate;

        function initContractTemplate() {
            FilePicker.fileSelector('#upload-contract-temp', function(file) {
                $scope.CollateralsUpload.ContractTemplate = file;
            }, function() {
                $scope.CollateralsUpload.ContractTemplate = null;
            });
            if ($scope.Collaterals.ContractTemplate != null && $scope.Collaterals.ContractTemplate != '')
                FilePicker.displayFileName('#upload-contract-temp', $scope.Collaterals.ContractTemplate);
        }
    }
})();
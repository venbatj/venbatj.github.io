angular.module('RAT').controller('DeliveryProjectPlanCtrl', function($rootScope, $scope, $location) {
    
    $scope.$on('$viewContentLoaded', function() {   
        
    $scope.BackManagement = function(){
        $location.url('/delivery/delivery');        
    }
	});
    
});
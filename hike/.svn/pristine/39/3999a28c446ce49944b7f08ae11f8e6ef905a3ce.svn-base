angular.module('RAT').controller('AppCtrl', function($rootScope, $scope) {
    
    //console.log($stateParams);
    $scope.$on('$viewContentLoaded', function() {   
        
	});
    
    $scope.SideMenuArray = [
        {
            ID: 1,
            MenuName: 'Dashboard',
            Icon: 'icon-home',
            Path: '/app',
            Child: []
        },
        {
            ID: 2,
            MenuName: 'Masters',
            Icon: 'icon-user',
            Path: '',
            Child: [
                {
                    ID: 3,
                    MenuName: 'Category',
                    Icon: '',
                    Path: '/maters/category',
                    Child: []
                },
                {
                    ID: 4,
                    MenuName: 'City',
                    Icon: '',
                    Path: '/maters/city',
                    Child: []
                }
            ]
        }
    ];
});
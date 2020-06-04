angular.module('RAT').controller('ReportCtrl', function($rootScope, $scope, $location) {

    $scope.salesReportPage = function() {
        $location.url('/sales/sales-report/');
    }
    $scope.inventoryReportPage = function() {
        $location.url('/inventory/inventory-report');
    }
    $scope.billingReportPage = function() {
        $location.url('/sales/billing-report');
    }
    $scope.collectionReportPage = function() {
        $location.url('/sales/collection-report');
    }
    $scope.deliveryReportPage = function() {
        $location.url('/sales/delivery-report');
    }
    $scope.salesTroubleTicketPage = function() {
        $location.url('/manage/sales-trouble-ticket');
    }
    $scope.customerFeedbackPage = function() {
        $location.url('/customer/customer-feedback');
    }
    $scope.customerTroubleTicketPage = function() {
        $location.url('/customer/customer-trouble-ticket');
    }
    $scope.laundryVendorReportPage = function() {
        $location.url('/laundry/laundry-vendor-report');
    }
    $scope.linenSupplierReportPage = function() {
        $location.url('/linen/linen-supplier-report');
    }
    
});
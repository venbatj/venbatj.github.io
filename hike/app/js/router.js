

/* Setup Rounting For All Pages */
RAT.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/app');    
    //$locationProvider.html5Mode(true);    
    $stateProvider

    /* DASHBOARD MENU START */
    .state('APP', {
        MenuKey     : 'APP',
        url         : '/app',
        templateUrl : 'views/app.html',                        
        data        : { pageTitle : 'Dashboard' },
        controller  : 'AppCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/masters/CategoryCtrl.js',
                    ] 
                });
            }]
        } 
    })
	
	
	//Sales
	.state('BillingReport', {
        url         : '/sales/billing-report',
        templateUrl : 'views/sales/billing-report.html',                        
        data        : { pageTitle : 'Billing Report' },
        controller  : 'BillingReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/BillingReportCtrl.js',
                    ]
                });
            }]
        }
    })
	
    //Sales - Collection Report
	.state('Collection Report', {
        url         : '/sales/collection-report',
        templateUrl : 'views/sales/collection-report.html',                        
        data        : { pageTitle : 'Collection Report' },
        controller  : 'CollectionReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/CollectionReportCtrl.js',
                    ]
                });
            }]
        }
    })
	
    //Sales - Delivery Report
	.state('Delivery Report', {
        url         : '/sales/delivery-report',
        templateUrl : 'views/sales/delivery-report.html',                        
        data        : { pageTitle : 'Delivery Report' },
        controller  : 'DeliveryReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/DeliveryReportCtrl.js',
                    ]
                });
            }]
        }
    })

    //Sales - Prospect
	.state('Sales-Prospect', {
        url         : '/sales/prospect',
        templateUrl : 'views/sales/prospect.html',                        
        data        : { pageTitle : 'Prospect' },
        controller  : 'ProspectCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/ProspectCtrl.js',
                    ]
                });
            }]
        }
    })	

    //Sales - Collaterals
	.state('Sales-Collaterals', {
        url         : '/sales/collaterals',
        templateUrl : 'views/sales/collaterals.html',                        
        data        : { pageTitle : 'Collaterals' },
        controller  : 'CollateralsCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/CollateralsCtrl.js',
                    ]
                });
            }]
        }
    })	

     //Sales - Generate Quote
	.state('Sales-GenerateQuote', {
        url         : '/sales/generate-quote',
        templateUrl : 'views/sales/generate-quote.html',                        
        data        : { pageTitle : 'Generate Quote' },
        controller  : 'GenerateQuoteCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/GenerateQuoteCtrl.js',
                    ]
                });
            }]
        }
    })	

    .state('Sales-GenerateQuote-Edit', {
        url         : '/sales/quote-edit-details/:GenerateQuoteID/:Prospect',
        params      :{Prospect : 0},
        templateUrl : 'views/sales/generate-quote.html',                        
        data        : { pageTitle : 'Generate Quote' },
        controller  : 'GenerateQuoteCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/sales/GenerateQuoteCtrl.js',
                    ]
                });
            }]
        } 
    })

    //SAles - GenerateQuoteManagement
	.state('Sales-GenerateQuoteManagement', {
        url         : '/sales/generate-quote-management',
        templateUrl : 'views/sales/generate-quote-management.html',                        
        data        : { pageTitle : 'Generate Quote Management' },
        controller  : 'GenerateQuoteManagement',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/GenerateQuoteManagementCtrl.js',
                    ]
                });
            }]
        }
    })

    //Sales
	.state('Sales', {
        url         : '/sales/sales',
        templateUrl : 'views/sales/sales.html',                        
        data        : { pageTitle : 'Sales' },
        controller  : 'SalesCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/SalesCtrl.js',
                    ]
                });
            }]
        }
    })
	.state('Prospect', {
        url         : '/sales/prospect',
        templateUrl : 'views/sales/prospect.html',                        
        data        : { pageTitle : 'Prospect Report' },
        controller  : 'ProspectCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/ProspectCtrl.js',
                    ]
                });
            }]
        }
    })
    //Manage - SalesManagement
    .state('Sales-Management', {
        url         : '/sales/sales-management',
        templateUrl : 'views/sales/sales-management.html',                        
        data        : { pageTitle : 'Sales Management' },
        controller  : 'SalesManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/sales/SalesManagementCtrl.js',
                    ]
                });
            }]
        } 
    })
	
	//Customer - Management
	.state('Customer-Management', {
        url         : '/customer/customer-management',
        templateUrl : 'views/customer/customer-management.html',                        
        data        : { pageTitle : 'Customer Management' },
        params :{   'CustomerType':0,
                    'AccountManager':0},
                    // 'ContractType': 0,
                    // 'CountryName':0},
        controller  : 'CustomerManagement',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/customer/CustomerManagementCtrl.js',
                    ]
                });
            }]
        }
    })
	//Customer - Management
	.state('Customer-Index', {
        url         : '/customer/customer-index',
        templateUrl : 'views/customer/customer-index.html',                        
        data        : { pageTitle : 'Customer Index' },
        controller  : 'CustomerDetail',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/customer/CustomerDetailCtrl.js',
                    ]
                });
            }]
        }
    })

    //Customer - Import
    .state('Customer-Import', {
        url         : '/customer/import-customer',
        templateUrl : 'views/customer/import-customer.html',                        
        data        : { pageTitle : 'Customer Import' },
        controller  : 'ImportCustomer',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/customer/ImportCustomerCtrl.js',
                    ]
                });
            }]
        }
    })

    //Customer - Detail
    .state('Customer-Details', {
        url         : '/customer/customer-details',
        templateUrl : 'views/customer/customer-detail.html',                        
        data        : { pageTitle : 'Customer Details' },
        controller  : 'CustomerDetail',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/customer/CustomerDetailCtrl.js'
                    ]
                });
            }]
        } 
    })
    .state('Customer-Details-Edit', {
        url         : '/customer/edit-details/:CustomerID/:CustDetail',
        params      :{CustDetail : 0},
        templateUrl : 'views/customer/customer-detail.html',                        
        data        : { pageTitle : 'Customer Details' },
        controller  : 'CustomerDetail',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/customer/CustomerDetailCtrl.js'
                    ]
                });
            }]
        } 
    })

    // Bill Of Materials
    .state('Bill-Of-Materials', {
        url         : '/customer/bill-of-material',
        templateUrl : 'views/customer/bill-of-material.html',                        
        data        : { pageTitle : 'Bill Of Material' },
        controller  : 'CustomerDetail',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/customer/CustomerDetailCtrl.js'
                    ]
                });
            }]
        } 
    })

    //Customer - InviteNew
	.state('InviteNew-Customer', {
        url         : '/customer/invite-new-customer',
        templateUrl : 'views/customer/invite-new-customer.html',                        
        data        : { pageTitle : 'InviteNew Customer' },
        controller  : 'InviteNewCustomerCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/customer/InviteNewCustomerCtrl.js',
                    ]
                });
            }]
        }
    })

     //Customer - Feedback
	.state('Customer-Feedback', {
        url         : '/customer/customer-feedback',
        templateUrl : 'views/customer/customer-feedback.html',                        
        data        : { pageTitle : 'Customer Feedback' },
        controller  : 'CustomerFeedbackCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/customer/CustomerFeedbackCtrl.js',
                    ]
                });
            }]
        }
    })

    //Customer - Trouble Ticket
	.state('Customer-Trouble-Ticket', {
        url         : '/customer/customer-trouble-ticket',
        templateUrl : 'views/customer/customer-trouble-ticket.html',                        
        data        : { pageTitle : 'Customer Trouble Ticket' },
        controller  : 'CustomerTroubleTicketCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/customer/CustomerTroubleTicketCtrl.js',
                    ]
                });
            }]
        }
    })
	
	//Inventory
	.state('Inventory', {
        url         : '/inventory/inventory',
        templateUrl : 'views/inventory/inventory.html',                        
        data        : { pageTitle : 'Inventory' },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })
	
	//Inventory - Index
	.state('Inventory-Index', {
        url         : '/inventory/inventory-index',
        templateUrl : 'views/inventory/inventory-index.html',                        
        data        : { pageTitle : 'Inventory Index' },
        controller  : 'InventoryManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryManagementCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - Customer List
	.state('Inventory-CustomerList', {
        url         : '/inventory/inventory-customer-list',
        templateUrl : 'views/inventory/inventory-customer-list.html',                        
        data        : { pageTitle : 'Inventory Customer List' },
        params      : { 'CustomerName': 0,
                        'LinenSupplierName': 0 },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - Warehouse List
	.state('Inventory-WarehouseList', {
        url         : '/inventory/inventory-warehouse-list',
        templateUrl : 'views/inventory/inventory-warehouse-list.html',                        
        data        : { pageTitle : 'Inventory Warehouse List' },
        params      : { 'WarehouseName': 0,
                        'LinenSupplierName': 0 },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - Customer $ Warehouse List
	.state('Inventory-BothList', {
        url         : '/inventory/inventory-all-list',
        templateUrl : 'views/inventory/inventory-all-list.html',                        
        data        : { pageTitle : 'Inventory All List' },
        params      : { 'CustomerName': 0,
                        'WarehouseName': 0,
                        'LinenSupplierName': 0 },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - PO Request for Customer
	.state('Inventory-POReqCustomer', {
        url         : '/inventory/cust-view-list',
        templateUrl : 'views/inventory/cust-view-list.html',                        
        data        : { pageTitle : 'Customer View' },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - PO Request for Warehouse
	.state('Inventory-POReqWarehouse', {
        url         : '/inventory/ware-view-list',
        templateUrl : 'views/inventory/ware-view-list.html',                        
        data        : { pageTitle : 'Warehouse View' },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - PO Request for Customer And Warehouse
	.state('Inventory-POReqCustomerWarehouse', {
        url         : '/inventory/all-view-list',
        templateUrl : 'views/inventory/all-view-list.html',                        
        data        : { pageTitle : 'Customer And Warehouse View' },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Inventory - Management
	.state('Inventory-Management', {
        url         : '/inventory/inventory-management',
        templateUrl : 'views/inventory/inventory-management.html',                        
        data        : { pageTitle : 'Inventory Management' },
        controller  : 'InventoryManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryManagementCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Add-Inventory', {
        url         : '/inventory/add-inventory',
        templateUrl : 'views/inventory/add-inventory.html',                        
        data        : { pageTitle : 'Add Inventory' },
        controller  : 'InventoryManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryManagementCtrl.js',
                    ]
                });
            }]
        }
    })
	
    //Inventory - Details
	.state('Inventory-Details', {
        url         : '/inventory/inventory-details',
        templateUrl : 'views/inventory/inventory-details.html',                        
        data        : { pageTitle : 'Inventory Details' },
        params :{  'CustomerName': 0,
                    'WarehouseName':0,
                    'LinenSupplierName':0
                },
        controller  : 'InventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Order-RFID', {
        url         : '/inventory/order-rfid',
        templateUrl : 'views/inventory/order-rfid.html',                        
        data        : { pageTitle : 'Order RFID' },
        controller  : 'OrderRFIDCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/OrderRFIDCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Order-RFID-Edit', {
        url         : '/inventory/rfid-edit-details/:InventoryID',
        templateUrl : 'views/inventory/order-rfid.html',                        
        data        : { pageTitle : 'Order RFID' },
        controller  : 'OrderRFIDCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/OrderRFIDCtrl.js',
                    ]
                });
            }]
        }
    })
    // .state('Order-RFID-Management', {
    //     url         : '/inventory/order-rfid-management',
    //     templateUrl : 'views/inventory/order-rfid-management.html',                        
    //     data        : { pageTitle : 'Order RFID Management' },
    //     controller  : 'OrderRFIDManagementCtrl',
    //     resolve     : {
    //         deps : ['$ocLazyLoad', function($ocLazyLoad) {
    //             return $ocLazyLoad.load({
    //                 name         : 'RAT',
    //                 insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                 files        : [
    //                     'css/page/app.css',
    //                     'controllers/inventory/OrderRFIDManagementCtrl.js',
    //                 ]
    //             });
    //         }]
    //     }
    // })

    .state('Inventory-Edit', {
        url         : '/inventory/edit-details/:InventoryID',
        templateUrl : 'views/inventory/inventory-management.html',                        
        data        : { pageTitle : 'Inventory Management' },
        controller  : 'InventoryManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/inventory/InventoryManagementCtrl.js'
                    ]
                });
            }]
        } 
    })

    //SEND INVENTORY
    .state('Inventory-Send', {
        url         : '/inventory/send-inventory',
        templateUrl : 'views/inventory/send-inventory.html',                        
        data        : { pageTitle : 'Inventory Management' },
        controller  : 'SendInventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/SendInventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Inventory-Send-Edit', {
        url         : '/inventory/send-edit-details/:InventoryID',
        templateUrl : 'views/inventory/send-inventory.html',                        
        data        : { pageTitle : 'Send Inventory' },
        controller  : 'SendInventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/SendInventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Inventory-Return-Edit', {
        url         : '/inventory/return-edit-details/:InventoryID',
        templateUrl : 'views/inventory/return-inventory.html',                        
        data        : { pageTitle : 'Return Inventory' },
        controller  : 'ReturnInventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/ReturnInventoryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Inventory-Purge-Edit', {
        url         : '/inventory/purge-edit-details/:InventoryID',
        templateUrl : 'views/inventory/purge-inventory.html',                        
        data        : { pageTitle : 'Purge Inventory' },
        controller  : 'PurgeInventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/PurgeInventoryCtrl.js',
                    ]
                });
            }]
        }
    })

	//Order-Inventory-Customer
	.state('Order-Inventory-Customer', {
        url         : '/inventory/order-edit-details/:InventoryID',
        templateUrl : 'views/inventory/order-inventory-customer.html',                        
        data        : { pageTitle : 'Order Inventory Customer' },
        controller  : 'InventoryCustomerCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryCustomerCtrl.js',
                    ]
                });
            }]
        }
    })
	//Order-Inventory-Warehouse
	.state('Order-Inventory-Warehouse', {
        url         : '/inventory/ware-edit-details/:InventoryID',
        templateUrl : 'views/inventory/order-inventory-warehouse.html',                        
        data        : { pageTitle : 'Order Inventory Warehouse' },
        controller  : 'InventoryWarehouseCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryWarehouseCtrl.js',
                    ]
                });
            }]
        }
    })
	//Order-Inventory-Warehouse
	.state('Add-Inventory-Supplier', {
        url         : '/inventory/add-edit-details/:InventoryID',
        templateUrl : 'views/inventory/add-inventory-supplier.html',                        
        data        : { pageTitle : 'Add Inventory' },
        controller  : 'AddInventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/AddInventoryCtrl.js',
                    ]
                });
            }]
        }
    })

	//Order-Inventory-Customer
	// .state('Order-Inventory-Warehouse', {
    //     url         : '/inventory/order-ware-edit-details/:InventoryID',
    //     templateUrl : 'views/inventory/order-inventory-warehouse.html',                        
    //     data        : { pageTitle : 'Order Inventory For Warehouse' },
    //     controller  : 'InventoryManagementCtrl',
    //     resolve     : {
    //         deps : ['$ocLazyLoad', function($ocLazyLoad) {
    //             return $ocLazyLoad.load({
    //                 name         : 'RAT',
    //                 insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                 files        : [
    //                     'css/page/app.css',
    //                     'controllers/inventory/InventoryManagementCtrl.js',
    //                 ]
    //             });
    //         }]
    //     }
    // })

	
    //Inventory - Order Inventory
	.state('Order-Inventory', {
        url         : '/inventory/order-inventory',
        templateUrl : 'views/inventory/order-inventory.html',                        
        data        : { pageTitle : 'Order Inventory' },
        controller  : 'OrderInventoryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/OrderInventoryCtrl.js',
                    ]
                });
            }]
        }
    })
	
    //Inventory - Order Inventory Details
	.state('Order-Inventory-details', {
        url         : '/inventory/order-inventory-details',
        templateUrl : 'views/inventory/order-inventory-details.html',                        
        data        : { pageTitle : 'Order Inventory' },
        controller  : 'OrderInventoryDetailsCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/OrderInventoryDetailsCtrl.js',
                    ]
                });
            }]
        }
    })
	
    //Inventory - Report
	.state('Inventory-Report', {
        url         : '/inventory/inventory-report',
        templateUrl : 'views/inventory/inventory-report.html',                        
        data        : { pageTitle : 'Inventory Report' },
        params      :{  'CategoryID':0,
                        'ProductID':0,
                        'VariantID':0},
        controller  : 'InventoryReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/inventory/InventoryReportCtrl.js',
                    ]
                });
            }]
        }
    })
	
    //Laundry
	.state('Laundry', {
        url         : '/laundry/laundry',
        templateUrl : 'views/laundry/laundry.html',                        
        data        : { pageTitle : 'Order Report' },
        controller  : 'LaundryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/LaundryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('AssignLaundry', {
        url         : '/laundry/assign-laundry/:AssignLaundryID',
        templateUrl : 'views/laundry/assign-laundry.html',                        
        data        : { pageTitle : 'Assign Laundry' },
        controller  : 'AssignLaundryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/AssignLaundryCtrl.js',
                    ]
                });
            }]
        }
    })
    .state('ChangeLaundry', {
        url         : '/laundry/change-laundry/:AssignLaundryID',
        templateUrl : 'views/laundry/change-laundry.html',                        
        data        : { pageTitle : 'Change Laundry' },
        controller  : 'ChangeLaundryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/ChangeLaundryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('TerminateLaundry', {
        url         : '/laundry/terminate-laundry/:AssignLaundryID',
        templateUrl : 'views/laundry/terminate-laundry.html',                        
        data        : { pageTitle : 'Terminate Laundry' },
        controller  : 'TerminateLaundryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/TerminateLaundryCtrl.js',
                    ]
                });
            }]
        }
    })


    //Laundry - Details
    .state('Laundry-Detail', {
        url         : '/laundry/laundry-details',
        templateUrl : 'views/laundry/laundry-detail.html',                        
        data        : { pageTitle : 'Laundry Detail' },
        controller  : 'LaundryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/LaundryCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Laundry-Details-Edit', {
        url         : '/laundry/edit-details/:LaundryID/:laundryDetail',
        params      :{laundryDetail : 0},
        templateUrl : 'views/laundry/laundry-detail.html',                        
        data        : { pageTitle : 'Laundry Details' },
        controller  : 'LaundryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/laundry/LaundryCtrl.js'
                    ]
                });
            }]
        } 
    })

	
    //Laundry - Vendor Management
    .state('Laundry-Vendor-Management', {
        url         : '/laundry/laundry-vendor-management',
        templateUrl : 'views/laundry/laundry-vendor-management.html',                        
        data        : { pageTitle : 'Laundry Vendor Management' },
        controller  : 'LaundryVendorManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/LaundryVendorManagementCtrl.js',
                    ]
                });
            }]
        }
    })
    //Laundry - Import
    .state('Laundry-Import', {
        url         : '/laundry/import-laundry',
        templateUrl : 'views/laundry/import-laundry.html',                        
        data        : { pageTitle : 'Laundry Import' },
        controller  : 'ImportLaundry',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/ImportLaundryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Laundry - Invite New Laundry Vendor
    .state('Invite-New-Laundry-Vendor', {
        url         : '/laundry/invite-new-laundry-vendor',
        templateUrl : 'views/laundry/invite-new-laundry-vendor.html',                        
        data        : { pageTitle : 'Invite New Laundry Vendor' },
        controller  : 'InviteNewLaundryVendorCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/InviteNewLaundryVendorCtrl.js',
                    ]
                });
            }]
        }
    })

    //Laundry - Compare Laundry Vendors
    .state('Compare-Laundry-Vendors', {
        url         : '/laundry/compare-laundry-vendors',
        templateUrl : 'views/laundry/compare-laundry-vendors.html',                        
        data        : { pageTitle : 'Compare Laundry Vendors' },
        controller  : 'CompareLaundryVendorsCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/CompareLaundryVendorsCtrl.js',
                    ]
                });
            }]
        }
    })

    //Laundry - Compare Laundry Vendors
    .state('Compare-Laundry-Vendors-Edit', {
        url         : '/laundry/compare-laundry-vendors-edit/:CategoryID/:ProductID/:VariantID',
        templateUrl : 'views/laundry/compare-laundry-vendors.html',                        
        data        : { pageTitle : 'Compare Laundry Vendors' },
        controller  : 'CompareLaundryVendorsCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/laundry/CompareLaundryVendorsCtrl.js',
                    ]
                });
            }]
        }
    })
    
    //Linen
	.state('Linen', {
        url         : '/linen/linen',
        templateUrl : 'views/linen/linen.html',                        
        data        : { pageTitle : 'Linen Index Page' },
        controller  : 'LinenCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/LinenCtrl.js',
                    ]
                });
            }]
        }
    })

    //Linen - Details
    .state('Linen-Details', {
        url         : '/linen/linen-details',
        templateUrl : 'views/linen/linen-detail.html',                        
        data        : { pageTitle : 'Linen Detail' },
        controller  : 'LinenCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/LinenCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Linen-Details-Edit', {
        url         : '/linen/edit-details/:LinenSupplierID/:linenDetail',
        params      :{linenDetail : 0},
        templateUrl : 'views/linen/linen-detail.html',                        
        data        : { pageTitle : 'Linen Details' },
        controller  : 'LinenCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/LinenCtrl.js',
                    ]
                });
            }]
        }
    })

    //Linen - Linen Supplier Management
    .state('Linen-Supplier-Management', {
        url         : '/linen/linen-supplier-management',
        templateUrl : 'views/linen/linen-supplier-management.html',                        
        data        : { pageTitle : 'Linen Supplier Management' },
        controller  : 'LinenSupplierManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/LinenSupplierManagementCtrl.js',
                    ]
                });
            }]
        }
    })
    //Linen - Invite New Linen Supplier
    .state('Invite-New-Linen-Supplier', {
        url         : '/linen/invite-new-linen-supplier',
        templateUrl : 'views/linen/invite-new-linen-supplier.html',                        
        data        : { pageTitle : 'Invite New Linen Supplier' },
        controller  : 'InviteNewLinenSupplierCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/InviteNewLinenSupplierCtrl.js',
                    ]
                });
            }]
        }
    })

    //Linen - Linen Supplier Report
    .state('Linen-Supplier-Report', {
        url         : '/linen/linen-supplier-report',
        templateUrl : 'views/linen/linen-supplier-report.html',                        
        data        : { pageTitle : 'Linen Supplier Report' },
        controller  : 'LinenSupplierReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/LinenSupplierReportCtrl.js',
                    ]
                });
            }]
        }
    })

    //Linen - Linen Supplier Comparison
    .state('Linen-Supplier-Comparison', {
        url         : '/linen/compare-linen-suppliers',
        templateUrl : 'views/linen/compare-linen-suppliers.html',                        
        data        : { pageTitle : 'Compare Linen Suppliers' },
        controller  : 'CompareLinenSuppliersCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/CompareLinenSuppliersCtrl.js',
                    ]
                });
            }]
        }
    })

    //Linen - Linen Supplier Comparison
    .state('Linen-Supplier-Comparison-Edit', {
        url         : '/linen/compare-linen-suppliers-edit/:CategoryID/:ProductID/:VariantID',
        templateUrl : 'views/linen/compare-linen-suppliers.html',                        
        data        : { pageTitle : 'Compare Linen Supplier' },
        controller  : 'CompareLinenSuppliersCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/CompareLinenSuppliersCtrl.js',
                    ]
                });
            }]
        }
    })

    //Linen - Import
    .state('Linen-Import', {
        url         : '/linen/import-linen',
        templateUrl : 'views/linen/import-linen.html',                        
        data        : { pageTitle : 'Linen Import' },
        controller  : 'ImportLinen',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/linen/ImportLinenCtrl.js',
                    ]
                });
            }]
        }
    })

    //RFID Supplier
	.state('RFID-Supplier', {
        url         : '/rfid/rfid-supplier',
        templateUrl : 'views/rfid/rfid-supplier.html',                        
        data        : { pageTitle : 'RFID Supplier' },
        controller  : 'RFIDCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/rfid/RFIDCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('RFID-Supplier-Details-Edit', {
        url         : '/rfid/rfid-supplier-edit-details/:RFIDSupplierID',
        templateUrl : 'views/rfid/rfid-supplier.html',                        
        data        : { pageTitle : 'RFID Details' },
        controller  : 'RFIDCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/rfid/RFIDCtrl.js',
                    ]
                });
            }]
        }
    })

    //RFID - RFID Supplier Management
    .state('RFID-Supplier-Management', {
        url         : '/rfid/rfid-supplier-management',
        templateUrl : 'views/rfid/rfid-supplier-management.html',                        
        data        : { pageTitle : 'RFID Management' },
        controller  : 'RFIDManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/rfid/RFIDManagementCtrl.js',
                    ]
                });
            }]
        }
    })

    //Collaborate
    .state('Collaborate', {
        url         : '/collaborate/collaborate',
        templateUrl : 'views/collaborate/collaborate.html',                        
        data        : { pageTitle : 'Collaborate' },
        controller  : 'CollaborateCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/collaborate/CollaborateCtrl.js',
                    ]
                });
            }]
        }
    })

    //Collaborate - Open a Ticket
    .state('Openaticket', {
        url         : '/collaborate/openaticket',
        templateUrl : 'views/collaborate/openaticket.html',                        
        data        : { pageTitle : 'Open a Ticket' },
        controller  : 'OpenaticketCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/collaborate/OpenaticketCtrl.js',
                    ]
                });
            }]
        }
    })

    //Collaborate - Update a Ticket
    .state('Updateaticket', {
        url         : '/collaborate/updateaticket',
        templateUrl : 'views/collaborate/updateaticket.html',                        
        data        : { pageTitle : 'Update a Ticket' },
        controller  : 'UpdateaticketCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/collaborate/UpdateaticketCtrl.js',
                    ]
                });
            }]
        }
    })

    //Collaborate - Ticketing Report
    .state('Ticketing-Report', {
        url         : '/collaborate/ticketing-report',
        templateUrl : 'views/collaborate/ticketing-report.html',                        
        data        : { pageTitle : 'Ticketing Report' },
        controller  : 'TicketingReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/collaborate/TicketingReportCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery
    .state('Delivery', {
        url         : '/delivery/delivery',
        templateUrl : 'views/delivery/delivery.html',                        
        data        : { pageTitle : 'Delivery' },
        controller  : 'DeliveryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/DeliveryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery - Manage Pickup
    .state('Manage-Pickup', {
        url         : '/delivery/manage-pickup',
        templateUrl : 'views/delivery/manage-pickup.html',                        
        data        : { pageTitle : 'Manage Pickup' },
        controller  : 'DeliveryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/DeliveryCtrl.js',
                    ]
                });
            }]
        }
    })
    //Delivery - Schedule Warehouse Pickup
    .state('Schedule Warehouse Pickup', {
        url         : '/delivery/schedule-warehouse',
        templateUrl : 'views/delivery/schedule-warehouse.html',                        
        data        : { pageTitle : 'Schedule Warehouse Pickup' },
        controller  : 'DeliveryCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/DeliveryCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery - Delivery Report
    .state('Delivery-Report', {
        url         : '/delivery/delivery-report',
        templateUrl : 'views/delivery/delivery-report.html',                        
        data        : { pageTitle : 'Delivery Report' },
        controller  : 'DeliveryReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/DeliveryReportCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery - Billing Report
    .state('Billing-Report', {
        url         : '/delivery/billing-report',
        templateUrl : 'views/delivery/billing-report.html',                        
        data        : { pageTitle : 'Billing Report' },
        controller  : 'BillingReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/BillingReportCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery - Collection Report
    .state('Collection-Report', {
        url         : '/delivery/collection-report',
        templateUrl : 'views/delivery/collection-report.html',                        
        data        : { pageTitle : 'Collection Report' },
        controller  : 'CollectionReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/CollectionReportCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery - Delivery Trouble Ticket
    .state('Delivery-Trouble-Ticket', {
        url         : '/delivery/delivery-trouble-ticket',
        templateUrl : 'views/delivery/delivery-trouble-ticket.html',                        
        data        : { pageTitle : 'Delivery Trouble Ticket' },
        controller  : 'DeliveryTroubleTicketCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/DeliveryTroubleTicketCtrl.js',
                    ]
                });
            }]
        }
    })

    //Delivery - Delivery-Project Plan RNT
    .state('Delivery-Project-Plan', {
        url         : '/delivery/delivery-project-plan',
        templateUrl : 'views/delivery/delivery-project-plan.html',                        
        data        : { pageTitle : 'Delivery Project Plan' },
        controller  : 'DeliveryProjectPlanCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/delivery/DeliveryProjectPlanCtrl.js',
                    ]
                });
            }]
        }
    })

    .state('Profile', {
        url         : '/profile/profile',
        templateUrl : 'views/app.html',                        
        data        : { pageTitle : 'Dashboard' },
        controller  : 'AppCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/AppCtrl.js',
                    ]
                });
            }]
        }
    })

    //PROFILE
    /*.state('Profile', {
        url         : '/profile/profile',
        templateUrl : 'views/profile/profile.html',                        
        data        : { pageTitle : 'Profile' },
        controller  : 'ProfileCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/profile/ProfileCtrl.js',
                        'css/page/my-profile.css'
                    ] 
                });
            }]
        } 
    })*/

    //Manage
    .state('Manage', {
        url         : '/manage/manage',
        templateUrl : 'views/manage/manage.html',                        
        data        : { pageTitle : 'Manage' },
        controller  : 'ManageCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/ManageCtrl.js',
                    ] 
                });
            }]
        } 
    })

    //Manage - Data Input
    /*.state('Manage-QuoteGenerator', {
        url         : '/manage/quote-generator',
        templateUrl : 'views/manage/quote-generator.html',                        
        data        : { pageTitle : 'Quote Generator' },
        controller  : 'QuoteGeneratorCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/QuoteGeneratorCtrl.js',
                    ] 
                });
            }]
        } 
    })*/

    //Manage - Franchise Management
    .state('Manage-FranchiseManagement', {
        url         : '/manage/franchise-management',
        templateUrl : 'views/manage/franchise-management.html',                        
        data        : { pageTitle : 'Franchise Management' },
        controller  : 'FranchiseManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/FranchiseManagementCtrl.js',
                    ] 
                });
            }]
        } 
    })

    //Manage - Inventory Management
    .state('Manage-InventoryManagement', {
        url         : '/manage/inventory-management',
        templateUrl : 'views/manage/inventory-management.html',                        
        data        : { pageTitle : 'Inventory Management' },
        controller  : 'InventoryManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/InventoryManagementCtrl.js',
                    ] 
                });
            }]
        } 
    })

    //Manage - Laundry Management
    .state('Manage-LaundryManagement', {
        url         : '/manage/laundry-management',
        templateUrl : 'views/manage/laundry-management.html',                        
        data        : { pageTitle : 'Laundry Management' },
        controller  : 'LaundryManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/LaundryManagementCtrl.js',
                    ] 
                });
            }]
        } 
    })

    //Manage - SalesManagement
    .state('Manage-SalesManagement', {
        url         : '/manage/sales-management',
        templateUrl : 'views/manage/sales-management.html',                        
        data        : { pageTitle : 'Sales Management' },
        controller  : 'SalesManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'css/page/app.css',
                        'controllers/manage/SalesManagementCtrl.js',
                    ]
                });
            }]
        } 
    })

    //Manage - SlaManagement
    .state('Manage-SlaManagement', {
        url         : '/manage/sla-management',
        templateUrl : 'views/manage/sla-management.html',                        
        data        : { pageTitle : 'Sales Management' },
        controller  : 'SlaManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/SlaManagementCtrl.js',
                    ]
                });
            }]
        } 
    })

    //Manage - SalesManagement
    .state('Manage-UserManagement', {
        url         : '/manage/user-management',
        templateUrl : 'views/manage/user-management.html',                        
        data        : { pageTitle : 'User Management' },
        controller  : 'UserManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/UserManagementCtrl.js',
                    ]
                });
            }]
        } 
    })

    //Manage - VendorManagement
    .state('Manage-VendorManagement', {
        url         : '/manage/vendor-management',
        templateUrl : 'views/manage/vendor-management.html',                        
        data        : { pageTitle : 'Vendor Management' },
        controller  : 'VendorManagementCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/manage/VendorManagementCtrl.js',
                    ]
                });
            }]
        } 
    })

     //Manage - RequestMessages
    .state('Manage-RequestMessages', {
        url         : '/request-messages/request-messages',
        templateUrl : 'views/request-messages/request-messages.html',                        
        data        : { pageTitle : 'Request Messages' },
        controller  : 'RequestMessagesCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/request-messages/RequestMessagesCtrl.js',
                    ]
                });
            }]
        } 
    })

    //Report - Report
    .state('Report-Report', {
        url         : '/report/report',
        templateUrl : 'views/report/report.html',                        
        data        : { pageTitle : 'Report' },
        controller  : 'ReportCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/report/ReportCtrl.js',
                    ]
                });
            }]
        } 
    })

    //Report - Report
    .state('Billing-BillingContracts', {
        url         : '/billing-contracts/billing-contracts',
        templateUrl : 'views/billing-contracts/billing-contracts.html',                        
        data        : { pageTitle : 'Billing Contracts' },
        controller  : 'BillingContractsCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/billing-contracts/BillingContractsCtrl.js',
                    ]
                });
            }]
        } 
    })

    //Tools - Tools
    .state('Tools-Tools', {
        url         : '/tools/tools',
        templateUrl : 'views/tools/tools.html',                        
        data        : { pageTitle : 'Tools' },
        controller  : 'ToolsCtrl',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/tools/ToolsCtrl.js',
                    ]
                });
            }]
        } 
    })    
    //Tools - Tools
    // .state('Settings-Settings', {
    //     url         : '/tpl/settings',
    //     templateUrl : 'views/settings/settings.html',                        
    //     data        : { pageTitle : 'Settings' },
    //     controller  : 'main',
    //     resolve     : {
    //         deps : ['$ocLazyLoad', function($ocLazyLoad) {
    //             return $ocLazyLoad.load({
    //                 name         : 'RAT',
    //                 insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                 files        : [
    //                     'js/main.js',
    //                 ]
    //             });
    //         }]
    //     } 
    // })    


    .state('Masters-Product', {
        url         : '/masters/product',
        templateUrl : 'views/masters/product.html',                        
        data        : { pageTitle : 'Product' },
        controller  : 'Product',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/ProductCtrl.js'
                    ] 
                });
            }]
        } 
    })
    // .state('Settings-Settings', {
    //     url         : '/settings/settings',
    //     templateUrl : 'views/settings/settings.html',                        
    //     data        : { pageTitle : 'Settings' },
    //     controller  : 'Settings',
    //     resolve     : {
    //         deps : ['$ocLazyLoad', function($ocLazyLoad) {
    //             return $ocLazyLoad.load({
    //                 name         : 'RAT',
    //                 insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                 files        : [
    //                     'js/masters/main.js'
    //                 ] 
    //             });
    //         }]
    //     }
    // })
    
    .state('Masters-Warehouse', {
        url         : '/masters/warehouse',
        templateUrl : 'views/masters/warehouse.html',                        
        data        : { pageTitle : 'Warehouse' },
        controller  : 'Warehouse',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/WarehouseCtrl.js'
                    ] 
                });
            }]
        }
    })
    .state('Masters-Category', {
        url         : '/masters/category',
        templateUrl : 'views/masters/category.html',                        
        data        : { pageTitle : 'Category' },
        controller  : 'Category',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/CategoryCtrl.js'
                    ] 
                });
            }]
        }
    })
    .state('Masters-EmailConfiguration', {
        url         : '/masters/email-configuration',
        templateUrl : 'views/masters/email-configuration.html',                        
        data        : { pageTitle : 'EmailConfiguration' },
        controller  : 'EmailConfiguration',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/EmailConfigurationCtrl.js'
                    ] 
                });
            }]
        }
    })
    .state('Masters-ContractType', {
        url         : '/masters/contract-type',
        templateUrl : 'views/masters/contract-type.html',                        
        data        : { pageTitle : 'ContractType' },
        controller  : 'ContractType',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/ContractTypeCtrl.js'
                    ] 
                });
            }]
        } 
    })
  
    .state('Masters-Department', {
        url         : '/masters/department',
        templateUrl : 'views/masters/department.html',                        
        data        : { pageTitle : 'Department' },
        controller  : 'Department',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/DepartmentCtrl.js'
                    ] 
                });
            }]
        }
    })
.state('Masters-CustomerService', {
        url         : '/masters/customer-service',
        templateUrl : 'views/masters/customer-service.html',                        
        data        : { pageTitle : 'CustomerService' },
        controller  : 'CustomerService',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/CustomerServiceCtrl.js'
                    ] 
                });
            }]
        } 
    })
  
    .state('Masters-InvoicingFrequency', {
        url         : '/masters/invoicing-frequency',
        templateUrl : 'views/masters/invoicing-frequency.html',                        
        data        : { pageTitle : 'InvoicingFrequency' },
        controller  : 'InvoicingFrequency',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/InvoicingFrequencyCtrl.js'
                    ] 
                });
            }]
        } 
    })
    .state('Masters-IdentifyLinen', {
        url         : '/masters/identify-linen',
        templateUrl : 'views/masters/identify-linen.html',                        
        data        : { pageTitle : 'IdentifyLinen' },
        controller  : 'IdentifyLinen',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/IdentifyLinenCtrl.js'
                    ] 
                });
            }]
        } 
    })
    .state('Masters-InventoryMove', {
        url         : '/masters/inventory-move',
        templateUrl : 'views/masters/inventory-move.html',                        
        data        : { pageTitle : 'InventoryMove' },
        controller  : 'InventoryMove',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/InventoryMoveCtrl.js'
                    ] 
                });
            }]
        } 
    })
    .state('Masters-InventoryAction', {
        url         : '/masters/inventory-action',
        templateUrl : 'views/masters/inventory-action.html',                        
        data        : { pageTitle : 'InventoryAction' },
        controller  : 'InventoryAction',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/InventoryActionCtrl.js'
                    ] 
                });
            }]
        } 
    })
    .state('Masters-InventoryType', {
        url         : '/masters/inventory-type',
        templateUrl : 'views/masters/inventory-type.html',                        
        data        : { pageTitle : 'InventoryType' },
        controller  : 'InventoryType',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/InventoryTypeCtrl.js'
                    ] 
                });
            }]
        } 
    })
    .state('Masters-OrderingInventoryReason', {
        url         : '/masters/order-inventory-reason',
        templateUrl : 'views/masters/order-inventory-reason.html',                        
        data        : { pageTitle : 'OrderingInventoryReason' },
        controller  : 'OrderingInventoryReason',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/OrderingInventoryReasonCtrl.js'
                    ] 
                });
            }]
        }
    })
 
    .state('Masters-OrderInventoryType', {
        url         : '/masters/order-inventory-type',
        templateUrl : 'views/masters/order-inventory-type.html',                        
        data        : { pageTitle : 'OrderInventoryType' },
        controller  : 'OrderInventoryType',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/OrderInventoryTypeCtrl.js'
                    ] 
                });
            }]
        }
    })
    .state('Masters-Parameter', {
        url         : '/masters/parameter',
        templateUrl : 'views/masters/parameter.html',                        
        data        : { pageTitle : 'Parameter' },
        controller  : 'Parameter',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/ParameterCtrl.js'
                    ] 
                });
            }]
        }
    })
 
    .state('Masters-Menu', {
        url         : '/masters/menu',
        templateUrl : 'views/masters/menu.html',                        
        data        : { pageTitle : 'Menu' },
        controller  : 'Menu',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/MenuCtrl.js'
                    ] 
                });
            }]
        }
    })
  
    .state('Masters-Currency', {
        url         : '/masters/currency',
        templateUrl : 'views/masters/currency.html',                        
        data        : { pageTitle : 'Currency' },
        controller  : 'Currency',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/CurrencyCtrl.js'
                    ] 
                });
            }]
        }
    })
    .state('Masters-CustomerType', {
        url         : '/masters/customer-type',
        templateUrl : 'views/masters/customer-type.html',                        
        data        : { pageTitle : 'CustomerType' },
        controller  : 'CustomerType',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/CustomerTypeCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-UserType', {
        url         : '/masters/user-type',
        templateUrl : 'views/masters/user-type.html',                        
        data        : { pageTitle : 'UserType' },
        controller  : 'UserType',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/UserTypeCtrl.js'
                    ] 
                });
            }]
        } 
    })
    .state('Masters-QuoteType', {
        url         : '/masters/quote-type',
        templateUrl : 'views/masters/quote-type.html',                        
        data        : { pageTitle : 'QuoteType' },
        controller  : 'QuoteType',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/QuoteTypeCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-Variant', {
        url         : '/masters/variant',
        templateUrl : 'views/masters/variant.html',                        
        data        : { pageTitle : 'Variant' },
        controller  : 'Variant',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/VariantCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-Role', {
        url         : '/masters/role',
        templateUrl : 'views/masters/role.html',                        
        data        : { pageTitle : 'Role' },
        controller  : 'Role',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/RoleCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-Designation', {
        url         : '/masters/designation',
        templateUrl : 'views/masters/designation.html',                        
        data        : { pageTitle : 'Role' },
        controller  : 'Designation',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/DesignationCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-Country', {
        url         : '/masters/country',
        templateUrl : 'views/masters/country.html',                        
        data        : { pageTitle : 'Role' },
        controller  : 'Country',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/CountryCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-City', {
        url         : '/masters/city',
        templateUrl : 'views/masters/city.html',                        
        data        : { pageTitle : 'Role' },
        controller  : 'City',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/CityCtrl.js'
                    ] 
                });
            }]
        } 
    })

    .state('Masters-SupplyVendor', {
        url         : '/masters/supply-vendor',
        templateUrl : 'views/masters/supply-vendor.html',                        
        data        : { pageTitle : 'Role' },
        controller  : 'City',
        resolve     : {
            deps : ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name         : 'RAT',
                    insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files        : [
                        'controllers/masters/SupplyVendorCtrl.js'
                    ] 
                });
            }]
        } 
    })
 
.state('Settings-Parameter', {
    url         : '/settings/parameter',
    templateUrl : 'views/settings/parameter.html',                        
    data        : { pageTitle : 'Parameter' },
    controller  : 'Parameter',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'controllers/settings/ParameterCtrl.js'
                ] 
            });
        }]
    }
})
.state('Settings-EmailConfiguration', {
    url         : '/settings/email-configuration',
    templateUrl : 'views/settings/email-configuration.html',                        
    data        : { pageTitle : 'EmailConfiguration' },
    controller  : 'EmailConfiguration',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'controllers/settings/EmailConfigurationCtrl.js'
                ] 
            });
        }]
    } 
})
.state('Settings-User', {
    url         : '/settings/user',
    templateUrl : 'views/settings/user.html',                        
    data        : { pageTitle : 'User' },
    controller  : 'User',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'controllers/settings/UserCtrl.js'
                ] 
            });
        }]
    } 
})
.state('Settings-Menu', {
    url         : '/settings/menu',
    templateUrl : 'views/settings/menu.html',                        
    data        : { pageTitle : 'Menu' },
    controller  : 'Menu',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'controllers/settings/MenuCtrl.js'
                ] 
            });
        }]
    } 
})
.state('Delivery-Tech-Cost-Analysis-Add', {
    url         : '/settings/add/delivery-tech-cost-analysis',
    templateUrl : 'views/settings/delivery-tech-cost-analysis-form.html',                        
    data        : { pageTitle : 'Delivery Tech Cost Analysis' },
    controller  : 'DeliveryTechCostAnalysisFormCtrl',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'css/page/app.css',
                    'controllers/settings/DeliveryTechCostAnalysisFormCtrl.js'
                ]
            });
        }]
    } 
})
.state('Delivery-Tech-Cost-Analysis-Listing', {
    url         : '/settings/delivery-tech-cost-analysis',
    templateUrl : 'views/settings/delivery-tech-cost-analysis-list.html',                        
    data        : { pageTitle : 'Delivery Tech Cost Analysis' },
    controller  : 'DeliveryTechCostAnalysisListCtrl',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'css/page/app.css',
                    'controllers/settings/DeliveryTechCostAnalysisListCtrl.js'
                ]
            });
        }]
    } 
})

.state('Delivery-Tech-Cost-Analysis-Edit', {
    url         : '/settings/edit-details/:DeliveryTechCostAnalysisID',
    templateUrl : 'views/settings/delivery-tech-cost-analysis-form.html',                        
    data        : { pageTitle : 'Delivery Tech Cost Analysis' },
    controller  : 'DeliveryTechCostAnalysisFormCtrl',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'css/page/app.css',
                    'controllers/settings/DeliveryTechCostAnalysisFormCtrl.js',
                ]
            });
        }]
    }
})

.state('Product-Pricing', {
    url         : '/settings/product-pricing',
    templateUrl : 'views/settings/product-pricing.html',                        
    data        : { pageTitle : 'Product Pricing' },
    controller  : 'ProductPricing',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'css/page/app.css',
                    'controllers/settings/ProductPricingCtrl.js',
                ]
            });
        }]
    }
})

.state('Platform-Enhancement-Request', {
    url         : '/platform-enhancement-request',
    templateUrl : 'views/platform-enhancement-request.html',                        
    data        : { pageTitle : 'Platform Enhancement Request' },
    controller  : 'PlatformEnhancementRequest',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'css/page/app.css',
                    'controllers/PlatformEnhancementRequestCtrl.js',
                ]
            });
        }]
    }
})

.state('My-Profile', {
    url         : '/profile/profile',
    templateUrl : 'views/profile/profile.html',                        
    data        : { pageTitle : 'My Profile' },
    controller  : 'MyProfile',
    resolve     : {
        deps : ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name         : 'RAT',
                insertBefore : '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files        : [
                    'css/page/app.css',
                    'controllers/MyProfileCtrl.js',
                ]
            });
        }]
    }
})

}]);   
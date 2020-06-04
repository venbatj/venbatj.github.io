<?php
namespace Rnt\Controller\Inventory;

use Rnt\Inventory\InventoryRepository as IR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils ;
use Rnt\Libs\ostAuth;

Class Inventory
{
    /**
     * Generate Inventory
	 * @param array $Req
     * @return array
     */
    public static function ExportData($Req)
    {
        Utils::includeXLSXLib();

        $Options = array();
        $Options['DATA_STORAGE_PATH'] = DATA_STORAGE_PATH;
        $Options['VERSION_PATH'] = VERSION_PATH;
        $Options['DATA_STORAGE_BASE_PATH'] = DATA_STORAGE_BASE_PATH;
        $Options['XLSX_DATE_FORMAT'] = XLSX_DATE_FORMAT;
        $Options['DOWNLOAD_PATH'] = SERVICE_HOST_PATH.'/quote-download.php';
        
        $Path = IR::generateReportXLSX($Req, 1, 1, 180, $Options);
        // $Req['FileName'] = $Path['FilePath'];

        return Utils::response($Path['DownloadUrl'], true);
    }

    /**
     * get All data
     * @return string 
     */
    public static function getAllData()
    {
        return Utils::response(IR::getAllData(), true);
    }

    public static function getActionForSInv()
    {
        return Utils::response(IR::getActionForSInv(), true);
    }

    public static function getActionForRInv()
    {
        return Utils::response(IR::getActionForRInv(), true);
    }

    public static function getActionForPInv()
    {
        return Utils::response(IR::getActionForPInv(), true);
    }

    public static function getCategoryByCustomerID($Req)
    {
        return Utils::response(IR::getCategoryByCustomerID($Req['CustomerID']), true);
    }

    public static function getCategoryByWarehouseID($Req)
    {
        return Utils::response(IR::getCategoryByWarehouseID($Req['WarehouseID']), true);
    }

    public static function getProductByCustomerID($Req)
    {
        return Utils::response(IR::getProductByCustomerID($Req['CustomerID'], $Req['CategoryID']), true);
    }

    public static function getProductByWarehouseID($Req)
    {
        return Utils::response(IR::getProductByWarehouseID($Req['WarehouseID'], $Req['CategoryID']), true);
    }

    public static function getVariantByProductID($Req)
    {
        return Utils::response(IR::getVariantByProductID($Req['ProductID']), true);
    }

    public static function getVariantByCustomerID($Req)
    {
        return Utils::response(IR::getVariantByCustomerID($Req['CustomerID'], $Req['ProductID']), true);
    }

    public static function getVariantByWarehouseID($Req)
    {
        return Utils::response(IR::getVariantByWarehouseID($Req['WarehouseID'], $Req['ProductID']), true);
    }

    /**
     * Get all data
     * @return array
     */
    public static function getInventoryaction()
    {
        return Utils::response(IR::getInventoryaction(), true);
    }

    /**
     * insert Update
     * @param array
     * @return string
     */
    public static function OrderinsertUpdate($Req)
    {
        // echo "<pre>";
        // print_r($Req);
        // exit;
        // if (isset($Req['OrderCustomer']['ID']) && $Req['OrderCustomer']['ID'] > 0) {
           
        //     $InventoryID = $Req['OrderCustomer']['ID'];
        //     IR::updateCustomerInv($Req['OrderCustomer']);
        //     $InventoryOrderID = $InventoryID;
        //     return Utils::response(IR::insertInventoryOrderData($Req['SubInventory'],$InventoryID), true);
        // } else {
            // $InventoryID = Utils::response(IR::insertInventory($Req['OrderCustomer']), true);
            // $InventoryOrderID = $InventoryID['D'];
            $fields = array(
                'FunctionName' => 'OrderForCustomer',
                'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceOrderInvCust.php',
                'EmailID' => urlencode('julieponraj@gmail.com'),
                'Name' => urlencode('customer'),
                );
            $res = ostAuth::getosTicketData($fields);
            print_r($fields);
            print_r($res);
            // $Res = Utils::response(IR::insertInventoryOrderData($Req['SubInventory'],$InventoryOrderID), true);
        // }
            // return Utils::response($InventoryID,true);
    }

    /**
     * insert Update
     * @param array
     * @return string
     */
    public static function WarehouseinsertUpdate($Req)
    {
        if (isset($Req['OrderWarehouse']['ID']) && $Req['OrderWarehouse']['ID'] > 0) {
           
            $InventoryID = $Req['OrderWarehouse']['ID'];
            IR::update($Req['OrderWarehouse']);
            return Utils::response(IR::insertInventoryOrderData($Req['SubInventory'],$InventoryID), true);
        } else {
            $InventoryID = Utils::response(IR::insertInventory($Req['OrderWarehouse']), true);
            $InventoryOrderID = $InventoryID['D'];
            $Res = Utils::response(IR::insertInventoryOrderData($Req['SubInventory'],$InventoryOrderID), true);
        }
            return Utils::response($InventoryID,true);
    }

    /**
     * insert Update
     * @param array
     * @return string
     */
    public static function AddDatainsertUpdate($Req)
    {
        if (isset($Req['AddWareSupply']['ID']) && $Req['AddWareSupply']['ID'] > 0) {
           
            $InventoryID = $Req['AddWareSupply']['ID'];
            IR::update($Req['AddWareSupply']);
            return Utils::response(IR::insertWareInventoryOrderData($Req['SubInventory'],$InventoryID), true);
        } else {
            $InventoryID = Utils::response(IR::insertInventory($Req['AddWareSupply']), true);
            $InventoryOrderID = $InventoryID['D'];
            $Res = Utils::response(IR::insertWareInventoryOrderData($Req['SubInventory'],$InventoryOrderID), true);
        }
            return Utils::response($InventoryID,true);
    }

    /**
     * insert Update
     * @param array
     * @return string
     */
    public static function insertUpdate($Req)
    {
        if (isset($Req['Inventory']['ID']) && $Req['Inventory']['ID'] > 0) {
           
            $InventoryID = $Req['Inventory']['ID'];
            IR::update($Req['Inventory']);
            $Req['SubInventory']['OrderTypeID']=$Req['Inventory']['OrderTypeID'];
            return Utils::response(IR::insertInventoryData($Req['SubInventory'],$InventoryID), true);
        } else {
            $InventoryID = Utils::response(IR::insertInventory($Req['Inventory']), true);
            $InventoryOrderID = $InventoryID['D'];
            $Req['SubInventory']['OrderTypeID']=$Req['Inventory']['OrderTypeID'];
            $Res = Utils::response(IR::insertInventoryData($Req['SubInventory'],$InventoryOrderID), true);
        }
            return Utils::response($InventoryID,true);
    }

    /**
     * insert Update
     * @param array
     * @return string
     */
    public static function returnInsertUpdate($Req)
    {
        if (isset($Req['Inventory']['ID']) && $Req['Inventory']['ID'] > 0) {
           
            $InventoryID = $Req['Inventory']['ID'];
            IR::updateReturnInventory($Req['Inventory']);
            $InventoryOrderID = $InventoryID;
            return Utils::response(IR::insertReturnInventoryData($Req['SubInventory'],$InventoryID), true);
        } else {
            $InventoryID = Utils::response(IR::insertInventory($Req['Inventory']), true);
            $InventoryOrderID = $InventoryID['D'];
            $Res = Utils::response(IR::insertReturnInventoryData($Req['SubInventory'],$InventoryOrderID), true);
        }
            return Utils::response($InventoryID,true);
    }

    /**
     * insert Update
     * @param array
     * @return string
     */
    public static function purgeInsertUpdate($Req)
    {
        if (isset($Req['Inventory']['ID']) && $Req['Inventory']['ID'] > 0) {
            $InventoryID = $Req['Inventory']['ID'];
            IR::updatePurgeInventory($Req['Inventory']);
            $InventoryOrderID = $InventoryID;
            return Utils::response(IR::insertReturnInventoryData($Req['SubInventory'], $InventoryID), true);
        } else {
            $InventoryID = Utils::response(IR::insertInventory($Req['Inventory']), true);
            $InventoryOrderID = $InventoryID['D'];
            $Res = Utils::response(IR::insertReturnInventoryData($Req['SubInventory'], $InventoryOrderID), true);
        }
            return Utils::response($InventoryID,true);
    }

    public static function insertUpdateOrderRFID($Req)
    {
        if (isset($Req['Inventory']['ID']) && $Req['Inventory']['ID'] > 0) {
            $InventoryID = $Req['Inventory']['ID'];
            IR::updateOrderRFID($Req['Inventory']);
            $InventoryOrderID = $InventoryID;
            return Utils::response(IR::insertRFIDData($Req['SubInventory'], $InventoryID), true);
        } else {
            $InventoryID = Utils::response(IR::insertInventory($Req['Inventory']), true);
           
            $InventoryOrderID = $InventoryID['D'];
            $Res = Utils::response(IR::insertRFIDData($Req['SubInventory'], $InventoryOrderID), true);
        }
            return Utils::response($InventoryID,true);
    }

    /**
     * Update
     * @param array
     * @return string
     */
    public static function updateRfidChildData($Req)
    {
        if (isset($Req['RFIDData']['ID']) && $Req['RFIDData']['ID'] > 0) {
            return Utils::response(IR::updateRfidChildData($Req['RFIDData']), true);
        }
    }

    /**
     * Update
     * @param array
     * @return string
     */
    public static function updateChildData($Req)
    {
        if (isset($Req['SubFormInventory']['ID']) && $Req['SubFormInventory']['ID'] > 0) {
            return Utils::response(IR::updateChildData($Req['SubFormInventory']), true);
        }
    }

     /**
     * Update
     * @param array
     * @return string
     */
    public static function updateChildRFIDData($Req)
    {
        if (isset($Req['SubForm']['ID']) && $Req['SubForm']['ID'] > 0) {
            return Utils::response(IR::updateChildRFIDData($Req['SubForm']), true);
        }
    }

    /**
     * Update
     * @param array
     * @return string
     */
    public static function updatecustChildData($Req)
    {
        if (isset($Req['SubOrderCustomer']['ID']) && $Req['SubOrderCustomer']['ID'] > 0) {
            return Utils::response(IR::updatecustChildData($Req['SubOrderCustomer']), true);
        }
    }

    /**
     * AddInventory
     * @param int $Req
     * @return array
     */
    public static function AddInventory($Req)
    {
        $InventoryID = Utils::response(IR::AddInventory($Req['InventoryLinenSupplier']), true);
        return Utils::response($InventoryID, true);
    }

    /**
     * OrderInventory
     * @param int $Req
     * @return array
     */
    public static function OrderInventory($Req)
    {
        $InventoryID = Utils::response(IR::OrderInventory($Req['Data']), true);
        return Utils::response($InventoryID, true);
    }

    /**
     * OrderInventory
     * @param int $Req
     * @return array
     */
    public static function RfidInventory($Req)
    {
        $InventoryID = Utils::response(IR::RfidInventory($Req['Data']), true);
        return Utils::response($InventoryID, true);
    }

    /**
     * OrderInventory
     * @param int $Req
     * @return array
     */
    public static function WarInventory($Req)
    {
        $InventoryID = Utils::response(IR::WarInventory($Req['Data']), true);
        return Utils::response($InventoryID, true);
    }

    /**
     * SendInventory
     * @param int $Req
     * @return array
     */
    public static function SendInventory($Req)
    {
        
        $InventoryID = Utils::response(IR::SendInventory($Req['SendInventory']), true);
        return Utils::response($InventoryID, true);
    }

    /**
     * ReturnInventory
     * @param int $Req
     * @return array
     */
    public static function ReturnInventory($Req)
    {
        
        $InventoryID = Utils::response(IR::ReturnInventory($Req['ReturnInventory']), true);
        return Utils::response($InventoryID, true);
    }

     /**
     * PurgeInventory
     * @param int $Req
     * @return array
     */
    public static function PurgeInventory($Req)
    {
        $InventoryID = Utils::response(IR::PurgeInventory($Req['PurgeInventory']), true);
        return Utils::response($InventoryID, true);
    }

    /**
     * remove
     * @param int $Req
     * @return array
     */
    public static function remove($Req)
    {
        if(!isset($Req['IDArr']))   
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        return Utils::response(IR:: remove($Req['IDArr']), true);
    }

    /**
     * remove RFIDData
     * @param int $Req
     * @return array
     */
    public static function removeRFIDData($Req)
    {
        if(!isset($Req['ID']))
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        return Utils::response(IR::removeRFIDData($Req['ID']), true);
    }

    /**
     * remove InventoryData
     * @param int $Req
     * @return array
     */
    public static function removeInventoryData($Req)
    {
        if(!isset($Req['IDArr']))   
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        return Utils::response(IR::removeInventoryData($Req['IDArr']), true);
    }

    /**
     * remove Inventory
     * @param int $Req
     * @return array
     * 
     */
    public static function removeInventory($Req)
    {
        if(!isset($Req['ID']))
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        return Utils::response(IR::removeInventory($Req['ID']), true);
    }

    /**
     * remove Order RFID Data
     * @param int $Req
     * @return array
     * 
     */
    public static function removeOrderRFIDData($Req)
    {
        if(!isset($Req['ID']))
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        return Utils::response(IR::removeOrderRFIDData($Req['ID']), true);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getDataByPage($Req)
    {
        $Columns = array('', 'CustomerName', 'WarehouseName', 'ManualQty', 'LinenSupplierName', 'InventoryAction');
        $Req['CustomerID'] = isset($Req['CustomerName']) ? $Req['CustomerName'] :0;
        $Req['WarehouseID'] = isset($Req['WarehouseName']) ? $Req['WarehouseName'] :0;
        $Req['SupplierID'] = isset($Req['LinenSupplierName']) ? $Req['LinenSupplierName'] :0;
        $Req['CategoryID'] = isset($Req['CategoryID']) ? $Req['CategoryID'] : '';
        $Req['ProductID'] = isset($Req['ProductID']) ? $Req['ProductID'] : '';
        $Req['VariantID'] = isset($Req['VariantID']) ? $Req['VariantID'] : '';
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = IR::getDataTblListCount($Attributes['DataTableSearch'], $Req['CustomerID'], $Req['SupplierID'], $Req['WarehouseID'], $Req['CategoryID'], $Req['ProductID'], $Req['VariantID']);
        $ResData = IR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy'], $Req['CustomerID'], $Req['WarehouseID'], $Req['SupplierID'], $Req['CategoryID'], $Req['ProductID'], $Req['VariantID']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getBothDataByPage($Req)
    {
        $Columns = array('', 'CustomerName', 'WarehouseName', 'LinenSupplierName', 'InventoryAction');
        $Req['CustomerID'] = isset($Req['CustomerName']) ? $Req['CustomerName'] :0;
        $Req['WarehouseID'] = isset($Req['WarehouseName']) ? $Req['WarehouseName'] :0;
        $Req['SupplierID'] = isset($Req['LinenSupplierName']) ? $Req['LinenSupplierName'] :0;
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = IR::getBothDataTblListCount($Attributes['DataTableSearch'], $Req['CustomerID'], $Req['SupplierID'], $Req['WarehouseID']);
        $ResData = IR::getBothDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy'], $Req['CustomerID'], $Req['SupplierID'], $Req['WarehouseID']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getCustomerDataByPage($Req)
    {
        $Columns = array('', 'CustomerName', 'LinenSupplierName', 'InventoryAction');
        $Req['CustomerID'] = isset($Req['CustomerName']) ? $Req['CustomerName'] :0;
        $Req['SupplierID'] = isset($Req['LinenSupplierName']) ? $Req['LinenSupplierName'] :0;
        $Attributes = DT::getAttributes($Req,$Columns);
        $RowCount = IR::getCustomerDataTblListCount($Attributes['DataTableSearch'], $Req['CustomerID'], $Req['SupplierID']);
        $ResData = IR::getCustomerDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy'], $Req['CustomerID'], $Req['SupplierID']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getWarehouseDataByPage($Req)
    {
        $Columns = array('', 'WarehouseName', 'LinenSupplierName', 'InventoryAction');
        $Req['WarehouseID'] = isset($Req['WarehouseName']) ? $Req['WarehouseName'] :0;
        $Req['SupplierID'] = isset($Req['LinenSupplierName']) ? $Req['LinenSupplierName'] :0;
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = IR::getWarehouseDataTblListCount($Attributes['DataTableSearch'], $Req['SupplierID'], $Req['WarehouseID']);
        $ResData = IR::getWarehouseDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy'], $Req['SupplierID'], $Req['WarehouseID']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getViewBothDataByPage($Req)
    {
        $Columns = array('', 'CustomerName', 'WarehouseName', 'Modified');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = IR::getViewBothDataTblListCount($Attributes['DataTableSearch']);
        $ResData = IR::getViewBothDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getViewCustomerDataByPage($Req)
    {
        $Columns = array('', 'CustomerName', 'Modified');
        $Attributes = DT::getAttributes($Req,$Columns);
        $RowCount = IR::getViewCustomerDataTblListCount($Attributes['DataTableSearch']);
        $ResData = IR::getViewCustomerDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getViewWarehouseDataByPage($Req)
    {
        $Columns = array('', 'WarehouseName', 'Modified');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = IR::getViewWarehouseDataTblListCount($Attributes['DataTableSearch']);
        $ResData = IR::getViewWarehouseDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * get data by id
     * @return string
     */
    public static function getDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID Parameter Missing');
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::Response(IR::getDataByID($Req['ID']),true);
    }

    /**
     * get data by id
     * @return string
     */
    public static function getInvDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID Parameter Missing');
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::Response(IR::getInvDataByID($Req['ID']),true);
        // echo "<pre>";
        // print_r($Res);
        // exit;

        // return $Res;
    }
   
    /**
     * get data by Warehouse id
     * @return string
     */
    public static function getDataByOrder($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID Parameter Missing');
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::Response(IR::getDataByOrder($Req['ID']),true);
    }

    /**
     * get customer data by id
     * @return string
     */
    public static function getCustomerDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID Parameter Missing');
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::Response(IR::getCustomerDataByID($Req['ID']),true);
    }

    /**
     * get order rfid data by id
     * @return string
     */
    public static function getOrderRFIDDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID Parameter Missing');
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::Response(IR::getOrderRFIDDataByID($Req['ID']),true);
    }

    /**
     * get order rfid
     * @return string
     */
    public static function getOrderRFID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID Parameter Missing');

        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::Response(IR::getOrderRFID($Req['ID']), true);
    }
}
?>
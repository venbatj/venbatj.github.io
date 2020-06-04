<?php

namespace Rnt\Inventory;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

use PHPExcel;
use PHPExcel_Worksheet_Drawing as ExcelWorksheetDrawing;
use PHPExcel_Writer_Excel2007 as PHPExcelWriter;
use PHPExcel_Style_Fill as ExcelStyleFill;
use PHPExcel_Style_Alignment as ExcelStyleAlignment;
use PHPExcel_Style_Border as ExcelStyleBorder;


class InventoryRepository implements IRepository
{
    use AERRepository;  

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'Inventory';
    }

    /**
     * Get All data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Inventory');
        $Obj->addFlds(array('*'));
        $Obj->addOrderFlds('ScannedQty', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple();
    }

    /**
     * Get Inventory action
     * @return array
     */
    public static function getInventoryaction()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID', 'InventoryAction'));
        $Obj->addOrderFlds('InventoryAction', 'ASC');
        // $Obj->addFldCond('InventoryTypeID', 0);
        $Obj->addFldCond('InventoryTypeID', 4);
        return $Obj->getMultiple(); 
    }

    public static function getActionForSInv()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID', 'InventoryAction'));
        $Obj->addOrderFlds('InventoryAction', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('InventoryTypeID', 1);
        return $Obj->getMultiple(); 
    }

    public static function getActionForRInv()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID', 'InventoryAction'));
        $Obj->addOrderFlds('InventoryAction', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('InventoryTypeID', 2);
        return $Obj->getMultiple(); 
    }

    public static function getActionForPInv()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID', 'InventoryAction'));
        $Obj->addOrderFlds('InventoryAction', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('InventoryTypeID', 3);
        return $Obj->getMultiple(); 
    }

    public static function getCategoryByCustomerID($CustomerID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Category C');
        $Obj->addFlds(array('C.ID', 'C.CategoryName'));
        $Obj->addFldCond('I.CustomerID', $CustomerID);
        $Obj->addFldCond('I.Flag', 'R', '!=');
        $Obj->addFldCond('I.Flag', 'Z', '!=');
        $Obj->addJoinTbl('InventoryData ID', 'C.ID', 'ID.CategoryID', 'LEFT JOIN');
        $Obj->addJoinTbl('Inventory I', 'ID.InventoryOrderID', 'I.ID', 'LEFT JOIN');
        $Obj->addOrderFlds('C.CategoryName', 'ASC');
        $Obj->addGroupFlds('C.CategoryName');
        return $Obj->getJoinMultiple(); 
    }

    public static function getCategoryByWarehouseID($WarehouseID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Category C');
        $Obj->addFlds(array('C.ID', 'C.CategoryName'));
        $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        $Obj->addFldCond('I.Flag', 'R', '!=');
        $Obj->addFldCond('I.Flag', 'Z', '!=');
        $Obj->addJoinTbl('InventoryData ID', 'C.ID', 'ID.CategoryID', 'LEFT JOIN');
        $Obj->addJoinTbl('Inventory I', 'ID.InventoryOrderID', 'I.ID', 'LEFT JOIN');
        $Obj->addOrderFlds('C.CategoryName', 'ASC');
        $Obj->addGroupFlds('C.CategoryName');
        return $Obj->getJoinMultiple(); 
    }

    public static function getProductByCustomerID($CustomerID, $CategoryID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product P');
        $Obj->addFlds(array('P.ID', 'P.ProductName'));
        $Obj->addFldCond('I.CustomerID', $CustomerID);
        $Obj->addFldCond('ID.CategoryID', $CategoryID);
        $Obj->addFldCond('I.Flag', 'R', '!=');
        $Obj->addFldCond('I.Flag', 'Z', '!=');
        $Obj->addJoinTbl('InventoryData ID', 'P.ID', 'ID.ProductID', 'LEFT JOIN');
        $Obj->addJoinTbl('Inventory I', 'ID.InventoryOrderID', 'I.ID', 'LEFT JOIN');
        $Obj->addOrderFlds('P.ProductName', 'ASC');
        $Obj->addGroupFlds('P.ProductName');
        return $Obj->getJoinMultiple(); 
    }

    public static function getProductByWarehouseID($WarehouseID, $CategoryID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product P');
        $Obj->addFlds(array('P.ID', 'P.ProductName'));
        $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        $Obj->addFldCond('ID.CategoryID', $CategoryID);
        $Obj->addFldCond('I.Flag', 'R', '!=');
        $Obj->addFldCond('I.Flag', 'Z', '!=');
        $Obj->addJoinTbl('InventoryData ID', 'P.ID', 'ID.ProductID', 'LEFT JOIN');
        $Obj->addJoinTbl('Inventory I', 'ID.InventoryOrderID', 'I.ID', 'LEFT JOIN');
        $Obj->addOrderFlds('P.ProductName', 'ASC');
        $Obj->addGroupFlds('P.ProductName');
        return $Obj->getJoinMultiple(); 
    }

    public static function getVariantByProductID($ProductID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant V');
        $Obj->addFlds(array('V.ID', 'V.VariantName'));
        $Obj->addFldCond('PV.ProductID', $ProductID);
        $Obj->addFldCond('V.Flag', 'R', '!=');
        $Obj->addJoinTbl('ProductVariant PV', 'V.ID', 'PV.VariantID', 'LEFT JOIN');
        $Obj->addOrderFlds('V.VariantName', 'ASC');
        $Obj->addGroupFlds('V.VariantName');
        return $Obj->getJoinMultiple(); 
    }

    public static function getVariantByCustomerID($CustomerID, $ProductID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant V');
        $Obj->addFlds(array('V.ID', 'V.VariantName'));
        $Obj->addFldCond('I.CustomerID', $CustomerID);
        $Obj->addFldCond('ID.ProductID', $ProductID);
        $Obj->addFldCond('I.Flag', 'R', '!=');
        $Obj->addFldCond('I.Flag', 'Z', '!=');
        $Obj->addJoinTbl('InventoryData ID', 'V.ID', 'ID.VariantID', 'LEFT JOIN');
        $Obj->addJoinTbl('Inventory I', 'ID.InventoryOrderID', 'I.ID', 'LEFT JOIN');
        $Obj->addOrderFlds('V.VariantName', 'ASC');
        $Obj->addGroupFlds('V.VariantName');
        return $Obj->getJoinMultiple(); 
    }

    public static function getVariantByWarehouseID($WarehouseID, $ProductID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant V');
        $Obj->addFlds(array('V.ID', 'V.VariantName'));
        $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        $Obj->addFldCond('ID.ProductID', $ProductID);
        $Obj->addFldCond('I.Flag', 'R', '!=');
        $Obj->addFldCond('I.Flag', 'Z', '!=');
        $Obj->addJoinTbl('InventoryData ID', 'V.ID', 'ID.VariantID', 'LEFT JOIN');
        $Obj->addJoinTbl('Inventory I', 'ID.InventoryOrderID', 'I.ID', 'LEFT JOIN');
        $Obj->addOrderFlds('V.VariantName', 'ASC');
        $Obj->addGroupFlds('V.VariantName');
        return $Obj->getJoinMultiple(); 
    }

    /**
     * insert Inventory Data
     * @return array
     */
    public static function insertInventoryOrderData($Req,$InventoryOrderID)
    {
        unset($Req['ID']);
        foreach($Req as $Each) {
            if(!(isset($Each['ID']) && $Each['ID'] > 0)) {
                $value = array(
                    'InventoryOrderID' => $InventoryOrderID,
                    'CategoryID' => $Each['CategoryID'],
                    'ProductID' => $Each['ProductID'],
                    'VariantID' => $Each['VariantID'],
                    'QtyToBeOrdered' => $Each['QtyToBeOrdered']
                    // 'QtyByCustomer' => $Each['QtyByCustomer'],
                    // 'QtyByCustomer' => $Each['QtyByCustomer'],
                    // 'QtyUsedFromWarehouse' => $Each['QtyUsedFromWarehouse'],
                );
                $Obj = new SqlManager();
                $Obj->addTbls('InventoryData');
                $Obj->addInsrtFlds($value);
                $Obj->insertSingle();
            }
        }
    }

    public static function updateCustomerInv($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'SupplierID' => $Row['SupplierID'],
            'ManualQty' => $Row['ManualQty'],
            'ActionID' => $Row['ActionID'],
            'CustomerID' => $Row['CustomerID'],
            'OrderTypeID' => $Row['OrderTypeID'],
            'InventoryMoveID' => $Row['InventoryMoveID'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        return $Obj->Update(); 
    }

    public static function updateReturnInventory($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'InventoryMoveID' => $Row['InventoryMoveID'],
            'ManualQty' => $Row['ManualQty'],
            'ActionID' => $Row['ActionID'],
            'CustomerID' => $Row['CustomerID'],
            'WarehouseID' => $Row['WarehouseID'],
            'OrderingReasonID' => $Row['OrderingReasonID'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        return $Obj->Update(); 
    }

    public static function updatePurgeInventory($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'SupplierID' => $Row['SupplierID'],
            'InventoryMoveID' => $Row['InventoryMoveID'],
            'ManualQty' => $Row['ManualQty'],
            'ActionID' => $Row['ActionID'],
            'CustomerID' => $Row['CustomerID'],
            'WarehouseID' => $Row['WarehouseID'],
            'OrderingReasonID' => $Row['OrderingReasonID'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        return $Obj->Update(); 
    }

    public static function updateChildData($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('InventoryData');
        $Obj->AddInsrtFlds(array(
            'CategoryID' => $Row['CategoryID'],
            'ProductID' => $Row['ProductID'],
            'VariantID' => $Row['VariantID'],
            'QtyForWarehouse' => $Row['QtyForWarehouse'],
            'RFIDTag' => $Row['RFIDTag'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        $Res = $Obj->Update(); 
        return $Res;
    }

    public static function updateChildRFIDData($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('OrderRFIDData');
        $Obj->AddInsrtFlds(array(
            'QTY' => $Row['QTY'],
            'SupplierID' => $Row['SupplierID'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        $Res = $Obj->Update(); 
        return $Res;
    }

    public static function updatecustChildData($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('InventoryData');
        $Obj->AddInsrtFlds(array(
            'CategoryID' => $Row['CategoryID'],
            'ProductID' => $Row['ProductID'],
            'VariantID' => $Row['VariantID'],
            'QtyByWarehouse' => $Row['QtyByWarehouse'],
            'QtyByCustomer' => $Row['QtyByCustomer'],
            'QtyUsedFromWarehouse' => $Row['QtyUsedFromWarehouse'],
            'QtyToBeOrdered' => $Row['QtyToBeOrdered'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        $Res = $Obj->Update(); 
        return $Res;
    }

    /**
     * insert Return Inventory Data
     * @return array
     */
    public static function insertReturnInventoryData($Req, $InventoryOrderID)
    {
        unset($Req['ID']);
        
        foreach($Req as $Each) {
            if(!(isset($Each['ID']) && $Each['ID'] > 0)) {
                $data = array(
                    'InventoryOrderID' => $InventoryOrderID,
                    'CategoryID' => $Each['CategoryID'],
                    'ProductID' => $Each['ProductID'],
                    'VariantID' => $Each['VariantID'],
                    'QtyForWarehouse' => $Each['QtyForWarehouse'],
                    'RFIDTag' => $Each['RFIDTag']
                );
                $Obj = new SqlManager();
                $Obj->addTbls('InventoryData');
                $Obj->addInsrtFlds($data);
                $Obj->insertSingle();
            }
        }
    }

    /**
     * insert send Inventory Data
     * @return array
     */
    public static function insertSendInventoryData($Req, $InventoryOrderID)
    {
        unset($Req['ID']);
        foreach($Req as $Each) {
            if(!(isset($Each['ID']) && $Each['ID'] > 0)) {
                $data = array(
                    'InventoryOrderID' => $InventoryOrderID,
                    'CategoryID' => $Each['CategoryID'],
                    'ProductID' => $Each['ProductID'],
                    'VariantID' => $Each['VariantID'],
                    'QtyForWarehouse' => $Each['QtyForWarehouse'],
                    'RFIDTag' => $Each['RFIDTag']
                );
                $Obj = new SqlManager();
                $Obj->addTbls('InventoryData');
                $Obj->addInsrtFlds($data);
                $Obj->insertSingle();
            }
        }
    }

    /**
     * insert Inventory Data
     * @return array
     */
    public static function insertWareInventoryOrderDatas($Req,$InventoryOrderID)
    {
        unset($Req['ID']);
        foreach($Req as $Each) {
            if(!isset($Each['ID'])) {
                $data = array(
                    'CategoryID' => $Each['CategoryID'],
                    'ProductID' => $Each['ProductID'],
                    'VariantID' => $Each['VariantID'],
                    'QtyToBeOrdered' => $Each['QtyToBeOrdered'],
                    'InventoryOrderID' => $InventoryOrderID
                );
                $Obj = new SqlManager();
                $Obj->addTbls('InventoryData');
                $Obj->addInsrtFlds($data);
                $Obj->insertSingle();
            }
        }
    }

    /**
     * insert Inventory Data
     * @return array
     */
    public static function insertWareInventoryOrderData($Req,$InventoryOrderID)
    {
        unset($Req['ID']);
        foreach($Req as $Each) {
            if(!isset($Each['ID'])) {
                $data = array(
                    'CategoryID' => $Each['CategoryID'],
                    'ProductID' => $Each['ProductID'],
                    'VariantID' => $Each['VariantID'],
                    'QtyForWarehouse' => $Each['QtyForWarehouse'],
                    'RFIDTag' => $Each['RFIDTag'],
                    'InventoryOrderID' => $InventoryOrderID
                );
                $Obj = new SqlManager();
                $Obj->addTbls('InventoryData');
                $Obj->addInsrtFlds($data);
                $Obj->insertSingle();
            }
        }
    }

    /**
     * insert Inventory Data
     * @return array
     */
    public static function insertInventoryData($Req,$InventoryOrderID)
    {
        unset($Req['ID']);
        $OrderType = $Req['OrderTypeID'];
        unset($Req['OrderTypeID']);
        foreach($Req as $Each) {
            if(!isset($Each['ID'])) {
                if ($OrderType == 1) {
                    $data = array(
                        'CategoryID' => $Each['CategoryID'],
                        'ProductID' => $Each['ProductID'],
                        'VariantID' => $Each['VariantID'],
                        'QtyByWarehouse' => $Each['QtyByWarehouse'],
                        'QtyByCustomer' => $Each['QtyByCustomer'],
                        'QtyUsedFromWarehouse' => $Each['QtyUsedFromWarehouse'],
                        'QtyToBeOrdered' => $Each['QtyToBeOrdered'],
                        'InventoryOrderID' => $InventoryOrderID
                    );
                } else {
                    $data = array(
                        'CategoryID' => $Each['CategoryID'],
                        'ProductID' => $Each['ProductID'],
                        'VariantID' => $Each['VariantID'],
                        'QtyForWarehouse' => $Each['QtyForWarehouse'],
                        'RFIDTag' => $Each['RFIDTag'],
                        'InventoryOrderID' => $InventoryOrderID
                    );
                }
            $Obj = new SqlManager();
            $Obj->addTbls('InventoryData');
            $Obj->addInsrtFlds($data);
            $Obj->insertSingle();
            }
        }
    }

     /**
     * insert rfid Data
     * @return array
     */
    public static function RfidInventory($Req)
    {
        // echo "<pre>";
        // print_r($Req);
        // exit;
        $OrderType = $Req['OrderType'];
        unset($Req['OrderType']);

        if ($OrderType == 1) {
            $data = array(
                'OrderTypeID' => $OrderType, 
                'CustomerID' => $Req['RFIDCustomer'], 
                // 'WarehouseID' => $Req['RFIDWarehouse'], 
                'ActionID' => $Req['RFIDOrderingReason'],
                'Flag' => 'F'
            );
        } else if ($OrderType == 2) {
            $data = array(
                'OrderTypeID' => $OrderType, 
                // 'CustomerID' => $Req['RFIDCustomer'], 
                'WarehouseID' => $Req['RFIDWarehouse'], 
                'ActionID' => $Req['RFIDOrderingReason'],
                'Flag' => 'F'
            );
        }
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds($data);
        return $Obj->InsertSingle();
    }
   
    // /**
    //  * insert rfid Data
    //  * @return array
    //  */
    // public static function RfidInventory($Req)
    // {
    //     $Obj = new SqlManager();
    //     $Obj->AddTbls('Inventory');
    //     $Obj->AddInsrtFlds(array(
    //         'OrderTypeID' => $Req['OrderType'], 
    //         'CustomerID' => $Req['RFIDCustomer'], 
    //         // 'WarehouseID' => $Req['RFIDWarehouse'], 
    //         'OrderingReasonID' => $Req['RFIDOrderingReason'],
    //         'Flag' => 'F'
    //     ));
    //     return $Obj->InsertSingle();
    // }
            
    /**
     * insert Inventory
     * @return array
     */
    public static function insertInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Inventory');
        $Obj->addInsrtFlds($Req);
        $ID = $Obj->insertSingle();
        return $ID;
    }

    /**
     * remove Inventory Data
     * @param array $ID
     * @return void
     */
    public static function removeInventory($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryData');
        $Obj->addInsrtFlds(array('Flag' => 'R'));
        $Obj->addFldCond('ID', $ID);
        return $Obj->update();
    }

    /**
     * remove Order RFID Data
     * @param array $ID
     * @return void
     */
    public static function removeOrderRFIDData($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFIDData');
        $Obj->addInsrtFlds(array('Flag' => 'R'));
        $Obj->addFldCond('ID', $ID);
        return $Obj->update();
    }

    /**
     * Order Inventory
     * @param array $ID
     * @return void
     */
    public static function OrderInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'CustomerID' => $Req['CustomerName'],
            'SupplierID' => $Req['SupplierName'],
            'OrderTypeID' => '1',
            'InventoryMoveID' => '1',
            'ActionID' => $Req['OrderingReason'],
            'Flag' => 'C'
        ));
        return $Obj->InsertSingle();
    }

    /**
     * War Inventory
     * @param array $ID
     * @return void
     */
    public static function WarInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'WarehouseID' => $Req['Warehouse'], 
            'SupplierID' => $Req['LinenSupplier'],
            'OrderTypeID' => '2',
            'InventoryMoveID' =>'1',
            'ActionID' => $Req['InventoryReason'],
            'Flag' => 'W'
        ));
        return $Obj->InsertSingle();
    }

    /**
     * Add Inventory
     * @param array $ID
     * @return void
     */
    public static function AddInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'SupplierID' => $Req['InventoryLinenSupplier'], 
            'WarehouseID' => $Req['InvWarehouse'], 
            'ActionID' => '1',
            'InventoryMoveID' => '1', 
            'Flag' => 'S'
        ));
        return $Obj->InsertSingle();
    }

    /**
     * Send Inventory
     * @param array $ID
     * @return void
     */
    public static function SendInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'CustomerID' => $Req['SendCustomer'], 
            'WarehouseID' => $Req['Warehouse'], 
            'ActionID' => $Req['Action'],
            'InventoryMoveID' => '2',
            'Flag' => 'X'
            ));
        return $Obj->InsertSingle();
    }

    /**
     * Return Inventory
     * @param array $ID
     * @return void
     */
    public static function ReturnInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'CustomerID' => $Req['ReturnCustomer'], 
            'WarehouseID' => $Req['Warehouse'], 
            'ActionID' => $Req['ReturnAction'],
            'InventoryMoveID' => '1',
            'Flag' => 'Y'
            ));
           
        return $Obj->InsertSingle();
    }

    /**
     * Purg eInventory
     * @param array $ID
     * @return void
     */
    public static function PurgeInventory($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'ActionID' => $Req['PurgeAction'],
            'WarehouseID' => $Req['PurgeWarehouse'],
            'InventoryMoveID' => '2',
            'Flag' => 'Z'
            ));
        return $Obj->InsertSingle();
    }
    
    /**
     * get Customer Data By ID
     * @param array $ID
     * @return void
     */
    public static function getCustomerDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryData');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res;
    }

    /**
     * get Order RFID Data By ID
     * @param array $ID
     * @return void
     */
    public static function getOrderRFIDDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFIDData');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res;
    }

    /**
     *ge tData By Order
     * @param array $ID
     * @return void
     */
    public static function getDataByOrder($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Inventory');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        $Res['RFIDData'] = self::getDataByInventoryID($ID);
        return $Res;
    }

    /**
     * remove RFIDData
     * @param array $ID
     * @return void
     */
    public static function removeRFIDData($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryData');
        $Obj->addInsrtFlds(array('Flag' => 'R'));
        $Obj->addFldCond('ID', $ID);
        return $Obj->update();
    }

    /**
     * Get data by ID
     * @param int $ID
     * @return array
     */
    public static function getDataByRfidID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Inventory');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        $Res['RFIDData'] = self::getDataBychildrfidID($ID);
        return $Res;
    }

    /**
     * Get data by ID
     * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Inventory');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        $Res['SubInventory'] = self::getDataByInventoryID($ID);
        return $Res;
    }

    /**
     * Get data by InventoryID
     * @param int $ID
     * @return array
     */
    public static function getDataByInventoryID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryData IR');
        $Obj->addFlds(array('IR.ID','C.CategoryName','P.ProductName','V.VariantName','IR.QtyForWarehouse',
        'IR.QtyByCustomer','IR.QtyByWarehouse','IR.QtyUsedFromWarehouse','IR.QtyToBeOrdered','IR.RFIDTag','IR.InventoryOrderID'));
        $Obj->addFldCond('IR.InventoryOrderID', $ID);
        $Obj->addJoinTbl('Category C', 'IR.CategoryID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Product P', 'IR.ProductID', 'P.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Variant V', 'IR.VariantID', 'V.ID', 'LEFT JOIN');
        $Obj->addFldCond('IR.Flag', 'R', '!=');
        $Res =  $Obj->getJoinMultiple();
        return $Res;
    }

    /**
     * Get data by ID
     * @param int $ID
     * @return array
     */
    public static function getInvDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryData');
        $Obj->addFlds('*');
        $Obj->addFldCond('InventoryOrderID', $ID);  
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getMultiple();
        
        $TempArr = array();

        foreach($Res as $Item) {

            if ($Item['CategoryID'] != 0) {
                $Item['CategoryName'] = self::getCategoryByID($Item['CategoryID']);
                if ($Item['ProductID'] != 0) 
                    $Item['ProductName'] = self::getProductByID($Item['ProductID']);
                    if ($Item['VariantID'] != 0)
                        $Item['VariantName'] = self::getVariantByID($Item['VariantID']);
                    $TempArr[] = $Item;
            } else {
                $TempArr[] = $Item;
            }
        }
       
        return $TempArr;
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getOrderRFID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Inventory');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);

        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        $Res['SubInventory'] = self::getDataByRFIDOrderID($ID);
        return $Res;
    }

    public static function getDataByRFIDOrderID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFIDData ORD');
        $Obj->addFlds(array('ORD.ID', 'ORD.QTY', 'RSD.RFIDSupplierName'));
        $Obj->addFldCond('ORD.InventoryID', $ID);
        $Obj->addFldCond('ORD.Flag', 'R', '!=');
        $Obj->addJoinTbl('RFIDSupplierDetails RSD', 'ORD.SupplierID', 'RSD.ID', 'LEFT JOIN');
        $Res = $Obj->getJoinMultiple();

        $TempArr = array();

        foreach($Res as $Item) {
            $TempArr[] = $Item;
        }
        return $TempArr;
    }

    public static function updateOrderRFID($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('Inventory');
        $Obj->AddInsrtFlds(array(
            'CustomerID' => $Row['CustomerID'],
            'OrderingReasonID' => $Row['OrderingReasonID'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        return $Obj->Update(); 
    }

    public static function insertRFIDData($Req, $InventoryOrderID)
    {
        unset($Req['ID']);
        
        foreach($Req as $Each) {
            if(!(isset($Each['ID']) && $Each['ID'] > 0)) {
                $data = array(
                    'InventoryID' => $InventoryOrderID,
                    'QTY' => $Each['QTY'],
                    'SupplierID' => $Each['SupplierID']
                );
                $Obj = new SqlManager();
                $Obj->addTbls('OrderRFIDData');
                $Obj->addInsrtFlds($data);
                $Obj->insertSingle();
            }
        }
    }

    /**
     * Get Product by ID
	 * @param int $ID
     * @return array
     */
    public static function getCategoryByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Category');
        $Obj->addFlds(array('CategoryName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['CategoryName'];
    }

    /**
     * Get Product by ID
	 * @param int $ID
     * @return array
     */
    public static function getProductByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ProductName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['ProductName'];
    }

    /**
     * Get Variant by ID
	 * @param int $ID
     * @return array
     */
    public static function getVariantByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant');
        $Obj->addFlds(array('VariantName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['VariantName'];
    }
    
    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getDataTblListCount($SearchTxt,$CustomerID=0,$SupplierID,$WarehouseID=0,$CategoryID='',$ProductID='',$VariantID='')
    {
        if (is_array($CategoryID))
            $RefIDsStr = "(".implode(", ", $CategoryID).")";
        if (is_array($ProductID))
            $RefIDsStr = "(".implode(", ", $ProductID).")";
        if (is_array($VariantID))
            $RefIDsStr = "(".implode(", ", $VariantID).")";
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj -> addFldCond('I.Flag','R','!=');
        
        if ($SearchTxt !='') {
            
            $Obj -> addFldCond('OrderType', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('InventoryMove', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('ScannedQty', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('ManualQty', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('IdentifyLinen', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('OrderType OIT', 'I.OrderTypeID', 'OIT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('InventoryMove IM', 'I.InventoryMoveID', 'IM.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('IdentifyLinen IL', 'I.IdentifyLinenID', 'IL.ID', 'LEFT JOIN');

        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('OrderingReason OIR', 'I.OrderingReasonID', 'OIR.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');


        if (($CategoryID !='') && ($ProductID !='') &&  ($VariantID !='')) {
            $Obj->addJoinTbl('InventoryData IR','I.ID','IR.InventoryOrderID' , 'LEFT JOIN');
            $Obj->addTblCond('IR.CategoryID', $RefIDsStr);
            $Obj->addTblCond('IR.ProductID', $RefIDsStr);
            $Obj->addTblCond('IR.VariantID', $RefIDsStr, 'IN');
        }

        if($CustomerID != 0) {
            $Obj->addFldCond('I.CustomerID', $CustomerID);
        }
        if($WarehouseID != 0) {
            $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        }
        if($SupplierID != 0) {
            $Obj->addFldCond('I.SupplierID', $SupplierID);
        }
        // if($SupplierID !=0){
        //     $Obj->addFldCond('L.LinenSupplierName', $SupplierID);
        // }
        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='',$CustomerID=0,$WarehouseID=0,$SupplierID=0,$CategoryID='',$ProductID='',$VariantID='')
    {
        if (is_array($CategoryID))
            $RefIDsStr = "(".implode(", ", $CategoryID).")";
        if (is_array($ProductID))
            $RefIDsStr = "(".implode(", ", $ProductID).")";
        if (is_array($VariantID))
            $RefIDsStr = "(".implode(", ", $VariantID).")";
           
        
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID','OrderType','InventoryMove' ,'ScannedQty', 'ManualQty', 'IdentifyLinen','InventoryAction','CustomerName','WarehouseName','LinenSupplierName'));
        $Obj -> addFldCond('I.Flag', 'R', '!=');

        if ($SearchTxt !='') {
            $Obj -> addFldCond('OrderType', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj -> addFldCond('InventoryMove', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('ScannedQty', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('ManualQty', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('IdentifyLinen', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'OR','', ')');
        }
        if ($OrderFld !='')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');

            $Obj->addJoinTbl('OrderType OIT', 'I.OrderTypeID', 'OIT.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('InventoryMove IM', 'I.InventoryMoveID', 'IM.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('IdentifyLinen IL', 'I.IdentifyLinenID', 'IL.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('OrderingReason OIR', 'I.OrderingReasonID', 'OIR.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
    
            if (($CategoryID !='') && ($ProductID !='') &&  ($VariantID !='')) {
                $Obj->addJoinTbl('InventoryData IR','I.ID','IR.InventoryOrderID' , 'LEFT JOIN');
                $Obj->addTblCond('IR.CategoryID', $RefIDsStr);
                $Obj->addTblCond('IR.ProductID', $RefIDsStr);
                $Obj->addTblCond('IR.VariantID', $RefIDsStr, 'IN');
            }
            if($CustomerID != 0) {
                $Obj->addFldCond('I.CustomerID', $CustomerID);
            }
            if($WarehouseID != 0) {
                $Obj->addFldCond('I.WarehouseID', $WarehouseID);
            }
            if($SupplierID != 0) {
                $Obj->addFldCond('I.SupplierID', $SupplierID);
            }
            // if($SupplierID !=0){
            //     $Obj->addFldCond('L.LinenSupplierName', $SupplierID);
            // }
        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getBothDataTblListCount($SearchTxt, $CustomerID = 0, $SupplierID = 0, $WarehouseID = 0)
    {
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag','R','!=');
        $Obj -> addFldCond('I.Flag','A','!=');
        $Obj -> addFldCond('I.Flag','S','!=');
        $Obj -> addFldCond('I.Flag','X','!=');
        $Obj -> addFldCond('I.Flag','Y','!=');
        $Obj -> addFldCond('I.Flag','Z','!=');
        
        if ($SearchTxt !='') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        if($CustomerID != 0) {
            $Obj->addFldCond('I.CustomerID', $CustomerID);
        }
        if($WarehouseID != 0) {
            $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        }
        if($SupplierID != 0) {
            $Obj->addFldCond('I.SupplierID', $SupplierID);
        }
        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getBothDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='', $CustomerID = 0, $WarehouseID = 0, $SupplierID = 0)
    {   
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID', 'CustomerName', 'WarehouseName', 'LinenSupplierName', 'InventoryAction'));
        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag', 'R', '!=');
        $Obj -> addFldCond('I.Flag', 'A', '!=');
        $Obj -> addFldCond('I.Flag', 'S', '!=');
        $Obj -> addFldCond('I.Flag', 'X', '!=');
        $Obj -> addFldCond('I.Flag', 'Y', '!=');
        $Obj -> addFldCond('I.Flag', 'Z', '!=');

        if ($SearchTxt !='') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld !='')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');
    
            if($CustomerID != 0) {
                $Obj->addFldCond('I.CustomerID', $CustomerID);
            }
            if($WarehouseID != 0) {
                $Obj->addFldCond('I.WarehouseID', $WarehouseID);
            }
            if($SupplierID != 0) {
                $Obj->addFldCond('I.SupplierID', $SupplierID);
            }
        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getCustomerDataTblListCount($SearchTxt, $CustomerID = 0, $SupplierID = 0)
    {
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
        $Obj -> addFldCond('I.Flag','R','!=');
        $Obj -> addFldCond('I.Flag','C');
        
        if ($SearchTxt !='') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        if($CustomerID != 0) {
            $Obj->addFldCond('I.CustomerID', $CustomerID);
        }
        if($SupplierID != 0) {
            $Obj->addFldCond('I.SupplierID', $SupplierID);
        }

        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getCustomerDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='', $CustomerID = 0, $SupplierID = 0)
    {
        
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID', 'CustomerName', 'LinenSupplierName', 'InventoryAction'));
        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
        $Obj -> addFldCond('I.Flag', 'R', '!=');
        $Obj -> addFldCond('I.Flag','C');

        if ($SearchTxt != '') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld != '')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');
            
        if($CustomerID != 0) {
            $Obj->addFldCond('I.CustomerID', $CustomerID);
        }
        if($SupplierID != 0) {
            $Obj->addFldCond('I.SupplierID', $SupplierID);
        }

        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getWarehouseDataTblListCount($SearchTxt, $WarehouseID = 0, $SupplierID = 0)
    {
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
        $Obj -> addFldCond('I.Flag','R','!=');
        $Obj -> addFldCond('I.Flag','W');
        
        if ($SearchTxt !='') {
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        if($WarehouseID != 0) {
            $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        }
        if($SupplierID != 0) {
            $Obj->addFldCond('I.SupplierID', $SupplierID);
        }

        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getWarehouseDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='', $WarehouseID = 0, $SupplierID = 0)
    {
        
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID', 'WarehouseName', 'LinenSupplierName', 'InventoryAction'));
        $Obj->addJoinTbl('InventoryAction A', 'I.ActionID', 'A.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LinenSupplierDetails L','I.SupplierID','L.ID','LEFT JOIN');
        $Obj -> addFldCond('I.Flag', 'R', '!=');
        $Obj -> addFldCond('I.Flag','W');

        if ($SearchTxt !='') {
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld !='')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');

        if($WarehouseID != 0) {
            $Obj->addFldCond('I.WarehouseID', $WarehouseID);
        }
        if($SupplierID != 0) {
            $Obj->addFldCond('I.SupplierID', $SupplierID);
        }

        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getViewBothDataTblListCount($SearchTxt, $CustomerID = 0, $SupplierID = 0, $WarehouseID = 0)
    {
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag','R','!=');
        $Obj -> addFldCond('I.Flag','A','!=');
        $Obj -> addFldCond('I.Flag','S','!=');
        $Obj -> addFldCond('I.Flag','X','!=');
        $Obj -> addFldCond('I.Flag','Y','!=');
        $Obj -> addFldCond('I.Flag','Z','!=');
        
        if ($SearchTxt !='') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('Modified', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getViewBothDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='')
    {   
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID', 'C.CustomerName', 'W.WarehouseName', 'I.Modified'));
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag', 'R', '!=');
        $Obj -> addFldCond('I.Flag', 'A', '!=');
        $Obj -> addFldCond('I.Flag', 'S', '!=');
        $Obj -> addFldCond('I.Flag', 'X', '!=');
        $Obj -> addFldCond('I.Flag', 'Y', '!=');
        $Obj -> addFldCond('I.Flag', 'Z', '!=');

        if ($SearchTxt !='') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj -> addFldCond('Modified', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld !='')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');
    
        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getViewCustomerDataTblListCount($SearchTxt)
    {
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag','R','!=');
        $Obj -> addFldCond('I.Flag','C');
        
        if ($SearchTxt !='') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('Modified', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getViewCustomerDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='')
    {
        
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID', 'C.CustomerName', 'I.Modified'));
        $Obj->addJoinTbl('CustomerDetails C', 'I.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag', 'R', '!=');
        $Obj -> addFldCond('I.Flag','C');

        if ($SearchTxt != '') {
            $Obj -> addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('Modified', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld != '')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');

        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getViewWarehouseDataTblListCount($SearchTxt)
    {
        $Obj = new SqlManager();
        $Obj -> addTbls(array('Inventory I'));
        $Obj -> addFlds(array('COUNT(#I.ID#) RowCount'));
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag','R','!=');
        $Obj -> addFldCond('I.Flag','W');
        
        if ($SearchTxt !='') {
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('Modified', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Res = $Obj->getJoinSingle();
        return $Res['RowCount'];
    }

    /**
     * Get data table list
     * @param int $Index
     * @param int $Limit
     * @param string $SearchTxt
     * @param string $OrderFld
     * @param string $OrderType
     * @return array 
     */
    public static function getViewWarehouseDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='')
    {
        
        $Obj = new SqlManager();
        $Obj -> addTbls('Inventory I');
        $Obj -> addFlds(array('I.ID', 'W.WarehouseName', 'I.Modified'));
        $Obj->addJoinTbl('Warehouse W', 'I.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj -> addFldCond('I.Flag', 'R', '!=');
        $Obj -> addFldCond('I.Flag','W');

        if ($SearchTxt !='') {
            $Obj -> addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj -> addFldCond('Modified', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld !='')
            $Obj -> addOrderFlds($OrderFld,$OrderType);
        else
            $Obj -> addOrderFlds('ID', 'DESC');

        $Obj -> addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
    }


        public static function generateReportXLSX($IC, $InventoryDataID, $InventoryID, $RWP, $Options)
        {
            $XObj = new PHPExcel();
            $XObj->setActiveSheetIndex(0);
            $XObj->getActiveSheet()->setTitle("Inventory");
    
            $DObj = new ExcelWorksheetDrawing();
            $DObj->setName('RNT LOGO');
            $DObj->setDescription('RNT LOGO');
            $DObj->setPath('img/rentatowel-logo.jpg');
            $DObj->setCoordinates('C2');                      
            
            $DObj->setWorksheet($XObj->getActiveSheet());
    
            $XObj->getActiveSheet()->SetCellValue('A3', 'Rent A Towel');
            $XObj->getActiveSheet()->getStyle('A3')->applyFromArray(self::getTitleStyle());
    
            $RNTDetails = self::getRNTDetails();
            $Y = 4;
            foreach ($RNTDetails as $Item) {
                $XObj->getActiveSheet()->SetCellValue('A'.(++$Y), $Item);
            }
    
            $InventoryDetails = self::getInventoryDetails($IC, $InventoryDataID, $InventoryID, $Options);
    
            $Y = 4;
            foreach ($InventoryDetails as $Key => $Item) {
                $XObj->getActiveSheet()->SetCellValue('B'.(++$Y), $Key);
                $XObj->getActiveSheet()->SetCellValue('C'.($Y), $InventoryDetails[$Key]);
            }
            
            $XObj->getActiveSheet()->getStyle('C5:C'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());
            $XObj->getActiveSheet()->getStyle('B5:B'.$Y)->applyFromArray(self::getReportDetailLabelStyle());
            
            /* Customer details starts */
            $XObj->getActiveSheet()->SetCellValue('A11', 'Customer');
            $XObj->getActiveSheet()->getStyle('A11')->applyFromArray(self::getTableHeaderStyle());
            
            if (isset($IC['CategoryID']) && $IC['CategoryID'] != '')
                $XObj->getActiveSheet()->SetCellValue('A12', $IC['CategoryID']);
            if (isset($IC['ProductID']) && $IC['ProductID'] != '')
                $XObj->getActiveSheet()->SetCellValue('A13', $IC['ProductID']);
            if (isset($IC['VariantID']) && $IC['VariantID'] != '')
                $XObj->getActiveSheet()->SetCellValue('A14', $IC['VariantID']);
            if (isset($IC['QtyForCustomer']) && $IC['QtyForCustomer'] != '')
                $XObj->getActiveSheet()->SetCellValue('A14', $IC['QtyForCustomer']);
            if (isset($IC['QtyByCustomer']) && $IC['QtyByCustomer'] != '')
                $XObj->getActiveSheet()->SetCellValue('A14', $IC['QtyByCustomer']);
            if (isset($IC['QtytobeOrdered']) && $IC['QtytobeOrdered'] != '') 
                $XObj->getActiveSheet()->SetCellValue('A14', $IC['QtytobeOrdered']);
            
            /* Varient item list starts */
            $XObj->getActiveSheet()->SetCellValue('A19', 'CategoryID');
            $XObj->getActiveSheet()->SetCellValue('B19', 'VariantID');
            $XObj->getActiveSheet()->SetCellValue('C19', 'ProductID');
            $XObj->getActiveSheet()->SetCellValue('D19', 'Quantity By Customer');
            $XObj->getActiveSheet()->SetCellValue('E19', 'Qty to be Ordered ');
            $XObj->getActiveSheet()->getStyle('A19:E19')->applyFromArray(self::getTableHeaderStyle());
            
            $Y = 20;
            foreach ($IC as $Data) {
        
                $XObj->getActiveSheet()->SetCellValue('A'.$Y, $Data['CategoryID']);
                $XObj->getActiveSheet()->SetCellValue('B'.$Y, $Data['ProductID']);
                $XObj->getActiveSheet()->SetCellValue('C'.$Y, $Data['VariantID']);
                $XObj->getActiveSheet()->SetCellValue('D'.$Y, $Data['QtyByCustomer']);
                $XObj->getActiveSheet()->SetCellValue('E'.$Y, $Data['QtyForCustomer']);
                $XObj->getActiveSheet()->SetCellValue('F'.$Y, round($Data['QtytobeOrdered']));
                //$XObj->getActiveSheet()->SetCellValue('C'.$Y, self::calculateUnitRate($Item['PurchaseCost'], $RWP, $IC['OccupancyConsidering'], $Item['LaundryCost'], $IC['PTMargin']));
    
                if (($Y % 2) != 0)
                    $XObj->getActiveSheet()->getStyle('A'.$Y.':G'.$Y)->applyFromArray(self::getAlternateRowStyle());
                $Y++;
            }
    
            $XObj->getActiveSheet()->getStyle('A20:A'.($Y - 1))->applyFromArray(self::getBorderStyle());
            $XObj->getActiveSheet()->getStyle('B20:B'.($Y - 1))->applyFromArray(self::getBorderStyle());
            $XObj->getActiveSheet()->getStyle('C20:C'.($Y - 1))->applyFromArray(self::getBorderStyle());
            $XObj->getActiveSheet()->getStyle('D20:D'.($Y - 1))->applyFromArray(self::getBorderStyle());
            $XObj->getActiveSheet()->getStyle('E20:E'.($Y - 1))->applyFromArray(self::getBorderStyle());
            $XObj->getActiveSheet()->getStyle('F20:F'.($Y - 1))->applyFromArray(self::getBorderStyle());
    
            $XObj->getActiveSheet()->getStyle('B20:B'.($Y - 1))->applyFromArray(self::getColumnCenterAlignmentStyle());
            /* Varient item list ends */
    
            $XObj->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
            $XObj->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
            $XObj->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
            $XObj->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
            $XObj->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
            $XObj->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
    
            $XObj->getActiveSheet()->SetCellValue('A'.++$Y, 'TERMS AND CONDITIONS');
            $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getTableHeaderStyle());
            
            $Y = $Y + 6;
            $XObj->getActiveSheet()->SetCellValue('A'.++$Y, 'If you have any questions about this Inventory Details, please contact');
            $XObj->getActiveSheet()->mergeCells('A'.$Y.':C'.$Y);
            $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());
    
            $XObj->getActiveSheet()->SetCellValue('A'.++$Y, '[Name, Phone #, E-mail]');
            $XObj->getActiveSheet()->mergeCells('A'.$Y.':C'.$Y);
            $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());
    
            $Y = $Y + 1;
            $XObj->getActiveSheet()->SetCellValue('A'.++$Y, 'Thank You For Your Business!');
            $XObj->getActiveSheet()->mergeCells('A'.$Y.':C'.$Y);
            $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());
            $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getThankYouTextStyle());
    
            $FilePath = $Options['VERSION_PATH'].'inventory/1-1-'.date('Ymd').'-'.date('His').'.xlsx';
            $StoragePath = $Options['DATA_STORAGE_BASE_PATH'].$FilePath;
    
            $XLSX = new PHPExcelWriter($XObj);
            $XLSX->save($StoragePath);
            
            return array(
                'FilePath' => $FilePath,
                'DownloadUrl' => self::generateDownloadPath($StoragePath, $Options['DOWNLOAD_PATH'])
            );
        }
        /**
         * Generate download path
         * @param string $StoragePath
         * @param string $DownloadPath
         * @return string
         */
        private static function generateDownloadPath($StoragePath, $DownloadPath)
        {
            return $DownloadPath.'?key='.urlencode(base64_encode(realpath($StoragePath)));
        }

        /**
         * Get title style
         * @return array
         */
        private static function getTitleStyle()
        {
            return array(
                'font' => array(
                    'size' => 19,
                    'name' => 'Trebuchet MS'
                )
            );
        }

        /**
         * Get Report detail label style
         * @return array
         */
        private static function getReportDetailLabelStyle()
        {
            return array(
                'font' => array(
                    'bold' => true,
                    'size' => 10,
                    'name' => 'Trebuchet MS'
                )
            );
        }
        /**
         * Get RNT details
         * @return array
         */
        private static function getRNTDetails()
        {
            return array(
                'Address' => '306, Third Floor, Zainal Mohebi Plaza',
                'Zip' => 'Dubai 341182',
                'Phone' => 'Phone: [000-000-0000]',
                'Fax' => 'Fax: [000-000-0000]',
                'PreparedBy' => 'Prepared by:'
            );
        }
        /**
         * Get Report details
         * @param int $ValidDays
         * @param int $InventoryDataID
         * @param int $InventoryID
         * @param array $Options
         * @return array
         */
        private static function getInventoryDetails($ValidDays, $InventoryDataID, $InventoryID, $Options)
        {
            return array(
                'DATE:' => self::getCurrentDate($Options),
                'Report #' => self::generateReportNumber($InventoryDataID, $InventoryID),
                'Valid Until:' => self::calculateValidity($ValidDays, $Options)
            );
        }

    /**
     * Calculate validity
     * @param int $ValidDays
     * @param array $Options
     * @return string
     */
    private static function calculateValidity($ValidDays, $Options)
    {
        return date($Options['XLSX_DATE_FORMAT'], strtotime('+'.' days'));
    }

        /**
         * Generate Report #
         * @param int $SupplierID
         * @param int $CustomerID
         * @return string
         */
        private static function generateReportNumber($InventoryDataID, $InventoryID)
        {
            return $InventoryDataID.'/'.$InventoryID.'/'.date('dmY');
        }
    
        /**
         * Get table header style
         * @return array
         */
        private static function getTableHeaderStyle()
        {
            return array(
                'font' => array(
                    'bold' => true,
                    'size' => 11,
                    'color' => array('rgb' => 'FFFFFF'),
                    'name' => 'Trebuchet MS'
                ),
                'fill' => array(
                    'type' => ExcelStyleFill::FILL_SOLID,
                    'startcolor' => array('rgb' => 'FF6600')
                )
            );
        }

        /**
         * Get Report detail label style
         * @return array
         */
        private static function getThankYouTextStyle()
        {
            return array(
                'font' => array(
                    'bold' => true,
                    'italic' => true,
                    'size' => 12,
                    'name' => 'Trebuchet MS'
                )
            );
        }

    /**
     * Get alternate row style
     * @return array
     */
    private static function getAlternateRowStyle()
    {
        return array(
            'fill' => array(
                'type' => ExcelStyleFill::FILL_SOLID,
                'startcolor' => array('rgb' => 'C0C0C0')
            )
        );
    }

    /**
     * Get column center alignment style
     * @return array
     */
    private static function getColumnCenterAlignmentStyle()
    {
        return array(
            'alignment' => array(
                'horizontal' => ExcelStyleAlignment::HORIZONTAL_CENTER
            )
        );
    }

    /**
     * Get border style
     * @return array
     */
    private static function getBorderStyle()
    {
        return array(
            'borders' => array(
                'outline' => array(
                    'style' => ExcelStyleBorder::BORDER_THIN
                )
            )
        );
    }

    /**
     * Get current date
     * @param array $Options
     * @return string
     */
    private static function getCurrentDate($Options)
    {
        return date($Options['XLSX_DATE_FORMAT']);
    }
    
    }

?>
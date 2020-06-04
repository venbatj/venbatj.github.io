<?php

namespace Rnt\Inventory;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;


class OrderRFIDRepository implements IRepository
{
    use AERRepository;  

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'OrderRFID';
    }

    /**
     * Get reference field
     * @return string
     */
    public static function getReferenceField()
    {
        return 'ID';
    }

    /**
     * Get All data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFID');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple();

    }

    /**
     * Insert OrderRFID
	 * @param int $Row
     * @return array
     */
    public static function insertRFID($Req)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFID');
        $Obj->addInsrtFlds($Req);
        $ID = $Obj->insertSingle();
        return $ID;
    }

    /**
     * Update OrderRFID
	 * @param array $Req
     * @param array $ID
     * @return array
     */
    public static function updateOrderRFID($Row)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('OrderRFID');
        $Obj->AddInsrtFlds(array(
            'OrderTypeID' => $Row['OrderTypeID'],
            'CustomerID' => $Row['CustomerID'],
            'OrderingReasonID' => $Row['OrderingReasonID'])
        );
        $Obj->AddFldCond('ID', $Row['ID']);
        return $Obj->Update(); 
    }

    /**
     * Insert OrderRFID
	 * @param int $Row
     * @return array
     */
    public static function insertRFIDData($Req, $RFIDOrderID)
    {
        unset($Req['ID']);
        
        foreach($Req as $Each) {
            if(!(isset($Each['ID']) && $Each['ID'] > 0)) {
                $data = array(
                    'RFIDOrderID' => $RFIDOrderID,
                    'ProductID' => $Each['ProductID'],
                    'Qty' => $Each['Qty'],
                    'Description' => $Each['Description'],
                    'RFIDSupplyVendor' => $Each['RFIDSupplyVendor']
                );
                $Obj = new SqlManager();
                $Obj->addTbls('OrderRFIDData');
                $Obj->addInsrtFlds($data);
                $Obj->insertSingle();
            }
        }
    }

    /**
     * remove RFIDData
     * @param array $ID
     * @return void
     */
    public static function removeRFIDData($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFIDData');
        $Obj->addInsrtFlds(array('Flag' => 'R'));
        $Obj->addFldCond('ID', $ID);
        return $Obj->update();
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFID');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);

        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        $Res['RFIDData'] = self::getDataByRFIDOrderID($ID);
        return $Res;
    }

    public static function getDataByRFIDOrderID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFIDData');
        $Obj->addFlds('*');
        $Obj->addFldCond('RFIDOrderID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getMultiple();

        $TempArr = array();

        foreach($Res as $Item) {
            $TempArr[] = $Item;
        }
        return $TempArr;
    }

    /**
     * Get data table list count
     * @param string $SeratcTxt
     * @return int
     */
    public static function getDataTblListCount($SearchTxt)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('OrderRFID R'));
        $Obj->addFlds(array('COUNT(#R.ID#) RowCount'));
        $Obj->addFldCond('R.Flag','R','!=');
        
        if ($SearchTxt !='') {
            $Obj->addFldCond('OrderType', "%{$SearchTxt}%", 'LIKE', 'AND','(');
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('OrderingReason', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('OrderType OT', 'R.OrderTypeID', 'OT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerDetails C', 'R.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('OrderingReason OIR', 'R.OrderingReasonID', 'OIR.ID', 'LEFT JOIN');
        
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
    public static function getDataTblList($Index, $Limit, $SearchTxt ='', $OrderFld ='', $OrderType ='')
    {
        $Obj = new SqlManager();
        $Obj->addTbls('OrderRFID R');
        $Obj->addFlds(array('R.ID','OT.OrderType','C.CustomerName' ,'OIR.OrderingReason'));
        $Obj->addFldCond('R.Flag', 'R', '!=');

        if ($SearchTxt !='') {
            $Obj->addFldCond('OrderType', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('OrderingReason', "%{$SearchTxt}%", 'LIKE', 'OR','', ')');
        }
        if ($OrderFld !='')
            $Obj->addOrderFlds($OrderFld,$OrderType);
        else
            $Obj->addOrderFlds('ID', 'DESC');

            $Obj->addJoinTbl('OrderType OT', 'R.OrderTypeID', 'OT.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('CustomerDetails C', 'R.CustomerID', 'C.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('OrderingReason OIR', 'R.OrderingReasonID', 'OIR.ID', 'LEFT JOIN');
            $Obj->addLimit($Index, $Limit);

        return $Obj->getJoinMultiple();
    }
}

?>
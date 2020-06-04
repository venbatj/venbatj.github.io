<?php
namespace Rnt\Controller\Inventory;

use Rnt\Inventory\OrderRFIDRepository as ORR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils ;

Class OrderRFID
{
    /**
     * get All data
     * @return string 
     */
    public static function getAllData()
    {
        return Utils::response(ORR::getAllData(), true);
    }

    /**
     * insert update
     * @param array
     * @return string
     */
    public static function insertUpdate($Req)
    {
        if (isset($Req['RFID']['ID']) && $Req['RFID']['ID'] > 0) {
            $OrderRFID = $Req['RFID']['ID'];
            ORR::updateOrderRFID($Req['RFID']);
            $RFIDOrderID = $OrderRFID;
            return Utils::response(ORR::insertRFIDData($Req['RFIDData'], $OrderRFID), true);
        } else {
            $OrderRFID = Utils::response(ORR::insertRFID($Req['RFID']), true);
           
            $RFIDOrderID = $OrderRFID['D'];
            $Res = Utils::response(ORR::insertRFIDData($Req['RFIDData'], $RFIDOrderID), true);
        }
            return Utils::response($OrderRFID,true);
    }

    /**
     * remove
     * 
     */
    public static function remove($Req)
    {
        if(!isset($Req['IDArr']))
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        
        return Utils::response(ORR::remove($Req['IDArr']), true);
    }

    public static function removeRFIDData($Req)
    {
        if(!isset($Req['ID']))
            return Utils::errorResponse('ID\s to be removed are missing in the parameter');
        
        return Utils::response(ORR::removeRFIDData($Req['ID']), true);
    }

    /**
     * get data by page
     * @param array
     * @return string
     */
    public static function getDataByPage($Req)
    {
        $Columns = array('','OrderType','CustomerName', 'OrderingReason');
        $Attributes = DT::getAttributes($Req,$Columns);
        $RowCount = ORR::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData = ORR::getDataTblList($Attributes['StartIndex'],$Attributes['Limit'],$Attributes['DataTableSearch'],$Attributes['DataTableOrderCol'],$Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'],$RowCount,$ResData);
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

        $Res = ORR::getDataByID($Req['ID']);
        
        return Utils::Response($Res,true);
    }
}

?>
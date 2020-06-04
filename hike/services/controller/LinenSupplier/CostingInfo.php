<?php
namespace Rnt\Controller\LinenSupplier;

use Rnt\LinenSupplier\CostingInfoRepository as CSIR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * CostingInfo
 * 
 * @package Rnt\Controller\LinenSupplier
 */
class CostingInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CSIR::getAllData(), true);
    }

    /**
     * Insert / Update LinenSupplier
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {        
        if (CSIR::isExistLinen($Req))
            // return Utils::errorResponse('Item "'.$Req['CategoryID'].'" already exists!');
            return Utils::errorResponse('This Item is already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $ID = $Req['ID'];
            CSIR::update($Req);
        } else {
            $ID = CSIR::insert($Req);
        }
        return Utils::response($ID, true);
    }

    /**
     * Remove laundry
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CSIR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'CategoryName', 'ProductName', 'VariantName', 'Cost');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CSIR::getDataTblListCount($Req['LinenSupplierID'], $Attributes['DataTableSearch']);
		$ResData  = CSIR::getDataTblList($Req['LinenSupplierID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * Get data by ID
     * @param $Req
     * @return array
     */
    public static function getDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID parameter missing');
        
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        $Res = CSIR::getDataByID($Req['ID']);     
        return Utils::response($Res, true);
    }
}
?>
<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\InventoryTypeRepository as ITR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * InventoryType
 * 
 * @package Rnt\Controller\Masters
 */
class InventoryType
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(ITR::getAllData(), true);
    }

    /**
     * Insert / Update InventoryType
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (ITR::isExists($Req))
            return Utils::errorResponse('InventoryType "'.$Req['InventoryType'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(ITR::update($Req), true);
        else
            return Utils::response(ITR::insert($Req), true);
    }

    /**
     * Remove InventoryType
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(ITR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'InventoryType');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = ITR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = ITR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(ITR::getDataByID($Req['ID']), true);
    }
}
?>
<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\InventoryActionRepository as CR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * InventoryAction
 * 
 * @package Rnt\Controller\Masters
 */
class InventoryAction
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CR::getAllData(), true);
    }

    /**
     * Insert / Update InventoryAction
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        // if (CR::isExists($Req))
        //     return Utils::errorResponse('InventoryAction "'.$Req['InventoryAction'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(CR::update($Req), true);
        else
            return Utils::response(CR::insert($Req), true);
    }

    /**
     * Remove InventoryAction
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'InventoryTypeID', 'InventoryAction', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = CR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(CR::getDataByID($Req['ID']), true);
    }
}
?>
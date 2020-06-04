<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\WarehouseRepository as WR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Warehouse
 * 
 * @package Rnt\Controller\Masters
 */
class Warehouse
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(WR::getAllData(), true);
    }

    /**
     * Insert / Update category
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (WR::isExists($Req))
            return Utils::errorResponse('Warehouse "'.$Req['WarehouseName'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(WR::update($Req), true);
        else
            return Utils::response(WR::insert($Req), true);
    }

    /**
     * Remove category
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(WR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'WarehouseName','WarehouseManager','Rooms','CityID', 'CountryID');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = WR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = WR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(WR::getDataByID($Req['ID']), true);
    }
}
?>
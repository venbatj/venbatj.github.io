<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\DesignationRepository as DR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Designation
 * 
 * @package Rnt\Controller\Masters
 */
class Designation
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(DR::getAllData(), true);
    }

    /**
     * Insert / Update Designation
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (DR::isExists($Req))
            return Utils::errorResponse('Designation "'.$Req['Designation'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(DR::update($Req), true);
        else
            return Utils::response(DR::insert($Req), true);
    }

    /**
     * Remove designation
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(DR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'Designation');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = DR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = DR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(DR::getDataByID($Req['ID']), true);
    }
}
?>
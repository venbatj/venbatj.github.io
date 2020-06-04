<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\MenuRepository as CR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Menu
 * 
 * @package Rnt\Controller\Settings
 */
class Menu
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
     * Insert / Update Menu
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (CR::isExists($Req))
            return Utils::errorResponse('Menu "'.$Req['MenuName'].'" already exists!');
            if (CR::isExists($Req))
                return Utils::errorResponse('Menu "'.$Req['Icon'].'" already exists!');
                if (CR::isExists($Req))
                    return Utils::errorResponse('Menu "'.$Req['Path'].'" already exists!');
                    if (CR::isExists($Req))
                        return Utils::errorResponse('Menu "'.$Req['DisplayInMenu'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(CR::update($Req), true);
        else
            return Utils::response(CR::insert($Req), true);
    }

    /**
     * Remove Menu
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
        $Columns = array('', 'MenuName', 'Icon', 'Path', 'DisplayInMenu','Description', 'MenuID');
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
<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\CityRepository as CR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * City
 * 
 * @package Rnt\Controller\Masters
 */
class City
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
     * Insert / Update City
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        // print_r($Req);
        // exit;
        if (CR::isExists($Req))
            return Utils::errorResponse('City "'.$Req['CountryID'].'" already exists!');

        if (CR::isExists($Req))
            return Utils::errorResponse('City "'.$Req['CityName'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(CR::update($Req), true);
        else
            return Utils::response(CR::insert($Req), true);
    }

    /**
     * Remove city
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
        $Columns = array('', 'CT.CountryName', 'C.CityName');
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
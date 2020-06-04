<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\ParameterRepository as PR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Parameter
 * 
 * @package Rnt\Controller\Masters
 */
class Parameter
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(PR::getAllData(), true);
    }

    /**
     * Insert / Update Parameter
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (PR::isExists($Req))
            return Utils::errorResponse('Parameter "'.$Req['ParameterKey'].'" already exists!');

        if (PR::isExists($Req))
            return Utils::errorResponse('Parameter "'.$Req['ParameterValue'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(PR::update($Req), true);
        else
            return Utils::response(PR::insert($Req), true);
    }

    /**
     * Remove Parameter
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(PR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'ParameterKey', 'ParameterValue', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = PR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = PR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(PR::getDataByID($Req['ID']), true);
    }
}
?>
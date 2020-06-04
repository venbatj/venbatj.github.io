<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\ContractTypeRepository as CTR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * ContractType
 * 
 * @package Rnt\Controller\Masters
 */
class ContractType
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CTR::getAllData(), true);
    }

    /**
     * Insert / Update ContractType
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (CTR::isExists($Req))
            return Utils::errorResponse('ContractType "'.$Req['ContractType'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(CTR::update($Req), true);
        else
            return Utils::response(CTR::insert($Req), true);
    }

    /**
     * Remove ContractType
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CTR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'ContractType', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CTR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = CTR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(CTR::getDataByID($Req['ID']), true);
    }
}
?>
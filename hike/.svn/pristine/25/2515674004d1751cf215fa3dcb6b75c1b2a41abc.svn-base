<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\VariantRepository as VR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Variant
 * 
 * @package Rnt\Controller\Masters
 */
class Variant
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(VR::getAllData(), true);
    }

    /**
     * Insert / Update variant
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (VR::isExists($Req))
            return Utils::errorResponse('Variant "'.$Req['VariantName'].'" already exists!');

        if (VR::isExists($Req))
            return Utils::errorResponse('Variant "'.$Req['VariantCode'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(VR::update($Req), true);
        else
            return Utils::response(VR::insert($Req), true);
    }

    /**
     * Remove variant
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(VR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'VariantName', 'VariantCode', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = VR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = VR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(VR::getDataByID($Req['ID']), true);
    }
}
?>
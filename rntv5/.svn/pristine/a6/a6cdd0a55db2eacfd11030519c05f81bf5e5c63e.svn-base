<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\QuoteTypeRepository as QTR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * QuoteType
 * 
 * @package Rnt\Controller\Masters
 */
class QuoteType
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(QTR::getAllData(), true);
    }

    /**
     * Insert / Update quote type
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (QTR::isExists($Req))
            return Utils::errorResponse('QuoteType "'.$Req['QuoteType'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(QTR::update($Req), true);
        else
            return Utils::response(QTR::insert($Req), true);
    }

    /**
     * Remove quote type
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(QTR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'QuoteType', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = QTR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = QTR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(QTR::getDataByID($Req['ID']), true);
    }
}
?>
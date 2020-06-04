<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\CurrencyRepository as CR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Currency
 * 
 * @package Rnt\Controller\Masters
 */
class Currency
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
     * Insert / Update Currency
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (CR::isExists($Req))
            return Utils::errorResponse('Currency "'.$Req['CurrencyName'].'" already exists!');
        if (CR::isExists($Req))
            return Utils::errorResponse('Currency "'.$Req['Code'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $Req['ERModifiedAt'] = $currentDateTime = date('Y-m-d H:i:s');
            return Utils::response(CR::updateCurrency($Req), true);
        }
        else {
            return Utils::response(CR::insert($Req), true);
        }
    }

    /**
     * Remove Currency
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
        $Columns = array('', 'CurrencyName', 'Code','ExchangeRate','ERModifiedAt');
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
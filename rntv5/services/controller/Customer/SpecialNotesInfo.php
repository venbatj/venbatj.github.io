<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\SpecialNotesInfoRepository as SNIR;
use Rnt\Customer\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * SpecialNotesInfo
 * 
 * @package Rnt\Controller\Customer
 */
class SpecialNotesInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(SNIR::getAllData(), true);
    }

    /**
     * Insert / Update Customer SpecialNotes
     * @param array $Req
     * @param array $GD
     * @param array $File
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
    
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $CustomerID = $Req['ID'];
            SNIR::update($Req);
        } else {
            $CustomerID = SNIR::insert($Req);
        }

        return Utils::response($CustomerID, true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'Laundry', 'Linen', 'Management');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = SNIR::getDataTblListCount($Req['CustomerID'], $Attributes['DataTableSearch']);
        $ResData  = SNIR::getDataTblList($Req['CustomerID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(SNIR::getDataByID($Req['ID']), true);
    }
}
?>
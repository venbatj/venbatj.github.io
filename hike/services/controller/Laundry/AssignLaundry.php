<?php
namespace Rnt\Controller\Laundry;

use Rnt\Laundry\AssignLaundryRepository as ALR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * AssignLaundry
 * 
 * @package Rnt\Controller\Laundry
 */
class AssignLaundry
{

    /**
     * Insert / Update Laundry
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $ID = $Req['ID'];
            ALR::update($Req);
        } else {
            $ID = ALR::insert($Req);
        }
        return Utils::response($ID, true);
    }
    /**
     * Insert  Laundry
     * @param array $Req
     * @return array
     */
    public static function InsertLaundry($Req)
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $ID = $Req['ID'];
            ALR::update($Req);
        } else {
            $ID = ALR::insert($Req);
        }
        return Utils::response($ID, true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'CustomerID', 'CustomerLocationID', 'LaundryID', 'LaundryLocationID','StartDate','EndDate');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = ALR::getDataTblListCount( $Attributes['DataTableSearch']);
		$ResData  = ALR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        $Res = ALR::getDataByID($Req['ID']);     

        if (isset($Res['StartDate']) && $Res['StartDate'] != '0000-00-00')
            $Res['StartDate'] = date("j M Y", strtotime($Res['StartDate']));
        if (isset($Res['EndDate']) && $Res['EndDate'] != '0000-00-00')
        $Res['EndDate'] = date("j M Y", strtotime($Res['EndDate']));
        return Utils::response($Res, true);
    }
    /**
     * Get data by ID
     * @param $Req
     * @return array
     */
    public static function getDataByLocationID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID parameter missing');
        
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        $Res = ALR::getDataByLocationID($Req['ID']);     

        if (isset($Res['StartDate']) && $Res['StartDate'] != '0000-00-00')
            $Res['StartDate'] = date("j M Y", strtotime($Res['StartDate']));
        if (isset($Res['EndDate']) && $Res['EndDate'] != '0000-00-00')
            $Res['EndDate'] = date("j M Y", strtotime($Res['EndDate']));
        return Utils::response($Res, true);
    }
    /**
     * Get data by ID
     * @param $Req
     * @return array
     */
    public static function getDataByLaundryLocID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID parameter missing');
        
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        $Res = ALR::getDataByLaundryLocID($Req['ID']);     

        if (isset($Res['StartDate']) && $Res['StartDate'] != '0000-00-00')
            $Res['StartDate'] = date("j M Y", strtotime($Res['StartDate']));
        if (isset($Res['EndDate']) && $Res['EndDate'] != '0000-00-00')
            $Res['EndDate'] = date("j M Y", strtotime($Res['EndDate']));
        return Utils::response($Res, true);
    }

}
?>
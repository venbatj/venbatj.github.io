<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\AssignLaundryRepository as ALR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Basic Details
 * 
 * @package Rnt\Controller\Customer
 */
Class AssignLaundry{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(ALR::getAllData(), true);
    }
    public static function getDateByLocationID($Req)
    {
        return Utils::response(ALR::getDateByLocationID($Req['ID']), true);
    }
    /**
     * Insert / Update Customer
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $CustomerID	 = $Req['ID'];
            $LocationID	 = $Req['LocationID'];
            ALR::update($Req);
        } else {
            // $LocationID	 = $Req['LocationID'];
            $CustomerID	 = ALR::insert($Req);
        }
        return Utils::response($CustomerID, true);

        // if (ALR::isExists($Req))
        //     return Utils::errorResponse('Laundry "'.$Req['CustomerID'].'" already exists!');

        // if (isset($Req['ID']) && $Req['ID'] > 0)
        //     return Utils::Response(ALR::updateAssign($Req),true);
        // else
        //     return Utils::Response(ALR::insertAssign($Req), true);
    }
    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        // print_r($Req);
        $Columns = array('' ,'LocationID', 'LaundryID','Logistics','DeliveryStartDate','DeliveryEndDate');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = ALR::getDataTblListCount($Req['CustomerID'], $Attributes['DataTableSearch']);
		$ResData  = ALR::getDataTblList($Req['CustomerID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }
    /**
     * Remove category
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(ALR::remove($Req['IDArr']), true);
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

        if (isset($Res['DeliveryStartDate']) && $Res['DeliveryStartDate'] != '0000-00-00')
            $Res['DeliveryStartDate'] = date("j M Y", strtotime($Res['DeliveryStartDate']));
        if (isset($Res['DeliveryEndDate']) && $Res['DeliveryEndDate'] != '0000-00-00')
            $Res['DeliveryEndDate'] = date("j M Y", strtotime($Res['DeliveryEndDate']));
           
           
        return Utils::response($Res, true);
    }
}
?>
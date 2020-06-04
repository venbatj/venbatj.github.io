<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\LocationRepository as LR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * LocationInfo
 * 
 * @package Rnt\Controller\Customer
 */
class LocationInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData($Req)
    {
        return Utils::response(LR::getAllData($Req['ID']), true);
    }

    /**
     * Get all location data
     * @return array
     */
    public static function getAllLocationData($Req)
    {
        return Utils::response(LR::getAllLocationData($Req['ID']), true);
    }

    /**
     * Get all data
     * @return array
     */
    public static function getDeliveryLocationData($Req)
    {
        return Utils::response(LR::getDeliveryLocationData($Req['CustomerLocationID']), true);
    }
    /**
     * Get all data
     * @return array
     */
    public static function getCustomerLocationData($Req)
    {
        return Utils::response(LR::getCustomerLocationData($Req['CustomerID']), true);
    }
    /**
     * Get all data
     * @return array
     */
    public static function getLaundryLocationData($Req)
    {
        return Utils::response(LR::getLaundryLocationData($Req['LaundryID']), true);
    }

    /**
     * Insert / Update Shipping info
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $CreatedBy = $Req['ID'];
            LR::update($Req);
        } else {
            $CreatedBy = LR::insert($Req);
        }
        return Utils::response($CreatedBy, true);

    }

    /**
     * Remove Shipping info
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(LR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'LocationName', 'LocationCity', 'LocationCountry', 'LocationPhone');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = LR::getDataTblListCount($Req['CustomerID'], $Attributes['DataTableSearch']);
		$ResData  = LR::getDataTblList($Req['CustomerID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(LR::getDataByID($Req['ID']), true);
    }
}
?>
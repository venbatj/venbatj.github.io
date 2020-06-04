<?php
namespace Rnt\Controller\Laundry;

use Rnt\Laundry\BasicDetailRepository as BDR;
use Rnt\Laundry\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * BasicDetail
 * 
 * @package Rnt\Controller\Laundry
 */
class BasicDetail
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(BDR::getAllData(), true);
    }

    /**
     * Get all data delivery
     * @return array
     */
    public static function getAllDataDelivery()
    {
        return Utils::response(BDR::getAllDataDelivery(), true);
    }

     /**
     * Get all data account
     * @return array
     */
    public static function getAllDataAccount()
    {
        return Utils::response(BDR::getAllDataAccount(), true);
    }
    /**
     * get Location Count
     * @param array $Req
     * @return array
     */
    public static function getLocationCount($Req)
    {
        return Utils::response(BDR::getLocationCount($Req['ID']), true);
    }


    /**
     * get Compare LinenID
     * @param array $Req
     * @return array
     */
    public static function getCompareLaundryVendor($Req)
    {
        return Utils::response(BDR::getCompareLaundryVendor($Req), true);
    }

    /**
     * Insert / Update laundry
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        if (BDR::isExists($Req))
            return Utils::errorResponse('Laundry "'.$Req['LaundryName'].'" already exists!');
        
        // unset Logo key to avoid over write of file name    
        if (isset($Res['Logo']))
            unset($Res['Logo']);
            
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $LaundryID = $Req['ID'];
            BDR::update($Req);
        } else {
            $LaundryID = BDR::insert($Req);
        }
        
        $FileRes = FH::uploadLaundryLogo($LaundryID, $File);
        if (is_array($FileRes) && count($FileRes)) {
            BDR::update(array('ID' => $LaundryID, 'Logo' => $FileRes['FilePath']));
        }

        return Utils::response($LaundryID, true);
    }

    /**
     * Remove laundry
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        BDR::removeLaundryContact($Req['IDArr']);
        BDR::removeLaundryBilling($Req['IDArr']);

        return Utils::response(BDR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'LaundryName', 'DeliveryManager', 'LocationCount', 'ContractCount', 'Status');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = BDR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = BDR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

            $Res = BDR::getDataByID($Req['ID']);
            if ($Res['Logo'] != '')
                $Res['LogoDisplay'] = STORAGE_HOST_PATH.'/'.$Res['Logo'];
            return Utils::response($Res, true);
    }
}
?>
<?php
namespace Rnt\Controller\Laundry;

use Rnt\Laundry\FacilityInfoRepository as FIR;
use Rnt\Laundry\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * FacilityInfo
 * 
 * @package Rnt\Controller\Laundry
 */
class FacilityInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(FIR::getAllData(), true);
    }

    /**
     * Insert / Update Facility info
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        if (isset($Req['CustomerServiceID']) && is_array($Req['CustomerServiceID']))
            $Req['CustomerServiceID'] = json_encode($Req['CustomerServiceID']);

        if (isset($Res['FacilityImg']))
            unset($Res['FacilityImg']);

        $Req = self::unsetDisplayFileNames($Req);
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $ID = $Req['ID'];
            FIR::update($Req);
        } else {
            $ID = FIR::insert($Req);
        }
        
        self::uploadInfrastructureDocs($ID, $File);
        return Utils::response($ID, true);
    }

    /**
     * Unset file name to avoid over write
     * @param array $Req
     * @return array
     */
    private static function unsetDisplayFileNames($Req)
    {
        if (isset($Req['ExistingInfrastructure']))
            unset($Req['ExistingInfrastructure']);
        if (isset($Req['ACFNExistingInfrastructure']))
            unset($Req['ACFNExistingInfrastructure']);
        if (isset($Req['FacilityImg']))
            unset($Req['FacilityImg']);

        if (isset($Req['RMExistingInfrastructure']) && $Req['RMExistingInfrastructure'] == 'Y') {
            $Req['ExistingInfrastructure'] = '';
            $Req['ACFNExistingInfrastructure'] = '';
        }
        if (isset($Req['RMFacilityImg']) && $Req['RMFacilityImg'] == 'Y') {
            $Req['FacilityImg'] = '';
        }
        return $Req;
    }
    /**
     * Upload contract docs
     * @param int $CustomerID
     * @param array $File
     * @return void
     */
    private static function uploadInfrastructureDocs($ID, $File)
    {
        $FileDetails = array('ID' => $ID);

        $FileResInfrastructure = FH::uploadInfrastructure($ID, $File);
        if (is_array($FileResInfrastructure) && count($FileResInfrastructure)) {
            $FileDetails['ExistingInfrastructure'] = $FileResInfrastructure['FilePath'];
            $FileDetails['ACFNExistingInfrastructure'] = $FileResInfrastructure['ActualFileName'];
        }
        $FileRes = FH::uploadFacilityImg($ID, $File);
        if (is_array($FileRes) && count($FileRes)) {
            $FileDetails['FacilityImg'] = $FileRes['FilePath'];
        }
        if (count($FileDetails) > 1) {
            FIR::update($FileDetails);
        }
    }

    /**
     * Remove Facility info
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(FIR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'LaundrySize', 'VehicleCount', 'CustomerServiceID');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = FIR::getDataTblListCount($Req['LaundryID'], $Attributes['DataTableSearch']);
        $ResData  = FIR::getDataTblList($Req['LaundryID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        $Res = FIR::getDataByID($Req['ID']);
        if ($Res['FacilityImg'] != '')
            $Res['FacilityImgDisplay'] = STORAGE_HOST_PATH.'/'.$Res['FacilityImg'];
            $Res['CustomerServiceID'] = json_decode($Res['CustomerServiceID']);
        return Utils::response($Res, true);
    }
}
?>
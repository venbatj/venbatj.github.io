<?php
namespace Rnt\Controller\LinenSupplier;

use Rnt\LinenSupplier\BasicDetailRepository as BDR;
use Rnt\LinenSupplier\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * BasicDetail
 * 
 * @package Rnt\Controller\Linen
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
    * Get all data account
    * @return array
    */
   public static function getAllDataDelivery()
   {
       return Utils::response(BDR::getAllDataDelivery(), true);
   }

    /**
     * Insert / Update Linen type
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        if (BDR::isExists($Req))
            return Utils::errorResponse('Linen supplier "'.$Req['LinenSupplierName'].'" already exists!');
        
        // unset Logo key to avoid over write of file name    
        if (isset($Res['Logo']))
            unset($Res['Logo']);

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $LinenSupplierID = $Req['ID'];
            BDR::update($Req);
        } else {
            $LinenSupplierID = BDR::insert($Req);
        }
        
        $FileRes = FH::uploadLinenLogo($LinenSupplierID, $File);
        if (is_array($FileRes) && count($FileRes)) {
            BDR::update(array('ID' => $LinenSupplierID, 'Logo' => $FileRes['FilePath']));
        }

        return Utils::response($LinenSupplierID, true);
    }

    /**
     * Remove Linen type
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(BDR::remove($Req['IDArr']), true);
    }

    /**
     * get Compare LinenID
     * @param array $Req
     * @return array
     */
    public static function getCompareLinenID($Req)
    {
        return Utils::response(BDR::getCompareLinenID($Req), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'LinenSupplierName', 'City', 'Country', 'Status');
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
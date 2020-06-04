<?php
namespace Rnt\Controller\RFIDSupplier;

use Rnt\RFIDSupplier\BasicDetailRepository as BDR;
use Rnt\RFIDSupplier\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * BasicDetail
 * 
 * @package Rnt\Controller\RFIDSupplier
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
    //    echo "<hello>";
       return Utils::response(BDR::getAllDataDelivery(), true);
   }

    /**
     * Insert / Update RFIDSupplier type
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        // echo "<Hello>";
        // exit;
        if (BDR::isExists($Req))
            return Utils::errorResponse('RFID Supplier "'.$Req['RFIDSupplierName'].'" already exists!');
        
        // unset Logo key to avoid over write of file name    
        if (isset($Res['Logo']))
            unset($Res['Logo']);

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $RFIDSupplierID = $Req['ID'];
            BDR::update($Req);
        } else {
            $RFIDSupplierID = BDR::insert($Req);
        }
        
        $FileRes = FH::uploadRFIDSupplierLogo($RFIDSupplierID, $File);
        if (is_array($FileRes) && count($FileRes)) {
            BDR::update(array('ID' => $RFIDSupplierID, 'Logo' => $FileRes['FilePath']));
        }

        return Utils::response($RFIDSupplierID, true);
    }

    /**
     * Remove RFID Supplier type
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
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'RFIDSupplierName', 'City', 'Country', 'Status');
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
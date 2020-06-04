<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\BasicDetailRepository as BDR;
use Rnt\Customer\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * BasicDetail
 * 
 * @package Rnt\Controller\Customer
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
    public static function getAllDataAccount()
    {
        return Utils::response(BDR::getAllDataAccount(), true);
    }

    public static function getBillingInfo($Req)
    {
        return Utils::response(BDR::getBillingInfo($Req['ID']), true);
    }

    public static function getLocation($Req)
    {
        return Utils::response(BDR::getLocation($Req['ID']), true);
    }

    public static function getAllQuoteVersion($Req)
    {
        return Utils::response(BDR::getAllQuoteVersion($Req['ID']), true);
    }

    public static function getSelectedQuoteVersion($Req)
    {
        return Utils::response(BDR::getSelectedQuoteVersion($Req['ID']), true);
    }

    public static function getDateByID($Req)
    {
        return Utils::response(BDR::getDateByID($Req['ID']), true);
    }

    public static function getContractCount($Req)
    {
        return Utils::response(BDR::getContractCount($Req['ID']), true);
    }

    /**
     * Insert / Update customer type
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        if (BDR::isExists($Req))
            return Utils::errorResponse('Customer "'.$Req['CustomerName'].'" already exists!');
        
        // unset Logo key to avoid over write of file name    
        if (isset($Res['Logo']))
            unset($Res['Logo']);

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $CustomerID = $Req['ID'];
            BDR::update($Req);
        } else {
            $CustomerID = BDR::insert($Req);
        }
        
        $FileRes = FH::uploadCustomerLogo($CustomerID, $File);
        if (is_array($FileRes) && count($FileRes)) {
            BDR::update(array('ID' => $CustomerID, 'Logo' => $FileRes['FilePath']));
        }

        return Utils::response($CustomerID, true);
    }

    /**
     * Remove customer type
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        BDR::removeCustomerContact($Req['IDArr']);
        BDR::removeCustomerBilling($Req['IDArr']);
        BDR::removeCustomerShipping($Req['IDArr']);

        return Utils::response(BDR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'CustomerName', 'CustomerType', 'AccountManager', 'LocationCount', 'ContractCount', 'Status');
        $Req['CustomerTypeID'] = isset($Req['CustomerType']) ? $Req['CustomerType'] :0;
        $Req['AccountManager'] = isset($Req['AccountManager']) ? $Req['AccountManager'] :0;
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = BDR::getDataTblListCount($Attributes['DataTableSearch'], $Req['CustomerTypeID'], $Req['AccountManager']);
		$ResData  = BDR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy'], $Req['CustomerTypeID'], $Req['AccountManager']);
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
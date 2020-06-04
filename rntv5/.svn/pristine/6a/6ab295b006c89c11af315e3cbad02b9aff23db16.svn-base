<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\BillingInfoRepository as BIR;
use Rnt\Settings\UserRepository as UR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Account\Login as LOGIN;
use Rnt\InviteUser;

/**
 * BillingInfo
 * 
 * @package Rnt\Controller\Customer
 */
class BillingInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(BIR::getAllData(), true);
    }

    /**
     * Insert / Update billing info
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        $Req['SendInvite'] = isset($Req['SendInvite']) ? $Req['SendInvite'] : 'N';
        if (!(isset($Req['ID']) && $Req['ID'] > 0)) {
            if ($Req['SendInvite'] == 'Y') {

                if (BIR::isExists($Req))
                    return Utils::errorResponse('Customer Billing "'.$Req['EmailID'].'" already exists!');
        
                if (UR::isExistsEmailID($Req))
                    return Utils::errorResponse('User "'.$Req['EmailID'].'" User Can not create!');

                $LoginData = array(
                    'EmailID' => $Req['EmailID'],
                    'ActivationCode' => md5(rand(1000, 9999))
                );
                $Res = Utils::response(LOGIN::insert($LoginData, true));
        
                $Req['LoginID'] = $Res['D'];
                $Req['UserTypeID'] = '1';
                $Res = Utils::response(UR::insert($Req) && BIR::insert($Req), true);

                if ($Res['S'])
                    InviteUser::sendInvite($Req['EmailID'], $LoginData['ActivationCode'], $Req['FirstName'], $Req['LoginID']);
                return $Res;
            } else {
                if (BIR::isExists($Req))
                    return Utils::errorResponse('Customer Billing "'.$Req['EmailID'].'" already exists!');

                if (isset($Req['ID']) && $Req['ID'] > 0) {
                    return Utils::response(BIR::update($Req));
                } else {
                    return Utils::response(BIR::insert($Req));
                }
            }
        } else {
            if ($Req['SendInvite'] == 'Y') {
                $LoginData = array(
                    'EmailID' => $Req['EmailID'],
                    'ActivationCode' => md5(rand(1000, 9999))
                );
                $Res = Utils::response(LOGIN::update($Req['LoginID'], $LoginData));

                $Req['LoginID'] = $Res['D'];
                $Req['UserTypeID'] = '1';
                $BIRReq = $Req;
                unset($BIRReq['LoginID']);
                $Res = Utils::response(BIR::update($BIRReq) && UR::userupdate($Req), true);

                if ($Res['S'])
                    InviteUser::sendInvite($Req['EmailID'], $LoginData['ActivationCode'], $Req['FirstName'], $Req['LoginID']);
                return $Res;
            } else {
                if (BIR::isExists($Req))
                    return Utils::errorResponse('Customer Billing "'.$Req['EmailID'].'" already exists!');

                if (isset($Req['ID']) && $Req['ID'] > 0) {
                    return Utils::response(BIR::update($Req));
                } else {
                    return Utils::response(BIR::insert($Req));
                }
            }
        }
    }
 

    /**
     * Remove billing info
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(BIR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'Name', 'EmailID','LocationID');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = BIR::getDataTblListCount($Req['CustomerID'], $Attributes['DataTableSearch']);
		$ResData  = BIR::getDataTblList($Req['CustomerID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(BIR::getDataByID($Req['ID']), true);
    }
}
?>
<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\ShippingInfoRepository as SIR;
use Rnt\Settings\UserRepository as UR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Account\Login as LOGIN;
use Rnt\InviteUser;

/**
 * ShippingInfo
 * 
 * @package Rnt\Controller\Customer
 */
class ShippingInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(SIR::getAllData(), true);
    }

    /**
     * Insert / Update Shipping info
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        $Req['SendInvite'] = isset($Req['SendInvite']) ? $Req['SendInvite'] : 'N';
        if (!(isset($Req['ID']) && $Req['ID'] > 0)) {
            if ($Req['SendInvite'] == 'Y') {

                if (SIR::isExists($Req))
                    return Utils::errorResponse('Customer Shipping "'.$Req['EmailID'].'" already exists!');
        
                if (UR::isExistsEmailID($Req))
                    return Utils::errorResponse('User "'.$Req['EmailID'].'" User Can not create!');

                $LoginData = array(
                    'EmailID' => $Req['EmailID'],
                    'ActivationCode' => md5(rand(1000, 9999))
                );
                $Res = Utils::response(LOGIN::insert($LoginData, true));
        
                $Req['LoginID'] = $Res['D'];
                $Req['UserTypeID'] = '1';
                $Res = Utils::response(UR::insert($Req) && SIR::insert($Req), true);

                if ($Res['S'])
                    InviteUser::sendInvite($Req['EmailID'], $LoginData['ActivationCode'], $Req['FirstName'], $Req['LoginID']);
                return $Res;
            } else {
                if (SIR::isExists($Req))
                    return Utils::errorResponse('Customer Shipping "'.$Req['EmailID'].'" already exists!');

                if (isset($Req['ID']) && $Req['ID'] > 0) {
                    return Utils::response(SIR::update($Req));
                } else {
                    return Utils::response(SIR::insert($Req));
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
                $SIRReq = $Req;
                unset($SIRReq['LoginID']);
                $Res = Utils::response(SIR::update($SIRReq) && UR::userupdate($Req), true);

                if ($Res['S'])
                    InviteUser::sendInvite($Req['EmailID'], $LoginData['ActivationCode'], $Req['FirstName'], $Req['LoginID']);
                return $Res;
            } else {
                if (SIR::isExists($Req))
                    return Utils::errorResponse('Customer Shipping "'.$Req['EmailID'].'" already exists!');

                if (isset($Req['ID']) && $Req['ID'] > 0) {
                    return Utils::response(SIR::update($Req));
                } else {
                    return Utils::response(SIR::insert($Req));
                }
            }
        }
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
            
        return Utils::response(SIR::remove($Req['IDArr']), true);
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
        $RowCount = SIR::getDataTblListCount($Req['CustomerID'], $Attributes['DataTableSearch']);
		$ResData  = SIR::getDataTblList($Req['CustomerID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(SIR::getDataByID($Req['ID']), true);
    }
}
?>
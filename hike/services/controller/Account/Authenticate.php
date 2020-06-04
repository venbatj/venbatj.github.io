<?php
namespace Rnt\Controller\Account;

use Rnt\Account\Login;
use Rnt\Account\User;
use Rnt\Account\Activate;
use Rnt\Libs\Utils;
use Rnt\Libs\Cryptography;
use Rnt\InviteUser;
/**
 * Authenticate
 * 
 * @package Rnt\Controller\Account
 */
class Authenticate
{
    /**
     * Validate the login access and set JWT
	 * @param array $Req
     * @return array
     */
    public static function login($Req)
    {
        $Access = Login::check($Req['EmailID'], $Req['Password']);
        if (count($Access)) {
            $User = User::getUserByLoginID($Access['ID']);
            Login::update($Access['ID'], array('LastLogin' => date(DB_DATETIME_FORMAT)));
            return Utils::response(array(
                    'JWT' => Cryptography::Encryption(self::jwt($Access)),
                    'UserInfo' => Cryptography::Encryption(self::userInfo($Access, $User))
                )
            );
        } else
            return Utils::errorResponse('Wrong email address or password');
    }

    /**
     * activate account
	 * @param array $Req
     * @return array
     */
    public static function activate($Req)
    {
        $Access = Activate::check($Req['ActivationCode'], $Req['Ref']);
        if (count($Access)) {
            Activate::passwordUpdate($Req['Password'], $Access['ID']);
            return Utils::response(true);
        } else  
            return Utils::errorResponse('Invalid activation or reference code');
    }

     /**
     * reset password
	 * @param array $Req
     * @return array
     */
    public static function resetpassword($Req)
    {
        $Access = Activate::resetcheck($Req['PasswordRestCode'], $Req['Ref']);
        if (count($Access)) {
            Activate::resetpasswordUpdate($Req['Password'], $Access['ID']);
            return Utils::response(true);
        } else  
            return Utils::errorResponse('Invalid activation or reference code');
    }
    /**
    * change password
    * @param array $Req
    * @return array
    */
   public static function changepassword($Req)
   {
    $Res = Activate::changecheck($Req['CurrentPassword'], $GLOBALS['LoginID']);
       if (count($Res)) {
           Activate::changepasswordUpdate($Req['NewPassword'], $GLOBALS['LoginID']);
           return Utils::response(true);
       } else  
           return Utils::errorResponse('Invalid Current Password');
   }

     /**
     * forget password
	 * @param array $Req
     * @return array
     */
    public static function forgetPassword($Req)
    {
        if (Activate::isExists($Req['EmailID'])) {
            $LoginData = array(
                'PasswordRestCode' => md5(rand(1000, 9999))
            );
            $Res = Utils::response(Login::rpupdate($Req['EmailID'], $LoginData));
            $NameRes = Utils::response(Activate::getName($Res['D']['ID']));
            if ($Res['S'] && $NameRes['S'])
                InviteUser::restPassword($Req['EmailID'], $LoginData['PasswordRestCode'], $NameRes['D']['FirstName']);
            return $Res;
        } else { 
            return Utils::errorResponse('User Not there');
        }
    }

    /**
     * load activate page
	 * @param array $Req
     * @return array
     */
    public static function loadPage($Req)
    {
        return Utils::response(Activate::check($Req['ActivationCode'], $Req['Ref']));
    }

    /**
     * load reset password Page
	 * @param array $Req
     * @return array
     */
    public static function resetloadPage($Req)
    {
        return Utils::response(Activate::resetcheck($Req['PasswordRestCode'], $Req['Ref']));
    }
    /**
     * load change password Page
	 * @param array $Req
     * @return array
     */
    public static function changeloadPage($Req)
    {
        return Utils::response(Activate::changecheck($Req));
    }
    
    
    
    /**
     * Set JWT
	 * @param array $Access
     * @return array
     */
    private static function jwt($Access)
    {
        $JWT = array();

        if (count($Access)) {
            $JWT = array(
                'LoginID' => $Access['ID'],
                'GeneratedAt' => strtotime('now')
            );
        }

        return $JWT;
    }

    /**
     * User information
	 * @param array $Access
     * @param array $User
     * @return array
     */
    private static function userInfo($Access, $User)
    {
        $UD = array();

        if (count($Access)) {
            $UD = array(
                'LoginID' => $Access['ID'],
                'EmailID' => $Access['EmailID'],
                'LastLogin' => $Access['LastLogin']
            );
        }

        if (count($User)) {
            $FullName = trim($User['FirstName'].' '.$User['LastName']);
            $UD['FullName'] = $FullName;
            $UD['FirstName'] = $User['FirstName'];
            $UD['LastName'] = $User['LastName'];
            $UD['Phone'] = $User['Phone'];
        }

        return $UD;
    }
}
?>
<?php
namespace Rnt\Account;
use Rnt\Libs\SqlManager;

/**
 * Activate
 * 
 * @package Rnt\Account
 */
class Activate
{
    /**
     * password update
	 * @param string $Password
     * @return void
     */
    public static function passwordUpdate($Password, $LoginID)
    {
        $Obj = new SqlManager();
        $Query = "UPDATE ".SqlManager::prefixTableName('Login')." SET Password = ".self::encryptPassword(SqlManager::escapeStr($Password)).",ActivatedAt = NOW(),Flag = 'A' WHERE ID = ".$LoginID;
        $Obj->execQuery($Query);
    }

    /**
     * reset password update
	 * @param string $Password
     * @return void
     */
    public static function resetpasswordUpdate($Password, $LoginID)
    {
        $Obj = new SqlManager();
        $Query = "UPDATE ".SqlManager::prefixTableName('Login')." SET Password = ".self::encryptPassword(SqlManager::escapeStr($Password)).",PasswordRestAt = NOW(),Flag = 'A' WHERE ID = ".$LoginID;
        $Obj->execQuery($Query);
    }
    /**
     * reset password update
	 * @param string $Password
     * @return void
     */
    public static function changepasswordUpdate($Password,$LoginID)
    {
        $Obj = new SqlManager();
        $Query = "UPDATE ".SqlManager::prefixTableName('Login')." SET Password = ".self::encryptPassword(SqlManager::escapeStr($Password)).",PasswordRestAt = NOW(),Flag = 'A' WHERE ID = ".$LoginID;
        $Obj->execQuery($Query);
    }

    /**
     * validate activation code and the reference
	 * @param string $ActivationCode
     * @param string $Ref
     * @return array
     */
    public static function check($ActivationCode)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addFlds(array('ID', 'ActivationCode', 'Flag'));
        $Obj->addFldCond('ActivationCode', $ActivationCode);
        return $Obj->getSingle();
    }
    /**
     * validate activation code and the reference
	 * @param string $ActivationCode
     * @param string $Ref
     * @return array
     */
    public static function changecheck($Password, $ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addFlds(array('ID', 'Password', 'Flag'));
        $ColumnName = "CONVERT(AES_DECRYPT(Password, '".SqlManager::$msAesKey."') USING 'utf8')";
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond($ColumnName, $Password);
        return $Obj->getSingle();
    }

    /**
     * validate passwordRestCode code and the reference
	 * @param string $PasswordRestCode
     * @param string $Ref
     * @return array
     */
    public static function resetcheck($PasswordRestCode)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addFlds(array('ID', 'PasswordRestCode'));
        $Obj->addFldCond('PasswordRestCode', $PasswordRestCode);
        return $Obj->getSingle();
    }

    /**
     * get name from uder
	 * @param string $ID
     * @return array
     */
    public static function getName($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('User');
        $Obj->addFlds(array('ID', 'FirstName'));
        $Obj->addFldCond('LoginID', $ID);
        return $Obj->getSingle();
    }

    /**
     * Is exists
	 * @param array $EmailID
     * @return int
     */
    public static function isExists($EmailID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('EmailID', $EmailID);
        $Res = $Obj->getSingle();
        return count($Res);
    }

    /**
     * password encryption
	 * @param string $Password
     * @return array
     */
    private static function encryptPassword($Password)
    {
        return "AES_ENCRYPT('".$Password."', '".SqlManager::$msAesKey."')";
    }
}
?>
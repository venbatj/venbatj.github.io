<?php
namespace Rnt\Account;
use Rnt\Libs\SqlManager;
/**
 * Login
 * 
 * @package Rnt\Account
 */
class Login
{
    /**
     * Validate login
	 * @param string $EmailID
     * @param string $Password
     * @return array
     */
    public static function check($EmailID, $Password)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Login'));
        $Obj->addFlds(array('ID', 'EmailID', 'LastLogin'));
        $Obj->addFldCond('EmailID', $EmailID);
        $ColumnName = "CONVERT(AES_DECRYPT(Password, '".SqlManager::$msAesKey."') USING 'utf8')";

        $Obj->addFldCond($ColumnName, $Password);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Validate For Web Service
	 * @param string $FirstName
     * @param string $Password
     * @return array
     */
    public static function checkuserpass($Data)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Login L'));
        $Obj->addFlds(array('L.ID', 'U.FirstName', 'L.Password'));
        $Obj->addFldCond('FirstName', $Data['FirstName']);
        $ColumnName = "CONVERT(AES_DECRYPT(Password, '".SqlManager::$msAesKey."') USING 'utf8')";
        
        $Obj->addFldCond($ColumnName, $Data['Password']);
        $Obj->addJoinTbl('User U', 'L.ID','U.LoginID');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getJoinSingle();
    }
   
    /**
     * Update
	 * @param int $ID
     * @param array $Data
     * @return void
     */
    public static function update($ID, $Data)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addInsrtFlds($Data);
		$Obj->addFldCond('ID', $ID);
		// $Obj->addFldCond('EmailID', $EmailID);
		$Obj->update();
    }

    /**
     * Reset Password Update
	 * @param int $ID
     * @param array $Data
     * @return void
     */
    public static function rpupdate($EmailID, $Data)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addInsrtFlds($Data);
		$Obj->addFldCond('EmailID', $EmailID);	
        $Obj->update();
        $Obj->addFlds(array('ID'));
        return $Obj->getSingle();
    }

    /**
     * Insert
	 * @param int $ID
     * @param array $Data
     * @return void
     */
    public static function insert($Data)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addInsrtFlds($Data);
		return $Obj->insertSingle();
    }

    /**
     * Get data by EmailID
	 * @param string $EmailID
     * @return array
     */
    public static function getDataByEmailID($EmailID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Login'));
        $Obj->addFlds(array('ID', 'EmailID', 'LastLogin'));
        $Obj->addFldCond('EmailID', $EmailID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
}
?>
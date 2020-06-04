<?php
namespace Rnt\Account;
use Rnt\Libs\SqlManager;

/**
 * User
 * 
 * @package Rnt\Account
 */
class User
{
    /**
     * Get user by LoginID
	 * @param int $LoginID
     * @return array
     */
    public static function getUserByLoginID($LoginID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('User'));
        $Obj->addFlds(array('LoginID', 'FirstName', 'LastName', 'Phone'));
        $Obj->addFldCond('LoginID', $LoginID);
        return $Obj->getSingle();
    }
}
?>
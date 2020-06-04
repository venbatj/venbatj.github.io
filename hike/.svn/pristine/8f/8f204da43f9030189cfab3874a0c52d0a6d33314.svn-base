<?php
namespace Rnt\Libs;
use Rnt\Libs\SqlManager;
use Rnt\Libs\Cryptography;
use Rnt\Libs\Utils;

class ostAuth
{
    
    /**
     * get os Ticket
     * @return array
     */
    public static function getosTicketData($Fields)
    {
            $url = $Fields['url'];
            $Fields['ACCESS_KEY'] = ACCESS_KEY;
            $Fields['SECURITY_KEY'] = SECURITY_KEY;

            $data = $Fields;
            $ch = curl_init($url);

            // $string = json_encode($data);
            $string = http_build_query($data);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch,CURLOPT_POSTFIELDS, $string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        
    }
    /**
     * Get data by EmailID
	 * @param string $EmailID
     * @return array
     */
    public static function getDataBydata($LoginID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Login L'));
        $Obj->addFlds(array('L.ID','L.EmailID', 'U.FirstName', 'L.Password'));
        $Obj->addFldCond('L.ID', $LoginID);
        $Obj->addJoinTbl('User U', 'L.ID','U.LoginID');
        $Obj->addFldCond('L.Flag', 'R', '!=');
        $Data = $Obj->getJoinSingle();
        $res = self::checkuserpass($Data);
        $ost = array_merge($Data,$res);
        return $ost;
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
        $Obj->addJoinTbl('User U', 'L.ID','U.LoginID');
        $Obj->addFldCond('U.FirstName', $Data['FirstName']);
        $ColumnName = "CONVERT(AES_DECRYPT(Password, '".SqlManager::$msAesKey."') USING 'utf8')";
        $Obj->addFldCond($ColumnName, $Data['Password']);
        $Obj->addFldCond('L.Flag', 'R', '!=');
        $validation = $Obj->getJoinSingle();
        if($validation!=''){
            return true;
        }else
        return Utils::errorResponse('Access Denied');
        // print_r($validation);
        // exit;
        // return $validation;
        
    
    }
}
?>
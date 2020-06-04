<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\UserTypeRepository as CTR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Libs\ostAuth;

/**
 * UserType
 * 
 * @package Rnt\Controller\Masters
 */
class UserType
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CTR::getAllData(), true);
    }

    /**
     * Insert / Update user type
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (CTR::isExists($Req))
            return Utils::errorResponse('UserType "'.$Req['UserType'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0){
            $Response = Utils::response(CTR::update($Req), true);   
            if(isset($Req['Description'])) {
                $fields = array(
                    'FunctionName' => 'insertTeam',
                    'OstID' => urlencode($_POST['OstID']),
                    'UserType' => urlencode($_POST['UserType']),
                    'Description' => urlencode($_POST['Description']),
                    'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceTeams.php'
                );
            } else {
                $fields = array(
                    'FunctionName' => 'insertTeam',
                    'OstID' => urlencode($_POST['OstID']),
                    'UserType' => urlencode($_POST['UserType']),
                    // 'Description' => urlencode($_POST['Description']),
                    'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceTeams.php'
                );
            }
            $res = ostAuth::getosTicketData($fields);
            // echo "~~result~~~";
            // print_r($res);
            return $Response;
        } else {
            // $Resp = Utils::response(CTR::insert($Req), true);
            if(isset($Req['Description'])) {
                $fields = array(
                    'FunctionName' => 'insertTeam',
                    'UserType' => urlencode($_POST['UserType']),
                    'Description' => urlencode($_POST['Description']),
                    'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceTeams.php'
                );
            } else {
                $fields = array(
                    'FunctionName' => 'insertTeam',
                    'UserType' => urlencode($_POST['UserType']),
                    // 'Description' => urlencode($_POST['Description']),
                    'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceTeams.php'
                );
            }
            $res = ostAuth::getosTicketData($fields);
            // echo "~~result~~~";
            // print_r($res);
            $Req['OstID'] = $res;
            $Res = Utils::response(CTR::insert($Req), true);
            return $Res;
        }
    }
   
    /**
     * Remove user type
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        // echo "~~~IDArr~~~";
        // print_r($Req);
        // exit;
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CTR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'UserType', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CTR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = CTR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(CTR::getDataByID($Req['ID']), true);
    }
}
?>
<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\UserRepository as UR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Account\Login as LOGIN;
use Rnt\Libs\ostAuth;

/**
 * User
 * 
 * @package Rnt\Controller\Settings
 */
class User
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(UR::getAllData(), true);
    }

    /**
     * Insert / Update User
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (UR::isExistsEmailID($Req))
            return Utils::errorResponse('User "'.$Req['EmailID'].'" already exists!');
            
        $DesignationID = $Req['DesignationID'];
        unset($Req['DesignationID']);

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $Res = UR::updateUser($Req);
            $Req['DesignationID'] =  $DesignationID;
            $Response = Utils::response(UR::UserDesignationUpdate($Req), true);
            $fields = array(
                'FunctionName' => 'insertAgent',
                'ID' => urlencode($_POST['OstID']),
                'UserName' => urlencode($_POST['FirstName']),
                'FirstName' => urlencode($_POST['FirstName']),
                'LastName' => urlencode($_POST['LastName']),
                'EmailID' => urlencode($_POST['EmailID']),
                'Phone' => urlencode($_POST['Phone']),
                'Department' => urlencode($_POST['DepartmentD']),
                'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceAgents.php'
            );
            $res = ostAuth::getosTicketData($fields);
            return $res;
        } else {
            
            $fields = array(
                'FunctionName' => 'insertAgent',
                'UserName' => urlencode($_POST['FirstName']),
                'FirstName' => urlencode($_POST['FirstName']),
                'LastName' => urlencode($_POST['LastName']),
                'EmailID' => urlencode($_POST['EmailID']),
                'Phone' => urlencode($_POST['Phone']),
                'Department' => urlencode($_POST['DepartmentD']),
                'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceAgents.php'
            );
            $res = ostAuth::getosTicketData($fields);
            $Data = array('EmailID'=>$Req['EmailID']);
            $Res = Utils::response(LOGIN::insert($Data, true));
            
            $Req['LoginID'] = $Res['D'];
            $Req['OstID'] = $res;
            $Res = Utils::response(UR::insert($Req), true);

            $Req['DesignationID'] =  $DesignationID;
            $Req['ID'] = $Res['D'];
            $Response = Utils::response(UR::designationInsert($Req), true);
           
            return $Response;
        }    
    }

    /**
     * Remove User
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        $fields = array(
            'FunctionName' => 'RemoveAgent',
            'ID' => $_POST['IDArr']['0'],
        );
    
        $res = self::OsTicketData($fields);

        return Utils::response(UR::removeLogin($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('','FirstName', 'LastName','UserType', 'Department', '', 'EmployeeID','EmailID', 'Phone');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = UR::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData  = UR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(UR::getDataByID($Req['ID']), true);
    }
}
?>
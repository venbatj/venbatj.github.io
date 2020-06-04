<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\RoleRepository as RR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Libs\ostAuth;

/**
 * Role
 * 
 * @package Rnt\Controller\Masters
 */
class Role
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(RR::getAllData(), true);
    }

    /**
     * Insert / Update role
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (RR::isExists($Req))
            return Utils::errorResponse('Role "'.$Req['UserRole'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $Res = Utils::response(RR::update($Req), true);
            $fields = array(
                'FunctionName' => 'insertRole',
                'OstID' => urlencode($_POST['OstID']),
                'UserRole' => urlencode($_POST['UserRole']),
                'Description' => urlencode($_POST['Description']),
                'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceRoles.php'
            );
            $OstID = ostAuth::getosTicketData($fields);
            return $Res;
        } else {
             $fields = array(
                'FunctionName' => 'insertRole',
                'UserRole' => urlencode($_POST['UserRole']),
                'Description' => urlencode($_POST['Description']),
                'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceRoles.php'
            );
            $OstID = ostAuth::getosTicketData($fields);
            $Req['OstID'] = $OstID;
            $Response = Utils::response(RR::insert($Req), true);
            return $Response;
        }
    }

    /**
     * Remove role
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(RR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'UserRole', 'Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = RR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = RR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(RR::getDataByID($Req['ID']), true);
    }
}
?>
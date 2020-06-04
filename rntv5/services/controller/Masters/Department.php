<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\DepartmentRepository as CR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Libs\ostAuth;

/**
 * Department
 * 
 * @package Rnt\Controller\Masters
 */
class Department
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CR::getAllData(), true);
    }

    /**
     * Insert / Update Department
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (CR::isExists($Req))
            return Utils::errorResponse('Department "'.$Req['Department'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0){
            $fields = array(
                'FunctionName' => 'insertDepartment',
                'OstID' => $_POST['OstID'],
                'name' => $_POST['Department'],
                'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceDepartments.php'
            );
            $res = ostAuth::getosTicketData($fields);
            // $res = Utils::response(CR::getosTicketData($fields), true);
            $Response =  Utils::response(CR::update($Req), true);
            return $res;
        }else{
            $fields = array(
                'FunctionName' => 'insertDepartment',
                'name' => urlencode($_POST['Department']),
                'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceDepartments.php'
            );
            $res = ostAuth::getosTicketData($fields);
            // $res = Utils::response(CR::getosTicketData($fields), true);
            $ost = Utils::response(CR::insertost($res,$Req), true); 
            return $ost;
        }
    }
    
    /**
     * Remove Department
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            // $fields = array(
            //     'FunctionName' => 'RemoveDepartment',
            //     'ID' =>$_POST['IDArr']['0'],
            //     'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceDepartments.php'
            // );
            // $res = self::getosTicketData($fields);
        return Utils::response(CR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'Department');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = CR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(CR::getDataByID($Req['ID']), true);
    }
}
?>
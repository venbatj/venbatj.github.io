<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\CategoryRepository as CR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Libs\ostAuth;

/**
 * Category
 * 
 * @package Rnt\Controller\Masters
 */
class Category
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
     * Insert / Update category
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (CR::isExists($Req))
            return Utils::errorResponse('Category "'.$Req['CategoryName'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $Res = Utils::response(CR::update($Req), true);
            $fields = array(
                'FunctionName' => 'insertCategory',
                'ID' => urlencode($_POST['OstID']),
                'Name' => urlencode($_POST['CategoryName']),
                'Description' => urlencode($_POST['Description']),
                'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceCategories.php'
            );
            $res = ostAuth::getosTicketData($fields);
            // echo "<update>";
            // print_r($res);
            return $Res;
        } else {
            $fields = array(
                'FunctionName' => 'insertCategory',
                'Name' => urlencode($_POST['CategoryName']),
                'Description' => urlencode($_POST['Description']),
                'url' => 'http://hyjiya.net/rntsupport/service/classes/ServiceCategories.php'
            );
            $res = ostAuth::getosTicketData($fields);
            // echo "<insert>";
            // print_r($res);
            $Req['OstID'] = $res;
            return Utils::response(CR::insert($Req), true);
        }
    }

    /**
     * Remove category
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'CategoryName', 'Description');
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
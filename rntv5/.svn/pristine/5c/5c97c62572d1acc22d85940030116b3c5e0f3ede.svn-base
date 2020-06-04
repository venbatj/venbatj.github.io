<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\BillOfMaterialRepository as BOMR;
// use Rnt\Customer\AssignLaundryRepository as ALR;
use Rnt\Customer\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * ContractInfo
 * 
 * @package Rnt\Controller\Customer
 */
class BillOfMaterial
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(BOMR::getAllData(), true);
    }

    /**
     * Get data by ID
     * @param $Req
     * @return array
     */
    public static function getDataByID($Req)
    {
        // echo "<pre>";
        // print_r($Req);
        // exit;
        return Utils::response(BOMR::getDataByID($Req['ID']), true);
    }
}
?>
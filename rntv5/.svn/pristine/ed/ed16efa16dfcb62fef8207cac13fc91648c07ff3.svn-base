<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\ProductRepository as PR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Product
 * @package Rnt\Controller\Masters
 */
class Product
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(PR::getAllData(), true);
    }

    /**
     * Get product by CategoryID
     * @param array $Req
     * @return array
     */
    public static function getProductByCategoryID($Req)
    {
        return Utils::response(PR::getProductByCategoryID($Req['CategoryID']), true);
    }

    /**
     * Get product by CategoryID
     * @param array $Req
     * @return array
     */
    public static function getCategoryID($Req)
    {
        return Utils::response(PR::getCategoryID($Req['CategoryID']), true);
    }

    /**
     * Get product by get All Data Product
     * @param array $Req
     * @return array
     */
    public static function getAllDataProduct()
    {
        return Utils::response(PR::getAllDataProduct(), true);
    }

    /**
     * Get variant by get Variant By ProductID
     * @param array $Req
     * @return array
     */
    public static function getVariantByProductID($Req)
    {
        return Utils::response(PV::getVariantByProductID($Req['ProductID']), true);
    }

    /**
     * Insert / Update product
     * @param array $Req
     * @return array
     **/
    public static function insertUpdate($Req)
    { 
        if (PR::isExists($Req))
            return Utils::errorResponse('Product "'.$Req['ProductName'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $Res = PR::updateProduct($Req);
            return Utils::response(PR::ProductVariantUpdate($Req), true);
        } else {
            $Res = Utils::response(PR::insert($Req),true);
            $Req['ID'] = $Res['D'];
            return Utils::response(PR::insertProductVariant($Req), true);
        }
    }

    /**
     * Remove products
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');

        $Res = Utils::response(PR::remove($Req['IDArr']), true);
            return Utils::response(PR::removeProductVariant($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('','CategoryID', 'ProductName','','Description');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = PR::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData  = PR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        $Res = PR::getDataByID($Req['ID']);
        return Utils::response($Res, true);
    }
}
?>
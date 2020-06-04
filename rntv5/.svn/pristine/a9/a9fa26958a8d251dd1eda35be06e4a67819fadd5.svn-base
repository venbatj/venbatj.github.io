<?php
namespace Rnt\Controller\Masters;

use Rnt\Masters\ProductVariantRepository as PVR;
use Rnt\Libs\Utils;

/**
 * ProductVariant
 * 
 * @package Rnt\Controller\Masters
 */
class ProductVariant
{
    /**
     * Get variant by ProductID
     * @param array $Req
     * @return array
     */
    public static function getVariantByProductID($Req)
    {
        return Utils::response(PVR::getVariantByProductID($Req['ProductID']), true);
    }
    public static function getProductID($Req)
    {
        return Utils::response(PVR::getProductID($Req['ProductID']), true);
    }
    public static function getVariantByID($Req)
    {
        return Utils::response(PVR::getVariantByID($Req['VariantID']), true);
    }
    public static function getVariantID($Req)
    {
        return Utils::response(PVR::getVariantID($Req['VariantID']), true);
    }
}
?>
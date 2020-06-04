<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\ProductPricingRepository as PPR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * ProductPricing
 * 
 * @package Rnt\Controller\Settings
 */
class ProductPricing
{
    /**
     * Get variant by ProductID and VariantID
     * @param array $Req
     * @return array
     */
    public static function getPricingByPVID($Req)
    {
        return Utils::response(PPR::getPricingByPVID($Req['ProductID'], $Req['VariantID']), true);
    }

    public static function getProductVariantByPVID($Req)
    {
        return Utils::response(PPR::getProductVariantByPVID($Req['ProductID'], $Req['VariantID']), true);
    }

    /**
     * Get Productvariant by ProductID and VariantID
     * @param array $Req
     * @return array
     */
    public static function getProductPricingByPVID($Req)
    {
        return Utils::response(PPR::getProductPricingByPVID(), true);
    }
    
    /**
     * Insert / Update Designation
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        return Utils::response(PPR::insert($Req), true);
    }
    
    /**
     * Insert Product Variant Cost
     * @param array $Req
     * @return array
     */
    public static function insertCost($Req)
    {
        $RawData = array();
        for ($i=0; $i<count($Req['IDData']); $i++) {
            $RawData[$i]['ID'] = $Req['IDData'][$i];
        }

        for ($j=0; $j<count($Req['IDData']); $j++) {
            if (isset($Req['Cost'][$j]))
                $RawData[$j]['TCLinen'] = $Req['Cost'][$j]['Cost'];
        }
        for ($k=0; $k<count($Req['IDData']); $k++) {
            if (isset($Req['Wash'][$k]))
                $RawData[$k]['WCLinen'] = $Req['Wash'][$k]['Wash'];
        }
        for ($l=0; $l<count($Req['IDData']); $l++) {
            if(in_array($l, $Req['Updated']))
                $RawData[$l]['CostModifiedAt'] = date('Y-m-d H:i:s'); 
        }
        unset($Req['Updated']);
        return Utils::response(PPR::updateCost($RawData), true);
    }
}
?>
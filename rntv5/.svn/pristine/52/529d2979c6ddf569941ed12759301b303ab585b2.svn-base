<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\AnalysisDataRepository as ADR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * AnalysisData
 * 
 * @package Rnt\Controller\Settings
 */
class AnalysisData
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(ADR::getAllData(), true);
    }
    /**
     * Get Load Cost Parameters
     * @return array
     */
    public static function LoadCostParameters()
    {
        return ADR::getCostParameters();

    }

    /**
     * Insert / Update Settings type
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $DeliveryTechCostAnalysisID = $Req['ID'];
            ADR::update($Req);
        } else {
            // if (ADR::isExists($Req))
            //     return Utils::errorResponse('Effective From "'.$Req['EffectiveFrom'].'" already exists!');
    
            // $Req['EffectiveFrom'] = date("Y-m-d", strtotime($Req['EffectiveFrom']));
            $DeliveryTechCostAnalysisID = ADR::insert($Req);
        }
        return Utils::response($DeliveryTechCostAnalysisID, true);
    }

    /**
     * Remove Delivery Tech Cost Analysis type
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(ADR::remove($Req['IDArr']), true);
    }

    // /**
    //  * Get data by page
    //  * @param $Req
    //  * @return array
    //  */
    // public static function getDataByPage($Req)
    // {   
    //     $Columns = array('', 'TotalDeliveryCost', 'TechCost', 'Status');
    //     $Attributes = DT::getAttributes($Req, $Columns);
    //     $RowCount = ADR::getDataTblListCount($Attributes['DataTableSearch']);
	// 	$ResData  = ADR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
    //     return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    // }

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

            $Res = ADR::getDataByID($Req['ID']);

        // if (isset($Res['EffectiveFrom']) && $Res['EffectiveFrom'] != '0000-00-00')
        // $Res['EffectiveFrom'] = date("m-d-Y", strtotime($Res['EffectiveFrom'])); 
        return Utils::response($Res, true);
    }
}
?>
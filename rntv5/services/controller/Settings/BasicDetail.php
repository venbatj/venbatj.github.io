<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\BasicDetailRepository as BDR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * BasicDetail
 * 
 * @package Rnt\Controller\Settings
 */
class BasicDetail
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(BDR::getAllData(), true);
    }

    /**
     * Get Load Cost Parameters
     * @return array
     */
    public static function LoadCostParameters()
    {
        return BDR::getCostParameters();

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
            BDR::update($Req);
        } else {
            $DeliveryTechCostAnalysisID = BDR::insert($Req);
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
            
        return Utils::response(BDR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'EffectiveFrom', 'TotalDeliveryCost', 'TechCost', 'Status');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = BDR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = BDR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        return Utils::response(BDR::getDataByID($Req['ID']), true);
    
    }
}
?>
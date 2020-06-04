<?php
namespace Rnt\Settings;
use Rnt\Libs\SqlManager;

/**
 * ProductPricingRepository
 * 
 * @package Rnt\Settings
 */
class ProductPricingRepository
{
    /**
     * Get pricing by ProductID and VariantID
     * @param int $ProductID
     * @param int $VariantID
     * @return array
     */
    public static function getPricingByPVID($ProductID, $VariantID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariantPricing PVP', 'Product P', 'Variant V'));
        $Obj->addFlds(array('PVP.ID', 'ProductName', 'VariantName'));
        $Obj->addFldCond('ProductID', $ProductID);
        $Obj->addFldCond('VariantID', $VariantID);        
        $Obj->addTblCond('ProductID', 'P.ID');
        $Obj->addTblCond('VariantID', 'V.ID');
        $Obj->addFldCond('PVP.Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    public static function getProductVariantByPVID($ProductID, $VariantID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PVP', 'Product P', 'Variant V'));
        $Obj->addFlds(array('PVP.ID', 'ProductName', 'VariantName', 'TCLinen', 'WCLinen'));
        $Obj->addFldCond('ProductID', $ProductID);
        $Obj->addFldCond('VariantID', $VariantID); 
        $Obj->addTblCond('ProductID', 'P.ID');
        $Obj->addTblCond('VariantID', 'V.ID');
        $Obj->addFldCond('PVP.Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get Product pricing by ProductID and VariantID
     * @param int $ProductID
     * @param int $VariantID
     * @return array
     */
    public static function getProductPricingByPVID()
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PV'));
        $Obj->addFlds(array('PV.ID', 'P.ProductName', 'V.VariantName', 'PV.TCLinen', 'PV.WCLinen', 'PV.CostModifiedAt'));
        $Obj->addJoinTbl('Product P', 'PV.ProductID', 'P.ID', 'LEFT JOIN');   
        $Obj->addJoinTbl('Variant V', 'PV.VariantID', 'V.ID', 'LEFT JOIN');    
        $Obj->addFldCond('PV.Flag', 'R', '!=');
        $Obj->addFldCond('P.Flag', 'R', '!=');
        $Res = $Obj->getJoinMultiple();

        for ($i=0; $i<count($Res); $i++) {
            $Res[$i]['CostModifiedAt'] = date("Y-m-d H:i:s", strtotime($Res[$i]['CostModifiedAt']));
        }
        return $Res;
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PV'));
        $Obj->addFlds(array('PV.ID', 'P.ProductName', 'V.VariantName', 'PV.TCLinen', 'PV.WCLinen', 'CostModifiedAt'));
        $Obj->addJoinTbl('Product P', 'PV.ProductID', 'P.ID', 'LEFT JOIN');   
        $Obj->addJoinTbl('Variant V', 'PV.VariantID', 'V.ID', 'LEFT JOIN');
        $Obj->addFldCond('PV.ID', $ID);
        $Obj->addFldCond('PV.Flag', 'R', '!=');
        return $Obj->getJoinSingle();
    }

    /**
     * Cost Insert
     * @param array $Row
     * @return int
     */
    public static function insert($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CostParameters');
        $Obj->addFlds(array('ID', 'DutiesLocalTransportation', 'RecoveryWashPeriod', 'Interest', 'PiecesCountInWarehouse', 'WarehouseCostPerYear', 'InsuranceCostForWarehousePerYear'));
        $Obj->addInsrtFlds($Row);
        return $Obj->insertSingle();
    }

    /**
     * Update Cost
     * @param array $Row
     * @return int
     */
    public static function updateCost($Row)
    {
        foreach ($Row as $data){
            $Obj = new SqlManager();
            $Obj->addTbls('ProductVariant');
            $Obj->addInsrtFlds($data);
            $Obj->addFldCond('ID', $data['ID']);
            $Res = $Obj->update();
        }
        return $Res;
    }
}
?>
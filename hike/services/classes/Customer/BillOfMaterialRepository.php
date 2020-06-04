<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ContractInfoRepository
 * 
 * @package Rnt\Customer
 */
class BillOfMaterialRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'QuoteData';
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('QuoteData QD'));
        $Obj->addFlds(array('QD.ID', 'QD.ProductID', 'QD.VariantID', 'QD.Qty', 'QD.CostOfLinen', 'QD.PurchaseCost', 'QD.LinenCostPerUse', 'QD.TechCostPerUse', 'QD.DeliveryCostPerUse', 'QD.WarehouseCost', 'QD.LaundryCost', 'QD.TotalCost', 'QD.PriceToCustomer', 'QD.BillableQty', 'QD.EstBillingPerDay', 'QD.BreakevenDays'));
        $Obj->addJoinTbl('QuoteGeneration QG', 'QD.QuoteID', 'QG.ID', 'LEFT JOIN');   
        $Obj->addJoinTbl('CustomerDetails CD', 'QG.CustomerName', 'CD.ID', 'LEFT JOIN'); 
        $Obj->addFldCond('CD.ID', $ID);   
        $Obj->addFldCond('QD.Flag', 'R', '!=');
        $Obj->addFldCond('QG.Flag', 'R', '!=');
        $Res = $Obj->getJoinMultiple();

        $TempArr = array();

        foreach($Res as $Item) {

            if ($Item['ProductID'] != 0) {
                $Item['ProductName'] = self::getProductByID($Item['ProductID']);
                if ($Item['VariantID'] != 0)
                    $Item['VariantName'] = self::getVariantByID($Item['VariantID']);
                $TempArr[] = $Item;
            } else {
                $TempArr[] = $Item;
            }
        }
        return $TempArr;
    }

     /**
     * Get Product by ID
	 * @param int $ID
     * @return array
     */
    public static function getProductByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ProductName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['ProductName'];
    }

    /**
     * Get Variant by ID
	 * @param int $ID
     * @return array
     */
    public static function getVariantByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant');
        $Obj->addFlds(array('VariantName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['VariantName'];
    }

    // public static function getDataByID($ID)
    // {
    //     $Obj = new SqlManager();
    //     $Obj->addTbls(array('CustomerDetails CD'));
    //     $Obj->addFlds(array('CD.ID', 'QD.ProductID', 'QD.VariantID', 'QD.Qty', 'QD.CostOfLinen', 'QD.PurchaseCost', 'QD.LinenCostPerUse', 'QD.TechCostPerUse', 'QD.DeliveryCostPerUse', 'QD.WarehouseCost', 'QD.LaundryCost', 'QD.TotalCost', 'QD.PriceToCustomer', 'QD.BillableQty', 'QD.EstBillingPerDay', 'QD.BreakevenDays'));
    //     $Obj->addJoinTbl('QuoteGeneration QG', 'CD.ID', 'QG.CustomerID', 'LEFT JOIN');   
    //     $Obj->addJoinTbl('QuoteData QD', 'QG.ID', 'QD.QuotesID', 'LEFT JOIN'); 
    //     $Obj->addFldCond('CD.ID', $ID);   
    //     $Obj->addFldCond('QD.Flag', 'R', '!=');
    //     $Obj->addFldCond('QG.Flag', 'R', '!=');
    //     $Res = $Obj->getJoinMultiple();
    //     return $Res;
    // }
}
?>
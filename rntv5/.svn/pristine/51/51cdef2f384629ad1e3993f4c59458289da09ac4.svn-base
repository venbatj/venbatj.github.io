<?php
namespace Rnt\Settings;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * BasicDetailRepository
 * 
 * @package Rnt\Settings
 */
class BasicDetailRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'DeliveryTechCostAnalysis';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('DeliveryTechCostAnalysis');
        $Obj->addFlds(array('ID', 'EffectiveFrom'));
        $Obj->addOrderFlds('EffectiveFrom', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple();
    }

    /**
     * Get get cost parameters
     * @return array
     */
    public static function getCostParameters()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CostParameters');
        $Obj->addFlds(array('ID', 'EffectiveFrom', 'DollarConversionRate', 'CostRFIDTag', 'DutiesLocalTransportation', 'BenefitsOverheads',
         'RecoveryWashPeriod', 'Interest', 'PiecesCountInWarehouse', 'WarehouseCostPerYear', 'InsuranceCostForWarehousePerYear'));
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('DeliveryTechCostAnalysis');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Get data by name
	 * @param int $Name
     * @return array
     */
    public static function getDataByName($Name)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('DeliveryTechCostAnalysis');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('DeliveryTechCostAnalysis');
        $Obj->addFlds(array('COUNT(#ID#) RowCount'));
        $Obj->addFldCond('Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('EffectiveFrom', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('TotalDeliveryCost', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('TechCost', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Res = $Obj->getJoinSingle();
		return $Res['RowCount'];
	}

	/**
     * Get data table list
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
    {
        $Status = "CASE Flag
        WHEN 'A' THEN 'Active'
        WHEN 'N' THEN 'Inactive'
        ELSE 'Removed' END";

		$Obj = new SqlManager();
		$Obj->addTbls('DeliveryTechCostAnalysis');
		$Obj->addFlds(array('ID', 'EffectiveFrom','TotalDeliveryCost',' TechCost', $Status.' Status'));
        $Obj->addFldCond('Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('EffectiveFrom', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('TotalDeliveryCost', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('TechCost', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
            else
                $Obj->addOrderFlds('ID', 'DESC');    
        $Obj->addLimit($Index, $Limit);
        
		return $Obj->getJoinMultiple();
	}
}
?>
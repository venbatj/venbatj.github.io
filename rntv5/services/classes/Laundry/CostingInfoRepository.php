<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ContractInfoRepository
 * 
 * @package Rnt\Laundry
 */
class CostingInfoRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'LaundryCosting';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryCosting');
        $Obj->addFlds('*');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple();
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryCosting');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return $Obj->getSingle();
    }

     /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExistLaundry($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryCosting');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('LaundryID', $Row['LaundryID']);    
        $Obj->addFldCond('CategoryID', $Row['CategoryID']);    
        $Obj->addFldCond('ProductID', $Row['ProductID']);    
        $Obj->addFldCond('VariantID', $Row['VariantID']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt, $LaundryID) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryCosting LSC');
		$Obj->addFlds(array('COUNT(#LSC.ID#) RowCount'));
        $Obj->addFldCond('LSC.Flag', 'R', '!=');
        $Obj->addFldCond('LSC.LaundryID', $LaundryID);
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('CategoryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ProductName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('VariantName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Cost', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('Category C', 'LSC.CategoryID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Product P', 'LSC.ProductID', 'P.ID', 'LEFT JOIN');        
        $Obj->addJoinTbl('Variant V', 'LSC.VariantID', 'V.ID', 'LEFT JOIN');
        
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
	public static function getDataTblList($LaundryID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryCosting LSC');
        $Obj->addFlds(array('LSC.ID', 'C.CategoryName', 'P.ProductName', 'V.VariantName','LSC.Cost'));      
        $Obj->addFldCond('LSC.Flag', 'R', '!=');
        $Obj->addFldCond('LaundryID', $LaundryID);
        if ($SearchTxt != '') {
            $Obj->addFldCond('CategoryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ProductName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('VariantName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Cost', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('Category C', 'LSC.CategoryID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Product P', 'LSC.ProductID', 'P.ID', 'LEFT JOIN');        
        $Obj->addJoinTbl('Variant V', 'LSC.VariantID', 'V.ID', 'LEFT JOIN');  
        
        if ($OrderFld != '')
        $Obj->addOrderFlds($OrderFld, $OrderType);
   
        $Obj->addLimit($Index, $Limit);
        
        return $Obj->getJoinMultiple();

	}
}
?>
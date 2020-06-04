<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * InventoryActionRepository
 * 
 * @package Rnt\Masters
 */
class InventoryActionRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'InventoryAction';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID', 'InventoryAction'));
        $Obj->addOrderFlds('InventoryAction', 'ASC');
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
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID', 'InventoryTypeID', 'InventoryAction', 'Description'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InventoryAction');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('InventoryAction', $Row['InventoryAction']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('InventoryAction IA');
		$Obj->addFlds(array('COUNT(#IA.ID#) RowCount'));
		$Obj->addFldCond('IA.Flag', 'R', '!=');
		if ($SearchTxt != '') {
            $Obj->addFldCond('InventoryType', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR');            
            $Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('InventoryType IT', 'IA.InventoryTypeID', 'IT.ID', 'LEFT JOIN');
        
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
		$Obj = new SqlManager();
		$Obj->addTbls('InventoryAction IA');
		$Obj->addFlds(array('IA.ID',  'IA.InventoryAction','IT.InventoryType InventoryTypeID', 'IA.Description'));
		$Obj->addFldCond('IA.Flag', 'R', '!=');
		if ($SearchTxt != '') {
            $Obj->addFldCond('InventoryType', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('InventoryAction', "%{$SearchTxt}%", 'LIKE', 'OR');            
            $Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
        $Obj->addJoinTbl('InventoryType IT', 'IA.InventoryTypeID', 'IT.ID', 'LEFT JOIN');

		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
		
		$Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
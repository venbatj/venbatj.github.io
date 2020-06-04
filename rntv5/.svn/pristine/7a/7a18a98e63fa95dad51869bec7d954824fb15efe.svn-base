<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * WarehouseRepository
 * 
 * @package Rnt\Masters
 */
class WarehouseRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'Warehouse';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Warehouse');
        $Obj->addFlds(array('ID', 'WarehouseName'));
        $Obj->addOrderFlds('WarehouseName', 'ASC');
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
        $Obj->addTbls('Warehouse');
        $Obj->addFlds(array('*'));
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
        $Obj->addTbls('Warehouse');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('WarehouseName', $Row['WarehouseName']);    
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
		$Obj->addTbls('Warehouse W');
		$Obj->addFlds(array('COUNT(#W.ID#) RowCount'));
		$Obj->addFldCond('W.Flag', 'R', '!=');
		if ($SearchTxt != '') {
			$Obj->addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('WarehouseManager', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Rooms', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('CityID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('CountryID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
        $Obj->addJoinTbl('City C', 'W.CityID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CNT', 'W.CountryID', 'CNT.ID', 'LEFT JOIN');

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
		$Obj->addTbls('Warehouse W');
		$Obj->addFlds(array('W.ID', 'W.WarehouseName', 'W.WarehouseManager', 'W.Rooms', 'C.CityName CityID', 'CNT.CountryName CountryID'));
		$Obj->addFldCond('W.Flag', 'R', '!=');
		if ($SearchTxt != '') {
            $Obj->addFldCond('WarehouseName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('WarehouseManager', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Rooms', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('CityID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('CountryID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
		
        $Obj->addJoinTbl('City C', 'W.CityID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CNT', 'W.CountryID', 'CNT.ID', 'LEFT JOIN');

		$Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
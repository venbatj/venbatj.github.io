<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * SpecialNotesInfoRepository
 * 
 * @package Rnt\Customer
 */
class SpecialNotesInfoRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'CustomerSpecialNotes';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerSpecialNotes');
        $Obj->addFlds(array('ID', 'Laundry', 'Linen', 'Management', 'Delivery', 'Finance'));
        $Obj->addOrderFlds('Laundry', 'ASC');
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
        $Obj->addTbls('CustomerSpecialNotes');
        $Obj->addFlds('*');
        $Obj->addFldCond('CustomerID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');

        $Res = $Obj->getSingle();
        if (count($Res))
            return $Res;
        return array('Flag' => 'A');
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('CustomerSpecialNotes');
		$Obj->addFlds(array('COUNT(#ID#) RowCount'));
        $Obj->addFldCond('Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('Laundry', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Linen', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
		$Res = $Obj->getSingle();
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
		$Obj->addTbls('CustomerSpecialNotes ');
		$Obj->addFlds(array('ID', 'Laundry', 'Linen', 'Management', 'Delivery', 'Finance'));
        $Obj->addFldCond('Flag', 'R', '!=');

        $Obj->addLimit($Index, $Limit);
        
		return $Obj->getMultiple();
	}
}
?>
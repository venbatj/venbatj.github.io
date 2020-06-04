<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * MenuRepository
 * 
 * @package Rnt\Masters
 */
class MenuRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'Menu';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Menu');
        $Obj->addFlds(array('ID', 'MenuName', 'Icon', 'Path', 'DisplayInMenu', 'MenuID'));
        $Obj->addOrderFlds('MenuName', 'ASC');
        $Obj->addOrderFlds('Icon', 'ASC');
        $Obj->addOrderFlds('Path', 'ASC');
        $Obj->addOrderFlds('DisplayInMenu', 'ASC');
        $Obj->addOrderFlds('MenuID', 'ASC');
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
        $Obj->addTbls('Menu');
        $Obj->addFlds(array('ID', 'MenuName', 'Icon', 'Path','DisplayInMenu', 'Description','MenuID'));
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
        $Obj->addTbls('Menu');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('MenuName', $Row['MenuName']);    
        $Obj->addFldCond('Icon', $Row['Icon']);    
        $Obj->addFldCond('Path', $Row['Path']);    
        $Obj->addFldCond('MenuID', $Row['MenuID']);    
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
		$Obj->addTbls('Menu');
		$Obj->addFlds(array('COUNT(#ID#) RowCount'));
		$Obj->addFldCond('Flag', 'R', '!=');
		if ($SearchTxt != '') {
			$Obj->addFldCond('MenuName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
			$Obj->addFldCond('Icon', "%{$SearchTxt}%", 'LIKE', 'OR' );
			$Obj->addFldCond('Path', "%{$SearchTxt}%", 'LIKE', 'OR' );
			$Obj->addFldCond('DisplayInMenu', "%{$SearchTxt}%", 'LIKE', 'OR' );
			$Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('MenuID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
		$Obj->addTbls('Menu');
		$Obj->addFlds(array('ID', 'MenuName', 'Icon', 'Path','DisplayInMenu','Description', 'MenuID'));
		$Obj->addFldCond('Flag', 'R', '!=');
		if ($SearchTxt != '') {
            $Obj->addFldCond('MenuName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
			$Obj->addFldCond('Icon', "%{$SearchTxt}%", 'LIKE', 'OR' );
			$Obj->addFldCond('Path', "%{$SearchTxt}%", 'LIKE', 'OR' );
			$Obj->addFldCond('DisplayInMenu', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('MenuID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
		
		$Obj->addLimit($Index, $Limit);
		return $Obj->getMultiple();
	}
}
?>
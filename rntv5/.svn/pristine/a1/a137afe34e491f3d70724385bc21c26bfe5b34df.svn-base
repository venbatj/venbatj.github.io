<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * CityRepository
 * 
 * @package Rnt\Masters
 */
class CityRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'City';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('City C'));
        $Obj->addFlds(array('C.ID', 'CT.CountryName', 'C.CityName'));
        $Obj->addOrderFlds('CT.CountryName', 'ASC');
        $Obj->addOrderFlds('C.CityName', 'ASC');
        $Obj->addFldCond('C.Flag', 'R', '!=');
        $Obj->addFldCond('CT.Flag', 'R', '!=');
        $Obj->addJoinTbl('Country CT', 'C.CountryID', 'CT.ID', 'LEFT JOIN');
        return $Obj->getJoinMultiple(); 
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('City C'));
        $Obj->addFlds(array('C.ID', 'C.CountryID', 'C.CityName'));
        $Obj->addFldCond('C.ID', $ID);
        $Obj->addFldCond('C.Flag', 'R', '!=');
        $Obj->addFldCond('CT.Flag', 'R', '!=');
        $Obj->addJoinTbl('Country CT', 'C.CountryID', 'CT.ID', 'LEFT JOIN');

        return $Obj->getJoinSingle(); 
    }

    /**
     * Get data by Name
	 * @param string $Name
     * @return array
     */
    public static function getDataByName($Name)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('City');
        $Obj->addFlds(array('ID', 'CountryID', 'CityName'));
        $Obj->addFldCond('LOWER(TRIM(CityName))', $Name);
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
        $Obj->addTbls(array('City'));
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('CountryID', $Row['CountryID']);
        $Obj->addFldCond('CityName', $Row['CityName']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getJoinSingle());
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls(array('City C'));
        $Obj->addFlds(array('COUNT(#C.ID#) RowCount'));
        $Obj->addFldCond('C.Flag', 'R', '!=');
        $Obj->addFldCond('CT.Flag', 'R', '!=');
        $Obj->addJoinTbl('Country CT', 'C.CountryID', 'CT.ID', 'LEFT JOIN');
		if ($SearchTxt != '') {
            $Obj->addFldCond('CT.CountryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
			$Obj->addFldCond('C.CityName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
		$Obj = new SqlManager();
		$Obj->addTbls(array('City C'));
		$Obj->addFlds(array('C.ID', 'CT.CountryName', 'C.CityName'));
        $Obj->addFldCond('C.Flag', 'R', '!=');
        $Obj->addFldCond('CT.Flag', 'R', '!=');
        $Obj->addJoinTbl('Country CT', 'C.CountryID', 'CT.ID', 'LEFT JOIN');		
        if ($SearchTxt != '') {
            $Obj->addFldCond('CT.CountryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('C.CityName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
		
		$Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
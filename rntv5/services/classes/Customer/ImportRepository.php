<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\ImportBase;

/**
 * ImportRepository
 * 
 * @package Rnt\Customer
 */
class ImportRepository extends ImportBase
{
    /**
     * Get source
     * @return string
     */
    private static function getSource()
    {
        return 'CUS';
    }   

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
		return parent::getImportHistoryDataTblListCount(self::getSource(), $SearchTxt);
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
		return parent::getImportHistoryDataTblList(self::getSource(), $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
    }
    
    /**
     * Insert
     * @param array $Row
     * @return int
     */
    public static function insert($Row)
    {
        return parent::insertImportHistory(self::getSource(), $Row);
    }
}
?>
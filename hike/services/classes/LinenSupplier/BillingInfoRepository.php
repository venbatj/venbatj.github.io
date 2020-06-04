<?php
namespace Rnt\LinenSupplier;
use Rnt\Libs\SqlManager;
use Rnt\BillingInfoBase;

/**
 * BillingInfoRepository
 * 
 * @package Rnt\Linen
 */
class BillingInfoRepository extends BillingInfoBase
{
    /**
     * Get billing source
     * @return string
     */
    private static function getBillingSource()
    {
        return 'LNBC';
    }
    public static function getLoginTable()
    {
        return 'Login';
    }
    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        return parent::isBillingDetailsExists(self::getBillingSource(), $Row);
    }

    /**
     * Get data table count
     * @param int $LinenSupplierID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($LinenSupplierID, $SearchTxt) 
	{
		return parent::getBillingDetailsDataTblListCount(self::getBillingSource(), $LinenSupplierID, $SearchTxt);
	}

	/**
     * Get data table list
     * @param int $LinenSupplierID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($LinenSupplierID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		return parent::getBillingDetailsDataTblList(self::getBillingSource(), $LinenSupplierID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
    }
    
    /**
     * Insert
     * @param array $Row
     * @return int
     */
    public static function insert($Row)
    {
        return parent::insertBillingDetails(self::getBillingSource(), $Row);
    }
}
?>
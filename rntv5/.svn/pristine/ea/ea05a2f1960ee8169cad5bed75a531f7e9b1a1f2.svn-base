<?php
namespace Rnt\RFIDSupplier;
use Rnt\Libs\SqlManager;
use Rnt\BillingInfoBase;

/**
 * BillingInfoRepository
 * 
 * @package Rnt\RFIDSupplier
 */
class BillingInfoRepository extends BillingInfoBase
{
    /**
     * Get billing source
     * @return string
     */
    private static function getBillingSource()
    {
        return 'RB';
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
     * @param int $RFIDSupplierID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($RFIDSupplierID, $SearchTxt) 
	{
		return parent::getBillingDetailsDataTblListCount(self::getBillingSource(), $RFIDSupplierID, $SearchTxt);
	}

	/**
     * Get data table list
     * @param int $RFIDSupplierID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($RFIDSupplierID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		return parent::getBillingDetailsDataTblList(self::getBillingSource(), $RFIDSupplierID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
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
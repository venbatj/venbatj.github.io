<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\BillingInfoBase;

/**
 * BillingInfoRepository 
 * @package Rnt\Customer
 */
class BillingInfoRepository extends BillingInfoBase
{
    /**
     * Get billing source
     * @return string
     */
    private static function getBillingSource()
    {
        return 'CBC';
    }

    /**
     * Get login table
     * @return string
     */
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
     * @param int $CustomerID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($CustomerID, $SearchTxt) 
	{
		return parent::getBillingDetailsDataTblListCount(self::getBillingSource(), $CustomerID, $SearchTxt);
	}

	/**
     * Get data table list
     * @param int $CustomerID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($CustomerID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		return parent::getBillingDetailsDataTblList(self::getBillingSource(), $CustomerID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
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
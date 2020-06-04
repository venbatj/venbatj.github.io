<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\BillingInfoBase;

/**
 * BillingInfoRepository
 * 
 * @package Rnt\Laundry
 */
class BillingInfoRepository extends BillingInfoBase
{
    /**
     * Get billing source
     * @return string
     */
    private static function getBillingSource()
    {
        return 'LBC';
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
    public static function isExistsEmailID($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Login'));
        $Obj->addFlds(array('ID'));  
        $Obj->addFldCond('EmailID', $Row['EmailID']);    
        return count($Obj->getSingle());
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
     * @param int $LaundryID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($LaundryID, $SearchTxt) 
	{
		return parent::getBillingDetailsDataTblListCount(self::getBillingSource(), $LaundryID, $SearchTxt);
	}

	/**
     * Get data table list
     * @param int $LaundryID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($LaundryID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		return parent::getBillingDetailsDataTblListForLaundry(self::getBillingSource(), $LaundryID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
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
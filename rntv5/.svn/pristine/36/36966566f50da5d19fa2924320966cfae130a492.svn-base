<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\ContactInfoBase;

/**
 * ContactInfoRepository
 * 
 * @package Rnt\Customer
 */
class ContactInfoRepository extends ContactInfoBase
{
    /**
     * Get contact source
     * @return string
     */
    private static function getContactSource()
    {
        return 'CC';
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
        return parent::isContactInfoExists(self::getContactSource(), $Row);
    }

    /**
     * Get data table count
     * @param int $CustomerID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($CustomerID, $SearchTxt) 
	{
		return parent::getContactInfoDataTblListCount(self::getContactSource(), $CustomerID, $SearchTxt);
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
		return parent::getContactInfoDataTblList(self::getContactSource(), $CustomerID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
    }
    
    /**
     * Insert
     * @param array $Row
     * @return int
     */
    public static function insert($Row)
    {
        return parent::insertContactInfo(self::getContactSource(), $Row);
    }
}
?>
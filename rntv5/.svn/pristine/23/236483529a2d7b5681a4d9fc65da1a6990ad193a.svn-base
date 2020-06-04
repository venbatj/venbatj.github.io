<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\ContactInfoBase;

/**
 * ContactInfoRepository
 * 
 * @package Rnt\Laundry
 */
class ContactInfoRepository extends ContactInfoBase
{
    /**
     * Get contact source
     * @return string
     */
    private static function getContactSource()
    {
        return 'LC';
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
     * @param int $LaundryID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($LaundryID, $SearchTxt) 
	{
		return parent::getContactInfoDataTblListCount(self::getContactSource(), $LaundryID, $SearchTxt);
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
		return parent::getContactInfoDataTblListForLaundry(self::getContactSource(), $LaundryID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
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
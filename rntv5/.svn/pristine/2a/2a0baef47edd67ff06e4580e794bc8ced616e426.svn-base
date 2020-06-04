<?php
namespace Rnt\RFIDSupplier;
use Rnt\Libs\SqlManager;
use Rnt\ContactInfoBase;

/**
 * ContactInfoRepository
 * 
 * @package Rnt\RFIDSupplier
 */
class ContactInfoRepository extends ContactInfoBase
{
    /**
     * Get contact source
     * @return string
     */
    private static function getContactSource()
    {
        // echo "<Hello Judo>";
        return 'RS';
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
     * @param int $RFIDSupplierID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($RFIDSupplierID, $SearchTxt) 
	{
		return parent::getContactInfoDataTblListCount(self::getContactSource(), $RFIDSupplierID, $SearchTxt);
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
		return parent::getContactInfoDataTblList(self::getContactSource(), $RFIDSupplierID, $Index, $Limit, $SearchTxt, $OrderFld, $OrderType);
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
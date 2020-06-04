<?php
namespace Rnt;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ContactInfoBase
 * 
 * @package Rnt
 */
class ContactInfoBase implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'Contact';
    }

    /**
     * Insert contact info
     * @param string $ContactFor
     * @param array $Row
     * @return int
     */
    public static function insertContactInfo($ContactFor, $Row)
    {
        $Row['ContactFor'] = $ContactFor;
        return self::insert($Row);
    }

    /**
     * Is contact info exists
     * @param string $ContactFor
	 * @param array $Row
     * @return int
     */
    public static function isContactInfoExists($ContactFor, $Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Contact');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('ContactFor', $ContactFor);
        $Obj->addFldCond('EmailID', $Row['EmailID']);
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data by LinenSupplierID
	 * @param int $ID
     * @return array
     */
    public static function getDataByLinenSupplierID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Contact');
        $Obj->addFlds('*');
        $Obj->addFldCond('ContactForRef', $ID);
        $Obj->addFldCond('ContactFor', 'LN');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        if (count($Res))
            return $Res;
        return array('Flag' => 'A');
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Contact');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get contact info data table count
     * @param string $ContactFor
     * @param int $ContactForRef
	 * @param string $SearchTxt
     * @return int
     */
	protected static function getContactInfoDataTblListCount($ContactFor, $ContactForRef, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('Contact C');
		$Obj->addFlds(array('COUNT(#C.ID#) RowCount'));
        $Obj->addFldCond('C.Flag', 'R', '!=');
        
        $Obj->addFldCond('ContactFor', $ContactFor);
        $Obj->addFldCond('ContactForRef', $ContactForRef);

		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        $Obj->addJoinTbl('CustomerLocationInfo CL','C.LocationID','CL.ID','LEFT JOIN');
		$Res = $Obj->getJoinSingle();
		return $Res['RowCount'];
    }
    
    /**
     * Get contact info data table list
     * @param string $ContactFor
     * @param int $ContactForRef
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getContactInfoDataTblList($ContactFor, $ContactForRef, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('Contact C');
		$Obj->addFlds(array('C.ID', 'C.FirstName Name', 'C.Phone', 'C.EmailID','CL.LocationName LocationID'));
        $Obj->addFldCond('C.Flag', 'R', '!=');
        
        $Obj->addFldCond('ContactFor', $ContactFor);
        $Obj->addFldCond('ContactForRef', $ContactForRef);

		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('CustomerLocationInfo CL','C.LocationID','CL.ID','LEFT JOIN');
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'Desc');
		
        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
    }
    public static function getContactInfoDataTblListForLaundry($ContactFor, $ContactForRef, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('Contact C');
		$Obj->addFlds(array('C.ID', 'C.FirstName Name', 'C.Phone', 'C.EmailID','CL.LocationName LocationID'));
        $Obj->addFldCond('C.Flag', 'R', '!=');
        
        $Obj->addFldCond('ContactFor', $ContactFor);
        $Obj->addFldCond('ContactForRef', $ContactForRef);

		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('LaundryLocationInfo CL','C.LocationID','CL.ID','LEFT JOIN');
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'Desc');
		
        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
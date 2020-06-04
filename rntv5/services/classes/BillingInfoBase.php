<?php
namespace Rnt;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * BillingInfoBase
 * 
 * @package Rnt
 */
class BillingInfoBase implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'BillingDetails';
    }

    /**
     * Insert billing details
     * @param string $Source
     * @param array $Row
     * @return int
     */
    public static function insertBillingDetails($Source, $Row)
    {
        $Row['Source'] = $Source;
        return self::insert($Row);
    }

    /**
     * Is billing details exists
     * @param string $Source
	 * @param array $Row
     * @return int
     */
    public static function isBillingDetailsExists($Source, $Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('BillingDetails');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('Source', $Source);
        $Obj->addFldCond('EmailID', $Row['EmailID']);
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('BillingDetails');
        // $Obj->addFlds(array('ID','LocationID', 'FirstName','LastName','CityID','CountryID','Phone','EmailID','SendInvite'));
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get billing details data table count
     * @param string $Source
     * @param int $SourceRefID
	 * @param string $SearchTxt
     * @return int
     */
	protected static function getBillingDetailsDataTblListCount($Source, $SourceRefID, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('BillingDetails B');
		$Obj->addFlds(array('COUNT(#B.ID#) RowCount'));
        $Obj->addFldCond('B.Flag', 'R', '!=');
        
        $Obj->addFldCond('Source', $Source);
        $Obj->addFldCond('SourceRefID', $SourceRefID);

		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('City', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Country', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('City C', 'B.CityID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CT', 'B.CountryID', 'CT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'B.LocationID', 'CL.ID', 'LEFT JOIN');
		$Res = $Obj->getJoinSingle();
		return $Res['RowCount'];
    }
    
    /**
     * Get billing details data table list
     * @param string $Source
     * @param int $SourceRefID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getBillingDetailsDataTblList($Source, $SourceRefID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('BillingDetails B');
		$Obj->addFlds(array('B.ID', 'B.FirstName Name', 'B.Phone', 'B.EmailID', 'B.Address', 'B.State','C.CityName City','CT.CountryName Country','B.Phone','CL.LocationName LocationID'));
        $Obj->addFldCond('B.Flag', 'R', '!=');
        
        $Obj->addFldCond('Source', $Source);
        $Obj->addFldCond('SourceRefID', $SourceRefID);

		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('City', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Country', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('City C', 'B.CityID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CT', 'B.CountryID', 'CT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'B.LocationID', 'CL.ID', 'LEFT JOIN');
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
        else        
            $Obj->addOrderFlds('ID', 'Desc');
        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
    }
    public static function getBillingDetailsDataTblListForLaundry($Source, $SourceRefID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('BillingDetails B');
		$Obj->addFlds(array('B.ID', 'B.FirstName Name', 'B.Phone', 'B.EmailID', 'B.Address', 'B.State','C.CityName City','CT.CountryName Country','B.Phone','LL.LocationName LocationID'));
        $Obj->addFldCond('B.Flag', 'R', '!=');
        
        $Obj->addFldCond('Source', $Source);
        $Obj->addFldCond('SourceRefID', $SourceRefID);

		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('City', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Country', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('City C', 'B.CityID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CT', 'B.CountryID', 'CT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LaundryLocationInfo LL', 'B.LocationID', 'LL.ID', 'LEFT JOIN');
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
        else        
            $Obj->addOrderFlds('ID', 'Desc');
        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
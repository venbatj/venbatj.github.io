<?php
namespace Rnt\RFIDSupplier;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * BasicDetailRepository
 * 
 * @package Rnt\RFIDSupplier
 */
class BasicDetailRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'RFIDSupplierDetails';
    }
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierDetails');
        $Obj->addFlds(array('*'));
        $Obj->addOrderFlds('RFIDSupplierName', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('RFIDSupplierName', '','!=');
        return $Obj->getMultiple();
    }
    /**
     * Get all data delivery
     * @return array
     */
    public static function getAllDataDelivery()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('User UR', 'Login L');
        $Obj->addFlds(array('UR.ID', 'UR.FirstName', 'L.EmailID'));
        $Obj->addOrderFlds('UR.FirstName', 'ASC');
        $Obj->addJoinTbl('Login L', 'UR.LoginID', 'L.ID', 'LEFT JOIN');
        $Obj->addFldCond('UR.DesignationID', 8);
        $Res = $Obj->getJoinMultiple();
        // echo "<pre>";
        // print_r($Res);
        // exit;
        return $Res;
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierDetails');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get data by name
	 * @param int $Name
     * @return array
     */
    public static function getDataByName($Name)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierDetails');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('LOWER(TRIM(RFIDSupplierName))', $Name);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierDetails');
        $Obj->addFlds(array('ID'));        

    if (isset($Row['ID']) && $Row['ID'] > 0)
        $Obj->addFldCond('ID', $Row['ID'], '!=');
        $Obj->addFldCond('RFIDSupplierName', $Row['RFIDSupplierName']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */

	public static function getDataTblListCount($SearchTxt) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierDetails LSD');
        $Obj->addFlds(array('COUNT(#LSD.ID#) RowCount'));
        $Obj->addFldCond('LSD.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('RFIDSupplierName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CityName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('CountryName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        $Obj->addJoinTbl('Country CNT', 'LSD.CountryID', 'CNT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('City CTY', 'LSD.CityID', 'CTY.ID', 'LEFT JOIN');

        $Res = $Obj->getJoinSingle();
		return $Res['RowCount'];
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
        $Status = "CASE LSD.Flag
        WHEN 'A' THEN 'Active'
        WHEN 'I' THEN 'Inactive'
        ELSE 'Removed' END";

		$Obj = new SqlManager();
		$Obj->addTbls('RFIDSupplierDetails LSD');
		$Obj->addFlds(array('LSD.ID', 'RFIDSupplierName','CityName City', 'CountryName Country', $Status.' Status'));
        $Obj->addFldCond('LSD.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('RFIDSupplierName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CityName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('CountryName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
            else
                $Obj->addOrderFlds('ID', 'DESC');    
            
        $Obj->addJoinTbl('Country CNT', 'LSD.CountryID', 'CNT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('City CTY', 'LSD.CityID', 'CTY.ID', 'LEFT JOIN');
        $Obj->addLimit($Index, $Limit);
        
		return $Obj->getJoinMultiple();
	}
}
?>
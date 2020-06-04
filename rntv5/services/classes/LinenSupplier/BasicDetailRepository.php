<?php
namespace Rnt\LinenSupplier;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * BasicDetailRepository
 * 
 * @package Rnt\Linen
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
        return 'LinenSupplierDetails';
    }
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LinenSupplierDetails');
        $Obj->addFlds(array('*'));
        $Obj->addOrderFlds('LinenSupplierName', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('LinenSupplierName', '','!=');
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
        return $Obj->getJoinMultiple();
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LinenSupplierDetails');
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
        $Obj->addTbls('LinenSupplierDetails');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('LOWER(TRIM(LinenSupplierName))', $Name);
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
        $Obj->addTbls('LinenSupplierDetails');
        $Obj->addFlds(array('ID'));        

    if (isset($Row['ID']) && $Row['ID'] > 0)
        $Obj->addFldCond('ID', $Row['ID'], '!=');
        $Obj->addFldCond('LinenSupplierName', $Row['LinenSupplierName']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    public static function isExistLinen($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LinenSupplierCosting');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('CategoryID', $Row['CategoryID']);    
        $Obj->addFldCond('ProductID', $Row['ProductID']);    
        $Obj->addFldCond('VariantID', $Row['VariantID']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get Product pricing by ProductID and VariantID
     * @param int $ProductID
     * @param int $VariantID
     * @return array
     */
    public static function getCompareLinenID($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('LinenSupplierCosting LSC'));
        $Obj->addFlds(array('LSC.ID', 'LS.LinenSupplierName','C.CategoryName','P.ProductName','V.VariantName','LSC.Cost'));
        $Obj->addJoinTbl('LinenSupplierDetails LS', 'LSC.LinenSupplierID', 'LS.ID', 'LEFT JOIN'); 
        $Obj->addJoinTbl('Category C', 'LSC.CategoryID', 'C.ID', 'LEFT JOIN');   
        $Obj->addJoinTbl('Product P', 'LSC.ProductID', 'P.ID', 'LEFT JOIN');      
        $Obj->addJoinTbl('Variant V', 'LSC.VariantID', 'V.ID', 'LEFT JOIN');
        $Obj->addFldCond('LSC.CategoryID',$Row['CategoryID']);
        $Obj->addFldCond('LSC.ProductID',$Row['ProductID']);
        $Obj->addFldCond('LSC.VariantID',$Row['VariantID']);    
        $Obj->addFldCond('LSC.Flag', 'R', '!=');
        $Obj->addFldCond('P.Flag', 'R', '!=');
        $Res = $Obj->getJoinMultiple();
       
        return $Res;
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */

	public static function getDataTblListCount($SearchTxt) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('LinenSupplierDetails LSD');
        $Obj->addFlds(array('COUNT(#LSD.ID#) RowCount'));
        $Obj->addFldCond('LSD.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
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
		$Obj->addTbls('LinenSupplierDetails LSD');
		$Obj->addFlds(array('LSD.ID', 'LinenSupplierName','CityName City', 'CountryName Country', $Status.' Status'));
        $Obj->addFldCond('LSD.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('LinenSupplierName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
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
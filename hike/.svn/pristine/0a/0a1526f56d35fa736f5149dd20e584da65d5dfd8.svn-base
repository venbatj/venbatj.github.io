<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * FacilityInfoRepository
 * 
 * @package Rnt\Laundry
 */
class FacilityInfoRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'LaundryFacility';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryFacility');
        $Obj->addFlds(array('ID', 'LaundrySize', 'VehicleCount', 'CustomerServiceID', 'ChemicalName', 'ExistingInfrastructure', 'ACFNExistingInfrastructure','FacilityImg','Dosage','GeoCode', 'LandMark'));
        $Obj->addOrderFlds('LaundrySize', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple(); 
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryFacility');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        // return $Obj->getSingle();
        $Res = $Obj->getSingle();
        if (count($Res))
            return $Res;
            return array('Flag' =>'A');
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($LaundryID, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryFacility LD');
		$Obj->addFlds(array('COUNT(#LD.ID#) RowCount'));
        $Obj->addFldCond('LD.Flag', 'R', '!=');
        $Obj->addFldCond('LD.LaundryID', $LaundryID);
        $Obj->addJoinTbl('CustomerService CS', 'LD.CustomerServiceID', 'CS.ID', 'LEFT JOIN');

		if ($SearchTxt != '') {
            $Obj->addFldCond('LD.LaundrySize', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LD.VehicleCount', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
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
	public static function getDataTblList($LaundryID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryFacility LD');
		$Obj->addFlds(array('LD.ID', 'LD.LaundrySize', 'LD.VehicleCount', 'LD.CustomerServiceID'));
        $Obj->addFldCond('LD.Flag', 'R', '!=');
        $Obj->addFldCond('LD.LaundryID', $LaundryID);
		if ($SearchTxt != '') {
            $Obj->addFldCond('LD.LaundrySize', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LD.VehicleCount', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'Desc');
            
        $Obj->addJoinTbl('CustomerService CS', 'LD.CustomerServiceID', 'CS.ID', 'LEFT JOIN');
		
		$Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
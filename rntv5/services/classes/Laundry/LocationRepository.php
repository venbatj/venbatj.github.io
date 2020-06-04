<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * LocationRepository
 * 
 * @package Rnt\Laundry
 */
class LocationRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'LaundryLocationInfo';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryLocationInfo');
        $Obj->addFlds(array('*'));
        $Obj->addOrderFlds('LocationName', 'Asc');
        $Obj->addFldCond('CreatedBy', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple(); 
    }

    /**
     * Get all location data
     * @return array
     */
    public static function getAllLocationData($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryLocationInfo CL');
        $Obj->addFlds(array('CL.ID', 'CL.LocationName', 'CL.LocationAddress', 'C.CityName LocationCity', 'CL.LocationState', 'CL.LocationZipcode', 'CT.CountryName LocationCountry', 'CL.LocationPhone', 'CL.CreatedBy', 'CL.Flag', 'CL.Modified'));
        $Obj->addOrderFlds('CL.LocationName', 'Asc');
        $Obj->addFldCond('CL.CreatedBy', $ID);
        $Obj->addFldCond('CL.Flag', 'R', '!=');
        $Obj->addJoinTbl('City C', 'CL.LocationCity', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CT', 'CL.LocationCountry', 'CT.ID', 'LEFT JOIN');
        return $Obj->getJoinMultiple(); 
    }

    /**
     * Get all data
     * @return array
     */
    public static function getDeliveryLocationData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryLocationInfo');
        $Obj->addFlds(array('*'));
        $Obj->addOrderFlds('LocationName', 'Asc');
        $Obj->addFldCond('LocationName', '', '!=');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addGroupFlds('LocationName');
        $res = $Obj->getMultiple(); 
        print_r($res);
        exit;
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryLocationInfo');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get data table count
     * @param int $SourceRefID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($CreatedBy, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryLocationInfo CL');
		$Obj->addFlds(array('COUNT(#CL.ID#) RowCount'));
        $Obj->addFldCond('CL.Flag', 'R', '!=');
        $Obj->addFldCond('CL.CreatedBy', $CreatedBy);
        $Obj->addJoinTbl('City C', 'CL.LocationCity', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerService CT', 'CL.LocationCountry', 'CT.ID', 'LEFT JOIN');

		if ($SearchTxt != '') {
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            // $Obj->addFldCond('LocationAddress', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCity', "%{$SearchTxt}%", 'LIKE', 'OR');
            // $Obj->addFldCond('LocationState', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCountry', "%{$SearchTxt}%", 'LIKE', 'OR');
            // $Obj->addFldCond('LocationZipcode', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationPhone', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		$Res = $Obj->getJoinSingle();
		return $Res['RowCount'];
	}

	/**
     * Get data table list
     * @param int $SourceRefID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($CreatedBy, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryLocationInfo CL');
		$Obj->addFlds(array('CL.ID', 'CL.LocationName ', 'C.CityName LocationCity', 'CT.CountryName LocationCountry', 'CL.LocationPhone'));
        $Obj->addFldCond('CL.Flag', 'R', '!=');
        $Obj->addFldCond('CL.CreatedBy', $CreatedBy);
		if ($SearchTxt != '') {
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            // $Obj->addFldCond('LocationAddress', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCity', "%{$SearchTxt}%", 'LIKE', 'OR');
            // $Obj->addFldCond('LocationState', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCountry', "%{$SearchTxt}%", 'LIKE', 'OR');
            // $Obj->addFldCond('LocationZipcode', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationPhone', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
        else        
            $Obj->addOrderFlds('ID', 'Desc');

        $Obj->addJoinTbl('City C', 'CL.LocationCity', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Country CT', 'CL.LocationCountry', 'CT.ID', 'LEFT JOIN');
            
        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
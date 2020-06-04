<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ContractInfoRepository
 * 
 * @package Rnt\Laundry
 */
class AssignLaundryRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'AssignLaundry';
    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('AssignLaundry');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByLaundryLocID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('AssignLaundry AL');
        $Obj->addFlds(array('AL.ID','AL.CustomerID','CL.LocationName CustomerLocationID','AL.LaundryID','LL.LocationName LaundryLocationID','AL.StartDate','AL.EndDate','AL.ReasonForChange'));
        $Obj->addFldCond('LaundryLocationID', $ID);
        $Obj->addJoinTbl('LaundryLocationInfo LL', 'AL.LaundryLocationID', 'LL.ID', 'LEFT JOIN');  
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'AL.CustomerLocationID', 'CL.ID', 'LEFT JOIN');   
        $Obj->addFldCond('AL.Flag', 'R', '!=');
        return $Obj->getJoinSingle();
        // print_r($Res);
        // exit;
    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByLocationID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('AssignLaundry');
        $Obj->addFlds('*');
        $Obj->addFldCond('CustomerLocationID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
        // print_r($Res);
        // exit;

        // $Obj = new SqlManager();
        // $Obj->addTbls('AssignLaundry AL');
        // $Obj->addFlds(array('AL.ID','CD.CustomerName','CL.LocationName CustomerLocationID','LD.LaundryName LaundryID','LL.LocationName LaundryLocationID','AL.StartDate','AL.EndDate','AL.ReasonForChange'));
        // $Obj->addFldCond('CustomerLocationID', $ID);
        // $Obj->addJoinTbl('LaundryLocationInfo LL', 'AL.LaundryLocationID', 'LL.ID', 'LEFT JOIN');   
        // $Obj->addJoinTbl('LaundryDetails LD', 'AL.LaundryID', 'LD.ID', 'LEFT JOIN');   
        // $Obj->addJoinTbl('CustomerDetails CD', 'AL.CustomerID', 'CD.ID', 'LEFT JOIN');   
        // $Obj->addJoinTbl('CustomerLocationInfo CL', 'AL.CustomerLocationID', 'CL.ID', 'LEFT JOIN');   
        // $Obj->addFldCond('AL.Flag', 'R', '!=');
        // return $Obj->getJoinSingle();
    }
    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('AssignLaundry AL');
		$Obj->addFlds(array('COUNT(#AL.ID#) RowCount'));
        $Obj->addFldCond('AL.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('CategoryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ProductName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('VariantName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Cost', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('CustomerDetails C', 'AL.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'AL.CustomerLocationID', 'CL.ID', 'LEFT JOIN');        
        $Obj->addJoinTbl('LaundryDetails LD', 'AL.LaundryID', 'LD.ID', 'LEFT JOIN');  
        $Obj->addJoinTbl('LaundryLocationInfo LL', 'AL.LaundryLocationID', 'LL.ID', 'LEFT JOIN'); 
        
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
		$Obj = new SqlManager();
		$Obj->addTbls('AssignLaundry AL');
        $Obj->addFlds(array('AL.ID', 'C.CustomerName CustomerID', 'CL.LocationName CustomerLocationID', 'LD.LaundryName LaundryID','LL.LocationName LaundryLocationID','AL.StartDate','AL.EndDate'));      
        $Obj->addFldCond('AL.Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            // $Obj->addFldCond('ProductName', "%{$SearchTxt}%", 'LIKE', 'OR');
            // $Obj->addFldCond('VariantName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        $Obj->addJoinTbl('CustomerDetails C', 'AL.CustomerID', 'C.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'AL.CustomerLocationID', 'CL.ID', 'LEFT JOIN');        
        $Obj->addJoinTbl('LaundryDetails LD', 'AL.LaundryID', 'LD.ID', 'LEFT JOIN');  
        $Obj->addJoinTbl('LaundryLocationInfo LL', 'AL.LaundryLocationID', 'LL.ID', 'LEFT JOIN');  
        
        if ($OrderFld != '')
        $Obj->addOrderFlds($OrderFld, $OrderType);
   
        $Obj->addLimit($Index, $Limit);
        
        $Res = $Obj->getJoinMultiple();

        $Temparr = array();

        foreach($Res as $Value) {
            if ($Value['StartDate'] !=0) {
                $Value['StartDate'] = date("j M Y", strtotime($Value['StartDate']));
                if ($Value['EndDate'] !=0) {
                    $Value['EndDate'] = date("j M Y", strtotime($Value['EndDate']));
                    $TempArr[] = $Value;
                } else {
                    $TempArr[] = $Value;
                }
            }
        }
        return $TempArr;
	}

}
?>
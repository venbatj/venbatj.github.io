<?php
namespace Rnt\Customer;

use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * AssignLaundryRepository
 * 
 * @package Rnt\Customer
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
        return 'CustomerLaundry';
    }
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerLaundry');
        $Obj->addFlds(array('ID', 'CustomerID'));
        $Obj->addOrderFlds('CustomerID', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple();
    }
    /**
     * Cost Insert
     * @param array $Row
     * @return int
     */
    public static function insertAssign($Row)
    {
        // print_r($Row);
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerLaundry');
        $Obj->addFlds(array('ID'  ,'CustomerID', 'LaundryID','LocationID','Logistics','ThirdPartyName','Reason','DeliveryStartDate','DeliveryEndDate','Reason'));
        $Obj->addInsrtFlds($Row);
        return $Obj->insertSingle();
    }
    /**
     * Update
     * @param array $Row
     * @return void
     */
    public static function updateAssign($Row)
    {

        $Obj = new SqlManager();
        $Obj->addTbls(array('CustomerLaundry'));
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond('ID', $Row['ID']);
        return $Obj->update();
    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerLaundry');
        $Obj->addFlds(array('ID','CustomerID','LocationID', 'LaundryID','Logistics','DeliveryStartDate','DeliveryEndDate','ThirdPartyName','Reason'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    // public static function getDateByLocationID($ID)
    // {
    //     $Obj = new SqlManager();
    //     $Obj->addTbls('CustomerContract');
    //     // $Obj->addTbls('CustomerLaundry CL');
    //     $Obj->addFlds(array('DeliveryStartDate', 'DeliveryEndDate'));
    //     $Obj->addFldCond('ID', $ID);
    //     // $Obj -> addJoinTbl('CustomerContract CC', 'CL.LocationID','CC.LocationID','LEFT JOIN');
    //     // return $Obj->getJoinSingle();
    //     return $Obj->getSingle();
    // }
    public static function getDateByLocationID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerContract');
        $Obj->addFlds(array('DeliveryStartDate', 'DeliveryEndDate'));
        $Obj->addFldCond('LocationID', $ID);
        $Res = $Obj->getMultiple();

        $Response = array('DeliveryStartDate'=>date('d M Y'));

        if(count($Res) == 1){
            foreach($Res as $Value){
                $Response['DeliveryStartDate'] = date('d M Y' , strtotime($Value['DeliveryStartDate']));
                $Response['DeliveryEndDate'] = date('d M Y' , strtotime($Value['DeliveryEndDate']));
            }
        }
        return $Response;
    }
    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerLaundry');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('CustomerID', $Row['CustomerID']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($CustomerID, $SearchTxt) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerLaundry CL');
        $Obj->addFlds(array('COUNT(#CL.ID#) RowCount'));
        $Obj->addJoinTbl('LaundryDetails L', 'CL.LaundryID', 'L.ID','LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CLI', 'CL.LocationID', 'CLI.ID','LEFT JOIN');
        // $Obj->addJoinTbl('CustomerDetails CD', 'CL.CustomerID', 'CD.ID');
        $Obj->addFldCond('CL.Flag', 'R', '!=');
        $Obj->addFldCond('CL.CustomerID', $CustomerID);
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('LaundryID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Logistics', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryStartDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryEndDate', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
	public static function getDataTblList($CustomerID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{

		$Obj = new SqlManager();
		$Obj->addTbls('CustomerLaundry CL');
		$Obj->addFlds(array('CL.ID','CLI.LocationName LocationID', 'L.LaundryName LaundryID','CL.Logistics','CL.DeliveryStartDate','CL.DeliveryEndDate'));
        $Obj->addFldCond('CL.Flag', 'R', '!=');
        $Obj->addFldCond('L.Flag', 'R', '!=');
        $Obj->addFldCond('CL.CustomerID', $CustomerID);
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('LaundryID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Logistics', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryStartDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryEndDate', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'DESC');    
        
        $Obj->addJoinTbl('LaundryDetails L', 'CL.LaundryID', 'L.ID','LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CLI', 'CL.LocationID', 'CLI.ID','LEFT JOIN');

        $Obj->addLimit($Index, $Limit);
        $Res = $Obj->getJoinMultiple();
        
        $TempArr = array();

        foreach($Res as $Value) {
            if ($Value['DeliveryStartDate'] !=0) {
                $Value['DeliveryStartDate'] = date("j M Y", strtotime($Value['DeliveryStartDate']));
                if ($Value['DeliveryEndDate'] !=0) {
                    $Value['DeliveryEndDate'] = date("j M Y", strtotime($Value['DeliveryEndDate']));
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
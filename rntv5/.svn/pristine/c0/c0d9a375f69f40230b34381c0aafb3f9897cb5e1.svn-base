<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * BasicDetailRepository
 * 
 * @package Rnt\Laundry
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
        return 'LaundryDetails';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryDetails');
        $Obj->addFlds(array('ID', 'LaundryName'));
        $Obj->addOrderFlds('LaundryName', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple();
    }

    /**
     * Get Contract Count by LaundryID
	 * @param int $ID
     * @return array
     */
    public static function getLocationCount($ID)
    {
        $TempArray = array();

        foreach ($ID as $LaundryID) {
            $Obj = new SqlManager();
            $Obj->addTbls('LaundryContract');
            $Obj->addFlds(array('ID'));
            $Obj->addFldCond('LaundryID', $LaundryID);
            $Obj->addFldCond('Flag', 'R', '!=');
            $Res = $Obj->getMultiple();

            $MaxCount = count($Res);
            $getLaundryName = self::getLaundryNameByContractID($LaundryID);
           
            $TempArray[] = array('Count' => $MaxCount, 'LaundryName' => $getLaundryName);

            $max = 0; 
            $found_item = null; 

            foreach($TempArray as $v)
            {
                if($v['Count'] > $max)
                {
                $max = $v['Count'];
                $found_item = $v;
                }
            }
        }
        return $found_item;
    }
    /**
     * get LaundryName By ContractID
	 * @param int $ID
     * @return array
     */
    private static function getLaundryNameByContractID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryDetails');
        $Obj->addFlds(array('LaundryName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();

        return $Res['LaundryName'];
    }

    /**
     * Remove Laundry Contact
	 * @param int $IDArr
     * @return array
     */
    public static function removeLaundryContact($IDArr) 
    {
        foreach ($IDArr as $ID) {
            $Obj = new SqlManager();
            $Obj->addTbls('Contact');
            $Obj->addInsrtFlds(array('Flag' => 'R'));
            $Obj->addFldCond('ContactForRef', $ID);
            $Obj->addFldCond('ContactFor', 'CC');
            $Res = $Obj->update();
        }
        return $Res;
    }
    /**
     * Remove Laundry Billing
	 * @param int $IDArr
     * @return array
     */
    public static function removeLaundryBilling($IDArr) 
    {
        foreach ($IDArr as $ID) {
            $Obj = new SqlManager();
            $Obj->addTbls('BillingDetails');
            $Obj->addInsrtFlds(array('Flag' => 'R'));
            $Obj->addFldCond('SourceRefID', $ID);
            $Obj->addFldCond('Source', 'CBC');
            $Res = $Obj->update();
        }
        return $Res;
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
        // $Obj->addJoinTbl('UserType UT', 'UR.UserTypeID', 'UT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Login L', 'UR.LoginID', 'L.ID', 'LEFT JOIN');
        $Obj->addFldCond('UR.DesignationID', 8);
        // $Obj->addFldCond('UR.UserTypeID', 0, '!=');
        // $Obj->addFldCond('L.Flag', 'R', '!=');
        return $Obj->getJoinMultiple();
    }

    /**
     * Get Product pricing by ProductID and VariantID
     * @param int $ProductID
     * @param int $VariantID
     * @return array
     */
    public static function getCompareLaundryVendor($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('LaundryCosting LVC'));
        $Obj->addFlds(array('LVC.ID', 'LS.LaundryName','C.CategoryName','P.ProductName','V.VariantName','LVC.Cost'));
        $Obj->addJoinTbl('LaundryDetails LS', 'LVC.LaundryID', 'LS.ID', 'LEFT JOIN'); 
        $Obj->addJoinTbl('Category C', 'LVC.CategoryID', 'C.ID', 'LEFT JOIN');   
        $Obj->addJoinTbl('Product P', 'LVC.ProductID', 'P.ID', 'LEFT JOIN');      
        $Obj->addJoinTbl('Variant V', 'LVC.VariantID', 'V.ID', 'LEFT JOIN');
        $Obj->addFldCond('LVC.CategoryID',$Row['CategoryID']);
        $Obj->addFldCond('LVC.ProductID',$Row['ProductID']);
        $Obj->addFldCond('LVC.VariantID',$Row['VariantID']);    
        $Obj->addFldCond('LVC.Flag', 'R', '!=');
        $Obj->addFldCond('P.Flag', 'R', '!=');
        $Res = $Obj->getJoinMultiple();
       
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
        $Obj->addTbls('LaundryDetails');
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
        $Obj->addTbls('LaundryDetails');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('LOWER(TRIM(LaundryName))', $Name);
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
        $Obj->addTbls('LaundryDetails');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');
            
        $Obj->addFldCond('LaundryName', $Row['LaundryName']);    
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
		$Obj->addTbls('LaundryDetails LD');
        $Obj->addFlds(array('COUNT(#LD.ID#) RowCount'));
        $Obj->addJoinTbl('User U', 'LD.DeliveryManager', 'U.ID', 'LEFT JOIN');
        $Obj->addFldCond('LD.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('LaundryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('DeliveryManager', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCount', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractCount', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
	public static function getDataTblList($Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
        $Status = "CASE LD.Flag
        WHEN 'A' THEN 'Active'
        WHEN 'I' THEN 'Inactive'
        ELSE 'Removed' END";

		$Obj = new SqlManager();
		$Obj->addTbls('LaundryDetails LD');
		$Obj->addFlds(array('LD.ID', 'LD.LaundryName', 'U.FirstName DeliveryManager', 'LD.LocationCount', 'LD.ContractCount', $Status.' Status'));
        $Obj->addJoinTbl('User U', 'LD.DeliveryManager', 'U.ID', 'LEFT JOIN');
        $Obj->addFldCond('LD.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('LaundryName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('DeliveryManager', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCount', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractCount', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'DESC');

        $Obj->addLimit($Index, $Limit); 
		return $Obj->getJoinMultiple();
	}
}
?>
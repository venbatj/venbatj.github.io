<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * BasicDetailRepository
 * 
 * @package Rnt\Customer
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
        return 'CustomerDetails';
    }

    /**
     * Get Data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDateByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerContract');
        $Obj->addFlds(array('DeliveryStartDate', 'DeliveryEndDate'));
        $Obj->addFldCond('ID', $ID);
        return $Obj->getSingle();
    }

    /**
     * Get Contract Count by CustomerID
	 * @param int $ID
     * @return array
     */
    public static function getContractCount($ID)
    {
        $TempArray = array();

        foreach ($ID as $CustomerID) {
            $Obj = new SqlManager();
            $Obj->addTbls('CustomerContract');
            $Obj->addFlds(array('ID'));
            $Obj->addFldCond('CustomerID', $CustomerID);
            $Obj->addFldCond('Flag', 'R', '!=');
            $Res = $Obj->getMultiple();

            $MaxCount = count($Res);
            $getCustName = self::getCustomerNameByContractID($CustomerID);
           
            $TempArray[] = array('Count' => $MaxCount, 'CustomerName' => $getCustName);

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
     * Get CustomerName By ContractID
	 * @param int $ID
     * @return array
     */
    private static function getCustomerNameByContractID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds(array('CustomerName'));
        $Obj->addFldCond('ID', $ID);
        $Res = $Obj->getSingle();

        return $Res['CustomerName'];
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds(array('*'));
        $Obj->addOrderFlds('CustomerName', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('CustomerName', '','!=');
        return $Obj->getMultiple();
    }

    /**
     * Get Location
     * @param int $ID
     * @return array
     */
    public static function getLocation($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteGeneration');
        $Obj->addFlds(array('HOLocation'));
        $Obj->addFldCond('ID', $ID);
        $Res = $Obj->getSingle();
       
        return $Res;
    }

    /**
     * Get Billing Info
     * @param int $ID
     * @return array
     */
    public static function getBillingInfo($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteData QD');
        $Obj->addFlds(array('QD.ID', 'QG.HOLocation', 'QD.ProductID', 'QD.VariantID', 'QD.Qty', 'QD.CostOfLinen', 'QD.PurchaseCost', 'QD.LinenCostPerUse', 'QD.TechCostPerUse', 'QD.DeliveryCostPerUse', 'QD.WarehouseCost', 'QD.LaundryCost', 'QD.TotalCost', 'QD.PriceToCustomer', 'QD.BillableQty', 'QD.EstBillingPerDay', 'QD.BreakevenDays'));
        $Obj->addJoinTbl('QuoteGeneration QG', 'QD.QuoteID', 'QG.ID', 'LEFT JOIN');

        $Obj->addFldCond('QG.ID', $ID);
        
        $Obj->addFldCond('QD.Flag', 'R', '!=');
        $Res =  $Obj->getJoinMultiple();

        $TempArr = array();

        foreach($Res as $Item) {

            if ($Item['ProductID'] != 0) {
                $Item['ProductName'] = self::getProductByID($Item['ProductID']);
                if ($Item['VariantID'] != 0)
                    $Item['VariantName'] = self::getVariantByID($Item['VariantID']);
                $TempArr[] = $Item;
            } else {
                $TempArr[] = $Item;
            }
        }
       
        return $TempArr;
    }

    /**
     * Get Product by ID
	 * @param int $ID
     * @return array
     */
    public static function getProductByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ProductName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['ProductName'];
    }

    /**
     * Get Variant by ID
	 * @param int $ID
     * @return array
     */
    public static function getVariantByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant');
        $Obj->addFlds(array('VariantName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['VariantName'];
    }

    /**
     * Get all data delivery
     * @return array
     */
    public static function getAllDataAccount()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('UserDesignation UD');
        $Obj->addFlds(array('UR.ID', 'UR.FirstName', 'L.EmailID'));
        $Obj->addOrderFlds('UR.FirstName', 'ASC');
        $Obj->addJoinTbl('User UR', 'UD.LoginID', 'UR.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Login L', 'UR.LoginID', 'L.ID', 'LEFT JOIN');
        $Obj->addFldCond('UD.DesignationID', 9);
        $Obj->addFldCond('UD.Flag', 'R', '!=');
        return $Obj->getJoinMultiple();
    }

    /**
     * Get All Quote Version
     * @param int $ID
     * @return array
     */
    public static function getAllQuoteVersion($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteGeneration QG');
        $Obj->addFlds(array('QG.ID', 'QG.QuoteID'));
        $Obj->addOrderFlds('QG.QuoteID', 'ASC');
        $Obj->addJoinTbl('CustomerDetails CD', 'if(#QG.CustomerID# > "0", QG.CustomerID, QG.CustomerName)', 'if(#QG.CustomerID# > "0", CD.ID, CD.CustomerName)', 'LEFT JOIN');

        $Obj->addFldCond('QG.Flag', 'R', '!=');
        $Obj->addFldCond('QG.QuoteID', '','!=');
        $Obj->addFldCond('CD.ID', $ID);

        return $Obj->getJoinMultiple();
    }

    /**
     * Get Selected Quote Version
     * @param int $ID
     * @return array
     */
    public static function getSelectedQuoteVersion($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteGeneration QG');
        $Obj->addFlds(array('QG.ID', 'QG.QuoteID'));
        $Obj->addOrderFlds('QG.QuoteID', 'ASC');
        $Obj->addJoinTbl('CustomerDetails CD', 'if(#QG.CustomerID# > "0", QG.CustomerID, QG.CustomerName)', 'if(#QG.CustomerID# > "0", CD.ID, CD.CustomerName)', 'LEFT JOIN');


        $Obj->addFldCond('QG.Flag', 'R', '!=');
        $Obj->addFldCond('CD.ID', $ID);
        $Obj->addFldCond('QG.QuoteStatus', 'A');
        $Obj->addFldCond('QG.QuoteID', '','!=');

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
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getJoinSingle();
        $Laundry['LaundryID'] = self::assignLaundryID($ID);
        return array_merge($Res, $Laundry);
    }

    /**
     * Get Assign Laundry ID
	 * @param int $ID
     * @return array
     */
    public static function assignLaundryID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerLaundry');
        $Obj->addFlds('*');
        $Obj->addFldCond('CustomerID',$ID);
        $Obj->addFldCond('Flag','R','!=');
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
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('LOWER(TRIM(CustomerName))', $Name);
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
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('CustomerName', $Row['CustomerName']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Remove Customer
	 * @param int $IDArr
     * @return array
     */
    public static function removeCustomer($IDArr) 
    {
        foreach ($IDArr as $ID) {
            $Obj = new SqlManager();
            $Obj->addTbls('CustomerContract');
            $Obj->addInsrtFlds(array('Flag' => 'R'));
            $Obj->addFldCond('ID', $ID);
            $Res = $Obj->update();
        }
        return $Res;
    }

    /**
     * Remove Customer Contact
	 * @param int $IDArr
     * @return array
     */
    public static function removeCustomerContact($IDArr) 
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
     * Remove Customer Billing
	 * @param int $IDArr
     * @return array
     */
    public static function removeCustomerBilling($IDArr) 
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
     * Remove Customer Shipping
	 * @param int $IDArr
     * @return array
     */
    public static function removeCustomerShipping($IDArr) 
    {
        foreach ($IDArr as $ID) {
            $Obj = new SqlManager();
            $Obj->addTbls('ShippingDetails');
            $Obj->addInsrtFlds(array('Flag' => 'R'));
            $Obj->addFldCond('SourceRefID', $ID);
            $Res = $Obj->update();
        }
        return $Res;
    }

    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt, $CustomerTypeID = 0, $AccountManager = 0) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails CD');
        $Obj->addFlds(array('COUNT(#CD.ID#) RowCount'));
        $Obj->addFldCond('CD.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CustomerType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('AccountManager', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCount', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractCount', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}

        $Obj->addJoinTbl('User UR', 'CD.AccountManager', 'UR.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerType CUT', 'CD.CustomerTypeID', 'CUT.ID', 'LEFT JOIN');
        
        if($CustomerTypeID != 0){
            $Obj->addFldCond('CD.CustomerTypeID', $CustomerTypeID);
        }
        if($AccountManager != 0){
            $Obj->addFldCond('CD.AccountManager', $AccountManager);
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
	public static function getDataTblList($Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '', $CustomerTypeID = 0, $AccountManager = 0)
	{
        $Status = "CASE CD.Flag
        WHEN 'A' THEN 'Active'
        WHEN 'I' THEN 'Inactive'
        ELSE 'Removed' END";

		$Obj = new SqlManager();
		$Obj->addTbls('CustomerDetails CD');
		$Obj->addFlds(array('CD.ID', 'CD.CustomerName CustomerName', 'CUT.CustomerType CustomerType', 'UR.FirstName AccountManager', 'CD.LocationCount LocationCount', 'CD.ContractCount ContractCount', $Status.' Status'));
		$Obj->addFldCond('CD.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CustomerType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('AccountManager', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationCount', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractCount', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'DESC');    
        
            $Obj->addJoinTbl('User UR', 'CD.AccountManager', 'UR.ID', 'LEFT JOIN');
            $Obj->addJoinTbl('CustomerType CUT', 'CD.CustomerTypeID', 'CUT.ID', 'LEFT JOIN');

        if($CustomerTypeID != 0){
            $Obj->addFldCond('CD.CustomerTypeID', $CustomerTypeID);
        }
        if($AccountManager != 0){
            $Obj->addFldCond('CD.AccountManager', $AccountManager);
        }
        $Obj->addLimit($Index, $Limit);
        return $Obj->getJoinMultiple();
	}
}
?>
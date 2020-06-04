<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ContractInfoRepository
 * 
 * @package Rnt\Customer
 */
class ContractInfoRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'CustomerContract';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerContract');
        $Obj->addFlds(array('ID', 'ContractSignedDate', 'DeliveryStartDate', 'DeliveryEndDate', 'ActualStartDate', 'ActualEndDate', 'ContractTypeID', 'TotalContractValue', 'MonthlyBillingValue', '', 'InvoicingFrequencyID', 'Advance', 'PaymentTerms', 'TradeLicenseNo', 'TaxID', 'AdvanceDeposit', 'RenewalReminder1', 'RenewalReminder2', 'RenewalReminder3', 'RenewalReminder1Date', 'RenewalReminder2Date', 'RenewalReminder3Date'));
        $Obj->addOrderFlds('ContractSignedDate', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');

        return $Obj->getMultiple();
    }

    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerContract');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');

        $Res = $Obj->getSingle();
        if (count($Res))
            return $Res;
        return array('RenewalReminder1' => 'N', 'RenewalReminder2' => 'N', 'RenewalReminder3' => 'N');
    }

    /**
     * check by CustomerID
	 * @param int $CustomerID
     * @return array
     */
    public static function checkByCustomerID($CustomerID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerContract');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('CustomerID', $CustomerID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
   
    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */       
	public static function getDataTblListCount($CustomerID, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('CustomerContract CC');
		$Obj->addFlds(array('COUNT(#CC.ID#) RowCount'));
        $Obj->addFldCond('CC.Flag', 'R', '!=');
        $Obj->addFldCond('CustomerID', $CustomerID);
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ContractSignedDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryStartDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('InvoicingFrequencyID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractTypeID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryEndDate', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'CC.LocationID', 'CL.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('ContractType CT', 'CC.ContractTypeID', 'CT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('InvoicingFrequency IFr', 'CC.InvoicingFrequencyID', 'IFr.ID', 'LEFT JOIN');

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
		$Obj->addTbls('CustomerContract CC');
		$Obj->addFlds(array('CC.ID', 'CL.LocationName LocationID', 'CC.ContractSignedDate', 'CC.DeliveryStartDate', 'CC.DeliveryEndDate', 'CT.ContractType ContractTypeID', 'IFr.InvoicingFrequency InvoicingFrequencyID'));
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'CC.LocationID', 'CL.ID', 'LEFT JOIN');        
        $Obj->addFldCond('CC.Flag', 'R', '!=');
        $Obj->addFldCond('CustomerID', $CustomerID);

        if ($SearchTxt != '') {
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ContractSignedDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryStartDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('InvoicingFrequencyID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractTypeID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryEndDate', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
        $Obj->addJoinTbl('ContractType CT', 'CC.ContractTypeID', 'CT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('InvoicingFrequency IFr', 'CC.InvoicingFrequencyID', 'IFr.ID', 'LEFT JOIN');

		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        $Obj->addLimit($Index, $Limit);
        
        $Res = $Obj->getJoinMultiple();

        $Temparr = array();

        foreach($Res as $Value) {
            if ($Value['ContractSignedDate'] !=0) {
                $Value['ContractSignedDate'] = date("j M Y", strtotime($Value['ContractSignedDate']));
                if ($Value['DeliveryStartDate'] !=0) {
                    $Value['DeliveryStartDate'] = date("j M Y", strtotime($Value['DeliveryStartDate']));
                    if ($Value['DeliveryEndDate'] !=0) {
                        $Value['DeliveryEndDate'] = date("j M Y", strtotime($Value['DeliveryEndDate']));
                        $Temparr[] = $Value;
                    } else {
                        $Temparr[] = $Value;
                    }
                }
            }
        }
        return $Temparr;
	}
}
?>
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
class ContractInfoRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'LaundryContract';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryContract');
        $Obj->addFlds(array('ID', 'ContractSignedDate','DeliveryStartDate','DeliveryEndDate', 'InvoicingFrequencyID', 'PaymentTerms', 'TradeLicenseNo', 'TaxID', 'RenewalReminder1', 'RenewalReminder2', 'RenewalReminder3'));
        $Obj->addOrderFlds('ContractSignedDate', 'ASC');
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
        $Obj->addTbls('LaundryContract');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');

        $Res = $Obj->getSingle();
        if (count($Res))
            return $Res;
        return array('RenewalReminder1' => 'N', 'RenewalReminder2' => 'N', 'RenewalReminder3' => 'N');
    }

    /**
     * check by LaundryID
	 * @param int $LaundryID
     * @return array
     */
    public static function checkByLaundryID($LaundryID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('LaundryContract');
        $Obj->addFlds(array('ID'));
        $Obj->addFldCond('LaundryID', $LaundryID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }


    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($LaundryID, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('LaundryContract LC');
        $Obj->addFlds(array('COUNT(#LC.ID#) RowCount'));
        $Obj->addJoinTbl('LaundryLocationInfo CL', 'LC.LocationID', 'CL.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('InvoicingFrequency IFr', 'LC.InvoicingFrequencyID', 'IFr.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('ContractType CT', 'LC.ContractTypeID', 'CT.ID', 'LEFT JOIN');
        $Obj->addFldCond('LC.Flag', 'R', '!=');
        $Obj->addFldCond('LC.LaundryID', $LaundryID);
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ContractSignedDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryStartDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryEndDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('InvoicingFrequencyID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
		$Obj->addTbls('LaundryContract LC');
		$Obj->addFlds(array('LC.ID', 'CL.LocationName', 'LC.ContractSignedDate', 'LC.DeliveryStartDate', 'LC.DeliveryEndDate', 'CT.ContractType', 'IFr.InvoicingFrequency', 'PaymentTerms', 'TradeLicenseNo', 'TaxID', 'RenewalReminder1', 'RenewalReminder2', 'RenewalReminder3', 'LC.Flag Status'));
        $Obj->addJoinTbl('LaundryLocationInfo CL', 'LC.LocationID', 'CL.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('InvoicingFrequency IFr', 'LC.InvoicingFrequencyID', 'IFr.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('ContractType CT', 'LC.ContractTypeID', 'CT.ID', 'LEFT JOIN');
        $Obj->addFldCond('LC.Flag', 'R', '!=');
        $Obj->addFldCond('LC.LaundryID', $LaundryID);
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ContractSignedDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryStartDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DeliveryEndDate', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('ContractType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('InvoicingFrequencyID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
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
<?php
namespace Rnt\RFIDSupplier;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ContractInfoRepository
 * 
 * @package Rnt\RFIDSupplier
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
        return 'RFIDSupplierContract';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierContract');
        $Obj->addFlds(array('ID', 'ContractSignedDate', 'InvoicingFrequencyID', 'Advance','PaymentTerms','FreightTerms','ReturnPolicy','LeadTime','MOQValue','PickUpTerms','TradeLicenseNo', 'TaxID'));
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
        $Obj->addTbls('RFIDSupplierContract');
        $Obj->addFlds('*');
        $Obj->addFldCond('RFIDSupplierID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        
        $Res = $Obj->getSingle();
        if (count($Res))
        return $Res;
        return array('Flag' => 'A');
    }

    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('RFIDSupplierContract');
        $Obj->addFlds(array('RFIDSupplierID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('RFIDSupplierID', $Row['ID'], '!=');

        $Obj->addFldCond('InvoicingFrequencyID', $Row['InvoicingFrequencyID']);    
        $Obj->addFldCond('PaymentTerms', $Row['PaymentTerms']);    
        $Obj->addFldCond('FreightTerms', $Row['FreightTerms']);    
        $Obj->addFldCond('ReturnPolicy', $Row['ReturnPolicy']);    
        $Obj->addFldCond('TradeLicenseNo', $Row['TradeLicenseNo']);    
        $Obj->addFldCond('TaxID', $Row['TaxID']);    
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
		$Obj->addTbls('RFIDSupplierContract');
		$Obj->addFlds(array('COUNT(#ID#) RowCount'));
		$Obj->addFldCond('Flag', 'R', '!=');
		if ($SearchTxt != '') {
            $Obj->addFldCond('ContractSignedDate', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('InvoicingFrequencyID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		$Res = $Obj->getSingle();
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
		$Obj->addTbls('RFIDSupplierContract LS');
		$Obj->addFlds(array('LS.ID', 'ContractSignedDate', 'InvoicingFrequencyID', 'Advance','PaymentTerms','FreightTerms','ReturnPolicy','LeadTime','MOQValue','PickUpTerms','TradeLicenseNo', 'TaxID', 'LS.Flag Status'));
        $Obj->addFldCond('LS.Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('ContractSignedDate', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('InvoicingFrequencyID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        if ($OrderFld != '')
        $Obj->addOrderFlds($OrderFld, $OrderType);
   
        $Obj->addJoinTbl('InvoicingFrequency IF', 'LS.InvoicingFrequencyID', 'IF.ID', 'LEFT JOIN');
       
        $Obj->addLimit($Index, $Limit);
        
		return $Obj->getJoinMultiple();
	}
}
?>
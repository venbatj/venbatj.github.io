<?php
namespace Rnt;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

use Rnt\Masters\CityRepository as CTY;
use Rnt\Masters\CountryRepository as CNT;
use Rnt\Masters\ContractTypeRepository as ContractType;
use Rnt\Masters\InvoicingFrequencyRepository as InvoicingFrequency;
use Rnt\Account\Login as Login;

/**
 * ImportBase
 * 
 * @package Rnt
 */
class ImportBase implements IRepository
{
    use AERRepository;

    private static $msCountry = array();
    private static $msCity = array();
    private static $msContractType = array();
    private static $msInvoicingFrequency = array();
    private static $msUser = array();

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'ImportHistory';
    }

    /**
     * Insert contact info
     * @param string $ImportFor
     * @param array $Row
     * @return int
     */
    public static function insertImportHistory($ImportFor, $Row)
    {
        $Row['Src'] = $ImportFor;
        return self::insert($Row);
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(self::getTable());
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get contact info data table count
     * @param string $ImportFor
	 * @param string $SearchTxt
     * @return int
     */
	protected static function getImportHistoryDataTblListCount($ImportFor, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls(self::getTable());
		$Obj->addFlds(array('COUNT(#ID#) RowCount'));
        $Obj->addFldCond('Flag', 'R', '!=');
        
        $Obj->addFldCond('Src', $ImportFor);

		if ($SearchTxt != '') {
			$Obj->addFldCond('ImportAt', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ActualFileName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		$Res = $Obj->getSingle();
		return $Res['RowCount'];
    }
    
    /**
     * Get contact info data table list
     * @param string $ImportFor
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getImportHistoryDataTblList($ImportFor, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls(self::getTable());
		$Obj->addFlds(array('ID', 'ImportAt', 'ActualFileName', 'ImportStatus', 'Src'));
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addFldCond('Src', $ImportFor);

		if ($SearchTxt != '') {
			$Obj->addFldCond('ImportAt', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ActualFileName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
		
        $Obj->addLimit($Index, $Limit);
		return $Obj->getMultiple();
    }
    
    /**
     * Get city ID by name
     * @param string $Name
     * @return int
     */
    protected static function getCityIDByName($Name)
    {
        $City = strtolower(trim($Name));
        if (isset(self::$msCity[$City]))
            return self::$msCity[$City];
        $Res = CTY::getDataByName($City);
        if (count($Res))
            self::$msCity[$City] = $Res['ID'];
        else
            self::$msCity[$City] = 0;
        return self::$msCity[$City];
    }

    /**
     * Get country ID by name
     * @param string $Name
     * @return int
     */
    protected static function getCountryIDByName($Name)
    {
        $Country = strtolower(trim($Name));
        if (isset(self::$msCountry[$Country]))
            return self::$msCountry[$Country];
        $Res = CNT::getDataByName($Country);
        if (count($Res))
            self::$msCountry[$Country] = $Res['ID'];
        else
            self::$msCountry[$Country] = 0;
        return self::$msCountry[$Country];
    }

    /**
     * Get LoginID by manager EmailID
     * @param string $EmailID
     * @return int
     */
    protected static function getLoginIDByEmailID($EmailID)
    {
        $EmailID = trim($EmailID);
        if (isset(self::$msUser[$EmailID]))
            return self::$msUser[$EmailID];
        $Res = Login::getDataByEmailID($EmailID);
        if (count($Res))
            self::$msUser[$EmailID] = $Res['ID'];
        else
            self::$msUser[$EmailID] = 0;
        return self::$msUser[$EmailID];
    }

    /**
     * Get ContractTypeID by name
     * @param string $Name
     * @return int
     */
    protected static function getContractTypeIDByName($Name)
    {
        $ContractType = strtolower(trim($Name));
        if (isset(self::$msContractType[$ContractType]))
            return self::$msContractType[$ContractType];
        $Res = ContractType::getDataByName($ContractType);
        if (count($Res))
            self::$msContractType[$ContractType] = $Res['ID'];
        else
            self::$msContractType[$ContractType] = 0;
        return self::$msContractType[$ContractType];
    }

    /**
     * Get InvoicingFrequencyID by name
     * @param string $Name
     * @return int
     */
    protected static function getInvoicingFrequencyIDByName($Name)
    {
        $InvoicingFrequency = strtolower(trim($Name));
        if (isset(self::$msInvoicingFrequency[$InvoicingFrequency]))
            return self::$msInvoicingFrequency[$InvoicingFrequency];
        $Res = InvoicingFrequency::getDataByName($InvoicingFrequency);
        if (count($Res))
            self::$msInvoicingFrequency[$InvoicingFrequency] = $Res['ID'];
        else
            self::$msInvoicingFrequency[$InvoicingFrequency] = 0;
        return self::$msInvoicingFrequency[$InvoicingFrequency];
    }

    /**
     * src dom for data table
     * @param array $Data
     * @return array
     */
    public static function srcDom($Data)
    {
        foreach ($Data as $Key => $Item) {
            $Data[$Key]['SrcDownload'] = '<a target="_blank" href="'.SERVICE_HOST_PATH.'/import-download.php?src='.md5($Item['Src']).'&ref='.md5($Item['ID']).'">'.$Item['ActualFileName'].'</a>';
        }
        return $Data;
    }
}
?>
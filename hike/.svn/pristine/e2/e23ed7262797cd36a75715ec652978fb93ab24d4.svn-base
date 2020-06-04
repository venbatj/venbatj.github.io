<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * CurrencyRepository
 * 
 * @package Rnt\Masters
 */
class CurrencyRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'Currency';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Currency');
        $Obj->addFlds(array('ID', 'CurrencyName','Code','ExchangeRate','ERModifiedAt'));
        $Obj->addOrderFlds('CurrencyName', 'ASC');
        $Obj->addOrderFlds('Code', 'ASC');
        $Obj->addOrderFlds('ExchangeRate', 'ASC');
        $Obj->addOrderFlds('ERModifiedAt', 'ASC');
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
        $Obj->addTbls('Currency');
        $Obj->addFlds(array('ID', 'CurrencyName', 'Code','ExchangeRate','ERModifiedAt'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Update update Date And Time
     * @param array $Row
     * @return void
     */
    public static function updateCurrency($Row)
    {
        $oldData = self::getDataByID($Row['ID']);
        $Obj = new SqlManager();
        $Obj->addTbls('Currency');
        $Obj->addFldCond('ID', $Row['ID']);
        if ($oldData['ExchangeRate'] != $Row['ExchangeRate']){
            $Obj->addInsrtFlds(array('CurrencyName' => $Row['CurrencyName'], 'Code' => $Row['Code'], 'ExchangeRate' =>  $Row['ExchangeRate'], 'ERModifiedAt' => $Row['ERModifiedAt']));
        }
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->update();
    }

    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Currency');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('CurrencyName', $Row['CurrencyName']);    
        $Obj->addFldCond('Code', $Row['Code']);    
        $Obj->addFldCond('ExchangeRate', $Row['ExchangeRate']);    
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
		$Obj->addTbls('Currency');
		$Obj->addFlds(array('COUNT(#ID#) RowCount'));
		$Obj->addFldCond('Flag', 'R', '!=');
		if ($SearchTxt != '') {
			$Obj->addFldCond('CurrencyName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Code', "%{$SearchTxt}%", 'LIKE', 'OR', '');
            $Obj->addFldCond('ExchangeRate', "%{$SearchTxt}%", 'LIKE', 'OR', '');
            $Obj->addFldCond('ERModifiedAt', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
		$Obj->addTbls('Currency');
		$Obj->addFlds(array('ID', 'CurrencyName', 'Code','ExchangeRate','ERModifiedAt'));
		$Obj->addFldCond('Flag', 'R', '!=');
		if ($SearchTxt != '') {
            $Obj->addFldCond('CurrencyName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Code', "%{$SearchTxt}%", 'LIKE', 'OR', '');
            $Obj->addFldCond('ExchangeRate', "%{$SearchTxt}%", 'LIKE', 'OR', '');
            $Obj->addFldCond('ERModifiedAt', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
		
		$Obj->addLimit($Index, $Limit);
		return $Obj->getMultiple();
	}
}
?>
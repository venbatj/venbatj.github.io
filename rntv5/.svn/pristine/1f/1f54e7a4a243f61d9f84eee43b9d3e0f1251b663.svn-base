<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * InvoicingFrequencyRepository
 * 
 * @package Rnt\Masters
 */
class InvoicingFrequencyRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'InvoicingFrequency';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InvoicingFrequency');
        $Obj->addFlds(array('ID', 'InvoicingFrequency'));
        $Obj->addOrderFlds('InvoicingFrequency', 'ASC');
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
        $Obj->addTbls('InvoicingFrequency');
        $Obj->addFlds(array('ID', 'InvoicingFrequency', 'Description'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Get data by Name
	 * @param string $Name
     * @return array
     */
    public static function getDataByName($Name)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InvoicingFrequency');
        $Obj->addFlds(array('ID', 'InvoicingFrequency', 'Description'));
        $Obj->addFldCond('LOWER(TRIM(InvoicingFrequency))', $Name);
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
        $Obj->addTbls('InvoicingFrequency');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('InvoicingFrequency', $Row['InvoicingFrequency']);    
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
        $Obj->addTbls('InvoicingFrequency');
        $Obj->addFlds(array('COUNT(#ID#) RowCount'));
        $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('InvoicingFrequency', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
        $Obj->addTbls('InvoicingFrequency');
        $Obj->addFlds(array('ID', 'InvoicingFrequency', 'Description'));
        $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('InvoicingFrequency', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        
        $Obj->addLimit($Index, $Limit);
        return $Obj->getMultiple();
    }
}
?>
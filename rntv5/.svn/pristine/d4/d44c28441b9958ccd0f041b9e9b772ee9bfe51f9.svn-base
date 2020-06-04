<?php
namespace Rnt\Settings;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * EmailConfigurationRepository
 * 
 * @package Rnt\Settings
 */
class EmailConfigurationRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'EmailConfiguration';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('EmailConfiguration');
        $Obj->addFlds(array('ID', 'Host','Port','SMTPSecure','SenderName','UserName', 'Password'));
        $Obj->addOrderFlds('Host', 'ASC');
        $Obj->addOrderFlds('Port', 'ASC');
        $Obj->addOrderFlds('SMTPSecure', 'ASC');
        $Obj->addOrderFlds('SenderName', 'ASC');
        $Obj->addOrderFlds('UserName', 'ASC');
        $Obj->addOrderFlds('Password', 'ASC');
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
        $Obj->addTbls('EmailConfiguration');
        $Obj->addFlds(array('ID', 'Host','Port','SMTPSecure', 'SenderName','UserName','Password'));
        $Obj->addFldCond('ID', $ID);
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
        $Obj->addTbls('EmailConfiguration');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');
        $Obj->addFldCond('Host', $Row['Host']);    
        $Obj->addFldCond('Port', $Row['Port']);   
        $Obj->addFldCond('SenderName', $Row['SenderName']);    
        $Obj->addFldCond('UserName', $Row['UserName']);    
        $Obj->addFldCond('Password', $Row['Password']);    
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
        $Obj->addTbls('EmailConfiguration');
        $Obj->addFlds(array('COUNT(#ID#) RowCount'));
        $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('Host', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Port', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('SMTPSecure', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('SenderName', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('UserName', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Password', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
        $Obj->addTbls('EmailConfiguration');
        $Obj->addFlds(array('ID', 'Host','Port','SMTPSecure', 'SenderName','UserName','Password'));
        $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('Host', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('Port', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('SMTPSecure', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('SenderName', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('UserName', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Password', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        
        $Obj->addLimit($Index, $Limit);
        return $Obj->getMultiple();
    }
}
?>
<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ShippingInfoRepository
 * 
 * @package Rnt\Customer
 */
class ShippingInfoRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'ShippingDetails';
    }
    public static function getLoginTable()
    {
        return 'Login';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('ShippingDetails');
        $Obj->addFlds(array('ID', 'Name', 'EmailID'));
        $Obj->addOrderFlds('Name', 'Asc');
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
        $Obj->addTbls('ShippingDetails');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    // public static function update($Row)
    // {
    //     if (!isset($Row['ID'])) {
    //         return false;
    //     }

    //     $ID = $Row['ID'];
    //     unset($Row['ID']);

    //     $Obj = new SqlManager();
    //     $Obj->addTbls(self::getLoginTable());
    //     $Obj->addInsrtFlds($Row);
    //     $Obj->addFldCond('ID', $ID);
    //     $Obj->addFldCond('Flag', 'R', '!=');
    //     return $Obj->update();
    // }

    // /**
    //  * Is exists
    //  * @param array $Row
    //  * @return int
    //  */
    // public static function isExistsEmailID($Row)
    // {
    //     $Obj = new SqlManager();
    //     $Obj->addTbls(array('Login'));
    //     $Obj->addFlds(array('ID'));  
    //     $Obj->addFldCond('EmailID', $Row['EmailID']);    
    //     return count($Obj->getSingle());
    // }


    /**
     * Is exists
	 * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('ShippingDetails');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('EmailID', $Row['EmailID']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Get data table count
     * @param int $SourceRefID
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SourceRefID, $SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('ShippingDetails S');
		$Obj->addFlds(array('COUNT(#S.ID#) RowCount'));
        $Obj->addFldCond('S.Flag', 'R', '!=');
        $Obj->addFldCond('SourceRefID', $SourceRefID);
		if ($SearchTxt != '') {
			$Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'S.LocationID', 'CL.ID', 'LEFT JOIN');
		$Res = $Obj->getSingle();
		return $Res['RowCount'];
	}

	/**
     * Get data table list
     * @param int $SourceRefID
	 * @param int $Index
	 * @param int $Limit
	 * @param string $SearchTxt
	 * @param string $OrderFld
	 * @param string $OrderType
     * @return array
     */
	public static function getDataTblList($SourceRefID, $Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
	{
		$Obj = new SqlManager();
		$Obj->addTbls('ShippingDetails S');
		$Obj->addFlds(array('S.ID', 'S.FirstName Name', 'S.EmailID','CL.LocationName LocationID'));
        $Obj->addFldCond('S.Flag', 'R', '!=');
        $Obj->addFldCond('SourceRefID', $SourceRefID);
		if ($SearchTxt != '') {
            $Obj->addFldCond('FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LocationID', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'S.LocationID', 'CL.ID', 'LEFT JOIN');
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
        else        
            $Obj->addOrderFlds('ID', 'Desc');
            
        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
	}
}
?>
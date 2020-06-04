<?php
namespace Rnt\Settings;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * InternalUserManagementRepository
 * 
 * @package Rnt\Settings
 */
class InternalUserManagementRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'InternalUserManagement';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('InternalUserManagement');
        $Obj->addFlds(array('ID','LoginID','UserTypeID','FirstName', 'LastName','DepartmentD','DesignationID','MemberID','EmployeeID', 'Phone','Location'));
        $Obj->addOrderFlds('LoginID', 'ASC');
        $Obj->addOrderFlds('UserTypeID', 'ASC');
        $Obj->addOrderFlds('FirstName', 'ASC');
        $Obj->addOrderFlds('LastName', 'ASC');
        $Obj->addOrderFlds('DepartmentD', 'ASC');
        $Obj->addOrderFlds('DesignationID', 'ASC');
        $Obj->addOrderFlds('MemberID', 'ASC');
        $Obj->addOrderFlds('EmployeeID', 'ASC');
        $Obj->addOrderFlds('Phone', 'ASC');
        $Obj->addOrderFlds('Location', 'ASC');
        // $Obj->addFldCond('Flag', 'R', '!=');
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
        $Obj->addTbls('InternalUserManagement');
        $Obj->addFlds(array('ID','LoginID','UserTypeID','FirstName', 'LastName','DepartmentD','DesignationID','MemberID','EmployeeID', 'Phone','Location'));
        $Obj->addFldCond('ID', $ID);
        // $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Is exists
     * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        // echo "<pre>";
        // print_r($Row);
        // exit;
        $Obj = new SqlManager();
        $Obj->addTbls('InternalUserManagement');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');
        $Obj->addFldCond('LoginID', $Row['LoginID']);    
        $Obj->addFldCond('UserTypeID', $Row['UserTypeID']);    
        $Obj->addFldCond('FirstName', $Row['FirstName']);    
        $Obj->addFldCond('LastName', $Row['LastName']);    
        $Obj->addFldCond('DepartmentD', $Row['DepartmentD']);    
        $Obj->addFldCond('DesignationID', $Row['DesignationID']);    
        $Obj->addFldCond('MemberID', $Row['MemberID']);   
        $Obj->addFldCond('EmployeeID', $Row['EmployeeID']);    
        $Obj->addFldCond('Phone', $Row['Phone']);    
        $Obj->addFldCond('Location', $Row['Location']);    
        // $Obj->addFldCond('Flag', 'R', '!=');
        
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
        $Obj->addTbls('InternalUserManagement');
        $Obj->addFlds(array('COUNT(#ID#) RowCount'));
        // $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('LoginID	', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('UserTypeID	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('FirstName	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LastName	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DepartmentD	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DesignationID	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('MemberID	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmployeeID', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Location', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');

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
        $Obj->addTbls('InternalUserManagement');
        $Obj->addFlds(array('ID','LoginID','UserTypeID','FirstName', 'LastName','DepartmentD','DesignationID','MemberID','EmployeeID', 'Phone','Location'));
        // $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('LoginID	', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('UserTypeID	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('FirstName	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LastName	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DepartmentD	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DesignationID	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('MemberID	', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('EmployeeID', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Phone', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('Location', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');

        }
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        
        $Obj->addLimit($Index, $Limit);
        return $Obj->getMultiple();
    }
}
?>
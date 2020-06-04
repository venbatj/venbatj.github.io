<?php
namespace Rnt\Settings;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * UserRepository
 * 
 * @package Rnt\Settings
 */
class UserRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'User';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('User U'));
        $Obj->addFlds(array('U.ID','U.FirstName', 'U.LastName','U.UserType','U.Department','UD.DesignationID','U.EmployeeID', 'U.Phone', 'U.EmailID'));
        $Obj->addOrderFlds('UT.UserType', 'ASC');
        $Obj->addOrderFlds('U.FirstName', 'ASC');
        $Obj->addOrderFlds('U.LastName', 'ASC');
        $Obj->addOrderFlds('DT.Department', 'ASC');
        $Obj->addOrderFlds('UD.DesignationID', 'ASC');
        $Obj->addOrderFlds('U.EmployeeID', 'ASC');
        $Obj->addOrderFlds('L.LoginID', 'ASC');
        $Obj->addOrderFlds('U.Phone', 'ASC');
        $Obj->addJoinTbl('UserType UT', 'U.UserTypeID', 'UT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Designation D', 'U.DesignationID', 'D.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Department DT', 'U.DepartmentD', 'DT.ID', 'LEFT JOIN');
        $Obj->addFldCond('L. Flag', 'R', '!=');
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
        $Obj->addTbls(array('User U'));
        $Obj->addFlds(array('U.ID','U.LoginID', 'U.OstID','U.FirstName', 'U.LastName','U.UserTypeID','U.DepartmentD','U.EmployeeID','L.EmailID', 'U.Phone'));
        $Obj->addFldCond('U.ID', $ID);
        $Obj->addJoinTbl('UserType UT', 'U.UserTypeID', 'UT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Login L', 'U. LoginID', 'L.ID');
        $Obj->addJoinTbl('UserDesignation UD', 'U.ID', 'UD.LoginID','LEFT JOIN');
        $Obj->addJoinTbl('Designation D', 'UD.DesignationID', 'D.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Department DT', 'U.DepartmentD', 'DT.ID', 'LEFT JOIN');
        $Obj->addFldCond('L.Flag', 'R', '!=');
        $Res = $Obj->getJoinSingle();
        $Designation['DesignationID'] = self::getDesignationByID($ID);
        return array_merge($Res, $Designation);
    }

    public static function getDesignationByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('UserDesignation UD'));
        $Obj->addFlds(array('UD.DesignationID'));
        $Obj->addFldCond('UD.LoginID', $ID);
        $Obj->addJoinTbl('Designation D', 'UD.DesignationID', 'D.ID', 'LEFT JOIN');
        $Obj->addFldCond('UD.Flag', 'R', '!=');
        $Res = $Obj->getJoinMultiple();

        $TempArr = array();
        foreach ($Res as $Item){
            $TempArr[] = $Item['DesignationID'];
        }
        return $TempArr;
    }

    /**
     * Remove Login 
     * @param int $IDArray
     * @return array
     */
    public static function removeLogin($IDArray)
    {
        foreach ($IDArray as $ID){
            $LoginID = self::getLoginID($ID);
            self::update(array('ID' => $LoginID['LoginID'], 'Flag' => 'R'));
            }
            return true; 
    }

    /**
     * Is exists
     * @param array $Row
     * @return int
     */
    public static function getLoginID($ID)
    { 
        $Obj = new SqlManager();
        $Obj->addTbls(array('User'));
        $Obj->addFlds(array('LoginID'));  
        $Obj->addFldCond('ID', $ID);
        return $Obj->getSingle();
    }

    /**
     * Update User
     * @param array $Row
     * @return void
     */
    public static function updateUser($Row)
    {
        if (!isset($Row['ID'])) {
            return false;
        }
        $Obj = new SqlManager();
        $Obj->addTbls(self::getTable());
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond('ID', $Row['ID']);
        return $Obj->update();
    }

    /**
     * Designation Insert
     * @param array $Row
     * @return int
     */
    public static function designationInsert($Row)
    {
        foreach ($Row['DesignationID'] as $Value) {
            $Obj = new SqlManager();
            $Obj->addTbls('UserDesignation');
            $Obj->addFlds(array('ID'));
            $Obj->addFldCond('LoginID', $Row['ID']);
            $Obj->addFldCond('DesignationID', $Value);
            $Res = $Obj->getSingle();
            if (!count($Res)){
                $Obj->addTbls('UserDesignation');
                $Obj->addInsrtFlds(array('LoginID' => $Row['ID'],'DesignationID' => $Value));
                $Obj->insertSingle();
                $Designation['DesignationID'] = self::UserDesignationUpdate($Row);
            }
        }
    }

    /**
     * Is exists User Designation Update
     * @param array $Row
     * @return int
     */
    public static function UserDesignationUpdate($Row)
    {
        if (isset($Row['DesignationID'])) {
            $ChildObj = new SqlManager();
            $ChildObj->AddTbls('UserDesignation');
            $ChildObj->AddFlds(array('ID', 'DesignationID', 'Flag'));
            $ChildObj->AddFldCond('LoginID', $Row['ID']);
            $Result = $ChildObj->GetMultiple();
            $ResultAll = array();
            foreach ($Result as $DesRes) {
                $ResultAll[] = $DesRes['DesignationID'];
            }
            foreach ($Row['DesignationID'] as $Item) {
                if (count($Result)) {
                    foreach ($Result as $Res) {
                    if (in_array($Res['DesignationID'], $Row['DesignationID'])) {
                        if ($Res['Flag'] == 'R') {
                            $ChildObj2 = new SqlManager();
                            $ChildObj2->AddTbls('UserDesignation');
                            $ChildObj2->AddInsrtFlds(array('Flag' => 'A'));
                            $ChildObj2->AddFldCond('DesignationID', $Res['DesignationID']);
                            $ChildObj2->Update();
                        }
                    } else if (!in_array($Res['DesignationID'], $Row['DesignationID'])) {
                    if ($Res['Flag'] != 'R') {
                        $ChildObj3 = new SqlManager();
                        $ChildObj3->AddTbls('UserDesignation');
                        $ChildObj3->AddInsrtFlds(array('Flag' => 'R'));
                        $ChildObj3->AddFldCond('DesignationID', $Res['DesignationID']);
                        $ChildObj3->Update();
                    }
                } 
            }
            if (!in_array($Item, $ResultAll)) {
                $ChildObj->AddInsrtFlds(array(
                    'DesignationID' => $Item, 
                    'LoginID' => $Row['ID'])
                );
                $ChildObj->InsertSingle();
                }
            } else {
                $ChildObj->AddInsrtFlds(array(
                    'DesignationID' => $Item,  
                    'LoginID' => $Row['ID'])
                );
                $ChildObj->InsertSingle();
                }   
            }
        } else {
            $ChildObj2 = new SqlManager();
            $ChildObj2->AddTbls('UserDesignation');
            $ChildObj2->AddInsrtFlds(array('Flag' => 'R'));
            $ChildObj2->AddFldCond('LoginID', $Row['ID']);
            $ChildObj2->Update();
        }
    }

    /**
     * Update
     * @param array $Row
     * @return void
     */
    public static function update($Row)
    {

        $Obj = new SqlManager();
        $Obj->addTbls(array('Login'));
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond('ID', $Row['ID']);
        return $Obj->update();
    }

    /**
     * User Update 
     * @param array $Row
     * @return void
     */
    public static function userupdate($Row)
    {
        if (!isset($Row['ID'])) {
            return false;
        }

        $ID = $Row['ID'];
            unset($Row['ID']);
        $LoginID = $Row['LoginID'];
            unset($Row['LoginID']);

        $Obj = new SqlManager();
        $Obj->addTbls(array('Login'));
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond('ID', $LoginID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->update();

        $cObj = new SqlManager();
        $cObj->addTbls(array('User'));
        $cObj->addInsrtFlds($Row);
        $cObj->addFldCond('LoginID', $LoginID);
            return $cObj->update();
    }

    /**
     * Is exists EmailID
     * @param array $Row
     * @return int
     */
    public static function isExistsEmailID($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Login'));
        $Obj->addFlds(array('ID'));  
        
        if (isset($Row['LoginID']) && $Row['LoginID'] > 0)
            $Obj->addFldCond('ID', $Row['LoginID'], '!=' );
        
        $Obj->addFldCond('EmailID', $Row['EmailID']);
        return count($Obj->getSingle());
    }

    // /**
    //  * Is exists
    //  * @param array $Row
    //  * @return int
    //  */
    // public static function isExists($Row)
    // {
    //     $Obj = new SqlManager();
    //     $Obj->addTbls(array('User'));
    //     $Obj->addFlds(array('ID'));       
        
    //     if (isset($Row['ID']) && $Row['ID'] > 0)
    //         $Obj->addFldCond('ID', $Row['ID'], '!=');
    //         $Obj->addFldCond('EmployeeID', $Row['EmployeeID']);     
    //     return count($Obj->getSingle());
    // }

    /**
     * Get data table count
     * @param string $SearchTxt
     * @return int
     */
    public static function getDataTblListCount($SearchTxt) 
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('User U'));
        $Obj->addFlds(array('COUNT(#U.ID#) RowCount'));
        $Obj->addJoinTbl('UserType UT', 'U.UserTypeID', 'UT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('UserDesignation UD', 'U.ID', 'UD.LoginID','LEFT JOIN');
        $Obj->addJoinTbl('Designation D', 'UD.DesignationID', 'D.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Department DT', 'U.DepartmentD', 'DT.ID', 'LEFT JOIN');

        if ($SearchTxt != '') {
            $Obj->addFldCond('U.FirstName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('U.LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('UT.UserType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DT.Department', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('D.Designation', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('U.EmployeeID', "%{$SearchTxt}%", 'LIKE', 'OR' );
            $Obj->addFldCond('U.Phone', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
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
    public static function getDataTblList($Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('User U'));
        $Obj->addFlds(array('U.ID', 'UT.UserType','U.FirstName', 'U.LastName','DT.Department','U.EmployeeID','L.EmailID', 'L.ID LoginID','U.Phone'));
        $Obj->addJoinTbl('UserType UT', 'U.UserTypeID', 'UT.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Login L', 'U. LoginID', 'L.ID','LEFT JOIN');
        $Obj->addJoinTbl('Department DT', 'U.DepartmentD', 'DT.ID', 'LEFT JOIN');
        $Obj->addFldCond('L. Flag', 'R', '!=');

        if ($SearchTxt != '') {
            $Obj->addFldCond('UT.UserType', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('U.FirstName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('U.LastName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('DT.Department', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('U.EmployeeID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('L.EmailID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('U.Phone', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }

        if ($OrderFld != '')
        $Obj->addOrderFlds($OrderFld, $OrderType);
            
        $Obj->addLimit($Index, $Limit);
        $ResData = $Obj->getJoinMultiple();
        
        for ($i=0; $i<count($ResData); $i++) {
            $TempArr = array();
            $childObj = new SqlManager();
            $childObj->addTbls('UserDesignation UD');
            $childObj->addFlds(array('UD.LoginID','D.Designation'));
            $childObj->addJoinTbl('Designation D', 'UD.DesignationID', 'D.ID', 'LEFT JOIN');
            $childObj->addFldCond('UD.LoginID',$ResData[$i]['ID']);
            $childObj->addFldCond('UD.Flag', 'R', '!=');
            $Res = $childObj->getJoinMultiple();
            
            if ($Res){
                foreach ($Res as $Item){
                    $TempArr[] = $Item['Designation'];
                }
            }
            else
                $TempArr[] = '';
            $ResData[$i]['Designation'] = implode(" , ", $TempArr);
        }
        return $ResData;
    }
}
?>
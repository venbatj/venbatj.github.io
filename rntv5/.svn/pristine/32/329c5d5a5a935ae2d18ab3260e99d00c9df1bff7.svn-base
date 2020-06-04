<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\InternalUserManagementRepository as ECR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * InternalUserManagement
 * 
 * @package Rnt\Controller\Settings
 */
class InternalUserManagement
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(ECR::getAllData(), true);
    }

    /**
     * Insert / Update InternalUserManagement
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (ECR::isExists($Req))
            return Utils::errorResponse('InternalUserManagement "'.$Req['LoginID'].'" already exists!');
            
        if (ECR::isExists($Req))
        return Utils::errorResponse('InternalUserManagement "'.$Req['USerTypeID'].'" already exists!');
        
        if (ECR::isExists($Req))
            return Utils::errorResponse('InternalUserManagement "'.$Req['FirstName'].'" already exists!');
            
        if (ECR::isExists($Req))
        return Utils::errorResponse('InternalUserManagement "'.$Req['LastName'].'" already exists!');
        
        if (ECR::isExists($Req))
            return Utils::errorResponse('InternalUserManagement "'.$Req['DepartmentD'].'" already exists!');
            
        if (ECR::isExists($Req))
        return Utils::errorResponse('InternalUserManagement "'.$Req['DesignationID'].'" already exists!');
        
        if (ECR::isExists($Req))
        return Utils::errorResponse('InternalUserManagement "'.$Req['MemberID'].'" already exists!');

        if (ECR::isExists($Req))
        return Utils::errorResponse('InternalUserManagement "'.$Req['EmployeeID'].'" already exists!');

        if (ECR::isExists($Req))
            return Utils::errorResponse('InternalUserManagement "'.$Req['Phone'].'" already exists!');

       if (ECR::isExists($Req))
            return Utils::errorResponse('InternalUserManagement "'.$Req['Location'].'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(ECR::update($Req), true);
        else
            return Utils::response(ECR::insert($Req), true);
    }

    /**
     * Remove InternalUserManagement
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(ECR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('','LoginID','UserTypeID','FirstName', 'LastName','DepartmentD','DesignationID','MemberID','EmployeeID', 'Phone','Location');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = ECR::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData  = ECR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * Get data by ID
     * @param $Req
     * @return array
     */
    public static function getDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID parameter missing');
        
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        return Utils::response(ECR::getDataByID($Req['ID']), true);
    }
}
?>
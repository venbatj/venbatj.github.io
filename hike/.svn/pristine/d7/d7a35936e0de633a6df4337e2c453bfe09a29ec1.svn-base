<?php
namespace Rnt\Controller\Settings;

use Rnt\Settings\EmailConfigurationRepository as ECR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * EmailConfiguration
 * 
 * @package Rnt\Controller\Settings
 */
class EmailConfiguration
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
     * Insert / Update EmailConfiguration
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        if (ECR::isExists($Req))
            return Utils::errorResponse('EmailConfiguration "'.$Req['Host'].'" already exists!');
            
        if (ECR::isExists($Req))
        return Utils::errorResponse('EmailConfiguration "'.$Req['Port'].'" already exists!');

        if (ECR::isExists($Req))
        return Utils::errorResponse('EmailConfiguration "'.$Req['SMTPSecure'].'" already exists!');

        if (ECR::isExists($Req))
            return Utils::errorResponse('EmailConfiguration "'.$Req['SenderName'].'" already exists!');

       if (ECR::isExists($Req))
            return Utils::errorResponse('EmailConfiguration "'.$Req['UserName'].'" already exists!');

        if (ECR::isExists($Req))
            return Utils::errorResponse('EmailConfiguration "'($Req['Password']).'" already exists!');

        if (isset($Req['ID']) && $Req['ID'] > 0)
            return Utils::response(ECR::update($Req), true);
        else
            return Utils::response(ECR::insert($Req), true);
    }

    /**
     * Remove EmailConfiguration
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
        $Columns = array('', 'Host','Port', 'SMTPSecure','SenderName','UserName','Password');
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
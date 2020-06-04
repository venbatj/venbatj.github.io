<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\ImportCustomer as IC;
use Rnt\Customer\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Import
 * 
 * @package Rnt\Controller\Customer
 */
class Import
{
    /**
     * Import customer
     * @param array $Req
     * @return array
     */
    public static function import($Req, $GD, $File)
    {
        Utils::includeXLSReader();
        $FileRes = FH::importCustomer($GD['LoginID'], $File);

        if (is_array($FileRes) && count($FileRes)) {
            $Res = IC::import(array(
                'ImportBy' => $GD['LoginID'], 
                'FileName' => $FileRes['FilePath'], 
                'ActualFileName' => $FileRes['ActualFileName'],
                'FullPath' => $FileRes['FullPath'])
            );
        } else
            $Res = false;
        if (!$Res)
            return Utils::errorResponse('Import failed');
        return Utils::response($Res);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('ImportAt', 'ActualFileName');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = IC::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData = IC::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        $ResData = IC::srcDom($ResData);
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

        $Res = IC::getDataByID($Req['ID']);
        // if (isset($Res['ImportAt']) && $Res['ImportAt'] != '0000-00-00')
        //     $Res['ImportAt'] = date("m/d/y h:i:s a", strtotime($Res['ImportAt'])); 
        $Response = json_decode($Res['ImportStatus']); 
        return Utils::response($Response, true);
    }
}
?>
<?php
namespace Rnt\Controller\Laundry;

use Rnt\Laundry\ImportLaundry as IL;
use Rnt\Laundry\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Import
 * 
 * @package Rnt\Controller\Laundry
 */
class Import
{
    /**
     * Import Laundry
     * @param array $Req
     * @return array
     */
    public static function import($Req, $GD, $File)
    {
        Utils::includeXLSReader();
        $FileRes = FH::importLaundry($GD['LoginID'], $File);

        if (is_array($FileRes) && count($FileRes)) {
            $Res = IL::import(array(
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
        $RowCount = IL::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData = IL::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        $ResData = IL::srcDom($ResData);
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
            $Res = IL::getDataByID($Req['ID']);
            // if(isset($Res['ImportAt']) && $Res['ImportAt'] != '0000-00-00')
            // $Res['ImportAt'] = date("d/m/y h:i:s a", strtotime($Res['ImportAt'])); 
        $Response = json_decode($Res['ImportStatus']);
        return Utils::response($Response, true);
    }
}
?>
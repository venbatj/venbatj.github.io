<?php
 
 namespace Rnt\Controller\Delivery;
 use Rnt\Delivery\DeliveryRepository as DR;
 use Rnt\Libs\DataTable as DT;
 use Rnt\Libs\Utils;

 Class Delivery{
   
    /**
     * Insert / Update Shipping info
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req)
    {
        print_r($Req);
        exit;
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $CustomerID = $Req['ID'];
            $Req['CustomerID']=$Req['CustomerName'];
            $Req['CustomerLocationID']=$Req['CustomerLocation'];
            $Req['LaundryAssigned']=$Req['LaundryID'];
            DR::update($Req);
        } else {
            $Req['CustomerID']=$Req['CustomerName'];
            $Req['CustomerLocationID']=$Req['CustomerLocation'];
            $Req['LaundryAssigned']=$Req['LaundryID'];
            $CustomerID = DR::insert($Req);
        }
        return Utils::response($CustomerID, true);

    }
    /**
     * Insert / Update Shipping info
     * @param array $Req
     * @return array
     */
    public static function insertUpdatedata($Req)
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            // print_r('update');
            // $CustomerID = $Req['ID'];
            DR::updatedata($Req);
        } else {
            $CustomerID = DR::insertdata($Req);
        }
        return Utils::response($CustomerID, true);

    }
    /**
     * Remove category
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(DR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'CustomerName', 'CustomerLocation', 'LaundryAssigned', 'SchedulePickupTime','ScheduleDeliveryTime','ValidUntil');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = DR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = DR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }
    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPages($Req)
    {   
        $Columns = array('','WarehouseName', 'CustomerName', 'CustomerLocation', 'LaundryID', 'LaundryLocationID','DeliveryDateTime');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = DR::getDatasTblListCount($Attributes['DataTableSearch']);
		$ResData  = DR::getDatasTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

            if (isset($Res['SchedulePickupTime']) && $Res['SchedulePickupTime'] != '0000-00-00 00-00-00')
                $Res['SchedulePickupTime'] = date("j M Y", strtotime($Res['SchedulePickupTime']));  
            if (isset($Res['ScheduleDeliveryTime']) && $Res['ScheduleDeliveryTime'] != '0000-00-00 00-00-00')
                $Res['ScheduleDeliveryTime'] = date("j M Y", strtotime($Res['ScheduleDeliveryTime'])); 
                if (isset($Res['Scheduleddeliverytime']) && $Res['Scheduleddeliverytime'] != '0000-00-00 00-00-00')
                    $Res['Scheduleddeliverytime'] = date("j M Y", strtotime($Res['Scheduleddeliverytime']));   
            if (isset($Res['ValidUntil']) && $Res['ValidUntil'] != '0000-00-00 00-00-00')
                $Res['ValidUntil'] = date("j M Y", strtotime($Res['ValidUntil']));  

        return Utils::response(DR::getDataByID($Req['ID']), true);
    }
    public static function getDataByIDs($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID parameter missing');
        
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        if (isset($Res['DeliveryDateTime']) && $Res['DeliveryDateTime'] != '0000-00-00 00-00-00')
            $Res['DeliveryDateTime'] = date("j M Y", strtotime($Res['DeliveryDateTime']));  

        return Utils::response(DR::getDataByIDs($Req['ID']), true);
    }



 }


?>
<?php

namespace Rnt\Delivery;

use Rnt\Libs\Sqlmanager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

class DeliveryRepository implements IRepository{
    use AERRepository;

    public static function getTable(){
        return 'Delivery';
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Delivery');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();

    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByIDs($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Delivery');
        $Obj->addFlds(array('ID','Type','LaundryDeliveryIncharge','RNTDeliveryIncharge','SendRequestTo','LaundryLocationID','LaundryID',
        'DeliverTo','WarehouseID','CustomerLocationID','CustomerID','DeliveryDateTime'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();

    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function updatedata($Req)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Delivery');
        $Obj->addInsrtFlds(array(
            'Deliver'=> $Req['Deliver'],'CustomerName'=>$Req['CustomerName'],'LocationName'=>$Req['LocationName'],
            'Scheduleddeliverytime'=>$Req['Scheduleddeliverytime'],'SendRequest'=>$Req['SendRequest'],'LaundryIncharge'=>$Req['LaundryIncharge'],
            'LaundryID'=>$Req['LaundryID'],'LaundryLocationID'=>$Req['LaundryLocationID'],'DeliveryIncharge'=>$Req['DeliveryIncharge']
        ));
        $Obj->addFldCond('ID', $Req['ID']);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->Update();

    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function insertdata($Req)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Delivery');
        $Obj->addInsrtFlds(array(
            'WarehouseID'=> $Req['WarehouseName'],'Type'=> $Req['Type'],'DeliverTo'=> $Req['Deliver'],'CustomerID'=>$Req['CustomerName'],
            'CustomerLocationID'=>$Req['LocationName'],'DeliveryDateTime'=>$Req['Scheduleddeliverytime'],'SendRequestTo'=>$Req['SendRequest'],
            'LaundryIncharge'=>$Req['LaundryIncharge'],'LaundryID'=>$Req['LaundryID'],
            'LaundryLocationID'=>$Req['LaundryLocationID'],'RNTDeliveryIncharge'=>$Req['DeliveryIncharge'],
            'LaundryDeliveryIncharge'=>$Req['LaundryIncharge']
        ));
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->insertSingle();

    }

	public static function getDataTblListCount($SearchTxt) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('Delivery D');
        $Obj->addFlds(array('COUNT(#D.ID#) RowCount'));
        $Obj->addFldCond('D.WarehouseID', '0');
        $Obj->addFldCond('D.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CustomerLocationID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LaundryID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('SchedulePickupTime', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        $Obj->addJoinTbl('CustomerDetails CD', 'D.CustomerID', 'CD.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'D.CustomerLocationID', 'CL.ID', 'LEFT JOIN');
        // $Obj->addJoinTbl('LaundryDetails L', 'D.LaundryID', 'L.ID', 'LEFT JOIN');

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
		$Obj->addTbls('Delivery D');
        $Obj->addFlds(array('D.ID','CD.CustomerName','CL.LocationName CustomerLocation','D.LaundryAssigned','D.SchedulePickupTime'
        ,'D.ScheduleDeliveryTime','D.ValidUntil'));
        $Obj->addFldCond('D.WarehouseID', '0');
        // $Obj->addFldCond('D.CustomerLocationID', '0', '!=');
        $Obj->addFldCond('D.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CustomerLocationID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LaundryID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('SchedulePickupTime', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
            
        $Obj->addJoinTbl('CustomerDetails CD', 'D.CustomerID', 'CD.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'D.CustomerLocationID', 'CL.ID', 'LEFT JOIN');
        // $Obj->addJoinTbl('LaundryDetails L', 'D.LaundryID', 'L.ID', 'LEFT JOIN');
        // $Obj->addJoinTbl('Warehouse W', 'D.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj->addLimit($Index, $Limit);
        
		$Res = $Obj->getJoinMultiple();
        $Temparr = array();

        foreach($Res as $Value) {
            if ($Value['SchedulePickupTime'] !=0) {
                $Value['SchedulePickupTime'] = date("j M Y", strtotime($Value['SchedulePickupTime']));
                if ($Value['ScheduleDeliveryTime'] !=0) {
                    $Value['ScheduleDeliveryTime'] = date("j M Y", strtotime($Value['ScheduleDeliveryTime']));
                    if ($Value['ValidUntil'] !=0) {
                        $Value['ValidUntil'] = date("j M Y", strtotime($Value['ValidUntil']));
                        $Temparr[] = $Value;
                    } else {
                        $Temparr[] = $Value;
                    }
                }
            }
        }
        return $Temparr;
        return $Res;
	}

	public static function getDatasTblListCount($SearchTxt) 
	{
        $Obj = new SqlManager();
        $Obj->addTbls('Delivery D');
        $Obj->addFlds(array('COUNT(#D.ID#) RowCount'));
        $Obj->addFldCond('D.Flag', 'R', '!=');
        $Obj->addFldCond('D.WarehouseID', '0', '!=');
        // $Obj->addFldCond('D.CustomerLocationID', '0', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LaundryName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('SchedulePickupTime', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        $Obj->addJoinTbl('CustomerDetails CD', 'D.CustomerID', 'CD.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'D.CustomerLocationID', 'CL.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LaundryDetails L', 'D.LaundryID', 'L.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LaundryLocationInfo LLI', 'D.LaundryLocationID', 'LLI.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'D.WarehouseID', 'W.ID', 'LEFT JOIN');
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
	public static function getDatasTblList($Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '')
    {
		$Obj = new SqlManager();
		$Obj->addTbls('Delivery D');
        $Obj->addFlds(array('D.ID','W.WarehouseName','CD.CustomerName','CL.LocationName CustomerLocation','D.LaundryID','D.LaundryLocationID','D.DeliveryDateTime'));
        $Obj->addFldCond('D.WarehouseID', '0','!=');
        // $Obj->addFldCond('D.CustomerLocationID', '0', '!=');
        $Obj->addFldCond('D.Flag', 'R', '!=');
        
		if ($SearchTxt != '') {
            $Obj->addFldCond('CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('LocationName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('LaundryName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('SchedulePickupTime', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        
		if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
            
        $Obj->addJoinTbl('CustomerDetails CD', 'D.CustomerID', 'CD.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerLocationInfo CL', 'D.CustomerLocationID', 'CL.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LaundryDetails L', 'D.LaundryID', 'L.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('LaundryLocationInfo LLI', 'D.LaundryLocationID', 'LLI.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('Warehouse W', 'D.WarehouseID', 'W.ID', 'LEFT JOIN');
        $Obj->addLimit($Index, $Limit);
        
		$Res = $Obj->getJoinMultiple();
        // $Temparr = array();

        // foreach($Res as $Value) {
        //     if ($Value['SchedulePickupTime'] !=0) {
        //         $Value['SchedulePickupTime'] = date("j M Y", strtotime($Value['SchedulePickupTime']));
        //          $Temparr[] = $Value;
        //             } else {
        //                 $Temparr[] = $Value;
        //             }
        //         }
        // return $Temparr;
        return $Res;
	}

}

?>
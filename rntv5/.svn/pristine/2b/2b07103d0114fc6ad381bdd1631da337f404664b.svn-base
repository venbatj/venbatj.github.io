<?php
namespace Rnt\Controller\Manage;

use Rnt\Manage\ProspectRepository as PR;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * Prospect
 * 
 * @package Rnt\Controller\Manage
 */
class Prospect
{

    /**
     * Get all data
     * @return array
     */
    public static function getProspect()
    {
        return Utils::response(PR::getProspect(), true);
    }
    /**
     * Convert Customer
	 * @param array $Req
     * @return void
     */
    public static function CoverttoCustomer($Req) 
    {
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $CustomerID = PR::CoverttoCustomer($Req['ID']);
            $Cust = $CustomerID;
            $Today = date("d-m-y");
            $QuoteID = $Cust."-".$Req['ID']."-".$Today;
            $Res = Utils::response(PR::updateQuoteID($Req['ID'], $QuoteID));

        }
        return Utils::response($CustomerID, true);
    }
    /**
    * Get data by page
    * @param $Req
    * @return array
    */
   public static function getDataByPage($Req)
   {   
         $Columns = array('CustomerName', 'HOCityID', 'Modified','','','FileName');
        $Attributes = DT::getAttributes($Req, $Columns);
    //    $RowCount = PR::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData  = PR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        $TempRowCount  = PR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy'],true);
        $ResData = PR::srcDom($ResData);
        $RowCount = count($TempRowCount);
       $Data = array();
       foreach($ResData as $value){
            $BOM = '<b>Item : </b>'.$value['ProductID'].' - '.$value['VariantID'].'<br>'.'<b>Quantity : </b>'.$value['Qty'].'<br>'.'<b>Price : </b>'.$value['PriceToCustomer']
            .'<br>'.'<b><a onclick="angular.element(this).scope().ShowBOM('.$value['QuoteID'].')"><u>View all </u></a><b>';
            $Action ='<label><b>Convert to Customer </b> <input type="radio" onclick="angular.element(this).scope().ConvertCustomer('.$value['QuoteID'].')"></label>'.'<br>'
            .'<b>Edit </b><i class="edit-icon fa fa-edit font-green-jungle" onclick="angular.element(this).scope().editProspect('.$value['QuoteID'].')"></i>';

            $Data[] = array('CustomerName'=>$value['CustomerName'],'HOCityID'=>$value['HOCityID'],'Modified'=>$value['Modified'],'BOM'=>$BOM,'Action'=>$Action,'FileName'=>$value['FileName']);
       }
       return Utils::dataTableResponse($Req['sEcho'], $RowCount, $Data);
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

      $Res = PR::getDataByID($Req['ID']);
      return Utils::response($Res, true);
  }
}
?>
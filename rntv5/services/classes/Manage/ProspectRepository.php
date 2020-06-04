<?php
namespace Rnt\Manage;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ProspectRepository
 * 
 * @package Rnt\Manage
 */
class ProspectRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'QuoteGeneration';
    }
    
    /**
     * Get all data
     * @return array
     */
    public static function getProspect()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteGeneration');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('CustomerName', '','!=');
        $Obj->addFldCond('QuoteStatus', 'N');
        $Obj->addGroupFlds('CustomerName');
        $Res = $Obj->getMultiple();
        // echo "<pre>";
        // print_r($Res);
        // exit;
        return $Res;
    }
    /**
     * Convert Customer
	 * @param array $Req
     * @param array $ID
     * @return array
     */
    public static function CoverttoCustomer($Req)
    {
		$Obj = new SqlManager();
		$Obj->addTbls('QuoteGeneration');
		$Obj->addFlds('*');
		$Obj->addFldCond('ID', $Req);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->update();
		$Res = $Obj->getSingle();

		$Parms = array(
            'CustomerTypeID' => $Res['CustomerTypeID'],
            'CustomerName' => $Res['CustomerName'],
            'CityID' => $Res['HOCityID'],
            'CountryID' => $Res['HOCountryID'],
            'LandlineNumber' => $Res['HOPhone'],
            'Zip' => $Res['POBox'],
            'Currency' => $Res['Currency']
		);
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails');
        $Obj->addInsrtFlds($Parms);
		$ID = $Obj->insertSingle();
		return $ID;
    }

    public static function updateQuoteID($ID, $QuoteID)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('QuoteGeneration');
        $Obj->AddInsrtFlds(array(
            'QuoteID' => $QuoteID,
            'QuoteStatus' => 'A'
        ));
        $Obj->AddFldCond('ID', $ID);
        $Obj->Update(); 
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
		$Obj = new SqlManager();
		$Obj->addTbls('QuoteGeneration');
		$Obj->addFlds('*');
		$Obj->addFldCond('ID', $ID);
		$Obj->addFldCond('Flag', 'R', '!=');
		$Res = $Obj->getSingle();
		$Res['QuoteItems'] = self::getDataByQuoteID($ID);
		return $Res;
    }
    /**
     * Get data by Quote ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByQuoteID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteData');
        $Obj->addFlds('*');
		$Obj->addFldCond('QuoteID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res =  $Obj->getMultiple();

        $TempArr = array();
        foreach($Res as $Item) {
            if ($Item['ProductID'] != 0) {
                $Item['ProductName'] = self::getProductByID($Item['ProductID']);
                if ($Item['VariantID'] != 0)
                    $Item['VariantName'] = self::getVariantByID($Item['VariantID']);
                $TempArr[] = $Item;
            } else {
                $TempArr[] = $Item;
            }
        }
       
        return $TempArr;
    }

    /**
     * Get Product by ID
	 * @param int $ID
     * @return array
     */
    public static function getProductByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ProductName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['ProductName'];
    }

    /**
     * Get Variant by ID
	 * @param int $ID
     * @return array
     */
    public static function getVariantByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Variant');
        $Obj->addFlds(array('VariantName'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        return $Res['VariantName'];
    }
    
    /**
     * src dom for data table
     * @param array $Data
     * @return array
     */
    public static function srcDom($Data)
    {
        foreach ($Data as $Key => $Item) {
            $Data[$Key]['FileName'] = '<a target="_blank" href="'.STORAGE_HOST_PATH.'/'.$Item['FileName'].'">'.$Item['FileName'].'</a>';
        }
        return $Data;
    }
    /**
     * Get data table count
	 * @param string $SearchTxt
     * @return int
     */
	public static function getDataTblListCount($SearchTxt) 
	{
		$Obj = new SqlManager();
		$Obj->addTbls('QuoteGeneration QG');
		$Obj->addFlds(array('COUNT(#QG.ID#) RowCount'));
		$Obj->addFldCond('QG.QuoteStatus', 'N');
		$Obj->addFldCond('QG.CustomerName', '','!=');
		if ($SearchTxt != '') {
			$Obj->addFldCond('QG.CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('QG.HOCityID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QG.Modified', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QG.FileName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        $Obj->addJoinTbl('QuoteData Q', 'QG.ID', 'Q.QuoteID', 'LEFT JOIN');
        $Obj->addJoinTbl('City C', 'C.ID', 'QG.HOCityID', 'LEFT JOIN');
        $Obj->addJoinTbl('Product P', 'P.ID', 'Q.ProductID', 'LEFT JOIN');
        $Obj->addJoinTbl('Variant V', 'V.ID', 'Q.VariantID', 'LEFT JOIN');

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
	public static function getDataTblList($Index, $Limit, $SearchTxt = '', $OrderFld = '', $OrderType = '',$count=false)
	{
		$Obj = new SqlManager();
		$Obj->addTbls('QuoteGeneration QG');
		$Obj->addFlds(array('QG.ID', 'QG.CustomerName', 'C.CityName HOCityID','QG.Modified','QG.FileName','Q.QuoteID','Q.ID','P.ProductName ProductID','V.VariantName VariantID','Q.Qty','Q.PriceToCustomer'));
        $Obj->addJoinTbl('City C', 'C.ID', 'QG.HOCityID', 'LEFT JOIN');
        $Obj->addJoinTbl('QuoteData Q', 'QG.ID', 'Q.QuoteID', 'LEFT JOIN');
        $Obj->addJoinTbl('Product P', 'P.ID', 'Q.ProductID', 'LEFT JOIN');
        $Obj->addJoinTbl('Variant V', 'V.ID', 'Q.VariantID', 'LEFT JOIN');
		$Obj->addFldCond('QG.QuoteStatus', 'N');
		$Obj->addFldCond('QG.CustomerName', '','!=');
		if ($SearchTxt != '') {
			$Obj->addFldCond('QG.CustomerName', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('QG.HOCityID', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QG.Modified', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QG.FileName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
		if ($OrderFld != '')
			$Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('QG.ID', 'DESC');    
            
        // $Obj->addGroupFlds('QG.ID');
        if (!$count)
		    $Obj->addLimit($Index, $Limit);
		$Res = $Obj->getJoinMultiple();
        $TempArr = array();

        foreach($Res as $Value) {
            if ($Value['Modified'] !=0) {
                $Value['Modified'] = date("j M Y", strtotime($Value['Modified']));
                $TempArr[] = $Value;
            } else {
                $TempArr[] = $Value;
            }
        }
        return $TempArr;
	}
}
?>
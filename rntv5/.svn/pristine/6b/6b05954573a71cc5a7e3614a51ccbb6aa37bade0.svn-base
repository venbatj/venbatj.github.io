<?php
namespace Rnt\Manage;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

use PHPExcel;
use PHPExcel_Worksheet_Drawing as ExcelWorksheetDrawing;
use PHPExcel_Writer_Excel2007 as PHPExcelWriter;
use PHPExcel_Style_Fill as ExcelStyleFill;
use PHPExcel_Style_Alignment as ExcelStyleAlignment;
use PHPExcel_Style_Border as ExcelStyleBorder;

/**
 * PriceCalculator
 * 
 * @package Rnt\Manage
 */
class PriceCalculator
{

    /**
     * Get reference field
     * @return string
     */
    public static function getReferenceField()
    {
        return 'ID';
    }

    /**
     * Insert price
	 * @param array $Req
     * @return array
     */
    public static function insertPrice($Req,$res)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('QuoteGeneration');
        $Obj->AddInsrtFlds(array(

            'OstID' => $Req,
            'CustomerTypeID' =>$res['CustomerTypeID'],
            'CustomerName' =>$res['CustomerName'],
            'QuoteTypeID' => $res['QuoteTypeID'],
            'HOCountryID' =>$res['HOCountryID'],
            'HOCityID' => $res['HOCityID'],
            'HOPhone' => $res['HOPhone'],
            'POBox' => $res['POBox'],
            'TotalQtyPurchased'=> $res['TotalQtyPurchased'],
            'TotalPurchaseCost'=> $res['TotalPurchaseCost'],
            'SPName' => $res['SPName'],
            'RoomCount' => $res['RoomCount'],
            'PARLevelExpected' => $res['PARLevelExpected'],
            'OccupancyConsidering' => $res['OccupancyConsidering'],
            'PTMargin' => $res['PTMargin'],
            'QuoteValidity' => $res['QuoteValidity'],
            'Currency' =>$res['Currency'],
            'IsExistingCustomer' => $res['IsExistingCustomer'],
            'HOLocation' => $res['HOLocation'],
            'BCEmail' => $res['BCEmail']

        ));
        return $Obj->InsertSingle();
    }

    /**
     * Convert Customer
	 * @param array $Req
     * @param array $ID
     * @return array
     */
    public static function CovertCustomer($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('CustomerDetails');
        $Obj->AddInsrtFlds(array(
            'CustomerTypeID' => $Req['CustomerTypeID'],
            'CustomerName' => $Req['CustomerName'],
            'CityID' => $Req['HOCityID'],
            'CountryID' => $Req['HOCountryID'],
            'LandlineNumber' => $Req['HOPhone'],
            'Zip' => $Req['POBox'],
            'Currency' => $Req['Currency']
        ));
        return $Obj->InsertSingle();
    }

    public static function updateQuoteID($ID, $QuoteID)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('QuoteGeneration');
        $Obj->AddInsrtFlds(array(
            'QuoteID' => $QuoteID,
            'QuoteStatus' => 'A'
            // 'IsExistingCustomer' => 'Y'
        ));
        $Obj->AddFldCond('ID', $ID);
        $Obj->Update(); 
    }

    /**
     * Is Exist Customer Name
	 * @param array $Row
     * @return array
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds(array('ID')); 
        
        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('CustomerName', $Row['CustomerName']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }

    /**
     * Insert Quote Data
	 * @param array $Row
     * @param array $QuoteID
     * @return array
     */
    public static function insertQuoteData($Req, $QuoteID)
    {
        unset($Req['ID']);
        foreach($Req as $Each) {
            $data = array(
                'QuoteID' => $QuoteID,
                'ProductID' => $Each['ProductID'],
                'VariantID' => $Each['VariantID'],
                'Qty' => $Each['Qty'],
                'CostOfLinen' => $Each['CostOfLinen'],
                'PurchaseCost' => $Each['PurchaseCost'],
                'LinenCostPerUse' => $Each['LinenCostPerUse'],
                'TechCostPerUse' => $Each['TechCostPerUse'],
                'DeliveryCostPerUse' => $Each['DeliveryCostPerUse'],
                'WarehouseCost' => '',
                'LaundryCost' => $Each['LaundryCost'],
                'TotalCost' => $Each['TotalCost'],
                'PriceToCustomer' => $Each['PriceToCustomer'],
                'BillableQty' => $Each['BillableQty'],
                'EstBillingPerDay' => $Each['EstBillingPerDay'],
                'BreakevenDays' => $Each['BreakevenDays'],
            );
            $Obj = new SqlManager();
            $Obj->addTbls('QuoteData');
            $Obj->addInsrtFlds($data);
            $Obj->insertSingle();
        }
    }

    /**
     * Update Price
	 * @param array $Req
     * @param array $ID
     * @return array
     */
    public static function updatePrice($Req)
    {
        $Obj = new SqlManager();
        $Obj->AddTbls('QuoteGeneration');
        $Obj->AddInsrtFlds($Req);
        $Obj->AddFldCond('ID', $Req['ID']);
        return $Obj->Update(); 
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
        // $Obj = new SqlManager();
        // $Obj->addTbls('QuoteGeneration QG');
        // $Obj->addFlds('QG.ID','QG.OstID','QG.CustomerName','QG.CustomerID','QG.IsExistingCustomer','QG.CustomerTypeID','QG.QuoteTypeID','QG.SPName','CT.CountryName HOCountryID'
        // ,'QG.POBox','QG.HOPhone','QG.HOLocation','C.CityName HOCityID','QG.BCName','QG.BCPhone','QG.BCEmail','QG.ACName','QG.ACPhone','QG.ACEmail','QG.FDWeekDays','QG.FDWeekEnds','QG.RoomCount',
        // 'QG.PARLevelExpected','QG.OccupancyConsidering','QG.PTMargin','QG.QuoteValidity','QG.Currency','QG.FileName');
        // $Obj->addFldCond('QG.ID', $ID);
        // $Obj->addFldCond('QG.Flag', 'R', '!=');
        // $Obj->addJoinTbl('City C', 'QG.HOCityID', 'C.ID');
        // $Obj->addJoinTbl('Country CT', 'QG.HOCountryID', 'CT.ID');
        // $Res = $Obj->getJoinSingle();
        // print_r($Res);
        // exit;
        // $Res['QuoteItems'] = self::getDataByQuoteID($ID);
        // return $Res;
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
     * Get Sales Person Name
     * @return array
     */
    public static function getSalesPerson()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('UserDesignation UD');
        $Obj->addFlds(array('UR.ID', 'UR.FirstName'));
        $Obj->addOrderFlds('UR.FirstName', 'ASC');
        $Obj->addJoinTbl('User UR', 'UD.LoginID', 'UR.ID', 'LEFT JOIN');
        $Obj->addFldCond('UD.DesignationID', 10);
        $Obj->addFldCond('UD.Flag', 'R', '!=');
        return $Obj->getJoinMultiple();
    }

    /**
     * Get Customer Name
	 * @param int $ID
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails');
        $Obj->addFlds(array('ID', 'CustomerName'));
        $Obj->addOrderFlds('CustomerName', 'ASC');
        $Obj->addFldCond('CustomerName', '', '!=');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple(); 
    }
    /**
     * Get Customer Name
	 * @param int $ID
     * @return array
     */
    public static function getProspectData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteGeneration');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('CustomerName', '','!=');
        $Obj->addFldCond('QuoteStatus', 'N');
        $Obj->addGroupFlds('CustomerName');
        return $Obj->getMultiple();
    }

    /**
     * Get Customer Name
	 * @param int $ID
     * @return array
     */
    public static function getQuoteData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('QuoteGeneration');
        $Obj->addFlds(array('*'));
        $Obj->addFldCond('CustomerName', '','!=');
        return $Obj->getMultiple();
    }

    /**
     * Get Customer Details
	 * @param int $ID
     * @return array
     */
    public static function getCustomerInfo($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('CustomerDetails CD');
        $Obj->addFlds(array('CD.CustomerTypeID CustomerTypeID', 'CD.CityID CityID', 'CD.CountryID CountryID', 'CD.Zip Zip', 'CD.LandlineNumber LandlineNumber', 'CD.LocationCount LocationCount', 'C.FirstName FirstName', 'C.Phone Phone', 'C.EmailID EmailID', 'BD.FirstName BDFirstName', 'BD.Phone BDPhone', 'BD.EmailID BDEmailID'));
        $Obj->addJoinTbl('Contact C', 'CD.ID', 'C.ContactForRef', 'LEFT JOIN');
        $Obj->addJoinTbl('BillingDetails BD', 'CD.ID', 'BD.SourceRefID', 'LEFT JOIN');
        $Obj->addFldCond('CD.ID', $ID);
        return $Obj->getJoinSingle();
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
        $Obj->addFldCond('QG.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('if(#QG.CustomerID# > "0", CD.CustomerName, QG.CustomerName)', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CT.CustomerType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QG.FileName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QT.QuoteType', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        $Obj->addJoinTbl('CustomerDetails CD', 'QG.CustomerID', 'CD.ID', 'LEFT JOIN');
        $Obj->addJoinTbl('CustomerType CT', 'QG.CustomerTypeID', 'CT.ID');
        $Obj->addJoinTbl('QuoteType QT', 'QG.QuoteTypeID', 'QT.ID');
        
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
		$Obj->addTbls('QuoteGeneration QG');
		$Obj->addFlds(array('QG.ID', 'if(#QG.CustomerID# > "0", CD.CustomerName, QG.CustomerName) CustomerName', 'CT.CustomerType', 'QT.QuoteType', 'QG.FileName'));
		$Obj->addFldCond('QG.Flag', 'R', '!=');
        
        if ($SearchTxt != '') {
            $Obj->addFldCond('if(#QG.CustomerID# > "0", CD.CustomerName, QG.CustomerName)', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('CT.CustomerType', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QG.FileName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('QT.QuoteType', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
		}
        
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'DESC');    
        
        $Obj->addJoinTbl('CustomerDetails CD', 'QG.CustomerID', 'CD.ID','LEFT JOIN');
        $Obj->addJoinTbl('CustomerType CT', 'QG.CustomerTypeID', 'CT.ID');
        $Obj->addJoinTbl('QuoteType QT', 'QG.QuoteTypeID', 'QT.ID');

        $Obj->addLimit($Index, $Limit);
		return $Obj->getJoinMultiple();
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
     * Generate Quote XLSX
     * @param array $IC Initial data captured in front end
     * @param int $SupplierID
     * @param int $CustomerID
     * @param int $RWP Recovery wash period
     * @param array $Options
     * @return string
     */
    public static function generateQuoteXLSX($IC, $SupplierID, $CustomerID, $RWP, $Options)
    {
        $XObj = new PHPExcel();
        $XObj->setActiveSheetIndex(0);
        $XObj->getActiveSheet()->setTitle("Quote");

        $DObj = new ExcelWorksheetDrawing();
        $DObj->setName('RNT LOGO');
        $DObj->setDescription('RNT LOGO');
        $DObj->setPath('img/rentatowel-logo.jpg');
        $DObj->setCoordinates('C2');                      
        
        $DObj->setWorksheet($XObj->getActiveSheet());

        $XObj->getActiveSheet()->SetCellValue('A3', 'Rent A Towel');
        $XObj->getActiveSheet()->getStyle('A3')->applyFromArray(self::getTitleStyle());

        $RNTDetails = self::getRNTDetails();

        $Y = 4;
        foreach ($RNTDetails as $Item) {
            $XObj->getActiveSheet()->SetCellValue('A'.(++$Y), $Item);
        }

        $QuoteDetails = self::getQuoteDetails($IC['QuoteValidity'], $SupplierID, $CustomerID, $Options);

        $Y = 4;
        foreach ($QuoteDetails as $Key => $Item) {
            $XObj->getActiveSheet()->SetCellValue('B'.(++$Y), $Key);
            $XObj->getActiveSheet()->SetCellValue('C'.($Y), $QuoteDetails[$Key]);
        }
        
        $XObj->getActiveSheet()->getStyle('C5:C'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());
        $XObj->getActiveSheet()->getStyle('B5:B'.$Y)->applyFromArray(self::getQuoteDetailLabelStyle());

        /* Customer details starts */
        $XObj->getActiveSheet()->SetCellValue('A11', 'Customer');
        $XObj->getActiveSheet()->getStyle('A11')->applyFromArray(self::getTableHeaderStyle());

        if (isset($IC['BCName']) && $IC['BCName'] != '')
        $XObj->getActiveSheet()->SetCellValue('A12', $IC['BCName']);
        if (isset($IC['CustomerName']) && $IC['CustomerName'] != '')
        $XObj->getActiveSheet()->SetCellValue('A13', $IC['CustomerName']);
        $XObj->getActiveSheet()->SetCellValue('A14', $IC['HOLocation']);
        if (isset($IC['HOCity']) && $IC['HOCity'] != '')
        $XObj->getActiveSheet()->SetCellValue('A15', $IC['HOCity']);
        $XObj->getActiveSheet()->SetCellValue('A16', $IC['HOPhone']);
        /* Customer details ends */

        /* Varient item list starts */
        $XObj->getActiveSheet()->SetCellValue('A18', 'ITEM DESCRIPTION');
        $XObj->getActiveSheet()->SetCellValue('B18', 'Quantity');
        $XObj->getActiveSheet()->SetCellValue('C18', 'Unit Rate / Use (In AED)');
        $XObj->getActiveSheet()->getStyle('A18:C18')->applyFromArray(self::getTableHeaderStyle());

        $Y = 19;
        foreach ($IC['QuoteItems'] as $Item) {
            $XObj->getActiveSheet()->SetCellValue('A'.$Y, $Item['ProductName'].' - '.$Item['VariantName']);
            $XObj->getActiveSheet()->SetCellValue('B'.$Y, 1);
            $XObj->getActiveSheet()->SetCellValue('C'.$Y, round($Item['PriceToCustomer'], 2));
            //$XObj->getActiveSheet()->SetCellValue('C'.$Y, self::calculateUnitRate($Item['PurchaseCost'], $RWP, $IC['OccupancyConsidering'], $Item['LaundryCost'], $IC['PTMargin']));

            if (($Y % 2) != 0)
                $XObj->getActiveSheet()->getStyle('A'.$Y.':C'.$Y)->applyFromArray(self::getAlternateRowStyle());
            $Y++;
        }

        $XObj->getActiveSheet()->getStyle('A19:A'.($Y - 1))->applyFromArray(self::getBorderStyle());
        $XObj->getActiveSheet()->getStyle('B19:B'.($Y - 1))->applyFromArray(self::getBorderStyle());
        $XObj->getActiveSheet()->getStyle('C19:C'.($Y - 1))->applyFromArray(self::getBorderStyle());

        $XObj->getActiveSheet()->getStyle('B19:B'.($Y - 1))->applyFromArray(self::getColumnCenterAlignmentStyle());
        /* Varient item list ends */

        $XObj->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
        $XObj->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
        $XObj->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);

        $XObj->getActiveSheet()->SetCellValue('A'.++$Y, 'TERMS AND CONDITIONS');
        $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getTableHeaderStyle());
        
        $Y = $Y + 6;
        $XObj->getActiveSheet()->SetCellValue('A'.++$Y, 'If you have any questions about this price quote, please contact');
        $XObj->getActiveSheet()->mergeCells('A'.$Y.':C'.$Y);
        $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());

        $XObj->getActiveSheet()->SetCellValue('A'.++$Y, '[Name, Phone #, E-mail]');
        $XObj->getActiveSheet()->mergeCells('A'.$Y.':C'.$Y);
        $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());

        $Y = $Y + 1;
        $XObj->getActiveSheet()->SetCellValue('A'.++$Y, 'Thank You For Your Business!');
        $XObj->getActiveSheet()->mergeCells('A'.$Y.':C'.$Y);
        $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getColumnCenterAlignmentStyle());
        $XObj->getActiveSheet()->getStyle('A'.$Y)->applyFromArray(self::getThankYouTextStyle());

        $FilePath = $Options['VERSION_PATH'].'quote/1-1-'.date('Ymd').'-'.date('His').'.xlsx';
        $StoragePath = $Options['DATA_STORAGE_BASE_PATH'].$FilePath;

        // echo $StoragePath;
        // exit;

        $XLSX = new PHPExcelWriter($XObj);
        $XLSX->save($StoragePath);
        
        return array(
            'FilePath' => $FilePath,
            'DownloadUrl' => self::generateDownloadPath($StoragePath, $Options['DOWNLOAD_PATH'])
        );
    }

    /**
     * Generate download path
     * @param string $StoragePath
     * @param string $DownloadPath
     * @return string
     */
    private static function generateDownloadPath($StoragePath, $DownloadPath)
    {
        return $DownloadPath.'?key='.urlencode(base64_encode(realpath($StoragePath)));
    }

    /**
     * Calculate RNT purchase cost
     * @param float $CostOfLinen
     * @param int $RWP
     * @param float $OccupancyRate
     * @return float
     */
    private static function calculatePurchaseCost($CostOfLinen, $RWP, $OccupancyRate)
    {
        return floatval(floatval($CostOfLinen) / (intval($RWP) * floatval($OccupancyRate/100)));
    }

    /**
     * Calculate RNT purchase cost
     * @param float $PurchaseCost
     * @param float $LaundryCost Laundry Cost (Wash Cost / Linen)
     * @return float
     */
    private static function calculateTotalCost($PurchaseCost, $LaundryCost)
    {
        return $PurchaseCost + floatval($LaundryCost);
    }

    /**
     * Price offered to customer (Unit Rate / Use (In AED))
     * @param float $CostOfLinen
     * @param int $RWP
     * @param float $OccupancyRate
     * @param float $LaundryCost Laundry Cost (Wash Cost / Linen)
     * @param float $Margin
     * @return float
     */
    private static function calculateUnitRate($CostOfLinen, $RWP, $OccupancyRate, $LaundryCost, $Margin)
    {
        return round((self::calculateTotalCost(self::calculatePurchaseCost($CostOfLinen, $RWP, $OccupancyRate), $LaundryCost)/(1 - ($Margin/100))), 2);
    }

    /**
     * Get title style
     * @return array
     */
    private static function getTitleStyle()
    {
        return array(
            'font' => array(
                'size' => 18,
                'name' => 'Trebuchet MS'
            )
        );
    }

    /**
     * Get quote detail label style
     * @return array
     */
    private static function getQuoteDetailLabelStyle()
    {
        return array(
            'font' => array(
                'bold' => true,
                'size' => 10,
                'name' => 'Trebuchet MS'
            )
        );
    }

    /**
     * Get table header style
     * @return array
     */
    private static function getTableHeaderStyle()
    {
        return array(
            'font' => array(
                'bold' => true,
                'size' => 11,
                'color' => array('rgb' => 'FFFFFF'),
                'name' => 'Trebuchet MS'
            ),
            'fill' => array(
                'type' => ExcelStyleFill::FILL_SOLID,
                'startcolor' => array('rgb' => 'FF6600')
            )
        );
    }

    /**
     * Get quote detail label style
     * @return array
     */
    private static function getThankYouTextStyle()
    {
        return array(
            'font' => array(
                'bold' => true,
                'italic' => true,
                'size' => 12,
                'name' => 'Trebuchet MS'
            )
        );
    }

    /**
     * Get alternate row style
     * @return array
     */
    private static function getAlternateRowStyle()
    {
        return array(
            'fill' => array(
                'type' => ExcelStyleFill::FILL_SOLID,
                'startcolor' => array('rgb' => 'C0C0C0')
            )
        );
    }

    /**
     * Get column center alignment style
     * @return array
     */
    private static function getColumnCenterAlignmentStyle()
    {
        return array(
            'alignment' => array(
                'horizontal' => ExcelStyleAlignment::HORIZONTAL_CENTER
            )
        );
    }

    /**
     * Get border style
     * @return array
     */
    private static function getBorderStyle()
    {
        return array(
            'borders' => array(
                'outline' => array(
                    'style' => ExcelStyleBorder::BORDER_THIN
                )
            )
        );
    }

    /**
     * Get RNT details
     * @return array
     */
    private static function getRNTDetails()
    {
        return array(
            'Address' => '306, Third Floor, Zainal Mohebi Plaza',
            'Zip' => 'Dubai 341182',
            'Phone' => 'Phone: [000-000-0000]',
            'Fax' => 'Fax: [000-000-0000]',
            'PreparedBy' => 'Prepared by:'
        );
    }

    /**
     * Get quote details
     * @param int $ValidDays
     * @param int $SupplierID
     * @param int $CustomerID
     * @param array $Options
     * @return array
     */
    private static function getQuoteDetails($ValidDays, $SupplierID, $CustomerID, $Options)
    {
        return array(
            'DATE:' => self::getCurrentDate($Options),
            'QUOTE #' => self::generateQuoteNumber($SupplierID, $CustomerID),
            'Valid Until:' => self::calculateValidity($ValidDays, $Options)
        );
    }

    /**
     * Calculate validity
     * @param int $ValidDays
     * @param array $Options
     * @return string
     */
    private static function calculateValidity($ValidDays, $Options)
    {
        return date($Options['XLSX_DATE_FORMAT'], strtotime('+'.$ValidDays.' days'));
    }

    /**
     * Generate quote #
     * @param int $SupplierID
     * @param int $CustomerID
     * @return string
     */
    private static function generateQuoteNumber($SupplierID, $CustomerID)
    {
        return $SupplierID.'/'.$CustomerID.'/'.date('dmY');
    }

    /**
     * Get current date
     * @param array $Options
     * @return string
     */
    private static function getCurrentDate($Options)
    {
        return date($Options['XLSX_DATE_FORMAT']);
    }
}
?>
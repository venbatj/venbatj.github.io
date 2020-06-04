<?php
namespace Rnt\Controller\Manage;

use Rnt\Manage\PriceCalculator as PC;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;
use Rnt\Libs\ostAuth;

/**
* PriceCalculator
* 
* @package Rnt\Controller\Manage
*/
class PriceCalculator
{
    /**
     * Generate quote
     * @param array $Req
     * @return array
     */
    public static function generateQuote($Req)
    {
        Utils::includeXLSXLib();

        $Options = array();
        $Options['DATA_STORAGE_PATH'] = DATA_STORAGE_PATH;
        $Options['VERSION_PATH'] = VERSION_PATH;
        $Options['DATA_STORAGE_BASE_PATH'] = DATA_STORAGE_BASE_PATH;
        $Options['XLSX_DATE_FORMAT'] = XLSX_DATE_FORMAT;
        $Options['DOWNLOAD_PATH'] = SERVICE_HOST_PATH.'/quote-download.php';

        $Path = PC::generateQuoteXLSX($Req['CapturedData'], 1, 1, 180, $Options);
        $Req['CapturedData']['FileName'] = $Path['FilePath'];
        $QuoteInsert = self::insertUpdatePrice($Req);

        return Utils::response($QuoteInsert, true);
    }

    /**
    * Insert or update calculated price
    * @param array $Req
    * @return void
    */
    public static function insertUpdatePrice($Req)
    {
        unset($Req['CapturedData']['QuoteItems']);

        if (isset($Req['CapturedData']['ID']) && $Req['CapturedData']['ID'] > 0) {
            $fields = array(
                'FunctionName' => 'insertOrganization',
                'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceOrganizations.php',
                'ID' => urlencode($_POST['CapturedData']['ID']),
                'OstID' => urlencode($_POST['CapturedData']['OstID']),
                'CustomerName' => urlencode($_POST['CapturedData']['CustomerName']),
                'BCEmail' => urlencode($_POST['CapturedData']['BCEmail']),
                'HOLocation' => urlencode($_POST['CapturedData']['HOLocation']),
                'HOCityID' => urlencode($_POST['CapturedData']['HOCityID']),
                'HOCountryID' => urlencode($_POST['CapturedData']['HOCountryID']),
                'HOPhone' => urlencode($_POST['CapturedData']['HOPhone']),
            );
            $res = ostAuth::getosTicketData($fields);
            // $res = Utils::response(PC::getosTicketData($fields), true);
            $GenerateQuoteID = $Req['CapturedData']['ID'];
            $Res = PC::updatePrice($Req['CapturedData']);
            $Response = Utils::response(PC::insertQuoteData($Req['QuoteItems'],$GenerateQuoteID), true);
            return $res;
        } else {
            $fields = array(
                'FunctionName' => 'insertOrganization',
                'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceOrganizations.php',
                'CustomerName' => urlencode($_POST['CapturedData']['CustomerName']),
                'BCEmail' => urlencode($_POST['CapturedData']['BCEmail']),
                'HOLocation' => urlencode($_POST['CapturedData']['HOLocation']),
                'HOCityID' => urlencode($_POST['CapturedData']['HOCityID']),
                'HOCountryID' => urlencode($_POST['CapturedData']['HOCountryID']),
                'HOPhone' => urlencode($_POST['CapturedData']['HOPhone']),
            );
            $res = ostAuth::getosTicketData($fields);
            // $res = self::getosTicketData($fields);
            $GenerateQuoteID = Utils::response(PC::insertPrice($res,$Req['CapturedData']), true);
            $QuoteID = $GenerateQuoteID['D'];
            $Today = date("d-m-Y");
            if (isset($Req['CapturedData']['CustomerID']) && $Req['CapturedData']['CustomerID'] > 0) {
            $CustomerID = $Req['CapturedData']['CustomerID'];
            $QuoteGenID = $CustomerID."-".$QuoteID."-".$Today;
            $Response = PC::updateQuoteID($QuoteID, $QuoteGenID);
            }
            $Res = Utils::response(PC::insertQuoteData($Req['QuoteItems'], $QuoteID,$res), true);
            return $res;
        }
        return Utils::response($GenerateQuoteID, true);
    }
    /**
    * Convert Customer
    * @param array $Req
    * @return void
    */
    // private static function CovertCustomer($Req) 
    // {
    //     unset($Req['CapturedData']['QuoteItems']);
    //     if (PC::isExists($Req['CapturedData']))
    //         return Utils::errorResponse('Customer "'.$Req['CapturedData']['CustomerName'].'" already exists!');

    //     if (isset($Req['CapturedData']['ID']) && $Req['CapturedData']['ID'] > 0) {
    //         $QuoteGenerateID = $Req['CapturedData']['ID'];
    //         $CustomerID = PC::CovertCustomer($Req['CapturedData'], true);
    //         $Cust = $CustomerID;
    //         $Today = date("d-m-Y");
    //         $QuoteID = $Cust."-".$QuoteGenerateID."-".$Today;
    //         $Res = Utils::response(PC::updateQuoteID($QuoteGenerateID, $QuoteID));
    //     } else {
    //         $CustomerID = PC::CovertCustomer($Req['CapturedData'], true);
    //         $Cust = $CustomerID;
    //         $Today = date("d-m-Y");
    //         if (isset($Req['QuoteGenerationID']) && $Req['QuoteGenerationID'] > 0) {
    //             $QuoteID = $Cust."-".$Req['QuoteGenerationID']."-".$Today;
    //             $Res = Utils::response(PC::updateQuoteID($Req['QuoteGenerationID'], $QuoteID));
    //         }
    //     }
    //     return Utils::response($CustomerID, true);
    // }

    public static function CovertCustomer($Req) 
    {
        unset($Req['CapturedData']['QuoteItems']);
        if (PC::isExists($Req['CapturedData']))
            return Utils::errorResponse('Customer "'.$Req['CapturedData']['CustomerName'].'" already exists!');

        if (isset($Req['CapturedData']['ID']) && $Req['CapturedData']['ID'] > 0) {
            $QuoteGenerateID = $Req['CapturedData']['ID'];
            // $CustomerID = PC::CovertCustomer($Req['CapturedData'], true);
            // $Cust = $CustomerID;
            $Today = date("d-m-Y");
            // $QuoteID = $Cust."-".$QuoteGenerateID."-".$Today;
            
            $fields = array(
                'FunctionName' => 'CreateTicket',
                'url'=> 'http://hyjiya.net/rntsupport/service/classes/ServiceConvertcustTicket.php',
                'uid' => urlencode($_POST['CapturedData']['ID']),
                'name' => urlencode($_POST['CapturedData']['CustomerName']),
                'mail' => urlencode($_POST['CapturedData']['BCEmail']),
                );
            $res = ostAuth::getosTicketData($fields);
            print_r($fields);
            print_r($res);
            // exit;
            // $Res = Utils::response(PC::updateQuoteID($QuoteGenerateID, $QuoteID));
        } else {
            $CustomerID = PC::CovertCustomer($Req['CapturedData'], true);
            $Cust = $CustomerID;
            $Today = date("d-m-Y");
            if (isset($Req['QuoteGenerationID']) && $Req['QuoteGenerationID'] > 0) {
                $QuoteID = $Cust."-".$Req['QuoteGenerationID']."-".$Today;
                $Res = Utils::response(PC::updateQuoteID($Req['QuoteGenerationID'], $QuoteID));
            }
        }
        // return Utils::response($CustomerID, true);
    }

    /**
     * Get Sales Person Name
     * @param array $Req
     * @return void
     */
    public static function getSalesPerson()
    {
        return Utils::response(PC::getSalesPerson(), true);
    }

    /**
     * Get Customer Name
     * @param array $Req
     * @return void
     */
    public static function getAllData($Req)
    {
        return Utils::response(PC::getAllData($Req), true);
    }

    /**
     * Get Customer Name
     * @param array $Req
     * @return void
     */
    public static function getProspectData($Req)
    {
        return Utils::response(PC::getProspectData($Req), true);
    }

    /**
     * Get Customer Name
     * @param array $Req
     * @return void
     */
    public static function getQuoteData($Req)
    {
        return Utils::response(PC::getQuoteData($Req), true);
    }

    /**
     * Get Customer Details
     * @param array $Req
     * @return void
     */
    public static function getCustomerInfo($Req)
    {
        return Utils::response(PC::getCustomerInfo($Req['ID']), true); 
    }

    /**
     * Remove Generate Quote
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
        // $fields = array(
        //     'FunctionName' => 'RemoveOrganization',
        //     'ID' =>$_POST['IDArr']['0'],
        // );
        // $res = self::getosTicketData($fields);
        return Utils::response(PC::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    { 
        $Columns = array('CustomerName', 'CustomerType', 'QuoteType', 'FileName');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = PC::getDataTblListCount($Attributes['DataTableSearch']);
        $ResData = PC::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        $ResData = PC::srcDom($ResData);

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

        $Res = PC::getDataByID($Req['ID']);

        return Utils::response($Res, true);
    }
}
?>
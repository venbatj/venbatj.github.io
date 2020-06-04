<?php
namespace Rnt\Controller\Customer;

use Rnt\Customer\ContractInfoRepository as CIR;
// use Rnt\Customer\AssignLaundryRepository as ALR;
use Rnt\Customer\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * ContractInfo
 * 
 * @package Rnt\Controller\Customer
 */
class ContractInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CIR::getAllData(), true);
    }

    /**
     * Insert / Update Customer contract
     * @param array $Req
     * @param array $GD
     * @param array $File
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {
        $Req = self::unsetOrSetFileNames($Req);    
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $ID = $Req['ID'];
            CIR::update($Req);
        } else {
            $Req['ContractSignedDate'] = date("Y-m-d", strtotime($Req['ContractSignedDate']));
            $Req['DeliveryStartDate'] = date("Y-m-d", strtotime($Req['DeliveryStartDate']));
            $Req['DeliveryEndDate'] = date("Y-m-d", strtotime($Req['DeliveryEndDate']));
            $Req['RenewalReminder1Date'] = date("Y-m-d", strtotime($Req['RenewalReminder1Date']));
            $Req['RenewalReminder2Date'] = date("Y-m-d", strtotime($Req['RenewalReminder2Date']));
            $Req['RenewalReminder3Date'] = date("Y-m-d", strtotime($Req['RenewalReminder3Date']));
            $ID = CIR::insert($Req);
        }
        
        self::uploadContractDocs($ID, $File);
        return Utils::response($ID, true);
    }

    /**
     * Unset file name to avoid over write and set file names to be removed
     * @param array $Req
     * @return array
     */
    private static function unsetOrSetFileNames($Req)
    {
        if (isset($Req['ContractUpload']))
            unset($Req['ContractUpload']);
        if (isset($Req['TradeLicenseUpload']))    
            unset($Req['TradeLicenseUpload']);
        if (isset($Req['TaxCertificateUpload']))
            unset($Req['TaxCertificateUpload']);
        if (isset($Req['ACFNContractUpload']))
            unset($Req['ACFNContractUpload']);
        if (isset($Req['ACFNTradeLicenseUpload']))    
            unset($Req['ACFNTradeLicenseUpload']);
        if (isset($Req['ACFNTaxCertificateUpload']))
            unset($Req['ACFNTaxCertificateUpload']);

        if (isset($Req['RMTradeLicense']) && $Req['RMTradeLicense'] == 'Y') {
            $Req['TradeLicenseUpload'] = '';
            $Req['ACFNTradeLicenseUpload'] = '';
        }
        if (isset($Req['RMTaxCertificate']) && $Req['RMTaxCertificate'] == 'Y') {
            $Req['TaxCertificateUpload'] = '';
            $Req['ACFNTaxCertificateUpload'] = '';
        }
        return $Req;
    }

    /**
     * Upload contract docs
     * @param int $CustomerID
     * @param array $File
     * @return void
     */
    private static function uploadContractDocs($ID, $File)
    {
        $FileDetails = array('ID' => $ID);

        $FileResContract = FH::uploadContract($ID, $File);
        if (is_array($FileResContract) && count($FileResContract)) {
            $FileDetails['ContractUpload'] = $FileResContract['FilePath'];
            $FileDetails['ACFNContractUpload'] = $FileResContract['ActualFileName'];
        }

        $FileResTradeLicense = FH::uploadTradeLicense($ID, $File);
        if (is_array($FileResTradeLicense) && count($FileResTradeLicense)) {
            $FileDetails['TradeLicenseUpload'] = $FileResTradeLicense['FilePath'];
            $FileDetails['ACFNTradeLicenseUpload'] = $FileResTradeLicense['ActualFileName'];
        }

        $FileResTaxCertificate = FH::uploadTaxCertificate($ID, $File);
        if (is_array($FileResTaxCertificate) && count($FileResTaxCertificate)) {
            $FileDetails['TaxCertificateUpload'] = $FileResTaxCertificate['FilePath'];
            $FileDetails['ACFNTaxCertificateUpload'] = $FileResTaxCertificate['ActualFileName'];
        }

        if (count($FileDetails) > 1) {
            CIR::update($FileDetails);
        }
    }

    /**
     * Remove Contract info
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CIR::remove($Req['IDArr']), true);
    }

    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'LocationID', 'ContractSignedDate', 'DeliveryStartDate', 'DeliveryEndDate', 'ContractTypeID', 'InvoicingFrequencyID');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CIR::getDataTblListCount($Req['CustomerID'], $Attributes['DataTableSearch']);
		$ResData  = CIR::getDataTblList($Req['CustomerID'], $Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
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

        $Res = CIR::getDataByID($Req['ID']);
        if (isset($Res['ContractUpload']) && trim($Res['ContractUpload']) != '')
            $Res['ContractUpload'] = $Res['ACFNContractUpload'];
        if (isset($Res['TradeLicenseUpload']) && trim($Res['TradeLicenseUpload']) != '')
            $Res['TradeLicenseUpload'] = $Res['ACFNTradeLicenseUpload'];
        if (isset($Res['TaxCertificateUpload']) && trim($Res['TaxCertificateUpload']) != '')
            $Res['TaxCertificateUpload'] = $Res['ACFNTaxCertificateUpload'];

        if (isset($Res['ContractSignedDate']) && $Res['ContractSignedDate'] != '0000-00-00')
            $Res['ContractSignedDate'] = date("j M Y", strtotime($Res['ContractSignedDate']));  

        if (isset($Res['DeliveryStartDate']) && $Res['DeliveryStartDate'] != '0000-00-00')
            $Res['DeliveryStartDate'] = date("j M Y", strtotime($Res['DeliveryStartDate']));
        if (isset($Res['DeliveryEndDate']) && $Res['DeliveryEndDate'] != '0000-00-00')
            $Res['DeliveryEndDate'] = date("j M Y", strtotime($Res['DeliveryEndDate']));
        if (isset($Res['RenewalReminder1Date']) && $Res['RenewalReminder1Date'] != '0000-00-00')
            $Res['RenewalReminder1Date'] = date("j M Y", strtotime($Res['RenewalReminder1Date']));
        if (isset($Res['RenewalReminder2Date']) && $Res['RenewalReminder2Date'] != '0000-00-00')
            $Res['RenewalReminder2Date'] = date("j M Y", strtotime($Res['RenewalReminder2Date']));  
        if (isset($Res['RenewalReminder3Date']) && $Res['RenewalReminder3Date'] != '0000-00-00')
            $Res['RenewalReminder3Date'] = date("j M Y", strtotime($Res['RenewalReminder3Date']));    
        return Utils::response($Res, true);
    }
}
?>
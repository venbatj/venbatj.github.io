<?php
namespace Rnt\Laundry;
use Rnt\Libs\SqlManager;
use Rnt\Libs\ReadXLSFile;

use Rnt\Laundry\ImportRepository;

use Rnt\Laundry\BasicDetailRepository as BasicDetail;
use Rnt\Laundry\ContactInfoRepository as ContactInfo;
use Rnt\Laundry\BillingInfoRepository as BillingInfo;
use Rnt\Laundry\FacilityInfoRepository as FacilityInfo;
use Rnt\Laundry\ContractInfoRepository as ContractInfo;

use Rnt\Account\Login as Login;
use Rnt\Settings\UserRepository as User;
use Rnt\InviteUser;

/**
 * ImportLaundry
 * 
 * @package Rnt\Laundry
 */
class ImportLaundry extends ImportRepository
{
    use ReadXLSFile;

    private static $msLaundry = array();

    /**
     * Import Laundry
     * @param array $Req
     * @return array
     */
    public static function import($Data)
    {
        $Response = array();
        parent::insert($Data);
        $Sheets = self::readImportXLSFile($Data['FullPath']);
        
        if (isset($Sheets['Laundry']) && count($Sheets['Laundry']))
            $Response['Laundry'] = self::importLaundry($Sheets['Laundry']);
        if (isset($Sheets['Contacts']) && count($Sheets['Contacts']))
            $Response['Contacts'] = self::importContacts($Sheets['Contacts']);
        if (isset($Sheets['BillingInfo']) && count($Sheets['BillingInfo']))
            $Response['BillingInfo'] = self::importBillingInfo($Sheets['BillingInfo']);
        if (isset($Sheets['FacilityInfo']) && count($Sheets['FacilityInfo']))
            $Response['FacilityInfo'] = self::importFacilityInfo($Sheets['FacilityInfo']);
        if (isset($Sheets['Contract']) && count($Sheets['Contract']))
            $Response['Contract'] = self::importContract($Sheets['Contract']);
        return $Response;
    }
    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('ImportHistory');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }
    /**
     * Import Laundry
     * @param array $Data
     * @return array
     */
    private static function importLaundry($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseLaundry($Data[$Key]);
            if (count($Row) >= 6) {
                if (BasicDetail::isExists($Row) == 0) {
                    $Res[] = array(
                        'Line' => $Key, 
                        'Msg' => 'Laundry added successfully', 
                        'Warnings' => self::checkForWarningsInLaundry($Row), 
                        'Ref' => BasicDetail::insert($Row)
                    );
                } else
                    $Res[] = array('Line' => $Key, 'Msg' => 'Laundry "'.$Row['LaundryName'].'" already exists');
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Parse Laundry
     * @param array $Data
     * @return array
     */
    private static function parseLaundry($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['LaundryName'] = trim($Item[1]);
        if (isset($Item[2]))
            $OP['DeliveryManager'] = parent::getLoginIDByEmailID($Item[2]);
        if (isset($Item[3]))
            $OP['LandlineNumber'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['Currency'] = strtoupper(trim($Item[4]));
        if (isset($Item[5]))
            $OP['ContractCount'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['LocationCount'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['Address'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['CountryID'] = parent::getCountryIDByName($Item[8]); 
        if (isset($Item[9]))
            $OP['State'] = trim($Item[9]);
        if (isset($Item[10]))
            $OP['CityID'] = parent::getCityIDByName($Item[10]); 
        if (isset($Item[11]))
            $OP['Zip'] = trim($Item[11]);
        return $OP;
    }

    /**
     * Check for warnings in laundry
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInLaundry($Row)
    {
        $Warnings = array();
        if (isset($Row['DeliveryManager']) && $Row['DeliveryManager'] == 0)
            $Warnings[] = 'Unable to match delivery manager';
        if (isset($Row['CountryID']) && $Row['CountryID'] == 0)
            $Warnings[] = 'Unable to match country';
        if (isset($Row['CityID']) && $Row['CityID'] == 0)
            $Warnings[] = 'Unable to match city';
        return $Warnings;
    }

    /**
     * Import contacts
     * @param array $Data
     * @return array
     */
    private static function importContacts($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseContact($Data[$Key]);
            if (count($Row) >= 4 && isset($Row['EmailID'])) {
                if (!($Row['ContactForRef'] > 0)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to match laundry');
                    continue;
                }

                if (ContactInfo::isExists($Row)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Contact "'.$Row['EmailID'].'" already exists');
                    continue;
                }

                if ($Row['SendInvite'] == 'Y') {
                    if (User::isExistsEmailID($Row)) {
                        $Res[] = array('Line' => $Key, 'Msg' => 'User "'.$Row['EmailID'].'" already exists');
                        continue;
                    }
                    
                    $LoginData = array(
                        'EmailID' => $Row['EmailID'],
                        'ActivationCode' => md5(rand(1000, 9999))
                    );
                    $LoginID = Login::insert($LoginData, true);
            
                    $Row['LoginID'] = $LoginID;
                    $Row['UserTypeID'] = '3';
                    User::insert($Row);

                    if ($LoginID > 0)
                        InviteUser::sendInvite($Row['EmailID'], $LoginData['ActivationCode'], $Row['FirstName'], $Row['LoginID']);
                    else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Unable to send invite to "'.$Row['EmailID'].'"');
                }
                
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Contact added successfully',
                    'Warnings' => array(),
                    'Ref' => ContactInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Parse contact
     * @param array $Item
     * @return array
     */
    private static function parseContact($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['ContactForRef'] = self::getLaundryIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['FirstName'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['LastName'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['Phone'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['EmailID'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['SendInvite'] = trim($Item[6]);

        if (!isset($OP['SendInvite']) || $OP['SendInvite'] == '')
            $OP['SendInvite'] = 'N';

        if (count($OP))
            $OP['ContactFor'] = 'LC';

        return $OP;
    }

    /**
     * Import billing info
     * @param array $Data
     * @return array
     */
    private static function importBillingInfo($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseBillingInfo($Data[$Key]);
            if (count($Row) >= 4 && isset($Row['EmailID'])) {
                if (BillingInfo::isExists($Row)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Billing info "'.$Row['EmailID'].'" already exists');
                    continue;
                }

                if ($Row['SendInvite'] == 'Y') {
                    if (User::isExistsEmailID($Row)) {
                        $Res[] = array('Line' => $Key, 'Msg' => 'User "'.$Row['EmailID'].'" already exists');
                        continue;
                    }
                    
                    $LoginData = array(
                        'EmailID' => $Row['EmailID'],
                        'ActivationCode' => md5(rand(1000, 9999))
                    );
                    $LoginID = Login::insert($LoginData, true);
            
                    $Row['LoginID'] = $LoginID;
                    $Row['UserTypeID'] = '3';
                    User::insert($Row);

                    if ($LoginID > 0)
                        InviteUser::sendInvite($Row['EmailID'], $LoginData['ActivationCode'], $Row['FirstName'], $Row['LoginID']);
                    else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Unable to send invite to "'.$Row['EmailID'].'"');
                }
                
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Billing info added successfully',
                    'Warnings' => self::checkForWarningsInBilling($Row),
                    'Ref' => BillingInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Parse billing info
     * @param array $Item
     * @return array
     */
    private static function parseBillingInfo($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['SourceRefID'] = self::getLaundryIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['FirstName'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['LastName'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['Phone'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['EmailID'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['Address'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['CountryID'] = parent::getCountryIDByName($Item[7]);
        if (isset($Item[8]))
            $OP['State'] = trim($Item[8]);
        if (isset($Item[9]))
            $OP['CityID'] = parent::getCityIDByName($Item[9]);
        if (isset($Item[10]))
            $OP['Zip'] = trim($Item[10]);
        if (isset($Item[11]))
            $OP['SendInvite'] = trim($Item[11]);

        if (!isset($OP['SendInvite']) || $OP['SendInvite'] == '')
            $OP['SendInvite'] = 'N';
        
        if (count($OP))
            $OP['Source'] = 'LBC';

        return $OP;
    }

    /**
     * Check for warnings in billing
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInBilling($Row)
    {
        $Warnings = array();
        if (isset($Row['SourceRefID']) && $Row['SourceRefID'] == 0)
            $Warnings[] = 'Unable to match laundry';
        if (isset($Row['CountryID']) && $Row['CountryID'] == 0)
            $Warnings[] = 'Unable to match country';
        if (isset($Row['CityID']) && $Row['CityID'] == 0)
            $Warnings[] = 'Unable to match city';
        return $Warnings;
    }

    /**
     * Import facility info
     * @param array $Data
     * @return array
     */
    private static function importFacilityInfo($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseFacilityInfo($Data[$Key]);
            if (count($Row) >= 6) {
                if (!($Row['LaundryID'] > 0)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to match laundry');
                    continue;
                }
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Laundry added successfully', 
                    'Warnings' => array(), 
                    'Ref' => FacilityInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Parse facility info
     * @param array $Item
     * @return array
     */
    private static function parseFacilityInfo($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['LaundryID'] = self::getLaundryIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['LaundrySize'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['EmployeeCount'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['VehicleCount'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['CustomerServiceID'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['ChemicalName'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['Landmark'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['Dosage'] = trim($Item[8]);

        if (!isset($OP['Dosage']) || $OP['Dosage'] == '')
            $OP['Dosage'] = 'M';

        return $OP;
    }

    /**
     * Import contract
     * @param array $Data
     * @return array
     */
    private static function importContract($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseContract($Data[$Key]);
            if (count($Row) >= 6) {
                if ($Row['LaundryID'] > 0) {
                    if (ContractInfo::checkByLaundryID($Row['LaundryID']) == 0) {
                        $Res[] = array(
                            'Line' => $Key, 
                            'Msg' => 'Contract updated successfully', 
                            'Warnings' => self::checkForWarningsInContract($Row), 
                            'Ref' => ContractInfo::insert($Row)
                        );
                    } else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Contract already updated');
                } else
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to find the laundry');
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Check for warnings in contract
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInContract($Row)
    {
        $Warnings = array();
        if (isset($Row['InvoicingFrequencyID']) && $Row['InvoicingFrequencyID'] == 0)
            $Warnings[] = 'Unable to match invoicing frequency';
        return $Warnings;
    }

    /**
     * Parse contract
     * @param array $Item
     * @return array
     */
    private static function parseContract($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['LaundryID'] = self::getLaundryIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['ContractSignedDate'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['InvoicingFrequencyID'] = parent::getInvoicingFrequencyIDByName(($Item[3]));
        if (isset($Item[4]))
            $OP['PaymentTerms'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['TradeLicenseNo'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['TaxID'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['RenewalReminder1'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['RenewalReminder2'] = trim($Item[8]);
        if (isset($Item[9]))
            $OP['RenewalReminder3'] = trim($Item[9]);

        if (!isset($OP['RenewalReminder1']) || $OP['RenewalReminder1'] == '')
            $OP['RenewalReminder1'] = 'N';
        if (!isset($OP['RenewalReminder2']) || $OP['RenewalReminder2'] == '')
            $OP['RenewalReminder2'] = 'N';
        if (!isset($OP['RenewalReminder3']) || $OP['RenewalReminder3'] == '')
            $OP['RenewalReminder3'] = 'N';
        
        return $OP;
    }

    /**
     * Get LaundryID by name
     * @param string $Name
     * @return int
     */
    private static function getLaundryIDByName($Name)
    {
        $LaundryName = strtolower(trim($Name));
        if (isset(self::$msLaundry[$LaundryName]))
            return self::$msLaundry[$LaundryName];
        $Res = BasicDetail::getDataByName($LaundryName);
        if (count($Res))
            self::$msLaundry[$LaundryName] = $Res['ID'];
        else
            self::$msLaundry[$LaundryName] = 0;
        return self::$msLaundry[$LaundryName];
    }
}
?>
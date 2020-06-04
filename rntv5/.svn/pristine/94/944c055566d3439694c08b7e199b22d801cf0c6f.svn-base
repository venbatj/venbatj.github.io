<?php
namespace Rnt\Customer;
use Rnt\Libs\SqlManager;
use Rnt\Libs\ReadXLSFile;

use Rnt\Customer\ImportRepository;

use Rnt\Masters\CustomerTypeRepository as CustomerType;
use Rnt\Customer\BasicDetailRepository as BasicDetail;
use Rnt\Customer\ContactInfoRepository as ContactInfo;
use Rnt\Customer\BillingInfoRepository as BillingInfo;
use Rnt\Customer\ShippingInfoRepository as ShippingInfo;
use Rnt\Customer\ContractInfoRepository as ContractInfo;

use Rnt\Account\Login as Login;
use Rnt\Settings\UserRepository as User;
use Rnt\InviteUser;

/**
 * ImportCustomer
 * 
 * @package Rnt\Customer
 */
class ImportCustomer extends ImportRepository
{
    use ReadXLSFile;

    private static $msCustomer = array();
    private static $msCustomerType = array();

    /**
     * Import customer
     * @param array $Data
     * @return array
     */
    public static function import($Data)
    {
        $Response = array();
        parent::insert($Data);
        $Sheets = self::readImportXLSFile($Data['FullPath']);
        
        if (isset($Sheets['Customer']) && count($Sheets['Customer']))
            $Response['Customer'] = self::importCustomer($Sheets['Customer']);
        if (isset($Sheets['Contacts']) && count($Sheets['Contacts']))
            $Response['Contacts'] = self::importContacts($Sheets['Contacts']);
        if (isset($Sheets['BillingInfo']) && count($Sheets['BillingInfo']))
            $Response['BillingInfo'] = self::importBillingInfo($Sheets['BillingInfo']);
        if (isset($Sheets['ShippingInfo']) && count($Sheets['ShippingInfo']))
            $Response['ShippingInfo'] = self::importShippingInfo($Sheets['ShippingInfo']);
        if (isset($Sheets['Contract']) && count($Sheets['Contract']))
            $Response['Contract'] = self::importContract($Sheets['Contract']);

        $Data['ImportStatus'] = json_encode($Response);

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
     * Import customer
     * @param array $Data
     * @return array
     */
    private static function importCustomer($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseCustomer($Data[$Key]);
            if (count($Row) >= 6) {
                if (BasicDetail::isExists($Row) == 0) {
                    $Res[] = array(
                        'Line' => $Key, 
                        'Msg' => 'Customer added successfully', 
                        'Warnings' => self::checkForWarningsInCustomer($Row), 
                        'Ref' => BasicDetail::insert($Row)
                    );
                } else
                    $Res[] = array('Line' => $Key, 'Msg' => 'Customer "'.$Row['CustomerName'].'" already exists');
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Check for warnings in customer
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInCustomer($Row)
    {
        $Warnings = array();
        if (isset($Row['AccountManager']) && $Row['AccountManager'] == 0)
            $Warnings[] = 'Unable to match account manager';
        if (isset($Row['CustomerTypeID']) && $Row['CustomerTypeID'] == 0)
            $Warnings[] = 'Unable to match customer type';
        if (isset($Row['CountryID']) && $Row['CountryID'] == 0)
            $Warnings[] = 'Unable to match country';
        if (isset($Row['CityID']) && $Row['CityID'] == 0)
            $Warnings[] = 'Unable to match city';
        return $Warnings;
    }

    /**
     * Parse customer
     * @param array $Item
     * @return array
     */
    private static function parseCustomer($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['CustomerName'] = trim($Item[1]);
        if (isset($Item[2]))
            $OP['CustomerTypeID'] = self::getCustomerTypeIDByName($Item[2]);
        if (isset($Item[3]))
            $OP['AccountManager'] = parent::getLoginIDByEmailID($Item[3]);
        if (isset($Item[4]))
            $OP['LandlineNumber'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['Currency'] = strtoupper(trim($Item[5]));
        if (isset($Item[6]))
            $OP['ContractCount'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['LocationCount'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['Address'] = trim($Item[8]);
        if (isset($Item[9]))
            $OP['CountryID'] = parent::getCountryIDByName($Item[9]); 
        if (isset($Item[10]))
            $OP['State'] = trim($Item[10]);
        if (isset($Item[11]))
            $OP['CityID'] = parent::getCityIDByName($Item[11]); 
        if (isset($Item[12]))
            $OP['Zip'] = trim($Item[12]);
        if (isset($Item[13]))
            $OP['Rooms'] = trim($Item[13]);
        if (isset($Item[14]))
            $OP['AverageOccupancyRate'] = trim($Item[14]);
        if (isset($Item[15]))
            $OP['Star'] = trim($Item[15]);
        return $OP;
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
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to match customer');
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
                    $Row['UserTypeID'] = '1';
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
            $OP['ContactForRef'] = self::getCustomerIDByName($Item[1]);
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
            $OP['ContactFor'] = 'CC';

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
                    $Row['UserTypeID'] = '1';
                    User::insert($Row);

                    if ($LoginID > 0)
                        InviteUser::sendInvite($Row['EmailID'], $LoginData['ActivationCode'], $Row['FirstName'], $Row['LoginID']);
                    else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Unable to send invite to "'.$Row['EmailID'].'"');
                }
                
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Billing info added successfully',
                    'Warnings' => self::checkForWarningsInBillingAndShipping($Row),
                    'Ref' => BillingInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Check for warnings in billing and shipping
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInBillingAndShipping($Row)
    {
        $Warnings = array();
        if (isset($Row['SourceRefID']) && $Row['SourceRefID'] == 0)
            $Warnings[] = 'Unable to match customer';
        if (isset($Row['CountryID']) && $Row['CountryID'] == 0)
            $Warnings[] = 'Unable to match country';
        if (isset($Row['CityID']) && $Row['CityID'] == 0)
            $Warnings[] = 'Unable to match city';
        return $Warnings;
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
            $OP['SourceRefID'] = self::getCustomerIDByName($Item[1]);
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
            $OP['Source'] = 'CBC';

        return $OP;
    }

    /**
     * Import shipping info
     * @param array $Data
     * @return array
     */
    private static function importShippingInfo($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseShippingInfo($Data[$Key]);

            if (count($Row) >= 4 && isset($Row['EmailID'])) {
                if (ShippingInfo::isExists($Row)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Shipping info "'.$Row['EmailID'].'" already exists');
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
                    $Row['UserTypeID'] = '1';
                    User::insert($Row);

                    if ($LoginID > 0)
                        InviteUser::sendInvite($Row['EmailID'], $LoginData['ActivationCode'], $Row['FirstName'], $Row['LoginID']);
                    else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Unable to send invite to "'.$Row['EmailID'].'"');
                }
                
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Shipping info added successfully',
                    'Warnings' => self::checkForWarningsInBillingAndShipping($Row),
                    'Ref' => ShippingInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Parse shipping info
     * @param array $Item
     * @return array
     */
    private static function parseShippingInfo($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['SourceRefID'] = self::getCustomerIDByName($Item[1]);
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
            if (count($Row) >= 11) {
                if ($Row['CustomerID'] > 0) {
                    if (ContractInfo::checkByCustomerID($Row['CustomerID']) == 0) {
                        $Res[] = array(
                            'Line' => $Key, 
                            'Msg' => 'Contract updated successfully', 
                            'Warnings' => self::checkForWarningsInContract($Row), 
                            'Ref' => ContractInfo::insert($Row)
                        );
                    } else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Contract already updated');
                } else
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to find the customer');
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
        if (isset($Row['ContractTypeID']) && $Row['ContractTypeID'] == 0)
            $Warnings[] = 'Unable to match contract type';
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
            $OP['CustomerID'] = self::getCustomerIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['ContractSignedDate'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['DeliveryStartDate'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['DeliveryEndDate'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['ContractTypeID'] = parent::getContractTypeIDByName($Item[5]);
        if (isset($Item[6]))
            $OP['TotalContractValue'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['MonthlyBillingValue'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['InvoicingFrequencyID'] = parent::getInvoicingFrequencyIDByName(($Item[8]));
        if (isset($Item[9]))
            $OP['Advance'] = trim($Item[9]);
        if (isset($Item[10]))
            $OP['PaymentTerms'] = trim($Item[10]);
        if (isset($Item[11]))
            $OP['TradeLicenseNo'] = trim($Item[11]);
        if (isset($Item[12]))
            $OP['TaxID'] = trim($Item[12]);
        if (isset($Item[13]))
            $OP['RenewalReminder1'] = trim($Item[13]);
        if (isset($Item[14]))
            $OP['RenewalReminder2'] = trim($Item[14]);
        if (isset($Item[15]))
            $OP['RenewalReminder3'] = trim($Item[15]);

        if (!isset($OP['RenewalReminder1']) || $OP['RenewalReminder1'] == '')
            $OP['RenewalReminder1'] = 'N';
        if (!isset($OP['RenewalReminder2']) || $OP['RenewalReminder2'] == '')
            $OP['RenewalReminder2'] = 'N';
        if (!isset($OP['RenewalReminder3']) || $OP['RenewalReminder3'] == '')
            $OP['RenewalReminder3'] = 'N';
        
        return $OP;
    }

    /**
     * Get CustomerID by name
     * @param string $Name
     * @return int
     */
    private static function getCustomerIDByName($Name)
    {
        $CustomerName = strtolower(trim($Name));
        if (isset(self::$msCustomer[$CustomerName]))
            return self::$msCustomer[$CustomerName];
        $Res = BasicDetail::getDataByName($CustomerName);
        if (count($Res))
            self::$msCustomer[$CustomerName] = $Res['ID'];
        else
            self::$msCustomer[$CustomerName] = 0;
        return self::$msCustomer[$CustomerName];
    }

    /**
     * Get CustomerTypeID by name
     * @param string $Name
     * @return int
     */
    private static function getCustomerTypeIDByName($Name)
    {
        $CustomerType = strtolower(trim($Name));
        if (isset(self::$msCustomerType[$CustomerType]))
            return self::$msCustomerType[$CustomerType];
        $Res = CustomerType::getDataByName($CustomerType);
        if (count($Res))
            self::$msCustomerType[$CustomerType] = $Res['ID'];
        else
            self::$msCustomerType[$CustomerType] = 0;
        return self::$msCustomerType[$CustomerType];
    }
}
?>
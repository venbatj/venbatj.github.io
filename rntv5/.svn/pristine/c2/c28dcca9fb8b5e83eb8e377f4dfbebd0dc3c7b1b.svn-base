<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;
use Rnt\Libs\AERRepository;
use Rnt\Libs\IRepository;

/**
 * ProductRepository
 * 
 * @package Rnt\Masters
 */
class ProductRepository implements IRepository
{
    use AERRepository;

    /**
     * Get table
     * @return string
     */
    final public static function getTable()
    {
        return 'Product';
    }

    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Product P'));
        $Obj->addFlds(array('P.ID','C.CategoryID', 'P.ProductName','V.VariantName','P.Description'));
        $Obj->addOrderFlds('P.CategoryID', 'ASC');
        $Obj->addOrderFlds('P.ProductName', 'ASC');
        $Obj->addOrderFlds('PV.VariantID', 'ASC');
        $Obj->addFldCond('P.Flag', 'R', '!=');
        $Obj->addJoinTbl('Category C','C.ID', 'P.CategoryID','LEFT JOIN');
        $Obj->addJoinTbl('ProductVariant PV','PV.ProductID', 'P.ID','LEFT JOIN'); 
        $Obj->addJoinTbl('Variant V','V.ID', 'PV.VariantID','LEFT JOIN');
        return $Obj->getJoinMultiple(); 
    }

    /**
     * Get all data Product
     * @return array
     */
    public static function getAllDataProduct()
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ID', 'ProductName','Description'));
        $Obj->addOrderFlds('ProductName', 'ASC');
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getMultiple(); 
    }

    /**
     * Get product by CategoryID
     * @param int $CategoryID
     * @return array
     */
    public static function getProductByCategoryID($CategoryID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ID', 'ProductName'));
        $Obj->addFldCond('CategoryID', $CategoryID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addOrderFlds('ProductName', 'ASC');
        return $Obj->getMultiple(); 
    }

    /**
     * Get product by CategoryID
     * @param int $CategoryID
     * @return array
     */
    public static function getCategoryID($CategoryID)
    {
        // print_r($CategoryID);
        // exit;
        $RefIDsStr = "(".implode(", ", $CategoryID).")";
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ID', 'ProductName'));
        $Obj->AddTblCond('CategoryID', $RefIDsStr, 'IN');
        $Obj->addFldCond('Flag', 'R', '!=');
        $Obj->addOrderFlds('ProductName', 'ASC');
        return $Obj->getMultiple(); 
    }

    /**
     * Get data by ID
     * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Product'));
        $Obj->addFlds(array('ID','CategoryID', 'ProductName', 'Description'));
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getSingle();
        $Variant['VariantID'] = self::getVariantByID($ID);
        return array_merge($Res, $Variant);
    }
    /**
     * Get data by Variant ID
     * @param int $ID
     * @return array
     */
    public static function getVariantByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant'));
        $Obj->addFlds(array('VariantID'));
        $Obj->addFldCond('ProductID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        $Res = $Obj->getMultiple();

        $TempArr = array();
        foreach ($Res as $Item){
            $TempArr[] = $Item['VariantID'];
        }
        return $TempArr;
    }
    /**
     * Is exists
     * @param array $Row
     * @return int
     */
    public static function isExists($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addFlds(array('ID'));        

        if (isset($Row['ID']) && $Row['ID'] > 0)
            $Obj->addFldCond('ID', $Row['ID'], '!=');

        $Obj->addFldCond('ProductName', $Row['ProductName']);    
        $Obj->addFldCond('Flag', 'R', '!=');
        
        return count($Obj->getSingle());
    }
    
    public static function updateProduct($Row) {
        if (!isset($Row['ID'])) {
            return false;
        }

        $Obj = new SqlManager();
        $Obj->addTbls('Product');
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond('ID', $Row['ID']);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->update();
    }
    
    /**
     * insert Product Variant
     * @param array $Row
     * @return int
     */
    public static function insertProductVariant($Row)
    {
        foreach ($Row['VariantID'] as $Value){
            $Obj = new SqlManager();
            $Obj->addTbls('ProductVariant');
            $Obj->addFlds(array('ID'));
            $Obj->addFldCond('ProductID', $Row['ID']);
            $Obj->addFldCond('VariantID', $Value);
            $Res = $Obj->getSingle();

            if (!count($Res)){
                $Obj->addTbls('ProductVariant');
                $Obj->addInsrtFlds(array('ProductID' => $Row['ID'],'VariantID' => $Value));
                $Obj->insertSingle();
                $Product['ProductID'] = self::ProductVariantUpdate($Row);
            }
        }
    }
    /**
     *Product Variant Update
     * @param array $Row
     * @return int
     */
    public static function ProductVariantUpdate($Row)
    {
        if (isset($Row['VariantID'])) {
            $ChildObj = new SqlManager();
            $ChildObj->AddTbls('ProductVariant');
            $ChildObj->AddFlds(array('ID', 'VariantID', 'Flag'));
            $ChildObj->AddFldCond('ProductID', $Row['ID']);
            $Result = $ChildObj->GetMultiple();
            $ResultAll = array();
            foreach ($Result as $DesRes) {
                $ResultAll[] = $DesRes['VariantID'];
            }
            foreach ($Row['VariantID'] as $Item) {
                if (count($Result)) {
                    foreach ($Result as $Res) {
                    if (in_array($Res['VariantID'], $Row['VariantID'])) {
                        if ($Res['Flag'] == 'R') {
                            $ChildObj2 = new SqlManager();
                            $ChildObj2->AddTbls('ProductVariant');
                            $ChildObj2->AddInsrtFlds(array('Flag' => 'A'));
                            $ChildObj2->AddFldCond('VariantID', $Res['VariantID']);
                            $ChildObj2->Update();
                        }
                    } else if (!in_array($Res['VariantID'], $Row['VariantID'])) {
                    if ($Res['Flag'] != 'R') {
                        $ChildObj3 = new SqlManager();
                        $ChildObj3->AddTbls('ProductVariant');
                        $ChildObj3->AddInsrtFlds(array('Flag' => 'R'));
                        $ChildObj3->AddFldCond('VariantID', $Res['VariantID']);
                        $ChildObj3->Update();
                    }
                } 
            }
            if (!in_array($Item, $ResultAll)) {
                $ChildObj->AddInsrtFlds(array(
                    'VariantID' => $Item, 
                    'ProductID' => $Row['ID'])
                );
                $ChildObj->InsertSingle();
                }
            } else {
                $ChildObj->AddInsrtFlds(array(
                    'VariantID' => $Item,  
                    'ProductID' => $Row['ID'])
                );
                $ChildObj->InsertSingle();
                }	
            }
        } else {
            $ChildObj2 = new SqlManager();
            $ChildObj2->AddTbls('ProductVariant');
            $ChildObj2->AddInsrtFlds(array('Flag' => 'R'));
            $ChildObj2->AddFldCond('ProductID', $Row['ID']);
            $ChildObj2->Update();
        }
    }
    /**
    * remove Product VariantID
    * @param array $Row
    * @return int
    */
    public static function removeProductVariant($IDArray)
    {
        foreach ($IDArray as $ID){
            $ProductID = self::getProductVariantID($ID);
            self::updateProductVariant(array('ProductID' => $ProductID['ProductID'], 'Flag' => 'R'));
            }
        return true; 
    }
     /**
     * get Product ProductID
     * @param array $Row
     * @return int
     */
    public static function getProductVariantID($ID)
    { 
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant'));
        $Obj->addFlds(array('ProductID'));  
        $Obj->addFldCond('ProductID', $ID);
        return $Obj->getSingle();
    }
    /**
    * update Product ProductID
    * @param array $Row
    * @return int
    */
    public static function updateProductVariant($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant'));
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond('ProductID', $Row['ProductID']);
        return $Obj->update();
    }
    /**
     * Get data table count
     * @param string $SearchTxt
     * @return int
     */
    public static function getDataTblListCount($SearchTxt) 
    {
        $Obj = new SqlManager();
        $Obj->addTbls(array('Product P'));
        $Obj->addFlds(array('COUNT(#P.ID#) RowCount'));
        $Obj->addJoinTbl('ProductVariant PV','PV.ProductID', 'P.ID','LEFT JOIN'); 
        $Obj->addJoinTbl('Variant V','V.ID', 'PV.VariantID','LEFT JOIN');
        $Obj->addFldCond('P.Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('CategoryID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ProductName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('V.VariantName', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
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
        $Obj->addTbls(array('Product '));
        $Obj->addFlds(array('ID','CategoryID', 'ProductName','Description'));
        $Obj->addFldCond('Flag', 'R', '!=');
        if ($SearchTxt != '') {
            $Obj->addFldCond('CategoryID', "%{$SearchTxt}%", 'LIKE', 'AND', '(');
            $Obj->addFldCond('ProductName', "%{$SearchTxt}%", 'LIKE', 'OR');
            $Obj->addFldCond('Description', "%{$SearchTxt}%", 'LIKE', 'OR', '', ')');
        }
        if ($OrderFld != '')
            $Obj->addOrderFlds($OrderFld, $OrderType);
        else
            $Obj->addOrderFlds('ID', 'Desc');
        
        $Obj->addLimit($Index, $Limit);
        $ResData = $Obj->getJoinMultiple();
        for ($i=0; $i<count($ResData); $i++){
            $TempArr = array();
            $childObj = new SqlManager();
            $childObj->addTbls('ProductVariant PV');
            $childObj->addFlds(array('PV.ProductID','V.VariantName'));
            $childObj->addJoinTbl('Variant V', 'PV.VariantID', 'V.ID', 'LEFT JOIN');
            $childObj->addFldCond('PV.ProductID', $ResData[$i]['ID']);
            $childObj->addFldCond('PV.Flag', 'R', '!=');
            $Res = $childObj->getJoinMultiple();

            if ($Res){
                foreach ($Res as $Item){
                    $TempArr[] = $Item['VariantName'];
                }
            }
            else
            $TempArr[] = '';
            $ResData[$i]['VariantName'] = implode(" | ", $TempArr);
        }
        return $ResData;
    }
}
?>
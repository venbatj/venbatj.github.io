<?php
namespace Rnt\Libs;
/**
 * Version 	 : V2
 * ModifiedData : 01/11/2016
 * author 		 : Thirumurugan Nadarajan
 *
 * SqlManager
 * 
 * @package Rnt\Libs
 */
class SqlManager
{
	
	/**
	 * Class Varibles
	 * @DBcon DataBase connection string
	 */
	public static $msDBcon;
	public static $msAesKey;
	public static $msEncryptFlds = array();
	
	private $mFieldNames 		 = array();
	private $mInsrtFields	 	 = array();
	private $mDateFields		 = array();
	private $mTableNames 		 = array();
	private $mJoinTables 	 	 = array();
	private $mTableColumns 		 = array();
	private $mTableNameWithAlias = array();
	private $mFldConds 			 = array();
	private $mOrderFlds 		 = array();
	private $mGroupFlds			 = array();
	private $mLimit			 	 = array();
	
	private $mColumnInfo		 = array("col_alias" => "", "col_name" =>"", "tbl_col_name" => "", "tbl_alais" => "");
	
	public function addFlds($FldArr)
	{
		if ($FldArr == "*")
			$this->mFieldNames = array("*");
		else
			$this->mFieldNames = $FldArr;
	}
	public function addInsrtFlds($Fields)
	{
		$this->mInsrtFields = $Fields;
	}
	
	public function addTbls($TblName)
	{
		if (is_array($TblName)) 
			$this->mTableNames = array_merge($this->mTableNames, $TblName);
		else 
			$this->mTableNames[] = $TblName;
	}
	
	public function addFldCond($FldName, $FldValue, $Condition = "=", $Operator = "AND", $GroupStart = "", $GroupEnd = "")
	{
		if (!is_array($FldValue))
			$FldValue = self::escapeStr($FldValue);
		$this->mFldConds[] = array("fld_name" => $FldName, "fld_value" => $FldValue, "condition" => $Condition, "operator" => $Operator, "group_start" => $GroupStart, "group_end" => $GroupEnd, "is_field" => false);
	}
	
	public function addTblCond($FldName, $FldValue, $Condition = "=", $Operator = "AND", $GroupStart = "", $GroupEnd = "")
	{
		$this->mFldConds[] = array("fld_name" => $FldName, "fld_value" => $FldValue, "condition" => $Condition, "operator" => $Operator, "group_start" => $GroupStart, "group_end" => $GroupEnd, "is_field" => true);
	}

	public function addJoinTbl($JoinTblName, $ParentFldName, $JoinFldName, $JoinType = "JOIN")
	{
		$this->mJoinTables[] = array("JoinTblName" => $JoinTblName, "ParentFldName" => $ParentFldName, "JoinFldName" => $JoinFldName, "JoinType" => $JoinType);
	}

	public function addOrderFlds($FldName, $Order = "ASC")
	{
		if (!is_array($FldName))
			$FldName = array($FldName);
		if (!is_array($Order))
			$OrderType = array(strtoupper($Order));
		else
			$OrderType = $Order;
		$this->mOrderFlds = array("fields" => $FldName, "order_type" => $OrderType);
	}
	public function addGroupFlds($FldName)
	{
		if (is_array($FldName))
			$this->mGroupFlds = $FldName;
		else 	
			$this->mGroupFlds[] = $FldName;
	}
	public function addLimit($StartIndex, $Limit = 10)
	{
		$this->mLimit = array("start_index" => $StartIndex, "limit" => $Limit);
	}
	
	/**
	 * Function getSingle
	 * @TblName		Name of the table, if single table it is a STRING multiple table it is an ARRAY
	 * @Fields		Fields in array item
	 * @Cont		Conditions in array item
	 */
	public function getSingle($ReturnAssoc = true)
	{
		$this->tableNamesWithAlias();
		$QueryOpns 	= $this->getSelectQueryOptions();
		$Sql 		= "SELECT {$QueryOpns['fields']} FROM {$QueryOpns['table']} {$QueryOpns['condition']} {$QueryOpns['groupby']} {$QueryOpns['orderby']} LIMIT 0, 1";
		$ResArr 	= $this->getQuery($Sql, $ReturnAssoc);
		
		if (count( $ResArr ))
			return $ResArr[0];
		return $ResArr;
	}
	public function getMultiple($ReturnAssoc = true)
	{
		$this->tableNamesWithAlias();
		$QueryOpns 	= $this->getSelectQueryOptions();
		$Limit 		= "";
		if (count($this->mLimit))
			$Limit = "LIMIT {$this->mLimit['start_index']}, {$this->mLimit['limit']}";
		
		$Sql 	= "SELECT {$QueryOpns['fields']} FROM {$QueryOpns['table']} {$QueryOpns['condition']} {$QueryOpns['groupby']} {$QueryOpns['orderby']} {$Limit}";
		$ResArr = $this->getQuery($Sql, $ReturnAssoc);
		return $ResArr;
	}
	public function getJoinSingle($ReturnAssoc = true)
	{
		$this->tableNamesWithAlias();
		$JoinTblCond = $this->getJoinTblConditionStr();
		$QueryOpns 	= $this->getSelectQueryOptions();
		$Sql 		= "SELECT {$QueryOpns['fields']} FROM {$QueryOpns['table']} {$JoinTblCond} {$QueryOpns['condition']} {$QueryOpns['groupby']} {$QueryOpns['orderby']} LIMIT 0, 1";
		$ResArr 	= $this->getQuery($Sql, $ReturnAssoc);
		
		if (count( $ResArr ))
			return $ResArr[0];
		return $ResArr;
	}
	public function getJoinMultiple($ReturnAssoc = true)
	{
		$this->tableNamesWithAlias();
		$QueryOpns 	= $this->getSelectQueryOptions();
		$JoinTblCond = $this->getJoinTblConditionStr();
		$Limit 		= "";
		if (count($this->mLimit))
			$Limit = "LIMIT {$this->mLimit['start_index']}, {$this->mLimit['limit']}";
		
		$Sql 	= "SELECT {$QueryOpns['fields']} FROM {$QueryOpns['table']}  {$JoinTblCond} {$QueryOpns['condition']} {$QueryOpns['groupby']} {$QueryOpns['orderby']} {$Limit}";
		$ResArr = self::getQuery($Sql, $ReturnAssoc);
		return $ResArr;
	}
	public function insertSingle()
	{
		$TableName 		= $this->mTableNames[0];
		$InsertFields 	= $this->getDataChangeQueryOptions();
		$FieldStr 		= implode(", ", $InsertFields['fields']);
		$ValueStr 		= implode(", ", $InsertFields['values']);
			
		$Sql 			= "INSERT INTO ".TABLE_PREFIX.$TableName." (".$FieldStr.") VALUES (".$ValueStr.");";
		$Result 		= $this->execQuery($Sql);
		if ($Result)
			return mysqli_insert_id(self::$msDBcon);
		else
			return "E";
	}
	
	public function insertMultiple()
	{
		$TableName 		= $this->mTableNames[0];
		$InsertFields 	= $this->getMultipleDataChangeQueryOptions();
		$FieldStr 		= implode(", ", $InsertFields['fields']);
		$ValueStr 		= implode(", ", $InsertFields['valueset']);
		$Sql 			= "INSERT INTO ".TABLE_PREFIX.$TableName."(".$FieldStr.") VALUES ".$ValueStr.";";
		$Result 		= $this->execQuery($Sql);
		
		if ($Result)
			return mysqli_insert_id(self::$msDBcon);
		else
			return "E";
	}
	
	public function update()
	{
		$this->tableNamesWithAlias();
		$TableName 		= $this->mTableNames[0];
		$UpdFieldStr 	= "";
		$UpdFieldArr	= array();
		$UpdFields 		= $this->getDataChangeQueryOptions();
		$CondStr 		= $this->getConditionStr();
		
		foreach ($UpdFields['fields'] as $key => $Field)
			$UpdFieldArr[] = $Field." = ".$UpdFields['values'][$key];
		$UpdFieldStr 	= implode(", ", $UpdFieldArr);
		$Sql 	= "UPDATE ".TABLE_PREFIX.$TableName." SET {$UpdFieldStr} {$CondStr}";
		$Result 		= $this->execQuery($Sql);
		return $Result;
	}
	
	public static function insertUpdate($TblName, $FieldSet = array())
	{
		$Obj = new SqlManager();
		$Obj->addTbls($TblName);
		
		$UpdFieldStr 	= "";
		$UpdFieldArr 	= array();
		
		$Obj->addInsrtFlds($FieldSet);
		
		$InsertFields	= $Obj->getDataChangeQueryOptions();
		$FieldStr 		= implode(", ", $InsertFields['fields']);
		$ValueStr 		= implode(", ", $InsertFields['values']);
		
		foreach ($InsertFields['fields'] as $key => $Field)
			$UpdFieldArr[] = $Field." = ".$InsertFields['values'][$key];
		$UpdFieldStr = implode(", ", $UpdFieldArr);
		
		$Sql 	= "INSERT INTO ".TABLE_PREFIX.$TblName."(".$FieldStr.") VALUES (".$ValueStr.") ON DUPLICATE KEY UPDATE ".$UpdFieldStr;
		$Result = $Obj->execQuery($Sql);
		return $Result;
	}
	
	private function getDataChangeQueryOptions()
	{
		$FieldNames 			= $FieldValues = array();
		$this->mTableColumns 	= $this->getTableColumns();
		foreach ($this->mInsrtFields as $FieldName => $FieldValue) {
			//$FieldValue = mysqli_real_escape_string(self::$msDBcon, $FieldValue);
			if (!in_array($FieldName, $this->mTableColumns[0])) continue;
			
			$FieldNames[] = $FieldName;
			if (isset($this->mTableColumns[1][$FieldName]))
				$FieldValue = $this->getDBformatDate($this->mTableColumns[1][$FieldName], $FieldValue);
			
			$FieldValues[] = $this->encryptFieldValue($this->mTableNames[0], $FieldName, $FieldValue);
		}
		if (!in_array("Modified", $FieldNames)) {
			$FieldNames[] 	= "Modified";
			$FieldValues[] 	= "'".date("Y-m-d H:i:s")."'"; //"UNIX_TIMESTAMP(UTC_TIMESTAMP())";
		}
		return array("fields" => $FieldNames, "values" => $FieldValues);
	}
	private function getMultipleDataChangeQueryOptions()
	{
		$FieldNames 			= $FieldValues = $FieldValueSet = array();
		$this->mTableColumns 	= $this->getTableColumns();
		$Columns 				= array_keys($this->mInsrtFields[0]);
		
		foreach ($Columns as $Column) {
			if (!in_array($Column, $this->mTableColumns[0])) continue;
			$FieldNames[] = $Column;
		}
		
		foreach ($this->mInsrtFields as $Key => $FieldSet) {
			$FieldValues = array();
			foreach ($FieldNames as $FieldName) {
				//$FieldSet[$FieldName] = mysqli_real_escape_string(self::$msDBcon, $FieldSet[$FieldName]);
				if (isset($this->mTableColumns[1][$FieldName]))
					$FieldSet[$FieldName]	= $this->getDBformatDate($this->mTableColumns[1][$FieldName], $FieldSet[$FieldName]);
				$FieldValues[] 			= $this->encryptFieldValue($this->mTableNames[0], $FieldName, $FieldSet[$FieldName]);
			}
			if (!in_array("Modified", $FieldNames))
				$FieldValues[] 	= "'".date("Y-m-d H:i:s")."'"; //"UNIX_TIMESTAMP(UTC_TIMESTAMP())";
			$FieldValueSet[] = "(".implode(", ", $FieldValues).")";
		}
		if (!in_array("Modified", $FieldNames))
			$FieldNames[] 	= "Modified";
		return array("fields" => $FieldNames, "valueset" => $FieldValueSet);
	}	
	
	private function getSelectQueryOptions()
	{
		$TableNames = $this->mTableNames;
		//$this->mTableNames = $this->getTableNames();
		
		if (count($this->mFieldNames) == 1) {
			if ($this->mFieldNames[0] == "*") {
				$ResFields = $this->getTableColumns();
				$this->mFieldNames 	= $ResFields[0];
				$this->mDateFields 	= $ResFields[1];
			}
		}
		$FieldStr 	= $this->getFieldStr();
		$CondStr 	= $this->getConditionStr();
		$GroupStr 	= $this->getGroupByStr();
		$OrderStr 	= $this->getOrderByStr();
		$Table 		= TABLE_PREFIX.implode(", ".TABLE_PREFIX, $TableNames);
		return array("table" => $Table, "fields" => $FieldStr, "condition" => $CondStr, "groupby" => $GroupStr, "orderby" => $OrderStr);
	}	
	
	private function getFieldStr()
	{
		$FieldStr = "";
		if (count($this->mFieldNames)) {
			foreach ($this->mFieldNames as  $Key => $FieldName) {
				$this->mFieldNames[$Key] = $FieldName = $this->removeMultiSpace($FieldName);
				if (strpos($FieldName, "#") !== false)
					$FieldName = $this->sqlfuncField($FieldName);
			 	else
					$FieldName = $this->decryptField($FieldName, true);
				$FieldNames[$Key] = $FieldName;
			}
		}
		return implode(", ", $FieldNames);
	}
	
	private function getConditionStr()
	{
		$CondStr = "";
		if (count($this->mFldConds)) {
			$CondStr .= " WHERE ";
			foreach ($this->mFldConds as  $Key => $FldCond) {
				if (strpos($FldCond['fld_name'], "#") !== false)
					$FldCond['fld_name'] = $this->sqlfuncField($FldCond['fld_name']);
			 	else
					$FldCond['fld_name'] =  $this->decryptField($FldCond['fld_name']);
				
				/*if(strpos($FldCond['fld_name'], "AES_DECRYPT") !== false) {
					$FldCond['fld_name'] 	= "CONVERT(".$FldCond['fld_name']." USING 'utf8') ";
				}*/

				$this->mFldConds[$Key] = $FldCond;
				
				if ($Key == 0)
					$FldCond['operator'] = "";
				
				if ($FldCond['is_field']) {
					$CondStr .= $FldCond['operator']." ".$FldCond['group_start']." (".$FldCond['fld_name']." ".$FldCond['condition']." ".$FldCond['fld_value'].") ".$FldCond['group_end']." ";
				} else {
					if (strtoupper($FldCond['condition']) == 'BETWEEN') {						
						$CondStr .= $FldCond['operator']." ".$FldCond['group_start']." (".$FldCond['fld_name']." BETWEEN '".$FldCond['fld_value'][0]."' AND '".$FldCond['fld_value'][1]."') ".$FldCond['group_end']." ";
					} else
						$CondStr .= $FldCond['operator']." ".$FldCond['group_start']." (".$FldCond['fld_name']." ".$FldCond['condition']." '".$FldCond['fld_value']."') ".$FldCond['group_end']." ";
				}
			}
		}
		return $CondStr;
	}

	private function getJoinTblConditionStr()
	{
		$JoinCondStr = "";
		if (count($this->mJoinTables)) {
			foreach ($this->mJoinTables as  $Key => $JoinTable) {
				if (strpos($JoinTable['ParentFldName'], "#") !== false)
					$JoinTable['ParentFldName'] = $this->sqlfuncField($JoinTable['ParentFldName']);
			 	else
					$JoinTable['ParentFldName'] =  $this->decryptField($JoinTable['ParentFldName']);

				if (strpos($JoinTable['JoinFldName'], "#") !== false)
					$JoinTable['JoinFldName'] = $this->sqlfuncField($JoinTable['JoinFldName']);
			 	else
					$JoinTable['JoinFldName'] =  $this->decryptField($JoinTable['JoinFldName']);
				

				$JoinCondStr .= " ".$JoinTable['JoinType']." ".TABLE_PREFIX.$JoinTable['JoinTblName']." ON ".$JoinTable['ParentFldName']." = ".$JoinTable['JoinFldName'];
				
			}
		}
		return $JoinCondStr;
	}

	private function getGroupByStr()
	{
		$GroupByStr = "";
		if (count($this->mGroupFlds) ) {
			$GroupByStr  .= " GROUP BY ";
			foreach ($this->mGroupFlds as  $Key => $FieldName) {
				if (strpos($FieldName, "#") !== false) 
					$FieldName = $this->sqlfuncField($FieldName);
				else
					$FieldName = $this->decryptField($FieldName);
				
				$GroupFields[$Key] = $FieldName;
			}
			return $GroupByStr.implode(", ", $GroupFields);
		}
		return "";
	}
	
	private function getOrderByStr()
	{
		$OrderByStr = "";
		if (count($this->mOrderFlds)) {
			$OrderByStr = " ORDER BY ";
			foreach ($this->mOrderFlds['fields'] as $Key => $OrderField) {
				if (strpos($OrderField, "#") !== false)
					$OrderField = $this->sqlfuncField($OrderField);
				else
					$OrderField = $this->decryptField($OrderField);
				$this->mOrderFlds['fields'][$Key] = $OrderField;
			}
			foreach ($this->mOrderFlds['fields'] as $Key => $OrdFld) {
				$OrdTyp = 'ASC';
				if (isset($this->mOrderFlds['order_type'][$Key]) && $this->mOrderFlds['order_type'][$Key] != '')
					$OrdTyp = $this->mOrderFlds['order_type'][$Key];
				$OrderByStr .= $this->mOrderFlds['fields'][$Key]." ".$OrdTyp.", ";
			}
				
			return substr($OrderByStr , 0, -2);
			//return  $OrderByStr.implode(", ", $this->mOrderFlds['fields'])." ".$this->mOrderFlds['order_type'];
		}
		return $OrderByStr;
	}
	
	
	private function sqlfuncField($FieldName)
	{
		$FieldName = $this->removeMultiSpace($FieldName);
		while (strpos($FieldName, "#") !== false) {
			$Pos1 			= strpos($FieldName, "#");
			$FieldName 		= substr_replace($FieldName, "|", $Pos1, 1);
			$Pos2 			= strpos($FieldName, "#");
			$FieldName 		= substr_replace($FieldName, "|", $Pos2, 1);
			$StrLen 		= $Pos2 - $Pos1;
			$SubFieldStr 	= substr($FieldName, $Pos1, $StrLen + 1);
			$SubField 		= str_replace("|", "", $SubFieldStr);
			
			$SubField2 		= $this->decryptField($SubField);
			$FieldName 		= str_replace($SubField, $SubField2, $FieldName);
		}
		$FieldName = str_replace("|", "", $FieldName);
		return trim($FieldName);
	}
	
	private function decryptField($FieldName, $IsAlias = false)
	{
		$ColumnName = $FieldName;
		$FieldInfo  = $this->getColumnInfo($FieldName);
		if ($this->isEncryptField($FieldInfo['tbl_name'], $FieldInfo['tbl_col_name'])) {
			$ColumnName = "CONVERT(AES_DECRYPT(".$FieldInfo['col_name'].", '".self::$msAesKey."') USING 'utf8') ";
			if ($FieldInfo['col_alias'] != "")
				$ColumnName .= $FieldInfo['col_alias'];
			else if($IsAlias)
				$ColumnName .= $FieldInfo['tbl_col_name'];
		}
		return trim($ColumnName);
	}
	
	private function getColumnInfo($FieldName)
	{
		$FieldInfo = array();
		$ColumnAlias = $TableAlias = "";
		$ColumnName  = $FieldName;
		
		$FieldNameArr = explode(" ", $FieldName);
		if (count($FieldNameArr) > 1) {
			$ColumnAlias =  $FieldNameArr[1];
			$ColumnName  = $FieldName = $FieldNameArr[0];
		}
		$TableColumnName = $ColumnName;
		
		$FieldNameArr = explode(".", $FieldName);
		if (count($FieldNameArr) > 1) {
			$TableAlias  	 = $FieldNameArr[0];
			$TableColumnName = $FieldNameArr[1];
		}
		
		if (count($this->mTableNameWithAlias) > 1 ) {
			if (count($FieldNameArr) > 1) 
				$TableName  = $this->mTableNameWithAlias[$TableAlias];
			else
				$TableName  = "";
		} else
			$TableName = $this->mTableNameWithAlias[0];
			//$TableName = reset($this->mTableNameWithAlias);
		
		$FieldInfo["col_alias"] 	= $ColumnAlias; 
		$FieldInfo["col_name"] 		= $ColumnName; 
		$FieldInfo["tbl_alais"] 	= $TableAlias;
		$FieldInfo["tbl_col_name"] 	= $TableColumnName; 
		$FieldInfo["tbl_name"] 		= $TableName;
		
		return $FieldInfo;
	}

	public function tableNamesWithAlias()
	{
		foreach ($this->mTableNames as $TableName) {
			$TableName 	= $this->removeMultiSpace($TableName);
			$TableAlias = $TableName;
			$TableArr 	= explode(" ", $TableName);
			if (count($TableArr) == 2)
				$this->mTableNameWithAlias[$TableArr[1]] = $TableArr[0];
			else 
				$this->mTableNameWithAlias[] = $TableName;
		}

		foreach ($this->mJoinTables as $Table) {
			$TableName 	= $this->removeMultiSpace($Table['JoinTblName']);
			$TableAlias = $TableName;
			$TableArr 	= explode(" ", $TableName);
			if (count($TableArr) == 2)
				$this->mTableNameWithAlias[$TableArr[1]] = $TableArr[0];
			else 
				$this->mTableNameWithAlias[] = $TableName;
		}
	}
	
	private function encryptFieldValue($TableName, $FieldName, $FielValue)
	{
		$FielValue = addslashes($FielValue);
		if ($this->isEncryptField($TableName, $FieldName))
			$FielValue = "AES_ENCRYPT('".$FielValue."', '".self::$msAesKey."') ";
		else
			$FielValue = "'".addslashes($FielValue)."'";
		return $FielValue;
	}
	
	private function isEncryptField($TableName, $FieldName)
	{
		//echo "<br /> Table: ".$TableName."  -  Column Name: ".$FieldName;
		if (isset(self::$msEncryptFlds[$TableName])) {
			if (in_array($FieldName, self::$msEncryptFlds[$TableName])) {
				//echo "<br /> Table: ".$TableName."  -  Column Name: ".$FieldName;
				return true;
			}
		}
		return false;
	}
	
	private function getTableNames()
	{
		$TableNames = array();
		foreach ($this->mTableNames as $TableName) {
			$TableName 	= $this->removeMultiSpace($TableName);
			$TempArr 	= explode(" ", $TableName);
			if (count($TempArr) > 1)
				$TableNames[$TempArr[count($TempArr) - 1]] = $TempArr[0];
			else
				$TableNames[] = $TableName;
		}
		return $TableNames;
	}
		
	private function getTableColumns()
	{
		$Fields = $DateFields = array();
		$Sql = "SHOW COLUMNS FROM `".TABLE_PREFIX.$this->mTableNames[0]."` FROM `".DATABASE_NAME."`";
		$Res = $this->getQuery($Sql);

		foreach ($Res as $Item) {
			$Fields[] = $Item['Field'];
			if (in_array($Item['Type'], array('date', 'datetime', 'timestamp', 'time', 'year')))
				$DateFields[$Item['Field']] = $Item['Type'];
		}
		return array($Fields, $DateFields);
	}
	public function getTableColumnList($TblName)
	{
		$Fields = $DateFields = array();
		$Sql = "SHOW COLUMNS FROM `".TABLE_PREFIX.$TblName."` FROM `".DATABASE_NAME."`";
		$Res = $this->getQuery($Sql);
		
		$TblCols = array();
		foreach ($Res as $Item)
			$TblCols[] = $Item['Field'];
		return $TblCols;
	}
	
	public function getQuery($Sql, $ReturnAssoc = true)
	{
		$ResArr = array();
		$Result = $this->execQuery($Sql);
		while ($Row = mysqli_fetch_array($Result, $ReturnAssoc ? MYSQLI_ASSOC : MYSQLI_NUM)) {
			foreach ($Row as $Key => $Data) 
				$Row[$Key] = stripslashes($Data);
			$ResArr[] = $Row;
		}
		mysqli_free_result($Result);
		return $ResArr;
	}
	public function isTblExist($TblName)
	{
		$Sql = "SHOW TABLES LIKE '".$TblName."';";
		$Result = $this->execQuery($Sql);
		$RowCount = mysqli_num_rows($Result);
		mysqli_free_result($Result);
		return $RowCount;
	}
	public function execQuery($Sql)
	{
		$Sql = $this->removeMultiSpace(trim($Sql));
		
		if (QUERY_LOG) {
			$Time   = date("Y-m-d H:i:s");
			$fp = fopen(SERVICE_PATH."logs/query/".date('Ymd_')."QUERY.txt", 'a+');
			fwrite($fp, "\n".$Time." || ".$Sql);
			fclose($fp);
		}
		
		$Result = mysqli_query(self::$msDBcon, $Sql);
		
		if (!$Result) {
			$Time   = date("Y-m-d H:i:s");
			$err_str = $Sql."|||ERROR :".mysqli_error(self::$msDBcon)."\n";
			$fp = fopen(SERVICE_PATH."logs/error/query/".date('Ymd')."_ERROR.txt", 'a+');
			fwrite($fp, $Time." || ".$err_str);
			fclose($fp);
		}
		return $Result;
	}

	public static function escapeStr($FldValue)
	{
		return mysqli_real_escape_string(self::$msDBcon, $FldValue);
	}

	public static function prefixTableName($TableName)
	{
		return TABLE_PREFIX.$TableName;
	}
	
	private function getDBformatDate($FieldType, $DateValue)
	{
		if ($FieldType == 'date' && $DateValue != "")
			return date(DB_DATE_FORMAT, strtotime($DateValue));
		else if ($FieldType == 'datetime' && $DateValue != "")
			return date(DB_DATETIME_FORMAT, strtotime($DateValue));
		else if ($FieldType == 'timestamp' && $DateValue != "")
			return date(DB_TIMESTAMP_FORMAT, strtotime($DateValue));
		else if ($FieldType == 'time' && $DateValue != "")
			return date(DB_TIME_FORMAT, strtotime($DateValue));				
		return "0000-00-00";
	}
	
	private function removeMultiSpace($Str)
	{
		return trim(preg_replace('/\s+/', ' ',trim($Str))); // Replacing multiple spaces with a single space
	}	
}

/* DATABASE CONNCTION STRING ASIGNED TO CLASS STATIC VARIBLE */
SqlManager::$msDBcon 		= $DbCon;
SqlManager::$msEncryptFlds 	= $ENCRYPT_FLDS;
SqlManager::$msAesKey 		= AES_KEY;

?>
<?php
namespace Rnt\Libs;

/**
 *
 * DataTable
 * 
 * @package Rnt\Libs
 */
class DataTable
{
	/**
     * Get attributes
	 * @param array $Req
	 * @param array $DataTableCols
     * @return array
     */
	public static function getAttributes($Req, $DataTableCols)
	{
		if (!isset($Req['iDisplayStart']))
			$StartIndex = 0;
		else
			$StartIndex = $Req['iDisplayStart'];
		
		if (!isset($Req['iDisplayLength']))
			$Limit = 10;
		else
			$Limit = $Req['iDisplayLength']; 
		
		$DataTableSearch = '';
		if (isset($Req['sSearch']))
			$DataTableSearch = ($Req['sSearch']);
		
		$DataTableOrderCol = '';
		$DataTableOrderBy  = '';
		if (isset($Req['iSortCol_0'])) {
			$DataTableOrderCol 	= $DataTableCols[$Req['iSortCol_0']];
			$DataTableOrderBy 	= $Req['sSortDir_0'];
		}

		return array(
			'StartIndex' => $StartIndex,
			'Limit' => $Limit,
			'DataTableSearch' => $DataTableSearch,
			'DataTableOrderCol' => $DataTableOrderCol,
			'DataTableOrderBy' => $DataTableOrderBy
		);
	}

	/**
     * Get filters
	 * @param array $Req
	 * @param array $DataTblCols
	 * @param int $TotalRows
	 * @param array $RemoveKeys
     * @return array
     */
	public static function getFilters($Req, $DataTblCols = array(), $TotalRows = 0, $RemoveKeys = array()) {
		$RemoveKeys = array_merge($RemoveKeys, array('sEcho', 'iColumns', 'sColumns', 'iSortCol', 'sSortDir', 'iDisplayStart', 'iDisplayLength', 'iSortingCols', 'iSortCol_0', 'sSortDir_0', 'bRegex', 'FunctionName', 'JWT', '_'));
		$FilterArr = $Req;

		foreach ($FilterArr as $Key => $Value) {			
			if ($Key == 'iSortCol_0' && $Value > 0) {
				$FilterArr['Order By'] = $DataTblCols[$Value].' | '.$FilterArr['sSortDir_0'];
			}
			if ($Key == 'iDisplayStart') {
				if ($TotalRows > 0){
					if ($FilterArr['iDisplayLength'] <=  $TotalRows) {
						$FilterArr['Rows'] = ($FilterArr['iDisplayStart'] + 1).' - '.($FilterArr['iDisplayStart'] + $FilterArr['iDisplayLength']).' OF '.$TotalRows;
					} else {
						$FilterArr['Rows'] = ($FilterArr['iDisplayStart'] + 1).' - '.($FilterArr['iDisplayStart'] + $TotalRows).' OF '.$TotalRows;
					}
				} else
					$FilterArr['Rows'] = 0;
			}
			if ($Value == '' || in_array($Key, $RemoveKeys) || strpos($Key, 'mDataProp') !== false || strpos($Key, 'bSortable') !== false || strpos($Key, 'bRegex_') !== false || strpos($Key, 'bSearchable') !== false)
				unset($FilterArr[$Key]);
		}
		return $FilterArr;
	}
}
?>
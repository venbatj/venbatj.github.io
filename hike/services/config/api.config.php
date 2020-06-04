<?php
	define('QUERY_LOG', true);
	define('VERSION', 'v5');
	define('DEPLOYMENT_FLAG', 'r');
	//define('DEPLOYMENT_FLAG', 'd');

	/**
	 * PATH SETTINGS
	 *
	 * @ SERVICE_PATH 		: PHP service path
	 * @ ROOT_PATH 			: Application root dir path
	 * @ HOST_PATH 			: Application host path
	 * @ DATASTORAGE_PATH 	: Application local storage path
	 */
	define('SERVICE_PATH' 		, dirname(__DIR__).'/');
	define('ROOT_PATH'			, SERVICE_PATH.'../');

	if (is_int(stripos($_SERVER['HTTP_HOST'], 'localhost')) === false) {
		define('HOST_PATH'	, (isset($_SERVER['HTTPS']) ? "https":"http")."://$_SERVER[HTTP_HOST]/app");
		define('SERVICE_HOST_PATH'	, (isset($_SERVER['HTTPS']) ? "https":"http")."://$_SERVER[HTTP_HOST]/services");
		define('STORAGE_HOST_PATH'	, (isset($_SERVER['HTTPS']) ? "https":"http")."://$_SERVER[HTTP_HOST]/data-storage");
	} else {
		define('HOST_PATH'	, (isset($_SERVER['HTTPS']) ? "https":"http")."://$_SERVER[HTTP_HOST]/ratis/v5/app");
		define('SERVICE_HOST_PATH'	, (isset($_SERVER['HTTPS']) ? "https":"http")."://$_SERVER[HTTP_HOST]/ratis/v5/services");
		define('STORAGE_HOST_PATH'	, (isset($_SERVER['HTTPS']) ? "https":"http")."://$_SERVER[HTTP_HOST]/ratis/v5/data-storage");
	}

	/*
	 * PHP INI SETTINGS
	 *
	 */
	ini_set('max_execution_time'	, 0);
	ini_set('error_reporting' 		, E_ALL);
	ini_set('log_errors' 			, TRUE);
	ini_set('html_errors' 			, FALSE);
	ini_set('error_log' 			, SERVICE_PATH.'log/error/php/error.log');
	ini_set('display_errors' 		, TRUE);
	ini_set('upload_max_filesize' 	, '40M');
	ini_set('post_max_size' 		, '40M');
	 ini_set('max_input_vars' 		, 10000);
    
   	 date_default_timezone_set('UTC');

	/**
	 * DATABASE SETTINGS
	 *
	 * @ DATABASE_HOST 		: Database host path
	 * @ DATABASE_NAME 		: Name of the Database
	 * @ DATABASE_USER_NAME : Database user name
	 * @ DATABASE_PASSWORD 	: Database password
	 * @ TABLE_PREFIX 	    : Table prefix
	 */
	// define('DATABASE_HOST'		, 'db.hyjiya.com');
	// define('DATABASE_NAME'		, 'rntv5_dev');	
	// define('DATABASE_USER_NAME'	, 'rntapp');
	// define('DATABASE_PASSWORD'	, 'rnt$2018');
	// define('TABLE_PREFIX'		, 'rnt_');
	
	define('DATABASE_HOST'		, 'localhost');
	define('DATABASE_NAME'		, 'test');	
	define('DATABASE_USER_NAME'	, 'root');
	define('DATABASE_PASSWORD'	, '');
	define('TABLE_PREFIX'		, 'rnt_');

	$DbCon = mysqli_connect(DATABASE_HOST, DATABASE_USER_NAME, DATABASE_PASSWORD, DATABASE_NAME);
	if (!$DbCon) {
		echo json_encode(array('S' => false, 'M' => mysqli_error()));
		exit;
	}
	
	// DATE FORMATES
	define('DB_DATE_FORMAT'					, 'Y-m-d');
	define('DB_DATETIME_FORMAT'				, 'Y-m-d H:i:s');
	define('DB_TIMESTAMP_FORMAT'			, 'Y-m-d H:i:s');
	define('DB_TIME_FORMAT'					, 'H:i:s');
	define('XLSX_DATE_FORMAT'				, 'd/m/Y');
	define('DISPLAY_DATE_FORMAT'			, 'm/d/Y');
	define('DISPLAY_24_TIME_FORMAT'			, 'H:i:s');
	define('DISPLAY_12_TIME_FORMAT'			, 'H:i:s A');
	define('DISPLAY_TIMESTAMP_FORMAT'		, 'm/d/Y H:i:s');
	define('DISPLAY_FULL_DATE_FORMAT'		, 'F d, Y');
	define('DISPLAY_FULL_TIME_FORMAT'		, 'H:i:s');
	define('DISPLAY_FULL_TIMESTAMP_FORMAT'	, 'F d, Y h:i:s A');

	// JWT
	define('JWT_ENC_KEY', '4ea5d5059fe13cd38e7f16a6c2f80ec6d976176b');
	
	//JWT For Web Service
	define('ACCESS_KEY', 'd472827a7e3034aa723b4d5b263553f7');  //sanjeevitech
	define('SECURITY_KEY', '925b2a7a5267fdb5634aff7599d024f8'); //sanjeevisoln
    
	require_once 'classes/Libs/Cryptography.php';
	require_once 'config/aes.fields.php';
    require_once 'classes/Libs/SqlManager.php';

    // VALIDATE TOKEK
	$IsJWT = false;
	$GLOBALS['TimezoneOffset'] = 0;
	if (isset($_REQUEST['JWT'])) {
		$IsJWT = true;
		$JWTData = Rnt\Libs\Cryptography::Decryption($_REQUEST['JWT']);

		if (!isset($JWTData['LoginID']) || $JWTData['LoginID'] == '' || $JWTData['LoginID'] == 0) {
			echo json_encode(array('S' => false, 'M' => 'Invalid Token'));
			exit;
		}
		
		foreach ($JWTData as $Key => $Value) {
			$GLOBALS[$Key] = $Value;
			if ($Key == 'TimezoneOffset')
				Utils::$msUserTimezoneOffset = -($Value * 60);
		}

		unset($_REQUEST['JWT']);
		unset($JWTData);
		unset($Key);
		unset($Value);
	}

	require_once 'config/file.config.php';
	require_once 'config/email.config.php';
?>
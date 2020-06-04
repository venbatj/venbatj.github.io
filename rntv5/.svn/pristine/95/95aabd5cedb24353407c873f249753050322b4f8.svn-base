<?php

	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    if (!isset($_POST['EndPoint']) || $_POST['EndPoint'] == '') {
        echo json_encode(array('S' => false, 'M' => 'Endpoint Not Found'));
        exit;
    }

    $EPArray = explode('/', $_POST['EndPoint']);
    $FunctionName = array_pop($EPArray);
    $EndPoint = implode(DIRECTORY_SEPARATOR, $EPArray);

    if (!file_exists('controller/'.$EndPoint.'.php')) {
        echo json_encode(array('S' => false, 'M' => 'Controller Not Found'));
        exit;
    }

    spl_autoload_register(function($ClassName) {
        $ClassName = str_replace('Rnt'.DIRECTORY_SEPARATOR, '', $ClassName);
        if (!file_exists('classes/'.$ClassName.'.php')) {
            $ClassName = str_replace('Rnt\\', '', $ClassName);
            $ClassName = str_replace('\\', '/', $ClassName);
            $ClassName = str_replace('PHPExcel_', 'Libs/PHPExcel/', $ClassName);
            $ClassName = str_replace('_', '/', $ClassName);
        }
        if (file_exists('classes/'.$ClassName.'.php'))
            require_once 'classes/'.$ClassName.'.php';
    });

    require_once 'config/api.config.php';    
    require_once 'controller/'.$EndPoint.'.php';

    $EndPoint = 'Rnt'.DIRECTORY_SEPARATOR .'Controller'.DIRECTORY_SEPARATOR.$EndPoint;
	$CLName = str_replace(DIRECTORY_SEPARATOR, '\\', $EndPoint);
    if (!method_exists($CLName, $FunctionName)) {
        echo json_encode(array('S' => false, 'M' => 'Function Not Found'));
        exit;
    }

    unset($_POST['EndPoint']);
    unset($_REQUEST['EndPoint']);

    try {
        $Response = call_user_func_array(array($CLName, $FunctionName), array($_REQUEST, $GLOBALS, $_FILES));
        echo json_encode($Response);
    } catch (Exception $E) {
        echo json_encode(array('S' => false, 'M' => $E));
    }
    
    exit;
?>
<?php
    //require_once 'config/api.config.php';
    
    if (!isset($_GET['key']) || $_GET['key'] == '') {
        echo 'File not found';
        exit;
    }

    $Path = base64_decode(urldecode($_GET['key']));

    $FileNameArr = explode(DIRECTORY_SEPARATOR, $Path);
    $FileName = array_pop($FileNameArr);

    if (!file_exists($Path)) {
        echo 'File not found';
        exit;
    }

    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $FileName . '"');
    header("Pragma: no-cache");
    header('Expires: 0');
    readfile($Path);
?>
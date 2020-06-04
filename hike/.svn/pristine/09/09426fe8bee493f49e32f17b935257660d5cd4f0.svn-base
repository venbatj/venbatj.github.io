<?php 
namespace Rnt\Libs;
class Cryptography
{		

	public static function Encryption($Value)
	{
		$Salt = openssl_random_pseudo_bytes(8);
		$Salted = '';
		$Dx = '';
		while (strlen($Salted) < 48) {
			$Dx = md5($Dx.JWT_ENC_KEY.$Salt, true);
			$Salted .= $Dx;
		}
		$Key = substr($Salted, 0, 32);
		$Iv  = substr($Salted, 32, 16);
		$EncryptedData = openssl_encrypt(json_encode($Value), 'aes-256-cbc', $Key, true, $Iv);
		$Data = array("ct" => base64_encode($EncryptedData), "iv" => bin2hex($Iv), "s" => bin2hex($Salt));
		return json_encode($Data);
	}

	public static function Decryption($jsonString)
	{
		$JsonData = json_decode($jsonString, true);
		try {
			$Salt = hex2bin($JsonData["s"]);
			$Iv  = hex2bin($JsonData["iv"]);
		} catch(Exception $E) { return null; }
		$Ct = base64_decode($JsonData["ct"]);
		$ConcatedPassphrase = JWT_ENC_KEY.$Salt;
		$Md5 = array();
		$Md5[0] = md5($ConcatedPassphrase, true);
		$Result = $Md5[0];
		for ($i = 1; $i < 3; $i++) {
			$Md5[$i] = md5($Md5[$i - 1].$ConcatedPassphrase, true);
			$Result .= $Md5[$i];
		}
		$Key = substr($Result, 0, 32);
		$Data = openssl_decrypt($Ct, 'aes-256-cbc', $Key, true, $Iv);
		return json_decode($Data, true);
	}
}
	
?>
<?php

define('CACHE_DURATION', 60 * 60 * 24);
define('TIMEOUT', 5);
define('CACHE_FOLDER', trailingslashit(dirname(__FILE__) . "/cache"));

function trailingslashit($string) {
	return untrailingslashit($string) . '/';
}
function untrailingslashit($string) {
	return rtrim($string, '/');
}
if (!isset($_REQUEST['url']))
	return;
$url = stripslashes($_REQUEST['url']);
if (!trim($url))
	exit;
class UN_Proxy {

	function __construct($url){
		$this->ensure_cache_folder();
		if (!$this->has_in_cache($url)){
			if ($this->download_file($url))
				$this->send_file($url);
		} else {
			$this->send_file($url);
		}
		$this->cleanup();
	}

	function has_in_cache($url){
		return file_exists($this->get_cache_path($url, true)) 
			&& file_exists($this->get_cache_path($url, false));
	}

	function cleanup(){
		$handle = opendir($cache_folder = $this->get_cache_folder());
		$now = time();
		while (false !== ($file = readdir($handle))){
			$path = trailingslashit($cache_folder) . $file;
			if (is_file($path)){
				if (filectime($path) < $now - CACHE_DURATION){
					unlink($path);
				}
			}
		}
	}

	function download_file($url){
		global $http_response_header;
		if (FALSE === ($content = file_get_contents($url))){
			echo "Error fetching file";
			exit;
		}
		file_put_contents($this->get_cache_path($url, true), $content);
		file_put_contents($this->get_cache_path($url, false), json_encode($http_response_header));
		return true;
	}

	function ensure_cache_folder(){
		if (!(file_exists($this->get_cache_folder()) && is_dir($this->get_cache_folder()))){
			mkdir($this->get_cache_folder());
		}
	}

	function get_cache_folder(){
		return CACHE_FOLDER;
	}

	function send_file($url){
		$handle = fopen($path = $this->get_cache_path($url, true), 'r');
		$meta = json_decode(file_get_contents($this->get_cache_path($url, false)), true);
		header("Content-type: " . $meta['content-type']);
		header("Content-length: " . filesize($path));
		while($chunk = fread($handle, 16384)){
			echo $chunk;
		}
	}

	function get_cache_path($url, $data = true){
		return $this->get_cache_folder() . $this->get_hash($url) . ($data ? ".cache" : '.meta');
	}
	
	function get_hash($url){
		return md5("un_proxy" . $url);
	}
}

new UN_Proxy($url);
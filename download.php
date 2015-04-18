<?php

if (!isset($_GET['key'])) {
	die('Invalid key');
}

$origKey = $_GET['key'];
$buildKey = (string)intval($origKey, 16);

$modules = json_decode(file_get_contents('build/modules.en.json'), TRUE);

if(strlen($buildKey) !== count($modules)){
	die('Invalid key length');
}

if(file_exists('build/cache/' . $origKey)){
	header('Content-Type: application/zip');
	readfile('build/cache/' . $origKey);
	die();
}

$chosenModules = array();

$i = 0;
foreach($modules as $k => $v){
	if(substr($buildKey, $i, 1) == '1'){
		$chosenModules[$k] = $v;
		if(count($v['dependencies'])){
			foreach($v['dependencies'] as $dep){
				$chosenModules[$dep] = $modules[$dep];
			}
		}
	}
	$i++;
}

$files = array();

foreach($chosenModules as $v){
	foreach($v['files'] as $f){
		$files[$f] = TRUE;
	}
}

$coreCode = file_get_contents('build/src/gamekit.js');

preg_match_all('#//@@include\(\'(.+?)\'\);#', $coreCode, $includes);

foreach($includes[1] as $k => $v){
	$replace = '';

	if(isset($files[$v])){
		$replace = file_get_contents('build/src/' . $v);
	}

	$coreCode = str_replace($includes[0][$k], $replace, $coreCode);
}

function compressCode($code) {
    $data = array(
            'compilation_level' => 'SIMPLE_OPTIMIZATIONS',
            'output_format' => 'text',
            'output_info' => 'compiled_code',
            'js_code' => $code
    );

    $c = curl_init('http://closure-compiler.appspot.com/compile');
    //$c = curl_init('http://chris-kiss.dyndns.org/capture.php');
    curl_setopt($c, CURLOPT_FRESH_CONNECT, TRUE);
    curl_setopt($c, CURLOPT_FORBID_REUSE, 1);
    curl_setopt($c, CURLOPT_POST, TRUE);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($c, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($c, CURLOPT_FOLLOWLOCATION, FALSE);

    return curl_exec($c);
}

$compressedCode = compressCode($coreCode);
$legal = file_get_contents('build/legal.txt');

$zip = new ZipArchive();
if ($zip->open('build/cache/' . $origKey, ZIPARCHIVE::CREATE) === TRUE) {

    $zip->addFromString('gamekit.js', $coreCode);
    $zip->addFromString('gamekit.min.js', $legal . $compressedCode);

    $zip->close();
    chmod('lib/buildcache/' . $origKey, 0777);

    header('Content-Type: application/zip');
    readfile('build/cache/' . $origKey);
    die();
}
else {
    header('HTTP/1.0 500 Internal Server Error');
    die('Error while creating your package.');
}
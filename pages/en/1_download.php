<?php

	global $docEngine;

	$lang = $docEngine->language;

	$modules = json_decode(file_get_contents('docs/build/modules.' . $lang . '.json'), TRUE);

	$i = 0;
	foreach($modules as $k => $v){
		$modules[$k]['key'] = $k;
		$modules[$k]['index'] = $i;
		$i++;
	}

	$docEngine->addCSSFile('/docs/assets/moduleList.css');
	$docEngine->addJavascriptFile('//cdn.jsdelivr.net/jquery/2.1.3/jquery.js');
	$docEngine->addJavascriptFile('/docs/assets/customBuild.js');

	$vars['modules'] = $modules;
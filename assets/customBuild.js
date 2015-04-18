(function (){
	'use strict';

	$('.makeBuild').on('click', function(e){

		var modules = [];

		for(var i = 0; i < window.totalModules; i++){
			modules.push(0);
		}

		$.each($('.moduleList :checked'), function(){
			var index = $(this).attr('data-index');
			modules[index] = 1;
		});

		modules = Number(modules.join('')).toString(16);

		$(this).attr('href', '../../docs/download.php?key=' + modules);
	});
})();
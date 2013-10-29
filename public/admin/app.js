/**
*  Module
*
* Description
*/
angular.module('admin', ['adminServices']);

$(function(){
	var $nav = $('.nav li'),
		$section = $('section');

	$('.textarea').wysihtml5({ // init text editor
		stylesheets: false,
		'font-styles': false,
		lists : false,
		emphasis : false
	});

	$section.not('#main').hide(); // hide sections

	$nav.on('click', function(){
		var $this = $(this);
		$nav.removeClass('active');
		$this.addClass('active'); // add class active to current link

		$section.hide();
		$($this.children('a').attr('href')).show(); // show curent section
	});

	var hash = window.location.hash;

	if( !$(hash).length ) return;
	$nav.find('a[href="'+hash+'"]').trigger('click');
});
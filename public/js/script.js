(function(){
	var app = {
		container : $('#container'),
		sections : $('#container').find('section'),
		links : $('.link'),
		aboutDiv : $('#about .div'),
		serviceDiv : $('#service .div'),
		contactText : $('#contacts .text'),
		home : $('.home'),
		init : function(){
			this.setSectionHeight();
			this.links.on('click', $.proxy(app.scroll, app));
			this.niceScroll = $('#scroll').getNiceScroll();
			this.workSlider();
			this.crateMap();
			$('#works .div, .goback').hover(function(){
				$(this).toggleClass('shadow');
			});
			if( window.location.hash !== '' ){
				$('.now').removeClass('now');
				$(window.location.hash).addClass('now');
				this.links.filter('[href="'+window.location.hash+'"]').addClass('active');
				this.setContainerHeight();

				if(  window.location.hash !== '#main' )
					this.home.show();
			}

			
		},
		setSectionHeight : function(){
			this.sections.each(function(){
				var $this = $(this),
					h = $this.children('.wrapper-section').height() + 99;
				$this.height(h);
			});
			this.setContainerHeight();
		},
		setContainerHeight : function(){
			var h = $('.now').height();
			this.container.height(h);
		},
		scroll : function(e){
			e.preventDefault();

			var id = $(e.target).attr('href') || $(e.target).parents('a').attr('href'),
				$element = $(id),
				_this = this;

			if( !id || !$element.length ) return;

			this.links.removeClass('active');
			$('[href="'+id+'"]').addClass('active');

			var section = $element.prevAll('section');
			var h = 0;
			section.each(function(){
				h += $(this).height();
			});
			$('.now').removeClass('now');
			$element.addClass('now');
			// run animation
			switch (id){
				case '#about' :
					this.animateAbout();
					break;
				case '#service' :
					this.animateService();
					break;
				case '#works':
					this.crateVideoWork();
					break;
				case '#contacts' :
					this.animateContacts();
					break;
			}

			// scroll container
			this.setContainerHeight();
			this.container.animate({'scrollTop' : h }, 1000, function(){ 
				$('#scroll').getNiceScroll().resize();
				if( $('.now').attr('id') === 'main' )
					_this.home.hide();
				else
					_this.home.css('display','inline-block');
			});
		},
		workSlider : function(){
			var _this = this;
			$('#works').on('click', '.div', $.proxy(app.showWork,app));
			$('.goback').on('click', slideToWorks);

			function slideToWork () {
				$('.slider-works').css('margin-left','-1100px');
				_this.setSectionHeight();
			};

			function slideToWorks (e) {
				e.preventDefault();
				$('.slider-works').css('margin-left','0');
				setTimeout(function(){
					$('.video-block').tubeplayer('destroy');
				}, 600);
			}

		},
		showWork : function(e){
			e.preventDefault();
			var id = $(e.target).data('id') || $(e.target).parents('.div').data('id'),
				_this = this;
			$.get('/admin/getItem', {id:id})
				.done(function(result){
					_this.renderWork(result);
				});
		},
		renderWork : function(result){
			var _this = this;
			$('.title-job').text(result.title);
			$('.one-work .description').html(result.description);
			$('.img-block').hide();
			if( result.id_video === '' ){
				$('.video-block').hide();
				$('.img-block').children('img').attr('src', result.file);
			} else{
				$('.video-block').show();
				setTimeout(function(){
					$('.video-block').tubeplayer({
						width: 961, // the width of the player
						height: 541, // the height of the player
						allowFullScreen: "true", // true by default, allow user to go full screen
						initialVideo: result.id_video, // the video that is loaded into the player
						preferredQuality: "default" // preferred quality: default, small, medium, large, hd720
					});
					_this.container.height($('.one-work').height() + 100);
					_this.setSectionHeight();
				}, 600);
			}
			this.slideToWork();
			
		},
		slideToWork : function(){
			$('.slider-works').css('margin-left','-1100px');
		},
		crateMap : function(){
			var mapOptions = {
				center: new google.maps.LatLng(-34.397, 150.644),
				zoom: 11,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('map'),mapOptions);
			var image = 'img/marker.png';
			var myLatLng = new google.maps.LatLng(-34.397, 150.644);
			var beachMarker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    icon: image
  			});
		},
		animateAbout : function(){
			var _this = this;
			var timer = 0;
			this.aboutDiv.hide().removeClass('animated fadeIn');
			setTimeout(function(){
				_this.aboutDiv.each(function(i){
					setTimeout(function(){
						_this.aboutDiv.eq(i).show().addClass('animated fadeIn');
					}, timer);
					timer += 350;
				});	
			},1100);	
		},
		animateService : function(){
			var _this = this;
			var timer = 0;
			this.serviceDiv.css('visibility', 'hidden').removeClass('animated bounceIn');
			setTimeout(function(){
				_this.serviceDiv.each(function(i){
					setTimeout(function(){
						_this.serviceDiv.eq(i).css('visibility', 'visible').addClass('animated bounceIn');
					}, timer);
					timer += 350;
				});	
			},1000);	
		},
		animateContacts : function(){
			var _this = this;
			var timer = 0;
			this.contactText.hide().removeClass('animated fadeInDown');
			setTimeout(function(){
				_this.contactText.show().addClass('animated fadeInDown');
			},1200);
		},
		crateVideoWork : function(){
			// page works
			if( $('#works_player .vjs-control-bar').length ) return;

  	// 		videojs('works_player',{ "controls": true, "autoplay": false, "preload": "auto" }).ready(function(){
  	// 			var myPlayer = this;
  	// 			myPlayer.src([
			// 		// { type: "video/ogg", src: "video/iPhone5.ogv" },
			// 		// { type: "video/mp4", src: "video/iPhone5.mp4" }
			// 		{ type: "video/mp4", src: "video/iPhone5_libtheora.ogv" }
			// 	]);
			// });
		},
		plugins : (function(){
			$('#scroll').niceScroll(); // enable nice scroll
			$('#liquid').liquidcarousel({height:104}); // init carousel pgin page about

  			videojs.options.flash.swf = "js/video-js.swf"
  			// main page
  			videojs('main_player',{ "controls": true, "autoplay": false }).ready(function(){
  				var myPlayer = this;
  				myPlayer.src([
  					{ type: "video/ogg", src: "/video/MainMediaMaster.ogv" },
  					{ type: "video/mp4", src: "/video/MainMediaMaster.mp4" },
					{ type: "video/webm", src: "/video/MainMediaMaster.webm" }
				]);
			});
  			// page works
  			videojs('works_player',{ "controls": true, "autoplay": false, "preload": "auto" }).ready(function(){
  				var myPlayer = this;
  				myPlayer.src([
					{ type: "video/webm", src: "video/iPhone5.webm" },
					{ type: "video/ogg", src: "video/iPhone5.ogv" },
					{ type: "video/mp4", src: "video/iPhone5.mp4" },
				]);
			});

		})()
	};

	app.init();
})();
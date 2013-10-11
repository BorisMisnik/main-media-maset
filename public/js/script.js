(function(){
	var app = {
		container : $('#container'),
		sections : $('#container').find('section'),
		links : $('.link'),
		aboutDiv : $('#about .div'),
		serviceDiv : $('#service .div'),
		contactText : $('#contacts .text'),
		init : function(){
			this.setSectionHeight();
			this.links.on('click', $.proxy(app.scroll, app));
			this.niceScroll = $('#scroll').getNiceScroll();
			this.workSlider();
			this.crateMap();
			$('#works .div, .goback').hover(function(){
				$(this).toggleClass('shadow');
			});
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
				case 'about' :
					this.animateAbout();
					break;
				case 'service' :
					this.animateService();
					break;
				case 'contacts' :
					this.animateContacts();
					break;
			}

			// scroll container
			this.setContainerHeight();
			this.container.animate({'scrollTop' : h }, 1000, function(){ window.location.href = id; });
		},
		workSlider : function(){
			$('#works').on('click', '.div', slideToWork);
			$('.goback').on('click', slideToWorks);

			function slideToWork () {
				$('.slider-works').css('margin-left','-1100px');
			};

			function slideToWorks (e) {
				e.preventDefault();
				$('.slider-works').css('margin-left','0');
			}

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
			this.serviceDiv.hide().removeClass('animated bounceIn');
			setTimeout(function(){
				_this.serviceDiv.each(function(i){
					setTimeout(function(){
						_this.serviceDiv.eq(i).show().addClass('animated bounceIn');
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
		plugins : (function(){
			$('#scroll').niceScroll(); // enable nice scroll
			$('#liquid').liquidcarousel({height:104}); // init carousel pgin page about
			// alert($.browser.mobile )
		})()
	};

	app.init();
})();
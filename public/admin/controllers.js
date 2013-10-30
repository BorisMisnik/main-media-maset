function AppCtrl($scope){
	$scope.$on('$routeChangeSuccess', function(){
		setTimeout(function(){
			$('.textarea').wysihtml5({ // init text editor
				stylesheets: false,
				'font-styles': false,
				lists : false,
				emphasis : false
			});
		}, 100);
	});
}
function ControllerMain($scope, Text, Items){
	var $textarea = $('#main .textarea');

	Text.query({type:'getText',name:'mainText'}, function(res){ // get text
		
		if( !res.data[0] ) return;
		var text = res.data[0].mainText;
		 // update text editor
		 updateEditor(text);
	});

	Items.query({type:'getItems', name:'clients'}, function(res){
		$scope.clients = res.data;
	})

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({type:'saveText',name:'mainText', text: val}, function(res){ console.log(res) }); //save new text
	};

	// remove item
	$scope.removeItem = function(id, type){
		Items.delete({type:'removeItem', id:id}, function(res){
			if( res.result === 'ok' ){
				Items.query({type:'getItems', name:'clients'}, function(res){
					$scope.clients = res.data;
				});
			}

		})
	};
};
function ControllerAbout($scope, Text, Items){
	var $textarea = $('#about .textarea');

	Text.query({type:'getText',name:'aboutText'}, function(res){ // get text
		if( !res.data[0] ) return;
		var text = res.data[0].aboutText;
		// update text editor
		 updateEditor(text);
	});

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({type:'saveText',name:'aboutText', text: val}, function(res){}); //save new text
	};

	Items.query({type:'getItems', name:'workers'}, function(res){
		$scope.workers = res.data;
	});

	// remove item
	$scope.removeItem = function(id, type){
		Items.delete({type:'removeItem', id:id}, function(res){
			if( res.result === 'ok' ){
				Items.query({type:'getItems', name:'workers'}, function(res){
					$scope.workers = res.data;
				});
			}

		})
	};

	$scope.changeItem = function(worker){
		$('#aboutModal').modal('show');
		$scope.modal = {
			name : worker.name,
			job : worker.job,
			index : worker.index,
			img : worker.img,
			id : worker._id
		};
		console.log($scope.modal)  
	};

}
function ControllerService($scope, Text, Items){
	var $textarea = $('#service .textarea');

	Text.query({type:'getText',name:'serviceText'}, function(res){ // get text
		if( !res.data[0] ) return;
		var text = res.data[0].serviceText;
		// update text editor
		 updateEditor(text);
	});

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({type:'saveText',name:'serviceText', text: val}, function(res){}); //save new text
	};

	// remove service
	$scope.remove = function(id){
		Items.delete({id : id, type:'removeItem'}, function(response){
			if( response.result === 'ok' ){
				Items.query({type:'getItems', name:'service'}, function(res){
					$scope.services = res.data;
				});
			}
		});
	};

	// change service
	$scope.change = function(service){
		$('#serviceModal').modal('show');
		$scope.modal = {
			title : service.title,
			index : service.index,
			description : service.description,
			id : service._id
		}
	}

	Items.query({type:'getItems', name:'service'}, function(res){
		$scope.services = res.data;
	});

}

function ControllerContacts($scope, Text, Items){
	var $textarea = $('#contacts .textarea');
	Text.query({type:'getText',name:'contactsText'}, function(res){ // get text
		if( !res.data[0] ) return;
		var text = res.data[0].contactsText;
		setTimeout(function(){
			// update text editor
		 	updateEditor(text);
		}, 200)
		// update text editor
	});

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({type:'saveText',name:'contactsText', text: val}, function(res){ console.log(res) }); //save new text
	};

	$scope.remove = function(id){
		Items.delete({id : id, type:'removeItem'}, function(response){
			if( response.result === 'ok' ){
				Items.query({type:'getItems', name:'socialButton'}, function(res){
					$scope.contacts = res.data;
				});
			}
		});
	};
	$scope.change = function(contact){
		$('#contactModal').modal('show');
		$scope.modal = {
			index : contact.index,
			link : contact.link,
			img : contact.img,
			id : contact._id
		}
		console.log($scope.modal)
	}


	Items.query({type:'getItems', name:'socialButton'}, function(res){
		$scope.contacts = res.data;
	});

}
function ControllerWork($scope, Items){
	var $id_video = $('#id_video'),
		$file = $('#work #file'),
		$label_image = $('.label_image');

	Items.query({type:'getItems', name:'work'}, function(res){
		$scope.works = res.data;
	});

	$scope.remove = function(id){
		Items.delete({id : id, type:'removeItem'}, function(response){
			if( response.result === 'ok' ){
				Items.query({type:'getItems', name:'work'}, function(res){
					$scope.works = res.data;
				});
			}
		});
	};

	$scope.showPhoto = function(img){
		$scope.photo = img;
		$('#photoModal').modal('show');
	};

	$scope.change = function(work){
		$('#workModal').modal('show');

		$scope.modal = {
			title : work.title,
			index : work.index,
			description : work.description,
			video : work.id_video,
			id : work._id
		}
	}

	$('#work [value="youtube"]').on('click', function(){
		$id_video.show();
		$file.hide();
		$label_image.hide();
	});
	$('#work [value="image"]').on('click', function(){
		$id_video.hide();
		$file.show();
		$label_image.show();
	});

	$id_video .hide();
}


function updateEditor(value){
	setTimeout(function(){
		if( $('.textarea').data('wysihtml5') )
			$('.textarea').data('wysihtml5').editor.setValue(value);
	}, 200);
}

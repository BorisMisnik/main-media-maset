function AppCtrl($scope, $location){
	$scope.$on('$routeChangeSuccess', function(){
		setTimeout(function(){
                        $('.textarea').wysihtml5({ // init text editor
                                stylesheets: false,
                                'font-styles': false,
                                lists : false,
                                emphasis : false
                        });
            }, 100);
		$scope.path = $location.path();
	});
}
function ControllerMain($scope, Text, Items){
	var $textarea = $('#main .textarea');
	$scope.languageText  = 'ru';
	function getText(){
		Text.query({
			type:'getText', 
			name:'mainText',
			language : $scope.languageText
		}, function(res){ // get text
			if( !res.data[0] ) return;
			var text = res.data[0].mainText;
			updateEditor(text); // update text editor
		});
	};
	getText();

	Items.query({type:'getItems', name:'clients'}, function(res){
		$scope.clients = res.data;
	})

	
	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({
			type:'saveText',
			name:'mainText', 
			text: val,
			language : $scope.languageText
		}, function(res){}); //save new text
	};

	$scope.$watch('languageText', function(){
		getText();
	})

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
	$scope.languageText  = 'ru';

	function getText(){
		Text.query({
			type:'getText', 
			name:'aboutText',
			language : $scope.languageText
		}, function(res){ // get text
			if( !res.data[0] ) return;
			var text = res.data[0].aboutText;
			console.log(text)
			updateEditor(text); // update text editor
		});
	};
	getText();
	

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({
			type:'saveText',
			name:'aboutText', 
			text: val,
			languageChange : $scope.languageText
		}, function(res){}); //save new text
	};

	$scope.$watch('languageText', function(){
		getText();
	})

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
			id : worker._id,
			languageChange : worker.language
		};
		console.log($scope.modal)  
	};

}
function ControllerService($scope, Text, Items){
	var $textarea = $('#service .textarea');
	$scope.languageText  = 'ru';

	function getText(){
		Text.query({
			type:'getText', 
			name:'serviceText',
			language : $scope.languageText
		}, function(res){ // get text
			if( !res.data[0] ) return;
			var text = res.data[0].serviceText;
			updateEditor(text); // update text editor
		});
	};
	getText();

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({
			type:'saveText',
			name:'serviceText', 
			text: val,
			language : $scope.languageText,
		}, function(res){}); //save new text
	};

	$scope.$watch('languageText', function(){
		getText();
	})

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
			languageChange : service.language,
			img : service.img,
			id : service._id
		}
	}

	Items.query({type:'getItems', name:'service'}, function(res){
		$scope.services = res.data;
	});

}

function ControllerContacts($scope, Text, Items){
	var $textarea = $('#contacts .textarea');
	$scope.languageText  = 'ru';

	function getText(){
		Text.query({
			type:'getText', 
			name:'contactsText',
			language : $scope.languageText
		}, function(res){ // get text
			if( !res.data[0] ) return;
			var text = res.data[0].contactsText;
			updateEditor(text); // update text editor
		});
	};
	getText();

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({
			type:'saveText',
			name:'contactsText', 
			text: val,
			language : $scope.languageText
		}, function(res){}); //save new text
	};

	$scope.$watch('languageText', function(){
		getText();
	})

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
	}


	Items.query({type:'getItems', name:'socialButton'}, function(res){
		$scope.contacts = res.data;
	});

	Items.query({type:'number'}, function(res){
		$scope.number = res.value;
	});

	$scope.updateNumber = function(req, res){
		$.post('/admin/updateNumber', {number : $('#number').val()}, function(response){
			Items.query({type:'number'}, function(res){
				$scope.number = res.value;
			});
		});
	};	


}
function ControllerWork($scope, $location, Items){
	$scope.uploads = [];
	var $id_video = $('#id_video'),
		$file = $('#work #file'),
		$label_image = $('.label_image');
	function status(message) {
		$('.status').text(message);
    }
	$('#uploadForm').submit(function() {
        status('uploading the file ...');
 
        $(this).ajaxSubmit({                                                                                                                 
            error: function(xhr) {
				status('Error: ' + xhr.status);
            },
            success: function(response) {
				 if(response.error) {
            		status('Ошибка');
            		return;
        		}
        		var imageUrlOnServer = response.path.replace('public/', '');
				$scope.uploads.push(imageUrlOnServer);
				$scope.$apply();
            }
		});                                                                                                              
		return false;
    });


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
		$location.path('/work/' + work._id);
	}

	$scope.submit = function(){
		var val = $('.textarea').val();
		$('.description').val(val);
		console.log(val)
		$('.saveWork').submit();
	}

}

function ControllerWorkEdit($scope, $routeParams, Items){
	$scope.uploads = [];
	function status(message) {
		$('.status').text(message);
    }
	$('#uploadForm').submit(function() {
        status('uploading the file ...');
 
        $(this).ajaxSubmit({                                                                                                                 
            error: function(xhr) {
				status('Error: ' + xhr.status);
            },
            success: function(response) {
				 if(response.error) {
            		status('Ошибка');
            		return;
        		}
        		var imageUrlOnServer = response.path.replace('public/', '');
				$scope.uploads.push(imageUrlOnServer);
				$scope.$apply();
            }
		});                                                                                                              
		return false;
    });
	$.get('/admin/getItem', {id : $routeParams.id}, function(response){
		console.log(response)
		updateEditor(response.description);
		$scope.id_video = response.id_video;
		$scope.index = response.index;
		$scope.language = response.language;
		$scope.title = response.title;
		$scope.video = response.video;
		$scope.img = response.img;
		$scope.id = response._id;
		$scope.$apply();
	});

	$scope.submit = function(){
		var val = $('.textarea').val();
		$('.description').val(val);
		console.log(val)
		$('.saveWork').submit();
	}
}

function updateEditor(value){
	setTimeout(function(){
		if( $('.textarea').data('wysihtml5') )
			$('.textarea').data('wysihtml5').editor.setValue(value);
	}, 200);
}

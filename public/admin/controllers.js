function ControllerMain($scope, Text, Items){
	var $textarea = $('#main .textarea');

	Text.query({type:'getText',name:'mainText'}, function(res){ // get text
		
		if( !res.data[0] ) return;
		var text = res.data[0].mainText;
		$textarea.data('wysihtml5').editor.setValue(text); // update text editor
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
		$textarea.data('wysihtml5').editor.setValue(text); // update text editor
	});

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({type:'saveText',name:'aboutText', text: val}, function(res){}); //save new text
	};

	Items.query({type:'getItems', name:'workers'}, function(res){
		$scope.workers = res.data;
	});


}
function ControllerService($scope, Text, Items){
	var $textarea = $('#service .textarea');

	$('#service input[type="checkbox"]').on('click', function(){
		$(this).attr('checked', $(this).is(':checked'));
	})

	Text.query({type:'getText',name:'serviceText'}, function(res){ // get text
		if( !res.data[0] ) return;
		var text = res.data[0].serviceText;
		$textarea.data('wysihtml5').editor.setValue(text); // update text editor
	});

	// save new text
	$scope.save = function(){
		var val = $textarea.val();
		Text.save({type:'saveText',name:'serviceText', text: val}, function(res){}); //save new text
	};
	$scope.saveItem = function(name){
		var item = $('#' + name),
			textarea = item.find('textarea').val(),
			checkbox = item.find('input[type="checkbox"]').attr('checked') === 'checked' ?
				true : false;
		console.log(checkbox)			
		Items.save({
			type:'saveIteam', 
			text:textarea, 
			visible:checkbox, 
			category:'service',
			name : name}, function(respond){
			if( respond.succsess === 'ok' )
				window.location.reload();
		});
	};
	Items.query({type:'getItems', name:'service'}, function(res){
		var result = res.data,
			i = result.length - 1;
		for (; i >= 0; i--) {
			showContent(result[i]);
		};
	});

	function showContent(obj){
		var name = obj.name;
		var form = $('#' + name);
		form.children('textarea').text(obj.text);
		form.children('input[type="checkbox"]').attr('checked', obj.visible);
	}

}
function ControllerContacts($scope){

}
function ControllerWork($scope){

}
$(document).ready(function() {
    $('#genorder').bind('click', function() {
        $('#orderform').submit()
    })

    if($('#msg')){
        setTimeout(function(){
            $('#msg').hide(500)
        }, 3000)
    }

    $('#sync').bind('click', function(){
        window.location = '/product/sync'
    })
});

var app = angular.module('cartApp', ['ngCart'])
app.controller('cartCtrl', function($scope) {
	/**
	* init the controller
	*/
    $scope.init = function() {
    	$scope.db = {}
        $scope.products = []
        $scope.total_price = 0
        $scope.total_item = 0
        $scope.weight = 0
        $scope.ship = 0
        $scope.config = {
        	per_kg : 35
        }
        //load data from local storage
        $scope.load()
        $scope.init_dataTable()
    }

    /**
    * init the DataTable
    */
    $scope.init_dataTable = function() {
        $('#dataTables-example').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "/product/query",
                "type": "POST"
            },
            "columns": [{
                "data": "thumb_imgs",
                "orderable": false
            }, {
                "data": "price"
            }, {
                "data": "item_desc"
            }, {
                "data": "createdAt",
                "orderable": false
            }],
            //TODO: set last column order false
            responsive: true,
            "rowCallback": function(row, data, index) {
            	$scope.db[data.itemid] = data
                $('td:eq(0)', row).html('<img class="responsive" alt="" src="' + data.thumb_imgs + '" />')
                $('td:eq(3)', row).html('<select class="form-control" id="quality' + data.itemid + '"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select>'
                	+'<button onclick="hack_add(' + data.itemid + ')" data-toggle="modal" data-target="#cart" class="btn btn-success">Order</button>')
            },

            "drawCallback": function(settings) {
                // tooltip demo
                //$('.desctip').tooltip()

            }

        })
    }

    /**
    * add a product into the cart
    */
    $scope.add_product = function(itemid, quality){
    	
    	var found = false
    	var price = 0
    	quality = parseInt(quality)

    	//check if the product has already in the cart, modify its quality
    	for (var i in $scope.products){
    		if($scope.products[i].itemid == itemid){
    			$scope.products[i].quality = parseInt($scope.products[i].quality) + quality
    			found = true
    			price = $scope.products[i].price
    			$scope.total_item += quality
    			break
    		}
    	}

    	var d = $scope.db[itemid]

    	// if not in the cart add it
    	if(!found && d!=undefined){
    		$scope.products.push({
    			itemid: d.itemid,
    			item_name : d.item_name,
    			quality : quality,
    			price : d.price
    		})
    		price = d.price
    		$scope.total_item += quality
    	}
    	$scope.total_price += price * quality
    	$scope.$apply()
    	$scope.init_input()
    	$scope.save()
    }

    /**
    * remove a product from the cart
    */
    $scope.remove = function(itemid){
    	var found = -1
    	for (var i in $scope.products){
    		if($scope.products[i].itemid == itemid){
    			found = i
    			$scope.total_price -= $scope.products[i].price * $scope.products[i].quality
    			$scope.total_item -= parseInt($scope.products[i].quality)
    			break
    		}
    	}
    	if(found > -1){
    		$scope.products.splice(found,1)
    	}
		$scope.$apply()
		$scope.save()
    }

    /**	
    * init the quality input textbox
    */
    $scope.init_input = function(){
    	// $("input[name='quality']").TouchSpin({
     //        min: 1,
     //        max: 30,
     //        stepinterval: 1
     //    });
    }

    /**
    * recalculate the total price
    */
    $scope.summary_price = function(){
    	
    	var sum = 0
    	var quality = 0
    	for (var i in $scope.products){
    		//console.log('xxx')
    		var q = parseInt($scope.products[i].quality)
    		if (isNaN(q)){
    			q = 1
    			$scope.products[i].quality = 1
    		}
    		sum += q * $scope.products[i].price

    		quality += q
    	}
    	$scope.total_item = quality
    	$scope.total_price = sum
    	//$scope.$apply()
		$scope.save()
    }


    $scope.save = function(){
    	if(typeof(localStorage) !== "undefined") {
    		localStorage.setItem("db", JSON.stringify($scope.db));
    		localStorage.setItem("products", JSON.stringify($scope.products));
    		localStorage.setItem("config", JSON.stringify($scope.config));
		} else {
		    console.log('not support')
		}
    }

    $scope.load = function(){
    	if(typeof(localStorage) !== "undefined") {
		    $scope.db =  $scope.read("db", {})
	        $scope.products =$scope.read("products", [])
	        $scope.config =$scope.read("config", $scope.config)
	        $scope.summary_price()
		} else {
		    console.log('not support')
		}
    }

    $scope.read = function(item, def){
    	if(localStorage.getItem(item)!=undefined){
    		return JSON.parse(localStorage.getItem(item))
    	} else {
    		return def
    	}
    }

    //init current app.controller
    $scope.init()

});

/**
* hacked angular's method
* add a product into the cart
*/
function hack_add(itemid){
  	var scope = angular.element($("#capp")).scope()
  	var quality = $('#quality'+itemid).val()
  	if (quality == undefined){
  		quality = 1
  	}
   	scope.add_product(itemid, parseInt(quality))
}

$(document).ready(function() {
    $('#genorder').bind('click', function() {
        $('#orderform').submit()
    })
});

var app = angular.module('cartApp', ['ngCart'])
app.controller('cartCtrl', function($scope) {
    $scope.init = function() {
    	$scope.db = {}
        $scope.products = []
        $scope.summary = 0
        $scope.weight = 0
        $scope.ship = 0
        $scope.config = {
        	per_kg : 35
        }
        
        $scope.init_dataTable()
    }

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
                //$('td:eq(1)', row).html(data.price)
                $('td:eq(3)', row).html('<select class="form-control" id="quality' + data.itemid + '"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select>'
                	+'<button onclick="hack_add(' + data.itemid + ')" data-toggle="modal" data-target="#cart" class="btn btn-success">Order</button>')
            },

            "drawCallback": function(settings) {
                // tooltip demo
                //$('.desctip').tooltip()

            }

        });
    }

    $scope.add_product = function(itemid, quality){
    	
    	var found = false
    	var price = 0
    	quality = parseInt(quality)
    	for (var i in $scope.products){
    		if($scope.products[i].itemid == itemid){
    			$scope.products[i].quality = parseInt($scope.products[i].quality) + quality
    			found = true
    			price = $scope.products[i].price
    			break
    		}
    	}

    	var d = $scope.db[itemid]

    	if(!found && d!=undefined){
    		$scope.products.push({
    			itemid: d.itemid,
    			item_name : d.item_name,
    			quality : quality,
    			price : d.price
    		})
    		price = d.price
    	}
    	$scope.summary += price * quality
    	$scope.$apply();
    }

    $scope.summary_price = function(){
    	
    	var sum = 0;
    	for (var i in $scope.products){
    		sum += $scope.products[i].quality * $scope.products[i].price
    	}
    	$scope.summary = sum
    }

    //init current app.controller
    $scope.init()

});


function hack_add(itemid){
  	var scope = angular.element($("#capp")).scope()
  	var quality = $('#quality'+itemid).val()
  	if (quality == undefined){
  		quality = 1
  	}
   	scope.add_product(itemid, parseInt(quality))
}

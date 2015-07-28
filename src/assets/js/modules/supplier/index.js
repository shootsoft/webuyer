$(document).ready(function() {

    if($('#msg')){
        setTimeout(function(){
            $('#msg').hide(500)
        }, 3000)
    }

    
});

var app = angular.module('supplierApp', [])
app.controller('supplierCtrl', function($scope) {
	/**
	* init the controller
	*/
    $scope.init = function() {
    	$scope.db={}
        $scope.supplier={}
        $scope.init_dataTable()
        $scope.new()
    }

    /**
    * edit the supplier
    */
    $scope.edit = function(id) {
        

        console.log('edit')
        
    }

    /**
    * add new supplier
    */
    $scope.new = function() {
        $scope.supplier={
            id:0,
            name:'example name',
            location: 'example location',
            index:1,
            open_date:'Mon-Sun 8:00~18:00'
        }
    }

    /**
    * init the DataTable
    */
    $scope.init_dataTable = function() {
        $('#dataTables-example').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "/supplier/query",
                "type": "POST"
            },
            "columns": [{
                "data": "id"
            }, {
                "data": "name"
            }, {
                "data": "index"
            }, {
                "data": "location"
            }, {
                "data": "open_date",
                "orderable": false
            }, {
                "data": "updatedAt",
            }, {
                "data": "createdAt",
                "orderable": false
            }],
            //TODO: set last column order false
            responsive: true,
            "rowCallback": function(row, data, index) {
                $scope.db[data.id] = data
            	//$scope.db[data.itemid] = data
                //$('td:eq(0)', row).html('<img class="responsive" alt="" src="' + data.thumb_imgs + '" />')
                $('td:eq(6)', row).html('<button ng-click="edit(' + data.id + ')" data-toggle="modal" data-target="#edit_supplier" class="btn btn-success btn-circle"><i class="fa fa-edit" title="Edit"></i> </button> '
                    + '<button onclick="remove(' + data.id + ')" data-toggle="modal" data-target="#edit_supplier" class="btn btn-default btn-circle"><i class="fa fa-remove" title="Remove"></i> </button>')
            },

            "drawCallback": function(settings) {
                // tooltip demo
                //$('.desctip').tooltip()
                $scope.$apply()
            }

        })
    }


    //init current app.controller
    $scope.init()

});

/**
* hacked angular's method
* add a product into the cart
*/
function edit(itemid){
  	
}

$(document).ready(function() {

    if ($('#msg')) {
        setTimeout(function() {
            $('#msg').hide(500)
        }, 3000)
    }


});

var app = angular.module('supplierApp', ['datatables'])
app.controller('supplierCtrl', function($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.supplier = {}
        $scope.suppliers = {}
        $scope.dtInstance = {};
        $scope.supplier_index=[0,1,2,3,4,5,6,7,8,9,10]
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {

        $scope.supplier = $scope.db[id]

        console.log('edit')

    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $scope.supplier = {
            id: 0,
            name: 'example name',
            location: 'example location',
            index: 1,
            open_date: 'Mon-Sun 8:00~18:00'
        }
    }

    /**
     * add new supplier
     */
    $scope.save = function() {
     
        $.blockUI();
        //$.ajax()

        setTimeout(function(){
            $.unblockUI();
            toastr.success('Success')
            $scope.dtInstance.reloadData()
        }, 3000)
        
        console.log(JSON.stringify($scope.supplier))
        
    }

    /**
     * init the DataTable
     */
    $scope.init_dataTable = function() {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                // Either you specify the AjaxDataProp here
                // dataSrc: 'data',
                url: '/supplier/query',
                type: 'POST'
            })
            // or here
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('responsive', true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            });
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('name').withTitle('Name'),
            DTColumnBuilder.newColumn('index').withTitle('Index'),
            DTColumnBuilder.newColumn('location').withTitle('Location'),
            DTColumnBuilder.newColumn('open_date').withTitle('Open Date'),
            DTColumnBuilder.newColumn('updatedAt').withTitle('Updated At'),
            DTColumnBuilder.newColumn('createdAt').withTitle('').notSortable().renderWith(function(col, type, row) {
                $scope.db[row.id] = row
                return '<button ng-click="edit(' + row.id + ')" data-toggle="modal" ' 
                     + 'data-target="#edit_supplier" class="btn btn-success btn-circle">'
                     + '<i class="fa fa-edit"></i></button>'
            })
        ]
        // $('#dataTables-example').DataTable({
        //     "processing": true,
        //     "serverSide": true,
        //     "ajax": {
        //         "url": "/supplier/query",
        //         "type": "POST"
        //     },
        //     "columns": [{
        //         "data": "id"
        //     }, {
        //         "data": "name"
        //     }, {
        //         "data": "index"
        //     }, {
        //         "data": "location"
        //     }, {
        //         "data": "open_date",
        //         "orderable": false
        //     }, {
        //         "data": "updatedAt",
        //     }, {
        //         "data": "createdAt",
        //         "orderable": false
        //     }],
        //     //TODO: set last column order false
        //     responsive: true,
        //     "rowCallback": function(row, data, index) {
        //         $scope.db[data.id] = data
        //      //$scope.db[data.itemid] = data
        //         //$('td:eq(0)', row).html('<img class="responsive" alt="" src="' + data.thumb_imgs + '" />')
        //         $('td:eq(6)', row).html('<button ng-click="edit(' + data.id + ')" data-toggle="modal" data-target="#edit_supplier" class="btn btn-success btn-circle"><i class="fa fa-edit" title="Edit"></i> </button> '
        //             + '<button onclick="remove(' + data.id + ')" data-toggle="modal" data-target="#edit_supplier" class="btn btn-default btn-circle"><i class="fa fa-remove" title="Remove"></i> </button>')
        //     },

        //     "drawCallback": function(settings) {
        //         // tooltip demo
        //         //$('.desctip').tooltip()
        //         $scope.$apply()
        //     }

        // })
    }


    //init current app.controller
    $scope.init()

});

/**
 * hacked angular's method
 * add a product into the cart
 */
function edit(itemid) {
console.log('edit2')
}

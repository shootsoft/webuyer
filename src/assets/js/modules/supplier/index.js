var app = angular.module('supplierApp', ['datatables'])
app.controller('supplierCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.supplier = {}
        $scope.suppliers = {}
        $scope.dtInstance = {};
        $scope.supplier_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.supplier = $scope.db[id]
            //console.log('edit')

    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.supplier = {
            id: 0,
            name: 'example name',
            location: 'example location',
            index: 1,
            open_date: 'Mon-Sun 8:00~18:00'
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.supplier = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var supplier = $scope.db[id]
        if (supplier) {
            ngcurd.confirm({
                title: 'Confirm remove ' + supplier.name,
                message: 'Warning: all this supplier\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/supplier/remove', {id: id}, {
                        success: function(){
                            $scope.dtInstance.reloadData()
                        }
                    })
                }
            })
        }
    }

    /**
     * add or update supplier
     */
    $scope.save = function() {

        $scope.supplier.index = $('#supplier_index').val()
        ngcurd.post('/supplier/update', $scope.supplier, {
            success: function(){
                $scope.dtInstance.reloadData()
            }
        })
    }

    /**
     * init the DataTable
     */
    $scope.init_dataTable = function() {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
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
                    return '<button ng-click="view(' + row.id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_supplier" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_supplier"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_supplier" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});

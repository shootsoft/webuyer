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
            bootbox.dialog({
                title: 'Confirm remove ' + supplier.name,
                message: 'Warning: all this supplier\'s data will be removed!',
                buttons: {
                    success: {
                        label: "Cancel",
                        className: "btn-default",
                        callback: function() {
                            console.log('cancel')
                        }
                    },
                    ok: {
                        label: "OK",
                        className: "btn-primary",
                        callback: function() {
                            $http.post('/supplier/remove', {id: id}, {
                                responseType: 'json'
                            }).success(function(data, status, headers, config) {
                                $.unblockUI()

                                if (data && data.success) {
                                    toastr.success('Success')
                                    $scope.dtInstance.reloadData()
                                } else if (data && data.msg) {
                                    toastr.error(data.msg)
                                } else {
                                    toastr.error('Server error')
                                }

                            }).error(function(data, status, headers, config) {
                                $.unblockUI();
                                toastr.error('Server error e')
                            })
                        }
                    }
                }
            })
        }
    }

    /**
     * add or update supplier
     */
    $scope.save = function() {

        $.blockUI({
            message: '<img src="/images/loading-spinner-grey.gif" /> Updating...'
        })
        $scope.supplier.index = $('#supplier_index').val()

        $http.post('/supplier/update', $scope.supplier, {
            responseType: 'json'
        }).success(function(data, status, headers, config) {
            $.unblockUI()

            if (data && data.success) {
                toastr.success('Success')
                $scope.dtInstance.reloadData()
            } else if (data && data.msg) {
                toastr.error(data.msg)
            } else {
                toastr.error('Server error')
            }

        }).error(function(data, status, headers, config) {
            $.unblockUI();
            toastr.error('Server error e')
        })
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
                    return '<button ng-click="view(' + row.id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_supplier" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_supplier"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_supplier" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});

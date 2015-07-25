
$(document).ready(function() {
    $('#dataTables-example').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/product/query",
            "type": "POST"
        },
        "columns": [
            { "data": "thumb_imgs", "orderable": false },
            { "data": "price" },
            { "data": "item_desc" },
            { "data": "createdAt", "orderable": false }
        ],
        //TODO: set last column order false
        responsive: true,
        "rowCallback": function( row, data, index ) {
		 	
        	$('td:eq(0)', row).html( '<img class="responsive" alt="" src="'+data.thumb_imgs+'" />');
        	$('td:eq(1)', row).html(data.price+'￥');
        	$('td:eq(3)', row).html('<button onclick="cart.add('+data.itemid+')" data-toggle="modal" data-target="#cart" class="btn btn-success">Order</button>')
		 	//cart.products[data.id] = data
		    // if (data.image){
		    // 	//data.image = '<img style="height:150px;width:150px" src="'+data.image+'" />'
		    // 	//$('td:eq(1)', row).html( '<img style="height:150px;width:150px" alt="" src="'+data.image+'" />');
		    // } else {
		    // 	data.image = '';
		    // }

		    // if (data.desc && data.desc.length > 400){
		    // 	$('td:eq(3)', row).html( 
		    // 		'<span class="desctip" data-toggle="tooltip" data-placement="top"  title="'
		    // 		+data.desc+'">'+data.desc.substring(0, 400)+'...</span>');
		    // }
		    // $('td:eq(2)', row).html('$'+data.price);
		    //$('td:eq(4)', row).html('<button onclick="cart.add('+data.id+')" data-toggle="modal" data-target="#cart" class="btn btn-success">Order</button>')
		},

		"drawCallback": function( settings ) {
	        // tooltip demo
		    $('.desctip').tooltip()

	    }
       
    });
    

    $('#genorder').bind('click', function(){
    	$('#orderform').submit()
    })
});

// var CartUpdater = React.createClass({
//     render: function() {
//         return (
//         	<div>
// 				{
// 					this.props.purchased.map(function(product) {
// 						return <div class="row">
// 							<div class="col-lg-5">{product.name}</div>
// 							<div class="col-lg-6"></div>
// 							<div class="col-lg-1">${product.price}</div>
// 							<input type="hidden" value={product.id} name="product_id[]" />
// 						</div>;
// 					})
// 				}
// 			</div>
// 		)
        		
//     }
// });

// var cart ={
// 	products:{},
// 	purchased:[],
// 	add:function(id){
// 		var p = cart.products[id]
// 		if(p){
// 			cart.purchased.push(p)
// 			var pu = cart.purchased;
// 			React.render(<CartUpdater purchased={pu} />, document.getElementById('cartbody'));
// 			// var ui = '<div class="row">'
// 			// 		+ '<div class="col-lg-5">'+p.name+'</div>'
// 			// 		+ '<div class="col-lg-6">'+p.image+'</div>'
//    //      			+ '<div class="col-lg-1"></div>'
//    //      			+ '<input type="hidden" value="'+p.id+'" name="product_id[]" /></div>'
//    //      	$('#cartbody').append(ui)

			
// 		}
// 	}

// }
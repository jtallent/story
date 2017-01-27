var	seller_id = window.id ? encodeURI(id) : '';
var	revenue = window.rev ? encodeURI(rev) : '';
var	order_id = window.order ? encodeURI(order) : '';
var	category_ids = window.cats ? encodeURI(cats) : '';
var	product_ids = window.prods ? encodeURI(prods) : '';
var	num_units = window.units ? encodeURI(units) : '';

var debugservers;
if (window.debugserver) {
    debugservers = new Array(escape(window.debugserver));
} else {
    debugservers = new Array("merchants.nextag.com");
}

for (i = 0; i < debugservers.length; i++) {
    url = document.location.protocol + "//" + debugservers[i] + "/seller/roitrack.jsp?id=" + seller_id + "&rev=" + revenue
        + "&order=" + order_id + "&cats=" + category_ids + "&prods=" + product_ids + "&units=" + num_units + "&cp=UTF-8";

    if (window.debugserver) {
        document.write("[Called: " + url + "]");
    }

    roitracker = new Image(1,1);
    roitracker.src = url;
}

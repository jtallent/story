var sz_w			= window;
var sz_d			= document;
var sz_is_debug		= 0;
var sz_is_yahoo		= 0;
var sz_tmpl_id		= 1;
var sz_scraped_id	= '';
var sz_scraped		= new Object();
var sz_index_of		= new Object();

if (sz_d.URL.indexOf('roi_qa=yes') > 0) sz_is_debug = 1;
if (sz_d.URL.indexOf('qa/roi_wg_thank_you') > 0) sz_is_yahoo = 1;
if (sz_d.URL.indexOf('order.store.yahoo.com/cgi-bin/wg-thank-you') > 0) sz_is_yahoo = 1;
if ((sz_d.URL.indexOf('order.store.yahoo.net/ymix/MetaController.html') > 0) &&
	(sz_d.URL.indexOf('ysco_key_order_id') > 0)) {
	sz_is_yahoo = 2;
}

if (sz_is_debug && (sz_d.URL.indexOf('tmpl_id-4') > 0)) {
	sz_is_yahoo = 2;
}

/* Yahoo template 4 has onload conflict, so just by-pass it */
if (sz_is_yahoo && (sz_is_yahoo != 2)) {
	sz_w.sh_onload	= sz_w.onload;
	sz_w.onload		= new Function( 'sz_rd_tracker();' + (sz_w.sh_onload ? 'window.sh_onload()' : '') );
} else {
	sz_rd_tracker();
}

function sz_rd_tracker( ) {
	if (sz_is_yahoo == 2) {
		/* new Yahoo template 2006.10.25 */
		sz_tmpl_id		= 4;
		order_id		= orderNum;
		order_value		= orderTotal;
		units_ordered	= numOfItems;
	} else if (sz_is_yahoo) {
		/* Screen Scrape Yahoo Store */
		sz_scrape_doc( );
	}
	/* Tracker Data */
	mid				= sz_w.mid ? escape( mid ) : '';
	cust_type		= sz_w.cust_type ? escape( cust_type ) : '';
	order_value		= sz_w.order_value ? escape( order_value ) : '';
	order_id		= sz_w.order_id ? escape( order_id ) : '';
	units_ordered	= sz_w.units_ordered ? escape( units_ordered ) : '';
	if (sz_is_debug) {
		alert( 'mid: ' + mid + "\n" + 
				'cust_type: ' + cust_type + "\n" + 
				'order_value: ' + unescape( order_value ) + "\n" + 
				'order_id: ' + unescape( order_id ) + "\n" + 
				'units_ordered: ' + units_ordered + "\n" + 
				'sz_is_yahoo: ' + sz_is_yahoo + "\n" + 
				'tmpl_id: ' + sz_tmpl_id + "\n"
		);
	}
	var url	= sz_d.location.protocol+"//www.bizrate.com/roi/index__cust_type--"+cust_type+",mid--"+mid+",order_id--"+order_id+",order_value--"+order_value+",units_ordered--"+units_ordered+",tmpl_id--"+sz_tmpl_id+".html";
	rd		= new Image(1,1);
	rd.src	= url;
}

function sz_scrape_doc( ) {
	var agent = navigator.userAgent.toLowerCase();
//	alert( 'user agent[' + agent + '][' + agent.indexOf("firefox") + ']' );
	if (sz_d.getElementById) {
		sz_add_index_of( 'order_id', 'Order ' + 'Number:', 1 );
		sz_add_index_of( 'order_value', 'Tot' + 'al:', 2 );
		sz_scrape_content( sz_d.body );
		if (sz_scraped['order_id']) {
			/* old Yahoo template */
			sz_tmpl_id	= 2;
			order_id	= sz_scraped['order_id'];
			order_value	= sz_scraped['order_value'].replace( '$', '' );
//			alert( 'order_value[' + order_value + '][' + order_value.match( '([.\d]+)' ) + ']' );
			if ((!order_value.match( '([.\d]+)' ) && (agent.indexOf("safari") >= 0)) ||
				(order_value.match( 'Order Status' ) && (agent.indexOf("msie 6.0; windows") >= 0))) {
				sz_add_index_of( 'order_value', 'Tot' + 'al:', 1 );
				sz_tmpl_id	= 5;
			}
			sz_scrape_content( sz_d.body );
			order_value	= sz_scraped['order_value'].replace( '$', '' );
//			alert( 'order_id[' + order_id + '][' + order_id.match( '(\w+)' ) + ']' );
			if (!order_id.match( '([a-zA-Z0-9]+)' )) {
				var agent = navigator.userAgent.toLowerCase();
				if (agent.indexOf("firefox") >= 0) {
					sz_add_index_of( 'order_id', 'Order ' + 'Number:', 2 );
					sz_scrape_content( sz_d.body );
					sz_tmpl_id	= 5.1;
					order_id	= sz_scraped['order_id'];
				}
			}
		} else {
			/* older Yahoo template */
			sz_add_index_of( 'order_id', 'order num' + 'ber is:', 1 );
			sz_add_index_of( 'order_value', 'Tota' + 'l for ', 1 );
			sz_scrape_content( sz_d.body );
			sz_tmpl_id	= 3;
			order_id	= sz_scraped['order_id'];
			order_value	= parseFloat( sz_scraped['order_value'] );
			if (order_id && !order_value) {
				sz_tmpl_id	= 99;
				order_value	= sz_scraped['order_value'];
			}
		}
	}
}

function sz_scrape_content( content ) {
	for (var i = 0; child = content.childNodes[i]; i++) {
		if (child.nodeType == 3) {
			sz_id = '';
			for (sz_id in sz_index_of) {
				if (child.nodeValue.indexOf( sz_index_of[sz_id].text ) >= 0) {
					sz_scraped_id = sz_id;
				}
			}
			if (!sz_id) return -1;
			if (sz_scraped_id) {
				if (sz_index_of[sz_scraped_id].offset == 0) {
					sz_scraped[sz_scraped_id] = child.nodeValue;
					delete sz_index_of[sz_scraped_id];
					sz_scraped_id = '';
				} else {
					sz_index_of[sz_scraped_id].offset = sz_index_of[sz_scraped_id].offset - 1;
				}
			}
		}
		ret = sz_scrape_content( child );
		if (ret == -1) return -1;
	}
	return 0;
}

function sz_add_index_of( sz_id, sz_text, sz_offset ) {
	sz_index_of[sz_id]				= new Object();
	sz_index_of[sz_id]['text']		= sz_text;
	sz_index_of[sz_id]['offset']	= sz_offset;
}

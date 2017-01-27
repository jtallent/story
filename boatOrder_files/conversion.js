var yahoo_store = 0;
function is_yahoo_store()
{
  if(document.URL.indexOf('ymix/MetaController.html') > 0||document.URL.indexOf('new_yahoo_roi')>0)
  {
  	 yahoo_store = 1; 
     return true;
  } 
  return false;        
}
function become_track_conversion() 
{
    var become_order_amt = "";
    var server = "https://partner.become.com";
    
	var rnd = Math.floor(Math.random()*999999999);
    try
	{
		var errors = "";
		var url = server + "/roi-tracker2" + "/t.gif?rnd=" + rnd + "&merchantid=";
	
		if (typeof(become_merchant_id) == 'undefined')
		{
		   url = url + "";
		   errors += "merchant_id|";  		
		}
		else
		{
		   url +=  become_merchant_id;	
		}
				   
	    if (is_yahoo_store ())
	    {
	    	var become_order_id = "";    	
	    	if(typeof(orderNum) == 'undefined')
	    	{  
	    		errors +="yahoo_orderNum|";
	    	}
	    	else
	    	{
	    		become_order_id = orderNum;
	    	}
	    	if(typeof(orderTotal) == 'undefined')
	    	{  
	    		errors +="yahoo_orderTotal|";
	    	}
	    	else
	    	{
	    	    become_order_amt    = orderTotal; 
	    	}
	    	
	    	become_order_amt = (become_order_amt + "").replace(/,/g,'').replace(/\$/g,'');
	    	url += "&order_id=" + become_order_id + "&become_order_amt=" + become_order_amt;
	    }
	    else
	    {
	    	if (typeof(become_order_num) == 'undefined')
	    	{
	    	    url += "&order_id=" + "";
	    	    errors += "order_id|";
	    	}
	    	else
	    	{
	    	    url += "&order_id=" + become_order_num;	
	    	}
	    	
			url += "&items=[" 	
			var comma = "";
			
			if(typeof(become_purchased_items) == 'undefined' || (become_purchased_items instanceof Array) == false)
			{
			    errors += "purchased_items|";	
			}
			else
			{
			    if (become_purchased_items.length == 0)
				{
				   errors +="purchased_items_0";	
				}
				
				for(var i=0; i<become_purchased_items.length; i++) 
				{				    
				    var item_id =  "";
				    var item_cat = "";
				    var item_price = "";
				    var item_quantity = "";
				       
				    if(typeof( become_purchased_items[i]) == 'undefined' || typeof( become_purchased_items[i]) != 'object')
				    {
				    	errors +="become_purchased_items[" + i + "]|";
				    }
				    else
				    {
				    	var hasError = false;
				       	//item_id
				       	if(typeof( become_purchased_items[i]).productid == 'undefined')
				       	{
				       		hasError = true;	
				       	}
				       	else
				       	{
				       		item_id = escape(become_purchased_items[i].productid);
				       	}
				       	//item_cat
				       	if(typeof( become_purchased_items[i]).category != 'undefined')
				       	{
				       	   item_cat = escape(become_purchased_items[i].category);	
				       	}
				       	//item_price
				       	if(typeof( become_purchased_items[i]).price == 'undefined')
				       	{
				       		hasError = true;	
				       	}
				       	else
				       	{
				       		item_price = (become_purchased_items[i].price+"").replace(/,/g,'').replace(/\$/g,'');;	
				       	}
				       	//item_price
				       	if(typeof( become_purchased_items[i]).quantity == 'undefined')
				       	{
				       		hasError = true;	
				       	}
				       	else
				       	{
				       		item_quantity = (become_purchased_items[i].quantity+"").replace(/,/g,'').replace(/\$/g,'');  		
				       	}
				       	if (hasError == true)
				       	{
				       		errors +="become_purchased_items[" + i + "].field|"
				       	}
				    }   		    
			        if (i>0)
			        {
			           comma = ";";
			        } 
			        url += comma + "item=" +item_id+ ",cat=" +item_cat+ ",price="+item_price+",quantity=" + item_quantity;
				}
			}
			url += "]";
	    }
	    url += "&errors=" + errors; 
	    var i=new Image(1,1);
	    i.src = url;	
	}catch(err) {}  
}
become_track_conversion();

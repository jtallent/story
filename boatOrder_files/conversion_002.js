// JScript source code
function handle_conversion() 
{
  var w = window;
  var url = "https://sam.smarter.com/roi/roi_tracker.php";
	
  if (w.sm_mer_id > 0) 
  {
    url = url + "?m=" + w.sm_mer_id + "&random=" + (new Date()).getTime();

    if (w.sm_order_id != "") 
      url = url + "&o=" + escape(w.sm_order_id);
      
    if (w.sm_advance == 1)
    {
      	url = url + "&adv=" + w.sm_advance;
      	
      	if(w.sm_order_amt > 0)
	      	url = url + "&a=" + escape(w.sm_order_amt);
    	if(w.sm_units_ordered > 0)
    		url = url + "&uno=" + escape(w.sm_units_ordered);
    }
      	
   	document.write(url);
	document.write('<i' + 'mg height="1" width="1" border="0" ' + 'src="' + url + '" />');
   }
}

handle_conversion();

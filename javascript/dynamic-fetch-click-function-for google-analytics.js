//attribute begins with certain value and sets a CLICK function to the anchor node
$('[id^="product_"] .container a').click(function(e) {

    //Checks for the GA function in the page
    if (typeof ga == 'function') {

        //variables to define the data that we need to fetch
        var subProdTarget = $(this).closest('.sub-product-img').children().eq(1);  //the product(s)
        var prod_basecode =  subProdTarget.attr('data-basecode').trim();  //the propduct base code (sku)
        var prod_name =  subProdTarget.attr('data-name').trim();  //the propduct name
        var prod_section_title = subProdTarget.attr('data-categoryname').trim();  //the location where the propduct is found
        
        //specify where the product collections are located
        var zone_map = ["homepage-spot-1", "homepage-spot-2", "homepage-spot-3"];

        //outputs the parent of the product collection. ex: homepage-spot-1, etc.
        var zone_label = $(this).closest('[id^="product_"]').attr('id').toLowerCase().trim(); 
        
        //search in array. Returns the index position of the value. If it doesn't find the value then it returns -1.
        var zone_index = parseInt(zone_map.indexOf(zone_label)) + 1;

        //variables to define the LABELS to fire the Event Tag into Google Analytics
        let hpProdCategory = "Main Homepage";  // GA - Event Category
        let hpProdAction = 'Zone ' + zone_index + ' - ' + prod_section_title;  // GA - Event Action
        let hpProdLabel =  prod_name;  // GA - Event Label
        
        //console.log( hpProdCategory + '--' + hpProdAction + '--' + hpProdLabel);
        ga('fd_mbp.send', 'event', hpProdCategory, hpProdAction , hpProdLabel);
    }
});
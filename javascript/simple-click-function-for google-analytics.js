//Set a CLICK function to the ANCHOR element of BANNER_WRAPPER
$('.banner-wrapper a').click(function(e) {     
    
    //Checks for the GA function in the page
    if (typeof ga == 'function') { 

        //Checks for the UTAG_DATA object - This is where to fetch the "pageName"
        if(utag_data){

            //defines a VARIABLE with the OBJECT from the UTAG_DATA
            pageName = utag_data.category_name;

            //If all above is true, fire the GA Event Tag into Google Analytics
            ga('fd_mbp.send', 'event', 'Collection Page', pageName + ' - IC Banner', 'Unicorn Flowers & Gifts');
            
            //Do this to check if the CLICK function fires the EVENT Tag into Google Analytics.
            console.log('Collection Page'+ '--' + pageName + '- IC Banner' + '--' +'Unicorn Flowers & Gifts');
        } 
    }
});
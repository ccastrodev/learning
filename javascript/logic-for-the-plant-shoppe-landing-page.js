// Function to get string after last slash
    function getLastURLSegment(string) {
        // replace() the trailing / with nothing, split on the remaining /, and pop off the last one
        return string.replace(/\/$/, "").split('/').pop();
    }
    
    // Function to send GA Impression Tag
    function sendImpressionTag(title, num) {
        var category = "Collection Page";
        var action = title + " Subcollection - Impression";
        var label = num.join(" | "); // example: ["000000","000000","000000"] becomes 000000 | 000000 | 000000
        
        ga('fd_mbp.send', 'event', category, action, label, {'nonInteraction': 1});
    }
    
    // Function to send GA Click Tag for sub collection products
    function sendSubProductClickTag(title, num) {
        var category = "Collection Page";
        var action = title + " Subcollection - Click";
        var label = num;
    
        ga('fd_mbp.send', 'event', category, action, label);
    }
    
    // Function to send GA Click Tag for ic banners within a sub collection
    function sendSubICBannerClickTag(title, link, num) {
        var category = "Collection Page";
        var action = title + " - IC Banner " + num + " - Click";
        var label = "Blog - " + link;
    
        ga('fd_mbp.send', 'event', category, action, label);
    }
    
    // Function to clone (duplicate) a given element, create custom HTML, and insert into DOM
    function cloneSubProduct(bannerCount, target, href, img, title, subTitle, index) {
         $(target + "  .SubProductThumb:eq("+index+")")
            .clone(true,true)
            .html('<a href="'+href+'" target="_blank" data-title="'+title+'" data-subtitle="'+subTitle+'" data-banner-count="'+bannerCount+'" data-item-type="subcol-ic-banner"><img src="'+img+'"/></a>')
            .insertAfter(target + "  .SubProductThumb:eq("+index+")");
    }
    
    $(function() {
    
        /*
        *   Array of IC Banner elements to be inserted into each Sub Collection.
        *       subTitleText = text to be displayed under the sub collection titles
        *       link = href to where the IC banner will take the user to
        *       image = IC banner image
        */
        var subCollection = [
            {
                'subTitleText' : "These green beauties make top-shelf gifts.",
                'link' : '/blog/flower-facts/best-plants-for-apartments',
                'image' : '//cdn4.1800flowers.com/wcsstore/Flowers/images/2019/houseplants/IC-banner-leaves-1.jpg'
            },
            {
                'subTitleText' : "Every table - from coffee to conference, side to end - could use a touch of green.",
                'link' : '/blog/flower-facts/best-office-plants',
                'image' : '//cdn4.1800flowers.com/wcsstore/Flowers/images/2019/houseplants/IC-banner-leaves-2.jpg'
            },
            {
                'subTitleText' : "Brighter corners. Greener entryways. Our floor plants know how to spruce up a space.",
                'link' : '/blog/floral-home-decorating/low-maintenance-plants-for-your-dorm-room',
                'image' : '//cdn4.1800flowers.com/wcsstore/Flowers/images/2019/houseplants/IC-banner-leaves-3.jpg'
            }
        ];
    
    
        var subCollectionCount = 0;
        $('.collectionSubproduct').each(function(k, v) {
    
            var elem = subCollection[k];
    
            $(v).children().each(function(a, b) {
    
                /* If the class exists, move sub collection title outside class 'collectionSubproduct' and replace with custome HTML
                */
                if (b.className === 'SubproductTitle') {
                    $(b).insertBefore(v).replaceWith(function() {
                        return '<div class="title_wrap">' + 
                                    '<h2 class="title_item SubproductTitle">' + $(this).html() + '</h2>' + 
                                    '<span class="subTitleText">' + elem.subTitleText + '</span>' +
                                '</div>';
                    });
                }
    
                // If class exists, remove from DOM.
                if (b.className === 'clear') {
                    b.parentNode.removeChild(b);
                }
    
            });
    
            subCollectionCount++;
    
            var target = "#collectionSubproduct"+subCollectionCount; //get each sub collection container
            var title = $(target).prev().find('.SubproductTitle').text().trim(); //get sub collection title
            var insertIndex = 2; // insert clone at this index, 0-based
            
            cloneSubProduct( subCollectionCount, target, elem.link, elem.image, title, elem.subTitleText, insertIndex );
    
        });
    
        // Insert custom image above sub collection
        $('#subCollection_header_image').insertBefore('#SubCollectionFeatureEspot').addClass('visible');
    
         // Insert custom text above main collection
        $('#plants_collection_header').insertBefore('#Co-Wrap').addClass('visible');
    
    
    
        /******************** START SUB-COLLECTION ANALYTICS ******************/
        var subCollectionLength = $('.collectionSubproduct').length;
    
        // Loop through the sub collections
        for (var i = 1; i <= subCollectionLength; i++) {
    
            var prodName = [], prodBasecode = [], subCollectionTitle = [];
            var subProductThumb = $('#collectionSubproduct'+i+' .SubProductThumb');
            var product = $('#collectionSubproduct'+i+' .SubProductThumb .Product');
            var productCount = product.length;
    
            var title = $('#collectionSubproduct'+i)
                            .prev('.title_wrap')
                            .find('.SubproductTitle')
                            .text()
                            .trim();
    
            subCollectionTitle.push(title);
    
             // Loop through the products in sub collections
            for (var j = 0; j < productCount; j++) {
    
                // Target each "_analytics". Example: <div id="_analytics" basecode="157625" sku="" price="" name="Pilea Peperomioides Plant"></div>
                var prod = product[j].children[1]; 
                var basecode = prod.attributes[1].value;
                var name = prod.attributes[4].value;
                
                prodBasecode.push(basecode);
                prodName.push(name);
    
                product[j].setAttribute('data-subCol-title', subCollectionTitle);
                product[j].setAttribute('data-item-title', name);
                product[j].setAttribute('data-basecode', basecode);
                product[j].setAttribute('data-item-type', 'product');
             }
    
            sendImpressionTag(subCollectionTitle, prodBasecode); 
        }
    
        // Sub Collection Product Click tags
        $(document).on('click','.bd-responsive [id^="collectionSubproduct"] .Product', function(e) {
            var clickedID = $(this).attr('id');
            var subCollectionTitle = $(this).attr('data-subCol-title');
            var name = $(this).attr('data-item-title');
            var basecode = $(this).attr('data-basecode'); 
            var type = $(this).attr('data-item-type'); 
    
            sendSubProductClickTag(subCollectionTitle, basecode);
        });
    
        // Sub Collection IC Banner Click tags
        $(document).on('click','.bd-responsive [id^="collectionSubproduct"] [data-item-type="subcol-ic-banner"]', function(e) {
            var title = $(this).attr('data-title');
            var link = getLastURLSegment( $(this).attr('href') );
            var number = $(this).attr('data-banner-count'); 
            var type = $(this).attr('data-item-type');
    
            sendSubICBannerClickTag(title, link, number);
        });
         /******************** END SUB-COLLECTION ANALYTICS ******************/
    
    }); //end jQuery
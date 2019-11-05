setTimeout(function() {

    //look for the element, get its value, make it lower case === strictly match 'gpt'
    if ($('NODE SELECTOR').val().toLowerCase() === "gpt") {
        
        //define the cutoff time with the string of 'new Date();'
        var cutoff = new Date();
        
        //define the current time with the string of 'new Date();'
        var now = new Date();
        
        //checks every 1 millisecond for cutoff time vs now time
        var x = setInterval(function() {
        
            //if 'now time' is 'not equals to' saturday(6) AND is 'not equal to' sunday(0)
            if (now.getDay() !== 6 && now.getDay() !== 0) { // defines weekdays (mon-fri)

                //defines the cutoff time with 'setHours' method for Weekdays
                cutoff.setHours(14, 30); //2:30
                
                //calls the 'showButton' method/function
                showButton(cutoff, now);
                
            // if 'now time' is saturday(6)
            } else if (now.getDay() === 6) { // saturday

            	//defines the cutoff time with 'setHours' method for Saturday
                cutoff.setHours(13); //1PM

                //calls the 'showButton' method/function
                showButton(cutoff, now);
                
            } else { // if (now.getDay() === 0) { // sunday
            	
            	//defines the cutoff time with 'setHours' method for Sunday
                cutoff.setHours(11, 30); //11:30

                //calls the 'showButton' method/function
                showButton(cutoff, now);
            }

        }, 1000);

    }

	// method for 'showButton' in the global scope
	function showButton(cutoff, timeNow) {

	// if 'current time' is less than 'cutoff time'
    	if (timeNow.getTime() < cutoff.getTime()) {

    		//define a variable of 'a' with a node element and gets the parent (0)
        	var a = $('.caldel2').parent()[0]

        	// execute this node and insert it after 'a'
        	$('.messageContainer').insertAfter(a) 

    	} else {

		// or do this if above is not true
      		document.body.classList.remove('gpt_body');
    	}
	}
 
}, 3000); // 3 seconds from 'setTimeOut'
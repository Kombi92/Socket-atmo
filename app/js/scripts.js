var sec = 15*1000;



function setCookie(cname, cvalue, exdays) {
	
    var d = new Date();
    d.setTime(d.getTime() + (exdays*sec));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {	
    var user = getCookie("username");
    if (user == "")  {
    	swal ({   title: "Welcome!",
	    		text: "Write your nickname",
	    		type: "input",
	    		closeOnConfirm: false,
	    		allowEscapeKey: false,
	    		animation: "slide-from-top",
	    		inputPlaceholder: "Nick" },
	    		
    			function(inputValue){
    			if (inputValue === false) return false;   
    			if (inputValue === "") {     swal.showInputError("You need to write something!");  return false   }
    			
		    	swal("Nice!", "Your nick: " + inputValue, "success"); 
    		
		    	user = inputValue;
    	
			if (user != "" && user != null) {
					setCookie("username", user, 1);
				}
			window.scrollTo(0,500);
			
			setUsername();
			
    		});
    }
}

function setUsername(){
	var user = getCookie("username");
	if(user != ""){
		document.getElementById("Nick").innerHTML = "Welcome " + user + " !";
		}
}
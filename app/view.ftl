<#macro page_head>

    <meta charset="utf-8">
    <meta name="viewreport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet"  href="css/person.css">
    <link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
    <script type=text/javascript src="dist/sweetalert.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <script src="js/scripts.js"></script>

</#macro>
<#macro page_body>

   <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                 <ul class="nav navbar-nav ">
                    <li><a href="/">Home</a> </li>
                    <li><a href="/About">About</a> </li>
                  </ul>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">               
                    <a id="Nick" class="navbar-brand navbar-right">Welcome Stranger !</a>
                     <script>
    					setUsername();
					</script>
            </div>
        </div>
    </nav>

</#macro>
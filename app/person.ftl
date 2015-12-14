<#include "view.ftl">
<html>
<head>
<@page_head/>

    <title>Tron Game</title>
    <script src="js/phaser.min.js"></script>
    <script src="js/game_over.js"></script>
    <script src="js/game2.js"></script>
    <script src="js/menu.js"></script>
    <script src="js/main.js"></script>

</head>

<body onload="checkCookie()">

<@page_body/>

    <div class="container-fluid body-bg text-center">      
        <img src="image/game.png" class="img-rounded" style="display:inline" alt="Game" width="350" height="350">
            <div class="container-fluid body-bg text-center" id="mainContent">
			</div>
        <h4>Website is under construction</h4>
        <h4>Please come back later</h4>        
    </div> 
        		
    <#include "footer.ftl">
</body>
</html>
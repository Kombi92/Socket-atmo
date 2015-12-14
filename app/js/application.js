/**
 * Created with IntelliJ IDEA.
 * User: coder
 * Date: 4/8/13
 * Time: 11:33 PM
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    "use strict";


    var content = $('#content');
    var input = $('#input');
    var inputgame = $('canvas');
    var status = $('#status');
    var myName = false;
    var author = null;
    var logged = false;
    var socket = $.atmosphere;
    var request = { url: 'http://localhost:8080/chat',
        contentType : "application/json",
        logLevel : 'debug',
        transport : 'websocket' ,
        fallbackTransport: 'long-polling'};

    $(function() {
        $('#mainContent').focus();
    });


    request.onOpen = function(response) {
        content.html($('<p>', { text: 'Atmosphere connected using ' + response.transport }));
        input.removeAttr('disabled').focus();
        status.text('Choose name:');
    };

    request.onMessage = function (response) {
        var message = response.responseBody;
        try {
            var json = jQuery.parseJSON(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        input.removeAttr('disabled').focus();
        if (!logged) {
            logged = true;
            status.text(myName + ': ').css('color', 'blue');
        } else {
            var me = json.author == author;
            var date =  typeof(json.time) == 'string' ? parseInt(json.time) : json.time;
            addMessage(json.author, json.text, me ? 'blue' : 'black', new Date(date));
        }
    };

    request.onClose = function(response) {
        logged = false;
    }

    request.onError = function(response) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
            + 'socket or the server is down' }));
    };

    var subSocket = socket.subscribe(request);

    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();

            // First message is always the author's name
            if (author == null) {
                author = getCookie("username");
            }

            subSocket.push(jQuery.stringifyJSON({ author: author, message: msg }));
            $(this).val('');

            input.attr('disabled', 'disabled');
            if (myName === false) {
                myName = getCookie("username");
            }
        }
    });

   /* $("body").keydown(function(event) {
        console.log("clicked: " + event.target);
        //subSocket.push(new_direction='up');
    });

    $("#mainContent").keydown(function(e) {
        console.log("clickeddede: " + event.target);
            subSocket.push(new_direction='up');
    });
    $("canvas").click(function(e) {
        console.log("clickeddede: " + event.target);
        subSocket.push(new_direction='up');
    })
    */
    $('#mainContent').bind('keydown', function(e) {
        console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 83 && direction2!='up'){  //S

        subSocket.push(new_direction2='down');}
    });
    $('#mainContent').bind('keydown', function(e) {
       // console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 87 && direction2!='down'){  //W

            subSocket.push(new_direction2='up');}
    });
    $('#mainContent').bind('keydown', function(e) {
       // console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 65 && direction2!='right'){  //S

            subSocket.push(new_direction2='left');}
    });
    $('#mainContent').bind('keydown', function(e) {
        //console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 68 && direction2!='left'){  //S

            subSocket.push(new_direction2='right');}
    });

    $('#mainContent').bind('keydown', function(e) {
        //console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 38 && direction!='down'){  //S

            subSocket.push(new_direction='up');}
    });

    $('#mainContent').bind('keydown', function(e) {
        //console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 40 && direction!='up'){  //S

            subSocket.push(new_direction='down');}
    });

    $('#mainContent').bind('keydown', function(e) {
        //console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 37 && direction!='down'){  //S

            subSocket.push(new_direction='left');}
    });

    $('#mainContent').bind('keydown', function(e) {
        //console.log("clickeddede: " + event.keyCode);
        if (e.keyCode === 39 && direction!='left'){  //S

            subSocket.push(new_direction='right');}
    });

    function addMessage(author, message, color, datetime) {
        content.append('<p><span style="color:' + color + '">' + author + '</span> @ ' +
            + (datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()) + ':'
            + (datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes())
            + ': ' + message + '</p>');
    }

});


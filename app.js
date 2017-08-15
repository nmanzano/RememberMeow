$(document).ready(function() {
    console.log("hi");



    // construct board

    // create the container
    // add container to body
    // add squares to the container
    // identify top squares - make red
    // identify first and last square for each row that isn't first/last -make yellow/green
    // identify last row - make purple



    var square;
    var container = $("<div>");
    var count = 0;
    var countsToLeft = 14;
    var bottomRowCount = 17;
    var currentPosition = 0;
    var innerCount = 100;
    var namesOfBackground;
    var searchList = [];
    var firstClick;
    var secondClick;
    var thirdClick;
    var numOfClicks = 0;






    topRow();
    middleRow();
    middleRow();
    middleRow();
    middleRow();
    bottomRow();

    $("body").append(container);


    function topRow() {
        for (i = 0; i < 7; i++) {
            square = $("<div>");
            container.append(square);
            square.addClass("box topRow");
            square.attr("id", count);
            count++;
        }

    }

    function middleRow() {
        for (i = 0; i < 7; i++) {
            if (i === 0) {
                square = $("<div>");
                container.append(square);
                square.addClass("box left");
                var countLeft = count + countsToLeft;
                square.attr("id", countLeft);
                countsToLeft -= 2;


            } else if (i === 6) {
                square = $("<div>");
                container.append(square);
                square.addClass("box right");
                square.attr("id", count);
                count++;

            } else {
                square = $("<div>");
                container.append(square);
                square.addClass("box middle");
                // square.addClass("booyah");
                square.attr("id", innerCount++);
            }

        }
    }

    function bottomRow() {
        for (i = 0; i < 7; i++) {
            square = $("<div>");
            container.append(square);
            square.addClass("box bottom");
            square.attr("id", bottomRowCount);
            bottomRowCount--;

        }
    }


    function start() {
        var lastPosition = currentPosition;
        $(`#${lastPosition}`).removeClass('running');
        var moveForward;
        // var ranNumList = [1, 2, 3];
        // var numGen = 0;

        moveForward = 0;
        // if (currentPosition + numGen >= 21) {
        //     alert("You Won!");
        //     setTimeout(location.reload.bind(location), 200);
        // }

        $("#" + moveForward).addClass('running');
        currentPosition = parseInt($("#" + moveForward).attr('id'));


    }

    function moveForward() {
        var lastPosition = currentPosition;
        $(`#${lastPosition}`).removeClass('running');
        var moveForward;
        var ranNumList = [1, 2, 3];
        var numGen = ranNumList[Math.floor(Math.random() * ranNumList.length)];

        moveForward = currentPosition + numGen;
        if (currentPosition + numGen >= 21) {
            alert("We Have Ourselves Winner!");
            setTimeout(location.reload.bind(location), 200);
        }

        $("#" + moveForward).addClass('running');
        currentPosition = parseInt($("#" + moveForward).attr('id'));


    }

    function moveBackward() {
        var lastPosition = currentPosition;
        $(`#${lastPosition}`).removeClass('running');
        var moveForward;
        var ranNumList = [-1, -2, -3];
        var numGen = ranNumList[Math.floor(Math.random() * ranNumList.length)];

        moveForward = currentPosition + numGen;
        if (currentPosition + numGen < 0) {
            alert("You Lose! You must be more of a dog person.");
            setTimeout(location.reload.bind(location), 200);
        }

        $("#" + moveForward).addClass('running');
        currentPosition = parseInt($("#" + moveForward).attr('id'));


    }



    $('.target').on('click', function(ev) {
        start();
        $('.middle').addClass('middleBackground');

        for (var i = 100; i <= 119; i++) {
            var randomNum = Math.floor((Math.random() * 17) + 1);
            var randomPicTwo = 'images/' + 'images' + randomNum + '.jpg';
            var create = i;
            var testTwo = $('#' + create).css('background-image', 'url(' + randomPicTwo + ')');
            testTwo.attr('id', randomNum + '.jpg');
        }

        setTimeout(function() {
            $('.middle').removeClass('middleBackground');
            $('.middle').addClass('hiddenCat');
        }, 5000);


    });

    var clicks = [];

    $(".middle").click(function(event) {
        clicks.push(event.target.id);
        var firstClick = clicks[0];
        var lastClick = clicks[clicks.length - 1];

        if (searchList.length === 0) { // load images count

            console.log('searchlist 1', searchList);
            namesOfBackground = $(this);
            var nameOfPic = namesOfBackground.attr('id');
            var storedNumbers = [];
            var middleDivs = $('.middle');
            middleDivs.each(function(index, div) {
                storedNumbers.push($(div).attr('id'));
            });
            console.log(storedNumbers);
            for (var i = 0; i < storedNumbers.length; i++) {
                if (storedNumbers[i] === nameOfPic) {
                    searchList.push(storedNumbers[i]);
                }
            }

            $(event.target).addClass('middleBackground');
            $(event.target).removeClass('hiddenCat');
            searchList.pop(); // get rid of initial click

            console.log('after function', searchList);

        } else if (searchList.length !== 0) {
            console.log(event.target.id);

            if (event.target.id === searchList[0]) { // match found
                $(event.target).removeClass('hiddenCat');
                $(event.target).addClass('middleBackground');
                console.log(event.target);
                searchList.pop();
            } else if (event.target.id !== searchList[0]) { // no match
                alert('Wrong, try again!');
                moveBackward();
            }

            console.log('searchList last', searchList);
        }

        if (searchList.length === 0) { // all matches made
            clicks = [];
            console.log('Move to Next Picture');
            moveForward();
        }

    });





});

var matched_cards = [];
var memory = [];
var no_of_matches = 0;
var counter = 0;
var clock = 0;
var cards = [
    {
        id: '1',
        img: 'img/1.png'
    },
    {
        id: '2',
        img: 'img/2.png'
    },
    {
        id: '3',
        img: 'img/3.png'
    },
    {
        id: '4',
        img: 'img/4.png'
    },
    {
        id: '5',
        img: 'img/5.png'
    },
    {
        id: '6',
        img: 'img/6.png'
    },
    {
        id: '7',
        img: 'img/7.png'
    },
    {
        id: '8',
        img: 'img/8.png'
    },
    {
        id: '1',
        img: 'img/1.png'
    },
    {
        id: '2',
        img: 'img/2.png'
    },
    {
        id: '3',
        img: 'img/3.png'
    },
    {
        id: '4',
        img: 'img/4.png'
    },
    {
        id: '5',
        img: 'img/5.png'
    },
    {
        id: '6',
        img: 'img/6.png'
    },
    {
        id: '7',
        img: 'img/7.png'
    },
    {
        id: '8',
        img: 'img/8.png'
    }
];


// Timer formatter
function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}

// Calculate game time
function timer() {
    interval = setInterval(function () {
        clock++;
        $('.time').text(fmtMSS(clock));
        //console.log(clock);
    }, 1000);
}

// build card board
function build_html() {
    no_of_matches = 0;
    var game = $('.game');
    cards = shuffle(cards);
    var cards_board = document.createElement('div');
    cards_board.className = 'all-cards';
    cards_board.innerHTML = '';
    
    for (i = 0; i < cards.length; i++) {
        cards_board.innerHTML +=
            `<div class="card" id="card_${i}" data-id="${cards[i].id}" onclick="is_matched(this, ${cards[i].id} )">
                <img src="img/front.png">
            </div>`
    }
    game.append(cards_board);
}

// flip cards back if not the same
function rest_unmatched() {
    var img1 = $('#' + memory[0]);
    var img2 = $('#' + memory[1]);
    console.log(img1, img2);
    $(img1).children().attr('src', 'img/front.png');
    $(img2).children().attr('src', 'img/front.png');
    
    matched_cards = [];
    memory = [];
}


// calculate the rating
function rating() {
    if (counter <= 16) {
        //console.log('*  *   *');
        $('.stars li > i').addClass('rate');
    }
    else if (counter > 16 && counter < 24) {
        //console.log('*  *');
        $('.stars li:nth-child(-n + 2)').addClass('rate');
    }
    else {
        //console.log('*');
        $('.stars li:nth-child(1)').addClass('rate');
    }
}

// check if 2 cards is matched
function is_matched(k, v) {
    $('.restart').attr("disabled", false);
    counter += 1;
    if (counter == 1) {
        timer();
    }
    $('.moves').html(counter);
    if (matched_cards.length < 2) {
        // change front img with img to compare
        $('#' + k.id).children().attr('src', 'img/' + v + '.png');
        if (matched_cards.length == 0) {
            matched_cards.push(v);
            memory.push(k.id);
        }
        else if (matched_cards.length == 1) {
            matched_cards.push(v);
            memory.push(k.id);
            if (matched_cards[0] == matched_cards[1]) {
                no_of_matches += 2;
                matched_cards = [];
                memory = [];
                // if all cards are flipped
                if (no_of_matches == cards.length) {
                    rating();
                    $('.modal').fadeIn().show();
                    $('.overlay').show();
                    clearInterval(interval);
                }
            }
            //if 2 cards unmatched
            else {
                $('#' + k.id).children().attr('src', 'img/' + matched_cards[1] + '.png');
                setTimeout(rest_unmatched, 1000);
            }
        }
        
    }
    console.log(no_of_matches);
    console.log(counter);
}


// restart the game

function restart() {
    matched_cards = [];
    memory = [];
    no_of_matches = 0;
    counter = 0;
    clock = 0;
    $('.moves').empty();
    $('.back').hide();
    $('.front').show();
    $('.all-cards').remove();
    $('.stars li').removeClass('rate');
    $('.modal').css('display', 'none');
    $('.overlay').css('display', 'none');
    clearInterval(interval);
    $('.time').text(fmtMSS(clock));
    build_html();
}


// close results modal

$('.close').on('click', function () {
    $('.modal').css('display', 'none');
    $('.overlay').css('display', 'none');
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

build_html();
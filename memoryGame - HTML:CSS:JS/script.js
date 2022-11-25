

// // // // // // // // // // First Screen // // // // // // // // // // 

// variables
let start = document.querySelector("button");
let section = document.querySelector("section");
let container = document.querySelector(".container");
let firstScreen = document.getElementsByClassName("firstScreen")[0];
let endScreen = document.querySelector(".endScreen");



start.addEventListener("click", startGame);

// start the game
function startGame(){
    container.classList.remove("hidden");
    section.classList.remove("hidden");
    container.classList.add("animateSlideIN");

    
    firstScreen.classList.add("slideOut");
    setTimeout( function(){
        firstScreen.classList.add("hidden");
    }, 3000)

    game();
}






// // // // // // // // // // Game // // // // // // // // // // 




// // // // // // Sound and Music 

// sounds
let audio = new Audio("sounds/Yevhen_Lokhmatov_-_Funny_And_Cute.mp3");
let cardSound = new Audio("sounds/Card-flip-sound-effect.mp3");
let wrong = new Audio("sounds/Roblox-death-sound.mp3");
let winGame = new Audio("sounds/TB7L64W-winning.mp3");
let right = new Audio("sounds/K3RTHA7-game-win-horns.mp3");

// // //play sounds

let playMusic = audio.play();

// repeat when ended
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

// function to load music at specific times
function flippingCard(){
    cardSound.play();
}
function wrongCard(){
    wrong.play();
}
function winSound(){
    winGame.play();
}
function rightCard(){
    right.play();
}

// set music even if reload
window.onload = playMusic;






// // // // // // get elements

// pony image
let cardImage = document.getElementsByClassName("imgBack");

// div with both sides
let card = document.getElementsByClassName("card");

// back card
let imgBack = document.getElementsByClassName("back");

// front card
let imgFront = document.getElementsByClassName("front");






// // // // // // set variables

// score
let score = 0;
let div = document.getElementsByClassName("theScore")[0];
let p = document.createElement("p");
p.setAttribute("class", "customWhite");
p.innerHTML = "<span> Score : " + score + "</span>";


// button return menu
let button = document.createElement("button");
button.innerHTML = "Back to menu";
button.setAttribute("class", "backMenu");

button.addEventListener("click", function(){
    location.reload();
})

// index flipped cards
let flippedCards = 0;
// sources of flipped images to compare
let clickedImages = [];
// parent of the flipped images
let parent = [];
// parent of the front flipped image
let siblings = [];
// get images that have been clicked
let allClickedimages = [];




// // // // // // //  //  //  // run game // // // // // // //  //  // 

function game() {

        // Log score & Back to menu
        div.appendChild(p);
        div.insertAdjacentElement("beforeend", button);


    // loop through all cards
    for (let i = 0; i < card.length; i++) {

        card[i].addEventListener("click", function(event) {

            if(!event.detail || event.detail === 1){

                // launch sound effect when card is flipped
            flippingCard();

            // get all clicked images for function compare
            allClickedimages.push(card[i])

            // flipping card function
            card[i].classList.toggle("flipcard")
            imgBack[i].classList.remove("hidden");
            imgBack[i].classList.add("block");
            imgFront[i].classList.add("hidden");
            imgFront[i].classList.remove("block");


            // add infos in array for compare function
            clickedImages.push(cardImage[i].src);
            parent.push(cardImage[i].parentNode);
            siblings.push(cardImage[i].parentNode.previousSibling);

            // increment flippedCards
            flippedCards++;

            // when there are 2 flippedCards on the field, wait almost 3 seconds so that we can memorize the ponies before running compare function
            setTimeout(function() {
                if (flippedCards === 2) {
                    compare()
                    p.nnerHTML = "";
                    p.innerHTML = "<span> Score : " + score + "</span>";
                }
            }, 2500)


            }
            
        })

    }
}




// // // // // // // // // compare if same card

function compare() {

    if (clickedImages[0] == clickedImages[1]) {

        // if the images are the same: score increment + goodCard sound effect
        rightCard();
        score++;
        
        // if score = 10, player wins, winning sound effect, end screen
        if(score === 10){
            winSound();
            slideEndScreen();
        }

    } else {

        // if not, flipped cards again + wrongCard sound effect
        wrongCard();
        for (let i = 0; i < parent.length; i++) {
            siblings[i].classList.remove("hidden");
            siblings[i].classList.add("block");

            parent[i].classList.add("hidden");
            parent[i].classList.remove("block");

            parent[i].parentNode.classList.toggle("flipcard");
        }

    }

    // reset all values for next cards
    flippedCards = 0;
    clickedImages = [];
    parent = [];
    siblings = []
}







// // // // // // // // // // End Screen // // // // // // // // // // 

// add and remove classes for slide animation
function slideEndScreen(){

    container.classList.add("slideOut");
    container.classList.remove("animateSlideIN");

    setTimeout(function(){
    container.classList.add("hidden")}, 3000);

    endScreen.classList.remove("hidden");
    endScreen.classList.add("animateSlideIN");

}

// play again

let goAgain = document.getElementsByTagName("button")[2];

goAgain.addEventListener("click", function(){
    location.reload();
})



// // // // // // // // Randomizer option // // // // // // // // 




// button
let randomizer = document.querySelectorAll("button")[1];

// all sources
let allImagesSrc = ["./imgGoodSize/AJ.png", "./imgGoodSize/Starlight.png", "./imgGoodSize/Derpy.png", "./imgGoodSize/Rarity.png", "./imgGoodSize/Spike.png", "./imgGoodSize/Vinyl.png", "./imgGoodSize/PinkiePIE.png", "./imgGoodSize/Fluttershy.png", "./imgGoodSize/Twilight.png", "./imgGoodSize/Rainbow.png"];
let allImagesSrc2 = ["./imgGoodSize/AJ.png", "./imgGoodSize/Starlight.png", "./imgGoodSize/Derpy.png", "./imgGoodSize/Rarity.png", "./imgGoodSize/Spike.png", "./imgGoodSize/Vinyl.png", "./imgGoodSize/PinkiePIE.png", "./imgGoodSize/Fluttershy.png", "./imgGoodSize/Twilight.png", "./imgGoodSize/Rainbow.png"];

// variables to store and increment
let index = 0;
let firstHalf = [];
let secondHalf = [];
let all = [];



// divide all cards in 2 arrays
function halfCards(){

    for(let i=0; i<imgBack.length; i++){
        all.push(imgBack[i]);
    }
    console.log(all[0].children[0].src);

    shuffle(all);

    console.log(all[0].children[0].src);

    for(let i=0; i<all.length/2; i++){
        firstHalf.push(all[i]);
    }
    console.log(firstHalf);
    
        for (let j = 10; j <= 19; j++) {
            secondHalf.push(all[j]);
        }
    console.log(secondHalf);
}


// Shuffle src arrays
function shuffle(a) {

    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// give new src to the images
function randomizeImages(){

    for(let i=0; i<firstHalf.length; i++){
        firstHalf[i].children[0].setAttribute("src", allImagesSrc[i]);
}
    for(let j=0; j<secondHalf.length; j++){
        secondHalf[j].children[0].setAttribute("src", allImagesSrc2[j]);
    }
    startGame();
    return
}




// //// //// // event randomize

randomizer.addEventListener("click", function(){

    shuffle(imgBack);

    halfCards();

    shuffle(allImagesSrc);
    shuffle(allImagesSrc2);


    randomizeImages();

})

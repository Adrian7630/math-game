let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

// start game 

document.getElementById("startreset").onclick = function(){

    if(playing == true)
    {

        location.reload();          // reload page

    }else{

        playing = true;          // play the game

        score = 0;
        document.getElementById("scorevalue").innerHTML = score;            // show score
        
        // show the time !

        show("timeremaining");          
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        hide("gameOver");       // hide the box

        document.getElementById("startreset").innerHTML = "Reset Game";

        startCountdown();       // start count 60 s

        generateQ();            // generate new Questions !

    }
}

// Check on an answer box 
for(i = 1; i < 5; i++)
{
    document.getElementById("box" + i).onclick = function(){

        if (playing == true)
        {
    
            if(this.innerHTML == correctAnswer)        // document.getElementById("box1") . innerHTML
            {
    
                score++;
                document.getElementById("scorevalue").innerHTML = score;
    
                hide("wrong");
                show("correct");
                setTimeout(function(){
    
                    hide("correct");
    
                }, 1000);                 // 1000 mili seconds
    
                generateQ();
    
            }else{
    
                hide("correct");
                show("wrong");
                setTimeout(function(){
    
                    hide("wrong");
    
                }, 1000);                 // 1000 mili seconds
    
            }
    
        }
    
    }
}

// Time counting function

function startCountdown()           // start count 60 s
{

    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        if(timeremaining == 0)
        {
            stopCountdown();

            show("gameOver");

            document.getElementById("gameOver").innerHTML = "<p>Game over ! </p> <p>Your score is " + score + ". </p>";
            
            hide("timeremaining");   // from CSS change the display too none ! 
            hide("correct");
            hide("wrong");

            playing = false;

            document.getElementById("startreset").innerHTML = "Start Game";

        }

    }, 1000);

}

function stopCountdown()            //stop count
{
    clearInterval(action);
}

function hide(Id)       // hide elements 
{

    document.getElementById(Id).style.display = "none"; // from CSS change the display to none !

}

function show(Id)
{

    document.getElementById(Id).style.display = "block";    // from CSS change the display to block !

}

function generateQ()                //generate question and multiple answers
{
    // create Question and correct Answer

    let x = 1 + Math.round(9 * Math.random());
    let y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;     // fill the box with correct answer . 

    // Fill the other boxes with wrong answers 

    let answers = [correctAnswer];

    for (i = 1; i < 5; i++)
    {

        if (i !== correctPosition)      
        {

            let wrongAnswer ;

            do
            {

                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));

            }while(answers.indexOf(wrongAnswer) > -1)

            document.getElementById("box" + i).innerHTML = wrongAnswer;     // Fill the random boxes with random answers

            answers.push(wrongAnswer);

        }

    }

}
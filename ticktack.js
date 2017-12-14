//starts a new game
function newGame()
{
    for(var n = 1; n < 10; n++)
    {
        clearFinishedGame(n);
    }
	
    winner = null;

    if(turnChoice(true))
    {
        computerPlayer();
    }
    
    //make self executing?
    showStats();
}

function turnChoice()
{
	var decision = Math.random();
    var result = false;
	
	if(decision < .5)
    {
        document.turn = "o";
    }
    else
    {
        document.turn = "x";
    }
	
    if(document.turn == "o")
    {
        outputToUser("You begin.");
    }
    else
    {
        outputToUser("Computer begins.");
        result = true;
    }
    
    return result;
}

function clearFinishedGame(number)
{
    document.getElementById("box" + number).innerText = "";
}

function outputToUser(message)
{
    document.getElementById("output").innerText = message;
}

function statistics(w, l, d)
{
	this.wins = w;
	this.losses = l;
	this.draws = d;
}

var user = new statistics(0, 0, 0);
var computer = new statistics(0, 0, 0);

//next move/error
function nextMove(box)
{
    if(winner != null)
    {
        outputToUser(winner + " won.");
    }
    else if(box.innerText == "")
    {
        box.innerText = "o";
        newTurn();
    }
    else
    {
        outputToUser("Position taken. Try again.");
    }
}

//new turn
function newTurn()
{
    if(checkForWinner(true))
    {
		outputToUser("Game over: " + winner + " WIN");
        
		winLossIncrement();
    }
    else if(checkForDraw(true))
    {
        outputToUser("Game over: DRAW");
		
		drawIncrement();
    }
    else if(document.turn == "x")
    {
        document.turn = "o";
	    computerPlayer();
    }
    else
    {
        document.turn = "x";
		computerPlayer();
    }
}

//AI opponent with random token placement
function computerPlayer()
{
    var placement = Math.floor(Math.random() * 9) + 1;
    while(document.getElementById("box" + placement).innerText != "")
    {
        placement = Math.floor(Math.random() * 9) + 1;
    }
    document.getElementById("box" + placement).innerText = "x";
	
	if(checkForWinner(true))
	{
		newTurn();
	}
    else if(checkForDraw(true))
    {
        newTurn();
    }
}

//access box value
function getPosition(boxNumber)
{
    return document.getElementById("box" + boxNumber).innerText;
}

//determine win
function checkForWinner()
{
	console.log("checkForWinner reached");
	
    var result = false;
	
    if(checkForWin(1, 2, 3) ||
       checkForWin(4, 5, 6) ||
       checkForWin(7, 8, 9) ||
       checkForWin(1, 4, 7) ||
       checkForWin(2, 5, 8) ||
       checkForWin(3, 6, 9) ||
       checkForWin(1, 5, 9) ||
       checkForWin(3, 5, 7))
    {
        console.log("winning row is found");
		
        result = true;
    }
    
    return result;
}

//check box value
function checkForWin(a, b, c)
{
    var result = false;
	
    if(getPosition(a) == "x" && getPosition(b) == "x" && getPosition(c) == "x")
    {
		console.log("computer win found");
		
		result = true;
		winner = "Computer";
    }
    else if(getPosition(a) == "o" && getPosition(b) == "o" && getPosition(c) == "o")
    {
		console.log("user win found");

		result = true;
		winner = "User";
    }
    
    return result;
}

//determine draw
function checkForDraw()
{
	var positions = [];
    var result = false;
    
	for(n = 1; n < 10; n++)
	{
        if(document.getElementById("box" + n).innerText != "")
        {
            positions[n - 1] = document.getElementById("box" + n).innerText;
        }
        else
        {
            break;
        }
	}

	console.log(positions.length);
	
	if(positions.length == 9)
	{
		result = true;
	}
    return result;
}

//increment w/l
function winLossIncrement()
{
	if(winner == "Computer")
	{
		computer.wins = (computer.wins + 1);
		user.losses = (user.losses + 1);
	}
	else if(winner == "User")
	{
		user.wins = (user.wins + 1);
		computer.losses = (computer.losses +1);
	}
}

//increment d
function drawIncrement()
{
	user.draws++;
	computer.draws++;
}

//make self executing?
//display statistics
function showStats()
{
	document.getElementById("uW").innerText	= user.wins;
    document.getElementById("uL").innerText	= user.losses;
    document.getElementById("uD").innerText	= user.draws;
    document.getElementById("cW").innerText	= computer.wins;
    document.getElementById("cL").innerText	= computer.losses;
    document.getElementById("cD").innerText	= computer.draws;   
}
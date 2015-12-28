var game=new Game();
var activecellid="00";


var board0 =
	[	0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0
	
	];
var board1 = 
	[	-9,0,0,0,-3,0,0,0,0,
0,-5,-7,-2,0,-1,0,-6,-9,
-8,0,0,0,0,0,-1,0,0,
0,0,0,-3,0,-2,-6,-1,0,
0,0,-9,-1,0,-4,0,-2,-8,
-1,-2,-3,0,0,0,0,-9,0,
0,-7,0,-6,0,-3,0,-8,-4,
-4,-3,-1,0,0,-9,0,0,0,
0,0,0,0,-5,-7,0,-3,-1		
	];
	var board2 =[0,0,-2,-7,0,-5,0,-8,0,0,0,0,-9,-8,0,-5,0,0,0,-8,0,0,0,-1,0,-6,0,0,0,-6,0,-5,-8,0,0,-7,0,-9,-5,0,0,0,0,-4,-8,-8,0,0,0,-9,-4,-6,-5,0,0,0,-8,0,-6,-2,0,-9,-5,-9,-6,0,0,0,-7,0,-2,0,0,0,-3,-8,0,0,0,0,0];
	var board3 =[-5,-3,-1,-6,-7,-8,0,0,0,-4,0,0,0,0,0,-5,0,0,-9,-7,0,0,-4,0,0,0,-1,0,0,0,0,-8,-2,0,0,0,0,0,0,-9,-6,-7,-4,-8,-3,0,0,-8,-5,0,0,-9,0,0,-2,0,0,-7,0,0,0,-5,0,-6,0,0,0,-3,0,-7,0,0,-8,0,-7,0,0,-6,-3,0,-4];
	var board4 =[-5,-7,-1,0,0,0,0,0,0,0,0,0,0,0,-2,0,-5,0,0,0,0,0,-6,0,0,-8,-1,0,0,0,-8,0,0,0,-7,0,0,-5,-2,0,-3,0,0,0,0,0,-8,0,0,-2,-5,-4,-6,-3,0,-6,-7,0,-5,0,0,-4,-8,-9,-3,-5,-6,-8,-4,-1,0,0,-4,0,-8,-2,-7,0,0,0,-5];
	

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode > '47' && e.keyCode < '58')
		game.modifyCell(activecellid,e.keyCode-48);
	if (e.keyCode > '95' && e.keyCode < '106')
		game.modifyCell(activecellid,e.keyCode-96);
	game.checkSolution();
	game.update();
		

}

function partialIsSolution(partial)
{
	var partialsum=0;

	for (var i=0;i<partial.length;i++)
	{
		for (var j=i+1;j<partial.length;j++)
		{
			if (partial[i]==partial[j]) return false;
		}
		partialsum+=partial[i];
	}
	if (partialsum==45) return true;
	else return false;
}

function clicked(id)
{
	if(id<10) id="0"+id; //starting zero fix
	else id=""+id;
	document.getElementById(activecellid).style.backgroundColor= "white";
	document.getElementById(id).style.backgroundColor= "lightblue";
	activecellid=id;

}

function pushed(value)
{
	game.modifyCell(activecellid,value);
	game.checkSolution();
	game.update();
	
}

function printOut(str)
{
	var wrapperinnerhtml=document.getElementById("wrapper").innerHTML;
	document.getElementById("wrapper").innerHTML=wrapperinnerhtml+str;

}

function saveSudokuCode()
{
	var sudokucode=game.table;
	document.getElementById("sudokucode").value=sudokucode;

}

function loadSudokuCode(presetboard)
{
	var sudokucodearray=[];
	
	if (typeof(presetboard)==='undefined') 
	{
		var sudokucode=document.getElementById("sudokucode").value;
		var sudokucodearray = sudokucode.split(",");
	}
	else 
		{switch(presetboard)
		{
			case 1: sudokucodearray=board1;
				break;
			case 2: sudokucodearray=board2;
				break;
			case 3: sudokucodearray=board3;
				break;
			case 4: sudokucodearray=board4;
				break;
			default: sudokucodearray=board0;
				
		};
	}
		
	
	if (sudokucodearray.length==81)
	{
		game.fillTable(sudokucodearray);
		game.draw();

		game.update();
	}
}

function Game()
{
	this.table=[];
	
	this.fillTable=function(board)
	{
		this.table=[];
		var k=0;
		for (var i=0; i<9; i++)
		{
			var row = [];
			for (var j=0; j<9; j++)
			{
				row.push(board[k]);
				k++;
			}
			this.table.push(row);
		}
		
	}
	
	this.checkSolution=function()
	{
		var solutionisperfect=true;
		for (var j=0;j<9;j++)
		{
			var partialrow=[];
			var partialcolumn=[];
			var partialsquare=[];
			for (var i=0;i<9;i++)
			{
				partialcolumn.push(Math.abs(this.table[i][j]));
				partialrow.push(Math.abs(this.table[j][i]));
				var squarestartx=Math.floor(j/3)*3;
				var squarestarty=(j%3)*3;
				var partialsquare=[
					Math.abs(this.table[0+squarestartx][0+squarestarty]),
					Math.abs(this.table[0+squarestartx][1+squarestarty]),
					Math.abs(this.table[0+squarestartx][2+squarestarty]),
					Math.abs(this.table[1+squarestartx][0+squarestarty]),
					Math.abs(this.table[1+squarestartx][1+squarestarty]),
					Math.abs(this.table[1+squarestartx][2+squarestarty]),
					Math.abs(this.table[2+squarestartx][0+squarestarty]),
					Math.abs(this.table[2+squarestartx][1+squarestarty]),
					Math.abs(this.table[2+squarestartx][2+squarestarty])
				];
				
				
			}
			
			if (!partialIsSolution(partialrow) 
				|| !partialIsSolution(partialcolumn)
				|| !partialIsSolution(partialsquare)) solutionisperfect=false;
		}
		
		if (solutionisperfect==true) alert('nyertél!');
		
	}
	
	this.modifyCell=function(id,value)
	{
		if (this.table[id.charAt(0)][id.charAt(1)]>=0)
			this.table[id.charAt(0)][id.charAt(1)]=value;
		
	}
	
	this.draw=function()
	{
		var node = document.getElementById('wrapper');
		while (node.hasChildNodes()) {
			node.removeChild(node.firstChild);
		}
		
		for (var i=0; i<this.table.length;i++)
		{
			for (var j=0; j<this.table[i].length;j++)
			{
				
				var cellid=""+i+j;
				if (this.table[i][j]<0) 
					cellclass="protectedcell";
				else
					cellclass="cell";
				printOut("<div id='"+cellid+"' class='"+cellclass+"' onclick='clicked("+cellid+")'>");
				//if (this.table[i][j]!=0) printOut(this.table[i][j]);
				printOut("</div>");
				
				var cellStyle=document.getElementById(cellid).style;
				if (j==0)
					cellStyle.clear = "left";
				if (j==8)
					cellStyle.borderRightWidth = "2px";
				if (i==8)
					cellStyle.borderBottomWidth = "2px";
				if (i%3==0)
					cellStyle.borderTopWidth = "2px";
				if (j%3==0)
					cellStyle.borderLeftWidth = "2px";
			}
		}

	}
	
	this.createbuttons=function()
	{
		document.getElementById("buttons").innerHTML="";
		var cellid="buttons";
		for (var i=0; i<10; i++)
		{
			document.getElementById("buttons").innerHTML+="<div id="+cellid+i+" class='cell' onclick='pushed("+i+")'>"+i+"</div>";
			var cellStyle=document.getElementById(""+cellid+i).style;
			cellStyle.marginTop="30px";
			cellStyle.borderBottomWidth="1px";
			if (i==9)
				cellStyle.borderRightWidth="1px";
		}
	}
	
	this.update=function()
	{
		for (var i=0; i<this.table.length;i++)
		{
			for (var j=0; j<this.table[i].length;j++)
			{
				if (this.table[i][j]==0)
				document.getElementById(""+i+j).innerHTML="";
				else
				document.getElementById(""+i+j).innerHTML=Math.abs(this.table[i][j]);
			}
			
		}
	}

}


function game_init() {

	game.fillTable(board0);
	game.createbuttons();
	game.draw();
	game.update();

}


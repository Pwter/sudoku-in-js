var game=new Game();
var activecellid="00";



document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode > '47' && e.keyCode < '58') {
		game.modifyCell(activecellid,e.keyCode-48);
		game.checkSolution();
		game.update();
		
    }

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

function printOut(str)
{
	var wrapperinnerhtml=document.getElementById("wrapper").innerHTML;
	document.getElementById("wrapper").innerHTML=wrapperinnerhtml+str;

}

function Game()
{
	this.table=[];
	
	this.fillTable=function(board)
	{
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
	var board1 = 
		[	1,2,3,1,2,3,1,2,3,
			4,5,6,4,5,6,4,5,6,
			7,8,9,7,8,9,7,8,9,
			1,2,3,-1,-2,-3,1,2,3,
			4,5,6,-4,-5,-6,4,5,6,
			7,8,9,-7,-8,-9,7,8,9,
			1,2,3,1,2,3,1,2,3,
			4,5,6,4,5,6,4,5,6,
			7,8,9,7,8,9,7,8,9
			
		];
	var board2 =
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
	var board3 = 
	[0,0,-2,-6,-7,0,-9,-5,0,
0,0,-6,-5,-1,-9,0,0,0,
0,-9,0,0,0,-8,-1,0,0,
0,0,0,0,-3,-1,0,-8,0,
0,-6,0,0,0,-7,0,0,0,
0,-2,-3,0,0,-6,-5,0,0,
0,0,0,-1,-6,-4,0,-2,0,
-2,0,0,-7,0,0,-6,0,-9,
0,0,-5,0,0,-2,0,0,-8];
	var board4 =
	[-9,0,0,0,-3,0,0,0,0,
0,-5,-7,-2,0,-1,0,-6,-9,
-8,0,0,0,0,0,-1,0,0,
0,0,0,-3,0,-2,-6,-1,0,
0,0,-9,-1,0,-4,0,-2,-8,
-1,-2,-3,0,0,0,0,-9,0,
0,-7,0,-6,0,-3,0,-8,-4,
-4,-3,-1,0,0,-9,0,0,0,
0,0,0,0,-5,-7,0,-3,-1];
	game.fillTable(board4);
	game.draw();
	game.update();

}


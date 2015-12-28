document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode > '47' && e.keyCode < '58') {
		document.getElementById(activecellid).innerHTML= e.keyCode-48;
    }

}

var activecellid="00";

function clicked(id)
{
	if(id<10) id="0"+id; //starting zero fix
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
	
	this.fillTable=function()
	{
		for (var i=0; i<9; i++)
		{
			var row = [];
			for (var j=0; j<9; j++)
			{
				row.push(0);
			}
			this.table.push(row);
		}
		
	}
	
	this.draw=function()
	{
		for (var i=0; i<this.table.length;i++)
		{
			for (var j=0; j<this.table[i].length;j++)
			{
				var cellid=""+i+j;
				printOut("<div id='"+cellid+"' onclick='clicked("+cellid+")'>"+this.table[i][j]+"</div>");
				
				var cellStyle=document.getElementById(cellid).style;
				cellStyle.borderColor = "black";
				cellStyle.borderStyle = "solid";
				cellStyle.borderWidth = "1px 0px 0px 1px";
				cellStyle.width = "30px";
				cellStyle.height = "30px";
				cellStyle.float = "left";
				cellStyle.lineHeight = "30px";
				cellStyle.textAlign = "center";
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

}



function game_init() {
	var game=new Game();
	//alert(game.a);
	game.fillTable();
	game.draw();

}

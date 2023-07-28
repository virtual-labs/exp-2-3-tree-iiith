var MIN_MAX_DEGREE = 3;
var MAX_MAX_DEGREE = 3;
var HEIGHT_DELTA  = 60;
var NODE_SPACING = 10; 
var STARTING_Y = 70;
var WIDTH_PER_ELEM = 60;
var NODE_HEIGHT = 7;
var MESSAGE_X = 5;
var MESSAGE_Y = 10;

var LINK_COLOR = "#007700";
var HIGHLIGHT_CIRCLE_COLOR = "#3297CF";
var FOREGROUND_COLOR = "#000000";
var BACKGROUND_COLOR = "#97CB3B";
function TwoThreeTree(am, w, h)
{
	this.init(am, w, h);

}

TwoThreeTree.prototype = new Algorithm();
TwoThreeTree.prototype.constructor = TwoThreeTree;
TwoThreeTree.superclass = Algorithm.prototype;
TwoThreeTree.prototype.init = function(am, w, h)
{
	TwoThreeTree.superclass.init.call(this, am, w, h);
	this.nextIndex = 0;

	this.starting_x = w / 1.5;

	this.addControls();	
	this.max_keys = 2;
	this.min_keys = 1;
	this.split_index = 1;
	
	this.max_degree = 3;
	this.messageID = this.nextIndex++;
	this.cmd("CreateLabel", this.messageID, "", MESSAGE_X, MESSAGE_Y, 0);
	this.moveLabel1ID = this.nextIndex++;
	this.moveLabel2ID = this.nextIndex++;
	
	animationManager.StartNewAnimation(this.commands);
	animationManager.skipForward();
	animationManager.clearHistory();
	this.commands = new Array();
	
	this.xPosOfNextLabel = 100;
	this.yPosOfNextLabel = 200;
}
TwoThreeTree.prototype.addControls =  function()
{
	this.controls = [];
	
	this.insertButton = document.getElementById("control-prac-root");
	this.insertButton.onclick = this.insertCallback.bind(this);
	
	this.insertLeftButton = document.getElementById("control-prac-insert-same");
	this.insertLeftButton.onclick=this.insertsameCallback.bind(this);
	
	this.insertRightButton = document.getElementById("control-prac-insert-l");
	this.insertRightButton.onclick=this.insertLeftCallback.bind(this);

	this.insertRightButton = document.getElementById("control-prac-insert-m");
	this.insertRightButton.onclick=this.insertMiddleCallback.bind(this);

	this.insertRightButton = document.getElementById("control-prac-insert-r");
	this.insertRightButton.onclick=this.insertRightCallback.bind(this);
	
	this.rightrotateButton = document.getElementById("control-prac-insert-split");
	this.rightrotateButton.onclick=this.rightandsplitCallback.bind(this);

	this.resetButton = document.getElementById("control-prac-reset");
	this.resetButton.onclick=this.resetCallback.bind(this);
}
var ptr=0
var insertedvaluelist=[10,18,30,19,24,20,8];
var steps=["Insert","Insert Right and split","Insert Right","Insert Right and split","Insert Middle","Insert Left"]
TwoThreeTree.prototype.insertsameCallback=function(event)
{
	if(steps[ptr-1]=="Insert")
	{
	document.getElementById("nextcomment").innerHTML="Correct. We can have a maximum of two elements in a node."
	this.insertCallback(this);

	}else{
		document.getElementById("nextcomment").innerHTML="Incorrect. The correct operation is "+steps[ptr-1];
	}
}
TwoThreeTree.prototype.resetCallback=function(event){
	this.nextIndex = 1;
	this.treeRoot = null;
	ptr=1;
	stepschosen=[];
	document.getElementById("nextcomment").innerHTML="";
	document.getElementById("nextelement").innerHTML="";
	for(k=0;k<insertedvaluelist.length;k++)
	{
			animationManager.skipBack();
	}
	this.insertButton.disabled=false;
	this.insertButton.style.backgroundColor="#3297CF";
	this.insertButton.style.border="#3297CF";
}
TwoThreeTree.prototype.insertLeftCallback=function(event)
{
	if(steps[ptr-1]=="Insert Left")
	{
	document.getElementById("nextcomment").innerHTML="Correct. Since, the current element is less than the first element of root, we insert towards left."
	this.insertCallback(this);

	}else{
		document.getElementById("nextcomment").innerHTML="Incorrect. The correct operation is "+steps[ptr-1];
	}
}
TwoThreeTree.prototype.insertRightCallback=function(event)
{
	if(steps[ptr-1]=="Insert Right")
	{
	document.getElementById("nextcomment").innerHTML="Correct. Since, the current element is greater than all elements of root, we insert towards right."
	this.insertCallback(this);

	}else{
		document.getElementById("nextcomment").innerHTML="Incorrect. The correct operation is "+steps[ptr-1];
	}
}
TwoThreeTree.prototype.insertMiddleCallback=function(event)
{
	if(steps[ptr-1]=="Insert Middle")
	{
	document.getElementById("nextcomment").innerHTML="Correct. Current elemet lies in between first and last element of root. So, we insert in middle."
	this.insertCallback(this);

	}else{
		document.getElementById("nextcomment").innerHTML="Incorrect. The correct operation is "+steps[ptr-1];
	}
}
TwoThreeTree.prototype.rightandsplitCallback=function(event)
{	
	if(steps[ptr-1]=="Insert Right and split")
	{
	document.getElementById("nextcomment").innerHTML="Correct. Current element is greater than all elements in the root so we insert towards right. The insertion causes overflow so we split."
	this.insertCallback(this);

	}else{
		document.getElementById("nextcomment").innerHTML="Incorrect. The correct operation is "+steps[ptr-1];
	}
}
TwoThreeTree.prototype.enableUI = function(event)
{
	var i;
	for (i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}	
}
TwoThreeTree.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}	
}
TwoThreeTree.prototype.insert = function(tree, insertValue)
{
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("Step");
	if (tree.isLeaf)
	{
		this.cmd("SetText", this.messageID, "Inserting " + insertValue + ".  Inserting into a leaf");
		tree.numKeys++;
		this.cmd("SetNumElements", tree.graphicID, tree.numKeys);
		var insertIndex = tree.numKeys - 1;
		while (insertIndex > 0 && tree.keys[insertIndex - 1] > insertValue)
		{
			tree.keys[insertIndex] = tree.keys[insertIndex - 1];
			this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
			insertIndex--;
		}
		tree.keys[insertIndex] = insertValue;
		this.cmd("SetText", tree.graphicID, tree.keys[insertIndex], insertIndex);
		this.cmd("SetHighlight", tree.graphicID, 0);
		this.resizeTree();
		this.insertRepair(tree);
	}
	else
	{
		var findIndex = 0;
		while (findIndex < tree.numKeys && tree.keys[findIndex] < insertValue)
		{
			findIndex++;					
		}				
		this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[findIndex].graphicID, 1);
		this.cmd("Step");
		this.cmd("SetEdgeHighlight", tree.graphicID, tree.children[findIndex].graphicID, 0);
		this.cmd("SetHighlight", tree.graphicID, 0);
		this.insert(tree.children[findIndex], insertValue);				
	}
}
TwoThreeTree.prototype.insertCallback = function(event)
{
	if(ptr<insertedvaluelist.length){
		
		var insertedValue = parseInt(insertedvaluelist[ptr],10);
		console.log(insertedValue)
		
		
			if (insertedValue != "")
			{
					this.implementAction(this.insertElement.bind(this), insertedValue);
					if(ptr+1<insertedvaluelist.length)
						document.getElementById("nextelement").innerHTML=insertedvaluelist[ptr+1]
					else
						document.getElementById("nextelement").innerHTML="No More Values to insert"
			}
			
	}
		
	ptr=ptr+1

	this.insertButton.disabled=true;
	this.insertButton.style.backgroundColor="gray";
	this.insertButton.style.border="gray";
	
}
TwoThreeTree.prototype.insertElement = function(insertedValue)
{
	this.commands = new Array();
	
	this.cmd("SetText", this.messageID, "Inserting " + insertedValue);
	this.cmd("Step");
	
	if (this.treeRoot == null)
	{
		this.treeRoot = new TwoThreeTreeNode(this.nextIndex++, this.starting_x, STARTING_Y);
		this.cmd("CreateBTreeNode",
				 this.treeRoot.graphicID, 
				 WIDTH_PER_ELEM, NODE_HEIGHT, 
				 1, 
				 this.starting_x, 
				 STARTING_Y, 
				 BACKGROUND_COLOR,  
				 FOREGROUND_COLOR);
		this.treeRoot.keys[0] = insertedValue;
		this.cmd("SetText", this.treeRoot.graphicID, insertedValue, 0);
	}
	else
	{
		
		this.insert(this.treeRoot, insertedValue);					
		
		if (!this.treeRoot.isLeaf)
		{
			this.resizeTree();
		}
	}
	
	this.cmd("SetText", this.messageID, "");
	
	return this.commands;
	
}
TwoThreeTree.prototype.valueErrorMessage = function(){
	this.cmd("SetText", this.messageID, "Enter a numeric value.");
	return this.commands;
}
TwoThreeTree.prototype.insertRepair = function(tree) 
{
	if (tree.numKeys <= this.max_keys)
	{
		return;
	}
	else if (tree.parent == null)
	{
		this.treeRoot = this.split(tree);
		return;
	}
	else
	{
		var newNode  = this.split(tree);
		this.insertRepair(newNode);
	}			
}
TwoThreeTree.prototype.split = function(tree)
{
	this.cmd("SetText", this.messageID, "Node now contains too many keys.  Splittig");
	this.cmd("SetHighlight", tree.graphicID, 1);
	this.cmd("Step");
	this.cmd("SetHighlight", tree.graphicID, 0);
	var rightNode = new TwoThreeTreeNode(this.nextIndex++, tree.x + 100, tree.y);
	rightNode.numKeys = tree.numKeys - this.split_index - 1;
	var risingNode = tree.keys[this.split_index];
	
	
	if (tree.parent != null)
	{
		var currentParent = tree.parent;
		for (var parentIndex = 0; parentIndex < currentParent.numKeys + 1 && currentParent.children[parentIndex] != tree; parentIndex++);
		if (parentIndex == currentParent.numKeys + 1)
		{
			throw new Error("Couldn't find which child we were!");
		}
		this.cmd("SetNumElements", currentParent.graphicID, currentParent.numKeys + 1);
		for (i = currentParent.numKeys; i > parentIndex; i--)
		{
			currentParent.children[i+1] = currentParent.children[i];
			this.cmd("Disconnect", currentParent.graphicID, currentParent.children[i].graphicID);
			this.cmd("Connect", currentParent.graphicID,  currentParent.children[i].graphicID, FOREGROUND_COLOR, 
				0, // Curve
				0, // Directed
				"", // Label
				i+1);
			
			currentParent.keys[i] = currentParent.keys[i-1];
			this.cmd("SetText", currentParent.graphicID, currentParent.keys[i] ,i);
		}
		currentParent.numKeys++;
		currentParent.keys[parentIndex] = risingNode;
		this.cmd("SetText", currentParent.graphicID, "", parentIndex);
		this.moveLabel1ID = this.nextIndex++;
		this.cmd("CreateLabel", this.moveLabel1ID, risingNode, this.getLabelX(tree, this.split_index),  tree.y)
		this.cmd("SetForegroundColor", this.moveLabel1ID, FOREGROUND_COLOR);

		this.cmd("Move", this.moveLabel1ID,  this.getLabelX(currentParent, parentIndex),  currentParent.y)
		
		
		
		
		currentParent.children[parentIndex+1] = rightNode;
		rightNode.parent = currentParent;
		
	}
	
	
	this.cmd("CreateBTreeNode",
			  rightNode.graphicID, 
			  WIDTH_PER_ELEM, NODE_HEIGHT, 
			  tree.numKeys - this.split_index - 1, 
			  tree.x, 
			  tree.y,  
			  BACKGROUND_COLOR, 
			  FOREGROUND_COLOR);
	
	var i;
	for (i = this.split_index + 1; i < tree.numKeys + 1; i++)
	{
		rightNode.children[i - this.split_index - 1] = tree.children[i];
		if (tree.children[i] != null)
		{
			rightNode.isLeaf = false;
			this.cmd("Disconnect", tree.graphicID, tree.children[i].graphicID);
			
			this.cmd("Connect", rightNode.graphicID, 
				rightNode.children[i - this.split_index - 1].graphicID,
				FOREGROUND_COLOR,
				0, // Curve
				0, // Directed
				"", // Label
				i - this.split_index - 1);
			if (tree.children[i] != null)
			{
				tree.children[i].parent = rightNode;
			}
			tree.children[i] = null;
			
		}
	}
	for (i = this.split_index+1; i < tree.numKeys; i++)
	{
		rightNode.keys[i - this.split_index - 1] = tree.keys[i];
		this.cmd("SetText", rightNode.graphicID, rightNode.keys[i - this.split_index - 1], i - this.split_index - 1);
	}
	var leftNode = tree;
	leftNode.numKeys = this.split_index;
	
	for (i = this.split_index; i < tree.numKeys; i++)
	{
		this.cmd("SetText", tree.graphicID, "", i); 
	}
	
	this.cmd("SetNumElements", tree.graphicID, this.split_index);
	
	if (tree.parent != null)
	{
		this.cmd("Connect", currentParent.graphicID, rightNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			parentIndex + 1);
		this.resizeTree();
		this.cmd("Step")
		this.cmd("Delete", this.moveLabel1ID);				
		this.cmd("SetText", currentParent.graphicID, risingNode, parentIndex);
		return tree.parent;
	}
	else
	{
		this.treeRoot = new TwoThreeTreeNode(this.nextIndex++, this.starting_x, STARTING_Y);
		this.cmd("CreateBTreeNode",
				 this.treeRoot.graphicID, 
				 WIDTH_PER_ELEM, 
				 NODE_HEIGHT, 
				 1, 
				 this.starting_x, 
				 STARTING_Y,
				 BACKGROUND_COLOR,  
				 FOREGROUND_COLOR);
		this.treeRoot.keys[0] = risingNode;
		this.cmd("SetText", this.treeRoot.graphicID, risingNode, 0);
		this.treeRoot.children[0] = leftNode;
		this.treeRoot.children[1] = rightNode;
		leftNode.parent = this.treeRoot;
		rightNode.parent = this.treeRoot;
		this.cmd("Connect", this.treeRoot.graphicID, leftNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			0);	// Connection Point
		this.cmd("Connect", this.treeRoot.graphicID, rightNode.graphicID, FOREGROUND_COLOR, 
			0, // Curve
			0, // Directed
			"", // Label
			1); // Connection Point
		this.treeRoot.isLeaf = false;
		return this.treeRoot;
	}
	
	
	
}
TwoThreeTree.prototype.getLabelX = function(tree, index) 
{
	return tree.x - WIDTH_PER_ELEM * tree.numKeys / 2 + WIDTH_PER_ELEM / 2 + index * WIDTH_PER_ELEM;
}
TwoThreeTree.prototype.resizeTree = function()
{
	this.resizeWidths(this.treeRoot);
	this.setNewPositions(this.treeRoot, this.starting_x, STARTING_Y);
	this.animateNewPositions(this.treeRoot);
}
TwoThreeTree.prototype.setNewPositions = function(tree, xPosition, yPosition)
{
	if (tree != null)
	{
		tree.y = yPosition;
		tree.x = xPosition;
		if (!tree.isLeaf)
		{
			var leftEdge = xPosition - tree.width / 2;
			var priorWidth = 0;
			for (var i = 0; i < tree.numKeys+1; i++)
			{
				this.setNewPositions(tree.children[i], leftEdge + priorWidth + tree.widths[i] / 2, yPosition+HEIGHT_DELTA);
				priorWidth += tree.widths[i];
			}
		}				
	}			
}
TwoThreeTree.prototype.animateNewPositions = function(tree)
{
	if (tree == null)
	{
		return;
	}
	var i;
	for (i = 0; i < tree.numKeys + 1; i++)
	{
		this.animateNewPositions(tree.children[i]);
	}
	this.cmd("Move", tree.graphicID, tree.x, tree.y);
}
TwoThreeTree.prototype.resizeWidths = function(tree) 
{
	if (tree == null)
	{
		return 0;
	}
	if (tree.isLeaf)
	{
		for (var i = 0; i < tree.numKeys + 1; i++)
		{
			tree.widths[i] = 0;
		}
		tree.width = tree.numKeys * WIDTH_PER_ELEM + NODE_SPACING;
		return tree.width;				
	}
	else
	{
		var treeWidth = 0;
		for (i = 0; i < tree.numKeys+1; i++)
		{
			tree.widths[i] = this.resizeWidths(tree.children[i]);
			treeWidth = treeWidth + tree.widths[i];
		}
		treeWidth = Math.max(treeWidth, tree.numKeys * WIDTH_PER_ELEM + NODE_SPACING);
		tree.width = treeWidth;
		return treeWidth;
	}
}
function TwoThreeTreeNode(id, initialX, initialY)
{
	this.widths = [];
	this.keys = [];
	this.children = [];
	this.x = initialX;
	this.y = initialY;
	this.graphicID = id;
	this.numKeys = 1;
	this.isLeaf = true;
	this.parent = null;
	
	this.leftWidth = 0;
	this.rightWidth = 0;
	
}

var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new TwoThreeTree(animManag, canvas.width, canvas.height);
}

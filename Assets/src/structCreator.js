#pragma strict

var holderOfAll : holderOfAll;
var points : Rigidbody[];

var pointNodes : gravityNode[];
var nodeTree : Array;

var newNode : gravityNode;

function Start () {

}

function Update () {

		
	points = holderOfAll.objects;

	makeNodeFromPointObjects();

	makeTreeFromNodes();	

}

function makeNodeFromPointObjects(){
	var nodeObjects = new Array();

	for(var i = 0; i < points.length; i++){
		newNode = ScriptableObject.CreateInstance(gravityNode);
		newNode.centerOfMass = points[i].position;
		newNode.mass = points[i].rigidbody.mass;
		newNode.actualObject = points[i];
		nodeObjects.Add(newNode);
	}
	
	pointNodes = nodeObjects.ToBuiltin(gravityNode);
	nodeTree = nodeObjects;
}

function makeTreeFromNodes(){
	
	var node1 : gravityNode = ScriptableObject.CreateInstance(gravityNode);
	var node2 : gravityNode = ScriptableObject.CreateInstance(gravityNode);
	var node3 : gravityNode = ScriptableObject.CreateInstance(gravityNode);
	while(nodeTree.length > 1){
		var randomIndex = Random.Range(0, nodeTree.length);
		node1 = nodeTree[randomIndex];
		nodeTree.RemoveAt(randomIndex);

		var closest = getClosestIndex(node1);
		node2 = nodeTree[closest];
		nodeTree.RemoveAt(closest);

		node3 = ScriptableObject.CreateInstance(gravityNode);


		node1.brotherNode = node2;
		node2.brotherNode = node1;
		node1.parentNode = node3;
		node2.parentNode = node3;

		node3.centerOfMass = getCenterOfMassOf(node1, node2);

		if(node3.centerOfMass.x == 0 && node3.centerOfMass.y == 0 && node3.centerOfMass.z == 0)
			print("!@#@#RQ");

		node3.mass = node1.mass + node2.mass;
		
		nodeTree.Add(node3);

	}	

}

function getClosestIndex(node : gravityNode){
	var closest = nodeTree[0] as gravityNode;
	var index = 0;
	var distance = Vector3.Distance(closest.centerOfMass, node.centerOfMass);

	for(var i = 0; i < nodeTree.length; i++){
		var other = nodeTree[i] as gravityNode;
		var dist = Vector3.Distance(node.centerOfMass, other.centerOfMass);
		if(dist < distance){
			closest = other;
			distance = dist;
			index = i;
		}	
	}
	return index;
}

function getCenterOfMassOf(node1 : gravityNode, node2 : gravityNode){
	var centerOfMass = new Vector3(0,0,0);
	centerOfMass.x = ((node1.mass * node1.centerOfMass.x) + (node2.mass*node2.centerOfMass.x))/(node1.mass + node2.mass);
	centerOfMass.y = ((node1.mass * node1.centerOfMass.y) + (node2.mass*node2.centerOfMass.y))/(node1.mass + node2.mass);
	centerOfMass.z = ((node1.mass * node1.centerOfMass.z) + (node2.mass*node2.centerOfMass.z))/(node1.mass + node2.mass);

	return centerOfMass;	
}





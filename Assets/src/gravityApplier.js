#pragma strict

var structOfStuff : structCreator;
var gravitationalConstant = 0.2;

function Start () {
}

function FixedUpdate () {
	var nodes = structOfStuff.pointNodes;
	for(var i = 0; i < nodes.length; i++){
		applyGravityTo(nodes[i]);
	}
}

function applyGravityTo(node : gravityNode){
	var nodeInMind = node;
	var objectInMind = node.actualObject;
	var totalForce = Vector3(0,0,0);

	var i = 0;
	while(nodeInMind.brotherNode != null){
		totalForce = totalForce + getGravitationalPull(node, nodeInMind.brotherNode);
		nodeInMind = nodeInMind.parentNode;
		i++;
	}
	objectInMind.AddForce(totalForce);
}

function getGravitationalPull(fromNode : gravityNode, toNode : gravityNode){

	var distance = 1;
	distance = Mathf.Ceil((toNode.centerOfMass - fromNode.centerOfMass).magnitude);
	
	
	var gravitationalForce = (fromNode.mass * toNode.mass);

	var direction = (toNode.centerOfMass - fromNode.centerOfMass);

	
	direction.Normalize();

	var scaler = (gravitationalForce * gravitationalConstant);
	return direction * scaler / distance;
}
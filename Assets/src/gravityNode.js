//#pragma strict
class gravityNode extends ScriptableObject{
	
	var mass = 1.0;
	var centerOfMass : Vector3;
	var actualObject : Rigidbody;
	var parentNode : gravityNode;
	var brotherNode : gravityNode;
	
	function Start () {
	
	}
	
	function Update () {
	
	}
	
}
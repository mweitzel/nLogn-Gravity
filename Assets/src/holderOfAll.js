#pragma strict

var thingToClone : Rigidbody;
var objects : Rigidbody[];

function Start () {
	var listOfStuff = new Array();
	var newThing = thingToClone;
	var i =0;
	
	for(i = 0; i < 50; i++){
		newThing = Instantiate(thingToClone);
		newThing.transform.position = Vector3(Random.Range(40, 50),Random.Range(40, 50),Random.Range(40, 50));
		listOfStuff.Add(newThing);
	}
	var size = 50;
	for(i = 0; i < 300; i++){
		newThing = Instantiate(thingToClone);
		newThing.transform.position = Vector3(Random.Range(-size, size),Random.Range(-size, size),Random.Range(-size, size));
		listOfStuff.Add(newThing);
	}
	objects = listOfStuff.ToBuiltin(Rigidbody);
}

function Update () {

}
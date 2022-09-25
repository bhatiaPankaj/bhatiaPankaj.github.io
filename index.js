function createSection(form) {
  var el = document.getElementById('floors-section')
  el.innerHTML = ``
  // console.log("kya haal chaal");

  var floors = form.inputFloor.value;
  this.floors = floors
  var lifts = form.inputLift.value;


  if (floors >1 && lifts>0 ) {

    if(floors > 1){

      for (var i = floors; i > 1; i--) {
        createFloors(i)
      }


  createGroundFloor()
  addLifts(lifts)
  document.getElementsByClassName('top-button')[0].remove()    // removing the top button from top floor
}

  }

  else if (floors <=1 ){
    alert ('Please Enter valid floor input (must be >1) ')
  }
  else if (lifts <1 ){
    alert ('Please Enter valid lift input (must be >0)')
  }
}



function liftButtonClicked(elem) {
  // console.log(elem.parentNode.parentNode.id)
  var callFromFloor = elem.parentNode.parentNode.id;
  //get the closest available lift
  var bestLift = getBestLift(callFromFloor)
// console.log("bestLift::" + bestLift)
 if(bestLift !== undefined ){
  moveBestLiftToFloor(callFromFloor, bestLift.liftNumber)
}
else {
  alert ('All lifts moving right now.')
}

}

function getBestLift(callFromFloor) {
  var actualDiff= Number.MAX_VALUE
  var bestLift
  for(i=0;i<this.lifts.length;i++){
    var diff = Number.MAX_VALUE
    if(lifts[i].state === LiftState.STATIONARY){
      diff= Math.abs(callFromFloor.substring(6) - lifts[i].currentFloor)
    }
    if(diff<actualDiff){
      bestLift = lifts[i]
      actualDiff = diff
    }
  }
  return bestLift
}

function moveBestLiftToFloor(destFloor, lift){

  var boundingRect = document.getElementById(destFloor).getBoundingClientRect()
  var height = boundingRect.height;
  var distance = Math.abs( destFloor.substring(6) - this.lifts[lift-1].currentFloor)
  document.getElementById(`lift#${lift}`).style.transform = `translateY(-${height * (destFloor.substring(6) - 1)}px)`;
  // console.log("distance" + distance)
  this.lifts[lift-1].state= LiftState.MOVING
  this.lifts[lift-1].destinationFloor= destFloor.substring(6)
  document.getElementById(`lift#${lift}`).style.transition = `all ${distance * 2}s ease-in`;
  var timeTaken = distance * 2 *1000
  setTimeout(() => {
    this.lifts[lift-1].state= LiftState.STATIONARY
    this.lifts[lift-1].currentFloor= destFloor.substring(6)
  }, timeTaken)
}

function createFloors(floorNumber) {
  var el = document.getElementById('floors-section')
  //var floorContent = document.createElement('div')
  var floorContainer = document.createElement('div');
  floorContainer.id="floor#" + floorNumber
  floorContainer.classList.add('floor-container');

  floorContainer.innerHTML = `
        <div class="buttons">
            <button class = "top-button" onclick="liftButtonClicked(this)" style="display: block;">⬆️</button>
            <button onclick="liftButtonClicked(this)" style="display: block;">⬇️</button>
        </div>
        <div class="cabin-section">
        </div>
        <div class="floor">
            Floor ${floorNumber}
        </div>
    `
    // if(floorNumber === floors){
    //   var el = floorContainer.getElementsByClassName('top-button')
    //   el.remove();
    // }
    el.appendChild(floorContainer)
  //el.appendChild(floorContent)
}

function createGroundFloor() {
  var el = document.getElementById('floors-section')
  //var floorContent = document.createElement('div')
  var floorContainer = document.createElement('div');
  var floorNumber = 1;
  floorContainer.classList.add('floor-container');
  floorContainer.id="floor#" + floorNumber

  floorContainer.innerHTML = `
    <div class="buttons">
      <button onclick="liftButtonClicked(this)" style="display: block;">⬆️</button>
    </div>
    <div class="cabin-section-ground">


    </div>
    <div class="floor">
      Floor 1
    </div>
    `
  el.appendChild(floorContainer)
  //el.appendChild(floorContent)
}

function addLifts(numberOfLifts) {
  for (i = 0; i < numberOfLifts; i++) {
    var cabin = document.getElementsByClassName('cabin-section-ground')[0]
    var liftDiv = document.createElement('div')
    liftDiv.classList.add('lift')
    liftDiv.id= `lift#${i+1}`
    liftDiv.innerHTML = `<div class="lift-door"></div>
      <div class="lift-door"></div>`
    cabin.appendChild(liftDiv)
  }

  // console.log(`numberOfLifts :: ${numberOfLifts}`)
  this.lifts = Array.from({ length: numberOfLifts }, (v,i) => new Lift(i+1));

}



const LiftState = {
  MOVING: 1,
  STATIONARY: 0
};
class Lift {
  currentFloor = 1;
  state = LiftState.STATIONARY;
  destinationFloor = 1;

  constructor(liftNumber) {
    this.liftNumber = liftNumber;
    // console.log(`Created lift : ${this.liftNumber}`);
  }
}

//lift moves at 2 s per floor
function moveLiftToFloor(destinationFloor, lift) {
  if (lift.currentFloor === destinationFloor) {
    // console.log("Lift already at destination floor");
  } else {
    const floorsDiff = Math.abs(destinationFloor - lift.currentFloor);
    const timTaken = floorsDiff * 2;
    //moving Now
    lift.state = LiftState.MOVING;
    console.log(
      `Lift now moving from Floor ${lift.currentFloor} to Floor ${destinationFloor}`
    );
    setTimeout(() => {
      // console.log(`Lift Reached Floor ${destinationFloor}`);
      lift.destinationFloor = destinationFloor;
      lift.currentFloor = destinationFloor;
      lift.state = LiftState.STATIONARY;
    }, timTaken * 1000);
  }
}

  // this.lifts = Array.from({ length: 5 }, (v,i) => new Lift(i+1));   //Map function
  // select lift and find which is best available
  // moveLiftToFloor(8,lifts[3])





  // document.getElementById('1').style.transform = `translateY(-${100 * (7 - 1)}px)`;
// document.getElementById('8').getBoundingClientRect()

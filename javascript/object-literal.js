//OBJECT Literal
var humanAgent = {
     firstName: 'Junior',
     lastName: 'Smith',
     currentAge: 32,
     address: {
          street: '123 Park Street',
          city: 'Parkville',
          state: 'NY'
     },
     // Adding a function/method within an Object
     fullName: function(){
          return this.firstName +" "+ this.lastName;
     }
}
console.log( humanAgent.address ); //shows the objects in Console
console.log( humanAgent.address.state ); // NY
console.log( humanAgent.fullName() ); // Junior Smith
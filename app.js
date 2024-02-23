'use strict';

var HeaderRow = ['Device Name', 'Quantity', 'Unit Price', 'Category'];

var AllDevices = [];


var addDevicesForm = document.getElementById('addDevicesForm');
var table = document.getElementById('table');
var totalprice = 0;

loadLocalStorge();
function Devices(DeviceName, Quantity, Category,UnitPrice) {
  this.DeviceName = DeviceName;
  this.Quantity = Quantity;
  this.Category = Category;
  this.UnitPrice = UnitPrice;
  AllDevices.push(this);
}

function render(){

  AddHeader();
  for (var i = 0; i < AllDevices.length; i++) {
    var row = document.createElement('tr');

    var td = document.createElement('td');
    td.textContent = AllDevices[i].DeviceName;
    row.appendChild(td);

    var td1 = document.createElement('td');
    td1.textContent = AllDevices[i].Quantity;
    row.appendChild(td1);

    var td2 = document.createElement('td');
    td2.textContent = Number(AllDevices[i].UnitPrice);
    totalprice+=AllDevices[i].UnitPrice;
    row.appendChild(td2);

    var td3 = document.createElement('td');
    td3.textContent = AllDevices[i].Category;
    row.appendChild(td3);



    table.appendChild(row);

  }

  var totalpri=document.getElementById('totalPrice');
  totalpri.textContent= 'Total : '+totalprice;


}

function AddHeader() {
  var row = document.createElement('tr');
  table.appendChild(row);

  for (var j = 0; j < HeaderRow.length; j++) {

    var th = document.createElement('th');
    th.textContent=HeaderRow[j];
    row.appendChild(th);


  }

}

// add to database
addDevicesForm.addEventListener('submit', AddDevice);



function AddDevice(event) {
  event.preventDefault();

  var ItemName = event.target.ItemName.value;
  var Category = document.getElementById('Category');
  var Quantity = event.target.Quantity.value;
  var Categoryvalue = Category.options[Category.selectedIndex].value;

  var NewDevice = new Devices(ItemName, Quantity, Categoryvalue,0);
  NewDevice.randomNumber();
  clearTable();
  render();
  addToLocalStorge();


}


function clearTable(){
  table.textContent=" ";

}

function addToLocalStorge(){
  localStorage.setItem('AllDevices',JSON.stringify(AllDevices));

}

function loadLocalStorge(){

  if(localStorage.getItem('AllDevices')){

    var storge =JSON.parse(localStorage.getItem('AllDevices'));
    console.log(storge);

    for(var x=0;x<storge.length;x++){

     new Devices(storge[x].DeviceName, storge[x].Quantity, storge[x].Category,storge[x].UnitPrice);

    }


  }

  render();

}

Devices.prototype.randomNumber= function () {

  var random = Math.floor(Math.random() * 1000) + 100;
  this.UnitPrice=random;


};
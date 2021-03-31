/* global data */
/* exported data */
var $imageUrl = document.querySelector('.image-url');
var $userPhotoUrl = document.querySelector('#user-photoUrl');
var $newEntry = document.querySelector('.journal-entry-form');

function entryImageUpdate(event) {
  var $photoInputValue = event.target.value;
  $imageUrl.setAttribute('src', $photoInputValue);
}

$userPhotoUrl.addEventListener('input', entryImageUpdate);

function saveEntry(event) {
  event.preventDefault();
  var userInput = {};
  userInput.title = $newEntry.elements.title.value;
  userInput.photo = $newEntry.elements.photo.value;
  userInput.notes = $newEntry.elements.notes.value;
  userInput.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(userInput);
  $newEntry.reset();
  $imageUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  var newNode = createEntry(data.entries[0]);
  $newUlEntries.prepend(newNode);
}
$newEntry.addEventListener('submit', saveEntry);

var $newUlEntries = document.querySelector('.list-entries');

function createEntry(entry) {
  var newList = document.createElement('li');
  newList.setAttribute('class', 'list-entries');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var columnhalf1 = document.createElement('div');
  columnhalf1.setAttribute('class', 'column-half');

  var columnhalf2 = document.createElement('div');
  columnhalf2.setAttribute('class', 'column-half');

  var img = document.createElement('img');
  img.setAttribute('src', entry.photo);
  img.setAttribute('class', 'image-url');

  var h2 = document.createElement('h2');
  h2.setAttribute('class', 'post-title');
  h2.textContent = entry.title;

  var pElement = document.createElement('p');
  pElement.textContent = entry.notes;

  columnhalf2.appendChild(h2);
  columnhalf2.appendChild(pElement);
  columnhalf1.appendChild(img);
  row.appendChild(columnhalf1);
  row.appendChild(columnhalf2);
  newList.appendChild(row);

  return newList;
}

function entryLoad(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var $entryNode = createEntry(data.entries[i]);
    $newUlEntries.prepend($entryNode);
  }
}

window.addEventListener('DOMContentLoaded', entryLoad);

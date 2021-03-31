
/* global data */
/* exported data */
var $imageUrl = document.querySelector('.image-url');
var $userPhotoUrl = document.querySelector('#user-photoUrl');
var $newEntry = document.querySelector('.journal-entry-form');
var $newEntryBtn = document.querySelector('.new-button');
var $navAnchor = document.querySelector('.entries-nav-link');
var $viewEntryForm = document.querySelector('.view-entry-form');
var $viewEntries = document.querySelector('.entries-view');
var $newUlEntries = document.querySelector('.list-entries');

$userPhotoUrl.addEventListener('input', entryImageUpdate);
$newEntry.addEventListener('submit', saveEntry);
$newEntryBtn.addEventListener('click', viewEntryForm);
$navAnchor.addEventListener('click', viewEntries);
window.addEventListener('DOMContentLoaded', entryLoad);

if (data.view === 'entry-form') {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = 'hidden entries-view';
} else {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'entries-view';
}

function entryImageUpdate(event) {
  var $photoInputValue = event.target.value;
  $imageUrl.setAttribute('src', $photoInputValue);
}
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
  viewEntries();
}

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
  for (var i = 0; i < data.entries.length; i++) {
    var $entryNode = createEntry(data.entries[i]);
    $newUlEntries.append($entryNode);
  }
}

function viewEntryForm(event) {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = ' hidden entries-view';
  data.view = 'entry-form';
}

function viewEntries(event) {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'entries-view';
  data.view = 'entries';
}

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
var $formheader = document.querySelector('.form-header');
var dataEntryId = null;
var journalEntryId = null;
$userPhotoUrl.addEventListener('input', entryImageUpdate);
$newEntry.addEventListener('submit', saveEntry);
$newEntryBtn.addEventListener('click', viewEntryForm);
$navAnchor.addEventListener('click', viewEntries);
$newUlEntries.addEventListener('click', editEntry);
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
  if (data.editing === null) {
    var userInput = {};
    userInput.title = $newEntry.elements.title.value;
    userInput.photo = $newEntry.elements.photo.value;
    userInput.notes = $newEntry.elements.notes.value;
    data.entries.unshift(userInput);
    userInput.entryId = data.nextEntryId;
    data.nextEntryId++;
    var newNode = createEntry(data.entries[0]);
    $newUlEntries.append(newNode);
  } else {
    data.editing.title = $newEntry.elements.title.value;
    data.editing.photo = $newEntry.elements.photo.value;
    data.editing.notes = $newEntry.elements.notes.value;
    for (var x = 0; x < data.entries.length; x++) {
      if (data.entries[x].entryId === data.editing.entryId) {
        data.entries[x] = data.editing;
        break;
      }
      var editEntryItem = createEntry(data.editing);
      var $journalNode = document.querySelectorAll('.journal-entry');
      journalEntryId = $journalNode[x].getAttribute('data-entry-id');
      if (journalEntryId === data.editing.entryId.toString()) {
        $journalNode[x].replaceWith(editEntryItem);
        break;
      }
    }
  }
  $imageUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
  data.editing = null;
  viewEntries();
}

function createEntry(entry) {
  var newList = document.createElement('li');
  newList.setAttribute('class', 'journal-entry');
  newList.setAttribute('data-entry-id', entry.entryId);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var columnhalf1 = document.createElement('div');
  columnhalf1.setAttribute('class', 'column-half');

  var columnhalf2 = document.createElement('div');
  columnhalf2.setAttribute('class', 'column-half');

  var img = document.createElement('img');
  img.setAttribute('src', entry.photo);
  img.setAttribute('class', 'image-url');

  var entryheader = document.createElement('div');
  entryheader.setAttribute('class', 'entry-header');
  var h2 = document.createElement('h2');
  h2.setAttribute('class', 'post-title');
  h2.textContent = entry.title;

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pen');

  var pElement = document.createElement('p');
  pElement.textContent = entry.notes;

  entryheader.appendChild(h2);
  entryheader.appendChild(editIcon);
  columnhalf2.appendChild(entryheader);
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
  $formheader.textContent = 'New Entry';
  data.editing = null;
}

function viewEntries(event) {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'entries-view';
  data.view = 'entries';
  $newEntry.reset();
  $imageUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
}

function viewEditForm(event) {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = 'hidden entries-view';
  $formheader.textContent = 'Edit Entry';
}

function editEntry(event) {
  if (event.target.matches('i')) {
    viewEditForm();
    var closestEntry = event.target.closest('.journal-entry');
    dataEntryId = closestEntry.getAttribute('data-entry-id');
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId.toString() === dataEntryId) {
        data.editing = data.entries[k];
        $newEntry.elements.title.value = data.editing.title;
        $newEntry.elements.photo.value = data.editing.photo;
        $imageUrl.setAttribute('src', data.editing.photo);
        $newEntry.elements.notes.value = data.editing.notes;
        break;
      }
    }
  }
}

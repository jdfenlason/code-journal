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
var $deleteEntryBtn = document.querySelector('.delete-entry');
var $viewModal = document.querySelector('.view-modal');
var $cancelbutton = document.querySelector('.cancel-button');
var $confirmbutton = document.querySelector('.confirm-button');
// var $searchIcon = document.querySelector(".search-bar");
var $searchInput = document.querySelector('#user-search');
// var $searchBtn = document.querySelector(".enter-search");
var titles = [];

$userPhotoUrl.addEventListener('input', entryImageUpdate);
$newEntry.addEventListener('submit', saveEntry);
$newEntryBtn.addEventListener('click', viewEntryForm);
$navAnchor.addEventListener('click', viewEntries);
$newUlEntries.addEventListener('click', editEntry);
// $searchIcon.addEventListener("click", openSearch);
// $searchBtn.addEventListener('click', goSearch);

window.addEventListener('DOMContentLoaded', entryLoad);
$deleteEntryBtn.addEventListener('click', deletModalView);

// function openSearch(event) {
//   $searchInput.className = "active";
// }

// function goSearch(event) {
//   searching();
// }

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
    $newUlEntries.prepend(newNode);
  } else {
    data.editing.title = $newEntry.elements.title.value;
    data.editing.photo = $newEntry.elements.photo.value;
    data.editing.notes = $newEntry.elements.notes.value;
    for (var x = 0; x < data.entries.length; x++) {
      if (data.entries[x].entryId === data.editing.entryId) {
        data.entries[x] = data.editing;
        var $journalNode = document.querySelectorAll('.journal-entry');
        var editEntryItem = createEntry(data.editing);
        $journalNode[x].replaceWith(editEntryItem);
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
  $deleteEntryBtn = 'invisible delete-entry';
  data.editing = null;
}

function viewEntries(event) {
  $viewEntryForm.className = 'hidden view-entry-form';
  $viewEntries.className = 'entries-view';
  $viewModal.className = 'hidden view-modal';
  $deleteEntryBtn.className = 'hidden delete-entry';
  data.view = 'entries';
  $newEntry.reset();
  $imageUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
}

function viewEditForm(event) {
  $viewEntryForm.className = 'view-entry-form';
  $viewEntries.className = 'hidden entries-view';
  $formheader.textContent = 'Edit Entry';
  $deleteEntryBtn.className = 'delete-entry';
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
      }
    }
  }
}

function deletModalView(event) {
  event.preventDefault();
  $viewModal.className = 'view-modal';
}

$cancelbutton.addEventListener('click', function (event) {
  $viewModal.className = 'hidden view-modal';
});

$confirmbutton.addEventListener('click', function (event) {
  for (var x = 0; x < data.entries.length; x++) {
    if (data.entries[x].entryId.toString() === dataEntryId) {
      data.entries.splice(x, 1);
    }
    var $li = document.querySelectorAll('li');
    for (var i = 0; i < $li.length; i++) {
      if ($li[i].getAttribute('data-entry-id') === dataEntryId) {
        $li[i].remove();
      }
    }
  }
  $imageUrl.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
  data.editing = null;
  viewEntries();
});

$searchInput.addEventListener('keyup', function (event) {
  var searchString = event.target.value.toLowerCase();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].title.toLowerCase() === searchString) {
      titles.push(data.entries[i].title);
    }
  } return titles;
});

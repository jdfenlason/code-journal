
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
}
$newEntry.addEventListener('submit', saveEntry);

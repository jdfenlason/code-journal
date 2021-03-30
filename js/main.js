/* eslint-disable no-console */
/* global data */
/* exported data */
var $imageUrl = document.querySelector('.image-url');
var $userUrl = document.querySelector('#user-photoUrl');

$userUrl.addEventListener('input', function (event) {
  var $userInputValue = event.target.value;
  $imageUrl.setAttribute('src', $userUrl);
  console.log($userInputValue);
});

var $newEntry = document.querySelector('.journal-entry-form');
console.log($newEntry);
console.dir($newEntry);
function saveEntry(event) {
  event.preventDefault();
  var userInput = {};
  userInput.title = $newEntry.elements.title.value;
  userInput.photo = $newEntry.elements.photo.value;
  userInput.note = $newEntry.elements.note.value;
  userInput.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(userInput);
  console.log(data.nextEntryId);
}
console.log(saveEntry);

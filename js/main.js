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

var $newUlEntries = document.querySelector('.list-entries');

function createEntry(entry) {
  var $newliJournalEntry = document.createElement('li');
  $newliJournalEntry.setAttribute('class', 'journal-entry');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $newliJournalEntry.appendChild($row);

  var $divChalf = document.createElement('div');
  $divChalf.setAttribute('class', 'column-half');
  $row.appendChild($divChalf);

  var $divImageContainer = document.createElement('div');
  $divImageContainer.setAttribute('class', 'image-container');
  $divChalf.appendChild($divImageContainer);

  var $entryImage = document.createElement('img');
  $entryImage.setAttribute('class', 'entry-image');
  $entryImage.setAttribute('src', 'entry.photo');
  $entryImage.setAttribute('alt', 'Code Journal entry image');
  $divImageContainer.appendChild($entryImage);

  var $chalf2 = document.createElement('div');
  $chalf2.setAttribute('class', 'column-half');
  $row.appendChild($chalf2);

  var $textContainer = document.createElement('div');
  $textContainer.setAttribute('class', 'text-container');
  $chalf2.appendChild($textContainer);

  var $entryTitle = document.createElement('div');
  $entryTitle.setAttribute('class', 'entry-title');
  $textContainer.appendChild($entryTitle);

  var $headingH2 = document.createElement('h2');
  var $entryHeading = document.createTextNode(entry.title);
  $headingH2.appendChild($entryHeading);
  $entryTitle.appendChild($headingH2);

  var $paragraphContainer = document.createElement('div');
  $paragraphContainer.setAttribute('class', 'entry-paragraph');
  $textContainer.appendChild($paragraphContainer);

  var $paragraphEntry = document.createElement('div');
  var $paragraphText = document.createElement('p');
  $paragraphEntry.appendChild($paragraphText);
  $textContainer.appendChild($paragraphEntry);

  return $newliJournalEntry;
}

function entryLoad(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var $entryNode = createEntry(data.entries[i]);
    $newUlEntries.prepend($entryNode);
  }
}

createEntry();
entryLoad();

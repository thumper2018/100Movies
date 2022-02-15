// VARIABLE SETUP //
var items = JSON.parse(JSON.stringify(movies_json));
var itemType = 'movie';

// Holds watched items to hide/show while showing All ONLY
var watchedItems = [];

// Get the value of watchedHidden from localStorage, else set to false
var watchedHidden = localStorage.getItem('watchedHidden') || 'false';

// Check if the user already has had their fossil data cleared, else set to false
// var oldFossilsCleared = localStorage.getItem('oldFossilsCleared') || "false";

// Get and store the main container (holds all the item containers) and the hemipshere button and togglewatched button
var container = document.getElementsByClassName("main-container")[0];
var togglewatchedButton = document.getElementsByClassName("button__togglewatched")[0];

// Get and store all containers on the page
var containers = document.getElementsByClassName("container");

if (watchedHidden == 'false') {
  togglewatchedButton.innerText = "Hide Watched";
} else {
  togglewatchedButton.innerText = "Show Watched";
  container.classList.add('hide-watched');
}

// Setup localStorage object
var data = {};

// INITIALISATION FUNCTIONS //

/**
 * Create the main container and run a function to create each item container
 */
function initItems() {
  // Empty the container
  var child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }

  // For each item, create a "card"
  for (var item of items) {
    createItem(item);
  }
}

/**
 * Create a container and necessary elements for each given item
 * @param  {Object} item A single object within the itemType JSON
 */
function createItem(item) {
  // The main card
  var itemBox = document.createElement("div");
  itemBox.classList.add(itemType + "__container", "container");

    var infoDiv = document.createElement("div");
    infoDiv.classList.add(itemType + "__container__info", "info");


    // Item info text (name, real name, artist, price)
    var infoTextDiv = document.createElement("div");
    infoTextDiv.classList.add(itemType + "__container__info__text", "container__info__text");

    // Item name
    var itemName = document.createElement("h2");
    itemName.innerText = item.name;
    itemName.classList.add(itemType + "__name", "name");

    // Item Date
    var itemDate = document.createElement("p");
    itemDate.innerText = item.Date != "" ? "Date: " + item.Date : "Date: Unknown";
    itemDate.classList.add(itemType + "__Date", "Date");

    // Checkbox container and items
    var itemTrackers = document.createElement("div");
    itemTrackers.classList.add(itemType + "__trackers", "trackers");

    var itemTrackersItems = document.createElement("div");
    itemTrackersItems.classList.add(itemType + "__trackers__items", "trackers__items");

    // watched checkbox
    var itemwatched = document.createElement("input");
    itemwatched.classList.add(itemType + "__watched", "watched");
    itemwatched.type = "checkbox";
    itemwatched.name = "watched";
    itemwatched.id = item.name + "_watched";

    var itemwatched_label = document.createElement("label");
    itemwatched_label.innerText = "watched?";
    itemwatched_label.htmlFor = item.name + "_watched";

    // Append elements
    infoTextDiv.appendChild(itemName);

  
    infoDiv.appendChild(infoTextDiv);

    infoTextDiv.appendChild(itemDate);

    itemBox.appendChild(infoDiv);

    itemTrackersItems.appendChild(itemwatched_label);
    itemTrackersItems.appendChild(itemwatched);

    itemTrackers.appendChild(itemTrackersItems);

    itemBox.appendChild(itemTrackers);

    container.appendChild(itemBox);
}

/**
 * Create and populate a name, price, and trackers for a given fossil or part
 */
function createFossil(fossil, part, container) {
  // Item name
  var partName = document.createElement("h2");
  partName.innerText = part.name;
  partName.classList.add("fossil__part__name", "part__name");

  // Item price
  var partPrice = document.createElement("p");
  partPrice.innerText = part.price != 0 ? "Sell for: " + part.price + " bells" : "Sell for: Unknown bells";
  partPrice.classList.add("fossil__part__price", "price");

  // Checkbox container and items
  var partTrackers = document.createElement("div");
  partTrackers.classList.add("fossil__trackers", "trackers");

  var partTrackersItems = document.createElement("div");
  partTrackersItems.classList.add("fossil__trackers__items", "trackers__items");

  // Caught checkbox
  var partFound = document.createElement("input");
  partFound.classList.add("fossil__caught", "caught");
  partFound.type = "checkbox";
  partFound.name = "Caught";
  partFound.id = "";
  part.name == fossil ? partFound.id = part.name + "_caught" : partFound.id = fossil + "__" + part.name + "_caught";

  var partFound_label = document.createElement("label");
  partFound_label.htmlFor = part.name + "_caught";
  partFound_label.innerText = "Found?";

  // watched checkbox
  var partwatched = document.createElement("input");
  partwatched.classList.add("fossil__watched", "watched");
  partwatched.type = "checkbox";
  partwatched.name = "watched";
  partwatched.id = "";
  part.name == fossil ? partwatched.id = part.name + "_watched" : partwatched.id = fossil + "__" + part.name + "_watched";

  var partwatched_label = document.createElement("label");
  partwatched_label.innerText = "watched?";
  partwatched_label.htmlFor = part.name + "_watched";

  // Append all the universal elements

  partTrackersItems.appendChild(partFound_label);
  partTrackersItems.appendChild(partFound);

  partTrackersItems.appendChild(partwatched_label);
  partTrackersItems.appendChild(partwatched);

  partTrackers.appendChild(partTrackersItems);

  container.appendChild(partName);
  container.appendChild(partPrice);
  container.appendChild(partTrackers);
}


/**
 * Get the checkbox data from localStorage and set the necessary on-page elements
 */
function loadData() {
  data = JSON.parse(localStorage.getItem('data')) || {};

  // Clear out the old fossil data if it hasn't already been done
  // if (oldFossilsCleared == "false") {
  //   // Make sure data actually HAS fossil data first
  //   if (data['fossil']) {
  //     data['fossil'] = {};
  //     localStorage.setItem('data', JSON.stringify(data));
  //     localStorage.setItem('oldFossilsCleared', "true");
  //   }
  // }

  // If data isn't empty, separate it out into caughtValues and watchedValues, and set the checkboxes that were stored
  if (Object.keys(data).length !== 0) {
      if (typeof data[itemType] != 'undefined') {
      var itemTypeValues = Object.entries(data[itemType]);

      // Iterate through caughtValues
      if (typeof data[itemType]['caughtValues'] != "undefined") {
        var caughtValues = Object.entries(data[itemType]['caughtValues']);

        for (const [name, value] of caughtValues) {
          if (document.getElementById(name)) { document.getElementById(name).checked = value; }
        }
      }

      // Iterate through watchedValues
      if (typeof data[itemType]['watchedValues'] != "undefined") {
        var watchedValues = Object.entries(data[itemType]['watchedValues']);

        for (const [name, value] of watchedValues) {
          if (document.getElementById(name)) { document.getElementById(name).checked = value; }
          // If the checkbox is ticked, add `is-watched` class to the item container if it exists (covers data change issues)
          if (document.getElementById(name) && value) {
            if (itemType !== 'fossil') {
              document.getElementById(name).parentElement.parentElement.parentElement.classList.add('is-watched')
            } else {
              const itemContainer = getFossilContainer(document.getElementById(name));

              if (checkFossilCompletion(itemContainer)) {
                itemContainer.classList.add('is-watched');
              }
            }
          }
        }
      }
    }
  }

  // Ensures data has been loaded before we setup the checkboxes and search bar
  checkboxSetup();
}

/**
 * Setup the caught and watched checkboxes with eventListeners and localStorage saving
 */
function checkboxSetup() {
  var itemTypeValues = data[itemType] || {};

  var caughtCheckboxes = document.getElementsByClassName(itemType + '__caught');
  var caughtValues = itemTypeValues['caughtValues'] || {};

  var watchedCheckboxes = document.getElementsByClassName(itemType + '__watched');
  var watchedValues = itemTypeValues['watchedValues'] || {};

  // Temporary separation of fossil, art and non-fossil,art setup until I clean it up
  if (itemType !== "fossil" && itemType !== "art") {
    // Add a change listener to each caughtCheckbox
    for (let i = 0; i < caughtCheckboxes.length; i++) {
      caughtCheckboxes[i].addEventListener("change", function() {
        // Store the checked values in caughtValues
        caughtValues[this.id] = this.checked;

        // add caughtValues to itemTypeValues, add itemTypeValues to data, then set data in localStorage
        itemTypeValues['caughtValues'] = caughtValues;
        data[itemType] = itemTypeValues;
        localStorage.setItem('data', JSON.stringify(data));
      });
    }

    // Add a change listener to each watchedCheckbox
    for (let i = 0; i < watchedCheckboxes.length; i++) {
      watchedCheckboxes[i].addEventListener("change", function() {
        // Store the checked values in watchedValues
        watchedValues[this.id] = this.checked;

        const itemContainer = this.parentElement.parentElement.parentElement;

        // If watched box is ticked, check the caught box too
        if (this.checked) {
          // Art items don't have a caught checkbox
          if (itemType != "art" && itemType != "song" && itemType != "movie") {
            document.getElementById(this.id).previousSibling.previousSibling.checked = true;
            caughtValues[document.getElementById(this.id).previousSibling.previousSibling.id] = true;

            itemTypeValues['caughtValues'] = caughtValues;
            data[itemType] = itemTypeValues;
            localStorage.setItem('data', JSON.stringify(data));
          }

          // add is-watched class to the container for filtering purposes
          itemContainer.classList.add('is-watched')
        } else {
          // remove is-watched class from the container for filtering purposes
          itemContainer.classList.remove('is-watched')
        }

        // add watchedValues to itemTypeValues, add itemTypeValues to data, then set data in localStorage
        itemTypeValues['watchedValues'] = watchedValues;
        data[itemType] = itemTypeValues;
        localStorage.setItem('data', JSON.stringify(data));

        // run search to ensure
        search()
      });
    }
  } else {
    // Add a change listener to each caughtCheckbox
    for (let i = 0; i < caughtCheckboxes.length; i++) {
      caughtCheckboxes[i].addEventListener("change", function() {
        // Store the checked values in caughtValues
        caughtValues[this.id] = this.checked;

        // add caughtValues to itemTypeValues, add itemTypeValues to data, then set data in localStorage
        itemTypeValues['caughtValues'] = caughtValues;
        data[itemType] = itemTypeValues;
        localStorage.setItem('data', JSON.stringify(data));
      });
    }

    var watchedCheckboxes = document.getElementsByClassName(itemType + '__watched');
    var watchedValues = itemTypeValues['watchedValues'] || {};

    // Add a change listener to each watchedCheckbox
    for (let i = 0; i < watchedCheckboxes.length; i++) {
      const itemContainer = getFossilContainer(watchedCheckboxes[i])

      watchedCheckboxes[i].addEventListener("change", function() {
        // Store the checked values in watchedValues
        watchedValues[this.id] = this.checked;

        // If watched box is ticked, check the caught box too
        if (this.checked == true) {
          // Art items don't have a caught checkbox
          if (itemType != "art") {
            document.getElementById(this.id).previousSibling.previousSibling.checked = true;
            caughtValues[document.getElementById(this.id).previousSibling.previousSibling.id] = true;

            itemTypeValues['caughtValues'] = caughtValues;
            data[itemType] = itemTypeValues;
            localStorage.setItem('data', JSON.stringify(data));
          }

          // add is-watched class to the container for filtering purposes
          if (itemContainer.classList.contains('parts')) {
            itemContainer.classList.add('is-watched');
          } else if (checkFossilCompletion(itemContainer)) {
            itemContainer.classList.add('is-watched');
          }
        } else {
          // remove is-watched class from the container for filtering purposes
          itemContainer.classList.remove('is-watched')
        }

        // add watchedValues to itemTypeValues, add itemTypeValues to data, then set data in localStorage
        itemTypeValues['watchedValues'] = watchedValues;
        data[itemType] = itemTypeValues;
        localStorage.setItem('data', JSON.stringify(data));
      });
    }
  }
}

/**
 * Checks fossil collection container for complete watched set
 * @param fossilCollectionContainer Container of the fossil being checked
 * @returns boolean
 */
function checkFossilCompletion(fossilCollectionContainer) {
  const collectionwatchedCheckboxes = fossilCollectionContainer.querySelectorAll('.watched');
  for (var i=0; i < collectionwatchedCheckboxes.length; i++) {
    if (!collectionwatchedCheckboxes[i].checked) {
      return false;
    }
  }
  return true;
}

/**
 * Returns the appropriate container for either a fossil item or collection
 * @param fossilwatchedCheckbox HTML node of the checkbox for the fossil
 * @returns HTML element
 */
function getFossilContainer(fossilwatchedCheckbox) {
  // Check to see if checked item is part of a collection
  const threeParentsUp = fossilwatchedCheckbox.parentElement.parentElement.parentElement;
  const isInCollection = threeParentsUp.classList.contains('part');
  // Target container of overall collection/single item
  const fossilContainer = isInCollection ? threeParentsUp.parentElement.parentElement : threeParentsUp;

  return fossilContainer;
}

// FILTER FUNCTIONS //

/**
 * Filter the list of items based on the search input value
 */
function search() {
  // Loop through all containers, and if the title doesn't include the search query, set display to none
  var query = document.getElementsByClassName("filters__search")[0].value;
  var filter = query.toUpperCase();

  for (i = 0; i < containers.length; i++) {
    var name = containers[i].getElementsByTagName("h2")[0].innerText;
    if (name.toUpperCase().indexOf(filter) > -1) {
      containers[i].style.display = "flex";
    } else {
      containers[i].style.display = "none";
    }
  }
}

/**
 * Show all of the items by removing the is-filtered class from all item containers
 */
function filterAll() {
  const filteredContainers = document.querySelectorAll('.is-filtered');
  for (i = 0; i < filteredContainers.length; i++) {
    filteredContainers[i].classList.remove('is-filtered');
  }
}

/**
 * Toggle (hide/show) the watched items ONLY if the ALL filter is selected and the searchbox is empty
 */
function togglewatched() {
  // Change the watchedHidden variable and set the text of the button
  watchedHidden == 'false' ? watchedHidden = 'true' : watchedHidden = 'false';
  watchedHidden == 'false' ? togglewatchedButton.innerText = "Hide watched" : togglewatchedButton.innerText = "Show watched";

  // Save the watchedHidden selection to localStorage
  localStorage.setItem('watchedHidden', watchedHidden);

  if (watchedHidden == 'true') {
    document.querySelector('.main-container').classList.add('hide-watched');
  } else {
    document.querySelector('.main-container').classList.remove('hide-watched');
  }
}

// INITIALISE THE PAGE DISPLAY OF ITEMS //

initItems();

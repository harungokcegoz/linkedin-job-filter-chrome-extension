console.log("Content script is running.");

function applyFilters() {
  chrome.storage.sync.get(['language', 'experience', 'partTime'], function (data) {
    console.log('Retrieved preferences:', data);

    const languagePreference = data.language || 'any';
    const maxExperience = data.experience || null;
    const partTimePreference = data.partTime || 'any';
    
    const descriptionElement = document.querySelector('.jobs-description__container'); 
    const description = descriptionElement ? descriptionElement.innerText : '';

    let highlight = true;
    let highlightedDescription = description;

    //Check language
    if (languagePreference === 'english') {
      const commonEnglishWords = /\b(and|or|english|the)\b/i;
      highlight = highlight && commonEnglishWords.test(description);

      if (highlight) {
        const activeJobListItem = document.querySelector('.jobs-search-results-list__list-item--active');
        
        if (activeJobListItem) {
          const label = document.createElement('span');
          label.textContent = 'Language Matched';
          label.style.color = 'white';
          label.style.backgroundColor = 'green';
          label.style.padding = '2px 6px';
          label.style.borderRadius = '4px';
          label.style.fontSize = '12px';
          label.style.marginLeft = '10px';
          const jobTitleDiv = activeJobListItem.querySelector('.artdeco-entity-lockup__title');

          if (jobTitleDiv) jobTitleDiv.appendChild(label);
        }
      }
    }

    // // Check experience level
    // if (maxExperience) {
    //   const experienceMatch = description.match(/(\d+) (year|years)/);
    //   const experience = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
    //   highlight = highlight && experience <= maxExperience;

    //   if (experienceMatch) {
    //     highlightedDescription = highlightedDescription.replace(
    //       experienceMatch[0],
    //       `<span style="background-color: yellow;">${experienceMatch[0]}</span>`
    //     );
    //   }
    // }

    // // Check for part-time possibility
    // if (partTimePreference === 'yes') {
    //   const partTimeMatch = description.match(/part-time|flexible hours/i);
    //   highlight = highlight && partTimeMatch;

    //   if (partTimeMatch) {
    //     highlightedDescription = highlightedDescription.replace(
    //       partTimeMatch[0],
    //       `<span style="background-color: yellow;">${partTimeMatch[0]}</span>`
    //     );
    //   }
    // }

    // // Highlight the job if all conditions are met
    // if (highlight) {
    //   job.style.backgroundColor = '#FFD700';
    //   descriptionElement.innerHTML = highlightedDescription;
    // }
   
  });
}

// Function to wait for content to load and then apply filters
function waitForContentAndApplyFilters() {
  setTimeout(() => {
    applyFilters();
  }, 2000);
}

waitForContentAndApplyFilters();
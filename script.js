// Fetch Uma Musume character data from the API
fetch('https://umapyoi.net/api/v1/character/info')
  .then(response => response.json())
  .then(data => {
    const umaMusumeOptions = data.map(character => `<option value="${character.id}">${character.name_en}</option>`).join('');

    const umaSelects = document.querySelectorAll('select[id^="shortUma"], select[id^="mileUma"], select[id^="mediumUma"], select[id^="longUma"], select[id^="dirtUma"]');
    umaSelects.forEach(select => {
      select.innerHTML = `<option value="">Select Uma</option>${umaMusumeOptions}`;
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Show/hide grade select based on rank selection
const rankSelect = document.getElementById('rank');
const gradeContainer = document.getElementById('gradeContainer');

rankSelect.addEventListener('change', function() {
  if (['UG', 'UF', 'UE'].includes(this.value)) {
    gradeContainer.style.display = 'block';
  } else {
    gradeContainer.style.display = 'none';
  }
});

// Handle form submission
const form = document.getElementById('teamBuilderForm');
const resultsContainer = document.getElementById('resultsContainer');
const loadingOverlay = document.getElementById('loadingOverlay');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Show the loading overlay with fade-in effect
  loadingOverlay.classList.add('active');

  const formData = new FormData(form);
  const trainerName = formData.get('trainerName');
  const rank = formData.get('rank');
  const grade = formData.get('grade');
  const shortUma1 = formData.get('shortUma1');
  const shortUma2 = formData.get('shortUma2');
  const mileUma1 = formData.get('mileUma1');
  const mileUma2 = formData.get('mileUma2');
  const mediumUma1 = formData.get('mediumUma1');
  const mediumUma2 = formData.get('mediumUma2');
  const longUma1 = formData.get('longUma1');
  const longUma2 = formData.get('longUma2');
  const dirtUma1 = formData.get('dirtUma1');
  const dirtUma2 = formData.get('dirtUma2');

  // Fetch selected Uma Musume data from the API
  const selectedUmaIds = [shortUma1, shortUma2, mileUma1, mileUma2, mediumUma1, mediumUma2, longUma1, longUma2, dirtUma1, dirtUma2];
  const promises = selectedUmaIds.map(id => fetch(`https://umapyoi.net/api/v1/character/${id}`).then(response => response.json()));

  Promise.all(promises)
    .then(umaData => {
      let tableHTML = `
        <table>
          <tr>
            <th>Trainer Name</th>
            <td>${trainerName}</td>
          </tr>
          <tr>
            <th>Rank</th>
            <td>${rank}${grade ? ` (Grade ${grade})` : ''}</td>
          </tr>
          <tr>
            <th>SHORT - Sprinters Stakes (NAK 1200m) (R)</th>
            <td>
              <img src="${umaData[0].sns_icon}" alt="${umaData[0].name_en}">
              <img src="${umaData[1].sns_icon}" alt="${umaData[1].name_en}">
            </td>
          </tr>
          <tr>
            <th>MILE - Victoria Mile (TOK 1600m) (L)</th>
            <td>
              <img src="${umaData[2].sns_icon}" alt="${umaData[2].name_en}">
              <img src="${umaData[3].sns_icon}" alt="${umaData[3].name_en}">
            </td>
          </tr>
          <tr>
            <th>MEDIUM - Prix de l'Arc de Triomphe (LON 2400m) (R)</th>
            <td>
              <img src="${umaData[4].sns_icon}" alt="${umaData[4].name_en}">
              <img src="${umaData[5].sns_icon}" alt="${umaData[5].name_en}">
            </td>
          </tr>
          <tr>
            <th>LONG - Tenno Sho Spring (KYO 3200m) (R)</th>
            <td>
              <img src="${umaData[6].sns_icon}" alt="${umaData[6].name_en}">
              <img src="${umaData[7].sns_icon}" alt="${umaData[7].name_en}">
            </td>
          </tr>
          <tr>
            <th>DIRT - February Stakes (TOK 1600m) (L)</th>
            <td>
              <img src="${umaData[8].sns_icon}" alt="${umaData[8].name_en}">
              <img src="${umaData[9].sns_icon}" alt="${umaData[9].name_en}">
            </td>
          </tr>
        </table>
      `;

      resultsContainer.innerHTML = tableHTML;

      // Hide the loading overlay with fade-out effect
      setTimeout(() => {
        loadingOverlay.classList.remove('active');
        // Smooth scroll to the result table
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    })
    .catch(error => {
      console.error('Error:', error);
      // Hide the loading overlay with fade-out effect in case of an error
      loadingOverlay.classList.remove('active');
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightboxImage');
const close = lightbox.querySelector('.close');

document.querySelectorAll('.raceImage').forEach(image => {
  image.addEventListener('click', function() {
    lightboxImage.src = this.src;
    lightbox.style.display = 'block';
  });
});

close.addEventListener('click', function() {
  lightbox.style.display = 'none';
});
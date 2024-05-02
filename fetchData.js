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

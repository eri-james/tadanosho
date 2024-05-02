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

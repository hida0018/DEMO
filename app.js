const apiKey = 'boaI3q5S1TD374o0eNPjlZdxee8iO73RdukTw2vKsI5k2Hml6ETsSM8V';
document.getElementById('searchInput').value="";

document.getElementById('searchForm').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const searchQuery = document.getElementById('searchInput').value;

  if (!searchQuery) {
    alert('Please enter a search term.');
    return;
  }

  const apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=100`;

  fetch(apiUrl, {
    headers: {
      'Authorization': apiKey,
    },
  })
  .then(response => response.json())
  .then(data => {
    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = '';

    data.photos.forEach(photo => {
      fetch(photo.src.medium)
        .then(response => response.blob())
        .then(blob => {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(blob);
          img.alt = photo.id;
          imageGrid.appendChild(img);
        })
        .catch(error => console.error('Error fetching image data:', error));
    });
  })
  .catch(error => console.error('Error fetching data:', error));
});
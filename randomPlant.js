async function generateRandomPlant() {
    const apiKey = document.getElementById('api-key').value;
    const plantDetailsDiv = document.getElementById('plant-details');
    plantDetailsDiv.innerHTML = '';

    try {
        const response = await fetch(`https://perenual.com/docs/api/plants?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            plantDetailsDiv.textContent = 'Error fetching plant data.';
            return;
        }

        const plants = data.data;
        const randomPlant = plants[Math.floor(Math.random() * plants.length)];

        const plantDiv = document.createElement('div');
        plantDiv.classList.add('plant');

        const plantName = document.createElement('h2');
        plantName.textContent = randomPlant.common_name;
        plantDiv.appendChild(plantName);

        if (randomPlant.image_url) {
            const plantImage = document.createElement('img');
            plantImage.src = randomPlant.image_url;
            plantDiv.appendChild(plantImage);
        }

        const plantDescription = document.createElement('p');
        plantDescription.textContent = randomPlant.description || 'No description available.';
        plantDiv.appendChild(plantDescription);

        plantDetailsDiv.appendChild(plantDiv);
    } catch (error) {
        plantDetailsDiv.textContent = 'Error fetching plant data';
        console.error(error);
    }
}
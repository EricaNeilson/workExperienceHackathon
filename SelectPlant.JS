async function recommendPlant() {
    const apiKey = document.getElementById('sk-P4V166a3644f6f2186337').value;
    const sunlight = document.getElementById('sunlight').value;
    const maintenance = document.getElementById('maintenance').value;
    const space = document.getElementById('space').value;
    const edible = document.getElementById('edible').value;
    const hardiness = document.getElementById('hardiness').value;


    let plantQuery = '';

    
    if (sunlight === 'high' && maintenance === '' && space === 'small') {
        plantQuery = 'succulent';
    } else if (sunlight === 'partial' && maintenance === 'medium' && space === 'medium') {
        plantQuery = 'snake plant';
    } else if (sunlight === 'shade' && maintenance === 'high' && space === 'large') {
        plantQuery = 'fern';
    } else {
        plantQuery = 'spider plant';
    }

    const resultDiv = document.getElementById('result');
    const plantDetailsDiv = document.getElementById('plant-details');
    resultDiv.textContent = `We recommend you get a ${plantQuery}!`;

    try {
        const response = await fetch(`https://perenual.com/docs/api/plants?key=${apiKey}&q=${plantQuery}`);
        const data = await response.json();

        if (data.error) {
            plantDetailsDiv.textContent = 'Error fetching plant data. Please check your API key and try again.';
            return;
        }

       
        plantDetailsDiv.innerHTML = '';
        data.data.forEach(plant => {
            const plantDiv = document.createElement('div');
            plantDiv.classList.add('plant');

            const plantName = document.createElement('h2');
            plantName.textContent = plant.common_name;
            plantDiv.appendChild(plantName);

            if (plant.image_url) {
                const plantImage = document.createElement('img');
                plantImage.src = plant.image_url;
                plantDiv.appendChild(plantImage);
            }

            const plantDescription = document.createElement('p');
            plantDescription.textContent = plant.description || 'No description available.';
            plantDiv.appendChild(plantDescription);

            plantDetailsDiv.appendChild(plantDiv);
        });
    } catch (error) {
        plantDetailsDiv.textContent = 'Error fetching plant data';
        console.error(error);
    }
}
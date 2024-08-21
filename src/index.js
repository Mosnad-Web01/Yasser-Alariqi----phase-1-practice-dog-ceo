document.addEventListener("DOMContentLoaded", () => {
  fetchRandomDogImages();
  fetchAndDisplayBreeds();
  setupBreedFilter();
});

function fetchRandomDogImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => response.json())
    .then((data) => {
      const imageContainer = document.getElementById("dog-image-container");
      data.message.forEach((image) => {
        const img = document.createElement("img");
        img.src = image;
        imageContainer.appendChild(img);
      });
    })
    .catch((error) => console.error("Error fetching dog images:", error));
}

function fetchAndDisplayBreeds() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  
  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      const breeds = Object.keys(data.message);
      const dogBreeds = document.getElementById("dog-breeds");

      breeds.forEach((breed) => {
        const li = document.createElement("li");
        li.textContent = breed;
        li.dataset.breed = breed;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
          li.style.color = "red";
        });
        dogBreeds.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching breeds:", error));
}

function setupBreedFilter() {
  const breedDropdown = document.getElementById("breed-dropdown");

  breedDropdown.addEventListener("change", function() {
    const selectedLetter = this.value;
    const dogBreeds = document.getElementById("dog-breeds").children;

    Array.from(dogBreeds).forEach((li) => {
      if (li.dataset.breed.startsWith(selectedLetter)) {
        li.style.display = "list-item";
      } else {
        li.style.display = "none";
      }
    });
  });
}

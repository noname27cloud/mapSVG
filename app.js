const info = document.getElementById("info");

document.querySelectorAll("svg path").forEach((element) => {
  element.addEventListener("mouseover", (event) => {
    const regionName =
      event.target.getAttribute("name") || "Неизвестный регион";
    const population = event.target.getAttribute("id") || "Нет данных";
    const status = event.target.getAttribute("status") || "No date";
    info.innerHTML = `Город: ${regionName} <br> Id: ${population} <br> Status: ${status} `;
    info.style.display = "block";
    info.style.left = event.pageX + 10 + "px";
    info.style.top = event.pageY + 10 + "px";
    if (status === "inactive") {
      info.style.opacity = "0.5";
      event.target.style.opacity = "0.5";
    } else {
      info.style.opacity = "1";
      event.target.style.opacity = "1";
    }
  });

  element.addEventListener("mouseout", () => {
    info.style.display = "none";
    element.style.opacity = "1";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("showModal");
  const cityName = document.getElementById("city-name");
  const population = document.getElementById("population");
  const colleges = document.getElementById("colleges");
  const area = document.getElementById("area");
  const description = document.getElementById("description");

  fetch("inform.json")
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll("svg path").forEach((element) => {
        element.addEventListener("click", () => {
          const cityId = parseInt(element.getAttribute("id"), 10);
          let city = data.cities.find((c) => c.id === cityId);
          let region = data.regions.find((r) => r.id === cityId);
          if (city) {
            openModal(city, "Город");
          } else if (region) {
            openModal(region, "Область");
          } else {
            console.error("Данные не найдены для ID:", cityId);
          }
        });
      });
    })
    .catch((error) => console.error("Error read JSON:", error));

  function openModal(data, type) {
    cityName.textContent = `${type}:${data.name}`;
    population.textContent = data.population.toLocaleString();
    colleges.textContent = data.colleges;
    area.textContent = data.area_km2;
    description.textContent = data.description || "Описание отсутствует";
    modal.showModal();
  }

  window.closeModal = function () {
    modal.close();
  };
});

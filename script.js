const apiKey = "8211ebd201b449b2b9195059252007"; // Kendi API anahtarını buraya koy

const resultDiv = document.getElementById("weatherResult");

document.getElementById("weatherForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    resultDiv.style.display = "block";
    resultDiv.style.opacity = "1";
    resultDiv.style.animation = "";
    resultDiv.innerHTML = `<p style="color: #f99;">Lütfen şehir adı girin!</p>`;
    return;
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=tr`);

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "Hava durumu alınamadı");
    }

    const data = await response.json();

    const html = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>🌡️ Sıcaklık: ${data.current.temp_c} °C</p>
      <p>💧 Nem: ${data.current.humidity} %</p>
      <p>🌥️ Durum: ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
    `;

    resultDiv.style.display = "inline-block";
    resultDiv.style.opacity = "1";
    resultDiv.style.animation = "fadeIn 0.6s forwards, upDown 3s ease-in-out infinite";
    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.style.display = "block";
    resultDiv.style.opacity = "1";
    resultDiv.style.animation = "";
    resultDiv.innerHTML = `<p style="color: #f99;">Hata: ${error.message}</p>`;
  }
});

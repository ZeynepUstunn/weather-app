const apiKey = "590069328d75e2715bd8ee971bce17b7";

document.getElementById("weatherForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`
    );

    if (!response.ok) throw new Error("Şehir bulunamadı!");

    const data = await response.json();
    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Sıcaklık: ${data.main.temp} °C</p>
      <p>💧 Nem: ${data.main.humidity}%</p>
      <p>🌥️ Durum: ${data.weather[0].description}</p>
    `;
    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: #f99;">Hata: ${error.message}</p>`;
  }
});

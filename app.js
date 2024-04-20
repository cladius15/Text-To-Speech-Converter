let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let textarea = document.querySelector("textarea");
let button = document.querySelector("button");

// Sayfa yüklendiğinde önceki verileri kontrol et
window.addEventListener("load", () => {
  // Yerel depolamada kayıtlı bir veri varsa, metin alanına yerleştir
  if (localStorage.getItem("inputText")) {
    textarea.value = localStorage.getItem("inputText");
  }
});

// Metin alanından herhangi bir tuşa basıldığında
textarea.addEventListener("input", () => {
  // Yerel depolamadaki veriyi güncelle
  localStorage.setItem("inputText", textarea.value);
});

// Klavyeden bir tuşa basıldığında
window.addEventListener("keydown", (e) => {
  // Eğer basılan tuş enter ise ve metin alanı boş ise
  if (e.key === "Enter" && textarea.value === "") {
    // Yerel depolamadaki veriyi sil
    localStorage.removeItem("inputText");
  }
});

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

button.addEventListener("click", () => {
  speech.text = textarea.value;
  window.speechSynthesis.speak(speech);
});

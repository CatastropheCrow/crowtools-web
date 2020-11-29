function crow(text, decode) {
    let nils = {"S": "A", "F": "B", "T": "C", "Z": "D", "L": "E", "Q": "F", "U": "G", "I": "H", "R": "I", "V": "J", "Y": "K", "O": "L", "J": "M", "C": "N", "E": "O", "X": "P", "M": "Q", "H": "R", "W": "S", "N": "T", "P": "U", "B": "V", "A": "W", "D": "X", "K": "Y", "G": "Z", "s": "a", "f": "b", "t": "c", "z": "d", "l": "e", "q": "f", "u": "g", "i": "h", "r": "i", "v": "j", "y": "k", "o": "l", "j": "m", "c": "n", "e": "o", "x": "p", "m": "q", "h": "r", "w": "s", "n": "t", "p": "u", "b": "v", "a": "w", "d": "x", "k": "y", "g": "z"};

    if (decode) nils = Object.assign({}, ...Object.entries(nils).map(([a, b]) => ({[b]: a})))

    return text.split("").map(thea => nils[thea] || thea).join("");
};

function vigenere(digits, pass) {
    digits = digits.replace(/\D/g, "");
    if (!digits) return "&nbsp;";
    pass = pass.toUpperCase().replace(/[^A-Z]/g, "");
    if (!pass) return "&nbsp;";

    pass = pass.repeat(Math.ceil(digits.length/pass.length)).split("");

    return digits.split("").map((digit, index) => {
      if (digit == "0") digit = "10";
      digit = parseInt(digit);
      return document.querySelector(`tr:nth-child(${digit}) td:nth-child(${pass[index].charCodeAt(0) - 63})`).innerText.toUpperCase();
    }).join("");
};

document.addEventListener("DOMContentLoaded", e => {
  const english = document.querySelector("textarea:first-child");
  const encoded = document.querySelector("textarea:last-child");

  english.addEventListener("input", e => encoded.value = crow(english.value));
  encoded.addEventListener("input", e => english.value = crow(encoded.value, true));

  const sampler = new Tone.Sampler({
    urls: {
      "C3": "C3.opus",
      "C#3": "Csharp3.opus",
      "D3": "D3.opus",
      "D#3": "Dsharp3.opus",
      "E3": "E3.opus",
      "F3": "F3.opus",
      "F#3": "Fsharp3.opus",
      "G3": "G3.opus",
      "G#3": "Gsharp3.opus",
      "A3": "A3.opus",
      "A#3": "Asharp3.opus",
      "B3": "B3.opus",
      "C4": "C4.opus",
      "C#4": "Csharp4.opus",
      "D4": "D4.opus",
      "D#4": "Dsharp4.opus",
      "E4": "E4.opus",
      "F4": "F4.opus",
      "F#4": "Fsharp4.opus",
      "G4": "G4.opus",
      "G#4": "Gsharp4.opus",
      "A4": "A4.opus",
      "A#4": "Asharp4.opus",
      "B4": "B4.opus",
      "C5": "C5.opus",
      "C#5": "Csharp5.opus"
    },
    baseUrl: "beeps/"
  }).toDestination();
  document.querySelectorAll("button").forEach(b => b.addEventListener("mousedown", e => sampler.triggerAttackRelease(b.innerText.split("\n")[2], "8n")));

  document.querySelectorAll("th").forEach(h => {if (h.innerText) h.addEventListener("click", e => {
    document.querySelectorAll(".yselected").forEach(o => o.classList.remove("yselected"));
    document.querySelectorAll(`td:nth-child(${[...h.parentElement.children].indexOf(h) + 1})`).forEach(o => o.classList.add("yselected"));
  })});
  document.querySelectorAll("td:first-child").forEach(h => h.addEventListener("click", e => {
    document.querySelectorAll(".xselected").forEach(o => o.classList.remove("xselected"));
    h.classList.add("xselected");
  }));

  const digits = document.querySelector("#digits");
  const pass = document.querySelector("#pass");
  const result = document.querySelector("p");
  digits.addEventListener("input", e => result.innerHTML = vigenere(digits.value, pass.value));
  pass.addEventListener("input", e => result.innerHTML = vigenere(digits.value, pass.value));
});

function crow(text, decode) {
    let nils = {"S": "A", "F": "B", "T": "C", "Z": "D", "L": "E", "Q": "F", "U": "G", "I": "H", "R": "I", "V": "J", "Y": "K", "O": "L", "J": "M", "C": "N", "E": "O", "X": "P", "M": "Q", "H": "R", "W": "S", "N": "T", "P": "U", "B": "V", "A": "W", "D": "X", "K": "Y", "G": "Z", "s": "a", "f": "b", "t": "c", "z": "d", "l": "e", "q": "f", "u": "g", "i": "h", "r": "i", "v": "j", "y": "k", "o": "l", "j": "m", "c": "n", "e": "o", "x": "p", "m": "q", "h": "r", "w": "s", "n": "t", "p": "u", "b": "v", "a": "w", "d": "x", "k": "y", "g": "z"};

    if (decode) nils = Object.assign({}, ...Object.entries(nils).map(([a, b]) => ({[b]: a})))

    return text.split("").map(thea => nils[thea] || thea).join("");
};

document.addEventListener("DOMContentLoaded", e => {
  const english = document.querySelector("textarea:first-child");
  const encoded = document.querySelector("textarea:last-child");
  const arrow = document.querySelector("b");

  english.addEventListener("input", e => encoded.value = crow(english.value));
  encoded.addEventListener("input", e => english.value = crow(encoded.value, true));
  english.addEventListener("focus", e => {arrow.innerText = "🠆"; arrow.style = ""});
  encoded.addEventListener("focus", e => {arrow.innerText = "🠄"; arrow.style = ""});
});

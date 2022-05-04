import { ruLang, engLang, ruLangCaps, engLangCaps } from "../components/data";

let textValue = "";
const body = document.querySelector("body");
const container = document.createElement("div");
body.append(container);

const textArea = document.createElement("textarea");
textArea.value = textValue;
// textArea.readOnly = true;
container.append(textArea);

const onAddClick = (button) => {
  if (button.innerHTML === "Backspase") {
    textValue = textValue.slice(0, -1);
  } else if (button.innerHTML === "Tab") {
    textValue = textValue + "   ";
  } else if (button.innerHTML === "Del") {
    // textValue = textValue.slice(
    //   textArea.selectionStart,
    //   textArea.selectionStart + 1
    // );
    console.log(textValue, "1");
    console.log(textArea.selectionStart);
    console.log(
      textValue.split("").splice(textArea.selectionStart, 1).join(""),
      "2"
    );
    if (textArea.selectionStart) {
      textValue = textValue
        .split("")
        .splice(textArea.selectionStart, 1)
        .join("");
    }
  } else if (button.innerHTML === "CapsLock") {
  } else if (button.innerHTML === "Enter") {
    textValue = textValue + "\n";
  } else if (button.innerHTML === "Shift") {
  } else if (button.innerHTML === "Ctrl") {
  } else if (button.innerHTML === "Win") {
  } else if (button.innerHTML === "Alt") {
  } else {
    textValue = textValue + button.innerHTML;
  }

  textArea.value = textValue;
};

const onCreateKeyboard = (arr) => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  container.append(keyboard);

  arr.forEach((element) => {
    const keyboardLine = document.createElement("div");
    keyboardLine.classList.add("keyboardLine");
    keyboard.append(keyboardLine);
    element.forEach((item) => {
      const keyboardButton = document.createElement("div");
      keyboardButton.classList.add("keyboardButton");
      keyboardLine.append(keyboardButton);
      keyboardButton.innerHTML = item;
      keyboardButton.addEventListener("click", () => {
        onAddClick(keyboardButton);
      });
    });
  });
  return keyboard;
};
onCreateKeyboard(ruLang);

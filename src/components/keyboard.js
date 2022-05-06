import { ruLang, engLang, ruLangCaps, engLangCaps } from "./data";

let language = "ru";
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
    textValue += "   ";
  } else if (button.innerHTML === "Del") {
  } else if (button.innerHTML === "CapsLock") {
    if (language === "ru") {
      onRenderKeyboard(ruLangCaps);
      language = "ruCaps";
    } else if (language === "ruCaps") {
      onRenderKeyboard(ruLang);
      language = "ru";
    } else if (language === "eng") {
      onRenderKeyboard(engLangCaps);
      language = "engCaps";
    } else if (language === "engCaps") {
      language = "eng";
      onRenderKeyboard(engLang);
    }
  } else if (button.innerHTML === "Enter") {
    textValue += "\n";
  } else if (button.innerHTML === "Shift") {
  } else if (button.innerHTML === "Ctrl") {
  } else if (button.innerHTML === "Alt") {
  } else if (button.innerHTML === "CtrlR") {
    if (language === "ru") {
      language = "eng";
      onRenderKeyboard(engLang);
    } else if (language === "ruCaps") {
      onRenderKeyboard(engLangCaps);
      language = "engCaps";
    } else if (language === "eng") {
      onRenderKeyboard(ruLang);
      language = "ru";
    } else if (language === "engCaps") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
    }
  } else {
    textValue += button.innerHTML;
  }
  textArea.value = textValue;
};

const onCreateKeyboard = (arr) => {
  console.log(arr);
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
      keyboardButton;
    });
  });
};
onCreateKeyboard(ruLang);

const onKeyUpButton = (event) => {
  if (event.code === "Backspace") {
    textValue = textValue.slice(0, -1);
  } else if (event.code === "Tab") {
    textValue += "   ";
  } else if (event.code === "Enter") {
    textValue += "\n";
  } else if (event.code === "CapsLock") {
    onRenderKeyboard();
  } else if (event.code === "ArrowUp") {
    textValue += "⇑";
  }
  else if (event.code === "ArrowDown") {
    textValue += "⇓";
  }
  else if (event.code === "ArrowLeft") {
    textValue += "⇐";
  }
  else if (event.code === "ArrowRight") {
    textValue += "⇒";
  }
  else {
    textValue += event.key;
  }
  textArea.value = textValue;
};

document.addEventListener("keyup", (event) => {
  onKeyUpButton(event);
});
const onRenderKeyboard = (arr) => {
  const keyboard = document.querySelector(".keyboard");
  
  keyboard.remove();
  onCreateKeyboard(arr);

  console.log(keyboard);
};

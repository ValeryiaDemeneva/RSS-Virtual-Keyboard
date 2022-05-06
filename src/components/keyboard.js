import { ruLang, engLang, ruLangCaps, engLangCaps, keyCode } from "./data";

let language = "ru";
let textValue = "";
const body = document.querySelector("body");
const container = document.createElement("div");
body.append(container);
const textArea = document.createElement("textarea");
textArea.value = textValue;
textArea.readOnly = true;
container.append(textArea);

const onAddClick = (button) => {
  const { innerHTML: text } = button;
  if (text === "Backspase") {
    textValue = textValue.slice(0, -1);
  } else if (text === "Tab") {
    textValue += "   ";
  } else if (text === "Del") {
  } else if (text === "CapsLock") {
    if (language === "ru") {
      onRenderKeyboard(ruLangCaps);
      language = "ruCaps";
    } else if (language === "ruCaps") {
      onRenderKeyboard(ruLang);
      language = "ru";
    } else if (language === "en") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
    }
  } else if (text === "Enter") {
    textValue += "\n";
  } else if (text === "Shift") {
  } else if (text === "Ctrl") {
  } else if (text === "Alt") {
  } else if (text === "CtrlR") {
    if (language === "ru") {
      language = "en";
      onRenderKeyboard(engLang);
    } else if (language === "ruCaps") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
    } else if (language === "en") {
      onRenderKeyboard(ruLang);
      language = "ru";
    } else if (language === "enCaps") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
    }
  } else {
    textValue += text;
  }
  textArea.value = textValue;
};

const onMouseDown = (button) => {
  if (button.innerHTML === "Shift") {
    if (language === "ru") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
    } else if (language === "ruCaps") {
      language = "ru";
      onRenderKeyboard(ruLang);
    } else if (language === "en") {
      language = "enCaps";
      onRenderKeyboard(engLangCaps);
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
    }
    document.querySelector(".Shift").classList.add("active");
  }
};

const onMouseUp = (button) => {
  if (button.innerHTML === "Shift") {
    if (language === "ruCaps") {
      language = "ru";
      onRenderKeyboard(ruLang);
    } else if (language === "ru") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
    } else if (language === "en") {
      language = "enCaps";
      onRenderKeyboard(engLangCaps);
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
    }
    document.querySelector(".Shift").classList.remove("active");
  }
};
const onCreateKeyboard = (arr) => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  container.append(keyboard);

  arr.forEach((line) => {
    const keyboardLine = document.createElement("div");
    keyboardLine.classList.add("keyboardLine");
    keyboard.append(keyboardLine);
    line.forEach((btn) => {
      const keyboardButton = document.createElement("div");
      keyboardButton.classList.add("keyboardButton");
      keyboardLine.append(keyboardButton);
      keyboardButton.innerHTML = btn;
      keyboardButton.classList.add(`key-${btn}`);
      keyboardButton.addEventListener("click", () => {
        onAddClick(keyboardButton);
      });
      keyboardButton.addEventListener("mousedown", () => {
        onMouseDown(keyboardButton);
      });
      keyboardButton.addEventListener("mouseup", () => {
        onMouseUp(keyboardButton);
      });
    });
  });
};

const onKeyUpButton = (event) => {
  const { code } = event;
  if (code === "Backspace") {
    textValue = textValue.slice(0, -1);
  } else if (code === "Tab") {
    textValue += "   ";
  } else if (code === "Enter") {
    textValue += "\n";
  } else if (code === "CapsLock") {
    if (language === "ru") {
      onRenderKeyboard(ruLangCaps);
      language = "ruCaps";
    } else if (language === "ruCaps") {
      onRenderKeyboard(ruLang);
      language = "ru";
    } else if (language === "en") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
    }
  } else if (code === "ArrowUp") {
    textValue += "⇑";
  } else if (code === "ArrowDown") {
    textValue += "⇓";
  } else if (code === "ArrowLeft") {
    textValue += "⇐";
  } else if (code === "ArrowRight") {
    textValue += "⇒";
  } else {
    keyCode.forEach((item) => {
      if (item.code === code) {
        textValue += item[language];
        document
          .querySelector(`.key-${item[language]}`)
          .classList.remove("active");
      }
    });
  }
  textArea.value = textValue;
};

const onKeyDownButton = (event) => {
  keyCode.forEach((item) => {
    if (item.code === event.code) {
      textValue += item[language];
      document.querySelector(`.key-${item[language]}`).classList.add("active");
    }
  });
};

const onAddDocumentListener = () => {
  document.addEventListener("keyup", (event) => {
    onKeyUpButton(event);
  });
  document.addEventListener("keydown", (event) => {
    onKeyDownButton(event);
  });
};

const onRenderKeyboard = (arr) => {
  const keyboard = document.querySelector(".keyboard");
  keyboard.remove();
  onCreateKeyboard(arr);
};

const init = () => {
  onAddDocumentListener();
  onCreateKeyboard(ruLang);
};

init();

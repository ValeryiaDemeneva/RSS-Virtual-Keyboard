import { ruLang, engLang, ruLangCaps, engLangCaps, keyCode } from "./data";

let language = localStorage.getItem("lang") || "ru";
let textValue = "";
const body = document.querySelector("body");
const container = document.createElement("div");
container.classList.add("container");
body.append(container);
const textArea = document.createElement("textarea");

textArea.value = textValue;
container.append(textArea);
const textAfter = document.createElement("div");
textAfter.innerHTML = 'To switch the language on the keyboard, press the CtrlLeft key or use the mouse CtrlR'
textAfter.classList.add("textAfter");
container.append(textAfter);




const onAddClick = (button) => {
  const { innerHTML: text } = button;
  if (text === "Backspace") {
    textValue = textValue.slice(0, -1);
  } else if (text === "Tab") {
    textValue += "   ";
  } else if (text === "Delete") {
    textValue = " ";
  } else if (text === "CapsLock") {
    if (language === "ru") {
      onRenderKeyboard(ruLangCaps);
      language = "ruCaps";
      localStorage.setItem("lang", "ruCaps");
    } else if (language === "ruCaps") {
      onRenderKeyboard(ruLang);
      language = "ru";
      localStorage.setItem("lang", "ru");
    } else if (language === "en") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
      localStorage.setItem("lang", "enCaps");
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    }
  } else if (text === "Enter") {
    textValue += "\n";
  } else if (text === "SPACE") {
    textValue += " ";
  } else if (text === "CtrlR") {
    //HERE
    if (language === "ru") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    } else if (language === "ruCaps") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
      localStorage.setItem("lang", "enCaps");
    } else if (language === "en") {
      onRenderKeyboard(ruLang);
      language = "ru";
      localStorage.setItem("lang", "ru");
    } else if (language === "enCaps") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
      localStorage.setItem("lang", "ruCaps");
    }
  } else {
    if (text !== "Shift" && text !== "Ctrl" && text !== "Alt") {
      textValue += text;
    }
  }
  textArea.value = textValue;
};

const onMouseDown = (button) => {
  if (button.innerHTML === "Shift") {
    if (language === "ru") {
      language = "ruCaps";
      localStorage.setItem("lang", "ruCaps");

      onRenderKeyboard(ruLangCaps);
    } else if (language === "ruCaps") {
      language = "ru";
      onRenderKeyboard(ruLang);
      localStorage.setItem("lang", "ru");
    } else if (language === "en") {
      language = "enCaps";
      onRenderKeyboard(engLangCaps);
      localStorage.setItem("lang", "enCaps");
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    }
    document.querySelector(".key-Shift").classList.add("active");
  }
};

const onMouseUp = (button) => {
  if (button.innerHTML === "Shift") {
    if (language === "ruCaps") {
      language = "ru";
      onRenderKeyboard(ruLang);
      localStorage.setItem("lang", "ru");
    } else if (language === "ru") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
      localStorage.setItem("lang", "ruCaps");
    } else if (language === "en") {
      language = "enCaps";
      onRenderKeyboard(engLangCaps);
      localStorage.setItem("lang", "enCaps");
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    }
    document.querySelector(".key-Shift").classList.remove("active");
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
      keyboardButton.dataset.key = btn;
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
    document
      .querySelector("div[data-key='" + "Backspace" + "']")
      .classList.remove("active");
  } else if (code === "Tab") {
    event.preventDefault();
    textValue += "   ";
    document
      .querySelector("div[data-key='" + "Tab" + "']")
      .classList.remove("active");
  } else if (code === "Enter") {
    textValue += "\n";
    document
      .querySelector("div[data-key='" + "\n" + "']")
      .classList.remove("active");
  } else if (code === "CapsLock") {
    if (language === "ru") {
      onRenderKeyboard(ruLangCaps);
      language = "ruCaps";
      localStorage.setItem("lang", "ruCaps");
    } else if (language === "ruCaps") {
      onRenderKeyboard(ruLang);
      language = "ru";
      localStorage.setItem("lang", "ru");
    } else if (language === "en") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
      localStorage.setItem("lang", "enCaps");
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    }
  } else if (code === "ArrowUp") {
    document
      .querySelector("div[data-key='" + "⇑" + "']")
      .classList.remove("active");
  } else if (code === "ArrowDown") {
    document
      .querySelector("div[data-key='" + "⇓" + "']")
      .classList.remove("active");
  } else if (code === "ArrowLeft") {
    document
      .querySelector("div[data-key='" + "⇐" + "']")
      .classList.remove("active");
  } else if (code === "ShiftLeft") {
    if (language === "ruCaps") {
      language = "ru";
      onRenderKeyboard(ruLang);
      localStorage.setItem("lang", "ru");
    } else if (language === "ru") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
      localStorage.setItem("lang", "ruCaps");
    } else if (language === "en") {
      language = "enCaps";
      onRenderKeyboard(engLangCaps);
      localStorage.setItem("lang", "enCaps");
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    }
    document
      .querySelector("div[data-key='" + "Shift" + "']")
      .classList.remove("active");
  } else if (code === "ArrowRight") {
    document
      .querySelector("div[data-key='" + "⇒" + "']")
      .classList.remove("active");
  } else if (code === "ControlLeft") {
    if (language === "ru") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    } else if (language === "ruCaps") {
      onRenderKeyboard(engLangCaps);
      language = "enCaps";
      localStorage.setItem("lang", "enCaps");
    } else if (language === "en") {
      onRenderKeyboard(ruLang);
      language = "ru";
      localStorage.setItem("lang", "ru");
    } else if (language === "enCaps") {
      language = "ruCaps";
      localStorage.setItem("lang", "ruCaps");

      onRenderKeyboard(ruLangCaps);
    }
    document
      .querySelector("div[data-key='" + "Ctrl" + "']")
      .classList.remove("active");
  } else if (code === "ControlRight") {
    document
      .querySelector("div[data-key='" + "CtrlR" + "']")
      .classList.remove("active");
  } else if (code === "Delete") {
    document
      .querySelector("div[data-key='" + "Delete" + "']")
      .classList.remove("active");
    textValue = " ";
  } else if (code === "AltLeft") {
    event.preventDefault();
    document
      .querySelector("div[data-key='" + "Alt" + "']")
      .classList.remove("active");
  } else if (code === "Space") {
    textValue += " ";
    document
      .querySelector("div[data-key='" + "SPACE" + "']")
      .classList.remove("active");
  } else {
    keyCode.forEach((item) => {
      if (item.code === code) {
        document
          .querySelector("div[data-key='" + item[language] + "']")
          .classList.remove("active");
      }
    });
  }
  textArea.value = textValue;
};

const onKeyDownButton = (event) => {
  const { code } = event;
  if (code === "ShiftLeft") {
    if (language === "ru") {
      language = "ruCaps";
      onRenderKeyboard(ruLangCaps);
      localStorage.setItem("lang", "ruCaps");
    } else if (language === "ruCaps") {
      language = "ru";
      onRenderKeyboard(ruLang);
      localStorage.setItem("lang", "ru");
    } else if (language === "en") {
      language = "enCaps";
      onRenderKeyboard(engLangCaps);
      localStorage.setItem("lang", "enCaps");
    } else if (language === "enCaps") {
      language = "en";
      onRenderKeyboard(engLang);
      localStorage.setItem("lang", "en");
    }
    document
      .querySelector("div[data-key='" + "Shift" + "']")
      .classList.add("active");
  } else if (code === "Backspace") {
    document
      .querySelector("div[data-key='" + "Backspace" + "']")
      .classList.add("active");
  } else if (code === "Space") {
    textValue += " ";
    document
      .querySelector("div[data-key='" + "SPACE" + "']")
      .classList.add("active");
  } else if (code === "Enter") {
    document
      .querySelector("div[data-key='" + "\n" + "']")
      .classList.add("active");
  } else if (code === "AltLeft") {
    event.preventDefault();
    document
      .querySelector("div[data-key='" + "Alt" + "']")
      .classList.add("active");
  } else if (code === "Tab") {
    event.preventDefault();
    document
      .querySelector("div[data-key='" + "Tab" + "']")
      .classList.add("active");
  } else if (code === "ControlLeft") {
    document
      .querySelector("div[data-key='" + "Ctrl" + "']")
      .classList.add("active");
  } else if (code === "ControlRight") {
    document
      .querySelector("div[data-key='" + "CtrlR" + "']")
      .classList.add("active");
  } else if (code === "CapsLock") {
    event.preventDefault();
    document
      .querySelector("div[data-key='" + "CapsLock" + "']")
      .classList.add("active");
  } else {
    keyCode.forEach((item) => {
      if (item.code === code) {
        textValue += item[language];
        document
          .querySelector("div[data-key='" + item[language] + "']")
          .classList.add("active");
      }
    });
  }
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
  const savedLang = localStorage.getItem("lang");

  switch (savedLang) {
    case "ru":
      onCreateKeyboard(ruLang);
      break;

    case "ruCaps":
      onCreateKeyboard(ruLangCaps);
      break;

    case "en":
      onCreateKeyboard(engLang);
      break;

    case "enCaps":
      onCreateKeyboard(engLangCaps);
      break;

    default:
      onCreateKeyboard(ruLang);
  }
};

init();

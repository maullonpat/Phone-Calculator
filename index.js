const inputNumber = document.getElementById("inputNumber");
const outputNumber = document.getElementById("outputNumber");
let operation = ""; //STORE APPENDED NUMBERS AND OPERATORS IN THIS VARIABLE

//* DYNAMICALLY ADJUST THE FONT SIZE
//! MESSY (CAN IMRPOVE)
function updateFontSize(element) {
  const length = element.textContent.length;
  if (length > 14) {
    element.style.fontSize = "1rem";
    element.style.color = "black";
    outputNumber.style.color = "gray";
    outputNumber.style.fontSize = "1rem";
  } else if (length > 9) {
    element.style.fontSize = "2rem";
    element.style.color = "black";
    outputNumber.style.color = "gray";
    outputNumber.style.fontSize = "1rem";
  } else {
    element.style.fontSize = "3rem";
    element.style.color = "black";
    outputNumber.style.color = "gray";
    outputNumber.style.fontSize = "1rem";
  }
}

//* DISPLAYS THE NUMBER ON SCREEN ON BUTTON PRESS
function appendTo(number) {
  if (inputNumber.textContent.length < 27) {
    if (number === "/") {
      inputNumber.textContent += "÷";
      operation += "/";
    } else if (number === "*") {
      inputNumber.textContent += "×";
      operation += "*";
    } else if (number === "%") {
      handlePercentage();
      return;
    } else if (number === "+/-") {
      handleNegation();
      return;
    } else {
      inputNumber.textContent += number;
      operation += number;
    }
    try {
      //* ONLY RETURNS THE EVAL OPERATION AFTER INPUTTING OPERATORS
      if (/[+\-*/]/.test(operation)) {
        outputNumber.textContent = eval(operation);
      } else {
        outputNumber.textContent = "";
      }
    } catch (e) {
      outputNumber.textContent = "";
    }
    updateFontSize(inputNumber);
  }
}

//* DELETE ALL THE INPUTS ON SCREEN (AS WELL AS CLEARING OPERATION VARIABLE)
function clearDisplay() {
  inputNumber.textContent = "";
  outputNumber.textContent = "";
  operation = "";
  updateFontSize(inputNumber);
}

//* FUNCTION FOR EQUAL SIGN (COMPUTATION)
function calculate() {
  let result = eval(operation);
  result = parseFloat(result.toPrecision(10)).toString();
  inputNumber.textContent = eval(operation);
  operation = inputNumber.textContent;
  changeFont(outputNumber);
}

//*BACKSPACE (1 CHAR CLEAR)
function backspace() {
  inputNumber.textContent = inputNumber.textContent.slice(0, -1);
  operation = inputNumber.textContent;
  updateFontSize(inputNumber);
  updateFontSize(outputNumber);
}

//*FUNCTION FOR CHANGING FONT COLOR AND SIZE ONCLICK(=)
//! MESSY (CAN IMRPOVE)
function changeFont(element) {
  const length = element.textContent.length;
  if (length > 19) {
    element.style.fontSize = "1rem";
    element.style.color = "black";
    inputNumber.style.color = "gray";
    inputNumber.style.fontSize = "1rem";
  } else if (length > 14) {
    element.style.fontSize = "1.5rem";
    element.style.color = "black";
    inputNumber.style.color = "gray";
    inputNumber.style.fontSize = "1rem";
  } else if (length > 9) {
    element.style.fontSize = "2rem";
    element.style.color = "black";
    inputNumber.style.color = "gray";
    inputNumber.style.fontSize = "1rem";
  } else {
    element.style.fontSize = "3rem";
    element.style.color = "black";
    inputNumber.style.color = "gray";
    inputNumber.style.fontSize = "2rem";
  }
}

//! DISPLAY THE CURRENT TIME
function currentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeString = `${hours}:${minutes}`;
  document.getElementById("time").textContent = timeString;
}
setInterval(currentTime, 1000);
currentTime();

//! CHECK BATTERY STATUS (PERCENTAGE)
if ("navigator" in window && "getBattery" in navigator) {
  navigator.getBattery().then(function (battery) {
    updateBatteryStatus(battery);
  });
} else {
  console.log("Battery Status API is not supported.");
}
function updateBatteryStatus(battery) {
  const batteryLevel = (battery.level * 100).toFixed(0) + "%";
  const isCharging = battery.charging ? "Charging" : "Not Charging";

  document.getElementById("battery-level").textContent = `${batteryLevel}`;
  battery.addEventListener("levelchange", () => {
    document.getElementById("battery-level").textContent = `Battery: ${(
      battery.level * 100
    ).toFixed(0)}%`;
  });
}

//! ALERT
function alertHello() {
  alert("I am a Calculator App!");
}

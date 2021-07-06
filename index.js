const { dialog } = require("electron");

const { Extension, INPUT_METHOD, PLATFORMS } = require("deckboard-kit");
const fetch = require("node-fetch");

class CallUrl extends Extension {
  constructor(props) {
    super();
    this.setValue = props.setValue;

    this.name = "FIREBASE";
    this.platforms = [PLATFORMS.WINDOWS];
    this.configs = {
      steamPaths: {
        type: "text",
        name: "FIREBASE DATABASE URL",
        descriptions: "",
        value: "https://gente-mala.firebaseio.com/deckboard.json",
      },
    };
    this.isFirstInit = true;

    this.inputs = [
      {
        label: "SAVE DATA",
        value: "save-data",
        icon: "save",
        input: [
          {
            label: "TARGET",
            ref: "target",
            type: INPUT_METHOD.INPUT_TEXT,
          },
          {
            label: "DATA",
            ref: "data",
            type: INPUT_METHOD.INPUT_TEXT,
          },
        ],
      },
      {
        label: "GET DATA",
        value: "get-data",
        icon: "download",
        mode: "custom-value",
        color: "#1a1a1a",
        input: [
          {
            label: "Selecciona el dato",
            type: "input:select",
            items: [
              { value: "text1", label: "texto 1" },
              { value: "text2", label: "texto 2" },
            ],
          },
        ],
      },
    ];
  }

  // Executes when the extensions loaded every time the app start.
  initExtension() {
    this.updateClock();
    if (this.isFirstInit) this.isFirstInit = false;
    this.updateClock();
    /*
    setInterval(
      () => {
      },
      this.isFirstInit ? 60000 - moment().get("seconds") * 1000 : 60000,
    );
    */
  }
  async updateClock() {
    this.setValue({
      text1: "texto 1",
      text2: "texto 2",
    });
    fetch(url, callback)
      .then((resp) => resp.json())
      .then(({ data }) => {
        console.log(data);
        dialog.showMessageBox("hola");
      });
  }

  execute(action, args) {
    switch (action) {
      case "save-data":
        const putMethod = {
          method: "PUT", // Method itself
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify({
            [args.target]: args.data,
          }), // We send data in JSON format
        };
        fetch(this.configs.steamPaths.value, putMethod);
        break;
      case "get-data":
        dialog.showMessageBox("hola");

        this.updateClock();
        break;
      default:
        break;
    }
  }
}

module.exports = (sendData) => new CallUrl(sendData);

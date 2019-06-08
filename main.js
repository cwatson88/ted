const {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  MenuItem
} = require("electron");

const createWindow = url => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  console.log(win.id);
  win.loadURL(url);
  // setTimeout(() => {
  //   win.hide();
  // }, 5000);

  //   const menu = new Menu();
  //   menu.append(
  //     new MenuItem({
  //       label: "Print",
  //       accelerator: "CmdOrCtrl+P",
  //       click: () => {
  //         console.log("time to print stuff");
  //       }
  //     })
  //   );
};

const createApps = () => {
  const electronWindows = ["http://localhost:3000/"];
  electronWindows.forEach(file => createWindow(file));
};
const registerShortcuts = () => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register("CommandOrControl+X", () => {
    console.log("CommandOrControl+X is pressed");
  });

  if (!ret) {
    console.log("registration failed");
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered("CommandOrControl+X"));
};
app.on("ready", () => {
  registerShortcuts();
  createApps();
});

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("CommandOrControl+X");

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

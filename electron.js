const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
  // Создаем окно браузера
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Загружаем приложение
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000" // В режиме разработки
      : `file://${path.join(__dirname, "../build/index.html")}` // В продакшене
  );

  // Открываем DevTools в режиме разработки
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// Этот метод будет вызван когда Electron закончит инициализацию
app.whenReady().then(createWindow);

// Выйти когда все окна закрыты
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

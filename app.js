const fs = require("fs/promises");

(async () => {
  // Command constants
  const COMMANDS = {
    CREATE_FILE: "create a file",
    DELETE_FILE: "delete the file",
    RENAME_FILE: "rename the file",
    ADD_TO_FILE: "add to the file",
  };

  let addedContent;

  // Utility functions
  const validateFilePath = (path) => {
    if (!path || typeof path !== "string") {
      throw new Error("Invalid file path provided.");
    }
    return path.trim();
  };

  const readCommandFile = async (path) => {
    try {
      const data = await fs.readFile(path, "utf8");
      return data;
    } catch (err) {
      console.error("Error reading command file:", err);
    }
  };

  // File handling functions
  const createFile = async (path) => {
    let fileHandle;
    try {
      path = validateFilePath(path);
      fileHandle = await fs.open(path, "r");
      console.log(`The file ${path} already exists.`);
    } catch (e) {
      if (e.code === "ENOENT") {
        fileHandle = await fs.open(path, "w");
        console.log("A new file was successfully created.");
      } else {
        console.error("An error occurred:", e);
      }
    } finally {
      if (fileHandle) await fileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      path = validateFilePath(path);
      await fs.unlink(path);
      console.log("The file was successfully removed.");
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log("No file at this path to remove.");
      } else {
        console.log("An error occurred while removing the file: ");
        console.log(e);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      oldPath = validateFilePath(oldPath);
      newPath = validateFilePath(newPath);
      await fs.rename(oldPath, newPath);
      console.log("The file was successfully renamed.");
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(
          "No file at this path to rename, or the destination doesn't exist."
        );
      } else {
        console.log("An error occurred while renaming the file: ");
        console.log(e);
      }
    }
  };

  const addToFile = async (path, content) => {
    if (addedContent === content) return;
    try {
      path = validateFilePath(path);
      await fs.appendFile(path, content);
      addedContent = content;
      console.log("The content was added successfully.");
    } catch (e) {
      console.log("An error occurred while adding to the file: ");
      console.log(e);
    }
  };

  // Command execution
  const executeCommand = async (command) => {
    if (command.includes(COMMANDS.CREATE_FILE)) {
      const filePath = command.substring(COMMANDS.CREATE_FILE.length + 1);
      await createFile(filePath);
    }

    if (command.includes(COMMANDS.DELETE_FILE)) {
      const filePath = command.substring(COMMANDS.DELETE_FILE.length + 1);
      await deleteFile(filePath);
    }

    if (command.includes(COMMANDS.RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldFilePath = command.substring(COMMANDS.RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      await renameFile(oldFilePath, newFilePath);
    }

    if (command.includes(COMMANDS.ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(COMMANDS.ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      await addToFile(filePath, content);
    }
  };

  // Watcher with debouncing
  const commandFile = "./command.txt";
  const watcher = fs.watch(commandFile);
  let changeTimeout;

  for await (const event of watcher) {
    if (event.eventType === "change") {
      clearTimeout(changeTimeout);
      changeTimeout = setTimeout(async () => {
        const command = await readCommandFile(commandFile);
        await executeCommand(command);
      }, 100);  // Debounce time
    }
  }
})();

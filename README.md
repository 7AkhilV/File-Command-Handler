# File Command Handler

A simple Node.js project that listens to a `command.txt` file for changes and executes file operations based on the command provided in the file. The supported operations include creating, deleting, renaming, and adding content to a file.

## Features

- **Create a File**: Create a new file if it doesn't already exist.
- **Delete a File**: Remove a file from the filesystem.
- **Rename a File**: Rename a file to a new path.
- **Append to a File**: Add content to an existing file.

## Commands

To control the application, write commands in `command.txt`:

1. **Create a File**
   create a file <path>

![Screenshot 2024-10-28 185240](https://github.com/user-attachments/assets/b0f8fd32-d95b-46fe-b7cf-0eb524246e5e)


2. **Delete a File**
   delete the file <path>

![Screenshot 2024-10-28 185319](https://github.com/user-attachments/assets/cd04abe5-ab79-400a-9c1a-5b76b5f1be77)


3. **Rename a File**
   rename the file <old-path> to <new-path>

![Screenshot 2024-10-28 185459](https://github.com/user-attachments/assets/dc98d251-5620-4268-ba24-f7a23a93beab)


4. **Add to a File**
   add to the file <path> this content: <content>


![Screenshot 2024-10-28 185642](https://github.com/user-attachments/assets/1450cec3-90da-446f-aa96-1e7b366ec43e)
![Screenshot 2024-10-28 185852](https://github.com/user-attachments/assets/71e52cfd-c249-43b6-a8b3-20444936aca4)
![Screenshot 2024-10-28 185903](https://github.com/user-attachments/assets/484de05f-d297-4262-b898-b661b7bd9dab)
![Screenshot 2024-10-28 185916](https://github.com/user-attachments/assets/a13f9e80-fa8e-4ece-b283-4a0f533b77af)
![Screenshot 2024-10-28 185925](https://github.com/user-attachments/assets/6d27040b-8858-42d4-a6b6-21868c7bae46)

## Usage

- Write commands in the `command.txt` file as specified in the [Commands](#commands) section.
- The application will listen for changes in the file and automatically execute the corresponding file operations.

## Technologies

- **Node.js**
- **fs/promises**: For performing asynchronous file operations.


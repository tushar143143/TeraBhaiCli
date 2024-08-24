import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

program.version('1.0.0');

// Custom command to list files in a directory 
program
  .command('Bhai-Files-Dikha <dir>')
  .description('List all files in the directory')
  .action((dir) => {
    const files = fs.readdirSync(dir);
    console.log(chalk.green(`Files in  ${dir}:`));
    files.forEach(file => console.log(file));
  });

// Custom command to read a file 
program
  .command('Bhai-File-Ke-Ander-Kya-He <file>')
  .description('Read and display the content of a file')
  .action((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    console.log(chalk.blue(`Content of ${file}:`));
    console.log(content);
  });

// Custom command to delete a file 
program
  .command('Bhai-File-Delete-Kar <file>')
  .description('Delete a file')
  .action((file) => {
    fs.removeSync(file);
    console.log(chalk.red(`${file} Delete ho gae he`));
  });

// Custom command to create a new file 
program
  .command('Bhai-New-File-Bana <file>')
  .description('Create a new file with some content')
  .action((file) => {
    console.log(chalk.yellow(`File ${file} ban gae he `));
  });

// Custom command to copy a file 
program
  .command('Bhai-File-Copy-Kar <src> <dest>')
  .description('Clone a file from source to destination')
  .action((src, dest) => {
    fs.copySync(src, dest);
    console.log(chalk.cyan(`Bhai  ${src} se leke ${dest} Copy kar di !`));
  });

// Custom command to move a file 
program
  .command('Bhai-File-Teleport-Kar <src> <dest>')
  .description('Move a file from source to destination')
  .action((src, dest) => {
    fs.moveSync(src, dest);
    console.log(chalk.magenta(`bhai ${src} se leke ${dest} Teleport kar di !`));
  });

// Custom command to create a directory 
program
  .command('Bhai-Folder-Bana <dir>')
  .description('Create a new directory')
  .action((dir) => {
    fs.mkdirSync(dir);
    console.log(chalk.greenBright(` ${dir} Folder bna diya he !`));
  });

// Custom command to delete a directory 
program
  .command('Bhai-Folder-Delete-Kar <dir>')
  .description('Delete a directory')
  .action((dir) => {
    fs.removeSync(dir);
    console.log(chalk.redBright(`${dir} Folder Delete kar diya he !`));
  });

// Custom command to rename a file 
program
  .command('Bhai-File-Rebrand-Kar <oldName> <newName>')
  .description('Rename a file')
  .action((oldName, newName) => {
    fs.renameSync(oldName, newName);
    console.log(chalk.blueBright(`${oldName} ko rebranded kar diya he  ${newName}!`));
  });

// Custom command to check if a file exists 
program
  .command('Bhai-File-Dhund-Ke-Aa <file>')
  .description('Check if a file exists')
  .action((file) => {
    const exists = fs.existsSync(file);
    console.log(exists ? chalk.green(`Bhai ${file} udhar hi he`) : chalk.red(`Bhai ${file} udhar nahi he!`));
  });

// Custom command to list directory structure 
program
  .command('Bhai-Folder-Kesa-He-Anderse <dir>')
  .description('Recursively list directory structure')
  .action((dir) => {
    const explore = (dirPath, indent = '') => {
      const items = fs.readdirSync(dirPath);
      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const isDir = fs.lstatSync(fullPath).isDirectory();
        console.log(indent + (isDir ? chalk.blueBright(`[${item}]`) : chalk.yellow(item)));
        if (isDir) {
          explore(fullPath, indent + '  ');
        }
      });
    };
    explore(dir);
  });

// Parse the commands
program.parse(process.argv);

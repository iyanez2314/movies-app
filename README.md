# Movies-App

This is a cool movies website that will allow you to look up any movie of your liking and add it to the database of all movies.
One big challenge I faced with this project was coding in an OOP paradigm the process of doing that really showed me the power of classes and how we can use them to do some really cool stuff manipulating the DOM. For the future of this project I would enjoy messing with the design as well as maybe allowing users to create accounts and edit any movies they have contributed.

# To get this project to run locally you can follow the following steps with either cloning or forking:

## Once you have already cloned this project to your locaal machine open up your terminal making sure we are in the project directory and paste the following command into the terminal:

```javascript I'm A tab
    npm init -y
```

## Once that has finished you can now paste this command

```javascript I'm A tab
    npm install
```

### This should download the dependencies and that would be JSON-server. Once that has finished installing you can now add the following script to your package.json file:

```javascript I'm A tab
     "scripts": {
         "db": "json-server --watch db.json",
     }
```

## Before you start the project you will need to run the following command in your terminal:

```javascript I'm A tab
    npm run db
```

### This command will start your JSON server. Once it has started you can now launch the project locally and get to coding.

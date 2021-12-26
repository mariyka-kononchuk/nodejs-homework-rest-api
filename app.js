const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const {v4} = require('uuid')

dotenv.config();

const usersRouter = require('./routes/api/users');
const currentUsersRouter = require('./routes/api/currentUsers');
const contactsRouter = require('./routes/api/contacts');
const req = require('express/lib/request');
const { v3 } = require('uuid');
const { users } = require('./controllers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const tempDir = path.join(__dirname, 'temp');
const avatarsDir = path.join(__dirname, 'public', 'avatars');


const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048
  }
});

//middleware
const upload = multer({
  storage:multerConfig
})

// app.post('/api/contacts', upload.single('image'), async (req, res) => {
//   fs.rename('D:\\Monoblock\\Documents\\GitHub\\nodejs-homework-rest-api\\temp\\116901821_2616531128606852_5267230444420775207_n.jpg',
//     'D:\\Monoblock\\Documents\\GitHub\\nodejs-homework-rest-api\\public\\avatars\\116901821_2616531128606852_5267230444420775207_n.jpg',
// )
// })

app.post('/api/users', upload.single('image'), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
    try { 
      await fs.rename(tempUpload, resultUpload);
      const image = path.join('avatars', originalname)
    const newUser = {
    name: req.body.name,
    id: v3(),
    image
      }
      users.push(newUser);
      res.status(201).json(newUser);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
})

app.get('/api/users', async (req, res) => {
  res.json(users);
})


app.use('/api/users', usersRouter);
app.use('/api/users', currentUsersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message: err.message })
});

module.exports = app;

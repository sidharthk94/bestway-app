
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(bodyParser.json());

let meetings = [];

function generateMeetingLink(title) {
  return `http://${title}.com/meeting/${uuidv4()}`;
}

app.post('/api/meetings', (req, res) => {
  const { title, startTime, endTime } = req.body; 
  const meetingLink = generateMeetingLink(title); 

  const newMeeting = {
    id: uuidv4(),
    title,
    startTime,
    endTime,
    link: meetingLink
  };

  meetings.push(newMeeting);
  res.json(newMeeting);
});

app.get('/api/meetings', (req, res) => {
  res.json(meetings);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [flag, setFlag] = useState(true);

  const handleSubmit = async (e) => {
    setFlag(!flag);
    e.preventDefault();
    console.log(title, startTime, endTime, "yyyyyyyyyyyy");
    try {
      const response = await axios.post("http://localhost:5000/api/meetings", {
        title,
        startTime,
        endTime,
      });
      setMeetings([...meetings, response.data]);
      setTitle("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [flag]);

  const fetchMeetings = async () => {
    try {
      console.log("isideee");
      const response = await axios.get("http://localhost:5000/api/meetings");
      setMeetings(response.data);
    } catch (error) {
      console.log("isideeelllllll");
      console.error("Error fetching meetings:", error);
    }
  };

  function timeConvertion (time) {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return (
    <div className="main">
      <h1>Meeting Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <div className="formInputs">
          <div className="labels">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="inputs"
            />
          </div>
          <div className="labels">
            <label>Start Time</label>
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="inputs"
            />
          </div>
          <div className="labels">
            <label>End Time</label>
            <input
              type="datetime-local"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="inputs"
            />
          </div>
        </div>
        <div>
          <button type="submit" className="submitButton">
            Schedule Meeting
          </button>
        </div>
      </form>

      {meetings.map((meeting) => (
        <div className="meeting-details">
          <div key={meeting.id}>
            <div><span className="details-title">Title :</span> {meeting.title}</div>
            <div><span className="details-title">Start Time :</span> {timeConvertion(meeting.startTime)}</div>
            <div><span className="details-title">End Time :</span> {timeConvertion(meeting.endTime)}</div>
            <div>
            <span className="details-title">Link :</span>
              <a href={meeting.link} target="_blank" >
                {meeting.link}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

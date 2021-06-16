import "./feedback.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

// import start icon
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const styles = {
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default function Feedback() {
  const [feedback, setfeedback] = useState([]);
  const stars = Array(5).fill(0);

  const getData = async () => {
    try {
      const response = await axios.get("/getfeedback");
      setfeedback(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, [feedback]);
  console.log(feedback);

  return (
    <div className="feedback-admin">
      <h1>Feedbacks</h1>
      <div className="feedback-Container">
        {feedback.map((feed, index) => {
          return (
            <div className="feedBack-Form">
              <div className="feedBack-control">
                <span>Phone:</span>
                <div className="phone">0{feed.number}</div>
              </div>
              <div className="feedBack-control">
                <span>Quality:</span>
                <div className="stars">
                    {/* This is the div that generate Stars */}
                    <div style={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                        <FaStar
                            key={index}
                            size={20}
                            color={
                            (feed.quality) > index
                                ? colors.orange
                                : colors.grey
                            }
                            style={{
                            marginRight: 3,
                            marginTop:7,
                            cursor: "pointer",
                            }}
                        />
                        );
                    })}
                    </div>
                </div>
              </div>
              <div className="feedBack-control">
                <span>Taste:</span>
                <div className="stars">
                  {/* This is the div that generate Stars */}
                  <div style={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                        <FaStar
                            key={index}
                            size={20}
                            color={
                            (feed.service) > index
                                ? colors.orange
                                : colors.grey
                            }
                            style={{
                            marginRight: 3,
                            marginTop:7,
                            cursor: "pointer",
                            }}
                        />
                        );
                    })}
                    </div>
                </div>
              </div>
              <div className="feedBack-control">
                <span>Comments:</span>
                <div className="comments">{feed.comments}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

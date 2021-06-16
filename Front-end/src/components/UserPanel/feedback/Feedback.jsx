import "./feedback.css";
import React, { useContext, useState } from "react";
import feedbackContext from "../../Context/feedbackContext";
import axios from "axios";

// import start icon
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  
const styles = {
  stars: {
    display: "flex",
    flexDirection: "row",
  }
};


const ShowFeedback = () => {
  const [number, setNumber] = useState()
  let classNames = ["feedback"];

  // code for quality stars
  const [quality, setCurrentQualityValue] = useState(0);
  const [qualityhoverValue, setHoverQualityValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleQualityClick = (value) => {
    setCurrentQualityValue(value);
  };

  const handleQualityMouseOver = (newHoverValue) => {
    setHoverQualityValue(newHoverValue);
  };

  const handleQualityMouseLeave = () => {
    setHoverQualityValue(undefined);
  };
  // End of Quality Star

  // Start of Service Start
  const [service, setCurrentServiceValue] = useState(0);
  const [servicehoverValue, setHoverServiceValue] = useState(undefined);

  const handleServiceClick = (value) => {
    setCurrentServiceValue(value);
  };

  const handleServiceMouseOver = (newHoverValue) => {
    setHoverServiceValue(newHoverValue);
  };

  const handleServiceMouseLeave = () => {
    setHoverServiceValue(undefined);
  }; 
  // End of Service Start

  const [comments, setComments] = useState("");

  const checkFeedback = useContext(feedbackContext);

  // show and hide cart
  if (checkFeedback[0].checkFeed === true) {
    classNames.push("showFeedback");
  } else {
    classNames.push("hideFeedback");
  }

  const hideFeedback = () => {
    checkFeedback[1]({ checkFeed: false });
    // console.log(qty,service,comments)
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    console.log("hello");
    axios
      .post("http://localhost:8080/addfeedback", {
        quality,
        service,
        number,
        comments,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("thanks for your feedback");
        console.log("registration sucess");
        hideFeedback();
        setComments("");
        setNumber("");
        setCurrentQualityValue(0);
        setCurrentServiceValue(0);
      })
      .catch((err) => {
        console.log(err.response);
        toast.info(err.response.data.error);
        console.log("invalid registration");
      });
  };

  return (
    <div className={classNames.join(" ")}>
      <div className="headercontainer">
        <div className="feedhead">
          <span>Feedback</span>
        </div>
        <div className="closeContainer" onClick={hideFeedback}>
          <img src="/delete.ico" alt="close" />
        </div>
      </div>

      <div className="feedBackForm">
        <form onSubmit={submitFeedback}>
          <div className="form-control">
            <span>Quality</span>
            {/* This is the div that generate Stars */}
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleQualityClick(index + 1)}
                    onMouseOver={() => handleQualityMouseOver(index + 1)}
                    onMouseLeave={handleQualityMouseLeave}
                    color={
                      (qualityhoverValue || quality) > index
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <span>Service</span>
            {/* This is the div that generate Stars */}
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleServiceClick(index + 1)}
                    onMouseOver={() => handleServiceMouseOver(index + 1)}
                    onMouseLeave={handleServiceMouseLeave}
                    color={
                      (servicehoverValue || service) > index
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <span style={{ width: "20%" }}>Number</span>
            <input
            placeholder="Enter your Number"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              type="number"
              length="11"
              style={{
                width: "40%",
                padding: "10px",
                border: "1px solid gray",
                fontSize: "1rem",
                margin: "10px",
              }}
            />
          </div>
          <div className="form-control">
            <span style={{ width: "100%" }}>Comments</span>
            <textarea
              onChange={(e) => setComments(e.target.value)}
              value={comments}
              cols="50"
              rows="5"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid gray",
                fontSize: "1rem",
                margin: "10px",
              }}
            ></textarea>
          </div>
          <div className="form-control" style={{ justifyContent: "flex-end" }}>
            <button className="submit" type="submit">
              <i className="fas fa-paper-plane" aria-hidden="true"></i> Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowFeedback;

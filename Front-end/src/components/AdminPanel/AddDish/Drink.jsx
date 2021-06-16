import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

const Drink = () => {
  const [drink, setDrink] = useState({
    drinkName: '', priceForRegular: null, priceForHalf: null, priceForLiter: null
  })
  const [fileName, setFilename] = useState('');
  const [secureUrl, setSecureUrl] = useState('');


  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let files = e.target.files
    // console.log(files);


    if (files) {
      setFilename(files[0])
    // const data = new FormData();

    //   data.append("file", fileName);
    //   data.append("upload_preset", "x4bnkskk");
    //   data.append("cloud_name", "sheikhumar");
    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/sheikhumar/image/upload`,
    //     {
    //       method: "POST",
    //       body: data
    //     }
    //   );
    //   const img = await res.json();
    //   console.log(img);
    //   let ImageLink = img.url
    //   setSecureUrl(ImageLink);
    }
    setDrink({ ...drink, [name]: value })

  }

  console.log(fileName);


  const addDrink = async (e) => {
    e.preventDefault();

    
    const data = new FormData();

    data.append("file", fileName);
    data.append("upload_preset", "x4bnkskk");
    data.append("cloud_name", "sheikhumar");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/sheikhumar/image/upload`,
      {
        method: "POST",
        body: data
      }
    );
    const img = await res.json();
    console.log(img);
    let ImageLink = img.url
    setSecureUrl(ImageLink);

    // console.log(secureUrl);

    console.log(drink);
    

    const { drinkName, priceForRegular, priceForHalf, priceForLiter } = drink;



    if(secureUrl){

      axios
        .post('http://localhost:8080/adddrink', {
          drinkName, priceForRegular, priceForHalf, priceForLiter, secureUrl
        })
        .then((res) => {
          console.log(res.data);
          toast.success("registration Success");
        
          console.log("registration sucess");
          setFilename("")
          setSecureUrl("");
          setDrink({
            drinkName: '', priceForRegular: null, priceForHalf: null, priceForLiter: null
          })
  
        })
        .catch((err) => {
          console.log(err.response);
          //  toast.error("invalid registration");
          // console.log("invalid registration");
  
  
        });

    }



  }




  return (
    <form method='POST' onSubmit={addDrink} className="formBody drinks" enctype="multipart/form-data">

      <div className="inputContianer">
        <div className="form-control" style={{ width: "100%" }}>
          <input id="name" type="text" required name="drinkName" onChange={handleInput} />
          <label htmlFor="name">Name</label>
        </div>
      </div>

      <div className="inputContianer">
        <div className="form-control">
          <input id="small" type="number" style={{ textAlign: 'center' }} name="priceForRegular" required onChange={handleInput} />
          <label htmlFor="small" style={{ textAlign: 'center' }}>Regular Price</label>
        </div>
        <div className="form-control">
          <input id="medium" style={{ textAlign: 'center' }} type="number" name="priceForHalf" required onChange={handleInput} />
          <label htmlFor="medium" style={{ textAlign: 'center' }}>Half Price</label>
        </div>
        <div className="form-control">
          <input id="large" style={{ textAlign: 'center' }} type="number" name="priceForLiter" required onChange={handleInput} />
          <label htmlFor="large" style={{ textAlign: 'center' }}>Liter Price</label>
        </div>
      </div>
      <div className="inputContianer">
        <div className="form-control">
          <input id="pic" type="file" filename="avatar" required onChange={handleInput} />
          <label htmlFor="pic" style={{ textAlign: 'center' }}></label>
        </div>
      </div>

      <div className="form-control" style={{ textAlign: 'center' }}>
        <button className="learn-more" type='submit'>
          <span className="circle">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Add Dish</span>
        </button>
      </div>

    </form>
  );
};

export default Drink;

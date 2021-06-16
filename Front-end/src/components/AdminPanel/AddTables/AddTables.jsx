import React, { useState } from 'react';
import axios from "axios"
import "./AddTables.css";
import { toast } from 'react-toastify';

const AddTables = () => {

    const [table, setTable] = useState({
        username: '', password: '', cpassword: ""
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTable({ ...table, [name]: value })
    }


    const addTable = async (e) => {

        e.preventDefault();

        const { username, password, cpassword } = table;
        console.log(username, password, cpassword);





        axios
            .post('http://localhost:8080/addtable',
                {
                    username, password, cpassword
                })
            .then((res) => {
                
                console.log(res.data);
                toast.success(res.data.message);
                console.log("registration sucess");

            })
            .catch((err) => {
               


                console.log(err.response);

                toast.error(err.response.data.error);
                console.log("invalid registration");


            });



    }



    return (
        <div className="AddTable_box">
            <form className="AddTable_form" onSubmit={addTable} enctype="multipart/form-data">
                <h1>Add New Table</h1>
                <div className="form-control">
                    <input id="name" type="text" required value={table.username} name="username" onChange={handleInput} />
                    <label htmlFor="name">Table No  </label>
                </div>
                <div className="form-control">
                    <input id="pass" type="password" required value={table.password} name="password" onChange={handleInput} />
                    <label htmlFor="pass">Password</label>
                </div>
                <div className="form-control">
                    <input id="adminCode" type="password" required value={table.cpassword} name="cpassword" onChange={handleInput} />
                    <label htmlFor="pass">Confirm Password </label>
                </div>
                <div className="form-control" style={{ textAlign: 'center' }}>
                    <button className="learn-more" type='submit'>
                        <span className="circle">
                            <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Add Table</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTables

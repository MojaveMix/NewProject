import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Comments() {

    const history = useNavigate();
    const { id } = useParams();

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const rndInt = randomIntFromInterval(1, 4);


    const [inputData, setInputData] = useState({
        Text: '',
        RefArticle: parseInt(id),
        userid: rndInt
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/Comments/", inputData).then(res => {
            alert("Your Comment posted successfully")
            history("/")
        }
        )
    }

    return (


        <div className='container mt-5 col-6'>

            <div>
                <form onSubmit={handleSubmit} >
                    <br />
                    <br />

                    <div className="col" >
                        <h4 style={{
                            position: "relative",
                            top: "130px",
                            left: "210px"
                        }}
                        >Add comments:</h4>
                        <hr style={{
                            position: "relative",
                            top: "130px",
                            left: "210px"
                        }} />

                        <textarea name="commentaire" className='form-control '
                            style={{
                                position: "relative",
                                top: "130px",
                                left: "210px"
                            }}
                            onChange={e => setInputData({ ...inputData, Text: e.target.value })}
                            id="comments" cols="30" rows="5"
                        >
                        </textarea>
                        </div>
                            <div style={{
                                position: "relative",
                                top: "150px",
                                left: "210px"
                            }}>
                        <button className='btn btn-primary col-3'  >Add</button>
                    </div>
                    <br />
                </form>

            </div>

        </div>
    )
}

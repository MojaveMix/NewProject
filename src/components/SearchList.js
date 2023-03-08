import React, { useEffect, useState } from 'react'
import Article from '../Article';
import 'bootstrap/dist/css/bootstrap.min.css'
import { TreeItem, TreeView } from '@mui/lab';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Navbar from './Navbar';
import TreeList from './TreeList';




export default function SearchList() {
  // const filtered = datas.map(item =>  <Article key={item.id} datasi={item} />); 
  const [Article, setDataArticle] = useState([]);
  const fetchDataArticle = () => {
    axios.get('http://localhost:3000/Article')
      .then(res => {
        setDataArticle(res.data);
      }
      ).catch(err => console.log(err))
  }


  useEffect(() => {
    fetchDataArticle()
  }, [])
  return (

    <div>
      <Navbar />
      <TreeList />

      <div className='container col-md-3 float-start mt-5 favorita'>
        <br />
        <h3 className='col-md-8' style={{ fontSize: "22px", position: "relative", left: "10px" }}>Mes favorites</h3>

        <br />

        <div className="container  card">

          {Article && Array.isArray(Article) && Article.map(item => (

            <div className="card-body p-1">
              {item.favortite == 1 ?
                <div>
                  <h4 className="card-title">
                    <Link to={`/${item.id}`} style={{ textDecoration: "none" }}>
                      <button className='btn btn-link'>
                        <FontAwesomeIcon icon={faHeart} id='col' color={item.favortite == 0 ? "gray" : "red"}></FontAwesomeIcon>
                      </button>
                      {item.Name}
                    </Link>
                  </h4>
                  <hr />
                </div>

                : ""}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

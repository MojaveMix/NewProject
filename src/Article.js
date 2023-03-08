import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './components/Navbar';
import Listinig from './components/Listinig';
import SearchList from './components/SearchList';
import Highlighter from "react-highlight-words";
import TreeList from './components/TreeList';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import Comments from './components/Comments';





export default function Article() {
    const { id } = useParams();
    const [Article, setDataArticle] = useState([]);
    const [search, setData] = useState([]);

    const history = useNavigate();

    const [active, setActive] = useState([]);



    const [user, setUser] = useState([]);
    const [commentaire, setComments] = useState([]);

    //   library.add(   )
    const fetchDataArticle = () => {
        axios.get('http://localhost:3000/Article')
            .then(res => {
                setDataArticle(res.data);
            }
            ).catch(err => console.log(err))
    }


    const fetchDataUser = () => {
        axios.get('http://localhost:3000/users')
            .then(res => {
                setUser(res.data);
            }
            ).catch(err => console.log(err))
    }


    const fetchDataComment = () => {
        axios.get('http://localhost:3000/Comments')
            .then(res => {
                setComments(res.data);
            }
            ).catch(err => console.log(err))
    }



    let url = "http://localhost:3001/3";


    // const fetchData = async () => {
    //     await axios.get('http://localhost:3000/Article')
    //         .then(res => {
    //             setData(res.data);
    //         }

    //         ).catch(err => console.log(err))
    // }


    useEffect(() => {
        axios.get('http://localhost:3000/Article/' + id).
            then(res => setDataArticle(res.data)).
            catch(err => console.log(err))
        fetchDataArticle();
        fetchDataUser();
        fetchDataComment();
    }, [])

    let fg = 0;
    // Array.isArray(Article) &&  console.log(  Article.find(art => art.id == id))

    const handleSubmit = (e) => {
        e.preventDefault();
        const ell = Array.isArray(Article) && Article.find(art => art.id == id)
        setActive(ell.favortite == 0)
        console.log(ell)
        // setDataArticle({ favortite : 1 })
        axios.put("http://localhost:3000/Article/" + id, {
            id: ell.id,
            Name: ell.Name,
            Text: ell.Text,
            Image: "https://images.pexels.com/photos/4160068/pexels-photo-4160068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            Ref: ell.Ref,
            nbr: ell.nbr,
            favortite: ell.favortite == 0 ? 1 : 0
        }).then(res => {

            history("/")
        }
        )
    }




    return (
        <div>
          

            <Navbar />
            {/* <Listinig /> */}
            <TreeList />

 


            {/* <SearchList datas={search} /> */}
            <div className="container col-6">



                {
                    Article && Array.isArray(Article) &&
                    Article.filter(art => art.id == id).map((item, ind) => (
                        <div className='container' key={item.id}>

                            <div className='container card h-auto' id='Articales' style={{ userSelect: "none" }}>
                                <input className="form-control mt-3" style={{ width: "50%", position: "relative", left: "300px" }} id="seacg" type="text" placeholder="Search" onChange={e => setData(e.target.value)} aria-label="Search" />

                                <><div class="w3-row w3-padding-64 card-body h-auto" id="about">
                                    <div class="w3-col m6 w3-padding-large w3-hide-small">
                                        <form onSubmit={(e) => handleSubmit(e)} >
                                            {
                                                <button className='btn btn-link' type='submit' id='favourite' style={{ cursor: "pointer" }}>
                                                    <FontAwesomeIcon icon={faHeart} id='col' color={item.favortite == 0 ? "gray" : "red"}  ></FontAwesomeIcon>
                                                </button>
                                            }
                                        </form>
                                        {/* <img id='img-article' src="https://images.pexels.com/photos/4160068/pexels-photo-4160068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="w3-round w3-image w3-opacity-min" alt="Table Setting" width="260" /> */}
                                    </div>
                                    <div class="w3-col m6 w3-padding-large">
                                        <div>
                                            {
                                                search == "" ?

                                                    <><h1 class="w3-center">{item.Name}</h1><br /><p class="w3-large">{item.Text}</p></>
                                                    : <>
                                                        <h1 class="w3-center">{item.Name}</h1>
                                                        <Highlighter
                                                            highlightClassName="High"
                                                            searchWords={[search]}
                                                            autoEscape={true}
                                                            textToHighlight={
                                                                item.Text
                                                            } />
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <FacebookShareButton
                                        url={url}
                                        quote={item.Name}
                                        hashtag={`#${item.Name}`}
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                        url={url}
                                        quote={item.Name}
                                        hashtag={item.Name}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>

                                    <WhatsappShareButton
                                        url={url}
                                        quote={item.Name}
                                        hashtag={item.Name}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                </div>
                                    <hr />
                                </>
                                <br />
                                <>
                                </>
                            </div>
                        </div>
                    ))
                }
            </div>



            <div className="container card col-6" style={{ position: "relative", left: "204px", top: "540px" }} >
                <div className="card-body">
                    <h4 >Comments :</h4>

                </div>

                {commentaire.filter(comt => comt.RefArticle == id).map(comm => (
                    <div className="card-body">
                        {/* <p  >{ fg =  comm.userid  }</p> */}
                        <a href='#' ><FontAwesomeIcon icon={faUser} id='col' style={{ fontSize: "18px" }}  ></FontAwesomeIcon>
                            {user.filter(useArt => useArt.id == comm.userid).map(oneUser => (
                                oneUser.name
                            ))}
                        </a>
                        <p className='card-title mt-2'>{comm.Text}</p>
                    </div>
                ))}
            </div>



            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Comments />
            <br />
        </div>
    )
}

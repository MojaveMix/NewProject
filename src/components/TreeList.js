import React, { useEffect, useState } from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';



const getTreeItemsFromData = datas => {

    return datas.map(treeItemData => {
        let children = undefined;
        if (treeItemData.children && treeItemData.children.length > 0) {
            children = getTreeItemsFromData(treeItemData.children);
        }
        return (
            <Link to={`/${treeItemData.Ref}`}>
            <TreeItem
                key={treeItemData.id}
                nodeId={treeItemData.id}
                label={treeItemData.name}
                children={children}
            />
            </Link>



          
        );








    });
};



const DataTreeView = ({ treeItems }) => {
    return (
      <div className='container col-4' id='por'>
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {getTreeItemsFromData(treeItems)}
        </TreeView>
      </div>

    );
};


export default function TreeList() {

    const [data, setData] = useState([]);
    const [Article, setDataArticle] = useState([]);
    const [search2, setData2] = useState([]);

    const fetchData = async () => {
        await axios.get('http://localhost:3000/Parties')
            .then(res => {
                setData(res.data);
            }
            ).catch(err => console.log(err))
    }

    const fetchDataArticle = () => {
        axios.get('http://localhost:3000/Article')
            .then(res => {
                setDataArticle(res.data);
            }
            ).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
        fetchDataArticle()
    }, [])


    let fg = 0;
    let children = undefined;

    return (

        <div className='container p-0'  >
        <input className="form-control me-2" id="seacg" type="text" placeholder="Search" onChange={e => setData2(e.target.value)} aria-label="Search2" />

        <DataTreeView treeItems={data} />



        {
            data.filter(filtred => filtred.name == search2).map(itemsearch => (
                     console.log(itemsearch.children) 
             ))
        }
        </div>
    )
}

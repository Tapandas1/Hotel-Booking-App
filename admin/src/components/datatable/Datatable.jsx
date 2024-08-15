import React, { useState ,useEffect} from 'react'
import './datatable.css'
import { DataGrid  } from '@mui/x-data-grid';
import { Link ,useLocation} from 'react-router-dom';
import useFetch from '../../hooks/UseFetch'
import axios from'axios'
const Datatable = ({columns}) => {
  const location=useLocation();
  const path=location.pathname.split("/")[1]
  const[list,setList]=useState([])
  const{data}=useFetch(`/${path}`)
  useEffect(()=>{
    setList(data)
  },[data])
  const handleDelete=async(id)=>{
    try{
     await axios.delete(`/${path}/${id}`)
     setList(list.filter((item)=>item._id!==id))
    }catch(err){

    }
    
  }
    const actionColumn=[{field:"action",headerName:"Action",width:200 ,renderCell:(params)=>{
        return(
            <div className="cellAction">
              <Link to="/users/id" style={{textDecoration:"none"}}>
                <button className="viewButton">view</button>
                </Link>
                <button className="deleteButton" onClick={()=>handleDelete(params.row._id)}>Delete</button>
            </div>
        )
    }}]
  return (
     <>
     <div className="datatable">
        <div className="datatableTitle">
          {path}
          <Link to={`/${path}/new`} className='link'>
                Add New
                </Link>
        </div>
      <DataGrid className='text'
        rows={list}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(row)=>row._id}
      /> 
      </div>
    </>
  )
}

export default Datatable


import './App.css';
import axiox from "axios";
import {useState, useEffect} from "react";
import ReactPaginate from "react-paginate"

function App() {
  const [list, setList]=useState([])
  const [pageNumber, setPageNumber]=useState(0)
  const [selectValue,setSelectValue]=useState("")
  const [wishList, setWishList]=useState([])

  const moviePerPage=3;
  const movieVisited=pageNumber*moviePerPage;
  const movieCount=Math.ceil(list.length/moviePerPage)
  let category=new Set(list.map((d)=>d.category))
  category=[...category]


  useEffect(()=>{
    axiox({
      url:"https://fakestoreapi.com/products",
      method:"get"
    }).then((res)=>{
      console.log(res.data)
      setList(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const handleWish=(e)=>{
    // console.log(e.target.value.title)
    setWishList([...wishList,e.target.value])
  }

  const changeCount=({selected})=>{
    setPageNumber(selected)
  }
  
  const displayMovies=list.filter((d)=>{
    if(selectValue==="All" || selectValue===""){
      return d;
    }else{
      return d.category===selectValue;
    }
  }).slice(movieVisited, movieVisited+moviePerPage).map((k)=>{
    console.log(...wishList)
    return(
      <div className='parent'>
        <div className='cart' key={k.id}>
          <h3>{k.title}</h3>
          <h1>Price :{k.price} Rs.</h1>
          <img src={k.image} alt=""></img>
          <button className='wish' value={k} onClick={handleWish}>Add to wish list</button>
          <p>{k.description}</p>
        </div>
        </div>
      
    )
  })
  
  const showList=()=>{
    wishList.map((data,idx)=>{
    // console.log(wishList)
    return(
      <div className='parent'>
        <div className='cart' key={data.id}>
          <h3>{data.title}</h3>
          <h1>Price :{data.price} Rs.</h1>
          <img src={data.image} alt=""></img>
          <p>{data.description}</p>
        </div>
        </div>
    )
  })
  }
  return (
    <div className="App">
      <header className='header'>
        <h1>Movie App</h1>
        <button onClick={showList} className="wb">Favorites Items</button>
        <select name="category" value={selectValue} onChange={(e)=>{setSelectValue(e.target.value)}}>
          <option id="All" value="All">All</option>
          {category.map((data,idx)=>{
            return <option id={idx} value={data}>{data}</option>
          })}
        </select>
      </header>
      {displayMovies}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={movieCount}
        onPageChange={changeCount}
        containerClassName={"paginationbtns"}
        previousLinkClassName={"previousbtn"}
        nextLinkClassName={"nextbtn"}
        activeClassName={"paginationActive"}
        disabledClassName={"paginationDisabled"}
      />
      
    </div>
  );
}

export default App;

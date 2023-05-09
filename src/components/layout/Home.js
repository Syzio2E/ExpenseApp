import React,{useEffect, useState} from "react";
import "./home.css";
import ExpensesTab from "./ExpensesTab";

const Home = () => {
const [money,setMoney] = useState('')
const [description, setDescription] = useState('')
const [category, setCategory] = useState('')
const [expenses, setExpenses] = useState([]);

const loadData = async(req,res,next)=>{
  const token = localStorage.getItem('token')
  const data = await fetch('http://localhost:5000/home',{headers: { 'Authorization':token}}).then(response=>{
    response.data.expenses.forEach(expense=>{
      setExpenses(data)
    }).catch(err=>{
      console.log(err)
    })
  })
    // const result = await data.json()
}

useEffect(()=>{
  loadData()
},[])

const submitHandler=(e)=>{
  e.preventDefault()
  const expense = {
    money,
    description,
    category,
  }
  const token = localStorage.getItem('token')
  fetch('http://localhost:5000/home',{
    method: 'POST',
    body:JSON.stringify(expense),
    headers:{
      'Authorization':token,
      'Content-Type': 'application/json'
    }
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })

  setExpenses([...expenses,expense])
  setMoney('')
  setCategory('')
  setDescription('')
}

  return (
    <React.Fragment>
      <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="moneyspent">Money: </label>
        <input type="number" id="moneyspent" name="moneyspent" required value={money} onChange={(e)=>setMoney(e.target.value)}/>
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" required value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <div className="options" >
          <label htmlFor="category">Choose a Category</label> 
        <select id="category" name="category" required value={category} onChange={(e)=>setCategory(e.target.value)} style={{margin:'10px'}}>
          <option value="" disabled >Choose a value</option>
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Petrol">Petrol</option>
          <option value="Electricity">Electricity</option>
        </select>
        </div>
        <button type="submit" style={{margin: '10px',border:'none'}}>Add Expenses</button>
      </form>
    </div>
    <ul>
      <ExpensesTab data={expenses}/>
    </ul>
    </React.Fragment>
  );
};

export default Home;

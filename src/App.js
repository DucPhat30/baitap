import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const api = axios.create({
    baseURL: 'https://103.172.79.8:44433/api',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    const postCars = async (cars) => {
    const response = await api.post('/cars', cars);
    return response.data;
    };

    const getCars = async () => {
    const response = await api.get('/cars');
    return response.data;
    };

    const putCar = async (ID,updateData) =>{
    const response = await api.put('/cars/'+ID,updateData);
    return response.data;
    };

    const deleteCar = async (ID) =>{
    const response = await api.delete('/cars/'+ID);
    return response.data;
    };

    const [response, setResponse] = useState(null);
  const [a,seta] = useState('');
  const [apiData, setApiData] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  
  const handleSubmit = async (e) => {
    
    
      const result = await postCars(e);
      setResponse(result);
      const updatedData = await getCars();
      setApiData(updatedData);
      
    
  };

 
  useEffect(() => {
    fetchData();
    
  },[]);

  
    const fetchData = async () => {
      try {
        const data = await getCars();
        setApiData(data);
      } catch (err) {
      
       
        console.log(apiData);
      }
    };

   

 const Delete = async (id) =>{
    
 await deleteCar(id);
    
   
    fetchData();
  
 }

 

const Update = async(id,value) =>{
  
   
    await putCar(id,value);
    fetchData();
    setName('');
    setPrice('');
    setColor('');
    setBrand('');
    setModel('');
}

const fUpdate = async (e) => {
  await postCars (e);
  const updatedData = await getCars();
  setApiData(updatedData);
};

const AddSearch = (a,b,c,d,e) => {
  if(name !== ''){
    const result = apiData.filter(key => key.Name === a);
    setApiData(result);
   }
   if(price !== ''){
    const result = apiData.filter(key => key.Price - b === 0);
    setApiData(result);
   
   }
   if(color !== ''){
    const result = apiData.filter(key => key.Color === c);
    setApiData(result);
   }
   if(brand !== ''){
    const result = apiData.filter(key => key.Brand === d);
    setApiData(result);
   }
   if(model !== ''){
    const result = apiData.filter(key => key.Model === e);
    setApiData(result);
   }
  
  }
 function Set (e){
  
  seta(e);
  const tam = apiData.filter(item => item.ID === e);
  console.log(tam);
  console.log(apiData);
  const selectedItem = tam[0];
  
  setName(selectedItem.Name);
  setPrice(selectedItem.Price);
  setColor(selectedItem.Color);
  setBrand(selectedItem.Brand);
  setModel(selectedItem.Model);
  const update2 = {
    Name: name, 
    Price: price, 
    Color: color, 
    Brand: brand, 
    Model: model
  }
  return update2;
  
};
const update = {
  Name: name, 
  Price: price, 
  Color: color, 
  Brand: brand, 
  Model: model
}
const Set2 = () =>{
  console .log(Set);
}
  return (
    <div>
    <h1> </h1>
    <h2> </h2>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Color</th>
          <th>Brand</th>
          <th>Model</th>
          <th> </th>
          <button onClick={() => AddSearch(name,price,color,brand,model)}>Tìm</button>
          <button >Select</button>
        </tr>
      </thead>
      <tbody>
        {apiData.map(car => (
          <tr key={car.ID}>
            <td>{car.ID}</td>
            <td>{car.Name}</td>
            <td>{car.Price}</td>
            <td>{car.Color}</td>
            <td>{car.Brand}</td>
            <td>{car.Model}</td>
            <td><button onClick={() => Delete(car.ID)}>Delete</button></td>
            <td> <button  onClick={() =>Set(car.ID)}>Select</button></td>
           

          </tr>
         
        ))}
      </tbody>
    </table>
    <div>
    <h1> </h1>
    <form >
      <div>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Color:
          <input 
            type="text" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Brand:
          <input 
            type="text" 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Model:
          <input 
            type="text" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
          />
        </label>
      </div>
      
      <button onClick={() => handleSubmit(update)}>Thêm</button>
      <button onClick={() =>Update(a,update)}>Sửa</button>
      <button  onClick={() =>Set2()}>Select</button>
    </form>

    
  </div>
  </div>
  );
}

export default App;

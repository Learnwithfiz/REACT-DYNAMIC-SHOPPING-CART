import './Style.css'
import CartItem from './ObjectData'
import { useState } from 'react';
function Cart()
{
   // console.log(CartItem)
   const DataArr = Object.values(CartItem);
   const [cat,SetCat] = useState([]);

   function OnIncrement(response){
    SetCat((PrevData)=>[
        ...PrevData,
        {
            ItemPrice : response.price,
            ItemTitle  : response.title,
            ItemImage : response.img,
            ItemId : response.id
        }
    ])
   }

 function Decrement(response){
   const FindIndexItemRemove = cat.findIndex((item)=> item.ItemId===response.id);
    if( FindIndexItemRemove != -1)
    {
        SetCat((PrevObj)=>{
            const UpdateObj = [...PrevObj];
            UpdateObj.splice(UpdateObj,1);
            return UpdateObj
        })
    }
 }

 function OnDeleteRow(i){
    const deleteRowData = cat.filter((item,index)=> index !=i );
    SetCat(deleteRowData)

 }
   const TotalCalculateData = cat.reduce((TotalTaka,item)=>TotalTaka+item.ItemPrice,0)


    return (
        <>
        
          <h1 className="Heading">REACT JS SHOPPING CART</h1>

          <div className="left-div">
            {
              DataArr.map((response,i)=>{
                return (
                    <>
                     <div className="card">
                    <div className="card-img">
                       <img src={response.img} alt="" />
                    </div>
                    <div className="card-title">
                        <h3>{response.title}</h3>
                    </div>
                    <div className="card-price">
                        <h3>{response.price}</h3>
                    </div>
                    <div className="card-desc">
                        <p>{response.desc}</p>
                    </div>
                    <div className="button">
                        <button onClick={()=>OnIncrement(response)} className='IncrementBtn'>+</button>
                        <button className='Decrement' onClick={()=>Decrement(response)}>-</button>
                    </div>
                </div>
                    </>
                )
              })  
            }
            
          </div>
          <div className="right-div">
              <table>
                 <thead>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Action</th>
                 </thead>
                 <tbody>
                    {
                        cat.map((data,i)=>{
                            return (
                                <tr>
                                  <td>{i+1}</td>
                                  <td>{data.ItemTitle}</td>
                                  <td><img width={80} src={data.ItemImage} alt="" /></td>
                                  <td>{data.ItemPrice}</td>
                                  <td ><button  onClick={()=>OnDeleteRow(i)} className='Decrement'>Delete</button></td>
                                 
                                </tr>
                            )
                        })
                    }
                 </tbody>
                 <tfoot>
                    <tr>
                        <td align='center' colSpan={3}>Subtotal</td>
                        <td>{TotalCalculateData}</td>
                    </tr>
                    <tr>
                    <td align='center' colSpan={3}>Charge</td>
                        <td>{20}</td>
                    </tr>
                    <tr>
                    <td align='center' colSpan={3}>Total</td>
                        <td>{TotalCalculateData>0 ?TotalCalculateData +20 : 0   }</td>
                    </tr>
                 </tfoot>
              </table>
          </div>
        </>
    )
}
export default Cart;
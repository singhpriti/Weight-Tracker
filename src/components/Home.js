import React, { useState, useEffect } from 'react'
import firebase from 'firebase';
import { BsFillArchiveFill } from "react-icons/bs";
import { db } from '../Firebase';
import './Hom.css'
const Home = (props) => {

    const [weight, setWeight] = useState('');
    const [gainWeight, setGainWeight] = useState('');
    const [lossWeight, setLossWeight] = useState('');
    const [totalWeight, setTotalWeight] = useState('');
    const [date, setDate] = useState('')
    const [data, setData] = useState([])

    const { handleLogout } = props

    const handleAddition = (e) => {
        e.preventDefault()
        setTotalWeight(parseInt(weight) + parseInt(gainWeight) - parseInt(lossWeight))
        db.collection('Weight-Info').add({
            Weight: weight,
            gain: gainWeight,
            loss: lossWeight,
            date: date,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        console.log(data)
    }
    const handleDelete = (id) => {
        db.collection('Weight-Info').doc(id).delete();

    }


    useEffect(() => {
        db.collection('Weight-Info').orderBy("timeStamp", "desc").onSnapshot(snapShot => { setData(snapShot.docs.map(data => ({ Data: data.data(), id: data.id }))) })

    }, [])

    return (
        <>
            <section className="hero">
                <nav>
                    <h2>Welcome</h2>
                    <button onClick={() => handleLogout()} > Logout </button>
                </nav>
                <header>
                    <h1>Weight Tracker</h1>

                    <div className="total-weight">Current Weight: {totalWeight}Lb</div>
                </header>
                <form className="income-form">

                    <div className="form-inner">
                        <input type="number" name="desc" id="desc" placeholder="Initial Weight..." value={weight} onChange={(e) => { setWeight(e.target.value); console.log(weight) }} />
                        <input type="number" name="price" id="price" placeholder="Gain Weight..." value={gainWeight} onChange={(e) => setGainWeight(e.target.value)} />
                        <input type="number" name="desc" id="desc" placeholder="Loss weight..." value={lossWeight} onChange={(e) => setLossWeight(e.target.value)} />
                        <input type="date" name="date" id="date" placeholder="date..." value={date} onChange={(e) => setDate(e.target.value)} />
                        <button className="home_btn" onClick={(e) => handleAddition(e)}>Add In Status</button>
                    </div>

                </form>

                <div className="income-form">
                    <div className="form-inner" >
                        <table className="income-list ">
                            <thead>
                                <tr className="income-item">
                                    <th>Current Weight</th>
                                    <th>Gain weight</th>
                                    <th>loss Weight</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data.map((item, index) => {
                                    return (
                                        < tr key={index} className="income-item-2">
                                            <td>{item.Data.Weight}Lb</td>
                                            <td> {item.Data.gain}Lb</td>
                                            <td>{item.Data.loss}Lb</td>
                                            <td> {item.Data.date}</td>
                                            <td><button onClick={() => handleDelete(item.id)} ><BsFillArchiveFill /></button></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Home;

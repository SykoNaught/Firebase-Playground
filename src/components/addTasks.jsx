import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase'
import Header from './header'
      

const InputData = () => {
    
    const [tasks, setTasks] = useState([])
    const ref = firebase.firestore().collection("tasks")

    function getTasks() {
        ref.onSnapshot((querySnapShot) => {
            const items = []
            querySnapShot.forEach((doc) => {
                items.push(doc.data())
            })
            setTasks(items)
        }) 
    }
    
    useEffect(() => {
        getTasks()
    }, [])

    return (
        
        <div>
            <Header />
            <div class="flex-center">
                <div class="tasks-wrapper">
                    <h2>Tasks</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tasks.map((task, i) => (
                            <tr key={i}>
                                <td><input type="checkbox" id="task{i}" name="task{i}" value=""/></td>
                                <td>{task.task}</td>
                                <td>{task.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default InputData
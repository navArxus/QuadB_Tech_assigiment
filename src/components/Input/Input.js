import { useRef } from "react"
import React from 'react'
import { useDispatch } from "react-redux"
import { taskaction } from "../../store/store"
import styles from "./Input.module.css"
const Input = () => {

  const dispatch = useDispatch()


  // ref creation 
  const taskNameRef = useRef()
  const taskTypeRef = useRef()
  const searchRef = useRef()

  // Add task handler 
  const addTaskHandler = () => {
    if (taskNameRef.current.value === "" || taskTypeRef.current.value === "") {
      alert("Please fill all fields")
    } else {
      // get the values of input fields using .current property of refs
      dispatch(taskaction.addTask({ name: taskNameRef.current.value, type: taskTypeRef.current.value, isCompleted: false }))

      // clearing out the input field after adding a task
      taskNameRef.current.value = ""
      taskTypeRef.current.value = ""
    }
  }

  const searchHandler = () => {
    dispatch(taskaction.changeSearch(searchRef.current.value))
  }

  return (
    <div className={styles.Input} >
      <h2>To Do Application</h2>
      <div className={styles.InputBox}>

        {/* Input area  */}
        <input type="text" name="task" placeholder='Enter Task' ref={taskNameRef} />

        {/* Input category select */}
        <select name="taskcategory" id="" ref={taskTypeRef} >
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="dev">Dev</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className={styles.acctiongroup}>
        <button onClick={addTaskHandler} >Add Task</button>
        <select name="taskcategory" id="" onChange={searchHandler} ref={searchRef} >
          <option value="all">ALL</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="dev">Dev</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  )
}

export default Input

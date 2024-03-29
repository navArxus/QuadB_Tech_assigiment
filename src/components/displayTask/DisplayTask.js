import React from 'react'
import styles from "./DisplayTask.module.css"
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux"
import { taskaction } from '../../store/store';

const DisplayTask = () => {

    const dispatch = useDispatch()

    const data = useSelector(state => state.tasks.tasks)
    const searchValue = useSelector(state => state.tasks.currentSearch)
    
    // Extracting data which is not completed 
    let ongoingtask = data?.filter(ts => !ts.isCompleted) || [];
    // Extracting data which is completed 
    let completedtask = data?.filter(ts => ts.isCompleted) || [];

    // Searching and filter value other than all 
    if (searchValue !== 'all') {
        // findin g the sustiable task  based on search value
        ongoingtask = ongoingtask?.filter(ts => ts.type === searchValue)
        completedtask = completedtask?.filter(ts => ts.type === searchValue)
    }
    console.log(ongoingtask)
    console.log(completedtask)


    // dispatch id  to mark as completed
    const taskCompletedHandler = (id) => {
        dispatch(taskaction.completeTask({ id }))
    }
    // task deleting handler 
    const taskdeletehandler = (id) => {
        dispatch(taskaction.removeTask({ id }))
    }


    return (
        <div className={styles.DisplayTask} >
            <div className={styles.DisplayTaskon}>
                <div className={styles.headbar}>
                    <small>ONGOING TASK</small>
                    <div></div>
                </div>
                {
                    // Check that array is empty or not 
                    ongoingtask.length ? (
                        // iterate over the array  and create a list of components
                        ongoingtask.map(ts => {
                            return (

                                <div className={styles.task} key={ts.id}>
                                    <div className={styles.taskCont}>
                                        <input type="checkbox" onClick={taskCompletedHandler.bind(null, ts.id)} />
                                        <h4>{ts.name}</h4>
                                    </div>
                                    <div className={styles.taskCont}>
                                        <p>{ts.type}</p>
                                        <MdDelete size={'20px'} onClick={taskdeletehandler.bind(null, ts.id)} />
                                    </div>

                                </div>
                            )
                        })
                    ) : <p>No Tasks to Show!</p>
                }
            </div>
            <div className={styles.DisplayTaskon}>
                <div className={styles.headbar}>
                    <small>COMPLETED TASK</small>
                    <div></div>
                </div>
                {
                    completedtask.length ? (
                        completedtask.map(ts => {
                            return (

                                <div className={styles.task} key={ts.id}>
                                    <div className={styles.taskCont}>
                                        <input type="checkbox" defaultChecked />
                                        <h4>{ts.name}</h4>
                                    </div>
                                    <div className={styles.taskCont}>
                                        <p>{ts.type}</p>
                                        <MdDelete size={'20px'} onClick={taskdeletehandler.bind(null, ts.id)} />
                                    </div>

                                </div>
                            )
                        })
                    ) : <p>No Tasks to Show!</p>
                }
            </div>
        </div>
    )
}

export default DisplayTask

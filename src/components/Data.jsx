import axios from 'axios'

const getData = async () => {
    try {
        const response = await axios.get('https://hidden-castle-86710.herokuapp.com/tasks')
        return response.data
    } catch (err) {
        console.error(err)
    }
}

const addNewTask = async (task, newOrder) => {
    try {
        const response = await axios.post('https://hidden-castle-86710.herokuapp.com/tasks', {
            content: task,
            status: 'Active',
            order: newOrder
        })
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}

const batchDelete = async () => {
    try {
        const response = await axios.post('https://hidden-castle-86710.herokuapp.com/tasks/delete')
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}

const singleDelete = async (id) => {
    try {
        const response = await axios.delete(`https://hidden-castle-86710.herokuapp.com/tasks/${id}`)
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}

//change status of individual tasks//

const changeStatus = async (id) => {
    try {
        const response = await axios.put(`https://hidden-castle-86710.herokuapp.com/tasks/${id}`)
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}
const createNewOrderedArray = async (newSavedTasks) => {
    try {
        const response = await axios.post('https://hidden-castle-86710.herokuapp.com/tasks/new-order', {newSavedTasks})
        console.log(response)
    } catch (err) {
        console.error(err)
    }

}

export { getData, addNewTask, batchDelete, singleDelete, changeStatus, createNewOrderedArray }

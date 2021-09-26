import apiURL from '../constants/apiURL'
import axios from 'axios'

export function getStudentsAverage() {
        return axios.get(`${apiURL}/studentsAverage`)
}

export function postStudentsAverage(student) {
        console.log('student =>', student)
        return axios.post(`${apiURL}/studentsAverage`, student)
}
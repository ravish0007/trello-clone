// const axios = require('axios')
import axios from 'axios'

import { getJwtToken } from './tokenManager'

const BASE_URL = 'http://localhost:5000/api'

const tokenizedAxios = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${getJwtToken()}` }
})

class TrelloService {
  static async registerUser (user) {
    return await axios.post(`${BASE_URL}/auth/register`, user)
  }

  static async logoutUser () {
    return await axios.post(`${BASE_URL}/auth/logout`)
  }

  static async verifyUser (user) {
    try {
      const result = await axios.post(`${BASE_URL}/auth/login`, user)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  static async getLists (boardID) {
    try {
      const response = await tokenizedAxios.get(`${BASE_URL}/lists/${boardID}`)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  static async newList (list) {
    try {
      const response = await tokenizedAxios.post(`${BASE_URL}/lists`, list)
      return response.data[0].list_id
    } catch (error) {
      console.log(error)
    }
  }

  static updateList (list) {
    return tokenizedAxios.put(`${BASE_URL}/lists/${list.id}`, { name: list.name })
  }

  static deleteList (listID) {
    return tokenizedAxios.delete(`${BASE_URL}/lists/${listID}`)
  }

  static async getCards (listID) {
    try {
      const response = await tokenizedAxios.get(`${BASE_URL}/cards/${listID}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async newCard (listID, card) {
    try {
      card.listID = listID
      const response = await tokenizedAxios.post(`${BASE_URL}/cards`, card)
      return response.data[0].card_id
    } catch (error) {
      console.log(error)
    }
  }

  static updateCard (card) {
    return tokenizedAxios.put(`${BASE_URL}/cards/${card.id}`, { ...card })
  }

  static deleteCard (cardID) {
    return tokenizedAxios.delete(`${BASE_URL}/cards/${cardID}`)
  }

  static moveCard (listFromID, listDestinationID, cardFromID, cardDestinationID, sourceIndex, destinationIndex) {
    // console.log(listFromID, listDestinationID, cardFromID, cardDestinationID)
    return tokenizedAxios.patch(`${BASE_URL}/cards/`, { listFromID, listDestinationID, cardFromID, cardDestinationID, sourceIndex, destinationIndex })
  }
}

export default TrelloService

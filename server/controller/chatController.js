import Chat from '../model/ChatModel.js'
import { sendResponse } from '../utils/sendResponse.js'

export const createChatMessage = async (req, res, next, ChatModel) => {
  try {
    const message = await ChatModel.create(req.body)

    return res.status(200).json(message)
  } catch (error) {
    next(error)
  }
}

export const updateChatById = async (req, res, next) => {
  try {
    const data = await Chat.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const addMessageToChat = async (req, res, next) => {
  const { id } = req.params

  try {
    const { sender, content } = req.body

    const chat = await Chat.findOne({ _id: id })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    const newMessage = {
      sender: sender,
      content: content,
    }

    chat.messages.push(newMessage)

    await chat.save()

    return res.status(200).json(chat)
  } catch (error) {
    next(error)
  }
}

export const addChatParticipants = async (req, res, next) => {
  const { participantId, participantType } = req.body

  try {
    const chat = await Chat.findOne({ _id: req.params.id })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    const existingParticipantIds = chat.participants.map((participant) =>
      participant.participantId.toString()
    )

    if (!existingParticipantIds.includes(participantId)) {
      chat.participants.push({ participantId, participantType })
      await chat.save()
      return res.status(200).json({ message: 'Participant added successfully' })
    } else {
      return res
        .status(201)
        .json({ message: 'Participant already exists in the chat' })
    }
  } catch (error) {
    next(error)
  }
}

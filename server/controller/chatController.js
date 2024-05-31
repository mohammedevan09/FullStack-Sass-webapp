import Chat, { Message } from '../model/ChatModel.js'
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

    const newMessage = new Message({
      chat: chat._id,
      sender: { ...sender, senderId: req.user._id },
      content: content,
    })

    await newMessage.save()

    chat.messages.push(newMessage._id)

    await chat.save()

    return sendResponse(res, { message: 'Successful' })
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

export const removeChatParticipants = async (req, res, next) => {
  const { participantId } = req.body

  try {
    const chat = await Chat.findOne({ _id: req.params.id })

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' })
    }

    const participantIndex = chat.participants.findIndex(
      (participant) => participant.participantId.toString() === participantId
    )

    if (participantIndex !== -1) {
      chat.participants.splice(participantIndex, 1)
      await chat.save()
      return res
        .status(200)
        .json({ message: 'Participant removed successfully' })
    } else {
      return res
        .status(404)
        .json({ message: 'Participant not found in the chat' })
    }
  } catch (error) {
    next(error)
  }
}

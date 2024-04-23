import { throwError, sendSuccess } from "../utils/requestHandler.js";
import {
  addMessage,
  getMessage,
} from "../models/message.models.js";

const addUserMessages = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  try {
    const response = await addMessage(sender_id, receiver_id, message);
     res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserMessages = async(req,res) =>{
     const { sender_id, receiver_id } = req.body;

  try {
    const response = await getMessage(sender_id, receiver_id);
     res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export {addUserMessages,getUserMessages}
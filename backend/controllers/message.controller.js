import Conversation from './../Models/conversation.model.js';
import Message from './../Models/message.model.js';

export const sendMessage = async (req, res) => {

    console.log("message sent!", req.params.id);

    try {
        const {message}= req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        //create conversation if its the first time users have a conversation
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.message.push(newMessage._id);
        }

        //SOCKET IO FUNCTIONALITY HERE

        // this makes both calls run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("aerror in sendMessage controller: ", error.message);
       res.status(500).json({error: "Internal server error."}) 
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [ senderId, userToChatId]},
        }).populate("message"); // NOT reference to message but the actual messages

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.message;

        res.status(201).json(messages);
        
    } catch (error) {
        console.log("error in sendMessage controller: ", error.message);
       res.status(500).json({error: "Internal server error."}) 
    }
}
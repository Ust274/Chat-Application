import Message from "../models/message.model.js";
import Users from "../models/user.model.js";
import cloudinary from "../utils/cloud.js";
import { rSocketId,io } from "../utils/socket.js";

export const getUsers = async (req, res) => {
    try {
      const otherId = req.user._id;
      const filteredUsers = await Users.find({ _id: { $ne: otherId } })
        .select("-password");
  
      res.status(200).json(filteredUsers);
    } 
    catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const getMessages = async(req,res) => {
try {
    const { id : ChatToUserId} = req.params;
    const myId = req.user._id;
    const messages = await Message.find({ 
        $or: [{ senderId: myId, receiverId: ChatToUserId },
                { senderId: ChatToUserId, receiverId: myId }]
        })
    res.status(200).json(messages);
    
} catch (error) {
    res.status(500).json({error: "Server error"});
}
    
}

export const sendMessage = async(req,res) => {
    try {
        const {text, image} = req.body;
        const { id : receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
            if (image) {
              // Upload base64 image to cloudinary
              const uploadResponse = await cloudinary.uploader.upload(image);
              imageUrl = uploadResponse.secure_url;
            }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        
        await newMessage.save();
        const receiverSocketId = rSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(200).json(newMessage);
    } catch (error) {

       console.error("Error sending message:", error);
        res.status(433).json({error: "Server error"});
    }
}
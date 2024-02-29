export const sendMessage = async (req, res) => {
    console.log("message sent!", req.params.id);

    try {
        const {message}= req.body;
        const {id} = req.params;
    } catch (error) {
        console.log("aerror in sendMessage controller: ", error.message);
       res.status(500).json({error: "Internal server error."}) 
    }
};
import User from "../Models/user.model.js";


//Login,Signup,Log out controllers
export const login = (req, res) => {
   
}

export const logout = async (req, res) => {
    res.send("Logout User Route");
}

export const signup = async (req, res) => {
    try {
        //get values from req.body
        const {fullname, username,password,confirmPassword,gender} = req.body;

        if(password!== confirmPassword){
            return res.status(400).json({error: "Password don't match."})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"User already exists."})
        }

        //TODO: HASH PASSWORD HERE

        //profile pic placeholder site
        // https://avatar-placeholder.iran.liara.run/
        //Avatars With Initials From Names
        //https://avatar.iran.liara.run/username?username=[firstname+lastname]
        //avatar based on gender plus username
        //https://avatar.iran.liara.run/public/boy?username=Scott+Wilson
        //https://avatar.iran.liara.run/public/girl?username=jane+Wilson

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        
    } catch (error) {

    }
}
import User from "../Models/user.model.js";

//Login,Signup,Log out controllers
export const login = (req, res) => {
   
}

export const logout = async (req, res) => {
    res.send("Logout User Route");
}

export const signup = async (req, res) => {
    console.log(req.body);
    try {
        //get values from req.body
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword){
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

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        //create User based on inputs
        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error."});
    }
}
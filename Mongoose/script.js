const mongoose = require('mongoose');
const User = require("./models/User")

mongoose.connect("mongodb://localhost:27017/MONGOOSE");

(async function () {
    // const user = new User({name : "Akarshan" , age : 18});
    // await user.save();
    // console.log(user) ;

    try {
        // const user = await User.create({
        //     name : "Myself" ,
        //     age : 18,
        //     hobbies : ["Swimming" , "Coding"],  
        //     email : "test@gmail.com",  
        //     address : {
        //         street : "12 no",
        //         city : "Tarakeswar"
        //     }
        // });
        // user.save();

        // const user =await User.find({name : "Akarshan"});
        const user = await User.findOne({ name: "Myself"});
        user.email = "myself@gmail.com";

        // user[0].bestFriend = "69402b296514da6808619587";
        // user[0].save();
        
        console.log(user) ;
        await user.save();

        // user.sayHi();
        // console.log(user.namedEmail);

        console.log(user); 
    }
    catch (error) {
        console.log(error.message);
    }


    // await User.deleteMany({});
})();


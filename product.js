const mongoose=require("mongoose");
let dataSchema=new mongoose.Schema({
    'pname':{
        required:true,
        type:String

    },
    'pprice':{
        required:true,
        type:String

    },
    'pdesc':{
        required:true,
        type:String

    },
}
);
module.exports =mongoose.model("node_js",dataSchema)
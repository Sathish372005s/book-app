import Book from "../models/Book.js";
import cloudinary from "../utils/cloudnary.js";
import streamifier from "streamifier";


export const createbook =async(req,res)=>{
    try{
        const {bookname,caption,starrating,image}=req.body;
        console.log("received image", image?.slice(0,100) || "no image");
        if(!bookname || !caption || !starrating || !image){
            return res.status(400).json({message:"All fields are required"});
        }
        if(!image.startsWith("data:image/")){
            return res.status(400).json({message:"Image must be a data URI or URL"});
        }

        // convert base64 data to buffer and upload via stream to avoid file path detection
        const base64 = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64, "base64");

        const uploadresponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "image" },
                (err, result) => (err ? reject(err) : resolve(result))
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
        const imageurl=uploadresponse.secure_url;
       const book =new Book({
        bookname,
        caption,
        starrating:starrating,
        image:imageurl,
        user:req.user._id,
       })
       await book.save();
       console.log("book created successfully")
       res.status(201).json({message:"Book created successfully",book});
    }
    
    catch(error){
        console.log(error);
        res.status(500).json({message:"upload failed"});
    }
}

export const getbooks=async(req,res)=>{
    try {
        const page=req.query.page || 1;
        const limit=req.query.limit || 5;
        const skip=(page-1)*limit;
        const books=await Book.find().skip(skip).limit(limit).populate("user","username profile.avatar");
        const totalbooks=await Book.countDocuments();
        res.send({
            books,
            totalbooks,
            currentpage:page,
            totalpages:Math.ceil(totalbooks/limit)
        })
    } catch (error) {
        console.log("get books error",error.message);
        res.status(500).json({message:"get books error"})
    }
}

export const deletebook=async(req,res)=>{
    try {
        const book=await Book.findById(req.params.id);
        if(!book) return res.status(404).json({message:"book not found"});
        if(book.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"you are not authorized to delete this book"})
        }
        //delete associated image from cloudinary
        if(book.image && book.image.includes("cloudinary")){
            try {
                const publicid=book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicid);
            } catch (error) {
                console.log("cloudinary delete error",error.message) 
            }
        }
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"book deleted successfully"});
    } catch (error) {
        console.log("delete book error",error.message);
        res.status(500).json({message:"delete book error"})
    }
}
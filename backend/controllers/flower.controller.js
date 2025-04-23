import mongoose from "mongoose";

import Flower from "../models/flower.model.js";

export const getAllFlowers = async(req, res) => {

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({success: false, message: "Flower not found"});
    // }

    try{
        const flowers = await Flower.find({});
        if (flowers != null){
            res.status(200).json({success: true, data: flowers});
        }
        else{
            res.status(404).json({success: false, data: flowers});
        }
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getFlowerById = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid ID"});
    }
    else if (!Flower.findById(id)){
        return res.status(404).json({success: false, message: "Flower not found"});
    }

    try{
        const flower = await Flower.findById(id)
        if(flower != null){
            res.status(200).json({success : true, data: flower})
        }
        else{
            res.status(404).json({success: false, data: flower, message: "flower not found"})
        }
    } catch (error) {
        console.error("error");
        res.status(500).json({success: false, message: "Server error occurred"})
    }
}

export const addFlowerToDb = async (req, res) => {
    const flower = req.body;

    if (!flower.primary_name){
        return res.status(400).json({success: false, message: "Please provide the primary flower name."})
    }
    
    // should automatically set to username and flower num
    if (!flower.user_name || flower.flower_num){
        return res.status(400).json({success: false, message: "Username or flower num not provided."})
    }
    // should automatically set to false
    if (!flower.shop_viewable){
        return res.status(400).json({ success: false, message: "Shop_viewable toggle not provided." })
    }

    const newFlower = new Flower(flower);
    try {
        await newFlower.save();
        res.status(200).json({ success: true, data: newFlower });
    } catch (error) {
        console.error("Error in creating product: ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const removeFlowerById = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid ID"});
    }

    try {
        const flower = await Flower.findByIdAndDelete(id);
        if(flower != null){
            res.status(200).json({ success: true, message: "Flower deleted", data: flower});
        }
        else{
            res.status(404).json({success: false, message: "Flower not found"})
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const updateFlowerById = async (req, res) => {
    const {id} = req.params;

    const data = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid ID"});
    }

    try{
        const flower = await Flower.findByIdAndUpdate(id, data, {new: true});
        if (flower != null){
            res.status(200).json({success : true, message: "Flower updated", data: flower});
        }
        else{
            res.status(404).json({success: false, message: "Flower not found"})
        }
    } catch (error) {
        console.error("error");
        res.status(404).json({success: false, message: "Flower not found "});
    }
}
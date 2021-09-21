const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const WilderModel = require("../models/WilderModel.js");

module.exports = {
    get: asyncHandler(async (req, res) => {
        await WilderModel.init();
        const wilders = await WilderModel.find({});
        if (wilders) return res.status(200).json({ success: true, result: wilders });
        else{
            throw createError(404, "Cannot get the wilders");
        }
    }),

    create: asyncHandler(async (req, res) => {
        await WilderModel.init();
        const wilder = new WilderModel(req.body);
        const result = await wilder.save();
        if (result) return res.status(200).json({ success: true, result: result });
        else{
            throw createError(400, `Cannot create wilder : ${req.body}`);
        }
    }),

    update: asyncHandler(async (req, res) => {
        await WilderModel.init();
        const {id} = req.params;
        const wilder = await WilderModel.findOneAndUpdate({ _id: id }, req.body);
        if (wilder) return res.status(202).json({ success: true, result: result });
        else{
            throw createError(400, `Cannot update user : ${req.body}`);
        }
    }),

    delete: asyncHandler(async (req, res) => {
        await WilderModel.init();
        const {id} = req.params;
        const wilder = await WilderModel.findOneAndDelete({ _id: id });
        if (wilder) return res.status(200).json({ success: true, result: result });
        else{
            throw createError(400, `Cannot delete wilder : ${id}`);
        }
    }),
}
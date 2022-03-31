require("dotenv").config();

const sessionService = require('../session.service');
const permissionService = require('../permisson.service');
const labelService = require("./label.service");
const res = require("express/lib/response");

/*
    Label functions
*/

const getAllLabels = (req, res) => {
    labelService.getAllLabels((error, results) => {
        if (error || !results) {
            return res.status(200).json({
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            data: results
        });
    });
}

const getLabelById = async (req, res) => {
    const labelId = parseInt(req.params.id);

    labelService.getLabelById(labelId, (error, result) => {
        if (error || !result) {
            return res.status(200).json({
                success: false,
                message: "Database connection error occured."
            });
        } else if (result.length < 1) {
            return res.status(200).json({
                success: false,
                message: `No label found for id ${pid}`
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        })
    })
}

const createLabel = async(req, res) => {
    const body = req.body;
    
    const validSession = await sessionService.verify(body.token);
    const hasPermisson = permissionService.isAdmin(validSession);
    if (hasPermisson) {
        labelService.createLabel(body, (error, result) => {
            if (error || !result) {
                return res.status(200).json({
                    success: false
                });
            }
            return res.status(200).json({
                success: true
            });
        });
    }
}

const deleteLabel = async(req, res) => {
    const labelId = parseInt(req.params.id);
    const body = req.body;
    
    const validSession = await sessionService.verify(body.token);
    const hasPermisson = permissionService.isAdmin(validSession);
    if (hasPermisson) {
        labelService.deleteLabel(labelId, (error, result) => {
            console.log(result);
            if (error || !result) {
                return res.status(200).json({
                    success: false
                });
            }
            return res.status(200).json({
                success: true
            });
        });
    }
}

module.exports = { getAllLabels, getLabelById, createLabel, deleteLabel }
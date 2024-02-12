
const express = require("express");
const httpModule = require("http");
let app = express();
let http = httpModule.createServer(app);
let log4js = require("log4js");

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let todayDate = new Date();
let fileName = todayDate.getDate() + monthNames[todayDate.getMonth()] + todayDate.getFullYear() + ".txt";

log4js.configure({
    appenders: { flieType: { type: "file", filename: `logs/${fileName}`, compress: true } },
    categories: { default: { appenders: ["flieType"], level: "info", enableCallStack: true } },
});

let logger = log4js.getLogger();
require("./dbConnection")()
    .then(config => {

        config.logger = logger;

        const getAllLocationData = require("./locationModule/getAllLocationData"),
            getDataByLocationId = require("./locationModule/getDataByLocationId"),
            getDataByDepartment = require("./locationModule/getDataByDepartment"),
            getDataByCategory = require("./locationModule/getDataByCategory"),
            getDataBySubCategory = require("./locationModule/getDataBySubCategory"),
            getDataByAllParams = require("./locationModule/v2/getDataByAllParams"),
            getSkuData = require("./sku/getSkuData"),
            getSkuData_v2 = require("./sku/v2/getSkuData");

        const Joi = require('joi');

        app.get("/api/v1/location", function (req, res) {
            try {
                //callback implementation
                getAllLocationData(config, {}, function (err, response) {
                    if (err) {
                        res.statusCode = 500;
                        return res.json(err);
                    }
                    res.json(response)
                })
            }
            catch (ex) {
                console.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                //Send status code to inform client application with Internal Server Error
                res.statusCode = 500;
                res.json({ error: ex })
            }
        });
        app.get("/api/v1/location/:location_id/department", async function (req, res) {
            try {
                //Async/Await with promise implementation
                let response = await getDataByLocationId(config, { location: req.params.location_id });
                res.json(response);
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });
        app.get("/api/v1/location/:location_id/department/:department_id/category", async function (req, res) {
            try {
                let response = await getDataByDepartment(config, { location: req.params.location_id, department: req.params.department_id });
                res.json(response);
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });
        app.get("/api/v1/location/:location_id/department/:department_id/category/:category_id/subcategory", async function (req, res) {
            try {

                let response = await getDataByCategory(config, { location: req.params.location_id, department: req.params.department_id, category: req.params.category_id });
                res.json(response);
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });
        app.get("/api/v1/location/:location_id/department/:department_id/category/:category_id/subcategory/:subcategory_id", async function (req, res) {
            try {
                let response = await getDataBySubCategory(config, { location: req.params.location_id, department: req.params.department_id, category: req.params.category_id, subCategory: req.params.subcategory_id });
                res.json(response);
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });
        
        //Fetching data from destructured tables
        app.get("/api/v2/location/:location_id/department/:department_id/category/:category_id/subcategory/:subcategory_id", async function (req, res) {
            try {
                let response = await getDataByAllParams(config, { location: req.params.location_id, department: req.params.department_id, category: req.params.category_id, subCategory: req.params.subcategory_id });
                res.json(response);
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });

        //SKU End Point
        app.get("/api/v1/sku", async function (req, res) {
            try {
                //Validating required params with JOI Library
                const schema = Joi.object().keys({
                    location: Joi.string().required(),
                    department: Joi.string().required(),
                    category: Joi.string().required(),
                    subCategory: Joi.string().required()
                });
                const result = schema.validate(req.query);
                const { error } = result;
                if (!error) {
                    res.status(422).json({
                        message: 'Invalid request, query params missing',
                        data: req.query
                    })
                }
                else {
                    let response = await getSkuData(config, req.query);
                    res.json(response);
                }
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });

        app.get("/api/v2/sku", async function (req, res) {
            try {
                //Validating required params with JOI Library
                const schema = Joi.object().keys({
                    location: Joi.string().required(),
                    department: Joi.string().required(),
                    category: Joi.string().required(),
                    subCategory: Joi.string().required()
                });
                const result = schema.validate(req.query);
                const { error } = result;
                if (error) {
                    res.status(422).json({
                        message: 'Invalid request, query params missing',
                        data: req.query
                    })
                }
                else {
                    let response = await getSkuData_v2(config, req.query);
                    res.json(response);
                }
            }
            catch (ex) {
                config.logger.error("exception occured", JSON.stringify(ex, Object.getOwnPropertyNames(ex)));
                res.status(400).json({ error: ex })
            }
        });

        http.listen(3000);
    })
    .catch(reason => {
        logger.fatal(reason);
    });

process.on("uncaughtException", err => {
    console.error("uncaughtException", err);
    logger.fatal(new Date().toUTCString() + " uncaughtException:", err.message, err.stack);
    process.exit(1);
});
// Defines that JavaScript code should be executed in "strcit mode".
'use strict'

import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import util from "util"
import mysql from "mysql"
import { UploadImageForImgur } from "./image/imgur.js"

const mysqlDB = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
});

mysqlDB.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
})

const LOCALHOST = "https://news.blockchain.com"
const PORT = parseInt(process.env.PORT || "8888", 10)
const isTest = process.env.NODE_ENV === "dev"

const API_VERSION = "/api/v1"
const WEB_API = {
    PING_API: API_VERSION + "/ping",
    ITEM_API: API_VERSION + "/item",
    ARTICLE_API: API_VERSION + "/article",
    ARTICLES_API: API_VERSION + "/articles",
    PLATFORM_API: API_VERSION + "/platform",
    PLATFORMS_API: API_VERSION + "/platforms",
    CATEGORIES_API: API_VERSION + "/blockchain-categories"
}

let errors = {
    code: 201,
    message: "",
    data: {},
}

export async function createServer() {
    const app = express()
    app.set('views', path.resolve() + "/views")

    // app.set('view engine', 'ejs')

    app.use('/static', express.static('static'))

    app.use(cors())

    const json_parser = bodyParser.json()

    app.get(WEB_API.PING_API, function (req, res) {
        res.status(200).send({ data: "pong" })
        return
    })

    app.get(WEB_API.ARTICLES_API, function (req, res) {
        const sql = "SELECT * FROM blockchain_articles WHERE is_deleted = 0 ORDER BY update_time DESC;"
        mysqlDB.query(sql, (err, result) => {
            if (err) throw err;

            res.status(200).send(result)
            return
        })
    })

    app.post(WEB_API.ARTICLE_API, json_parser, function (req, res) {
        const title = req.body.title
        const content = req.body.content
        const description = req.body.description
        const read_time = req.body.readTime
        const image_url = req.body.imageUrl
        const article_id = req.body.id

        if (!title || title == "" || !content || content == "" || !description || description == "" || !read_time || read_time == "" || !image_url || image_url == "") {
            errors.code = 403
            errors.message = "Permission denied!"
            res.status(500).send(errors)
            return
        }

        if (article_id && parseInt(article_id) > 0) {
            const sql = util.format("UPDATE blockchain_articles SET title = '%s', content = '%s', description = '%s', read_time = '%d', update_time = NOW() WHERE id = '%d' AND is_deleted = 0", title, encodeURIComponent(content), description, read_time, article_id)
            mysqlDB.query(sql, function (err, result) {
                if (err) throw err;
                res.status(200).send(result)
                return
            })
        } else {

            const sql = util.format('INSERT INTO blockchain_articles (title, content, description, read_time, image_url, create_time, update_time) VALUES ("%s", "%s", "%s", "%s", "%s", NOW(), NOW())', title, content, description, read_time, image_url);
            mysqlDB.query(sql, function (err, article_result) {
                if (err) throw err;

                // if (article_result && article_result != null) {
                //     if (image_url && image_url != "") {
                //         UploadImageForImgur(image_url).then(image_result => {
                //             if (image_result && image_result != null) {
                //                 const sql = util.format("INSERT INTO blockchain_article_images (article_id, title, type, description, link, create_time) VALUES ('%d', '%s', '%s', '%s', '%s', NOW())", result.title, result.type, result.description, result.link);
                //                 mysqlDB.query(sql, function (err, image_result) {
                //                     if (err) throw err;
                //                     res.status(200).send(image_result)
                //                     return
                //                 })
                //             }
                //         })
                //     } else {
                res.status(200).send(article_result)
                return
                // }

            })
        }
    })

    app.get(WEB_API.ARTICLE_API, function (req, res) {
        const id = req.query.article_id
        if (id && parseInt(id) > 0) {
            const sql = util.format("SELECT title, content, description, read_time, image_url, create_time, update_time FROM blockchain_articles WHERE id = %d AND is_deleted = 0 LIMIT 1;", id)
            mysqlDB.query(sql, function (err, article_result) {
                if (err) throw err;
                if (article_result && article_result != null) {
                    res.status(200).send(article_result)
                    return
                }
            })
        } else {
            errors.code = 403
            errors.message = "Permission denied!"
            res.status(500).send(errors)
            return
        }
    })

    app.post(WEB_API.PLATFORM_API, json_parser, function (req, res) {
        const platform_id = req.body.id
        const logoUrl = req.body.logoUrl
        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl
        const category = req.body.category

        if (platform_id && parseInt(platform_id) > 0) {
            // update
        } else {
            // insert
            const sql = util.format("INSERT INTO blockchain_platforms (name, description, logo_url, website_url, category, create_time, update_time) VALUES ('%s', '%s', '%s', '%s', '%s', NOW(), NOW())", name, description, logoUrl, websiteUrl, category);
            mysqlDB.query(sql, function (err, platform_result) {
                if (err) throw err;

                if (platform_result && platform_result != null) {
                    res.status(200).send(platform_result)
                    return
                }

                errors.code = 500
                errors.message = "Mysql DB insert failed."
                res.status(500).send(errors)
                return
            })
        }

    })

    app.get(WEB_API.PLATFORMS_API, function (req, res) {
        const sql = util.format("SELECT name, description, logo_url, website_url, category, create_time, update_time FROM blockchain_platforms WHERE is_deleted = 0 ORDER BY update_time DESC;")
        mysqlDB.query(sql, (err, result) => {
            if (err) throw err;

            res.status(200).send(result)
            return
        })
    })

    app.get(WEB_API.PLATFORM_API, function (req, res) {
        const id = req.query.platform_id
        if (id && parseInt(id) > 0) {
            const sql = util.format("SELECT name, description, logo_url, website_url, category, create_time, update_time FROM blockchain_platforms WHERE id = %d AND is_deleted = 0 LIMIT 1;", id)
            mysqlDB.query(sql, function (err, platform_result) {
                if (err) throw err;
                if (platform_result && platform_result != null) {
                    res.status(200).send(platform_result)
                    return
                }
            })
        } else {
            errors.code = 403
            errors.message = "Permission denied!"
            res.status(500).send(errors)
            return
        }
    })

    app.get(WEB_API.CATEGORIES_API, function (req, res) {
        const sql = util.format("SELECT id, category FROM blockchain_categories;")
        mysqlDB.query(sql, (err, result) => {
            if (err) throw err;

            res.status(200).send(result)
            return
        })
    })

    return { app }
}

createServer().then(({ app }) => {
    const server = app.listen(PORT)
    const host = server.address().address
    const port = server.address().port
    console.log("Blockchain news listening at %s:%s", host, port)
})
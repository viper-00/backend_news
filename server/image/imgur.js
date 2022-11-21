'use strict'

import axios from "axios"
import fs from "fs"

const imgur_client_id = "34f11664d142863"
const imgur_client_secret = "8473e3b45e40e24589494a1307a18ca40381f31d"
const imgur_host = "https://api.imgur.com/3"

async function UploadImageForImgur(image_path) {
    return new Promise((resolve, reject) => {
        if (image_path && image_path != "") {
            fs.readFile(image_path, function (fs_err, data) {
                if (fs_err) {
                    reject(err)
                }

                const url = imgur_host + "/image"
                axios.post(url, {
                    image: data
                }, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Client-ID " + imgur_client_id,
                    }
                }).then(res => {
                    if (res.status === 200 && res.data && res.data.data) {
                        const link = res.data.data.link
                        const type = res.data.data.type
                        const title = res.data.data.title
                        const description = res.data.data.description
                        const create_time = res.data.data.datetime

                        const result = {
                            link: link,
                            type: type,
                            title: title,
                            description: description,
                            create_time: create_time
                        }

                        resolve(result)
                    }
                    reject(null)
                }).catch(err => {
                    console.log(err)
                    reject(null)
                })
            })

        }
    })
}

export {
    UploadImageForImgur
}
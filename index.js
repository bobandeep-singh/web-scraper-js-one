const PORT = 8000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

// Initialize express
const app = express()


const URL = 'https://www.theguardian.com/international'

console.log("Calling the api using axios")
axios(URL)
    .then(response => {
        const html = response.data
        // console.log(html)
        const articles = []

        const $ = cheerio.load(html)
        $('.fc-item__title', html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log("Articles fetched are:\n", articles)
    }).catch(err => console.log("Exception occured:\n", err))

app.listen(PORT, () => console.log(`Nodemon Server running on port ${PORT}`))
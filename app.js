const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended : true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){
    console.log(req.body.cityName)

    const city = req.body.cityName
    const apiKey = "f854e133869c4d1be385edc28a0775df"
    const unit = "Metric"
    
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=${unit}`
    
    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The weather is currently ${weatherDesc}.</h1>`)
            res.write(`<h1>The temperature in ${req.body.cityName} is ${temp} degrees.</h1>`)
            res.write(`<img src="${iconURL}">`)

            res.send()
        })
    })

    // res.send("Server is up and running.")
})



app.listen(3000, function(){
    console.log("Server has started on port 3000")
})
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config(); 

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port =  process.env.PORT ||3000;
const baseUrl = "http://api.airvisual.com/v2";
const apiKey = process.env.API_KEY;
console.log('api key is : ' + apiKey);

let selectedCountry;
let selectedState;

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/pageCountries1", async (req, res) => {
  try {
    const countryList = [];

    const response = await axios.get(`${baseUrl}/countries?key=${apiKey}`);
    const responseData = response.data.data;

    for (let i = 0; i < responseData.length; i++) {
      countryList[i] = responseData[i].country;
    }

    res.render("country.ejs", {
      countries: countryList,
    });
  } catch (error) {
    res.send(error.response.data.data.message);
  }
});

app.get("/states", async (req, res) => {
  try {
    const stateList = [];
    selectedCountry = req.query.country;

    const response = await axios.get(
      `${baseUrl}/states?country=${selectedCountry}&key=${apiKey}`
    );
    const responseData = response.data.data;

    for (let i = 0; i < responseData.length; i++) {
      stateList[i] = responseData[i].state;
    }

    res.render("state.ejs", { states: stateList });
  } catch (error) {
    res.send(error.response.data.data.message);
  }
});

app.get("/cities", async (req, res) => {
  try {
    const cityList = [];
    selectedState = req.query.state;

    const response = await axios.get(
      `${baseUrl}/cities?state=${selectedState}&country=${selectedCountry}&key=${apiKey}`
    );
    const responseData = response.data.data;

    for (let i = 0; i < responseData.length; i++) {
      cityList[i] = responseData[i].city;
    }

    res.render("city.ejs", { cities: cityList });
  } catch (error) {
    res.send(error.response.data.data.message);
  }
});

app.get("/aqi", async (req, res) => {
  const cityName = req.query.city;
  try {
    const response = await axios.get(
      `${baseUrl}/city?city=${cityName}&state=${selectedState}&country=${selectedCountry}&key=${apiKey}`
    );
    const aqiValue = response.data.data.current.pollution.aqius;
    const responseCity = response.data.data.city;

    const result = { aqiUs: aqiValue, city: responseCity };
    res.render("city.ejs", { data: result });
  } catch (error) {
    res.send(error.response.data.data.message);
  }
});

app.get("/", (req, res) => {
  const startPageData = {
    msg: '<b>!!!</b> 📌 Please make sure to read all the instructions carefully before proceeding.',
    counter: 0,
  };

  res.render("starting_page.ejs", {
    data: startPageData,
  });
});

app.get("/page1", (req, res) => {
  const startPageData = {
    msg: "This website allows you to explore countries, drill down into their states, and view cities to check the real-time <b>Air Quality Index</b>(AQI). With clear visuals and health-based indicators, you can quickly understand the air quality around the world and make safer, informed choices for your well-being.",
    counter: 1,
  };

  res.render("starting_page.ejs", {
    data: startPageData,
  });
});

app.get("/page2", (req, res) => {
  const startPageData = {
    msg: "Please click the buttons slowly and give it a moment to load. <br> We're using a <b>public API</b>, so responses may take a few seconds. <br> Thank you for your patience!",
    counter: 2,
  };

  res.render("starting_page.ejs", {
    data: startPageData,
  });
});

app.get("/page3", (req, res) => {
  const startPageData = {
    msg: "Sometimes, country, state, or city data might not be available.<br>This is due to limitations or changes in the public API we use.<br>We appreciate your understanding!",
    counter: "Countries",
  };

  res.render("starting_page.ejs", {
    data: startPageData,
  });
});

app.get("/table", (req, res) => {
  res.sendFile(__dirname + "/public/table.html");
});

app.listen(port, () => console.log(`listening on port ${port}`));

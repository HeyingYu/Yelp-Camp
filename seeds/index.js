/*
5ffe9ed9fc6b7846f153d63c
url: 'https://res.cloudinary.com/dlvcdsmaw/image/upload/v1610856460/YelpCamp/kvzczbvakl5xoywjhq2n.jpg',
                    filename: 'YelpCamp/kvzczbvakl5xoywjhq2n'
                    url: 'https://res.cloudinary.com/dlvcdsmaw/image/upload/v1610856195/YelpCamp/ioy6ykbhyojq1mnigpo0.jpg',
                    filename: 'YelpCamp/ioy6ykbhyojq1mnigpo0'
*/
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "5ffe9ed9fc6b7846f153d63c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
          url:
            "https://res.cloudinary.com/dlvcdsmaw/image/upload/v1610864250/YelpCamp/ba4bogsffot018x4sbwm.jpg",
          filename: "YelpCamp/ba4bogsffot018x4sbwm",
        },
        {
          url:
            "https://res.cloudinary.com/dlvcdsmaw/image/upload/v1610864250/YelpCamp/ug038qtlgmi3n1fnjzvt.jpg",
          filename: "YelpCamp/ug038qtlgmi3n1fnjzvt",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

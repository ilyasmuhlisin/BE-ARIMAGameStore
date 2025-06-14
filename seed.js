const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Category = require("./models/category.model");
const Developer = require("./models/developer.model");
const Product = require("./models/product.model");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Category.deleteMany();
    await Developer.deleteMany();
    await Product.deleteMany();

    const categories = await Category.insertMany([
      { category_name: "Action", description: "Fast-paced combat games" },
      { category_name: "RPG", description: "Role-playing fantasy games" },
      { category_name: "Racing", description: "High-speed driving games" },
      { category_name: "Simulation", description: "Real-world simulation games" },
      { category_name: "Strategy", description: "Think-before-you-click type games" },
      { category_name: "Sport", description: "Football and sport-related games" },
      { category_name: "Horror", description: "Scary games to play at night" },
      { category_name: "Adventure", description: "Story-driven and exploration games" },
    ]);

    const developers = await Developer.insertMany([
      { developer_name: "CD Projekt Red", description: "Known for Witcher and Cyberpunk" },
      { developer_name: "FromSoftware", description: "Dark Souls, Elden Ring, Sekiro" },
      { developer_name: "Codemasters", description: "F1 & Racing games" },
      { developer_name: "Electronic Arts (EA)", description: "FIFA, The Sims, SimCity" },
      { developer_name: "Valve", description: "Makers of Half-Life, Portal, Dota 2" },
      { developer_name: "Lara Dev Studios", description: "Tomb Raider Series" },
      { developer_name: "Digital Happiness", description: "Indonesian devs of DreadOut" },
      { developer_name: "DVloper", description: "Creator of Granny horror game" },
    ]);

    const products = [
      {
        name: "The Witcher 3",
        description: "Epic open-world RPG game",
        categories_id: categories.find((c) => c.category_name === "RPG")._id,
        developer_id: developers[0]._id,
        price: 29.99,
        pictures: "https://via.placeholder.com/300x400?text=Witcher+3",
      },
      {
        name: "Elden Ring",
        description: "Dark Souls-style adventure",
        categories_id: categories.find((c) => c.category_name === "RPG")._id,
        developer_id: developers[1]._id,
        price: 59.99,
        pictures: "https://via.placeholder.com/300x400?text=Elden+Ring",
      },
      {
        name: "F1 2023",
        description: "Realistic Formula 1 simulation",
        categories_id: categories.find((c) => c.category_name === "Racing")._id,
        developer_id: developers[2]._id,
        price: 49.99,
        pictures: "https://via.placeholder.com/300x400?text=F1+2023",
      },
      {
        name: "The Sims 4",
        description: "Life simulation with freedom",
        categories_id: categories.find((c) => c.category_name === "Simulation")._id,
        developer_id: developers[3]._id,
        price: 19.99,
        pictures: "https://via.placeholder.com/300x400?text=Sims+4",
      },
      {
        name: "Portal 2",
        description: "Puzzle and physics meets humor",
        categories_id: categories.find((c) => c.category_name === "Strategy")._id,
        developer_id: developers[4]._id,
        price: 14.99,
        pictures: "https://via.placeholder.com/300x400?text=Portal+2",
      },
      {
        name: "Dark Souls III",
        description: "Challenging boss fights & lore",
        categories_id: categories.find((c) => c.category_name === "RPG")._id,
        developer_id: developers[1]._id,
        price: 39.99,
        pictures: "https://via.placeholder.com/300x400?text=Dark+Souls+III",
      },
      {
        name: "Assetto Corsa",
        description: "Hyper realistic racing sim",
        categories_id: categories.find((c) => c.category_name === "Racing")._id,
        developer_id: developers[2]._id,
        price: 19.99,
        pictures: "https://via.placeholder.com/300x400?text=Assetto+Corsa",
      },
      {
        name: "Cyberpunk 2077",
        description: "Sci-fi open-world shooter RPG",
        categories_id: categories.find((c) => c.category_name === "Action")._id,
        developer_id: developers[0]._id,
        price: 39.99,
        pictures: "https://via.placeholder.com/300x400?text=Cyberpunk+2077",
      },
      {
        name: "Cities: Skylines",
        description: "City building simulation",
        categories_id: categories.find((c) => c.category_name === "Simulation")._id,
        developer_id: developers[3]._id,
        price: 24.99,
        pictures: "https://via.placeholder.com/300x400?text=Cities+Skylines",
      },
      {
        name: "Dota 2",
        description: "Multiplayer online battle arena",
        categories_id: categories.find((c) => c.category_name === "Strategy")._id,
        developer_id: developers[4]._id,
        price: 0.0,
        pictures: "https://via.placeholder.com/300x400?text=Dota+2",
      },
      {
        name: "Half-Life 2",
        description: "Legendary FPS with physics puzzles",
        categories_id: categories.find((c) => c.category_name === "Action")._id,
        developer_id: developers[4]._id,
        price: 9.99,
        pictures: "https://via.placeholder.com/300x400?text=Half+Life+2",
      },
      {
        name: "StarCraft II",
        description: "Sci-fi RTS classic",
        categories_id: categories.find((c) => c.category_name === "Strategy")._id,
        developer_id: developers[4]._id,
        price: 19.99,
        pictures: "https://via.placeholder.com/300x400?text=StarCraft+II",
      },
      {
        name: "The Sims Medieval",
        description: "Medieval life simulation",
        categories_id: categories.find((c) => c.category_name === "Simulation")._id,
        developer_id: developers[3]._id,
        price: 14.99,
        pictures: "https://via.placeholder.com/300x400?text=Sims+Medieval",
      },
      {
        name: "Sekiro: Shadows Die Twice",
        description: "Ninja action RPG",
        categories_id: categories.find((c) => c.category_name === "Action")._id,
        developer_id: developers[1]._id,
        price: 49.99,
        pictures: "https://via.placeholder.com/300x400?text=Sekiro",
      },
      {
        name: "SimCity",
        description: "Classic city builder game",
        categories_id: categories.find((c) => c.category_name === "Simulation")._id,
        developer_id: developers[3]._id,
        price: 11.99,
        pictures: "https://via.placeholder.com/300x400?text=SimCity",
      },
      {
        name: "Granny",
        description: "Escape from a scary haunted house",
        categories_id: categories.find((c) => c.category_name === "Horror")._id,
        developer_id: developers[7]._id,
        price: 5.99,
        pictures: "https://via.placeholder.com/300x400?text=Granny",
      },
      {
        name: "DreadOut",
        description: "Indonesian horror adventure with ghosts and legends",
        categories_id: categories.find((c) => c.category_name === "Horror")._id,
        developer_id: developers[6]._id,
        price: 14.99,
        pictures: "https://via.placeholder.com/300x400?text=DreadOut",
      },
      {
        name: "PES 2024",
        description: "Pro Evolution Soccer - Football game simulator",
        categories_id: categories.find((c) => c.category_name === "Sport")._id,
        developer_id: developers[3]._id,
        price: 29.99,
        pictures: "https://via.placeholder.com/300x400?text=PES+2024",
      },
      {
        name: "FIFA 24",
        description: "Official football simulation game with real licenses",
        categories_id: categories.find((c) => c.category_name === "Sport")._id,
        developer_id: developers[3]._id,
        price: 59.99,
        pictures: "https://via.placeholder.com/300x400?text=FIFA+24",
      },
      {
        name: "Tomb Raider",
        description: "Adventure puzzle shooter with Lara Croft",
        categories_id: categories.find((c) => c.category_name === "Adventure")._id,
        developer_id: developers[5]._id,
        price: 19.99,
        pictures: "https://via.placeholder.com/300x400?text=Tomb+Raider",
      },
    ];

    await Product.insertMany(products);
    console.log("Seeder completed ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();

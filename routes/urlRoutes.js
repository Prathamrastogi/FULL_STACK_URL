const express = require("express");
const router = express.Router();
const ShortURL = require("../models/urlSchema");
const urlSchema = require("../models/urlSchema");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/public/', express.static('public'));

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/use", (req, res) => {
  res.render("try");
});

router.post("/result", async (req, res) => {
  try {
    console.log("The fullUrl is ", req.body);
    const { url_name } = req.body;
    const urlFound = await urlSchema.find({ url_name });
    if (urlFound.length > 0) {
      res.status(409).render("error");
    } else {
      const shortUrls = await urlSchema.create({ url_name });
      res.status(201).render("success");
    }
  } catch (error) {
    res.status(500).render("error");
  }
});

router.get("/result", async (req, res) => {
  try {
    const shortUrls = await urlSchema.find().sort({ createdAt: -1 });
    if (shortUrls.length < 0) {
      res.status(404).render("error");
    } else {
      res.status(200).render("result", { shortUrls: shortUrls });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const shortUrl = await urlSchema.findOne({ short_url: req.params.id });
    if (!shortUrl) {
      res.status(404).render("error");
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.url_name}`);
    }
  } catch (error) {
    res.status(500).render("error");
  }
});

router.all('*',(req, res, next) => {
  next(err);
})

router.use((error, req , res , next) => {
  res.render("404");
})

module.exports = router;

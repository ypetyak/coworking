const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());

app.use(express.static("./public"));

const db = require("./sql/db.js");

const bodyParser = require("body-parser");
app.use(require("body-parser").json());

// ===== for file upload

const s3 = require("./s3");
const config = require("./config");


// ======== ========= COOKIE AND CSURF =========== =========== //

const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(compression());
app.use(require("cookie-parser")());
app.use(
    cookieSession({
        secret: "coworking",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(require("body-parser").json());
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// ======== ========= EXPORT FOR PASSWORD ======== ========= //

const {hashPassword, checkPass} = require("./public/hashing.js");


// =========== ==========



if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


// ============ FOR FILE UPLOAD

var multer = require("multer"); // will do some magic to upload files to our computer
var uidSafe = require("uid-safe"); // takes the files we upload and gives them a completely new name
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        // where to save files into
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            // 24 is a number of characters we tell uidSafe to create for new files
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    // we pass file to multer
    storage: diskStorage,
    limits: {
        fileSize: 2097152 /// the only limit to the files we have, its size, around 2 mb.
        // it will work without limits, but we do this for security reasons.
    }
});

// ========= CHECK IF WE ARE LOGGED IN OR NOT ========== ===========

// if (!req.session) {
//     res.redirect("/welcome")
// }


app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});



// =========    =========== LOGIN AND REGISTER ===========  =============

app.post("/registration", (req, res) => {
    // Get results from the Input (see registration.js)
    // and extract values we need

    let {first, last, email, password} = req.body;
    // console.log("Input from registration.js", first, last, email, password);

    // hash our password with special boilerplate method

    hashPassword(password).then(hash => {
        console.log(hash);

        // put info and hashed password into the DB

        db.createUser(first, last, email, hash).then(results => {

            // if everything is alright infrom the front end side, so they can proceed further

            req.session.userId = results.rows[0].id; // also don't forget to start a new session
            res.json({success: true});
        }).catch(error => {

            // or inform them that there is an error
            console.log("Error in POST Registration: ", error);
            res.json({success: false});
        });
    });
});

app.post("/login", (req, res) => {
    // console.log("req.body: ", req.body);

    let {email, password} = req.body;
    console.log("OUR EMAIL", email, password);

    db.returnPassword(email).then(results => {
        console.log("Resutls from password request: ", results);
        var savedPas = results.rows[0].password;
        var id = results.rows[0].id;

        checkPass(password, savedPas).then(results => {
            if (results) {
                req.session.userId = id;
                res.json({success: true});
            }
        });
    }).catch(error => {
        console.log("Error in POST /login: ", error);

        res.json({success: false});
    });
});

// ========== REQUEST FROM ACTION.JS FOR USER INFO =========== //

app.get("/getUserInfo", (req, res) => {

    var userId = req.session.userId;


    db.getUserInfo(userId).then(results => {
        // console.log("User Info: ", results.rows);
        res.json(results.rows[0])
    }).catch(error => {
        console.log("Error in GET User Info in /getUserInfo", error);
    });
})

// ================= UPDATE USER PROFILE ================== //

app.post("/updateUserProfile", (req, res) => {
    var userId = req.session.userId;

    // info about user

    var first = req.body.first;
    var last = req.body.last;
    var bio = req.body.bio;
    var profession = req.body.profession;

    console.log("Info for our new profile: ", req.body.bio);

    db.updateUserProfile(userId, first, last, bio, profession).then(results => {
        console.log("USER Profile: ", results.rows);
        res.json(results.rows[0])
    }).catch(error => {
        console.log("Error in POST Update USER Profile in /updateUserProfile", error);
    });
})

// ========= REQUEST FROM ACTION.JS FOR HOUSE PROFILE =========== //

app.get("/getHouseProfile", (req, res) => {

    var userId = req.session.userId;

    db.getHouseProfile(userId).then(results => {
        // console.log("House Profile: ", results.rows);
        res.json(results.rows[0])
    }).catch(error => {
        console.log("Error in GET House Profile in /getHouseProfile", error);
    });
})

//  =========== UPDATE/CREATE HOUSE PROFILE ============== //

app.post("/updateHouseProfile", (req, res) => {
    var userId = req.session.userId;

    // info about house

    var house_name = req.body.house_name;
    var description = req.body.description;
    var space = req.body.space;
    var address = req.body.address;
    var postcode = req.body.postcode;

    console.log("Info for our new profile: ", req.body);

    db.updateHouseProfile(userId, house_name, description, space, address, postcode).then(results => {
        console.log("House Profile: ", results.rows);
        res.json(results.rows[0])
    }).catch(error => {
        console.log("Error in POST Update House Profile in /updateHouseProfile", error);
    });
})

//  =========== CREATE AN EVENT DATE ============== //

app.post("/createEvent", (req, res) => {


    var userId = req.session.userId;
    var houseId = req.body.houseId;
    var eventDate = req.body.eventDate;

    console.log("Info for our Event: ", req.body);

    db.createEvent(userId, houseId, eventDate).then(results => {
        db.getEventsCreated(userId).then(results => {
            // console.log("House Profile: ", results.rows);
            res.json(results.rows)
        }).catch(error => {
            console.log("Error in GET EVENTS CREATED in /eventsCreated", error);
        });
    }).catch(error => {
        console.log("Error in POST Create Event in /createEvent", error);
    });
})

// ========= GET ALL EVENTS WE CREATED ============ //

app.get("/eventsCreated", (req, res) => {

    var userId = req.session.userId;

    db.getEventsCreated(userId).then(results => {
        // console.log("House Profile: ", results.rows);
        res.json(results.rows)
    }).catch(error => {
        console.log("Error in GET EVENTS CREATED in /eventsCreated", error);
    });
})

// ========== DELETE EVENT =============== //

app.post("/deleteEvent", (req, res) => {

    var eventId = req.body.eventId;

    console.log("Delete Our Event: ", eventId);

    db.deleteEvent(eventId).then(() => {
        console.log("Event Deleted");
    }).catch(error => {
        console.log("Error in POST Create Event in /createEvent", error);
    });
});

//================ FIND EVENT BY DAYE ============== //

app.get("/getPlacesByDate", (req, res) => {

    var date = req.query.date
    console.log("Our Date: ", date);

    db.getEventsByDate(date).then(results => {
        console.log("Events We Choose By Date: ", results.rows);
        res.json(results.rows)
    }).catch(error => {
        console.log("Error in GET EVENTS CREATED in /eventsCreated", error);
    });
})

// ========= UPLOAD FOR USER PROFILE  ======================


app.post("/uploadForProfile", uploader.single("file"), s3.upload, (req, res) => {
    console.log("ID is here: ", req.session.userId);
    db.updateProfileImage(config.s3Url + req.file.filename, req.session.userId).then(results => {
        // req.session.avatar_url = config.s3Url + req.file.filename;
        console.log("Our Amazning rsults: ", results);
        res.json(results.rows[0]);
    }).catch(err => {
        console.log("Error in writeFileTo: ", err);
        res.status(500).json({success: false});
    });
});


// ============= UPLAOD FOR HOUSE PROFILE =================

app.post("/uploadForHousePhoto", uploader.single("file"), s3.upload, (req, res) => {
    console.log("ID is here: ", req.session.userId);
    db.updateHouseImage(config.s3Url + req.file.filename, req.session.userId).then(results => {
        // req.session.avatar_url = config.s3Url + req.file.filename;
        console.log("Our Amazning rsults: ", results);
        res.json(results.rows[0]);
    }).catch(err => {
        console.log("Error in writeFileTo: ", err);
        res.status(500).json({success: false});
    });
});

//



app.get("/getAllEvents", (req, res) => {

    console.log("Our Date: ", date);

    db.getAllEvents().then(results => {

        res.json(results.rows)
    }).catch(error => {
        console.log("Error in GET All Events in /getAllEvents", error);
    });
})

// ===== Logout

app.post("/logout", (req, res) => {
    req.session = null;
    // req.session.destroy;
    res.redirect("/welcome");
});




// =========


app.get('*', function(req, res) {
    if (!req.session.userId) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});

import axios from "./axios";

// ======== Request from Menu ========== //

export async function userInfo() {
    const { data } = await axios.get("/getUserInfo");
    console.log("User Info In ACTION.JS", data);
    return {
        type: "USER_INFO",
        user: data
    };
}

// ============ UPDATE USER PROFILE ============ //

export async function updateUserProfile(props) {
    const { data } = await axios.post("/updateUserProfile", props);
    console.log("Update USER Info In ACTION.JS", data);
    return {
        type: "UPDATE_USER_PROFILE",
        user: data
    };
}

// ========== Request for House Profile ======== //

export async function houseProfile() {
    const { data } = await axios.get("/getHouseProfile");
    console.log("House Info In ACTION.JS", data);
    return {
        type: "HOUSE_PROFILE",
        house: data
    };
}

// =========== Update House Profile ============== //


export async function updateHouseProfile(props) {
    const { data } = await axios.post("/updateHouseProfile", props);
    console.log("Update House Info In ACTION.JS", data);
    return {
        type: "UPDATE_HOUSE_PROFILE",
        house: data
    };
}

// ============= Create an Event =========== ===== //

export async function createEvent(props) {
    const { data } = await axios.post("/createEvent", props);
    console.log("Create Event In ACTION.JS", data);
    return {
        type: "NEW_EVENT",
        events: data
    };
}

// ========== SELECT ALL EVENTS WE CREATED ========= === //

export async function eventsCreated() {
    const { data } = await axios.get("/eventsCreated");
    console.log("All events I created In ACTION.JS", data);
    return {
        type: "CREATED_EVENTS",
        events: data
    };
}

// ========== DELETE EVENT ========= =========== //

export async function deleteEvent(props) {
    const { data } = await axios.post("/deleteEvent", props);
	console.log("We Delete Event", props);
    return {
        type: "DELETE_EVENT",
        eventId: props
    };
}


// ================= GET PLACES BY DATE ========= ========== //

export async function getPlacesByDate(props) {

    var date = {
        params: {
            date: props
        }
    }

    console.log("Date we search for", props);
    const { data } = await axios.get("/getPlacesByDate", date);

    return {
        type: "FIND_EVENT",
        eventsSelected: data
    };
}

// ================ LOCATION DETAILS ================= //

export async function updatedWithLocation(props) {

    console.log("UPDATED WITH LOCAYION", props);
    return {
        type: "LOCATION_EVENT",
        eventsSelected: props
    };
}

// =============== UPLOAD PHOTO ================== //

export async function photoUploadForprofile(props) {
    const { data } = await axios.post("/uploadForProfile", props)
    console.log("Update Profile Photo", data);
    return {
        type: "PROFILE_PHOTO",
        profilePhoto: data
    };
}

/// ================= UPLOAD HOUSE PHOTO ============= //

export async function photoUploadForHouse(props) {
    const { data } = await axios.post("/uploadForHousePhoto", props)
    console.log("Update House Photo", data);
    return {
        type: "HOUSE_PHOTO",
        housePhoto: data
    };
}

// ============ LogOut =============

export async function logOut() {
    const { data } = await axios.post("/logout")

    return {
        type: "LOGOUT",
    };
}

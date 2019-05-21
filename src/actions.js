import axios from "./axios";

// ======== Request from Menu ========== //

export async function userInfo() {
    const { data } = await axios.get("/getUserInfo");
    return {
        type: "USER_INFO",
        user: data
    };
}

// ============ UPDATE USER PROFILE ============ //

export async function updateUserProfile(props) {
    const { data } = await axios.post("/updateUserProfile", props);
    return {
        type: "UPDATE_USER_PROFILE",
        user: data
    };
}

// ========== Request for House Profile ======== //

export async function houseProfile() {
    const { data } = await axios.get("/getHouseProfile");
    return {
        type: "HOUSE_PROFILE",
        house: data
    };
}

// =========== Update House Profile ============== //


export async function updateHouseProfile(props) {
    const { data } = await axios.post("/updateHouseProfile", props);
    return {
        type: "UPDATE_HOUSE_PROFILE",
        house: data
    };
}

// ============= Create an Event =========== ===== //

export async function createEvent(props) {
    const { data } = await axios.post("/createEvent", props);
    return {
        type: "NEW_EVENT",
        events: data
    };
}

// ========== SELECT ALL EVENTS WE CREATED ========= === //

export async function eventsCreated() {
    const { data } = await axios.get("/eventsCreated");
    return {
        type: "CREATED_EVENTS",
        events: data
    };
}

// ========== DELETE EVENT ========= =========== //

export async function deleteEvent(props) {
    const { data } = await axios.post("/deleteEvent", props);
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
    };

    console.log("Date we search for", props);
    const { data } = await axios.get("/getPlacesByDate", date);

    return {
        type: "FIND_EVENT",
        eventsSelected: data
    };
}

// ================ LOCATION DETAILS ================= //

export async function updatedWithLocation(props) {
    return {
        type: "LOCATION_EVENT",
        eventsSelected: props
    };
}

// =============== UPLOAD PHOTO ================== //

export async function photoUploadForprofile(props) {
    const { data } = await axios.post("/uploadForProfile", props);
    return {
        type: "PROFILE_PHOTO",
        profilePhoto: data
    };
}

/// ================= UPLOAD HOUSE PHOTO ============= //

export async function photoUploadForHouse(props) {
    const { data } = await axios.post("/uploadForHousePhoto", props);
    return {
        type: "HOUSE_PHOTO",
        housePhoto: data
    };
}

// ============ LogOut =============

export async function logOut() {
    const { data } = await axios.post("/logout");

    return {
        type: "LOGOUT",
    };
}

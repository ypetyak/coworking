export default function (state = {}, action) {

    // ========== ======= GET USER INFO ======== ==========

    if (action.type == "USER_INFO") {
        if (action.user == "") {
            state = {
                ...state,
                user: true
            };
        } else {
            state = {
                ...state,
                user: action.user
            };
        }
    }
    // ============ ======== UPDATE USER PROFILE =========== ===========

    if (action.type == "UPDATE_USER_PROFILE") {
        state = {
            ...state,
            user: action.user
        };

    }

    // ========== ========= GET HOUSE PROFILE ======== ==========

    if (action.type == "HOUSE_PROFILE") {
        if (action.house == "") {
            state = {
                ...state,
                house: {photo: "./stockphoto4.jpg"}
            };
        } else {
            state = {
                ...state,
                house: action.house
            };
        }
    }

    // ========== ======== UPDATE HOUSE PROFILE ========= ===========

    if (action.type == "UPDATE_HOUSE_PROFILE") {
        state = {
            ...state,
            house: action.house
        };

    }

    // ========== ========== NEW EVENT ========= ===========

    if (action.type == "NEW_EVENT") {
        state = {
            ...state,
            events: action.events
        };

    }

    // ========== ========== EVENTS YOU CREATED ========= ===========

    if (action.type == "CREATED_EVENTS") {
        state = {
            ...state,
            events: action.events
        };

    }

    // ========= ========= DELETE EVENT =========== ===========

    if (action.type == "DELETE_EVENT") {
        state = {
            ...state,
            events:
                state.events &&
                state.events.filter(oneEvent => oneEvent.id != action.eventId)
        };
    }

    // =========== ========== EVENTS SELECTED BY DATE ============= ========

    if (action.type == "FIND_EVENT") {
        state = {
            ...state,
            eventsSelected: action.eventsSelected
        };

    }

    // ============ ============  UPDATED WITH LOCATION =========== =========

    if (action.type == "LOCATION_EVENT") {
        state = {
            ...state,
            eventsSelected: action.eventsSelected
        };

    }

    // ======================= PHOTO IN PROFILE ==================

    if (action.type == "PROFILE_PHOTO") {
        state = {
            ...state,
            user:  state.user.photo_url = action.profilePhoto
        };
    }

    // ==================== PHOTO OF THE HOUSE ===============

    if (action.type == "HOUSE_PHOTO") {
        console.log("State in HOUSE PHOTO", state);
        state = {
            ...state,
            house:  state.house.photo = action.housePhoto
        };

    }

    // =========== ======= ======= =========== ======= =======

    return state;

}

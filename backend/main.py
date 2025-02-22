from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

# PocketBase API URL
POCKETBASE_URL = "http://localhost:8090/api/collections"

# Function to interact with PocketBase API
def pocketbase_request(collection: str, method: str = "GET", data: dict = None, record_id: str = None):
    url = f"{POCKETBASE_URL}/{collection}/records"
    if record_id:
        url += f"/{record_id}"
    
    headers = {"Content-Type": "application/json"}
    
    try:
        if method == "GET":
            response = requests.get(url, headers=headers)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers)
        elif method == "PUT":
            response = requests.put(url, json=data, headers=headers)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers)
        else:
            raise ValueError("Invalid HTTP Method")
        
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

# Enlist Volunteer in an Event
@app.post("/events/{event_id}/enlist/{volunteer_id}")
def enlist_volunteer(event_id: str, volunteer_id: str):
    # Get the event details
    event = pocketbase_request("events", "GET", record_id=event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Get the volunteer details
    volunteer = pocketbase_request("volunteer", "GET", record_id=volunteer_id)
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")

    # Ensure volunteer_list is a list
    volunteer_list = event.get("volunteer_list", [])
    if isinstance(volunteer_list, str):  # If it's stored as JSON string
        import json
        volunteer_list = json.loads(volunteer_list)

    # Check if volunteer is already enlisted
    if volunteer_id in volunteer_list:
        raise HTTPException(status_code=400, detail="Volunteer already enlisted")

    # Add volunteer to event's volunteer list
    volunteer_list.append(volunteer_id)

    # Update event with new volunteer list
    event_update = {"volunteer_list": volunteer_list}
    pocketbase_request("events", "PUT", data=event_update, record_id=event_id)

    # Ensure volunteer has an events_list to track their participation
    events_list = volunteer.get("events_list", [])
    if isinstance(events_list, str):  # If stored as JSON string
        import json
        events_list = json.loads(events_list)

    # Add event to volunteer’s record
    events_list.append(event_id)

    # Update volunteer's record
    volunteer_update = {"events_list": events_list}
    pocketbase_request("volunteer", "PUT", data=volunteer_update, record_id=volunteer_id)

    return {"message": "Volunteer enlisted successfully", "event_id": event_id, "volunteer_id": volunteer_id}

# CRUD Routes for Events
@app.get("/events/{event_id}")
def get_event(event_id: str):
    return pocketbase_request("events", "GET", record_id=event_id)

@app.post("/events")
def create_event(event_data: dict):
    return pocketbase_request("events", "POST", data=event_data)

@app.put("/events/{event_id}")
def update_event(event_id: str, event_data: dict):
    return pocketbase_request("events", "PUT", data=event_data, record_id=event_id)

@app.delete("/events/{event_id}")
def delete_event(event_id: str):
    return pocketbase_request("events", "DELETE", record_id=event_id)

# CRUD Routes for Volunteers
@app.get("/volunteers/{volunteer_id}")
def get_volunteer(volunteer_id: str):
    return pocketbase_request("volunteer", "GET", record_id=volunteer_id)

@app.post("/volunteers")
def create_volunteer(volunteer_data: dict):
    return pocketbase_request("volunteer", "POST", data=volunteer_data)

@app.put("/volunteers/{volunteer_id}")
def update_volunteer(volunteer_id: str, volunteer_data: dict):
    return pocketbase_request("volunteer", "PUT", data=volunteer_data, record_id=volunteer_id)

@app.delete("/volunteers/{volunteer_id}")
def delete_volunteer(volunteer_id: str):
    return pocketbase_request("volunteer", "DELETE", record_id=volunteer_id)

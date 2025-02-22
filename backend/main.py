from fastapi import FastAPI, HTTPException
import requests


#The code snippet below is made entirely by Generative AI, OpenAI's GPT-o4 model.
# Initialize FastAPI app
app = FastAPI()

# PocketBase API URL (Replace with your actual PocketBase URL)
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

# CRUD Routes for Users
@app.get("/users/{user_id}")
def get_user(user_id: str):
    return pocketbase_request("users", "GET", record_id=user_id)

@app.post("/users")
def create_user(user_data: dict):
    return pocketbase_request("users", "POST", data=user_data)

@app.put("/users/{user_id}")
def update_user(user_id: str, user_data: dict):
    return pocketbase_request("users", "PUT", data=user_data, record_id=user_id)

@app.delete("/users/{user_id}")
def delete_user(user_id: str):
    return pocketbase_request("users", "DELETE", record_id=user_id)

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

# CRUD Routes for Organizations
@app.get("/organizations/{org_id}")
def get_organization(org_id: str):
    return pocketbase_request("organization", "GET", record_id=org_id)

@app.post("/organizations")
def create_organization(org_data: dict):
    return pocketbase_request("organization", "POST", data=org_data)

@app.put("/organizations/{org_id}")
def update_organization(org_id: str, org_data: dict):
    return pocketbase_request("organization", "PUT", data=org_data, record_id=org_id)

@app.delete("/organizations/{org_id}")
def delete_organization(org_id: str):
    return pocketbase_request("organization", "DELETE", record_id=org_id)

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

# Run using: uvicorn filename:app --reload

import os
from pocketbase import PocketBase
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get PocketBase URL from .env (or use default localhost)
PB_URL = os.getenv("POCKETBASE_URL", "http://127.0.0.1:8090")

# Initialize PocketBase client
pb = PocketBase(PB_URL)

# Function to authenticate an admin (optional, only if needed)
def admin_auth():
    ADMIN_EMAIL = os.getenv("POCKETBASE_ADMIN_EMAIL", "backend@bluelock.com")
    ADMIN_PASSWORD = os.getenv("POCKETBASE_ADMIN_PASSWORD", "12345678")
    
    try:
        pb.admins.auth_with_password(ADMIN_EMAIL, ADMIN_PASSWORD)
        print("✅ Admin authenticated with PocketBase")
    except Exception as e:
        print(f"❌ Failed to authenticate: {e}")

# Run admin authentication at startup
admin_auth()
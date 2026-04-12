from fastapi import Request
async def log_requests(request : Request, call_next):
    print(f"Incoming request:{request.url}")
    response = await call_next(request)
    print(f"Response status code: {response.status_code}")
    return response
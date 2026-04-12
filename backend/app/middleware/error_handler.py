from fastapi.responses import JSONResponse

def global_exception_handler(request , exc):
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred.", "detail": str(exc)}
    )
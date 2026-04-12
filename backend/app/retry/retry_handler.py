from tenacity import retry , stop_after_attempt
@retry(stop = stop_after_attempt(3))
def retry_wrapper(func , *args, **kwargs):
    return func(*args, **kwargs)
// API response status and error codes
// Referen: https://shopify.dev/api/usage/response-codes

const StatusCode = {
    200: "OK, The request was successfully processed.",
    201: "Created, The request has been fulfilled and a new resource has been created.",
    202: "Accepted, The request has been accepted, but not yet processed.",
    204: "No Content, The request has been accepted, but no content will be returned. For example, a client might use an update operation to save a document temporarily, and not refresh to a new page.",
    205: "Reset Content, The request has been accepted, but no content will be returned. The client must reset the document from which the original request was sent. For example, if a user fills out a form and submits it, then the 205 code means that the server is making a request to the browser to clear the form.",
    303: "See Other, The response to the request can be found under a different URL in the Location header and can be retrieved using a GET method on that resource.",
    400: "Bad Request, The request wasn't understood by the server, generally due to bad syntax or because the Content-Type header wasn't correctly set to application/json.",
    401: "Unauthorized, The necessary authentication credentials are not present in the request or are incorrect.",
    402: "Payment Required, The requested shop is currently frozen. The shop owner needs to log in to the shop's admin and pay the outstanding balance to unfreeze the shop.",
    403: "Forbidden, The server is refusing to respond to the request. This status is generally returned if you haven't requested the appropriate scope for this action.",
    404: "Not Found, The requested resource was not found but could be available again in the future.",
    406: "Not Acceptable, The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.",
    409: "Resource Conflict, The requested resource couldn't be processed because of conflict in the request. For example, the requested resource might not be in an expected state, or processing the request would create a conflict within the resource.",
    415: "Unsupported Media Type, The server is refusing to accept the request because the payload format is in an unsupported format.",
    422: "Unprocessable Entity, The request body was well-formed but contains semantic errors.",
    429: "Too Many Requests, The request was not accepted because the application has exceeded the rate limit.",
    500: "Internal Server Error, An internal error occurred in Server.",
    501: "Not Implemented, The requested endpoint is not available, this response may also indicate that this endpoint is reserved for future use.",
    502: "Bad Gateway, The server, while acting as a gateway or proxy, received an invalid response from the upstream server. A 502 error isn't typically something you can fix. It usually requires a fix on the web server or the proxies that you're trying to get access through.",
    503: "Service Unavailable, The server is currently unavailable.",
    504: "Gateway Timeout, The request couldn't complete in time. Try breaking it down in multiple smaller requests.",
    530: "Origin DNS Error, Cloudflare can't resolve the requested DNS record.",
    783: "Unexpected Token, The request includes a JSON syntax error, so the API code is failing to convert some of the data that the server returned.",
}
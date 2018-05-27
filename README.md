# Problem Express - RFC 7807

   - HTTP [RFC7230] status codes are sometimes not sufficient to convey
   enough information about an error to be helpful.  While humans behind
   Web browsers can be informed about the nature of the problem with an
   HTML [W3C.REC-html5-20141028] response body, non-human consumers of
   so-called "HTTP APIs" are usually not.

   - This specification defines simple JSON [RFC7159] and XML
   [W3C.REC-xml-20081126] document formats to suit this purpose.  They
   are designed to be reused by HTTP APIs, which can identify distinct
   "problem types" specific to their needs.

   - Thus, API clients can be informed of both the high-level error class
   (using the status code) and the finer-grained details of the problem
   (using one of these formats).

   - For example, consider a response that indicates that the client's
   account doesn't have enough credit.  The 403 Forbidden status code
   might be deemed most appropriate to use, as it will inform HTTP-
   generic software (such as client libraries, caches, and proxies) of
   the general semantics of the response.

   - However, that doesn't give the API client enough information about
   why the request was forbidden, the applicable account balance, or how
   to correct the problem.  If these details are included in the response body in a machine-readable format, the client can treat it
   appropriately; for example, triggering a transfer of more credit into
   the account.

   - This specification does this by identifying a specific type of
   problem (e.g., "out of credit") with a URI [RFC3986]; HTTP APIs can
   do this by nominating new URIs under their control, or by reusing
   existing ones.

   - Additionally, problem details can contain other information, such as
   a URI that identifies the specific occurrence of the problem
   (effectively giving an identifier to the concept "The time Joe didn't
   have enough credit last Thursday"), which can be useful for support
   or forensic purposes.

   - The data model for problem details is a JSON [RFC7159] object; when
   formatted as a JSON document, it uses the "application/problem+json"
   media type.  Appendix A defines how to express them in an equivalent
   XML format, which uses the "application/problem+xml" media type.

   - Note that problem details are (naturally) not the only way to convey
   the details of a problem in HTTP; if the response is still a
   representation of a resource, for example, it's often preferable to
   accommodate describing the relevant details in that application's
   format.  Likewise, in many situations, there is an appropriate HTTP
   status code that does not require extra detail to be conveyed.

   - Instead, the aim of this specification is to define common error
   formats for those applications that need one, so that they aren't
   required to define their own, or worse, tempted to redefine the
   semantics of existing HTTP status codes.  Even if an application
   chooses not to use it to convey errors, reviewing its design can help
   guide the design decisions faced when conveying errors in an existing
   format.
   
   
[Read more here](https://tools.ietf.org/html/rfc7807)
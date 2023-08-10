# Note Management App with REST Functionality

The application implements the REST functionality of the previous project https://github.com/vero-git-hub/notes-app-rrt. Technologies: NodeJS, Express, TypeScript, Yup, Postman. The initial data set is represented in an array variable.

## Added Endpoints
The following endpoints have been added to the application:

1. **GET /notes:** Show all notes (active and archival).
2. **POST /notes:** This endpoint allows users to create a new note by providing the "name," "category," and "content" fields in the request. The "created" and "dates" fields are assigned automatically upon creation.
3. **DELETE /notes/🆔:** Use this endpoint to delete a note with the specified ID from the array variables.
4. **PATCH /notes/🆔:** Update a specific note using this endpoint. Provide the desired fields in the request body for modification, including an option to archive the note.
5. **GET /notes/🆔:** Unzip the note by the passed id.
6. **GET /notes/stats:** Obtain statistics about the notes, including the count of active and archived notes for each category.

## Input Validation
To ensure data integrity, input validation has been implemented using the Yup library. The "name," "category," and "content" fields in the request body are now validated for required values. Additionally, the "category" field is restricted to predefined categories.

Manual checks with TypeScript have been incorporated to verify input value types, preventing the addition of non-existent properties.


## Error Handling
Error handling to enhance the robustness of the application. Various scenarios, such as invalid input types, missing required fields, exceeding the maximum allowed properties, and attempts to add fictitious categories, are properly handled.

## API Testing

While a front-end interface is not yet available, thorough API testing has been conducted using Postman. This ensures the sanity and functionality of the API endpoints.
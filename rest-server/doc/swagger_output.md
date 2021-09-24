# DM124 REST API
Trabalho Prático da disciplina DM124 - Lucas Leon Labanca

## Version: 1.0.0

### Security
**basicAuth**  

|basic|*Basic*|
|---|---|
|In|header|
|Name|Authorization|
|Description|Basic Auth Base 64|

### /questions

#### POST
##### Description

Add a question

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Question | body | Question | Yes | [QuestionToAdd](#questiontoadd) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Question added succesfully | [QuestionAdded](#questionadded) |
| 400 | Bad Request |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### GET
##### Description

Get a list of all of the questions

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Question list found | [QuestionList](#questionlist) |
| 204 | No Content |  |
| 400 | Bad Request |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

### /questions/{questionId}

#### GET
##### Description

Get a question by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | Question ID | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Question found | [Question](#question) |
| 400 | Bad Request |  |
| 404 | Not Found |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### PATCH
##### Description

Update a question

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | Question ID | Yes | integer |
| Question | body | Question | Yes | [QuestionToAdd](#questiontoadd) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Question updated succesfully | [QuestionAdded](#questionadded) |
| 400 | Bad Request |  |
| 404 | Not Found |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### DELETE
##### Description

Delete a question by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| questionId | path | Question ID | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Question deleted |
| 400 | Bad Request |
| 404 | Not Found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

### /answers

#### POST
##### Description

Add an answer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Answer | body | Answer | Yes | [AnswerToAdd](#answertoadd) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Answer added succesfully | [AnswerAdded](#answeradded) |
| 400 | Bad Request |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### GET
##### Description

Get a list of all of the answers

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Answer list found | [AnswerList](#answerlist) |
| 204 | No Content |  |
| 400 | Bad Request |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

### /answers/{answerId}

#### GET
##### Description

Get an answer by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| answerId | path | Answer ID | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Answer found | [Answer](#answer) |
| 400 | Bad Request |  |
| 404 | Not Found |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### PATCH
##### Description

Update an answer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| answerId | path | Answer ID | Yes | integer |
| Answer | body | Answer | Yes | [AnswerToAdd](#answertoadd) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Answer updated succesfully | [AnswerAdded](#answeradded) |
| 400 | Bad Request |  |
| 404 | Not Found |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### DELETE
##### Description

Delete an answer by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| answerId | path | Answer ID | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Answer deleted |
| 400 | Bad Request |
| 404 | Not Found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

### /users/signup

#### POST
##### Description

Add a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| User | body | User | Yes | [UserToAdd](#usertoadd) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | User added succesfully | [User](#user) |
| 400 | Bad Request |  |

### /users

#### GET
##### Description

Get a list of all of the users

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | User list found | [UserList](#userlist) |
| 204 | No Content |  |
| 400 | Bad Request: error or not allowed to users with role: USER |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

### /users/{userId}

#### GET
##### Description

Get a user by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | User found | [User](#user) |
| 400 | Bad Request: error or user with role USER is not authorized to get someone elses user |  |
| 404 | Not Found |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### PATCH
##### Description

Update a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | integer |
| User | body | User | Yes | [UserToAdd](#usertoadd) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | User updated succesfully | [User](#user) |
| 400 | Bad Request: error or user with role USER is not authorized to update someone elses user |  |
| 404 | Not Found |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

#### DELETE
##### Description

Delete a user by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | User deleted |
| 400 | Bad Request: error or user with role USER is not authorized to delete someone elses user |
| 404 | Not Found |

##### Security

| Security Schema | Scopes |
| --- | --- |
| basicAuth | |

### Models

#### Question

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | _Example:_ `1` | No |
| status | string | _Example:_ `"New"` | No |
| description | string | _Example:_ `"Question 1"` | No |
| createdAt | string | _Example:_ `"2021-09-24T00:52:02.775Z"` | No |
| updatedAt | string | _Example:_ `"2021-09-24T00:52:02.775Z"` | No |
| answer | object |  | No |
| options | [ object ] |  | No |

#### QuestionList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| QuestionList | array |  |  |

#### QuestionToAdd

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| description | string | _Example:_ `"Question 1"` | No |
| status | string | _Example:_ `"New"` | No |
| options | [ string ] | _Example:_ `["Option-1","Option-2","Option-3"]` | No |

#### QuestionAdded

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | _Example:_ `1` | No |
| status | string | _Example:_ `"New"` | No |
| description | string | _Example:_ `"Question 1"` | No |
| updatedAt | string | _Example:_ `"2021-09-24T00:52:02.775Z"` | No |
| createdAt | string | _Example:_ `"2021-09-24T00:52:02.775Z"` | No |

#### Answer

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | _Example:_ `1` | No |
| key | number | _Example:_ `1` | No |
| name | string | _Example:_ `"Days of week answer"` | No |
| answer | string | _Example:_ `"Answer to Question 2"` | No |
| createdAt | string | _Example:_ `"2021-09-22T03:42:40.384Z"` | No |
| updatedAt | string | _Example:_ `"2021-09-22T03:43:36.138Z"` | No |
| questionId | number | _Example:_ `1` | No |
| question | object |  | No |

#### AnswerList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| AnswerList | array |  |  |

#### AnswerToAdd

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| key | number | _Example:_ `1` | No |
| name | string | _Example:_ `"Days of week answer"` | No |
| answer | string | _Example:_ `"Answer to Question 1"` | No |
| questionId | number | _Example:_ `1` | No |

#### AnswerAdded

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | _Example:_ `1` | No |
| key | number | _Example:_ `1` | No |
| name | string | _Example:_ `"Days of week answer"` | No |
| answer | string | _Example:_ `"Answer to Question 1"` | No |
| questionId | number | _Example:_ `1` | No |
| updatedAt | string | _Example:_ `"2021-09-23T03:33:23.630Z"` | No |
| createdAt | string | _Example:_ `"2021-09-23T03:33:23.630Z"` | No |

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | _Example:_ `1` | No |
| name | string | _Example:_ `"admin01"` | No |
| role | string | _Example:_ `"ADMIN"` | No |
| updatedAt | string | _Example:_ `"2021-09-24T00:45:54.199Z"` | No |
| createdAt | string | _Example:_ `"2021-09-24T00:45:54.199Z"` | No |

#### UserList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| UserList | array |  |  |

#### UserToAdd

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | _Example:_ `"admin01"` | No |
| password | string | _Example:_ `"123456"` | No |
| role | string | _Example:_ `"ADMIN"` | No |

# Graphql Server

How to build graphql server using nodeJS and Express

## Installation
Install package:
```bash
npm install
```
Start sever:
```bash
node server.js
```

## Usage

### Query:
Get list course

```python
{
  courses {
    id,
    title,
    topic,
   	description 
  }
}
```

### Mutations:

#### Create course
```python
mutation createCourse($input: courseInput) {
  createCourse(input: $input) {
    id,
    title,
    author
  }
}
```
Param:

```python
{
  "input": {
    "title": "test",
    "author": "codedeom",
    "description": "test",
    "topic": "test",
    "url": "test"
  }
}
```

#### Update course
```python
mutation updateCourse($id: Int!, $input: courseInput) {
  updateCourse(id: $id, input: $input) {
    id
  }
}
```
Param:

```python
{
  "id": 4,
   "input": {
    "title": "abc",
    "author": "codedeom",
    "description": "test",
    "topic": "test",
    "url": "test"
  }
}
```

#### Delete course
```python
mutation deletecourse($id: Int!) {
  deleteCourse(id: $id){
    id
  }
}

```
Param:

```python
{
  "id": 3
}
```
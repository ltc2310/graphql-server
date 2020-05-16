var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    input courseInput {
      title: String
      author: String
      description: String
      topic: String
      url: String
    }
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
      updateCourse(id: Int!, input: courseInput): Course
      createCourse(input: courseInput): Course,
      deleteCourse(id: Int!): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [{
    id: 1,
    title: 'ReactJS',
    author: 'codedeom',
    description: 'Hoc reactJS co ban',
    topic: 'Node.js',
    url: 'https://codedeom/reactjs-co-ban'
  },
  {
    id: 2,
    title: 'NodeJS',
    author: 'codedeom',
    description: 'Hoc NodeJS co ban',
    topic: 'Node.js',
    url: 'https://codedeom/nodeJS-co-ban'
  },
  {
    id: 3,
    title: 'Angular',
    author: 'codedeom',
    description: 'Hoc Angular co ban',
    topic: 'Node.js',
    url: 'https://codedeom/angular-co-ban'
  },
]

var updateCourse = function ({
  id,
  input
}) {
  coursesData.map(course => {
    if (course.id === id) {
      course.title = input.title
      course.author = input.author
      course.description = input.description
      course.topic = input.topic;
      course.url = input.url
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
}

var createCourse = function ({
  input
}) {
  var id = Math.max(...coursesData.map(course => course.id)) + 1
  const newCourse = {
    id,
    ...input
  }
  coursesData.push(newCourse)
  return newCourse
}

var deleteCourse = function ({
  id
}) {
  const newCourses = [...coursesData.filter(course => course.id !== id)];
  coursesData = newCourses
  return coursesData;
}

var getCourse = function (args) {
  var id = args.id;
  return coursesData.filter(course => {
    return course.id == id;
  })[0];
}

var getCourses = function (args) {
  if (args.topic) {
    var topic = args.topic;
    return coursesData.filter(course => course.topic === topic);
  } else {
    return coursesData;
  }
}

var root = {
  course: getCourse,
  courses: getCourses,
  updateCourse: updateCourse,
  createCourse: createCourse,
  deleteCourse: deleteCourse
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const songs = [
  {
    id: '1',
    name: 'Azukita',
    genre: 'EDM',
    year: 2017,
    authorId: '1'
  },
  {
    id: '2',
    name: 'Still Waiting',
    genre: 'Rock',
    year: 2001
  },
  {
    id: '3',
    name: 'Highway to Hell',
    genre: 'Rock',
    year: 1995
  },
  {
    id: '4',
    name: 'Steve Aoki Song',
    genre: 'EDM',
    year: 2015,
    authorId: '1'
  }
];

const authors = [
  {
    id: '1',
    name: 'Steve Aoki',
    age: 40
  }
];

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    year: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(parent) {
        const { authorId } = parent;
        return authors.find(({ id }) => id === authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    songs: {
      type: GraphQLList(SongType),
      resolve(parent) {
        const { id } = parent;
        return songs.filter(({ authorId }) => authorId === id);
      }
    }
  })
});

// Specific query for the song object type.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    song: {
      type: SongType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { id } = args;
        return songs.find(({ id: songId }) => songId === id);
      }
    },
    songs: {
      type: GraphQLList(SongType),
      resolve() {
        return songs;
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        return authors;
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { id } = args;
        return authors.find(({ id: authorId }) => authorId === id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

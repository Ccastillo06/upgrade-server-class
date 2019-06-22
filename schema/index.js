const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const Author = require('../models/Author');
const Song = require('../models/Song');

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
        return Author.findById(authorId);
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
        return Song.find({ authorId: id });
      }
    }
  })
});

// 5d0de46779d7a7659c8e9567

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
        return Song.findById(id);
      }
    },
    songs: {
      type: GraphQLList(SongType),
      resolve() {
        return Song.find();
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { id } = args;
        return Author.findById(id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const { name, age } = args;

        const newAuthor = new Author({
          name,
          age
        });

        return newAuthor.save();
      }
    },
    addSong: {
      type: SongType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        year: { type: GraphQLInt },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { name, genre, year, authorId } = args;

        const newSong = new Song({
          name,
          genre,
          year,
          authorId
        });

        return newSong.save();
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { id } = args;

        return Song.findByIdAndDelete(id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

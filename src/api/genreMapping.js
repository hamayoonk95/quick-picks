const genreMapping = {
    happy: {
      morning: {
        couple: "Comedy",
        friends: "Adventure",
        family: "Romance",
        alone: 'Drama'
      },
      afternoon: {
        couple: "Adventure",
        friends: "Action",
        family: "Thriller"
      },
      evening: {
        couple: "Romance",
        friends: "Thriller",
        family: "Science Fiction"
      },
      late: {
        couple: "Thriller",
        friends: "Science Fiction",
        family: "Horror"
      }
    },
    sad: {
      morning: {
        couple: "Drama",
        friends: "Romance",
        family: "Thriller"
      },
      afternoon: {
        couple: "Romance",
        friends: "Thriller",
        family: "Horror"
      },
      evening: {
        couple: "Thriller",
        friends: "Horror",
        family: "Documentary"
      },
      late: {
        couple: "Horror",
        friends: "Documentary",
        family: "Comedy"
      }
    },
    excited: {
      morning: {
        couple: "Adventure",
        friends: "Action",
        family: "Thriller"
      },
      afternoon: {
        couple: "Action",
        friends: "Thriller",
        family: "Science Fiction"
      },
      evening: {
        couple: "Thriller",
        friends: "Science Fiction",
        family: "Horror"
      },
      late: {
        couple: "Science Fiction",
        friends: "Horror",
        family: "Adventure"
      }
    },
    relaxed: {
      morning: {
        couple: "Drama",
        friends: "Comedy",
        family: "Romance"
      },
      afternoon: {
        couple: "Comedy",
        friends: "Romance",
        family: "Thriller"
      },
      evening: {
        couple: "Romance",
        friends: "Thriller",
        family: "Science Fiction"
      },
      late: {
        couple: "Documentary",
        friends: "Science Fiction",
        family: "Adventure"
      }
    }
  };

export default genreMapping;
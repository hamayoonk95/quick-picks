const genreMapping = {
  happy: {
    morning: {
      couple: ["Comedy", "Romance"],
      friends: ["Adventure", "Action"],
      family: ["Family", "Animation"],
      alone: ["Drama", "Crime"],
    },
    afternoon: {
      couple: ["Adventure", "Action"],
      friends: ["Action", "Thriller"],
      family: ["Adventure", "Animation"],
      alone: ["Comedy", "Drama"],
    },
    evening: {
      couple: ["Romance", "Thriller"],
      friends: ["Thriller", "Mystery"],
      family: ["Science Fiction", "Fantasy"],
      alone: ["Drama", "Crime"],
    },
    late: {
      couple: ["Thriller", "Mystery"],
      friends: ["Science Fiction", "Horror"],
      family: ["Horror", "Thriller"],
      alone: ["Drama", "Crime"],
    },
  },
  sad: {
    morning: {
      couple: ["Drama", "Romance"],
      friends: ["Romance", "Drama"],
      family: ["Thriller", "Drama"],
      alone: ["Drama", "Documentary"],
    },
    afternoon: {
      couple: ["Romance", "Drama"],
      friends: ["Thriller", "Drama"],
      family: ["Horror", "Thriller"],
      alone: ["Drama", "Documentary"],
    },
    evening: {
      couple: ["Thriller", "Drama"],
      friends: ["Horror", "Thriller"],
      family: ["Documentary", "Drama"],
      alone: ["Drama", "Documentary"],
    },
    late: {
      couple: ["Horror", "Thriller"],
      friends: ["Documentary", "Drama"],
      family: ["Comedy", "Drama"],
      alone: ["Drama", "Documentary"],
    },
  },
  excited: {
    morning: {
      couple: ["Adventure", "Action"],
      friends: ["Action", "Thriller"],
      family: ["Thriller", "Adventure"],
      alone: ["Adventure", "Action"],
    },
    afternoon: {
      couple: ["Action", "Thriller"],
      friends: ["Thriller", "Science Fiction"],
      family: ["Science Fiction", "Fantasy"],
      alone: ["Adventure", "Action"],
    },
    evening: {
      couple: ["Thriller", "Science Fiction"],
      friends: ["Science Fiction", "Horror"],
      family: ["Horror", "Thriller"],
      alone: ["Adventure", "Action"],
    },
    late: {
      couple: ["Science Fiction", "Horror"],
      friends: ["Horror", "Adventure"],
      family: ["Adventure", "Action"],
      alone: ["Adventure", "Action"],
    },
  },
  relaxed: {
    morning: {
      couple: ["Drama", "Comedy"],
      friends: ["Comedy", "Romance"],
      family: ["Romance", "Family"],
      alone: ["Horror", "Science Fiction"]
    },
    afternoon: {
      couple: ["Comedy", "Romance"],
      friends: ["Action", "Horror"],
      family: ["Thriller", "Mystery"],
      alone: ["Comedy", "Horror"]
    },
    evening: {
      couple: ["Romance", "Crime"],
      friends: ["Mystery", "War"],
      family: ["Science Fiction", "Adventure"],
      alone: ["Documentary", "Crime"]
    },
    late: {
      couple: ["Documentary", "History"],
      friends: ["Science Fiction", "Western"],
      family: ["Adventure", "Fantasy"],
      alone: ["Horror", "Fantasy"]
    },
  },
};

export default genreMapping;

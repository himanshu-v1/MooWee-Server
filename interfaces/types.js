export const user = {
    username: String,
    password: String,
    access: Number,
};

export const movie = {
    title: String,
    year: Number,
    genre: String,
    poster: URL,
    rating: Number,
    director: String,
    id: String,
};

export const tvShow = {};

export const comments = {
    id: String,
    comment: String,
    mwId: String,
    timestamp: String,
    likes: Number,
    username: user.username,
};

export const replies = {
    id: String,
    reply: String,
    cmId: comments.id,
    timestamp: String,
    likes: Number,
    username: user.username,
};

export const dataList = ["img", "title", "year", "rating", "director", "genre"];
export const detailList = ["plot"];

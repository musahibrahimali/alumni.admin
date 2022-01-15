import axios from 'axios';

// fetch user details
export const fetchUserProfile = async () => {
    return await axios({
        url: `http://localhost:5000/admin/profile`,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// update admin profile
export const updateAdminProfile = async (id, data) => {
    const url = `http://localhost:5000/admin/update-profile/${id}`;
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}
// update admin profile
export const updateAdminProfilePicture = async (id, data) => {
    const url = `http://localhost:5000/admin/update-profile-picture/${id}`;
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// create blog
export const createBlog = async (data) => {
    const url = 'http://localhost:5000/blog/create-blog';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// update blog
export const updateBlog = async (id, data) => {
    const url = `http://localhost:5000/blog/update-blog/${id}`;
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// get all blogs
export const getBlogs = async () => {
    const url = 'http://localhost:5000/blog/get-blogs';
    // make fetch request with axios
    return axios({
        url: url,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// update blog
export const getBlogById = async (id) => {
    const url = `http://localhost:5000/blog/update-blog/${id}`;
    return await axios({
        method: 'GET',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// delete job
export const deleteBlog = async (id) => {
    const url = `http://localhost:5000/blog/delete/${id}`;
    return await axios({
        method: 'DELETE',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// create news
export const createNews = async (data) => {
    const url = 'http://localhost:5000/news/create-news';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// update news
export const updateNews = async (id, data) => {
    const url = `http://localhost:5000/blog/update-news/${id}`;
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// get all news
export const getNews = async () => {
    const url = 'http://localhost:5000/news/get-news';
    // make fetch request with axios
    return axios({
        url: url,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// delete news
export const deleteNews = async (id) => {
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'DELETE',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// create event
export const createEvent = async (data) => {
    const url = 'http://localhost:5000/event/create-event';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// update event
export const updateEvent = async (id, data) => {
    const url = `http://localhost:5000/blog/update-event/${id}`;
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// get all events
export const getEvents = async () => {
    const url = 'http://localhost:5000/event/get-events';
    // make fetch request with axios
    return axios({
        url: url,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// delete event
export const deleteEvent = async (id) => {
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'DELETE',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// create job
export const createJob = async (data) => {
    const url = `http://localhost:5000/job/create-job`;
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// update event
export const updateJob = async (id, data) => {
    const url = `http://localhost:5000/blog/update-job/${id}`;
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: data,
    });
}

// get all jobs
export const getJobs = async () => {
    const url = 'http://localhost:5000/job/get-jobs';
    // make fetch request with axios
    return axios({
        url: url,
        method: "GET",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// delete job
export const deleteJob = async (id) => {
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'DELETE',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
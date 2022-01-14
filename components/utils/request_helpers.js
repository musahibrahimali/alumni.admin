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
export const updateAdminProfile = async (data) => {
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'PATCH',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data: JSON.stringify(data),
    });
}

// create blog
export const createBlog = async (data) => {
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: JSON.stringify(data),
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

// delete job
export const deleteBlog = async (id) => {
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

// create news
export const createNews = async (data) => {
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: JSON.stringify(data),
    });
}

// get all news
export const getNews = async () => {
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
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: JSON.stringify(data),
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
    const url = 'http://localhost:5000/blog/get-blogs';
    return await axios({
        method: 'POST',
        url,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        },
        data: JSON.stringify(data),
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
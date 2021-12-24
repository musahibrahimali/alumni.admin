import axios from "axios";

// register an admin
export const registerAdmin = async (values) => {
    const url = "http://localhost:5000/admin/register";
    const data = values;
    const response = await axios({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

// log in admin
export const loginAdmin = async (values) => {
    const url = "http://localhost:5000/admin/login";
    const data = values;
    const response = await axios({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
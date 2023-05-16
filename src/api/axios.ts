import axios from "axios";

const instance = axios.create({
    baseURL: "https://test.tspb.su",
});
;

export default instance;


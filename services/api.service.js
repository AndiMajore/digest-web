import axios from 'axios'

const ApiService = {
    setNedrex(url) {
        axios.nedrex = url
    },

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data, callback) {
        return axios.post(resource, data, callback);
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    getExamples(){
        return this.get("/test")
    },

    getExample(nr){
        return this.get("test?nr="+nr)
    },

    validate_set(id_type, set, runs, replace){
        let data = {target:set, target_id:id_type, runs: runs, replace: replace};
        console.log(data)
        return this.post("/set",data).then(response=>{
            return response.data
        })
    },

    validate_set_set(target_id, target, ref_id, ref, runs, replace, enriched){
        let data = {target:target, target_id:target_id, reference:ref, reference_id:ref_id, runs: runs, replace: replace, enriched: enriched}
        console.log(data)
        return this.post("/set_set",data).then(response=>{
            return response.data
        })
    },

    validate_id_set(target_id, target, ref_id, ref, runs, replace, enriched){
        let data = {target:target, target_id:target_id, reference:ref, reference_id:ref_id, runs: runs, replace: replace, enriched: enriched}
        console.log(data)
        return this.post("/id_set",data).then(response=>{
            return response.data
        })
    },




}
export default ApiService
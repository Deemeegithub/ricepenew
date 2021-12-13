require("@babel/polyfill");
import axios from 'axios';
export default class search{
    constructor (query){
        this.query = query;
    }
async doSearch(search){
    try{
        let result = await axios('https://forkify-api.herokuapp.com/api/search?q='+this.query);
        this.result = result.data.recipes;
        return this.result;
        
        //result = await axios('https://forkify-api.herokuapp.com/api/get?rId='+reseps[1].recipe_id);
    }catch(error){
        alert("Алдаа гарлаа. "+error);
    }
}
}
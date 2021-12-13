require("@babel/polyfill");
import search from "./model/Search";

let search1 = new search('pasta');
search1.doSearch().then(r => console.log(r));
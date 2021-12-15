export default class Like{
    constructor(){
        this.readDataFromlocalStorage();
        if(!this.likes){
            this.likes = [];
        }
    }
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);

        this.likes.splice(index,1); //splice function n massiv dotroos element ustagdag 
        this.saveDataTolocalStorage();
    }
    addLike(id, title, publisher, img){
       const like = {id, title, publisher, img} //EC6 derees adilhan nertei uguhgej baiga bol shuud ingeed ugch boldeg ene n id:id l gesen ug
       this.likes.push(like);

       this.saveDataTolocalStorage();
       return like;
    }
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumberOfLikes(){
        return this.likes.length;
    }
    saveDataTolocalStorage(){
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }
    readDataFromlocalStorage(){
       this.likes = JSON.parse(localStorage.getItem('likes'));
    }
}
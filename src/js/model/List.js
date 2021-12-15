import uniqid from 'uniqid';
export default class list{
    constructor(){
        this.items = [];
    }
    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);

        this.items.splice(index,1); //splice function n massiv dotroos element ustagdag 
    }
    addItem(item){
        let newItem = {
            id: uniqid(),
            item //EC6 derees adilhan nertei uguhgej baiga bol shuud ingeed ugch boldeg ene n item: item l gesen ug
        }
        this.items.push(newItem);
        return newItem;
    }
}
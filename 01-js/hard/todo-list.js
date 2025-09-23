/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {

  list = [];

  add(str) {
    this.list.push(str);
  }


  remove(num) {
    if((num <= this.list.length - 1)  &&  (num >= 0)) {
      for(let i=num; i < this.list.length - 1; i++) {
        this.list[i] = this.list[i+1];
      }
      this.list.pop();
    }
  }


  update(num, str) {
    if((num <= this.list.length -1)  &&  (num >= 0)) {
      this.list[num] = str;
    }
  }


  getAll() {
    // for(let i=0; i < this.list.length; i++) {
    //   console.log(this.list[i]);
    // }

    return this.list;
  }


  get(num) {
    if((num <= this.list.length - 1)  &&  (num >= 0)) {
      return this.list[num];
    } else {
      return null;
    }
  }


  clear() {
    this.list = []
  }
}

module.exports = Todo;


// let myTodo = new Todo();
// console.log(myTodo)

// myTodo.add("task 1");
// myTodo.add("task 2");
// myTodo.add("task 3");
// myTodo.getAll();

// myTodo.remove(0);
// myTodo.getAll();

import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import './style.css';

class TodoList extends Component {
  
	constructor(props) {
		super (props);
		this.state = {
			inputValue: '',
			list: []
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

  render() {
    return (
    	<Fragment>
      	<div>
      		<label htmlFor="insertArea">type here</label>
      		<input
      			id="insertArea"
      			className='input' 
      			value={this.state.inputValue}
      			onChange={this.handleInputChange}
      		/>
        	<button onClick={this.handleBtnClick}>submit</button>
      	</div>
      	<ul>
      		{this.getTodoItem()}   		
      	</ul>
      </Fragment>
    );
  }

  componentDidMount() {
    axios.get('/api/todolist')
      .then((res)=>{
        this.setState(() => ({
          list: [...res.data]
        }));
      })
      .catch(()=>{alert('error')})
  }

  getTodoItem() {
  	return this.state.list.map((item, index) => {
      return (
      	<TodoItem 
          key={item}
      		content={item} 
      		index={index}
      		deleteItem={this.handleItemDelete}
      	/>
      )
    })
  }

  handleInputChange(e) {
  	const value = e.target.value;
  	this.setState(() => ({
  		inputValue: value
  	}));
  }

  handleBtnClick() {
  	this.setState((prevState) => ({
  		list: [...prevState.list, prevState.inputValue],
  		inputValue: ''
  	}));
  }

  handleItemDelete(index) {
  	this.setState((prevState) => {
      const list = [...this.state.list];
      list.splice(index, 1);
  		return {list}
  	})
  }
}

export default TodoList;

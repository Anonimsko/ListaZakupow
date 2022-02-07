import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let toDoList = new Array();
let quantityList = new Array();
let index = -1;
let list;

class ShoppingList extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {listInput: "", quantityInput: ""};
    
    this.handleChangeList = this.handleChangeList.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.sort = this.sort.bind(this);
    this.update = this.update.bind(this);
  }

  handleChangeList(event) 
  {
    this.setState({listInput: event.target.value});
  }

  handleChangeQuantity(event) 
  {
    this.setState({quantityInput: event.target.value});
  }

  addProduct() 
  {
    if(this.state.listInput != "" && this.state.quantityInput != "")
    {
      index++;
      toDoList[index] = this.state.listInput;
      quantityList[index] = this.state.quantityInput;

      this.setState({listInput: ""});
      this.setState({quantityInput: ""});

      this.update();
    }
  }

  update()
  {
    let dataList = new Array();

    for(let i = 0; i <= index; i++)
    {
      dataList[i] = toDoList[i] + " | Ilość: " + quantityList[i];
    }

    list =
      dataList.map((val, idx) => {
        return (
          <div className="product">
            <h3>{val}</h3>
            <button key={idx} value={idx} onClick={e => this.delete(e, "value")}>Usuń</button>
          </div> 
        );
      });
  }

  default(e)
  {
    if(e.target.value == 1)
    {
      toDoList = ["Jajka", "Woda", "Ser"];
      quantityList = [3, 6, 1];
      index = 2;
    }
    else if(e.target.value == 2)
    {
      toDoList = ["Banan", "Mleko", "Seler", "Cytryna", "Papryka"];
      quantityList = [3, 6, 1, 8, 10];
      index = 4;
    }
    
    this.update();

    this.setState({listInput: ""});
  }

  delete(e)
  {
    toDoList.splice((e.target.value), 1);
    quantityList.splice((e.target.value), 1);

    index--;

    this.update();

    this.setState({listInput: ""});
  }

  sort(e)
  {
    if(e.target.value == "1")
    {
      for (let i = 0; i < toDoList.length; i++) 
      {
        for (let j = 0; j < toDoList.length - i - 1; j++) 
        {
          if (toDoList[j].charCodeAt(0) > toDoList[j + 1].charCodeAt(0)) 
          {
            const temp = quantityList[j + 1];
            const temp2 = toDoList[j + 1];
            quantityList[j + 1] = quantityList[j];
            quantityList[j] = temp;
            toDoList[j + 1] = toDoList[j];
            toDoList[j] = temp2;
          }
        }
      }
    }
    else if(e.target.value == "2")
    {
      for (let i = 0; i < quantityList.length; i++) 
      {
        for (let j = 0; j < quantityList.length - i - 1; j++) 
        {
          if (parseInt(quantityList[j]) > parseInt(quantityList[j + 1])) 
          {
            const temp = quantityList[j + 1];
            const temp2 = toDoList[j + 1];
            quantityList[j + 1] = quantityList[j];
            quantityList[j] = temp;
            toDoList[j + 1] = toDoList[j];
            toDoList[j] = temp2;
          }
        }
      }
    }
    this.update();
    this.setState({listInput: ""});
  }

  render() {
    return (
      <div>
        <div className="list">
          <div>
            <input type="text" value={this.state.listInput} onChange={this.handleChangeList}  placeholder="Dodaj produkt"/><br />
            <input type="number" value={this.state.quantityInput} onChange={this.handleChangeQuantity} placeholder="Ilość"/><br />
            <button onClick={this.addProduct}>Dodaj produkt</button>
            <button value="1" onClick={e => this.default(e, "value")}>Domyślny 1</button>
            <button value="2" onClick={e => this.default(e, "value")}>Domyślny 2</button>
          </div>

        </div>
        <div className="products">
          <button value="1" onClick={e => this.sort(e, "value")}>Sortowanie alfabetycznie</button>
          <button value="2" onClick={e => this.sort(e, "value")}>Sortowanie po ilości</button>
          {list}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ShoppingList />,
  document.getElementById('root')
);



reportWebVitals();

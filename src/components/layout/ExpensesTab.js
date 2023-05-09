import React from "react";
import "./expenseTab.css";

const ExpensesTab = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Money Spent</th>
          <th>Description</th>
          <th>Category</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((expense, index) => (
          <tr key={index}>
            <td>{expense.money}</td>
            <td>{expense.description}</td>
            <td>{expense.category} </td>
            <td >
              <button style={{ marginRight: "5px" }}>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTab;

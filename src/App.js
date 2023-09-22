import React from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
    return (
        <div className="app-container">
            <TaskList />
            <AddTask />
        </div>
    );
}

export default App;

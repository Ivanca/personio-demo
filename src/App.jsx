import jsonData from './data.json';
import { useState, useEffect, useRef, createRef } from 'react'
import { rotateUsingCss3 } from './css-functions.js';
import './App.css'

function addClassIf(conditional, className) {
  return conditional ? ` ${className} ` : '';
}

const EmployeeTree = ({ employees, relationships, id, setActiveId, activeId, parentId, parentIsActive }) => {
  const children = relationships[id] || [];
  const employee = employees.find(e => e.id === id);
  const name = employee.first_name + ' ' + employee.last_name.replace(/ .*/, '');
  const job = employee.position;
  const avatar = '/images/' + employee.avatar.replace(/.+\//, '');
  const childRefs = useRef([]);

  childRefs.current = children.map((_, i) => childRefs.current[i] ??  createRef());

  useEffect(() => {
    const elements = childRefs.current.map(r => r.current);
    rotateUsingCss3(elements);
  }, [activeId, open]);

  const handleClick = () => {
    activeId === id ? setActiveId(parentId || id) : setActiveId(id)
  }

  const className = 'employee open'
    + addClassIf(activeId === id, 'active')
    + addClassIf(parentIsActive, 'parent-is-active')
  return (
    <div className={className}>
      <div className="info-container">
        <div className="info" onClick={() => {handleClick()}}>
          <h3><span className="name">{ name } | </span>{job}</h3>
          <div className="img-container"><img src={avatar}></img></div>
        </div>
      </div>
      {children.length > 0 && (
        <ul>
          {children.map((childId, i) => (
            <li key={childId} ref={childRefs.current[i]}>
              <EmployeeTree
                employees={employees}
                relationships={relationships}
                id={childId}
                parentId={id}
                setActiveId={setActiveId}
                activeId={activeId}
                parentIsActive={activeId === id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const rootId = jsonData.root_employee_ids[0];
  const [activeId, setActiveId] = useState(rootId);
  return (
    <div className="container">
      <div className="radial-nav">
        <ul><li>
          <EmployeeTree
            employees={jsonData.employees}
            relationships={jsonData.relationships}
            id={rootId}
            setActiveId={setActiveId}
            activeId={activeId}
          />
        </li></ul>
      </div>
    </div>
  )
}

export default App;

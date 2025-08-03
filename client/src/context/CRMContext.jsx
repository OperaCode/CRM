import { createContext, useContext, useEffect, useState } from "react";

const CRMContext = createContext();

export const useCRM = () => useContext(CRMContext);

export const CRMProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [customers, setCustomers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load from localStorage if needed
  }, []);

  const addCustomer = (customer) => setCustomers([...customers, customer]);
  const addTask = (task) => setTasks([...tasks, task]);

  return (
    <CRMContext.Provider
      value={{ user, setUser, customers, setCustomers, tasks, setTasks, addCustomer, addTask }}
    >
      {children}
    </CRMContext.Provider>
  );
};

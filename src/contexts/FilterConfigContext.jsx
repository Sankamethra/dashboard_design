import { createContext, useContext, useState } from 'react';

const FilterConfigContext = createContext();

export function FilterConfigProvider({ children }) {
  const [filterConfigs, setFilterConfigs] = useState({});

  const saveFilterConfig = (dashboardId, filters) => {
    setFilterConfigs(prev => ({
      ...prev,
      [dashboardId]: filters.map(filter => ({
        id: filter.id,
        type: filter.type,
        label: filter.label,
        key: filter.type,
        config: filter.config,
        value: filter.value
      }))
    }));
  };

  return (
    <FilterConfigContext.Provider value={{ filterConfigs, saveFilterConfig }}>
      {children}
    </FilterConfigContext.Provider>
  );
}

export const useFilterConfig = () => useContext(FilterConfigContext); 